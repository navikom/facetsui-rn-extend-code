import React from 'react';
import {Animated} from 'react-native';

function AnimatedView({ Component, children, animation, style, ...rest }) {
  const animatedValues = Object.keys(animation[0]).map(key => ({
    name: key,
    value: React.useRef(new Animated.Value(0)).current
  }));
  const [values] = React.useState(animation[0])
  const AnimatedComponent = Animated.createAnimatedComponent(Component);
  React.useEffect(() => {
    animatedValues.forEach(e => {
      Animated.timing(
        e.value,
        { ...animation[0][e.name].to, toValue: e.value._value ? 0 : 1 }
      ).start();
    });
  }, [animation[1], values]);

  const styles = [
    ...style,
    ...animatedValues.map(e => ({
      [e.name]: e.value.interpolate({
        inputRange: [0, 1],
        outputRange: values[e.name].range
      })
    }))
  ];

  return (
    <AnimatedComponent{ ...rest } style={ styles }>
    { children }
    </AnimatedComponent>
  )
}
export default AnimatedView;