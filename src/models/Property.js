import {observable, action, computed} from 'mobx';
import TransitStyle from '@app/models/TransitStyle';

class Property {
  id;
  path;
  styleId;
  action;
  title;
  transitStyles;
  isTextChildren;
  placeIndex;
  component;
  meta;
  styles;
  @observable classes;
  @observable text;
  animation;

  @computed get hasAction() {
    return this.action && this.action.length > 0;
  }
  @computed get activeClass() {
    return this.classes[this.classes.length - 1];
  }
  @computed get activeTransit() {
    return (this.transitStyles || []).find(e => e.className === this.activeClass);
  }
  @computed get style() {
    const style = this.styles[this.styleId];
    return style ? [style[this.activeClass]] : {};
  }
  constructor({id, title, path, styleId, action, classes, styles, isTextChildren, text, transitStyles, placeIndex, meta, component}) {
    this.id = id;
    this.path = path;
    this.styleId = styleId;
    this.action = action;
    this.isTextChildren = isTextChildren;
    this.classes = classes;
    this.title = title;
    this.text = text;
    this.placeIndex = placeIndex;
    this.meta = meta;
    transitStyles && (this.transitStyles = transitStyles.map(e => new TransitStyle(e)));
    this.component = component;
    this.styles = styles;
  }
  isRowChildren(styles) {
    return this.isTextChildren && !styles.find(style => style.flexDirection && style.flexDirection === 'column');
  }
  @action addStyle(style) {
    this.checkAnimation(style);
    !this.classes.includes(style) && this.classes.push(style);
  }
  @action removeStyle(style) {
    this.classes.includes(style) && this.classes.splice(this.classes.indexOf(style), 1);
    this.checkAnimation(style, true);
  }
  @action toggleStyle(style) {
    if(this.classes.includes(style)) {
      this.removeStyle(style);
    } else {
      this.addStyle(style);
    }
  }
  @action setText(value) {
    this.text = value;
  }
  checkAnimation(clazz, reverse) {
    const currentTransit = reverse ?
      (this.transitStyles || []).find(e => e.className === clazz) :
      this.activeTransit;
    const nextTransit = reverse ? this.activeTransit :
      (this.transitStyles || []).find(e => e.className === clazz);
    if(!currentTransit || !nextTransit) {
      this.animation = null;
      return;
    }
    const styles = this.styles[this.styleId];
    const currentStyle = Object.assign({}, reverse ? styles[clazz] : this.style[0]);
    const nextStyle = Object.assign({}, reverse ? this.style[0] : styles[clazz]);
    this.animation = [
      nextTransit.animationFrom(currentTransit, currentStyle, nextStyle),
      reverse
     ]
  }
}
export default Property;