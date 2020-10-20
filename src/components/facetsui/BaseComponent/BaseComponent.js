import React from 'react';
import {Text, View, ImageBackground, ScrollView, FlatList, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedView from '@app/components/facetsui/AnimatedView/AnimatedView';
    
function BaseComponent({store, props}) {
  let Component = View;
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
      Component = ImageBackground;
      Object.assign(properties.style, transit.style || {});
      properties.source = {uri: transit.src};
      properties.imageStyle = properties.style.slice() || {};
      properties.imageStyle.push({position: 'absolute'});
    }
  } else {
    if(props.hasAction) {
      properties.onPress = () => store.onPress(props);
      properties.activeOpacity = .8;
      Component = TouchableOpacity;
    }
  }
  
  if(animation && animation[0]) {
    properties.Component = Component;
    properties.animation = animation;
    Component = AnimatedView;
  }
  
  if(children.length) {
    const childrenMap = children.map((child, i) => React.createElement(child.component, {key: child.id + i, store: store, props: child}));
    return (<Component {...properties}>
      {
        props.isRowChildren(properties.style) ? <Text>{childrenMap}</Text> : childrenMap
      }
    </Component>);
  }
    
  return (<Component {...properties} />);
}
    
export default BaseComponent;