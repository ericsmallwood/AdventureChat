import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fedb01',
        alignItems: 'center',
        justifyContent: 'center',
    },
    conversation: {
        position: 'absolute',
        padding: 5,
        borderRadius: 10,
        fontFamily: 'Enochian',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'black'
    },
    chatBubble: {
        position: 'absolute',
        padding: 5,
        borderRadius: 10,
        fontFamily: 'Enochian',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'black'
    },
    heroText: {
        position: 'absolute',
        fontFamily: 'Reisenberg',
        fontSize: 30,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});
