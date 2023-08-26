import { getPublicPacksService } from '../../services/pack/pack.service';

/**
 * Retrieves public packs based on the given query parameter.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise} - a promise that resolves with the retrieved public packs
 */
export const getPublicPacks = async (req, res) => {
  try {
    const { queryBy } = req.query;

    const publicPacks = await getPublicPacksService(queryBy);

    res.status(200).json(publicPacks);
  } catch (error) {
    res.status(404).json({ msg: 'Packs cannot be found' });
  }
};