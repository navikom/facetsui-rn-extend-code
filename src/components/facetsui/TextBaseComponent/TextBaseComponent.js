import React from 'react';
import {Text, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedView from '@app/components/facetsui/AnimatedView/AnimatedView';
import FastImage from 'react-native-fast-image';
    
function TextBaseComponent({store, props}) {
  let Component = Text;
  const properties = {};
  const transit = props.activeTransit;
  let children = store.children[props.id];
  
  properties.style = props.style;
  const animation = props.animation;
  
  if(transit && (transit.isSvg || transit.gradient || transit.scroll || transit.src)) {
    if(transit.isSvg) {
      Component = transit.Svg.default;
      if(transit.style && transit.style.color) {
        if(transit.style.color) {
          properties.stroke = transit.style.color;
        }
        if(transit.style.fill) {
          properties.fill = transit.style.fill;
        }
        if(transit.style.width) {
          properties.width = transit.style.width;
        }
        if(transit.style.height) {
          properties.height = transit.style.height;
        }
      }
    } else if(transit.gradient) {
      Component = LinearGradient;
      Object.assign(properties, transit.gradient.colorStops || {}, transit.gradient.orientation || {});
    } else if(transit.scroll) {
      Component = ScrollView;
      if(transit.scroll.horizontal) {
        properties.horizontal = true;
      }
      properties.contentContainerStyle = transit.scroll.contentContainerStyle;
    } else {
      Component = FastImage;
      Object.assign(properties, transit.style || {});
      properties.source = {uri: transit.src};
    }
  } else {
    if(props.meta === 'input' || props.meta === 'textArea') {
      Component = TextInput;
      properties.onChange = (e) => props.setText(e.nativeEvent.text);
      properties.defaultValue = props.text;
      properties.placeholder = props.title;
      if(props.meta === 'textArea') {
        properties.multiline = true;
      }
    } else {
      children = props.text;
    }
  }
  
  if(animation && animation[0]) {
    properties.Component = Component;
    properties.animation = animation;
    Component = AnimatedView;
  }
  
  if(children.length) {
    return (<Component {...properties}>{children}</Component>);
  }
  return (<Component {...properties} />);
    
}
    
export default TextBaseComponent;