import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from "react-native";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import styles from './home-styles';
import {Image} from "react-native-elements";
import Mascot from "../../../shared/resources/images/mascot-mobile.png";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};


export default function Home(props) {
    const [isLandScape, setIsLandscape] = useState(true);

    let [fontsLoaded] = useFonts({
        'Enochian': require('./../../../shared/resources/fonts/Enochian.ttf'),
    });

    useEffect(() => {
        setIsLandscape(!isPortrait());
    }, []);

    Dimensions.addEventListener('change', () => {
       setIsLandscape(!isPortrait());
    });

    const dimensions = Dimensions.get('window');
    const height = isLandScape ? Math.round(dimensions.height * .85): Math.round(dimensions.height * .7);
    const width = Math.round(height * .5);


    return (
        fontsLoaded
            ? <View style={styles.container}>
                <Image source={{uri: Mascot}} style={{height: height, width: width}} />
                <Text
                    style={{
                        position: 'absolute',
                        padding: 5,
                        maxWidth: isLandScape ? 500 : 150,
                        borderRadius: 10,
                        fontFamily: 'Enochian',
                        fontWeight: 'bold',
                        right: isLandScape ? dimensions.width * .15 : dimensions.width * .07,
                        top: isLandScape ? dimensions.height * .02 : dimensions .height * .12,
                        backgroundColor: 'white',
                        color: 'black'
                    }}
                >
                    The Gods are smiling upon us this day!
                </Text>
            </View>
            : <AppLoading />
    )
}
