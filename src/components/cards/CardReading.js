import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isWideScreen = screenWidth > 550

const CardReading = (params) => {

    const navigation = useNavigation();

    const wordsOwn = collection(db, 'wordsOwn');

    const [documentId, setDocumentId] = useState(params.docForUpdate);
    const [addBtnTxt, setAddBtnTxt] = useState('Add to your list');
    const [alreadyAdded, setAlreadyAdded] = useState(false);


    const goToReading = () => {

        if (params.hasAccess || !params.requiresPro) {
            navigation.navigate({
                name: 'Text',
                params: {textId: params.textId, language: params.language, within168Hours: params.within168Hours}
            })
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: params.language}
            })
        }
        
    }

    //'#fad346', '#ff8c00' nice orange gradient

    
    


  return (
    <TouchableOpacity style={styles.mainContainer} onPress={goToReading}>
       
        <View style={styles.outterContainer}>

            <View style={styles.greyStripe}>
                <LinearGradient style={styles.gradientStripe} colors={['white', 'lightgrey']} start={[0.5, 0.1]} end={[0, 1]} />
            </View>
            <View style={styles.greyStripe2}>
                <LinearGradient style={styles.gradientStripe2} colors={['white', 'lightgrey']} start={[0.5, 0.1]} end={[0, 1]} />
            </View>
            <View style={styles.greyStripe4}>
                <LinearGradient style={styles.gradientStripe4} colors={['lightgrey', 'white']} start={[0.5, 0.1]} end={[0, 1]} />
            </View>
            <View style={styles.greyStripe3}>
                <LinearGradient style={styles.gradientStripe3} colors={['lightgrey', 'white']} start={[0.5, 0.1]} end={[0, 1]} />
            </View>
            <View style={styles.greyStripe5}>
                <LinearGradient style={styles.gradientStripe5} colors={['lightgrey', 'white']} start={[0.5, 0.1]} end={[0, 1]} />
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.orangeSquare} >
                    <LinearGradient style={styles.gradient} colors={['#ffe600', '#ff8c00']} start={[0.8, 0.1]} end={[0.2, 0.6]} />
                </View>
            </View>

            <Image style={styles.picture} source={require('../../../assets/openBook.png')}/>

            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>{params.level}</Text>
            </View>
                
            <View style={styles.blackSquare}></View>
        </View>
        <View style={styles.titleContainer}> 
            <Text style={styles.titleText} allowFontScaling={false}>{params.title}</Text>
        </View>

        
        {params.hasAccess || !params.requiresPro ? null : <View style={styles.proContainer}>
            <Image style={styles.proLockImg} source={require('../../../assets/padlock2.png')} />
            <Text style={styles.proText}>PRO</Text>
        </View>}
        
    </TouchableOpacity>
  )
}

export default CardReading


const styles = StyleSheet.create({
    mainContainer: {
        height: screenHeight * 0.16,
        width: screenWidth * 0.6,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 0,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.45,
        shadowRadius: 14.5,
        elevation: 5,
    },
    outterContainer: {
        height: screenHeight * 0.16,
        width: screenWidth * 0.6,
        overflow: 'hidden',
        borderRadius: 20,
    },
    innerContainer: {
        height: screenHeight * 0.16,
        width: screenWidth * 0.6,
        overflow: 'hidden',
        borderRadius: 20,
    },
    picture: {
        position: 'absolute',
        height: 40,
        width: 40,
        top: 15,
        right: 15
    },
    levelContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    levelText: {
        fontSize: isWideScreen ? 22 : 10,
        fontWeight: '900'
    },
    orangeSquare: {
        position: 'absolute',
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderRadius: 24,
        transform: [{rotate: '45deg'}, {translateX: 10}, {translateY: -30}],
        overflow: 'hidden'
        
    },
    blackSquare: {
        position: 'absolute',
        backgroundColor: 'black',
        width: screenWidth * 0.3 + 50,
        height: screenWidth * 0.3 + 50,
        borderRadius: 24,
        transform: [{rotate: '45deg'}, {translateX: -66}, {translateY: 10}],
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    gradient: {
        borderRadius: 24,
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        overflow: 'visible'
    },
    greyStripe: {
        position: 'absolute',
        left: screenWidth * 0.4,
        height: screenHeight * 0.16,
        width: 20,
        transform: [{rotate: '45deg'}, {translateY: 80}]
    },
    gradientStripe :{
        height: screenHeight * 0.16,
        width: 20,
    },
    greyStripe2: {
        position: 'absolute',
        left: screenWidth * 0.55,
        height: screenHeight * 0.16,
        width: 25,
        transform: [{rotate: '45deg'}, {translateY: 110}]
    },
    gradientStripe2: {
        height: screenHeight * 0.16,
        width: 25,
    },
    greyStripe3: {
        position: 'absolute',
        left: screenWidth * 0.38,
        height: screenHeight * 0.16,
        width: 10,
        transform: [{rotate: '45deg'}, {translateY: -100}]
    },
    gradientStripe3: {
        height: screenHeight * 0.16,
        width: 10,
    },
    greyStripe4: {
        position: 'absolute',
        left: screenWidth * 0.4,
        height: screenHeight * 0.16,
        width: 10,
        transform: [{rotate: '45deg'}, {translateY: -120}]
    },
    gradientStripe4: {
        height: screenHeight * 0.16,
        width: 10,
    },
    greyStripe5: {
        position: 'absolute',
        left: screenWidth * 0.6,
        height: screenHeight * 0.16,
        width: 10,
        transform: [{rotate: '45deg'}, {translateY: -20}]
    },
    gradientStripe5: {
        height: screenHeight * 0.16,
        width: 30,
    },
    titleContainer: {
        position: 'absolute',
        top: 30,
        left: 10,
        width: isWideScreen ? screenWidth * 0.20 : screenWidth * 0.30,
    },
    titleText: {
        color: 'white',
        fontSize: isWideScreen ? 22 : 12
    },
    proContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 35,
        right: 15,
        transform: [{rotate: '-20deg'}]
    },
    proText: {
        fontSize: 18,
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