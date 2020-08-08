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
import {useFonts} from "expo-font";
import {AppLoading} from "expo";

const Stack = createStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Enochian': require('./../shared/resources/fonts/Enochian.ttf'),
        'Anglodavek': require('./../shared/resources/fonts/Anglodavek-a55E.ttf'),
        'Dethek': require('./../shared/resources/fonts/Dethek-wWJz.ttf'),
        'Reisenberg': require('./../shared/resources/fonts/Reisenberg20-ExP9.ttf'),
        'Rellanic': require('./../shared/resources/fonts/Rellanic.otf')
    });

    return (
      fontsLoaded
          ? <Provider store={store}>
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
          : <AppLoading />
    );
}
