import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        height: '100%'
    },
    whiteOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    gradinetImg: {
        position: 'absolute',
        height: 200,
        width: '100%'
    },
    mainImg: {
        position: 'absolute',
        height: 200,
        width: '100%',
        
    },
    gradientContainer: {
        position: 'absolute',
        height: 200,
        width: '100%',
    },
    head: {
        height: 80,
        width: "100%",
        backgroundColor: 'rgba(255,255,255,0)',
        justifyContent: 'flex-end'
    },
    headBottom: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    createButtonContainer: {
        flexDirection: 'row',
        margin: 10,
        height: 28
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'rgba(184, 41, 227, 0.5)',
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(184, 41, 227, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        fontWeight: '600',
        color: 'brown',
        fontSize: 12
    },
    choosenLanguageContainer: {
        flexDirection: 'row',
        margin: 10,
        overflow: 'visible'
    },
    languageContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    languageContainerList: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    languageText: {
        marginRight: 5,
        fontWeight: '800',
        fontSize: 14,
        color: 'brown'
    },
    iconLanguageImg:{
        height: 20,
        width: 20,
        tintColor: 'black',
    },
    flagImg:{
        height: 20,
        width: 20,
    },
    languageList: {
        position: 'absolute',
        width: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        right: 10,
        padding: 5,
        top: -35,
        borderRadius: 5,
        
    },
    listContainer: {
        marginTop: screenHeight/2 - 180,
        width: '100%',
        alignItems: 'center',
        overflow: 'visible'
        
    },
    cardHolder: {
        width: screenWidth * 0.8,
        alignItems: 'center', 
        backgroundColor: 'pink',
        overflow: 'visible',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 4.5,
        elevation: 5
    },
    marginBottom: {
        height: 300
    }
    
    
    
});


export default styles;