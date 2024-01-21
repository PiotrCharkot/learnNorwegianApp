import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width

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
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'grey'
    },
    iconXContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 15,
        height: 28
    },
    flatListsContainer: {
        marginTop: 235,
    },
    titleContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 20,
        width: 120,
        top: -10,
        left: screenWidth / 2 - 60
    },
    titleText: {
        fontWeight: '900',
        fontSize: 16 ,
        color: 'brown'
    },
    flatlist: {
        height: screenWidth * 0.35 + 110,
        paddingTop: 85,
    },
    gradinetFlatlist: {
        top: 0.5,
        position: 'absolute',
        height: screenWidth * 0.35 + 110,
        width: '100%',
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
});


export default styles;