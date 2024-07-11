import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CardFlashList = (params) => {

    const { refNummer, userIdRef, title, language, userName, hasAccess } = params;
    const navigation = useNavigation();


    const [learnBtn, setLearnBtn] = useState('Learn');
    const [testBtn, setTestBtn] = useState('Test');

    const pressLearn = () => {

        if (hasAccess) {
            navigation.navigate('LearnWord', {refToList: refNummer, userId: userIdRef, savedLang: language, userN: userName})
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: language}
            })
        }
        
    }
    
    const pressTest = () => {
        
        if (hasAccess) {
            navigation.navigate('TestWord', {refToList: refNummer, userId: userIdRef, savedLang: language, own: false, userN: userName})
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: language}
            })
        }
        
    }


    useEffect(() => {
      
        if (language === 'PL') {
            setLearnBtn('Ucz się');
            setTestBtn('Test');
          } else if (language === 'DE') {
            setLearnBtn('Lernen');
            setTestBtn('Testen');
          } else if (language === 'LT') {
            setLearnBtn('Mokytis');
            setTestBtn('Testas');
          } else if (language === 'AR') {
            setLearnBtn('تعلم');
            setTestBtn('اختبار');
          } else if (language === 'UA') {
            setLearnBtn('Вчитися');
            setTestBtn('Тест');
          } else if (language === 'ES') {
            setLearnBtn('Aprender');
            setTestBtn('Prueba');
          } else if (language === 'EN') {
            setLearnBtn('Learn');
            setTestBtn('Test');
          }
      
    }, [language])
    

  return (
    <View style={styles.wrapper}>

        <LinearGradient colors={['#00308f', '#007FFF']} style={styles.mainContainer} start={[0.9, 0.5]} end={[0.1, 0.5]} >
            <Text style={styles.textTitle}>{title}</Text>
           
        </LinearGradient>
            <TouchableOpacity onPress={pressLearn}>
                <View style={styles.leftContainer}>
                    <LinearGradient colors={['#50C878', '#004953']} style={styles.btnGradient}>
                        <Text style={styles.buttonText}>{learnBtn}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressTest}>
                <View style={styles.rightContainer}>
                    <LinearGradient colors={['#50C878', '#004953']} style={styles.btnGradient}>
                        <Text style={styles.buttonText}>{testBtn}</Text>
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

export default CardFlashList

const styles = StyleSheet.create({
    mainContainer: {
        height: screenWidth * 0.5,
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'salmon',
        borderRadius: 30,
        paddingHorizontal: 15
        
    }, 
   
    leftContainer: {
        height: screenWidth * 0.15,
        width: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6d28ed',
        position: 'absolute',
        bottom: -10,
        left: 30,
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
    rightContainer: {
        height: screenWidth * 0.15,
        width: screenWidth * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b829e3',
        position: 'absolute',
        bottom: -10,
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
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
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