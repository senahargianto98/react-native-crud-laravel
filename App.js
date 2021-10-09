import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './Screen/Detail';
import ParamScreen from './Screen/Params';
import Home from './Screen/HomeFunction';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Other" component={ParamScreen} />
    </Stack.Navigator>
  );
}

function DetailStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Add" component={DetailsScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Homes" component={HomeStack} />
        <Tab.Screen name="Adds" component={DetailStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
