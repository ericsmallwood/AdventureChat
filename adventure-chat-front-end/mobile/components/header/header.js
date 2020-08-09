import {View} from "react-native";
import styles from "./header-styles";
import React from "react";
import {Button, Image, Text} from "react-native-elements";
// import Logo from '../../assets/images/logo.jpg';



export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.jpg')} style={{height: 30, width: 30}} />
            </View>
            <View style={styles.signInUp}>
                <Text style={styles.empty}> </Text>
                <Text style={styles.headerFont}>Sign In</Text>
                <Text style={styles.headerFont}>Register</Text>
            </View>
        </View>
    )
}
