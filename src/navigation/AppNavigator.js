import React from 'react';
import {createStackNavigator, TransitionPresets, CardStyleInterpolators} from '@react-navigation/stack';
import ScreenScreen from '@app/screens/ScreenScreen/ScreenScreen';

const Stack = createStackNavigator();
function Navigation() {
  return (
    <Stack.Navigator initialRouteName="ScreenScreen">
      <Stack.Screen
        name="ScreenScreen"
        options={{headerShown: false}}
        component={ScreenScreen}
        initialParams={{componentId: 'e75bf200-9377-40c4-a857-b46c72371244'}}
      />
    </Stack.Navigator>
  );
}


export default Navigation;