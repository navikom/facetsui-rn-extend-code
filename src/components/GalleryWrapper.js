import { ScrollView, Text } from 'react-native';
import React from 'react';
import GalleryItemWrapper from '@app/components/GalleryItemWrapper';
import styleComponentGalleryWrapper from '@app/assets/styles/styleComponentGalleryWrapper';

function GalleryWrapper({store}) {
  return (
    <ScrollView
      horizontal={true}
      style={styleComponentGalleryWrapper['5fd0b0c0']['Main']}>
      {
        store.items.map((item, i) =>
        <GalleryItemWrapper
          key={i.toString()}
          item={item}
          onPress={store.onItemPress(i)}
        />)
      }
    </ScrollView>
  )
}

export default GalleryWrapper;
