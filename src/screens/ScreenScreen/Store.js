import initState from '@app/screens/ScreenScreen/initState';
import StoreBase from '@app/models/StoreBase';
import AppStore from '@app/models/AppStore';
import { action, computed, observable } from 'mobx';

class ImageStore {
  @observable active;

  constructor(uri, active = false) {
    this.uri = uri;
    this.active = active;
  }

  @action setActive(value) {
    this.active = value;
  }
}

class Store extends StoreBase {
  items = [
    new ImageStore('https://res.cloudinary.com/dnfk5l75j/image/upload/v1594719262/muiditor/images/image3_auejru.jpg', true),
    new ImageStore('https://res.cloudinary.com/dnfk5l75j/image/upload/v1594654123/muiditor/images/image5_yp2qh1.jpg'),
    new ImageStore( 'https://res.cloudinary.com/dnfk5l75j/image/upload/v1594652375/muiditor/images/image2_rsmqhr.jpg'),
    new ImageStore('https://res.cloudinary.com/dnfk5l75j/image/upload/v1594648798/muiditor/images/image6_glt9z4.jpg'),
  ]
  componentId;
  unsubscribeFocus;

  @computed get activeImage() {
    return this.items.find(item => item.active);
  }

  constructor(navigation, componentId) {
    super(initState, navigation);
    this.componentId = componentId;
    this.subscribe();
  }

  onItemPress = (index) => () => {
    console.log(index);
    this.items.forEach((item, i) => {
      item.setActive(i === index);
    })
  }

  subscribe() {
    this.unsubscribeFocus = this.navigation.addListener('focus', () => {
      AppStore.setScreen(this.componentId)    });
  }
  dispose = () => {
    this.unsubscribeFocus && this.unsubscribeFocus();
  }
}
export default Store;
