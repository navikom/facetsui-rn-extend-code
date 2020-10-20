import {observable} from 'mobx';
import {Easing} from 'react-native';
const colorRegex = /^#?([a-fd]{2})([a-fd]{2})([a-fd]{2})$/i;

const hexToRgbIfHexColor = (value) => {
  const result = colorRegex.exec(value);
  if(!result) return value;
  const [r, g, b] = value.replace(/^#?([a-fd])([a-fd])([a-fd])$/i,
    (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));
  return 'rgb(' + r + "," + g + "," + b + ')';
};
const easingFunctions = {
  linear: Easing.linear,
  'ease': Easing.ease,
  'ease-in': Easing.quad,
  'ease-out': Easing.cubic,
  'ease-in-out': Easing.elastic(4),
}
const getEasing = (key) => {
  return easingFunctions[key] ? easingFunctions[key] : Easing.linear;
}

class TransitStyle {
  className;
  isSvg;
  src;
  style;
  gradient;
  scroll;
  Svg;
  transition;
  @observable enabled;

  constructor({className, isSvg, src, Svg, style, gradient, scroll, enabled, transition}) {
    this.className = className;
    this.isSvg = isSvg;
    this.src = src;
    this.Svg = Svg;
    this.style = style;
    this.gradient = gradient;
    this.scroll = scroll;
    this.enabled = enabled;
    this.transition = transition;
  }
  animationFrom(prevTransit, prevStyle, currentStyle) {
    if(!this.transition) {
      return null;
    }
    const animation = {};
    this.transition.forEach(e => {
      if(currentStyle[e.name] !== undefined && prevStyle[e.name] !== undefined &&
        currentStyle[e.name] !== prevStyle[e.name]) {
        animation[e.name] = {
          range: [hexToRgbIfHexColor(prevStyle[e.name]), hexToRgbIfHexColor(currentStyle[e.name])],
          to: {
            duration: e.duration,
            easing: getEasing(e.easing),
            useNativeDriver: false
          }
        }
      }
    });
    return Object.keys(animation).length ? animation : null;
  }
}
export default TransitStyle;