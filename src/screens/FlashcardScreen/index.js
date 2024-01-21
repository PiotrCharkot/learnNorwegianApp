import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { onAuthStateChanged  } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style'
import { authentication } from '../../../firebase/firebase-config';
import uuid from 'react-native-uuid';
import CardFlashList from '../../components/cards/CardFlashList';


const screenWidth = Dimensions.get('window').width;
const cardHeight = screenWidth * 0.5
const transparent = 'rgba(255,255,255,0)';

const usersWordsInfo = collection(db, 'usersWordsInfo');

const FlashcardScreen = () => {
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleLanguageHight = useRef(new Animated.Value(0)).current;
  const translateLanguage = useRef(new Animated.Value(100)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;


  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [userId, setUserId] = useState('userId');
  const [userName, setUserName] = useState('');
  const [random, setRandom] = useState(0);

  const opacityImgBlur = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1]
  });

  const scaleImgOnDrag = scrollY.interpolate({
    inputRange: [-60, 0, 60],
    outputRange: [1.5, 1, 1],
    extrapolateRight: "clamp",
  });

  const scaleCardHolder = scrollY.interpolate({
    inputRange: [-cardHeight, 0, cardHeight],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder2 = scrollY.interpolate({
    inputRange: [ 0, cardHeight, cardHeight * 2],
    outputRange: [0.8, 1, 0.8],
    
  });


  const scaleCardHolder3 = scrollY.interpolate({
    inputRange: [ cardHeight, cardHeight * 2 , cardHeight * 3],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder4 = scrollY.interpolate({
    inputRange: [ cardHeight * 2, cardHeight * 3 , cardHeight * 4],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder5 = scrollY.interpolate({
    inputRange: [ cardHeight * 3, cardHeight * 4 , cardHeight * 5],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder6 = scrollY.interpolate({
    inputRange: [ cardHeight * 4, cardHeight * 5 , cardHeight * 6],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder7 = scrollY.interpolate({
    inputRange: [ cardHeight * 5, cardHeight * 6 , cardHeight * 7],
    outputRange: [0.8, 1, 0.8],
    
  });
  

  const scaleCardHolder8 = scrollY.interpolate({
    inputRange: [ cardHeight * 6, cardHeight * 7 , cardHeight * 8],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder9 = scrollY.interpolate({
    inputRange: [ cardHeight * 7, cardHeight * 8 , cardHeight * 9],
    outputRange: [0.8, 1, 0.8],
    
  });


  const scaleCardHolder10 = scrollY.interpolate({
    inputRange: [ cardHeight * 8, cardHeight * 9 , cardHeight * 10],
    outputRange: [0.8, 1, 0.8],
    
  });


  const scaleCardHolder11 = scrollY.interpolate({
    inputRange: [ cardHeight * 9, cardHeight * 10 , cardHeight * 11],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder12 = scrollY.interpolate({
    inputRange: [ cardHeight * 10, cardHeight * 11 , cardHeight * 12],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder13 = scrollY.interpolate({
    inputRange: [ cardHeight * 11, cardHeight * 12 , cardHeight * 13],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder14 = scrollY.interpolate({
    inputRange: [ cardHeight * 12, cardHeight * 13 , cardHeight * 14],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder15 = scrollY.interpolate({
    inputRange: [ cardHeight * 13, cardHeight * 14 , cardHeight * 15],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder16 = scrollY.interpolate({
    inputRange: [ cardHeight * 14, cardHeight * 15 , cardHeight * 16],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder17 = scrollY.interpolate({
    inputRange: [ cardHeight * 15, cardHeight * 16 , cardHeight * 17],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder18 = scrollY.interpolate({
    inputRange: [ cardHeight * 16, cardHeight * 17 , cardHeight * 18],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder19 = scrollY.interpolate({
    inputRange: [ cardHeight * 17, cardHeight * 18 , cardHeight * 19],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder20 = scrollY.interpolate({
    inputRange: [ cardHeight * 18, cardHeight * 19 , cardHeight * 20],
    outputRange: [0.8, 1, 0.8],
    
  });


  const imagesMain = [require('../../../assets/reindeerRobo1.png'), require('../../../assets/reindeerRobo2.png'), require('../../../assets/reindeerRobo3.png'), require('../../../assets/reindeerRobo4.png'), require('../../../assets/reindeerRobo5.png'), require('../../../assets/reindeerRobo6.png')];
  const imagesMainBlurred = [require('../../../assets/reindeerRobo1Blurred.png'), require('../../../assets/reindeerRobo2Blurred.png'), require('../../../assets/reindeerRobo3Blurred.png'), require('../../../assets/reindeerRobo4Blurred.png'), require('../../../assets/reindeerRobo5Blurred.png'), require('../../../assets/reindeerRobo6Blurred.png')];

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("Here's your value", result);
      setChoosenLanguage(result);
    } else {
      console.log('No values stored under that key.');
    }
  }


  const changeLanguage = (language) => {
    if (language !== null) {
      setChoosenLanguage(language);
      save('language', language);
    }
    if (!languageListOpen) {
      setLanguageListOpen(true)
      Animated.timing(scaleLanguageHight, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
      
    } else {
      setLanguageListOpen(false)
      Animated.timing(scaleLanguageHight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    }
    
  }


  useFocusEffect(
    useCallback(() => {

      
      getValueFor('language');
  
      
    }, [])
  );


  useEffect(() => {
    const unscubscribe = onAuthStateChanged(authentication, (authUser) => {
        
      if (authUser) {

        if (authUser.isAnonymous) {
          setUserName('Guest');
        } else {
          setUserName(authUser.displayName);
        }

        setUserId(authUser.uid)
      }
    });


    let tempVal = Math.floor(Math.random() * imagesMain.length);
    setRandom(tempVal);
    

    return unscubscribe;
  }, [])


  useEffect(() => {

    let docId = uuid.v4();
    let docId6 = uuid.v4();

    // const setDataToFb = async () => {
    //   await setDoc(doc(db, 'usersWordsInfo', docId), {
    //     userReference: userId,
    //     wordList: [
    //       {
    //         refToList: '1',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },{
    //         refToList: '2',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },
    //       {
    //         refToList: '3',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },{
    //         refToList: '4',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },
    //       {
    //         refToList: '5',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },{
    //         refToList: '6',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },
    //       {
    //         refToList: '8',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       },{
    //         refToList: '9',
    //         words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    //         words2: [],
    //         words3: [],
    //         words4: [],
    //         words5: [],
    //       }
    //     ],
        
    //   });
    // }

    const setNewWordsToFb = async () => {
      console.log('should upload to db');
      await setDoc(doc(db, 'words', docId6), {
        refNum: '1',
        title: 'A1 - words',
        wordsArr: [
          {
            nor: 'en bil',
            eng: 'a car',
            pl: 'samochód',
            ar: 'سيارة',
            ger: 'ein Auto',
            lt: 'automobilis',
            ua: 'автомобіль', 
            sp: 'un coche',
            key: '0',
            norEgz: 'Han kjører en bil.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbil.mp3?alt=media&token=994e0f46-bc52-411f-8614-ed11bea959c8',
            wordId: 0
          },
          {
            nor: 'stor',
            eng: 'big',
            pl: 'duży',
            ar: 'كبير',
            ger: 'groß',
            lt: 'didelis',
            ua: 'великий', 
            sp: 'grande',
            key: '1',
            norEgz: 'Det er en stor hund.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fstor.mp3?alt=media&token=cd01dbdf-b602-4e93-9ffe-b32599565abb',
            wordId: 1
          },
          {
            nor: 'lang',
            eng: 'long',
            pl: 'długi',
            ar: 'طويل',
            ger: 'lang',
            lt: 'ilgas',
            ua: 'довгий', 
            sp: 'largo',
            key: '2',
            norEgz: 'Broen er lang.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Flang.mp3?alt=media&token=968d6e30-3a78-40a6-b254-d89fb4e9a749',
            wordId: 2
          },
          {
            nor: 'høy',
            eng: 'tall',
            pl: 'wysoki',
            ar: 'طويل القامة',
            ger: 'groß',
            lt: 'aukštas',
            ua: 'високий', 
            sp: 'alto',
            key: '3',
            norEgz: 'Han er høy.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fhooy.mp3?alt=media&token=dc477bb9-2921-4b1d-84d3-1f53fe0cfd63',
            wordId: 3
          },
          {
            nor: 'lav',
            eng: 'low',
            pl: 'niski',
            ar: 'منخفض',
            ger: 'niedrig',
            lt: 'žemas',
            ua: 'низький', 
            sp: 'bajo',
            key: '4',
            norEgz: 'Taket er lavt.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Flav.mp3?alt=media&token=7031e79f-3ac1-48e5-857f-709b493277c3',
            wordId: 4
          },
          {
            nor: 'å bo',
            eng: 'to live',
            pl: 'mieszkać',
            ar: 'أن يعيش',
            ger: 'wohnen',
            lt: 'gyventi',
            ua: 'жити', 
            sp: 'vivir',
            key: '5',
            norEgz: 'Vi bor i Norge.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbo.mp3?alt=media&token=d06c822d-5c69-4dae-aa35-82a2477c2e7c',
            wordId: 5
          },
          {
            nor: 'å stå',
            eng: 'to stand',
            pl: 'stać',
            ar: 'يقف',
            ger: 'stehen',
            lt: 'stovėti',
            ua: 'стояти', 
            sp: 'estar de pie',
            key: '6',
            norEgz: 'Han står ved døren.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fstaa.mp3?alt=media&token=3f7552fe-a9b0-43ab-9269-577674275a2c',
            wordId: 6
          },
          {
            nor: 'å sitte',
            eng: 'to sit',
            pl: 'siedzieć',
            ar: 'جلس',
            ger: 'sitzen',
            lt: 'sėdėti',
            ua: 'сидіти', 
            sp: 'sentarse',
            key: '7',
            norEgz: 'Hun sitter på stolen.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fsitte.mp3?alt=media&token=0f05cab9-248b-4a5b-9626-b538c71d31af',
            wordId: 7
          },
          {
            nor: 'tung',
            eng: 'heavy',
            pl: 'ciężki',
            ar: 'ثقيل',
            ger: 'schwer',
            lt: 'sunkus',
            ua: 'важкий', 
            sp: 'pesado',
            key: '8',
            norEgz: 'Denne boken er tung.',
            soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ftung.mp3?alt=media&token=9a3892b8-d173-4b1c-ae87-a3d15b9e8f65',
            wordId: 8
          },
          {
              nor: 'et fjell',
              eng: 'a mountain',
              pl: 'góra',
              ar: 'جبل',
              ger: 'ein Berg',
              lt: 'kalnas',
              ua: 'гора', 
              sp: 'una montaña',
              key: '9',
              norEgz: 'Det er et fjell i nærheten.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ffjell.mp3?alt=media&token=ee408a00-a0e7-4d2f-8173-9b20bdefacb0',
              wordId: 9
            },
            {
              nor: 'en sofa',
              eng: 'a sofa',
              pl: 'sofa',
              ar: 'أريكة',
              ger: 'ein Sofa',
              lt: 'sofa',
              ua: 'диван', 
              sp: 'un sofá',
              key: '10',
              norEgz: 'Vi har en ny sofa.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fsofa.mp3?alt=media&token=8799ff44-f022-47d4-b7e8-9719589eb592',
              wordId: 10
            },
            {
              nor: 'en seng',
              eng: 'a bed',
              pl: 'łóżko',
              ar: 'سرير',
              ger: 'ein Bett',
              lt: 'lova',
              ua: 'ліжко', 
              sp: 'una cama',
              key: '11',
              norEgz: 'Sengen er myk.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fseng.mp3?alt=media&token=fd1d2f96-fdc8-4f56-bf02-c385776ba4b9',
              wordId: 11
            },
            {
              nor: 'liten',
              eng: 'small',
              pl: 'mały',
              ar: 'صغير',
              ger: 'klein',
              lt: 'mažas',
              ua: 'маленький', 
              sp: 'pequeño',
              key: '12',
              norEgz: 'Det er en liten katt.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fliten.mp3?alt=media&token=e8608887-2e76-42e1-b138-d02968a92dc6',
              wordId: 12
            },
            {
              nor: 'et tre',
              eng: 'a tree',
              pl: 'drzewo',
              ar: 'شجرة',
              ger: 'ein Baum',
              lt: 'medis',
              ua: 'дерево', 
              sp: 'un árbol',
              key: '13',
              norEgz: 'Det er et tre i hagen.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ftre.mp3?alt=media&token=d213ef92-6bd5-49cd-8496-acda9ad2a8e3',
              wordId: 13
            },
            {
              nor: 'en blomst',
              eng: 'a flower',
              pl: 'kwiat',
              ar: 'زهرة',
              ger: 'eine Blume',
              lt: 'gėlė',
              ua: 'квітка', 
              sp: 'una flor',
              key: '14',
              norEgz: 'Han ga henne en blomst.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fblomst.mp3?alt=media&token=cc895940-29b4-41c1-8ac8-24b8c5face40',
              wordId: 14
            },
            {
              nor: 'kjølig',
              eng: 'cool',
              pl: 'chłodny',
              ar: 'بارد',
              ger: 'kühl',
              lt: 'vėsus',
              ua: 'прохолодний', 
              sp: 'fresco',
              key: '15',
              norEgz: 'Været er kjølig i dag.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fkjoolig.mp3?alt=media&token=2456b08f-503b-4608-9471-f8088297faa6',
              wordId: 15
            },
            {
              nor: 'tørr',
              eng: 'dry',
              pl: 'suchy',
              ar: 'جاف',
              ger: 'trocken',
              lt: 'sausas',
              ua: 'сухий', 
              sp: 'seco',
              key: '16',
              norEgz: 'Klærne er tørre nå.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ftoorr.mp3?alt=media&token=4258ffd1-910d-46d4-970a-0e5e71a0fd46',
              wordId: 16
            },
            {
              nor: 'våt',
              eng: 'wet',
              pl: 'mokry',
              ar: 'مبلل',
              ger: 'nass',
              lt: 'šlapias',
              ua: 'мокрий', 
              sp: 'mojado',
              key: '17',
              norEgz: 'Gulvet er vått.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fvaat.mp3?alt=media&token=a92a350c-8793-4f10-a6db-34ee69d4c7b7',
              wordId: 17
            },{
              nor: 'sterk',
              eng: 'strong',
              pl: 'mocny',
              ar: 'قوي',
              ger: 'stark',
              lt: 'stiprus',
              ua: 'сильний', 
              sp: 'fuerte',
              key: '18',
              norEgz: 'Han er en sterk mann.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fsterk.mp3?alt=media&token=c24a7702-26c6-41d7-b25a-7a82a2a39f1e',
              wordId: 18
            },
            {
              nor: 'svak',
              eng: 'weak',
              pl: 'słaby',
              ar: 'ضعيف',
              ger: 'schwach',
              lt: 'silpnas',
              ua: 'слабкий', 
              sp: 'débil',
              key: '19',
              norEgz: 'Signalet er svakt her.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fsvak.mp3?alt=media&token=60d34454-1dd4-455f-b2e6-c2cbfcb6b4fd',
              wordId: 19
            },
            {
              nor: 'rask',
              eng: 'fast',
              pl: 'szybki',
              ar: 'سريع',
              ger: 'schnell',
              lt: 'greitas',
              ua: 'швидкий', 
              sp: 'rápido',
              key: '20',
              norEgz: 'Han løper veldig raskt.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Frask.mp3?alt=media&token=a67eeb87-1360-4d0f-9de8-0a8551157068',
              wordId: 20
            },
            {
              nor: 'en kake',
              eng: 'a cake',
              pl: 'ciasto',
              ar: 'كعكة',
              ger: 'ein Kuchen',
              lt: 'tortas',
              ua: 'торт', 
              sp: 'un pastel',
              key: '21',
              norEgz: 'Hun laget en kake til festen.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fkake.mp3?alt=media&token=e9ccf858-92cd-44e9-acae-042826d58374',
              wordId: 21
            },
            {
              nor: 'en sykkel',
              eng: 'a bicycle',
              pl: 'rower',
              ar: 'دراجة',
              ger: 'ein Fahrrad',
              lt: 'dviratis',
              ua: 'велосипед', 
              sp: 'una bicicleta',
              key: '22',
              norEgz: 'Han sykler til jobben.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fsykkel.mp3?alt=media&token=618c4200-13cb-4745-80f3-12691892cb5f',
              wordId: 22
            },
            {
              nor: 'en båt',
              eng: 'a boat',
              pl: 'łódź',
              ar: 'قارب',
              ger: 'ein Boot',
              lt: 'valtis',
              ua: 'човен', 
              sp: 'un barco',
              key: '23',
              norEgz: 'De reiste med en båt.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbaat.mp3?alt=media&token=6a8777b3-e15c-4b5a-a9c4-6dc26f062284',
              wordId: 23
            },
            {
              nor: 'treg',
              eng: 'slow',
              pl: 'wolny',
              ar: 'بطيء',
              ger: 'langsam',
              lt: 'lėtas',
              ua: 'повільний', 
              sp: 'lento',
              key: '24',
              norEgz: 'Datamaskinen min er veldig treg.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ftreg.mp3?alt=media&token=6acd7120-530a-46dc-823b-988ba0a2ec49',
              wordId: 24
            },
            {
              nor: 'pen',
              eng: 'pretty',
              pl: 'ładny',
              ar: 'جميلة',
              ger: 'hübsch',
              lt: 'gražus',
              ua: 'гарний', 
              sp: 'bonito',
              key: '25',
              norEgz: 'Hun er en pen jente.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fpen.mp3?alt=media&token=5481b467-0dca-4539-9647-df6c9b28c122',
              wordId: 25
            },
            {
              nor: 'en telefon',
              eng: 'a telephone',
              pl: 'telefon',
              ar: 'هاتف',
              ger: 'ein Telefon',
              lt: 'telefonas',
              ua: 'телефон', 
              sp: 'un teléfono',
              key: '26',
              norEgz: 'Han ringte meg på telefonen.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ftelefon.mp3?alt=media&token=4c5dcbeb-a30e-439c-829f-77191c8fb202',
              wordId: 26
            },
            {
              nor: 'en avis',
              eng: 'a newspaper',
              pl: 'gazeta',
              ar: 'جريدة',
              ger: 'eine Zeitung',
              lt: 'laikraštis',
              ua: 'газета', 
              sp: 'un periódico',
              key: '27',
              norEgz: 'Jeg leser avisen hver morgen.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Favis.mp3?alt=media&token=a99c9bca-c128-4f30-ba97-fd90698ae65a',
              wordId: 27
            },
            {
              nor: 'et speil',
              eng: 'a mirror',
              pl: 'lustro',
              ar: 'مرآة',
              ger: 'ein Spiegel',
              lt: 'veidrodis',
              ua: 'дзеркало', 
              sp: 'un espejo',
              key: '28',
              norEgz: 'Hun så seg selv i speilet.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fspeil.mp3?alt=media&token=860c19b1-9c72-44d9-8fc8-83076af5d7a5',
              wordId: 28
            },
            {
              nor: 'kort',
              eng: 'short',
              pl: 'krótki',
              ar: 'قصير',
              ger: 'kurz',
              lt: 'trumpas',
              ua: 'короткий', 
              sp: 'corto',
              key: '29',
              norEgz: 'Filmen var kort, men god.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fkort.mp3?alt=media&token=b6f354a3-8ef9-40e6-8cc5-e39f123d2caa',
              wordId: 29
            },
            {
              nor: 'en venn',
              eng: 'a friend',
              pl: 'przyjaciel',
              ar: 'صديق',
              ger: 'ein Freund',
              lt: 'draugas',
              ua: 'друг', 
              sp: 'un amigo',
              key: '30',
              norEgz: 'Han er en god venn av meg.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fvenn.mp3?alt=media&token=177a17bc-3293-495a-b53f-e50e6a072f77',
              wordId: 30
            },
            {
              nor: 'en jente',
              eng: 'a girl',
              pl: 'dziewczyna',
              ar: 'فتاة',
              ger: 'ein Mädchen',
              lt: 'mergaitė',
              ua: 'дівчина', 
              sp: 'una chica',
              key: '31',
              norEgz: 'Det er en jente i parken.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fjente.mp3?alt=media&token=2f35c7b7-c3dc-4210-b3fb-071e77f467c0',
              wordId: 31
            },
            {
              nor: 'en gutt',
              eng: 'a boy',
              pl: 'chłopiec',
              ar: 'ولد',
              ger: 'ein Junge',
              lt: 'berniukas',
              ua: 'хлопець', 
              sp: 'un chico',
              key: '32',
              norEgz: 'Han er en snill gutt.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fgutt.mp3?alt=media&token=afc817af-2488-4810-adc9-ff8a0db1b2e0',
              wordId: 32
            },
            {
              nor: 'å få',
              eng: 'to get',
              pl: 'dostać',
              ar: 'الحصول على',
              ger: 'bekommen',
              lt: 'gauti',
              ua: 'отримати',
              sp: 'obtener',
              key: '33',
              norEgz: 'Jeg fikk en gave fra henne.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ffaa.mp3?alt=media&token=e975bbf1-d4ff-43d8-bb89-5218805b69b5',
              wordId: 33
            },
            {
              nor: 'å ville',
              eng: 'to want',
              pl: 'chcieć',
              ar: 'يريد',
              ger: 'wollen',
              lt: 'norėti',
              ua: 'хотіти',
              sp: 'querer',
              key: '34',
              norEgz: 'Han ville gå på kino.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fville.mp3?alt=media&token=68914219-53ff-45ac-a103-b7b5c01a1ad2',
              wordId: 34
            },
            {
              nor: 'å kunne',
              eng: 'to be able',
              pl: 'móc',
              ar: 'يستطيع',
              ger: 'können',
              lt: 'galėti',
              ua: 'могти',
              sp: 'poder',
              key: '35',
              norEgz: 'Hun kunne ikke finne nøklene sine.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fkunne.mp3?alt=media&token=cbc28c39-0a78-46a2-b1ca-072b363a4e9f',
              wordId: 35
            },
            {
              nor: 'å måtte',
              eng: 'to have to',
              pl: 'musieć',
              ar: 'يجب أن',
              ger: 'müssen',
              lt: 'turėti',
              ua: 'мати',
              sp: 'tener que',
              key: '36',
              norEgz: 'Vi måtte vente i en time.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fmaatte.mp3?alt=media&token=02f2a784-2710-44ff-9eeb-46c1b851df58',
              wordId: 36
            },
            {
              nor: 'et barn',
              eng: 'a child',
              pl: 'dziecko',
              ar: 'طفل',
              ger: 'ein Kind',
              lt: 'vaikas',
              ua: 'дитина',
              sp: 'un niño',
              key: '37',
              norEgz: 'Det er et søtt barn.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbarn.mp3?alt=media&token=75e9e474-3305-4699-b276-8aa25abbbdc1',
              wordId: 37
            },
            {
              nor: 'en familie',
              eng: 'a family',
              pl: 'rodzina',
              ar: 'عائلة',
              ger: 'eine Familie',
              lt: 'šeima',
              ua: 'сім’я',
              sp: 'una familia',
              key: '38',
              norEgz: 'Familien vår bor i Norge.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Ffamilie.mp3?alt=media&token=456ee8d5-78fe-4967-a73f-f78165b03c68',
              wordId: 38
            },
            {
              nor: 'et hus',
              eng: 'a house',
              pl: 'dom',
              ar: 'بيت',
              ger: 'ein Haus',
              lt: 'namas',
              ua: 'будинок',
              sp: 'una casa',
              key: '39',
              norEgz: 'Vi kjøpte et nytt hus.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fhus.mp3?alt=media&token=f42d6cc4-2585-4498-90c9-00393910ee09',
              wordId: 39
            },
            {
              nor: 'en bok',
              eng: 'a book',
              pl: 'książka',
              ar: 'كتاب',
              ger: 'ein Buch',
              lt: 'knyga',
              ua: 'книга',
              sp: 'un libro',
              key: '40',
              norEgz: 'Jeg leser en interessant bok.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbok.mp3?alt=media&token=b72147af-c18b-4504-b421-9ae701b02c55',
              wordId: 40
            },
            {
              nor: 'å reise',
              eng: 'to travel',
              pl: 'podróżować',
              ar: 'السفر',
              ger: 'reisen',
              lt: 'keliauti',
              ua: 'подорожувати',
              sp: 'viajar',
              key: '41',
              norEgz: 'De liker å reise rundt i verden.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Freise.mp3?alt=media&token=c2a0e50a-1e12-44af-853d-54eb9943f575',
              wordId: 41
          },
          {
              nor: 'å lytte',
              eng: 'to listen',
              pl: 'słuchać',
              ar: 'يستمع',
              ger: 'zuhören',
              lt: 'klausytis',
              ua: 'слухати',
              sp: 'escuchar',
              key: '42',
              norEgz: 'Hun lytter nøye til musikken.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Flytte.mp3?alt=media&token=be3d123d-ddd5-4013-9f6b-d70d5178ac64',
              wordId: 42
          },
          {
              nor: 'å lære',
              eng: 'to learn',
              pl: 'uczyć się',
              ar: 'تعلم',
              ger: 'lernen',
              lt: 'mokytis',
              ua: 'вчитися',
              sp: 'aprender',
              key: '43',
              norEgz: 'Jeg vil lære å snakke norsk.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fleere.mp3?alt=media&token=febdecc0-e9d4-440c-8f48-ea54f8942dbb',
              wordId: 43
          },
          {
              nor: 'en stol',
              eng: 'a chair',
              pl: 'krzesło',
              ar: 'كرسي',
              ger: 'ein Stuhl',
              lt: 'kėdė',
              ua: 'стілець',
              sp: 'una silla',
              key: '44',
              norEgz: 'Sett deg ned på stolen.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fstol.mp3?alt=media&token=d689b1b0-d210-4106-924f-b3fbebd8ca6f',
              wordId: 44
          },
          {
              nor: 'et bord',
              eng: 'a table',
              pl: 'stół',
              ar: 'طاولة',
              ger: 'ein Tisch',
              lt: 'stalas',
              ua: 'стіл',
              sp: 'una mesa',
              key: '45',
              norEgz: 'Vi spiste middag ved bordet.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fbord.mp3?alt=media&token=dc049ce7-478b-4910-bd8d-09ea9badabaf',
              wordId: 45
          },
          {
              nor: 'en skole',
              eng: 'a school',
              pl: 'szkoła',
              ar: 'مدرسة',
              ger: 'eine Schule',
              lt: 'mokykla',
              ua: 'школа',
              sp: 'una escuela',
              key: '46',
              norEgz: 'Barna går på skolen hver dag.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fskole.mp3?alt=media&token=26087d43-8fb9-465b-b615-b6c8ae9ad63f',
              wordId: 46
          },
          {
              nor: 'å se',
              eng: 'to see',
              pl: 'zobaczyć',
              ar: 'أنظر',
              ger: 'sehen',
              lt: 'matyti',
              ua: 'дивитися',
              sp: 'ver',
              key: '47',
              norEgz: 'Kan du se månen i kveld?',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fse.mp3?alt=media&token=8b1dfd13-b9df-4854-9deb-bed4f03872c9',
              wordId: 47
          },
          {
              nor: 'å spise',
              eng: 'to eat',
              pl: 'jeść',
              ar: 'يأكل',
              ger: 'essen',
              lt: 'valgyti',
              ua: 'їсти',
              sp: 'comer',
              key: '48',
              norEgz: 'Vi spiser middag klokka seks.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fspise.mp3?alt=media&token=94f0d894-ea58-461c-a006-acde95933f20',
              wordId: 48
          },
          {
              nor: 'en lærer',
              eng: 'a teacher',
              pl: 'nauczyciel',
              ar: 'معلم',
              ger: 'ein Lehrer',
              lt: 'mokytojas',
              ua: 'вчитель',
              sp: 'un profesor',
              key: '49',
              norEgz: 'Læreren underviser i klasserommet.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fleerer.mp3?alt=media&token=2669dfa8-b1b0-49b6-9857-bb4baf3a8b21',
              wordId: 49
          },
          {
              nor: 'et eple',
              eng: 'an apple',
              pl: 'jabłko',
              ar: 'تفاحة',
              ger: 'ein Apfel',
              lt: 'obuolys',
              ua: 'яблуко',
              sp: 'una manzana',
              key: '50',
              norEgz: 'Hun spiser et eple til lunsj.',
              soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Feple.mp3?alt=media&token=27062beb-9a12-44e1-9654-3d9ad143701e',
              wordId: 50
        },
        {
          nor: 'en dør',
          eng: 'a door',
          pl: 'drzwi',
          ar: 'باب',
          ger: 'eine Tür',
          lt: 'durys',
          ua: 'двері',
          sp: 'una puerta',
          key: '51',
          norEgz: 'Åpne døren, vær så snill.',
          soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fdoor.mp3?alt=media&token=36df259e-d77b-4fbf-b54a-dc52f33b4109',
          wordId: 51
        },
        {
          nor: 'et vindu',
          eng: 'a window',
          pl: 'okno',
          ar: 'نافذة',
          ger: 'ein Fenster',
          lt: 'langas',
          ua: 'вікно',
          sp: 'una ventana',
          key: '52',
          norEgz: 'Han åpnet vinduet for å få frisk luft.',
          soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fvindu.mp3?alt=media&token=612490f2-e675-4a57-af64-66a44182d0ca',
          wordId: 52
        },
        {
          nor: 'en katt',
          eng: 'a cat',
          pl: 'kot',
          ar: 'قطة',
          ger: 'eine Katze',
          lt: 'katė',
          ua: 'кіт',
          sp: 'un gato',
          key: '53',
          norEgz: 'Katten vår heter Luna.',
          soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fkatt.mp3?alt=media&token=3193bfa2-904d-4dd8-bcbc-0b9988a5a92f',
          wordId: 53
        },
        {
          nor: 'en hund',
          eng: 'a dog',
          pl: 'pies',
          ar: 'كلب',
          ger: 'ein Hund',
          lt: 'šuo',
          ua: 'собака',
          sp: 'un perro',
          key: '54',
          norEgz: 'Hunden min elsker å gå tur.',
          soundLink: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fhund.mp3?alt=media&token=6f48901c-fab9-42ba-9c9b-a03a7f38d4dc',
          wordId: 54
        }
        
      ]
      });
    }


    //setNewWordsToFb() ///////////////// do not cancel this for now!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // const getDataFb = async () => {

    //     const q = query(usersWordsInfo, where('userReference', '==', userId))
    //     const querySnapshot = await getDocs(q);

    //     if (querySnapshot.empty) {
    //       //setDataToFb();
    //       console.log('no data for userWordsInfo for this user in flashcard screen. this is an error. there should be document for this user!');
    //     } else {
    //       console.log('found document for user in userWordsInfo in flashcards');
    //     }
        
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " !====> ", doc.data());

    //     });

    // }

    // if (userId !== 'userId') {

    //   getDataFb();
    // }



    // return () => {
    //     getDataFb;
    // };
}, [userId])




  useEffect(() => {

    if (isFocused) {
      Animated.sequence([
        
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
    
        Animated.timing(overlayOffset, {
          toValue: -screenWidth,
          duration: 10,
          useNativeDriver: true
        }),
    
      ]).start()
    } else {
      Animated.sequence([
        Animated.timing(overlayOffset, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true
        }),
    
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true
        }),
      ]).start()
      
    }
    
  }, [isFocused])


  return (
    
    <View style={styles.mainContainer}>
      <View style={styles.head}>
        <View style={styles.headBottom}>
          <View style={styles.createButtonContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate({
              name: 'MyList',
              params: {userRef: userId}
            })}>
              <Text style={styles.textButton}>My lists</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.choosenLanguageContainer}>
            <TouchableOpacity style={styles.languageContainer} onPress={() => changeLanguage(choosenLanguage)}>
            <Text style={styles.languageText}>{choosenLanguage}</Text>
              <Image style={styles.iconLanguageImg} source={require('../../../assets/language.png')} />
            </TouchableOpacity>
            
          </View>
          
        </View>
      </View>

      
      <Animated.ScrollView onScroll={Animated.event(
        [{nativeEvent: {contentOffset: { y: scrollY}}}], 
        {useNativeDriver: true}
        )}
      scrollEventThrottle={16}
      >

        <View style={styles.listContainer}>
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder}]}}>

            <CardFlashList refNummer={'1'} userIdRef={userId} title={'A1 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder2}]}}>

            <CardFlashList refNummer={'2'} userIdRef={userId} title={'A1 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder3}]}}>

            <CardFlashList refNummer={'3'} userIdRef={userId} title={'A1 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder4}]}}>

            <CardFlashList refNummer={'4'} userIdRef={userId} title={'A1 - Expressions'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder5}]}}>

            <CardFlashList refNummer={'5'} userIdRef={userId} title={'A2 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder6}]}}>

            <CardFlashList refNummer={'6'} userIdRef={userId} title={'A2 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder7}]}}>

            <CardFlashList refNummer={'7'} userIdRef={userId} title={'A2 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder8}]}}>

            <CardFlashList refNummer={'8'} userIdRef={userId} title={'B1 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder9}]}}>

            <CardFlashList refNummer={'9'} userIdRef={userId} title={'B1 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder10}]}}>

            <CardFlashList refNummer={'10'} userIdRef={userId} title={'B1 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder11}]}}>

            <CardFlashList refNummer={'11'} userIdRef={userId} title={'Irregular verbs'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder12}]}}>

            <CardFlashList refNummer={'12'} userIdRef={userId} title={'B2 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder13}]}}>

            <CardFlashList refNummer={'13'} userIdRef={userId} title={'B2 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder14}]}}>

            <CardFlashList refNummer={'14'} userIdRef={userId} title={'B2 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder15}]}}>

            <CardFlashList refNummer={'15'} userIdRef={userId} title={'C1 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder16}]}}>

            <CardFlashList refNummer={'16'} userIdRef={userId} title={'C1 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder17}]}}>

            <CardFlashList refNummer={'17'} userIdRef={userId} title={'C1 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder18}]}}>

            <CardFlashList refNummer={'18'} userIdRef={userId} title={'C2 - part 1'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder19}]}}>

            <CardFlashList refNummer={'19'} userIdRef={userId} title={'C2 - part 2'} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder20}]}}>

            <CardFlashList refNummer={'20'} userIdRef={userId} title={'C2 - part 3'} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <View style={styles.marginBottom}></View>
        </View>

        <Animated.Image style={{...styles.mainImg, transform: [{scale: scaleImgOnDrag}]}} source={imagesMain[random]}/>
        <Animated.Image style={{...styles.mainImg, opacity: opacityImgBlur}} source={imagesMainBlurred[random]}/>
        <Animated.View style={{...styles.gradientContainer, transform: [{scale: scaleImgOnDrag}]}}>

        <LinearGradient colors={['white', transparent, transparent, transparent, transparent, 'white']} start={[0.0, 0.0]} end={[0.0, 1.0]}  style={{...styles.gradinetImg}}>
        </LinearGradient>
        </Animated.View>
      

      </Animated.ScrollView>
        
      <Animated.View style={{...styles.languageList, transform: [{scaleY: scaleLanguageHight}, {translateY: translateLanguage}]}}>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('EN')}>
          <Text style={styles.languageText}>EN</Text>
          <Image style={styles.flagImg} source={require('../../../assets/united-kingdom.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('DE')}>
          <Text style={styles.languageText}>DE</Text>
          <Image style={styles.flagImg} source={require('../../../assets/german.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('PL')}>
          <Text style={styles.languageText}>PL</Text>
          <Image style={styles.flagImg} source={require('../../../assets/poland.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('LT')}>
          <Text style={styles.languageText}>LT</Text>
          <Image style={styles.flagImg} source={require('../../../assets/lithuania.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('UA')}>
          <Text style={styles.languageText}>UA</Text>
          <Image style={styles.flagImg} source={require('../../../assets/ukraine.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('ES')}>
          <Text style={styles.languageText}>SP</Text>
          <Image style={styles.flagImg} source={require('../../../assets/spain.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('AR')}>
          <Text style={styles.languageText}>AR</Text>
          <Image style={styles.flagImg} source={require('../../../assets/arabic.png')} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{...styles.whiteOverlay, opacity: overlayOpacity, transform: [{translateX: overlayOffset}]}}></Animated.View>
    </View>
  )
}

export default FlashcardScreen