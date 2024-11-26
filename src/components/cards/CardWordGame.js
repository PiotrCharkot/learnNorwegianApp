import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isWideScreen = screenWidth > 550

const CardWordGame = (params) => {

    const {  title, language, hasAccess, btnVerb, btnNoun, btnAdj } = params;
    const navigation = useNavigation();


    const [verbBtn, setVerbBtn] = useState('Verb');
    const [nounBtn, setNounBtn] = useState('Noun');
    const [adjBtn, setAdjBtn] = useState('Adjective');

    const pressVerb = () => {

        if (hasAccess) {
            navigation.navigate('Type10opening', { savedLang: language, refPath: btnVerb })
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: language}
            })
        }
        
    }
    
    const pressNoun = () => {
        
        if (hasAccess) {
            navigation.navigate('Type10opening', { savedLang: language, refPath: btnNoun  })
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: language}
            })
        }
        
    }

    const pressAdj = () => {
        
        if (hasAccess) {
            navigation.navigate('Type10opening', { savedLang: language, refPath: btnAdj  })
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: language}
            })
        }
        
    }


    useEffect(() => {
      
        if (language === 'PL') {
            setVerbBtn('czasownik');
            setNounBtn('rzeczownik');
            setAdjBtn('przymiotnik');
          } else if (language === 'DE') {
            setVerbBtn('Verb');
            setNounBtn('Nomen');
            setAdjBtn('Adjektiv');
          } else if (language === 'LT') {
            setVerbBtn('veiksmažodis');
            setNounBtn('daiktavardis');
            setAdjBtn('būdvardis');
          } else if (language === 'AR') {
            setVerbBtn('فعل');
            setNounBtn('اسم');
            setAdjBtn('صفة');
          } else if (language === 'UA') {
            setVerbBtn('дієслово');
            setNounBtn('іменник');
            setAdjBtn('прикметник');
          } else if (language === 'ES') {
            setVerbBtn('verbo');
            setNounBtn('sustantivo');
            setAdjBtn('adjetivo');
          } else if (language === 'EN') {
            setVerbBtn('Verb');
            setNounBtn('Noun');
            setAdjBtn('Adjective');
          }
      
    }, [language])
    

  return (
    <View style={styles.wrapper}>

        <LinearGradient colors={['#00308f', '#007FFF']} style={styles.mainContainer} start={[0.9, 0.5]} end={[0.1, 0.5]} >
            <Text style={styles.textTitle}>{title}</Text>
           
        </LinearGradient>
            <TouchableOpacity onPress={pressVerb}>
                <View style={styles.verbContainer}>
                    <LinearGradient colors={['#50C878', '#004953']} style={styles.btnGradient}>
                        <Text style={styles.buttonText}>{verbBtn}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressNoun}>
                <View style={styles.nounContainer}>
                    <LinearGradient colors={['#50C878', '#004953']} style={styles.btnGradient}>
                        <Text style={styles.buttonText}>{nounBtn}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressAdj}>
                <View style={styles.adjContainer}>
                    <LinearGradient colors={['#50C878', '#004953']} style={styles.btnGradient}>
                        <Text style={styles.buttonText}>{adjBtn}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>

            {hasAccess ? null : <View style={styles.proContainer}>
                <Image style={styles.proLockImg} source={require('../../../assets/padlock2.png')} />
                <Text style={styles.proText}>PRO</Text>
            </View>}
    </View>
  )
}

export default CardWordGame

const styles = StyleSheet.create({
    mainContainer: {
        height: screenWidth * 0.5,
        width: screenWidth * 0.8,
        paddingRight: screenWidth * 0.4 + 20,
        justifyContent: 'center',
        backgroundColor: 'salmon',
        borderRadius: 30,
        paddingHorizontal: 15
        
    }, 
   
    verbContainer: {
        height: screenWidth * 0.12,
        width: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6d28ed',
        position: 'absolute',
        bottom: screenWidth * 0.5 - screenWidth * 0.12 - 10,
        right: 30,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.5,
        elevation: 5

    },
    nounContainer: {
        height: screenWidth * 0.12,
        width: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6d28ed',
        position: 'absolute',
        bottom: screenWidth * 0.25 - screenWidth * 0.06,
        right: 30,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.5,
        elevation: 5

    },
    adjContainer: {
        height: screenWidth * 0.12,
        width: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b829e3',
        position: 'absolute',
        bottom: 10,
        right: 30,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 4.5,
        elevation: 5

    },
    btnGradient:{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    textTitle: {
        color: 'white',
        fontSize: isWideScreen ? 32 : 20,
        fontWeight: '700',
        textAlign: 'left'
    },
    buttonText: {
        color: 'white',
        fontSize: isWideScreen ? 25 : 14,
        fontWeight: '700'
    },
    proContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 15,
        left: 15,
        transform: [{rotate: '-20deg'}]
    },
    proText: {
        fontSize: 23,
        color: '#4a4a4a',
        fontWeight: '900',
        opacity: 0.5
    },
    proLockImg: {
        height: 15,
        width: 15,
        tintColor: '#4a4a4a',
        opacity: 0.5
    }
});