import { View, Text, Image, Animated, ScrollView, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useRef, useEffect, useCallback} from 'react'
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { onAuthStateChanged, getAuth  } from 'firebase/auth';
import styles from './style'
import Card from '../../components/cards/Card';
import CardExerciseList from '../../components/cards/CardExerciseList';
import CardExe from '../../components/cards/CardExe';
import exerciseData1 from '../../listData/exerciseData1';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.6 + 20;
const spacerSize = (screenWidth - cardSize) / 2;
const colorsBackFlatlist = ['#ffd7d4', '#ffebd4', '#feffd4', '#e6ffd4', '#d4ffdc', '#d4fffd', '#d4d7ff', '#f4d4ff', '#ffd4f3']
const colorsBackFlatlist2 = ['#f21d1d', '#ebf21d', '#32f21d', '#1deef2', '#1d2bf2', '#d21df2', '#f21d72']
const colorsBackFlatlist3 = ['#e6746e', '#e6e46e', '#7ae66e', '#6ee6e2', '#6e7ae6', '#e26ee6', '#e6746e', '#e6e46e', '#7ae66e', '#6ee6e2', '#6e7ae6', '#e26ee6']
const colorsBackFlatlist4 = ['#fccccc', '#fafccc', '#d2fccc', '#ccfcfc', '#ccd0fc', '#f8ccfc', '#fccccc', '#fafccc', '#d2fccc', '#ccfcfc', '#ccd0fc', '#f8ccfc']
const colorsBackFlatlist5 = ['#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac', '#b0faac', '#acf9fa', '#b4acfa', '#faacf3', '#faacac', '#f9faac',]
const transparent = 'rgba(255,255,255,0)';


const auth = getAuth();
const usersAchivments = collection(db, 'usersAchivments');


