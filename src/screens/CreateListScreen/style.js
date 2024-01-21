import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white'
    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'grey'
    },
    iconXContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 50,
        top: 50
    },
    inputContainer: {
        marginTop: 80,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: 'white'
    },
    labelText: {
        fontSize: 12
    },
    input: {
        fontSize: 14
    },
    addingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    inputSmallContainerStyle: {
        width: 125
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%'
    },
    opacityBtn: {
        height: 50, 
        width: 150,
        backgroundColor: 'pink',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    opacityBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500'
    },
    infoContainer: {
        height: 65
    },
    textInfo: {
        color: 'grey',
        fontSize: 12
    },
    addedWords: {
        flex: 1,
    },
    wordsContainer: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    flatList: {
        
    },
    wordsText: {
        fontSize: 16
    },
    image: {
        height: 16,
        width: 16,
        marginLeft: 10,
    },
    checkboxContainer: {
        marginBottom: 50
    },
    messageContainer: {
        position: 'absolute',
        alignItems: 'center',
        width: screenWidth - 50,
        
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderColor: 'grey',
        
        borderRadius: 10,
        top: 100,
        left: 25
    },
    confirmationBtn: {
        marginHorizontal: 20,
        borderWidth: 2,
        borderColor: 'white',
        padding: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
        marginTop: 20
    },
    opacityBtnTextInfo: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        color: 'white',
        marginTop: 20,
        paddingHorizontal: 10

    }

});


export default styles;

