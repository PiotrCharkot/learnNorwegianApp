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
    backgroundTop: {
        flexDirection: 'row',
        left: -screenWidth / 2,
        top: -screenWidth / 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: screenWidth,
        width: screenWidth * 2 ,
        borderBottomLeftRadius : screenWidth ,
        borderBottomRightRadius : screenWidth ,
        overflow : 'hidden',
        
    },
    xImgContainer: {
        alignItems: 'center',
        width: 40,
        marginRight: screenWidth / 2
    },
    xImg: {
        height: 20,
        width: 20,
        tintColor: 'white'
    },
    bottomContainer: {
        
        width: '100%',
        top: -screenWidth / 3,
        overflow: 'visible',
        alignItems: 'center',
        
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
        overflow: "visible",
        flexDirection: 'row'
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
    buttonContainer: {
        marginTop: picSize / 2 + 45,
        marginBottom: 30,
    },
    cloudContainer: {
        top: -screenWidth / 3,
        marginTop: 70,
        alignItems: 'center'
    },
    blueCloudImg: {
        position: 'absolute',
        height: 100,
        width: 100
    },
    greenCloudImg: {
        position: 'absolute',
        height: 100,
        width: 100,
        transform: [{translateY: -15}]
    }
});

export default styles;