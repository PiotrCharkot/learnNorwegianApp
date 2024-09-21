import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width
const isWideScreen = screenWidth > 550

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
        height: isWideScreen ? 400 : 200,
        width: '100%'
    },
    mainImg: {
        position: 'absolute',
        height: isWideScreen ? 400 : 200,
        width: '100%',
        
    },
    gradientContainer: {
        position: 'absolute',
        height: isWideScreen ? 400 : 200,
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
        marginTop: isWideScreen ? 435 : 235,
    },
    flatListsContainerBottom: {
        marginTop: 50,
    },
    flatListsContainerLast: {
        marginTop: 50,
        marginBottom: 150
    },
    titleContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderRadius: 10,
        height: isWideScreen ? 32 : 20,
        width: isWideScreen ? 240 : 160,
        top: isWideScreen ? -15 : -10,
        left: isWideScreen ? screenWidth / 2 - 120 : screenWidth / 2 - 80
    },
    titleText: {
        fontWeight: '900',
        fontSize: isWideScreen ? 24 : 16 ,
        color: 'brown'
    },
    flatlist: {
        height: screenWidth * 0.35 + 90,
        paddingTop: 60,
    },
    gradinetFlatlist: {
        top: 0.5,
        position: 'absolute',
        height: screenWidth * 0.35 + 90,
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
        fontSize: isWideScreen ? 20 : 14,
        color: 'brown'
    },
    iconLanguageImg:{
        height: isWideScreen ? 25 : 20,
        width: isWideScreen ? 25 : 20,
        tintColor: 'black',
    },
    flagImg:{
        height: isWideScreen ? 25 : 20,
        width: isWideScreen ? 25 : 20,
    },
    languageList: {
        position: 'absolute',
        width: isWideScreen ? 70 : 55,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        right: 10,
        padding: 5,
        top: -35,
        borderRadius: 5,
        
    },
});


export default styles;