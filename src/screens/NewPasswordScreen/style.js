import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const circleSize = screenWidth * 1.5;

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboardView: {

    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'white'
    },
    iconXContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 50,
        top: 50
    },
    circleContainer: {
        flexDirection: "row",
        height: circleSize,
        width: circleSize,
        backgroundColor: 'white',
        borderRadius: circleSize / 2,
        transform : [ { translateX: -screenWidth / 2 } ],
        overflow: 'hidden'
    },
    loginContainer: {
        height: circleSize,
        width: circleSize / 2,
        backgroundColor: '#fafafa',
        overflow: 'hidden',
        justifyContent: 'center'
    },
    inputContainer: {
        justifyContent: 'center',
        height: 50,
        width: circleSize / 2 - 50,
        backgroundColor: 'white',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5

    },
    shadowStrong: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.5,
        elevation: 5

    },
    inputContainerStyle: {
        height: 20, 
        borderBottomColor: 'transparent',
        justifyContent: 'center',
        
    },
    inputHolder: {
        justifyContent: 'center',
        height: 50,
        paddingTop: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2
    },
    inputHolderDown: {
        justifyContent: 'center',
        height: 50,
        paddingTop: 25,
    },
    inputImg: {
        height: 15,
        width: 15,
        tintColor: 'grey'
    },
    leftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: circleSize,
        width: circleSize / 2,
        backgroundColor: 'grey',
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    leftImg: {
        height: 80,
        width: 80,
        transform: [{ rotate: "180deg" }],
    },
    loginButtonPos: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 20,
        overflow: 'hidden',
        left: circleSize / 2 - 50 - 20,
    },
    regButtonCont: {
        height: 60,
        width: 400,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'transparent', 
        overflow: 'hidden',
        bottom: circleSize / 7,
        left: -25
    },
    forgotButtonCont: {
        height: 60,
        width: 400,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'transparent', 
        overflow: 'hidden',
        bottom: circleSize / 4.2,
        left: -25
    }
});


export default styles;