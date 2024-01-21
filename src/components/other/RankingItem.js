import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef} from 'react';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const RankingItem = (item) => {

    const storage = getStorage();

    const interpolatedValue = useRef(new Animated.Value(0)).current;

    const [imgSrc, setImgSrc] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
    
    const circlePositionDeg = interpolatedValue.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    })



    useEffect(() => {
        
        let randomDelay = Math.floor(Math.random() * 10) * 1000;
        let randomPause = Math.floor(Math.random() * 10) * 1000;
        Animated.loop(
            Animated.sequence([
                Animated.timing(interpolatedValue, {
                    duration: 3000,
                    toValue: 180,
                    delay: randomDelay,
                    speed: 1,
                    bounciness: 12,
                    useNativeDriver: true,
                    isInteraction: false,
                }), Animated.timing(interpolatedValue, {
                    duration: randomPause,
                    toValue: 180,
                    useNativeDriver: true,
                    isInteraction: false,
                }),
            ]), {
                useNativeDriver: true,
                isInteraction: false
            }
        ).start();

        
        getDownloadURL(ref(storage, 'profilePictures/' + item.params.userRef))
        .then((url) => {
            
            setImgSrc(url)
            
        })
        .catch((error) => {
            console.log(error);
            if (error.code === 'storage/object-not-found') {
            console.log('no file for profile');

            
            }
        });


        
    }, [])
    
                     
        
    
  return item.params.userRef === 'extra.png' ? (
    <View style={{height: 160}}></View>
  ) : (
    <View style={styles.wrapper}>

        

        <View style={styles.positionContainer}>
            <Text style={styles.positionText}>{item.params.position}</Text>
        </View>


        
        <LinearGradient colors={ item.params.userRef === item.userRef ? ['#1D976C', '#93F9B9'] : ['#6190E8', '#A7BFE8']} start={[0.8, 0.2]} style={styles.gradient}>
            <LinearGradient colors={ item.params.userRef === item.userRef ? ['#93F9B9', 'white'] : [ '#A7BFE8', 'white']} start={[0.85, 0.5]} end={[0.3, 0.5]} style={styles.colorLine}></LinearGradient>
            <View  style={{...styles.mainContainer}}>
            

                <View style={styles.proContainer}>
                    <Text style={styles.proText}>{item.params.userIsPro ? 'PRO' : ''}</Text>
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{item.params.userName}</Text>
                </View>

                <View style={styles.resultsContainer}>
                    <View style={styles.daysContainer}>
                        <Text style={styles.daysText}>{item.params.lastUpdate !== item.today && item.params.lastUpdate !== item.yesterday ? 0 : item.params.daysInRow}  </Text> 
                        <Animated.Image style={{...styles.pictureSun, transform: [{rotate: circlePositionDeg}] }}  source={require('../../../assets/sun.png')} />
                    </View>
                    <View style={styles.pointsContainer}>
                        <Text style={styles.pointsText}>{item.weekly ? item.params.weeklyPoints : item.params.totalPoints}</Text>
                    </View>
                </View>
                

            </View>
        </LinearGradient>

        
        <Image style={styles.picture}  source={{ uri: imgSrc }} />

            
    </View>
  )
}

export default RankingItem

 

const styles = StyleSheet.create({
    wrapper: {},
    gradient: {
        borderRadius: 25,
    },
    colorLine: {
        position: 'absolute',
        top: -100,
        backgroundColor: '#A7BFE8',
        height: 100,
        width: 300,
        transform: [{rotate: '150deg'}]
    },
    mainContainer: {
        width: screenWidth - 40,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    positionContainer: {
        marginBottom: -20,
        zIndex: 1,
    },
    positionText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ad42f5',
        textShadowColor: 'white',
        textShadowRadius: 10
    },
    picture: {
        position: 'absolute',
        bottom: -5,
        height: 60,
        width: 60,
        borderRadius: 30
    },
    pictureSun: {
        height: 20,
        width: 20,
        tintColor: 'brown'
    },
    nameContainer: {
        marginLeft: 60,
        paddingLeft: 10,
        width: screenWidth / 2 - 50,
        //height: 18,
        //overflow: 'visible',
        //backgroundColor: 'pink'
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    resultsContainer: {
        //height: 20,
        width: screenWidth / 2 - 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    daysContainer: {
        flexDirection: 'row',
        width: (screenWidth / 2 - 50) / 2,
        borderLeftWidth: 0.5,
        borderLeftColor: 'grey',
        borderRightWidth: 0.5,
        borderRightColor: 'grey',
        paddingLeft: 10,
        
    },
    daysText: {
        fontSize: 16,
        fontWeight: '400',
    },
    pointsContainer: {
        paddingRight: 20
    },
    pointsText: {
        fontSize: 16,
        fontWeight: '400',
    },
    proContainer: {
        position: 'absolute',
        right: 30,
        transform: [{rotate: '-7deg'}],
        
    },
    proText: {
        fontSize: 70,
        color: 'rgba(255, 255, 255, 0.15)',
        fontWeight: '900'
    },
})