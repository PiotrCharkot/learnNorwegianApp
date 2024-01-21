import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const picSize = 150;

const styles = StyleSheet.create({

    mainContainer: {
        height: '100%',
        width: screenWidth,
        backgroundColor: 'white',
        justifyContent: 'flex-start'
    },
    whiteOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    loginButtonContainer: {
        paddingLeft: 10,
        marginTop: 0,
        marginRight: screenWidth - 150,
        width: 100,
    },
    settingsImgContainer: {
        alignItems: 'center',
        width: 40,
    },
    settingsImg: {
        height: 20,
        width: 20,
        tintColor: 'white'
    },
    backgroundTop: {
        flexDirection: 'row',
        left: -screenWidth / 2,
        top: -screenWidth / 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenWidth,
        width: screenWidth * 2 ,
        borderBottomLeftRadius : screenWidth ,
        borderBottomRightRadius : screenWidth ,
        overflow : 'hidden',
        
    },
    bottomContainer: {
        height: screenHeight - screenWidth,
        width: '100%',
        top: -screenWidth / 3,
        overflow: 'visible',
        alignItems: 'center',
        backgroundColor: 'white',
        
    },
    imgContainer: {
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#4c669f', 
        height: picSize, 
        width: picSize, 
        top: - picSize / 2,
        left: screenWidth / 2 - picSize / 2,
        borderRadius: picSize / 2,
        borderWidth: 4,
        borderColor: 'white',
        overflow: "visible"
    },
    infoContainer: {
        width: screenWidth - 80,
        borderWidth: 1, 
        borderColor: 'lightgrey',
        borderRadius: 40,
        marginTop: picSize / 2 + 25,
    },
    scrollStyle: {
        alignItems: 'center',
    },
    topInfo: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    leftTopInfo: {
        width: '50%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderRightColor: 'lightgrey'
    },
    rightTopInfo: {
        width: '50%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointsText: {
        fontSize: 20,
        fontWeight: '700'
    },
    valContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: screenWidth - 120,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
        
    },
    fieldDesc: { 
        height: 35,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    fieldVal: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10
    },
    fieldDescText: {
        color: 'grey',
        fontSize: 12,
    },
    fieldValText: {
        fontWeight: '600',
        fontSize: 12,
    },
    img: {
        height : picSize - 8,
        width : picSize - 8,
        borderRadius: (picSize - 8) / 2,
        overflow: "hidden"
    },
    shadowImg: {
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1.25,
        shadowRadius: 6.5,
        elevation: 5

    },
    textLoginButton: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16
    },
    btnChangePicOpacity: {
        marginTop: 30,
        marginBottom: 30,
        height: 30,
        width: screenWidth - 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderRadius: 15,
    },
    btnChangePicOpacityText: {
        fontSize: 12
    }
});

export default styles;