import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from "expo-av";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const CardLearn = (params) => {

    const wordData = params.wordData;
    const userLanguage = params.lang;
    
    const [translation, setTranslation] = useState(wordData.eng)
    


    const playWordSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: wordData.soundLink },
            { shouldPlay: true }
          );
    }


    useEffect(() => {
        
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
    
    }, [])
    



  return (
    <View style={styles.mainContainer}>

        <LinearGradient style={styles.gradient} colors={['#00BFFF', '#6d28ed']} start={[1, 0.35]} end={[1, 0.65]}>
            <View style={styles.topHalf}>

                <Text style={{...styles.textNor, fontSize: wordData.norexp ? 20 : 24}}>{wordData.nor}</Text>
                <Text style={{...styles.textNorExample, marginTop: wordData.norexp ? 0 : 20}}>{wordData.norEgz}</Text>
                

            </View>
            <View style={styles.bottomHalf}>
                <Text style={{...styles.textTranslation, fontSize: wordData.norexp ? 20 : 24}}>{translation}</Text>
            </View>
            {wordData.soundLink === '' ? <View></View> : <TouchableOpacity style={styles.iconContainer} onPress={playWordSound}>

                <Image style={styles.iconSoundImg} source={require('../../../assets/wordSound.png')} />
            </TouchableOpacity>}
            
        </LinearGradient>
    </View>
  )
}

export default CardLearn

const styles = StyleSheet.create({
    mainContainer: {
        height: screenHeight * 0.6,
        width: screenWidth * 0.7,
        borderRadius: 30,
        marginHorizontal: 10,
        marginTop: 80,
        marginBottom: 80,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 14.5,
        elevation: 5
    },
    gradient: {
        height: '100%',
        width: '100%',
        borderRadius: 30,
    },
    topHalf: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomHalf: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNor: {
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 14
    },
    textNorExample: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    textTranslation: {
        color: 'white',
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
        top: 20
    },
    iconSoundImg: {
        height: 25,
        width: 25,
        tintColor: 'white'
    },

})