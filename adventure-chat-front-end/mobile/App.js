import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import store from '../shared/redux/store';
import {Provider} from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./components/home/home";
import Header from "./components/header/header";

const Stack = createStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
          <Header />
          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false}}
                />
                </Stack.Navigator>

          </NavigationContainer>
      </Provider>

  );
}
