import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Store from '@app/screens/ScreenScreen/Store';

function ScreenScreen({navigation, route}) {
  const store = new Store(navigation, route.params.componentId);
  React.useEffect(() => {
    return store.dispose;
  });
  let children = store.children[route.params.componentId];
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
          {children.map((child, i) =>
              React.createElement(child.component, {key: child.id + i, store: store, props: child}))}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}
export default ScreenScreen;