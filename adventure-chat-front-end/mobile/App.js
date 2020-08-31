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
import Cellestial from './assets/fonts/theban.ttf';
import Anglodavek from './assets/fonts/Anglodavek-a55E.ttf';
import Rellanic from './assets/fonts/Rellanic.otf';
import Reisenberg from './assets/fonts/Reisenberg20-ExP9.ttf';
import Dethek from './assets/fonts/Dethek-wWJz.ttf';
import Infernal from './assets/fonts/dnd-Infernal.ttf'

const Stack = createStackNavigator();

export default function App() {
    let [fontsLoaded] = useFonts({
        'Cellestial': Cellestial,
        'Anglodavek': Anglodavek,
        'Rellanic': Rellanic,
        'Reisenberg': Reisenberg,
        'Dethek': Dethek,
        'Infernal': Infernal
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
