import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    logoContainer: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'flex-start'
    },
    signInUp: {
        flex: 1,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    empty: {
        flex: 2
    },
    headerFont: {
        flex: 1,
        flexDirection: 'row',
        fontFamily: 'Anglodavek',
        fontSize: 10,
    }
});
