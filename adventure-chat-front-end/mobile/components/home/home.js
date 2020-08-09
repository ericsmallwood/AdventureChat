import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from "react-native";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import styles from './home-styles';
import {Image} from "react-native-elements";
import Mascot from "../../assets/images/mascot-mobile.png";
import { AppLoading } from 'expo';
import { useFonts, loadAsync } from 'expo-font';

const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};


export default function Home() {
    const conversation = [
        'The Gods are smiling upon us this day!',
        'Evil will be vanquished!',
    ];
    let index = 0;
    const [isLandScape, setIsLandscape] = useState(true);
    const [currentStatement, setCurrentStatement] = useState(conversation[index]);

    useEffect(() => {
        setIsLandscape(!isPortrait());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStatement(conversation[++index % conversation.length]);
        }, 2000);

    }, []);

    Dimensions.addEventListener('change', () => {
       setIsLandscape(!isPortrait());
    });

    const dimensions = Dimensions.get('window');
    const height = isLandScape ? Math.round(dimensions.height * .85): Math.round(dimensions.height * .7);
    const width = Math.round(height * .5);

    return (
        <View style={styles.container}>
                <Image source={Mascot} style={{height: height, width: width}} />
                <Text
                    style={StyleSheet.flatten([
                        styles.chatBubble,
                        {
                            width: isLandScape ? dimensions.width * .25 : dimensions.width * .35,
                            right: isLandScape ? dimensions.width * .2 : dimensions.width * .075,
                            top: isLandScape ? dimensions.height * .02 : dimensions .height * .12,
                            height: (currentStatement.length / 24) * 35
                        }
                    ])}
                >
                    {currentStatement}
                </Text>
                <Text
                    style={StyleSheet.flatten([
                        styles.heroText,
                        {
                            textShadowColor: 'rgba(255, 255, 0, 0.75)',
                            top: isLandScape ? dimensions.height * .15 : dimensions.height * .25,
                            right: isLandScape ? dimensions.width * .6 : dimensions.width * .5
                        }
                    ])}
                >
                    Enhancing
                </Text>
                <Text
                    style={StyleSheet.flatten([
                        styles.heroText,
                        {
                            color: 'white',
                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            top: isLandScape ? dimensions.height * .25 : dimensions.height * .3
                        }
                    ])}
                >
                    Your Roleplaying
                </Text>
            <Text
                style={StyleSheet.flatten([
                    styles.heroText,
                    {
                        textShadowColor: 'rgba(255, 255, 0, 0.75)',
                        top: isLandScape ? dimensions.height * .35 : dimensions.height * .35,
                        left: isLandScape ? dimensions.width * .6 : dimensions.width * .5
                    }
                ])}
            >
                Experience
            </Text>
        </View>
    )
}
