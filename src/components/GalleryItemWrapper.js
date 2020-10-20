import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styleComponentGalleryItemWrapper from '@app/assets/styles/styleComponentGalleryItemWrapper';
import styleComponent7 from '@app/assets/styles/styleComponent7';
import FastImage from 'react-native-fast-image';
import styleComponentText from '@app/assets/styles/styleComponentText';
import { observer } from 'mobx-react-lite';

function GalleryItemWrapper({item, onPress}) {
  const {uri, active} = item;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styleComponentGalleryItemWrapper['21f09dd1']['Main']}>
      <View style={styleComponent7['fff06844']['Main']}>
        <FastImage
          source={{uri}}
          style={[styleComponentText['14866a6e'][active ? 'Main' : 'StyleGallary1Inactive'], {"resizeMode": "cover"}]}
        />
      </View>
    </TouchableOpacity>
  )
}

export default observer(GalleryItemWrapper);
