import {action, observable} from 'mobx';

class AppStore {
  @observable screenId = "e75bf200-9377-40c4-a857-b46c72371244";

  @action setScreen(screenId) {
    this.screenId = screenId;
  }

}
export default new AppStore()