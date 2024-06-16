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
    readingButtonContainer: {
        flexDirection: 'row',
        margin: 10,
        height: 28
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: 'rgba(184, 41, 227, 0.5)',
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: 'rgba(184, 41, 227, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bookPic: {
        height: 16,
        width: 16, 
        marginLeft: 10,
        tintColor: 'brown'
    },
    textButton: {
        fontWeight: '600',
        color: 'brown',
        fontSize: 12
    },
    flatListsContainer: {
        marginTop: 235,
    },
    flatListsContainerBottom: {
        marginTop: 50,
    },
    flatListsContainerLast: {
        marginTop: 50,
        marginBottom: 200
    },
    titleContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255, 0.6)',
        borderRadius: 10,
        height: 20,
        width: 120,
        top: -10,
        left: screenWidth / 2 - 60
    },
    titleText: {
        fontWeight: '900',
        fontSize: 16,
        color: 'brown'
    },
    flatlist: {
        height: screenWidth * 0.35 + 110,
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