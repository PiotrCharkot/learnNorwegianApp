import { View, Text, Image, Animated, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style'
import { withAnchorPoint } from 'react-native-anchor-point';
import CardReading from '../../components/cards/CardReading';
import textListData from '../../listData/textListData';
import textListData2 from '../../listData/textListData2';
import textListData3 from '../../listData/textListData3';
import textListData4 from '../../listData/textListData4';
import textListData5 from '../../listData/textListData5';
import textListData6 from '../../listData/textListData6';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.6 + 20;
const spacerSize = (screenWidth - cardSize) / 2;
const colorsBackFlatlist = ['#ffd7d4', '#ffebd4', '#feffd4', '#e6ffd4', '#d4ffdc', '#d4fffd', '#d4d7ff', '#f4d4ff', '#ffd4f3']
const colorsBackFlatlist2 = ['#f21d1d', '#ebf21d', '#32f21d', '#1deef2', '#1d2bf2', '#d21df2', '#f21d72']
const colorsBackFlatlist3 = ['#e6746e', '#e6e46e', '#7ae66e', '#6ee6e2', '#6e7ae6', '#e26ee6', '#e6746e', '#e6e46e', '#7ae66e', '#6ee6e2', '#6e7ae6', '#e26ee6']
const colorsBackFlatlist4 = ['#fccccc', '#fafccc', '#d2fccc', '#ccfcfc', '#ccd0fc', '#f8ccfc', '#fccccc', '#fafccc', '#d2fccc', '#ccfcfc', '#ccd0fc', '#f8ccfc']
const colorsBackFlatlist5 = ['#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac',]
const transparent = 'rgba(255,255,255,0)';


const ReadingScreen = () => {
   
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  
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

  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [dataFlatList, setDataFlatList] = useState([]);
  const [dataFlatList2, setDataFlatList2] = useState([]);
  const [dataFlatList3, setDataFlatList3] = useState([]);
  const [dataFlatList4, setDataFlatList4] = useState([]);
  const [dataFlatList5, setDataFlatList5] = useState([]);
  const [dataFlatList6, setDataFlatList6] = useState([]);
  const [title, setTitle] = useState('Level')
  const [random, setRandom] = useState(0);

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



  const imagesMain = [require('../../../assets/reindeerBook1.png'), require('../../../assets/reindeerBook2.png'), require('../../../assets/reindeerBook3.png'), require('../../../assets/reindeerBook4.png'), require('../../../assets/reindeerBook5.png')];
  const imagesMainBlurred = [require('../../../assets/reindeerBook1Blurred.png'), require('../../../assets/reindeerBook2Blurred.png'), require('../../../assets/reindeerBook3Blurred.png'), require('../../../assets/reindeerBook4Blurred.png'), require('../../../assets/reindeerBook5Blurred.png')];



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



  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
  };


  const exitButton = () => {

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
    setDataFlatList([{key: 'left-spacer'}, ...textListData, {key: 'right-spacer'}])
    setDataFlatList2([{key: 'left-spacer'}, ...textListData2, {key: 'right-spacer'}])
    setDataFlatList3([{key: 'left-spacer'}, ...textListData3, {key: 'right-spacer'}])
    setDataFlatList4([{key: 'left-spacer'}, ...textListData4, {key: 'right-spacer'}])
    setDataFlatList5([{key: 'left-spacer'}, ...textListData5, {key: 'right-spacer'}])
    setDataFlatList6([{key: 'left-spacer'}, ...textListData6, {key: 'right-spacer'}])
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

    const translateY1 = scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY1}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage}/>
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

    const translateY2 = scrollX2.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY2}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} />
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

    const translateY3 = scrollX3.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY3}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} />
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

    const translateY4 = scrollX4.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY4}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} />
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

    const translateY5 = scrollX5.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY5}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} />
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

    const translateY6 = scrollX6.interpolate({
      inputRange,
      outputRange: [0, -50, 0]
    })

    return <Animated.View style={{transform: [{translateY: translateY6}]}}>

      <CardReading title={item.title} textId={item.textId} level={item.level} language={choosenLanguage} />
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
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} A1 {choosenLanguage === 'AR' ? title : ''}</Text>
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
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}
              )}
            scrollEventThrottle={16}
          />

        </Animated.View>

        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist2}}>
          
          <LinearGradient colors={['white', 'rgba(255,255,255,0)', 'white']} start={[0.0, 0.1]} end={[0.0, 1.0]}  style={styles.gradinetFlatlist}>
            </LinearGradient>
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} A2 {choosenLanguage === 'AR' ? title : ''}</Text>
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
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} B1 {choosenLanguage === 'AR' ? title : ''}</Text>
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
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} B2 {choosenLanguage === 'AR' ? title : ''}</Text>
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
        
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{choosenLanguage === 'AR' ? '' : title} C1 {choosenLanguage === 'AR' ? title : ''}</Text>
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
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX5}}}],
              {useNativeDriver: false}
              )}
            scrollEventThrottle={16}
          />

        </Animated.View>


        <Animated.View style={{...styles.flatListsContainerBottom, backgroundColor: backgroundFlatlist6}}>
          
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
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX6}}}],
              {useNativeDriver: false}
              )}
            scrollEventThrottle={16}
          />

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

export default ReadingScreen