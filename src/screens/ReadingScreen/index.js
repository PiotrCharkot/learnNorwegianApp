import { View, Text, Image, Animated, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style'
import { withAnchorPoint } from 'react-native-anchor-point';
import { Audio } from 'expo-av';
import CardReading from '../../components/cards/CardReading';
import textListData1 from '../../listData/textLists/textListData1';
import textListData2 from '../../listData/textLists/textListData2';
import textListData3 from '../../listData/textLists/textListData3';
import textListData4 from '../../listData/textLists/textListData4';
import textListData5 from '../../listData/textLists/textListData5';
import useRevenueCat from '../../../hooks/useRevenueCat';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.6;
const spacerSize = (screenWidth - cardSize) / 2;
const colorsBackFlatlist = ['#f2d891', '#96f291', '#9aedd4', '#91c8f2', '#f291df', '#f29191', '#f2ae91']
const colorsBackFlatlist2 = ['#f21d1d', '#ebf21d', '#32f21d', '#1deef2', '#1d2bf2', '#d21df2', '#f21d72']
const colorsBackFlatlist3 = ['#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac']
const colorsBackFlatlist4 = ['#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa']
const colorsBackFlatlist5 = ['#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac']
const transparent = 'rgba(255,255,255,0)';


const ReadingScreen = ({route}) => {


  const {within168Hours} = route.params;
   
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
  const scaleLanguageHight = useRef(new Animated.Value(0)).current;
  const translateLanguage = useRef(new Animated.Value(100)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  const interpolatedValueForX = useRef(new Animated.Value(0)).current;
  // const lastPlayedAtRef = useRef(0);
  // const lastPlayedAtRef2 = useRef(0);
  // const lastPlayedAtRef3 = useRef(0);
  // const lastPlayedAtRef4 = useRef(0);
  // const lastPlayedAtRef5 = useRef(0);
  // const lastPlayedAtRef6 = useRef(0);
  
  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [dataFlatList, setDataFlatList] = useState([]);
  const [dataFlatList2, setDataFlatList2] = useState([]);
  const [dataFlatList3, setDataFlatList3] = useState([]);
  const [dataFlatList4, setDataFlatList4] = useState([]);
  const [dataFlatList5, setDataFlatList5] = useState([]);
  const [title, setTitle] = useState('Level')
  const [random, setRandom] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [sound, setSound] = useState();
  const [sound2, setSound2] = useState();
  const [sound3, setSound3] = useState();

  const userHasAccess = isProMember || within168Hours;


  const xPositionDeg = interpolatedValueForX.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "180deg"]
  })


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


  const backgroundFlatlist2 = scrollX2.interpolate({
    inputRange: colorsBackFlatlist4.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist4.map((i) => i)
  })


  const backgroundFlatlist3 = scrollX3.interpolate({
    inputRange: colorsBackFlatlist3.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist3.map((i) => i)
  })

  const backgroundFlatlist4 = scrollX4.interpolate({
    inputRange: colorsBackFlatlist5.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist5.map((i) => i)
  })


  const backgroundFlatlist5 = scrollX5.interpolate({
    inputRange: colorsBackFlatlist4.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist4.map((i) => i)
  })


  const backgroundFlatlist6 = scrollX6.interpolate({
    inputRange: colorsBackFlatlist3.map((_, i) => i * cardSize),
    outputRange: colorsBackFlatlist3.map((i) => i)
  })



  const imagesMain = [require('../../../assets/topPictures/reading/reading1.png'), require('../../../assets/topPictures/reading/reading2.png'), require('../../../assets/topPictures/reading/reading3.png'), require('../../../assets/topPictures/reading/reading4.png'), require('../../../assets/topPictures/reading/reading5.png'), require('../../../assets/topPictures/reading/reading6.png')];
  const imagesMainBlurred = [require('../../../assets/topPictures/reading/reading1Blurred.png'), require('../../../assets/topPictures/reading/reading2Blurred.png'), require('../../../assets/topPictures/reading/reading3Blurred.png'), require('../../../assets/topPictures/reading/reading4Blurred.png'), require('../../../assets/topPictures/reading/reading5Blurred.png'), require('../../../assets/topPictures/reading/reading6Blurred.png')];



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
      console.log('No values stored under that key: ', key);
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

    console.log('sound in reading is: ', isSoundOn);
    if (isSoundOn) {
      playSound3();
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
        require('./../../../assets/sounds/tick.mp3')
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
        require('./../../../assets/sounds/pebbelsClick.wav')
      );
      setSound2(sound);
    };

    loadSound2();

    return () => {
      sound2?.unloadAsync();
    };
  }, []);


  useEffect(() => {
    const loadSound3 = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/cameraClick.wav')
      );
      setSound3(sound);
    };

    loadSound3();

    return () => {
      sound3?.unloadAsync();
    };
  }, []);


  const playSound = async () => {
    await sound?.replayAsync(); 
  };


  const playSound2 = async () => {
    await sound2?.replayAsync(); 
  };

  const playSound3 = async () => {
    await sound3?.replayAsync(); 
  };


  const handleScroll = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef.current = x - (x % threshold) + (x > lastPlayedAtRef.current ? threshold : 0);
    // }
  };



  const handleScroll2 = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef2.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef2.current = x - (x % threshold) + (x > lastPlayedAtRef2.current ? threshold : 0);
    // }
  };
  


  const handleScroll3 = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX3 } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef3.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef3.current = x - (x % threshold) + (x > lastPlayedAtRef3.current ? threshold : 0);
    // }
  };
  


  const handleScroll4 = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX4 } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef4.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef4.current = x - (x % threshold) + (x > lastPlayedAtRef4.current ? threshold : 0);
    // }
  };

  


  const handleScroll5 = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX5 } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef5.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef5.current = x - (x % threshold) + (x > lastPlayedAtRef5.current ? threshold : 0);
    // }
  };


  


  const handleScroll6 = (event) => {
    // First, process the animated event
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX6 } } }],
      { useNativeDriver: false }
    )(event); // Manually invoke the animated event handler

    // // Then, add your logic for playing sound at certain scroll positions
    // const x = event.nativeEvent.contentOffset.x; // Get the current horizontal scroll position
    // const threshold = cardSize * 0.5; // Define your threshold here

    // // Calculate the absolute difference from the last played position
    // const diff = Math.abs(x - lastPlayedAtRef6.current);

    // if (diff >= threshold) {
    //   playSound();
    //   // Update the last played position to the current, adjusted for multiples of 200
    //   // This adjustment ensures correct behavior in both forward and backward scrolling
    //   lastPlayedAtRef6.current = x - (x % threshold) + (x > lastPlayedAtRef6.current ? threshold : 0);
    // }
  };


  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
  };


  const exitButton = () => {
    
    if (isSoundOn) {

      playSound2();
    }

    Animated.spring(interpolatedValueForX, {
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    
    setTimeout(() => {

        navigation.navigate('Main');
    }, 800)
  }

  useEffect(() => {
    let tempVal = Math.floor(Math.random() * imagesMain.length);
    setRandom(tempVal)
    setDataFlatList([{key: 'left-spacer'}, ...textListData1, {key: 'right-spacer'}])
    setDataFlatList2([{key: 'left-spacer'}, ...textListData2, {key: 'right-spacer'}])
    setDataFlatList3([{key: 'left-spacer'}, ...textListData3, {key: 'right-spacer'}])
    setDataFlatList4([{key: 'left-spacer'}, ...textListData4, {key: 'right-spacer'}])
    setDataFlatList5([{key: 'left-spacer'}, ...textListData5, {key: 'right-spacer'}])
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
      setTitle('Poziom');
    } else if (choosenLanguage === 'DE') {
      setTitle('Niveau');
    } else if (choosenLanguage === 'LT') {
      setTitle('Lygis');
    } else if (choosenLanguage === 'AR') {
      setTitle('مستوى');
    } else if (choosenLanguage === 'UA') {
      setTitle('Pівень');
    } else if (choosenLanguage === 'ES') {
      setTitle('Nivel');
    } else if (choosenLanguage === 'EN') {
      setTitle('Level');
    }
  }, [choosenLanguage])


  const renderCard = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const rotateVal = scrollX.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })


    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro}/>
    </Animated.View>
  }


  const renderCard2 = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];


    const rotateVal = scrollX2.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX2.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })


    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro}/>
    </Animated.View>
  }


  const renderCard3 = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const rotateVal = scrollX3.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX3.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })


    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro} />
    </Animated.View>
  }


  const renderCard4 = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const rotateVal = scrollX4.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX4.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })

    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro}/>
    </Animated.View>
  }


  const renderCard5 = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const rotateVal = scrollX5.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX5.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })

    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro} />
    </Animated.View>
  }


  const renderCard6 = ({item, index}) => {


    if (!item.title) {
      return <View style={{width: spacerSize}} ></View>
    }
    const inputRange = [
      (index - 2) * cardSize,
      (index - 1) * cardSize,
      index  * cardSize,
    ];

    const rotateVal = scrollX6.interpolate({
      inputRange,
      outputRange: ["55deg", "0deg", "-55deg"]
    })


    const scaleVal = scrollX6.interpolate({
      inputRange,
      outputRange: [0.92, 1, 0.92]
    })

    return <Animated.View style={{transform: [{perspective: 3000}, {rotateY: rotateVal}, {scaleY: scaleVal}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} hasAccess={userHasAccess} requiresPro={item.requiresPro}/>
    </Animated.View>
  }


  return (
    <View style={styles.mainContainer}>
      <View style={styles.head}>
        <View style={styles.headBottom}>

          <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
            <TouchableOpacity onPress={() => exitButton()}>
                <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

            </TouchableOpacity>
          </Animated.View>


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
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title} A1 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList}
            renderItem={renderCard}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist2}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title} A2 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList2}
            renderItem={renderCard2}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll2}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist3}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title} B1 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList3}
            renderItem={renderCard3}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll3}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist4}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title} B2 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList4}
            renderItem={renderCard4}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll4}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerLast, backgroundColor: backgroundFlatlist5}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} allowFontScaling={false}>{choosenLanguage === 'AR' ? '' : title} C1 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList5}
            renderItem={renderCard5}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll5}
            scrollEventThrottle={16}
          />

        </Animated.View>


        {/* <Animated.View style={{...styles.flatListsContainerLast, backgroundColor: backgroundFlatlist6}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} C2 {choosenLanguage === 'AR' ? title : ''}</Text>
          </View>
          <Animated.FlatList 
            style={styles.flatlist}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardSize}
            decelerationRate={0}
            data={dataFlatList6}
            renderItem={renderCard6}
            keyExtractor={(item) => item.key}
            onScroll={handleScroll6}
            scrollEventThrottle={16}
          />

        </Animated.View> */}



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

export default ReadingScreen