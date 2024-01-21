import { View, Text, Animated, TouchableOpacity, Easing, StyleSheet, Dimensions, Image, Pressable } from 'react-native'
import React, { useRef, useState} from 'react'
import { useEffect } from 'react';
import { Audio } from "expo-av";
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../buttons/GradientButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const rotationTime = 400;

const CardFlippy = (params) => {

    const wordData = params.wordData;
    const userLanguage = params.lang;
    const flipAllCards = params.setFlip;
    

    const [flipFromStart, setFlipFromStart] = useState(params.flipFromStart);
    const [translation, setTranslation] = useState(wordData.eng)

    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueTrans = useRef(new Animated.Value(-90)).current;

    const rotateVal = interpolatedValue.interpolate({
        inputRange: [0, 90],
        outputRange: ["0deg", "90deg"]
    })

    const rotateValTrans = interpolatedValueTrans.interpolate({
        inputRange: [-90, 0],
        outputRange: ["-90deg", "0deg"]
    })
    

    const playWordSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: wordData.soundLink },
            { shouldPlay: true }
          );
    }

    const rotateCard = () => {
        if (!flipFromStart) {
            Animated.timing(interpolatedValue, {
                toValue: 90,
                duration: rotationTime,
                easing: Easing.bezier(.49,.13,1,1),
                useNativeDriver: true
            }).start();
            Animated.timing(interpolatedValueTrans, {
                toValue: 0,
                duration: rotationTime,
                delay: rotationTime,
                easing: Easing.bezier(.67,1.08,1,1),
                useNativeDriver: true
            }).start();
        }
        
    }

    const rotateCardBack = () => {
        
        Animated.timing(interpolatedValueTrans, {
            toValue: -90,
            duration: rotationTime,
            easing: Easing.bezier(.49,.13,1,1),
            useNativeDriver: true
        }).start();
        Animated.timing(interpolatedValue, {
            toValue: 0,
            duration: rotationTime,
            delay: rotationTime,
            easing: Easing.bezier(.67,1.08,1,1),
            useNativeDriver: true
        }).start();
    }


    
    useEffect(() => {

        if (flipFromStart) {
            Animated.timing(interpolatedValue, {
                toValue: 90,
                duration: 0,
                useNativeDriver: true
            }).start();
            Animated.timing(interpolatedValueTrans, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }).start();
            setFlipFromStart(false)
        }
        if (flipAllCards) {  
            rotateCard()
        } else {
            rotateCardBack()
        }

        if (userLanguage === 'PL') {
            setTranslation(wordData.pl)
        } else if (userLanguage === 'DE') {
            setTranslation(wordData.ger)
        } else if (userLanguage === 'LT') {
            setTranslation(wordData.lt)
        } else if (userLanguage === 'AR') {
            setTranslation(wordData.ar)
        } else if (userLanguage === 'UA') {
            setTranslation(wordData.ua)
        } else if (userLanguage === 'ES') {
            setTranslation(wordData.sp)
        }

    }, [params])

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={{...styles.norView, transform: [{perspective: 500}, {rotateY: rotateVal}]}}>
        <LinearGradient colors={['#002D72', '#7B68EE']} style={styles.gradientNor}>
            <Text style={styles.textNor}>{wordData.nor}</Text>
            <Text style={{...styles.textNorExample, marginTop: wordData.norexp ? 0 : 160}}>{wordData.irr ? translation : wordData.norEgz}</Text>

            <View style={styles.buttonYesContainer}>
                <GradientButton  
                height={40} 
                width={100 }
                colorA={'#00308F'} 
                colorB={'#007FFF'} 
                callbackFunc={() => {params.callbackFunc(wordData.wordId)}} 
                path={'wordUp'} 
                heightIcon={15} 
                widthIcon={15}
                startGradient={[1.0, 0.0]}
                endGradient={[1.0, 1.0]}
                borderTopRightRadius={15} 
                borderBottomRightRadius={15} 
                borderTopLeftRadius={15} 
                borderBottomLeftRadius={15} 
                />
            </View>

            <View style={styles.buttonNoContainer}>
                <GradientButton  
                height={40} 
                width={100 }
                colorA={'#00308F'} 
                colorB={'#007FFF'} 
                callbackFunc={() => {params.callbackFunc2(wordData.wordId)}} 
                path={'wordDown'} 
                heightIcon={15} 
                widthIcon={15}
                startGradient={[1.0, 0.0]}
                endGradient={[1.0, 1.0]}
                borderTopRightRadius={15} 
                borderBottomRightRadius={15} 
                borderTopLeftRadius={15} 
                borderBottomLeftRadius={15} 
                />
            </View>
            
            <Pressable style={styles.opacityFlip}  onPress={rotateCard}>
                <Image style={styles.imgFlip} source={require('../../../assets/flip.png')} />
            </Pressable>
            {wordData.soundLink === '' ? <View></View> : <TouchableOpacity style={styles.iconContainer} onPress={playWordSound}>
                <Image style={styles.iconSoundImg} source={require('../../../assets/wordSound.png')} />
            </TouchableOpacity>}
            
        </LinearGradient>
      </Animated.View>
      <Animated.View style={{...styles.transView, transform: [{perspective: 500}, {rotateY: rotateValTrans}]}}>
        <LinearGradient colors={['#00BFFF', '#6d28ed']} style={styles.gradientNor}>
            <Text style={styles.textTranslation}>{wordData.irr ? wordData.norEgz : translation}</Text>
            <Pressable style={styles.opacityFlip}  onPress={rotateCardBack}>
                <Image style={styles.imgFlip} source={require('../../../assets/flip.png')} />
            </Pressable>
        </LinearGradient>
      </Animated.View>
    </View>
  )
}

export default CardFlippy


const styles = StyleSheet.create({
    mainContainer: {
        height: screenHeight * 0.6,
        width: screenWidth * 0.7,
        borderRadius: 30,
        marginHorizontal: 10,
        marginTop: 80,
        marginBottom: 80,
        overflow: 'visible',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 14.5,
        elevation: 5
       
    },
    norView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        borderRadius: 30
    },
    gradientNor: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    transView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon',
        borderRadius: 30
        
    },
    opacityFlip: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    imgFlip: {
        height: 30,
        width: 30,
        tintColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.2,
        elevation: 5
    },
    textNor: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.2,
        elevation: 5
    },
    textNorExample: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    textTranslation: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        shadowColor: 'black',
        textAlign: 'center',
        paddingHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 1.2,
        elevation: 5
    },
    buttonYesContainer: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 14.5,
        elevation: 5
    },
    buttonNoContainer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 14.5,
        elevation: 5
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    iconSoundImg: {
        height: 25,
        width: 25,
        tintColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1.2,
        elevation: 5
    },
});