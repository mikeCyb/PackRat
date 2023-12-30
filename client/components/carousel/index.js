import React from 'react';
import { ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { VStack } from 'native-base';

import ScrollButton from './ScrollButton';
import useCarousel from './useCarousel';

const { width } = Dimensions.get('window');

export default Carousel = ({ children = [], itemWidth }) => {
  const { scrollViewRef, currentIndex, handleScroll, scrollToIndex } =
    useCarousel();
  return (
    <VStack
      style={{
        width: Platform.OS === 'web' ? '100%' : width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <ScrollButton
        direction="left"
        onPress={() => {
          scrollToIndex(currentIndex - 1);
        }}
        disabled={currentIndex === 0}
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={Platform.OS === 'web'}
        gestureEnabled={false} // Add this prop
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
      >
        {children &&
          children.map((child, index) => (
            <VStack
              key={index}
              style={{
                width: itemWidth + 10,
                marginRight: 10,
                marginTop: 10,
                flexDirection: 'row',
              }}
            >
              {child}
            </VStack>
          ))}
      </ScrollView>
      <ScrollButton
        direction="right"
        onPress={() => {
          scrollToIndex(currentIndex + 1);
        }}
        disabled={currentIndex === children?.length - 1}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  carousel: {
    flexDirection: 'row',
    width: Platform.OS === 'web' ? '100%' : width * 0.8,
  },
});