const ExerciseScreen = () => {
   
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  const scaleLanguageHight = useRef(new Animated.Value(0)).current;
  const translateLanguage = useRef(new Animated.Value(100)).current;

  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [languageListOpen, setLanguageListOpen] = useState(false);
  const [dataFlatList, setDataFlatList] = useState([]);
  const [random, setRandom] = useState(0);
  const [title1, setTitle1] = useState('level');
  const [readingBtnTxt, setReadingButtonTxt] = useState('Reading');
  

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


  const imagesMain = [require('../../../assets/reindeerRobo1.png'), require('../../../assets/reindeerRobo2.png'), require('../../../assets/reindeerRobo3.png'), require('../../../assets/reindeerRobo4.png'), require('../../../assets/reindeerRobo5.png'), require('../../../assets/reindeerRobo6.png')];
  const imagesMainBlurred = [require('../../../assets/reindeerRobo1Blurred.png'), require('../../../assets/reindeerRobo2Blurred.png'), require('../../../assets/reindeerRobo3Blurred.png'), require('../../../assets/reindeerRobo4Blurred.png'), require('../../../assets/reindeerRobo5Blurred.png'), require('../../../assets/reindeerRobo6Blurred.png')];


  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setChoosenLanguage(result);
    } else {
      console.log('No values stored under that key.');
    }
  }


  const changeLanguage = (language) => {
    if (language !== null) {
      setChoosenLanguage(language);
      save('language', language);

      if (language === 'PL') {
        setReadingButtonTxt('Czytanie')
      } else if (language === 'DE') {
        setReadingButtonTxt('Czytanie niem')
      } else if (language === 'LT') {
        setReadingButtonTxt('Czytanie lt')
      } else if (language === 'AR') {
        setReadingButtonTxt('Czytaniearabskui')
      } else if (language === 'UA') {
        setReadingButtonTxt('Czytanieua')
      } else if (language === 'ES') {
        setReadingButtonTxt('Czytaniesp')
      } else if (language === 'EN') {
        setReadingButtonTxt('Reading')
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
    
  }

  useFocusEffect(
    useCallback(() => {

      
      getValueFor('language');
  
      
    }, [])
  );




  useEffect(() => {



    setDataFlatList([{key: 'left-spacer'}, ...exerciseData1, {key: 'right-spacer'}]);

    let tempVal = Math.floor(Math.random() * imagesMain.length);
    setRandom(tempVal); 

    
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
      setReadingButtonTxt('Czytanie');
      setTitle1('Poziom');
    } else if (choosenLanguage === 'DE') {
      setReadingButtonTxt('Czytanie niem');
      setTitle1('Poziom niem');
    } else if (choosenLanguage === 'LT') {
      setReadingButtonTxt('Czytanie lt');
      setTitle1('litews');
    } else if (choosenLanguage === 'AR') {
      setReadingButtonTxt('Czytaniearabskui');
      setTitle1('arabski');
    } else if (choosenLanguage === 'UA') {
      setReadingButtonTxt('Czytanieua');
      setTitle1('ukrai');
    } else if (choosenLanguage === 'ES') {
      setReadingButtonTxt('Czytaniesp');
      setTitle1('spanish');
    } else if (choosenLanguage === 'EN') {
      setReadingButtonTxt('Reading');
      setTitle1('level');
    }
  }, [choosenLanguage])
  

  useFocusEffect(
    useCallback(() => {

      
      getDataFb();
  
      
    }, [])
  );


  const getDataFb = async () => {

    
    const q = query(usersAchivments, where('userRef', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

      
      for (let i = 0; i < exerciseData1.length; i++) {

        if (exerciseData1[i].key === 1) {
          exerciseData1[i].bars = doc.data().exercise.section1.class0
        } else if (exerciseData1[i].key === 2) {
          exerciseData1[i].bars = doc.data().exercise.section1.class1
        } else if (exerciseData1[i].key === 3) {
          exerciseData1[i].bars = doc.data().exercise.section1.class2
        } else if (exerciseData1[i].key === 4) {
          exerciseData1[i].bars = doc.data().exercise.section1.class3
        } else if (exerciseData1[i].key === 5) {
          exerciseData1[i].bars = doc.data().exercise.section1.class4
        } else if (exerciseData1[i].key === 6) {
          exerciseData1[i].bars = doc.data().exercise.section1.class5
        } else if (exerciseData1[i].key === 7) {
          exerciseData1[i].bars = doc.data().exercise.section1.class6
        } else if (exerciseData1[i].key === 8) {
          exerciseData1[i].bars = doc.data().exercise.section1.class7
        } else if (exerciseData1[i].key === 9) {
          exerciseData1[i].bars = doc.data().exercise.section1.class8
        } else if (exerciseData1[i].key === 10) {
          exerciseData1[i].bars = doc.data().exercise.section1.class9
        } 
        
      }
    })


    setDataFlatList([{key: 'left-spacer'}, ...exerciseData1, {key: 'right-spacer'}]);

    

  }


  const renderCard = ({item, index}) => {

    let colorSqu = colorsBackFlatlist5[index - 1]
    let translatedTitle = '';

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
      outputRange: [0, -50, 0]
    })

    if (choosenLanguage === 'PL') {
      translatedTitle = item.title.pl
    } else if (choosenLanguage === 'DE') {
      translatedTitle = item.title.ger
    } else if (choosenLanguage === 'LT') {
      translatedTitle = item.title.lt
    } else if (choosenLanguage === 'AR') {
      translatedTitle = item.title.ar
    } else if (choosenLanguage === 'UA') {
      translatedTitle = item.title.ua
    } else if (choosenLanguage === 'ES') {
      translatedTitle = item.title.sp
    } else if (choosenLanguage === 'EN') {
      translatedTitle = item.title.eng
    }

    return <Animated.View style={{transform: [{translateY}]}}>

      <CardExe 
      title={translatedTitle} 
      description={item.description} 
      level={item.level} 
      link={item.link} 
      showPro={item.showPro}
      colorSmallSqu={colorSqu}
      language={choosenLanguage}
      barsData={item.bars}/>
    </Animated.View>
  }

  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.head}>
        <View style={styles.headBottom}>
          <View style={styles.readingButtonContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Reading')}>
              <Text style={styles.textButton}>{readingBtnTxt}</Text>
              <Image style={styles.bookPic} source={require('../../../assets/book.png')} />
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
            <Text style={styles.titleText}>{title1}</Text>
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

export default ExerciseScreen