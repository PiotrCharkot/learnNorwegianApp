import { StyleSheet, Dimensions } from "react-native";


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    middleContainer: {
        flex: 1,
        marginTop: 120, 
        marginHorizontal: 20,
    },
    
    topContainer: {
        marginTop: 80, 
        marginBottom: 80, 
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    positionFirst: {
        position: 'absolute',
        alignItems: 'center',
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 6,
    },
    positionSecond: {
        position: 'absolute',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 6,
        transform: [{translateX: -90}, {translateY: 40}]
    },
    positionThird: {
        position: 'absolute',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 6,
        transform: [{translateX: 90}, {translateY: 40}]
    },
    pictureFirst: {
        height: 108,
        width: 108,
        borderRadius: 60,
    },
    pictureSecond: {
        height: 88,
        width: 88,
        borderRadius: 50,
    },
    pictureThird: {
        height: 88,
        width: 88,
        borderRadius: 50,
    },
    positionText: {
        top: -35,
        position: 'absolute',
        fontSize: 48,
        fontWeight: '900',
        color: '#ad42f5',
        textShadowColor: 'white',
        textShadowRadius: 10
    },
    userNameTop: {
        position: 'absolute',
        alignItems: 'center',
        borderColor: 'black',
        bottom: - 30,
        fontSize: 16,
        fontWeight: '600',
    },
    pointsTop: {
        position: 'absolute',
        alignItems: 'center',
        borderColor: 'black',
        bottom: - 50,
        fontSize: 12
    },
    switcherContainer: {
        position: 'absolute',
        top: 50,
        right: 20
    },
    switcherText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#ad42f5'
    }

});


export default styles;