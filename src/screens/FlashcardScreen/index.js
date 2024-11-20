import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { onAuthStateChanged  } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { db } from '../../../firebase/firebase-config'
import { collection } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import styles from './style'
import { authentication } from '../../../firebase/firebase-config';
import CardFlashList from '../../components/cards/CardFlashList';
import CardWordGame from '../../components/cards/CardWordGame';
import useRevenueCat from '../../../hooks/useRevenueCat';


const screenWidth = Dimensions.get('window').width;

const isWideScreen = screenWidth > 550
const cardHeight = screenWidth * 0.5
const transparent = 'rgba(255,255,255,0)';

const usersWordsInfo = collection(db, 'usersWordsInfo');

const FlashcardScreen = () => {
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { currentOffering, customerInfo, isProMember} = useRevenueCat();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleLanguageHight = useRef(new Animated.Value(0)).current;
  const translateLanguage = useRef(new Animated.Value(isWideScreen ? 110 : 100)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;


  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [userId, setUserId] = useState('userId');
  const [userName, setUserName] = useState('');
  const [random, setRandom] = useState(0);
  const [cardText, setCardText] = useState(['part', 'Expressions', 'Irregular verbs']);
  const [gameText, setGameText] = useState('word game');
  const [buttonText, setButtonText] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [sound, setSound] = useState();
  const [firstLaunchTime, setFirstLaunchTime] = useState(null);
  const [within168Hours, setWithin168Hours] = useState(true);

  const userHasAccess = isProMember || within168Hours;

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

  const scaleCardHolder23 = scrollY.interpolate({
    inputRange: [ cardHeight * 21, cardHeight * 22 , cardHeight * 23],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder24 = scrollY.interpolate({
    inputRange: [ cardHeight * 22, cardHeight * 23 , cardHeight * 24],
    outputRange: [0.8, 1, 0.8],
    
  });

  const scaleCardHolder25 = scrollY.interpolate({
    inputRange: [ cardHeight * 23, cardHeight * 24 , cardHeight * 25],
    outputRange: [0.8, 1, 0.8],
    
  });


  const imagesMain = [require('../../../assets/topPictures/flashcards/cards2.png'), require('../../../assets/topPictures/flashcards/cards3.png'), require('../../../assets/topPictures/flashcards/cards4.png'), require('../../../assets/topPictures/flashcards/cards5.png'), require('../../../assets/topPictures/flashcards/cards6.png'), require('../../../assets/topPictures/flashcards/cards8.png'), require('../../../assets/topPictures/flashcards/cards9.png'), require('../../../assets/topPictures/flashcards/cards10.png'), require('../../../assets/topPictures/flashcards/cards12.png')];
  const imagesMainBlurred = [require('../../../assets/topPictures/flashcards/cards2blur.png'), require('../../../assets/topPictures/flashcards/cards3blur.png'), require('../../../assets/topPictures/flashcards/cards4blur.png'), require('../../../assets/topPictures/flashcards/cards5blur.png'), require('../../../assets/topPictures/flashcards/cards6blur.png'), require('../../../assets/topPictures/flashcards/cards8blur.png'), require('../../../assets/topPictures/flashcards/cards9blur.png'), require('../../../assets/topPictures/flashcards/cards10blur.png'), require('../../../assets/topPictures/flashcards/cards12blur.png')];

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      if (key === 'sound' && result === '0') {
        setIsSoundOn(false);
      } else if (key === 'sound' && result === '1') {
        setIsSoundOn(true);
      } else if (key === 'language') {
        setChoosenLanguage(result);
      }
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

    if (isSoundOn) {
      playSound();
    }
    
  }


  useFocusEffect(
    useCallback(() => {

      
      getValueFor('language');
      getValueFor('sound');
      
    }, [])
  );


  useEffect(() => {

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/cameraClick.wav')
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, []);


  const playSound = async () => {
    await sound?.replayAsync(); 
  };


  

  useEffect(() => {
    
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await SecureStore.getItemAsync('firstLaunchTime'); 
        if (firstLaunch === null) {

          const currentTime = new Date().toISOString();
          await SecureStore.setItemAsync('firstLaunchTime', currentTime);
          setFirstLaunchTime(currentTime);
        } else {
          setFirstLaunchTime(firstLaunch);
          console.log('in flashcard screen it has launched before: ', firstLaunch);
        }

        // Calculate the time difference and set the boolean value
        if (firstLaunch !== null) {
          const firstLaunchDate = new Date(firstLaunch);
          const currentDate = new Date();
          const timeDifference = currentDate - firstLaunchDate;

          
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          console.log('it has launched before and hours difference in flashcard screen is: ', hoursDifference);


          if (hoursDifference >= 168) { // 168 in prod
            setWithin168Hours(false);
          }
        }
      } catch (error) {
        console.error('Error setting first launch time:', error);
      }
    };

    checkFirstLaunch();
    
  }, [])
  


  useEffect(() => {
    if (choosenLanguage === 'PL') {
      setCardText(['część', 'Wyrażenia', 'Nieregularne czasowniki']);
      setButtonText('Moje fiszki');
      setGameText('gra słowna');
    } else if (choosenLanguage === 'DE') {
      setCardText(['Teil', 'Ausdrücke', 'Unregelmäßige Verben']);
      setButtonText('Meine Karteikarten');
      setGameText('Wortspiel');
    } else if (choosenLanguage === 'LT') {
      setCardText(['dalį', 'Išraiškos', 'Netaisyklingi veiksmažodžiai']);
      setButtonText('Mano mokymosi kortelės');
      setGameText('žodžių žaidimas');
    } else if (choosenLanguage === 'AR') {
      setCardText(['جزء', 'تعبيرات', 'أفعال غير منتظمة']);
      setButtonText('بطاقاتي التعليمية');
      setGameText('لعبة الكلمات');
    } else if (choosenLanguage === 'UA') {
      setCardText(['частина', 'Вирази', 'Неправильні дієслова']);
      setButtonText('Мої картки');
      setGameText('гра зі словами');
    } else if (choosenLanguage === 'ES') {
      setCardText(['parte', 'Expresiones', 'Verbos irregulares']);
      setButtonText('Mis tarjetas');
      setGameText('juego de palabras');
    } else if (choosenLanguage === 'EN') {
      setCardText(['part', 'Expressions', 'Irregular verbs']);
      setButtonText('My Flashcards');
      setGameText('word game');
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
            <TouchableOpacity style={styles.buttonContainer} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => navigation.navigate({
              name: 'MyList',
              params: {userRef: userId, language: choosenLanguage}
            })}>
              <Text style={styles.textButton}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        
          <View style={styles.choosenLanguageContainer}>
            <TouchableOpacity style={styles.languageContainer} onPress={() => changeLanguage(choosenLanguage)}>
            <Text style={styles.languageText}>{choosenLanguage}</Text>
              <Image style={styles.iconLanguageImg} source={require('../../../assets/flags/language.png')} />
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

            <CardFlashList refNummer={'1'} userIdRef={userId} title={`A1 - ${cardText[0]} 1 - (55)`} language={choosenLanguage} userName={userName} hasAccess={true}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder2}]}}>

            <CardFlashList refNummer={'2'} userIdRef={userId} title={`A1 - ${cardText[0]} 2 - (55)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder3}]}}>

            <CardFlashList refNummer={'3'} userIdRef={userId} title={`A1 - ${cardText[0]} 3 - (54)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder4}]}}>

            <CardWordGame title={`A1 - A2 ${gameText}`} language={choosenLanguage} hasAccess={userHasAccess} btnAdj={'A1Adjectives'} btnNoun={'A1Nouns'} btnVerb={'A1Verbs'}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder5}]}}>

            <CardFlashList refNummer={'4'} userIdRef={userId} title={`A1 - ${cardText[1]} - (61)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder6}]}}>

            <CardFlashList refNummer={'5'} userIdRef={userId} title={`A2 - ${cardText[0]} 1 - (51)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder7}]}}>

            <CardFlashList refNummer={'6'} userIdRef={userId} title={`A2 - ${cardText[0]} 2 - (51)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder8}]}}>

            <CardFlashList refNummer={'7'} userIdRef={userId} title={`A2 - ${cardText[0]} 3 - (49)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder9}]}}>

            <CardFlashList refNummer={'8'} userIdRef={userId} title={`B1 - ${cardText[0]} 1 - (45)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder10}]}}>

            <CardFlashList refNummer={'9'} userIdRef={userId} title={`B1 - ${cardText[0]} 2 - (46)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder11}]}}>

            <CardFlashList refNummer={'10'} userIdRef={userId} title={`B1 - ${cardText[0]} 3 - (46)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder12}]}}>

            <CardWordGame title={`B1 - B2 ${gameText}`} language={choosenLanguage} hasAccess={userHasAccess} btnAdj={'B1Adjectives'} btnNoun={'B1Nouns'} btnVerb={'B1Verbs'}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder13}]}}>

            <CardFlashList refNummer={'11'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 1 - (55)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder14}]}}>

            <CardFlashList refNummer={'12'} userIdRef={userId} title={`B2 - ${cardText[0]} 1 - (45)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder15}]}}>

            <CardFlashList refNummer={'13'} userIdRef={userId} title={`B2 - ${cardText[0]} 2 - (45)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder16}]}}>

            <CardFlashList refNummer={'14'} userIdRef={userId} title={`B2 - ${cardText[0]} 3 - (44)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder17}]}}>

            <CardFlashList refNummer={'15'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 2 - (55)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder18}]}}>

            <CardFlashList refNummer={'16'} userIdRef={userId} title={`C1 - ${cardText[0]} 1 - (43)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder19}]}}>

            <CardFlashList refNummer={'17'} userIdRef={userId} title={`C1 - ${cardText[0]} 2 - (44)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder20}]}}>

            <CardFlashList refNummer={'18'} userIdRef={userId} title={`C1 - ${cardText[0]} 3 - (43)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder21}]}}>

            <CardWordGame title={`C1 - C2 ${gameText}`} language={choosenLanguage} hasAccess={userHasAccess} btnAdj={'C1Adjectives'} btnNoun={'C1Nouns'} btnVerb={'C1Verbs'}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder22}]}}>

            <CardFlashList refNummer={'19'} userIdRef={userId} title={`${cardText[2]} - ${cardText[0]} 3 - (55)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>
          
          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder23}]}}>

            <CardFlashList refNummer={'20'} userIdRef={userId} title={`C2 - ${cardText[0]} 1 - (42)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder24}]}}>

            <CardFlashList refNummer={'21'} userIdRef={userId} title={`C2 - ${cardText[0]} 2 - (42)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
          </Animated.View>

          <Animated.View style={{...styles.cardHolder, transform: [{scale: scaleCardHolder25}]}}>

            <CardFlashList refNummer={'22'} userIdRef={userId} title={`C2 - ${cardText[0]} 3 - (40)`} language={choosenLanguage} userName={userName} hasAccess={userHasAccess}/>
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
          <Image style={styles.flagImg} source={require('../../../assets/flags/united-kingdom.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('DE')}>
          <Text style={styles.languageText}>DE</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/german.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('PL')}>
          <Text style={styles.languageText}>PL</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/poland.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('LT')}>
          <Text style={styles.languageText}>LT</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/lithuania.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('UA')}>
          <Text style={styles.languageText}>UA</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/ukraine.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('ES')}>
          <Text style={styles.languageText}>SP</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/spain.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.languageContainerList} onPress={() => changeLanguage('AR')}>
          <Text style={styles.languageText}>AR</Text>
          <Image style={styles.flagImg} source={require('../../../assets/flags/arabic.png')} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{...styles.whiteOverlay, opacity: overlayOpacity, transform: [{translateX: overlayOffset}]}}></Animated.View>
    </View>
  )
}

export default FlashcardScreen