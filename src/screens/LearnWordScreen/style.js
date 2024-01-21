import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        flex: 1
    },
    header: {
        height: 80,
        width: "100%",
        backgroundColor: 'rgba(255,255,255,0)',
        justifyContent: 'flex-end',
    },
    headBottom: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    createButtonContainer: {
        flexDirection: 'row',
        margin: 10,
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
        color: 'brown'
    },
    iconXContainer: {
        flexDirection: 'row',
        margin: 10,
        overflow: 'visible'
    },
    xContainer: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    iconXImg:{
        height: 20,
        width: 20,
        tintColor: 'black',
    },
    titleContainer: {
        marginTop: 20
    },

    body: {
        
        alignItems: 'flex-start',
        flex: 1
    },
    loaderDisplay: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    bonusPointsContainer: {
        position: 'absolute',
        right: 20,
        flexDirection: 'row',
        
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
    titleContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        paddingTop: 5
    },
    titleText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'grey'
    },
    
});


export default styles;