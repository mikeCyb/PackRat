import {
  findOrCreateOne,
  ensureIdProperty,
  ensureModelProperty,
} from '../../utils/osmFunctions/modelHandlers';
import { isGeoJSONFormat } from '../../utils/osmFunctions/dataFormatters';

/**
 * Posts a collection of GeoJSON data to the service.
 *
 * @param {Object} geojson - The GeoJSON data to be posted.
 * @throws {Error} Invalid or missing geoJSON.
 * @return {Promise} A promise that resolves to the newly created instances.
 */
export const postCollectionGeoJSONService = async (geojson) => {
  if (!geojson || !isGeoJSONFormat(geojson)) {
    throw new Error('Invalid or missing geoJSON');
  }

  // Check if the GeoJSON is a FeatureCollection
  if (geojson.type === 'FeatureCollection') {
    const data = geojson.features;
    const processedElements = data.map((element) => ensureIdProperty(element));
    const Models = processedElements.map((element) =>
      ensureModelProperty(element),
    );
    const newInstances = await Promise.all(
      Models.map(
        async (Model, index) =>
          await findOrCreateOne(Model, processedElements[index]),
      ),
    );
    return newInstances;
  } else {
    // Handle single feature
    const processedElement = ensureIdProperty(geojson);
    const Model: any = ensureModelProperty(processedElement);
    const newInstance = await findOrCreateOne(Model, processedElement);
    return newInstance;
  }
};
