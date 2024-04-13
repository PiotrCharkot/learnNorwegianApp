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
  const [cardText, setCardText] = useState(['part', 'Expressions', 'Irregular verbs']);
  const [buttonText, setButtonText] = useState('')

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

  const scaleCardHolder21 = scrollY.interpolate({
    inputRange: [ cardHeight * 19, cardHeight * 20 , cardHeight * 21],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder22 = scrollY.interpolate({
    inputRange: [ cardHeight * 20, cardHeight * 21 , cardHeight * 22],
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
    if (choosenLanguage === 'PL') {
      setCardText(['część', 'Wyrażenia', 'Nieregularne czasowniki']);
      setButtonText('Moje fiszki');
    } else if (choosenLanguage === 'DE') {
      setCardText(['Teil', 'Ausdrücke', 'Unregelmäßige Verben']);
      setButtonText('Meine Karteikarten');
    } else if (choosenLanguage === 'LT') {
      setCardText(['dalį', 'Išraiškos', 'Netaisyklingi veiksmažodžiai']);
      setButtonText('Mano mokymosi kortelės');
    } else if (choosenLanguage === 'AR') {
      setCardText(['جزء', 'تعبيرات', 'أفعال غير منتظمة']);
      setButtonText('بطاقاتي التعليمية');
    } else if (choosenLanguage === 'UA') {
      setCardText(['частина', 'Вирази', 'Неправильні дієслова']);
      setButtonText('Мої картки');
    } else if (choosenLanguage === 'ES') {
      setCardText(['parte', 'Expresiones', 'Verbos irregulares']);
      setButtonText('Mis tarjetas');
    } else if (choosenLanguage === 'EN') {
      setCardText(['part', 'Expressions', 'Irregular verbs']);
      setButtonText('My Flashcards');
    }
  }, [choosenLanguage])


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
              <Text style={styles.textButton}>{buttonText}</Text>
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

            <CardFlashList refNummer={'1'} userIdRef={userId} title={`A1 - ${cardText[0]} 1 - (55)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder2}]}}>

            <CardFlashList refNummer={'2'} userIdRef={userId} title={`A1 - ${cardText[0]} 2 - (55)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder3}]}}>

            <CardFlashList refNummer={'3'} userIdRef={userId} title={`A1 - ${cardText[0]} 3 - (54)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder4}]}}>

            <CardFlashList refNummer={'4'} userIdRef={userId} title={`A1 - ${cardText[1]} - (61)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder5}]}}>

            <CardFlashList refNummer={'5'} userIdRef={userId} title={`A2 - ${cardText[0]} 1 - (51)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder6}]}}>

            <CardFlashList refNummer={'6'} userIdRef={userId} title={`A2 - ${cardText[0]} 2 - (51)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder7}]}}>

            <CardFlashList refNummer={'7'} userIdRef={userId} title={`A2 - ${cardText[0]} 3 - (49)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder8}]}}>

            <CardFlashList refNummer={'8'} userIdRef={userId} title={`B1 - ${cardText[0]} 1 - (45)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder9}]}}>

            <CardFlashList refNummer={'9'} userIdRef={userId} title={`B1 - ${cardText[0]} 2 - (46)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder10}]}}>

            <CardFlashList refNummer={'10'} userIdRef={userId} title={`B1 - ${cardText[0]} 3 - (46)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder11}]}}>

            <CardFlashList refNummer={'11'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 1 - (55)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder12}]}}>

            <CardFlashList refNummer={'12'} userIdRef={userId} title={`B2 - ${cardText[0]} 1 - (45)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder13}]}}>

            <CardFlashList refNummer={'13'} userIdRef={userId} title={`B2 - ${cardText[0]} 2 - (45)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder14}]}}>

            <CardFlashList refNummer={'14'} userIdRef={userId} title={`B2 - ${cardText[0]} 3 - (44)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder15}]}}>

            <CardFlashList refNummer={'15'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 2 - (55)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder16}]}}>

            <CardFlashList refNummer={'16'} userIdRef={userId} title={`C1 - ${cardText[0]} 1 - (43)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder17}]}}>

            <CardFlashList refNummer={'17'} userIdRef={userId} title={`C1 - ${cardText[0]} 2 - (44)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder18}]}}>

            <CardFlashList refNummer={'18'} userIdRef={userId} title={`C1 - ${cardText[0]} 3 - (43)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder19}]}}>

            <CardFlashList refNummer={'19'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 3 - (55)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder20}]}}>

            <CardFlashList refNummer={'20'} userIdRef={userId} title={`C2 - ${cardText[0]} 1 - (42)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder21}]}}>

            <CardFlashList refNummer={'21'} userIdRef={userId} title={`C2 - ${cardText[0]} 2 - (42)`} language={choosenLanguage} userName={userName}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder22}]}}>

            <CardFlashList refNummer={'22'} userIdRef={userId} title={`C2 - ${cardText[0]} 3 - (40)`} language={choosenLanguage} userName={userName}/>
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