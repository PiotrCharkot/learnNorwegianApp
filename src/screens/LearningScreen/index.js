import { View, Text, Animated, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { authentication } from '../../../firebase/firebase-config';
import { onAuthStateChanged  } from 'firebase/auth';
import { Audio } from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';
import styles from './style';
import Card from '../../components/cards/Card';
import CardBlack from '../../components/cards/CardBlack';
import learningList1 from '../../listData/learningLists/learningList1';
import learningList2 from '../../listData/learningLists/learningList2';
import learningList3 from '../../listData/learningLists/learningList3';
import learningList4 from '../../listData/learningLists/learningList4';
import learningList5 from '../../listData/learningLists/learningList5';
import learningList6 from '../../listData/learningLists/learningList6';
import learningList7 from '../../listData/learningLists/learningList7';
import useRevenueCat from '../../../hooks/useRevenueCat';
import adminIDs from '../../listData/otherData/adminIDs';


const screenWidth = Dimensions.get('window').width;
const isWideScreen = screenWidth > 550;
const cardSize = screenWidth * 0.6 + 20;
const spacerSize = (screenWidth - cardSize) / 2;

const colorsBackFlatlist = ['#f2d891', '#96f291', '#9aedd4', '#91c8f2', '#f291df', '#f29191', '#f2ae91']
const colorsBackFlatlist2 = ['#f21d1d', '#ebf21d', '#32f21d', '#1deef2', '#1d2bf2', '#d21df2', '#f21d72']
const colorsBackFlatlist3 = ['#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac']
const colorsBackFlatlist4 = ['#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa']
const colorsBackFlatlist5 = ['#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac']
const transparent = 'rgba(255,255,255,0)'

const usersAchivments = collection(db, 'usersAchivments');




const LearningScreen = () => {




  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { currentOffering, customerInfo, isProMember} = useRevenueCat();
  

  
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollX2 = useRef(new Animated.Value(0)).current;
  const scrollX3 = useRef(new Animated.Value(0)).current;
  const scrollX4 = useRef(new Animated.Value(0)).current;
  const scrollX5 = useRef(new Animated.Value(0)).current;
  const scrollX6 = useRef(new Animated.Value(0)).current;
  const scrollX7 = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  // const lastPlayedAtRef = useRef(0);
  // const lastPlayedAtRef2 = useRef(0);
  // const lastPlayedAtRef3 = useRef(0);
  // const lastPlayedAtRef4 = useRef(0);
  // const lastPlayedAtRef5 = useRef(0);
  // const lastPlayedAtRef6 = useRef(0);

  const [userId, setUserId] = useState('userId');
  const [dataFlatList, setDataFlatList] = useState([]);
  const [dataFlatList2, setDataFlatList2] = useState([]);
  const [dataFlatList3, setDataFlatList3] = useState([]);
  const [dataFlatList4, setDataFlatList4] = useState([]);
  const [dataFlatList5, setDataFlatList5] = useState([]);
  const [dataFlatList6, setDataFlatList6] = useState([]);
  const [dataFlatList7, setDataFlatList7] = useState([]);
  const [random, setRandom] = useState(0);
  const [readingBtnTxt, setReadingButtonTxt] = useState('Reading Hub');
  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [sound, setSound] = useState();
  const [firstLaunchTime, setFirstLaunchTime] = useState(null);
  const [within168Hours, setWithin168Hours] = useState(true);
  const [getProBtn, setGetProBtn] = useState('upgrade to Pro')

  const userHasAccess = isProMember || within168Hours || adminIDs.includes(userId);
  

  const opacityImgBlur = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1]
  });

  const scaleImgOnDrag = scrollY.interpolate({
    inputRange: [-60, 0, 60],
    outputRange: [1.5, 1, 1],
    extrapolateRight: "clamp",
  });

  const backgroundFlatlist = scrollX.interpolate({
    inputRange: colorsBackFlatlist5.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist5.map((i) => i)
  })

  const backgroundFlatlist7 = scrollX7.interpolate({
    inputRange: colorsBackFlatlist4.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist4.map((i) => i)
  })

  const backgroundFlatlist2 = scrollX2.interpolate({
    inputRange: colorsBackFlatlist3.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist3.map((i) => i)
  })

  const backgroundFlatlist3 = scrollX3.interpolate({
    inputRange: colorsBackFlatlist5.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist5.map((i) => i)
  })

  const backgroundFlatlist4 = scrollX4.interpolate({
    inputRange: colorsBackFlatlist4.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist4.map((i) => i)
  })

  const backgroundFlatlist5 = scrollX5.interpolate({
    inputRange: colorsBackFlatlist3.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist3.map((i) => i)
  })

  const backgroundFlatlist6 = scrollX6.interpolate({
    inputRange: colorsBackFlatlist5.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist5.map((i) => i)
  })




  const imagesMain = [require('../../../assets/topPictures/learning/snow1.png'), require('../../../assets/topPictures/learning/snow2.png'), require('../../../assets/topPictures/learning/snow4.png'), require('../../../assets/topPictures/learning/snow5.png'), require('../../../assets/topPictures/learning/snow6.png'), require('../../../assets/topPictures/learning/snow8.png'), require('../../../assets/topPictures/learning/snow9.png'), require('../../../assets/topPictures/learning/snow10.png'), require('../../../assets/topPictures/learning/snow11.png')];
  const imagesMainBlurred = [require('../../../assets/topPictures/learning/snow1blur.png'), require('../../../assets/topPictures/learning/snow2blur.png'), require('../../../assets/topPictures/learning/snow4blur.png'), require('../../../assets/topPictures/learning/snow5blur.png'), require('../../../assets/topPictures/learning/snow6blur.png'), require('../../../assets/topPictures/learning/snow8blur.png'), require('../../../assets/topPictures/learning/snow9blur.png'), require('../../../assets/topPictures/learning/snow10blur.png'), require('../../../assets/topPictures/learning/snow11blur.png')];



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
      console.log('No values stored under that key: '. key);
    }
  }



  useEffect(() => {
    const unscubscribe = onAuthStateChanged(authentication, (authUser) => {
        
      if (authUser) {

        setUserId(authUser.uid)
      }
    });



    return unscubscribe;
  }, [])


  

  useEffect(() => {
    let tempVal = Math.floor(Math.random() * imagesMain.length);
    setRandom(tempVal);
    

    
    setDataFlatList([{key: 'left-spacer'}, ...learningList1, {key: 'right-spacer'}])
    setDataFlatList2([{key: 'left-spacer'}, ...learningList2, {key: 'right-spacer'}])
    setDataFlatList3([{key: 'left-spacer'}, ...learningList3, {key: 'right-spacer'}])
    setDataFlatList4([{key: 'left-spacer'}, ...learningList4, {key: 'right-spacer'}])
    setDataFlatList5([{key: 'left-spacer'}, ...learningList5, {key: 'right-spacer'}])
    setDataFlatList6([{key: 'left-spacer'}, ...learningList6, {key: 'right-spacer'}])
    setDataFlatList7([{key: 'left-spacer'}, ...learningList7, {key: 'right-spacer'}])
  }, [])



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
          console.log('in learning screen it has launched before: ', firstLaunch);
        }

        // Calculate the time difference and set the boolean value
        if (firstLaunch !== null) {
          const firstLaunchDate = new Date(firstLaunch);
          const currentDate = new Date();
          const timeDifference = currentDate - firstLaunchDate;

          
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          console.log('it has launched before and hours difference in learning screen is: ', hoursDifference);


          if (hoursDifference >= 168) { // 168 in production
            setWithin168Hours(false);
            console.log('free loading is over');
          }
        }
      } catch (error) {
        console.error('Error setting first launch time:', error);
      }
    };

    checkFirstLaunch();
    
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

  useEffect(() => {
    if (choosenLanguage === 'PL') {
      setReadingButtonTxt('Czytaj');
      setGetProBtn('Załóż konto PRO');
    } else if (choosenLanguage === 'DE') {
      setReadingButtonTxt('Lesen');
      setGetProBtn('Hol dir ein PRO-Konto');
    } else if (choosenLanguage === 'LT') {
      setReadingButtonTxt('Skaityk');
      setGetProBtn('Įsigyk PRO paskyrą');
    } else if (choosenLanguage === 'AR') {
      setReadingButtonTxt('اقرأ');
      setGetProBtn('احصل على حساب برو');
    } else if (choosenLanguage === 'UA') {
      setReadingButtonTxt('Читай');
      setGetProBtn('Отримайте PRO-акаунт');
    } else if (choosenLanguage === 'ES') {
      setReadingButtonTxt('Leer');
      setGetProBtn('Obtén una cuenta PRO');
    } else if (choosenLanguage === 'EN') {
      setReadingButtonTxt('Reading Hub');
      setGetProBtn('upgrade to Pro');
    }
  }, [choosenLanguage])


  useFocusEffect(
    useCallback(() => {

      getValueFor('language');
      getValueFor('sound');

      if (userId !== 'userId') {

        getDataFb();
      }
  
      
    }, [userId])
  );


  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/tick.mp3')
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




  const getDataFb = async () => {


    const q = query(usersAchivments, where('userRef', '==', userId))
    const querySnapshot = await getDocs(q);

    
    querySnapshot.forEach((doc) => {
      
      for (let i = 0; i < doc.data().learning.section1.length; i++) {
        
        learningList1[i].stars = doc.data().learning.section1[i]
      }

      for (let i = 0; i < doc.data().learning.section2.length; i++) {
        
        learningList2[i].stars = doc.data().learning.section2[i]
      }
      
      for (let i = 0; i < doc.data().learning.section3.length; i++) {
        
        learningList3[i].stars = doc.data().learning.section3[i]
      }

      for (let i = 0; i < doc.data().learning.section4.length; i++) {
        
        learningList4[i].stars = doc.data().learning.section4[i]
      }

      for (let i = 0; i < doc.data().learning.section5.length; i++) {
        
        learningList5[i].stars = doc.data().learning.section5[i]
      }

      for (let i = 0; i < doc.data().learning.section6.length; i++) {
        
        learningList6[i].stars = doc.data().learning.section6[i]
      }

      if (doc.data().learning.section7) { // section 7 was added in version 2 of data base
        for (let i = 0; i < doc.data().learning.section7.length; i++) {
        
          learningList7[i].stars = doc.data().learning.section7[i]
        }
      }

      

      setDataFlatList([{key: 'left-spacer'}, ...learningList1, {key: 'right-spacer'}])
      setDataFlatList2([{key: 'left-spacer'}, ...learningList2, {key: 'right-spacer'}])
      setDataFlatList3([{key: 'left-spacer'}, ...learningList3, {key: 'right-spacer'}])
      setDataFlatList4([{key: 'left-spacer'}, ...learningList4, {key: 'right-spacer'}])
      setDataFlatList5([{key: 'left-spacer'}, ...learningList5, {key: 'right-spacer'}])
      setDataFlatList6([{key: 'left-spacer'}, ...learningList6, {key: 'right-spacer'}])
      setDataFlatList7([{key: 'left-spacer'}, ...learningList7, {key: 'right-spacer'}])
    });

  }



  const handleScroll = (event) => {
    
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    )(event);
    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef.current);

    // if (diff >= threshold && isSoundOn) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef.current = x - (x % threshold) + (x > lastPlayedAtRef.current ? threshold : 0);
    // }
  };




  const renderCard = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY1 = scrollX.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    return <Animated.View style={{transform: [{translateY: translateY1}]}}>

      <CardBlack
      color3={'#7affff'}
      title={item.title} 
      description={item.description}
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }

  const renderCard2 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist4[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY2 = scrollX2.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    return <Animated.View style={{transform: [{translateY: translateY2}]}}>

      <CardBlack 
      color3={'#fffa96'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }

  const renderCard3 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist3[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY3 = scrollX3.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    return <Animated.View style={{transform: [{translateY: translateY3}]}}>

      <CardBlack 
      color3={'#ff94f6'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }

  const renderCard4 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY4 = scrollX4.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    return <Animated.View style={{transform: [{translateY: translateY4}]}}>

      <CardBlack 
      color3={'#9cffa2'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }

  const renderCard5 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY5 = scrollX5.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    return <Animated.View style={{transform: [{translateY: translateY5}]}}>

      <CardBlack
      color3={'#ffa6a6'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }

  const renderCard6 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY6 = scrollX6.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })



    return <Animated.View style={{transform: [{translateY: translateY6}]}}>

      <CardBlack 
      color3={'#ffffff'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }



  const renderCard7 = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY7 = scrollX7.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })



    return <Animated.View style={{transform: [{translateY: translateY7}]}}>

      <CardBlack 
      color3={'#ffffff'}
      title={item.title} 
      description={item.description} 
      link={item.link} 
      stars={item.stars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      savedLang={choosenLanguage}/>
    </Animated.View>
  }





  const sendToPro = () => {
    navigation.navigate({
      name: 'Paywall',
      params: {language: choosenLanguage}
  })
  }




  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.head}>
        <View style={styles.headBottom}>
          <View style={styles.readingButtonContainer}>
            <TouchableOpacity style={styles.buttonContainer} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => navigation.navigate('Reading', {within168Hours})}>
              <Text style={styles.textButton}>{readingBtnTxt}</Text>
              <Image style={styles.bookPic} source={require('../../../assets/book.png')} />
            </TouchableOpacity>
          </View>
        
         
          {isProMember ? null : <View style={styles.readingButtonContainer}>
            <TouchableOpacity style={styles.buttonContainer} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={sendToPro}>
              <Text style={styles.textButton}>{getProBtn}</Text>
            </TouchableOpacity>
          </View>}
          
          
          
        </View>
      </View>

      <Animated.ScrollView onScroll={Animated.event(
        [{nativeEvent: {contentOffset: { y: scrollY}}}], 
        {useNativeDriver: true}
      )}
      scrollEventThrottle={16}
      >

        <Animated.Image style={{...styles.mainImg, transform: [{scale: scaleImgOnDrag}]}} source={imagesMain[random]}/>
        <Animated.Image style={{...styles.mainImg, opacity: opacityImgBlur}} source={imagesMainBlurred[random]}/>
        <Animated.View style={{...styles.gradientContainer, transform: [{scale: scaleImgOnDrag}]}}>

        <LinearGradient colors={['white', transparent, transparent, transparent, transparent, 'white']} start={[0.0, 0.0]} end={[0.0, 1.0]}  style={{...styles.gradinetImg}}>
        </LinearGradient>
        </Animated.View>
      
        <Animated.View style={{...styles.flatListsContainer, backgroundColor: backgroundFlatlist}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 300 : 240, left: isWideScreen ? screenWidth / 2 -150 : screenWidth / 2 - 120}}>
            <Text style={styles.titleText} allowFontScaling={false}>Grammatical tenses</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList}
            renderItem={renderCard}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist7}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 300 : 240, left: isWideScreen ? screenWidth / 2 -150 : screenWidth / 2 - 120}}>
            <Text style={styles.titleText} allowFontScaling={false}>Pronunciation</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList7}
            renderItem={renderCard7}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX7}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist2}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 300 : 240, left: isWideScreen ? screenWidth / 2 -150 : screenWidth / 2 - 120}}>
            <Text style={styles.titleText} allowFontScaling={false}>Sentence structure</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList2}
            renderItem={renderCard2}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX2}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist3}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 180 : 120, left:isWideScreen ? screenWidth / 2 -90 : screenWidth / 2 - 60}}>
            <Text style={styles.titleText} allowFontScaling={false}>Verb</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList3}
            renderItem={renderCard3}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX3}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist4}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 180 : 120, left: isWideScreen ? screenWidth / 2 -90 : screenWidth / 2 - 60}}>
            <Text style={styles.titleText} allowFontScaling={false}>Noun</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList4}
            renderItem={renderCard4}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX4}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist5}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 340 :  260, left: isWideScreen ? screenWidth / 2 -170 : screenWidth / 2 - 130}}>
            <Text style={styles.titleText} allowFontScaling={false}>Adjectives and Adverbs</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList5}
            renderItem={renderCard5}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX5}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerLast, backgroundColor: backgroundFlatlist6}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={{...styles.titleContainer, width: isWideScreen ? 380 : 280, left: isWideScreen ? screenWidth / 2 -190 : screenWidth / 2 - 140}}>
            <Text style={styles.titleText} allowFontScaling={false}>Pronoun and Determinative</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList6}
            renderItem={renderCard6}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX6}}}],
              {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
          />

        </Animated.View>



      </Animated.ScrollView>
        
      <Animated.View style={{...styles.whiteOverlay, opacity: overlayOpacity, transform: [{translateX: overlayOffset}]}}></Animated.View>
    
      
    </View>
  )
}

export default LearningScreen