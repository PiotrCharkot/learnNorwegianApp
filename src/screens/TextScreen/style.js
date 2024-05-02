import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        backgroundColor: 'black'
    },
    head: {
        height: 90
    },
    symbolCont: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 20,
        
    },
    symbolTxt: {
        fontSize: 48,
        marginRight: 10
    },
    bulbPic: {
        height: 30,
        width: 30,
        marginBottom: 11,
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
    body: {
        flex: 1,
    },
    titleCont: {
        width: '100%',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 26,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    },
    textTitleExp: {
        fontSize: 26,
        fontWeight: '600',
        color: 'white',
        marginBottom: 10
    },
    textMainContainer: {
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    textMain: {
        color: 'white',
        textAlign: 'justify',
        paddingTop: 30,
        paddingBottom: 80,
    },
    textExpressions: {
        color: 'white',
        textAlign: 'justify' ,
        paddingTop: 10,
        paddingBottom: 0,
    },
    bonusPointsContainer: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row'
    },
    bonusPointsText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#00308f'
    },
    daysValContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        left: 0
    },
    daysValText: {
        fontSize: 24,
        fontWeight: '500',
        color: 'brown'
    },
    sunImg: {
        height: 20,
        width: 20,
        tintColor: 'brown'
    },
    photosContainer: {
        width: '100%',
        marginTop: 80
    },
    photoHolder: {
        width: '100%', 
        alignItems: 'center',
        marginBottom: 20
        
    },
    photo: {
        width: screenWidth - 50, 
        height: screenWidth - 50,
        borderRadius: 6,
        borderWidth: 3,
        borderColor: 'white',
        marginBottom: 5
    },
    photoDesc: {

    }
});


export default styles;