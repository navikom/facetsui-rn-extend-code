import React from 'react';
import { View } from 'react-native';
import styleComponentMainImage from '@app/assets/styles/styleComponentMainImage';
import styleComponentMainImageContainer from '@app/assets/styles/styleComponentMainImageContainer';
import FastImage from 'react-native-fast-image';
import styleComponentText from '@app/assets/styles/styleComponentText';
import { observer } from 'mobx-react-lite';

function MainImage({store}) {
  console.log(store.activeImage);
  const {uri} = store.activeImage;
  return (
    <View style={styleComponentMainImage['0517a0d4']['Main']}>
      <View style={styleComponentMainImageContainer['2735d474']['Main']}>
        <FastImage
          source={{uri}}
          style={[styleComponentText['bb272a40']['Main'], {"resizeMode": "cover"}]}
        />
      </View>
    </View>
  )
}

export default observer(MainImage);
