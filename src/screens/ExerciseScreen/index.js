import { View, Text, Image, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from '../../../firebase/firebase-config'
import { getAuth  } from 'firebase/auth';
import { Audio } from 'expo-av';
import styles from './style'
import LoaderSmall from '../../components/other/LoaderSmall';
import CardExe from '../../components/cards/CardExe';
import exerciseList1 from '../../listData/exerciseLists/exerciseList1';
import exerciseList2 from '../../listData/exerciseLists/exerciseList2';
import exerciseList3 from '../../listData/exerciseLists/exerciseList3';
import exerciseList4 from '../../listData/exerciseLists/exerciseList4';
import exerciseList5 from '../../listData/exerciseLists/exerciseList5';
import useRevenueCat from '../../../hooks/useRevenueCat';


const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.6 + 20;
const spacerSize = (screenWidth - cardSize) / 2;
const colorsBackFlatlist = ['#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#d9acfa']
const colorsBackFlatlist2 = ['#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#d9acfa', '#b0faac']
const colorsBackFlatlist3 = ['#b4acfa', '#faacf3', '#faacac', '#f9faac', '#d9acfa', '#b0faac', '#acf9fa']
const colorsBackFlatlist4 = ['#faacf3', '#faacac', '#f9faac', '#d9acfa', '#b0faac', '#acf9fa', '#b4acfa']
const colorsBackFlatlist5 = ['#faacac', '#f9faac', '#d9acfa', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3']
const transparent = 'rgba(255,255,255,0)';


const auth = getAuth();
const usersAchivments = collection(db, 'usersAchivments');


const ExerciseScreen = () => {

  const storage = getStorage();
   
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { currentOffering, customerInfo, isProMember} = useRevenueCat();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollX2 = useRef(new Animated.Value(0)).current;
  const scrollX3 = useRef(new Animated.Value(0)).current;
  const scrollX4 = useRef(new Animated.Value(0)).current;
  const scrollX5 = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  const scaleLanguageHight = useRef(new Animated.Value(0)).current;
  const translateLanguage = useRef(new Animated.Value(100)).current;
  
  
  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [dataFlatList, setDataFlatList] = useState([]);
  const [dataFlatList2, setDataFlatList2] = useState([]);
  const [dataFlatList3, setDataFlatList3] = useState([]);
  const [dataFlatList4, setDataFlatList4] = useState([]);
  const [dataFlatList5, setDataFlatList5] = useState([]);
  const [random, setRandom] = useState(0);
  const [title1, setTitle1] = useState('Level');
  const [readingBtnTxt, setReadingButtonTxt] = useState('Reading Hub');
  const [dataExerciseA1, setDataExerciseA1] = useState({});
  const [dataExerciseA2, setDataExerciseA2] = useState({});
  const [dataExerciseB1, setDataExerciseB1] = useState({});
  const [dataExerciseB2, setDataExerciseB2] = useState({});
  const [dataExerciseC1, setDataExerciseC1] = useState({});
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [sound, setSound] = useState();
  const [sound2, setSound2] = useState();
  const [showLists, setShowLists] = useState(false);
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

  const backgroundFlatlist = scrollX.interpolate({
    inputRange: colorsBackFlatlist.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist.map((i) => i)
  })

  const backgroundFlatlist2 = scrollX2.interpolate({
    inputRange: colorsBackFlatlist2.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist2.map((i) => i)
  })

  const backgroundFlatlist3 = scrollX3.interpolate({
    inputRange: colorsBackFlatlist3.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist3.map((i) => i)
  })

  const backgroundFlatlist4 = scrollX4.interpolate({
    inputRange: colorsBackFlatlist4.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist4.map((i) => i)
  })

  const backgroundFlatlist5 = scrollX5.interpolate({
    inputRange: colorsBackFlatlist5.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist5.map((i) => i)
  })


  const imagesMain = [require('../../../assets/topPictures/exercise/reindeerRobo1.png'), require('../../../assets/topPictures/exercise/reindeerRobo2.png'), require('../../../assets/topPictures/exercise/reindeerRobo3.png'), require('../../../assets/topPictures/exercise/reindeerRobo4.png'), require('../../../assets/topPictures/exercise/reindeerRobo5.png'), require('../../../assets/topPictures/exercise/reindeerRobo6.png')];
  const imagesMainBlurred = [require('../../../assets/topPictures/exercise/reindeerRobo1Blurred.png'), require('../../../assets/topPictures/exercise/reindeerRobo2Blurred.png'), require('../../../assets/topPictures/exercise/reindeerRobo3Blurred.png'), require('../../../assets/topPictures/exercise/reindeerRobo4Blurred.png'), require('../../../assets/topPictures/exercise/reindeerRobo5Blurred.png'), require('../../../assets/topPictures/exercise/reindeerRobo6Blurred.png')];


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
      console.log('No values stored under that key:', key);
    }
  }


  const changeLanguage = (language) => {
    if (language !== null) {
      setChoosenLanguage(language);
      save('language', language);

      if (language === 'PL') {
        setReadingButtonTxt('Czytaj')
      } else if (language === 'DE') {
        setReadingButtonTxt('Lesen')
      } else if (language === 'LT') {
        setReadingButtonTxt('Skaityk')
      } else if (language === 'AR') {
        setReadingButtonTxt('اقرأ')
      } else if (language === 'UA') {
        setReadingButtonTxt('Читай')
      } else if (language === 'ES') {
        setReadingButtonTxt('Leer')
      } else if (language === 'EN') {
        setReadingButtonTxt('Reading Hub')
      }
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
    
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await SecureStore.getItemAsync('firstLaunchTime'); 
        if (firstLaunch === null) {

          const currentTime = new Date().toISOString();
          await SecureStore.setItemAsync('firstLaunchTime', currentTime);
          setFirstLaunchTime(currentTime);
        } else {
          setFirstLaunchTime(firstLaunch);
          console.log('in exercise screen it has launched before: ', firstLaunch);
        }

        // Calculate the time difference and set the boolean value
        if (firstLaunch !== null) {
          const firstLaunchDate = new Date(firstLaunch);
          const currentDate = new Date();
          const timeDifference = currentDate - firstLaunchDate;

          
          const hoursDifference = timeDifference / (1000 * 60 * 60);

          console.log('it has launched before and hours difference in exercise screen is: ', hoursDifference);


          if (hoursDifference >= 168) { // change to 168
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



    setDataFlatList([{key: 'left-spacer'}, ...exerciseList1, {key: 'right-spacer'}]);
    setDataFlatList2([{key: 'left-spacer'}, ...exerciseList2, {key: 'right-spacer'}]);
    setDataFlatList3([{key: 'left-spacer'}, ...exerciseList3, {key: 'right-spacer'}]);
    setDataFlatList4([{key: 'left-spacer'}, ...exerciseList4, {key: 'right-spacer'}]);
    setDataFlatList5([{key: 'left-spacer'}, ...exerciseList5, {key: 'right-spacer'}]);

    let tempVal = Math.floor(Math.random() * imagesMain.length);
    setRandom(tempVal); 


    getDownloadURL(ref(storage, 'exerciseData/A1JsonFormat.json'))
    .then(async (url) => {
        
      //set data from storage
      const response = await fetch(url);
      const text = await response.text();
      
      setDataExerciseA1(text)
        
    })
    .catch((error) => {
      
      console.log('error logged in exercise screen', error);
    });


    getDownloadURL(ref(storage, 'exerciseData/A2JsonFormat.json'))
    .then(async (url) => {
        
      //set data from storage
      const response = await fetch(url);
      const text = await response.text();
      
      setDataExerciseA2(text)
        
    })
    .catch((error) => {
      console.log('error logged in exercise screen', error);
    });


    getDownloadURL(ref(storage, 'exerciseData/B1JsonFormat.json'))
    .then(async (url) => {
        
      //set data from storage
      const response = await fetch(url);
      const text = await response.text();
      
      setDataExerciseB1(text)
        
    })
    .catch((error) => {
      console.log('error logged in exercise screen', error);
    });

    getDownloadURL(ref(storage, 'exerciseData/B2JsonFormat.json'))
    .then(async (url) => {
        
      //set data from storage
      const response = await fetch(url);
      const text = await response.text();
      
      setDataExerciseB2(text)
        
    })
    .catch((error) => {
      console.log('error logged in exercise screen', error);
    });

    getDownloadURL(ref(storage, 'exerciseData/C1JsonFormat.json'))
    .then(async (url) => {
        
      //set data from storage
      const response = await fetch(url);
      const text = await response.text();
      
      setDataExerciseC1(text)
        
    })
    .catch((error) => {
      console.log('error logged in exercise screen', error);
    });
    
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
    
      ]).start();

      
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
      ]).start();
      
      
    }


    
    
  }, [isFocused])


  useEffect(() => {
    if (choosenLanguage === 'PL') {
      setReadingButtonTxt('Czytaj');
      setTitle1('Poziom');
    } else if (choosenLanguage === 'DE') {
      setReadingButtonTxt('Lesen');
      setTitle1('Niveau');
    } else if (choosenLanguage === 'LT') {
      setReadingButtonTxt('Skaityk');
      setTitle1('Lygis');
    } else if (choosenLanguage === 'AR') {
      setReadingButtonTxt('اقرأ');
      setTitle1('مستوى');
    } else if (choosenLanguage === 'UA') {
      setReadingButtonTxt('Читай');
      setTitle1('Pівень');
    } else if (choosenLanguage === 'ES') {
      setReadingButtonTxt('Leer');
      setTitle1('Nivel');
    } else if (choosenLanguage === 'EN') {
      setReadingButtonTxt('Reading Hub');
      setTitle1('Level');
    }
  }, [choosenLanguage])
  

  useFocusEffect(
    useCallback(() => {

      
      getDataFb();
  
      
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

  useEffect(() => {
    const loadSound2 = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/tick.mp3')
      );
      setSound2(sound);
    };

    loadSound2();

    return () => {
      sound2?.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    await sound?.replayAsync(); 
  };

  const playSound2 = async () => {
    await sound2?.replayAsync(); 
  };


  const getDataFb = async () => {

    
    const q = query(usersAchivments, where('userRef', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {


      exerciseList1[0].bars = doc.data().exercise.section1.class0;
      exerciseList1[1].bars = doc.data().exercise.section1.class1;
      exerciseList1[2].bars = doc.data().exercise.section1.class2;
      exerciseList1[3].bars = doc.data().exercise.section1.class3;
      exerciseList1[4].bars = doc.data().exercise.section1.class4;
      exerciseList1[5].bars = doc.data().exercise.section1.class5;
      
      exerciseList2[0].bars = doc.data().exercise.section2.class0;
      exerciseList2[1].bars = doc.data().exercise.section2.class1;
      exerciseList2[2].bars = doc.data().exercise.section2.class2;
      exerciseList2[3].bars = doc.data().exercise.section2.class3;
      exerciseList2[4].bars = doc.data().exercise.section2.class4;
      exerciseList2[5].bars = doc.data().exercise.section2.class5;

      exerciseList3[0].bars = doc.data().exercise.section3.class0;
      exerciseList3[1].bars = doc.data().exercise.section3.class1;
      exerciseList3[2].bars = doc.data().exercise.section3.class2;
      exerciseList3[3].bars = doc.data().exercise.section3.class3;
      exerciseList3[4].bars = doc.data().exercise.section3.class4;
      exerciseList3[5].bars = doc.data().exercise.section3.class5;

      exerciseList4[0].bars = doc.data().exercise.section4.class0;
      exerciseList4[1].bars = doc.data().exercise.section4.class1;
      exerciseList4[2].bars = doc.data().exercise.section4.class2;
      exerciseList4[3].bars = doc.data().exercise.section4.class3;
      exerciseList4[4].bars = doc.data().exercise.section4.class4;

      exerciseList5[0].bars = doc.data().exercise.section5.class0;
      exerciseList5[1].bars = doc.data().exercise.section5.class1;
      exerciseList5[2].bars = doc.data().exercise.section5.class2;
      exerciseList5[3].bars = doc.data().exercise.section5.class3;
      exerciseList5[4].bars = doc.data().exercise.section5.class4;
      exerciseList5[5].bars = doc.data().exercise.section5.class5;


      
    })


    setDataFlatList([{key: 'left-spacer'}, ...exerciseList1, {key: 'right-spacer'}]);
    setDataFlatList2([{key: 'left-spacer'}, ...exerciseList2, {key: 'right-spacer'}]);
    setDataFlatList3([{key: 'left-spacer'}, ...exerciseList3, {key: 'right-spacer'}]);
    setDataFlatList4([{key: 'left-spacer'}, ...exerciseList4, {key: 'right-spacer'}]);
    setDataFlatList5([{key: 'left-spacer'}, ...exerciseList5, {key: 'right-spacer'}]);


    setTimeout(() => {
      
      setShowLists(true);
    }, 1500);
    

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
    //   playSound2();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef.current = x - (x % threshold) + (x > lastPlayedAtRef.current ? threshold : 0);
    // }
  };


  const handleScroll2 = (event) => {
    
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
      { useNativeDriver: false }
    )(event); 

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef2.current);

    // if (diff >= threshold && isSoundOn) {
    //   playSound2();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef2.current = x - (x % threshold) + (x > lastPlayedAtRef2.current ? threshold : 0);
    // }
  };


  const handleScroll3 = (event) => {
    
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX3 } } }],
      { useNativeDriver: false }
    )(event); 

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef3.current);

    // if (diff >= threshold && isSoundOn) {
    //   playSound2();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef3.current = x - (x % threshold) + (x > lastPlayedAtRef3.current ? threshold : 0);
    // }
  };



  const handleScroll4 = (event) => {
    
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX4 } } }],
      { useNativeDriver: false }
    )(event); 

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef4.current);

    // if (diff >= threshold && isSoundOn) {
    //   playSound2();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef4.current = x - (x % threshold) + (x > lastPlayedAtRef4.current ? threshold : 0);
    // }
  };



  const handleScroll5 = (event) => {
    
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX5 } } }],
      { useNativeDriver: false }
    )(event); 

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef5.current);

    // if (diff >= threshold && isSoundOn) {
    //   playSound2();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef5.current = x - (x % threshold) + (x > lastPlayedAtRef5.current ? threshold : 0);
    // }
  };



  const renderCard = ({item, index}) => {

    let translatedTitle = '';
    let translatedSubTitle = '';

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
      translatedSubTitle = item.description.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
      translatedSubTitle = item.description.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
      translatedSubTitle = item.description.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
      translatedSubTitle = item.description.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
      translatedSubTitle = item.description.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
      translatedSubTitle = item.description.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
      translatedSubTitle = item.description.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={translatedSubTitle} 
      level={item.level} 
      link={item.link}
      language={choosenLanguage}
      barsData={item.bars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      dataExercie={dataExerciseA1}/>
    </Animated.View>
  }


  const renderCard2 = ({item, index}) => {

    let translatedTitle = '';
    let translatedSubTitle = '';

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY = scrollX2.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
      translatedSubTitle = item.description.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
      translatedSubTitle = item.description.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
      translatedSubTitle = item.description.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
      translatedSubTitle = item.description.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
      translatedSubTitle = item.description.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
      translatedSubTitle = item.description.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
      translatedSubTitle = item.description.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={translatedSubTitle} 
      level={item.level} 
      link={item.link}
      language={choosenLanguage}
      barsData={item.bars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      dataExercie={dataExerciseA2}/>
    </Animated.View>
  }



  const renderCard3 = ({item, index}) => {

    let translatedTitle = '';
    let translatedSubTitle = '';

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY = scrollX3.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
      translatedSubTitle = item.description.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
      translatedSubTitle = item.description.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
      translatedSubTitle = item.description.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
      translatedSubTitle = item.description.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
      translatedSubTitle = item.description.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
      translatedSubTitle = item.description.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
      translatedSubTitle = item.description.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={translatedSubTitle} 
      level={item.level} 
      link={item.link}
      language={choosenLanguage}
      barsData={item.bars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      dataExercie={dataExerciseB1}/>
    </Animated.View>
  }


  const renderCard4 = ({item, index}) => {

    let translatedTitle = '';
    let translatedSubTitle = '';

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY = scrollX4.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
      translatedSubTitle = item.description.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
      translatedSubTitle = item.description.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
      translatedSubTitle = item.description.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
      translatedSubTitle = item.description.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
      translatedSubTitle = item.description.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
      translatedSubTitle = item.description.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
      translatedSubTitle = item.description.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={translatedSubTitle} 
      level={item.level} 
      link={item.link}
      language={choosenLanguage}
      barsData={item.bars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      dataExercie={dataExerciseB2}/>
    </Animated.View>
  }

  

  const renderCard5 = ({item, index}) => {

    let translatedTitle = '';
    let translatedSubTitle = '';

    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const translateY = scrollX5.interpolate({
      inputRange,
      outputRange: [-20, -70, -20]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
      translatedSubTitle = item.description.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
      translatedSubTitle = item.description.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
      translatedSubTitle = item.description.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
      translatedSubTitle = item.description.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
      translatedSubTitle = item.description.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
      translatedSubTitle = item.description.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
      translatedSubTitle = item.description.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={translatedSubTitle} 
      level={item.level} 
      link={item.link}
      language={choosenLanguage}
      barsData={item.bars}
      hasAccess={userHasAccess}
      requiresPro={item.requiresPro}
      dataExercie={dataExerciseC1}/>
    </Animated.View>
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.head}>
        <View style={styles.headBottom}>
          <View style={styles.readingButtonContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Reading', {within168Hours})}>
              <Text style={styles.textButton}>{readingBtnTxt}</Text>
              <Image style={styles.bookPic} source={require('../../../assets/book.png')} />
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

        <Animated.Image style={{...styles.mainImg, transform: [{scale: scaleImgOnDrag}]}} source={imagesMain[random]}/>
        <Animated.Image style={{...styles.mainImg, opacity: opacityImgBlur}} source={imagesMainBlurred[random]}/>
        <Animated.View style={{...styles.gradientContainer, transform: [{scale: scaleImgOnDrag}]}}>

        <LinearGradient colors={['white', transparent, transparent, transparent, transparent, 'white']} start={[0.0, 0.0]} end={[0.0, 1.0]}  style={{...styles.gradinetImg}}>
        </LinearGradient>
        </Animated.View>


        <Animated.View style={{...styles.flatListsContainer, backgroundColor: backgroundFlatlist}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title1} A1 {choosenLanguage === 'AR' ? title1 : ''}</Text>
          </View>

          {showLists ? <Animated.FlatList 
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
            onScroll={handleScroll}
            scrollEventThrottle={16}
          /> : <LoaderSmall />}
          
          

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist2}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title1} A2 {choosenLanguage === 'AR' ? title1 : ''}</Text>
          </View>

          {showLists ? <Animated.FlatList 
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
            onScroll={handleScroll2}
            scrollEventThrottle={16}
          /> : <LoaderSmall />}
          
          

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist3}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title1} B1 {choosenLanguage === 'AR' ? title1 : ''}</Text>
          </View>


          {showLists ? <Animated.FlatList 
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
            onScroll={handleScroll3}
            scrollEventThrottle={16}
          /> : <LoaderSmall />}
          
          

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist4}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title1} B2 {choosenLanguage === 'AR' ? title1 : ''}</Text>
          </View>


          {showLists ? <Animated.FlatList 
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
            onScroll={handleScroll4}
            scrollEventThrottle={16}
          /> : <LoaderSmall />}
          
          

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerLast, backgroundColor: backgroundFlatlist5}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title1} C1 {choosenLanguage === 'AR' ? title1 : ''}</Text>
          </View>


          {showLists ? <Animated.FlatList 
            style={styles.flatlist}contentContainerStyle={{
              alignItems: 'flex-end'
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList5}
            renderItem={renderCard5}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll5}
            scrollEventThrottle={16}
          /> : <LoaderSmall />}
          
          

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

export default ExerciseScreen