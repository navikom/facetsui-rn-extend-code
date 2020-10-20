import {action} from 'mobx';
import {DrawerActions, StackActions} from '@react-navigation/native';
import {screensList, screensParentList} from '@app/navigation/screensList';
import navComponents from '@app/navigation/navComponents';

class StoreBase {
  properties = {};
  children = {};
  navigation;

  constructor(initState, navigation) {
    this.navigation = navigation;
    initState.forEach(prop => {
      this.properties[prop.id] = prop;
      this.children[prop.id] = 
        initState
          .filter(e => e.path.toString() === [...prop.path, prop.id].toString())
          .sort((a, b) => {
            if(a.placeIndex[0] === b.placeIndex[0]) return a.placeIndex[1] - b.placeIndex[1];
            return a.placeIndex[0] - b.placeIndex[0];
          });
    });
  }
  props(id) {
    return this.properties[id];
  }
  enableStyle(entry) {
    const type = navComponents[entry[1]];
    if(type) {
      if(type === 'LeftDrawer') {
        this.navigation.openDrawer();
      }
      if(type === 'RightDrawer') {
        const dispatcher = 
          this.navigation.dangerouslyGetParent().dangerouslyGetParent().openDrawer ?
            this.navigation.dangerouslyGetParent().dangerouslyGetParent() :
            this.navigation.dangerouslyGetParent().openDrawer ?
              this.navigation.dangerouslyGetParent() : this.navigation;
        dispatcher.openDrawer();
      }
    } else {
      this.properties[entry[1]] && this.properties[entry[1]].addStyle(entry[2]);
    }
  }
  disableStyle(entry) {
    const type = navComponents[entry[1]];
    if(type) {
      if(type === 'LeftDrawer') {
        this.navigation.closeDrawer();
      }
      if(type === 'RightDrawer') {
        const dispatcher = 
          this.navigation.dangerouslyGetParent().dangerouslyGetParent().closeDrawer ?
            this.navigation.dangerouslyGetParent().dangerouslyGetParent() :
            this.navigation.dangerouslyGetParent().closeDrawer ?
              this.navigation.dangerouslyGetParent() : this.navigation;
        dispatcher.closeDrawer();
      }
    } else {
      this.properties[entry[1]] && this.properties[entry[1]].removeStyle(entry[2]);
    }
  }
  toggleStyle(entry) {
    const type = navComponents[entry[1]];
    if(type) {
      if(['LeftDrawer', 'RightDrawer'].includes(type)) {
        this.navigation.toggleDrawer();
      }
    } else {
      this.properties[entry[1]] && this.properties[entry[1]].toggleStyle(entry[2]);
    }
  }
  @action onPress(property) {
    let l = property.action.length, i = 0;
    while(l--) {
      const entry = property.action[i++];
      switch(entry[0]) {
        case 'navigateTo': {
          const screen = screensList[entry[1]];
          if(screen) {
            const parent = screensParentList[screen];
            if(parent) {
              this.navigation.navigate(parent, {screen, componentId: entry[1]});
            } else {
              this.navigation.navigate(screen, {componentId: entry[1]});
            }
          }
          break;
        }
        case 'navigateReplace': {
          const screen = screensList[entry[1]];
          if(screen) {
            const parent = screensParentList[screen];
            if(parent) {
              this.navigation.dispatch(StackActions.replace(parent, {screen, componentId: entry[1]}));
            } else {
              this.navigation.dispatch(StackActions.replace(screen, {componentId: entry[1]}));
            }
          }
          break;
        }
        case 'navigateBack':
          screensList[entry[1]] && this.navigation.goBack();
          break;
        case 'enableStyle':
          this.enableStyle(entry);
          break;
        case 'disableStyle':
          this.disableStyle(entry);
          break;
        case 'toggleStyle':
          this.toggleStyle(entry);
          break;
      }
    }
  }
  dispose() {}
}
export default StoreBase;