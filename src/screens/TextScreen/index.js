import { View, Text, Animated, Image, FlatList, TouchableOpacity, Easing, AppState } from 'react-native'
import React, {useState, useEffect, useRef } from 'react'
import * as SecureStore from 'expo-secure-store';
import styles from './style';
import textData from '../../listData/textLists/textData';
import { db } from '../../../firebase/firebase-config';
import { getAuth  } from 'firebase/auth';
import { collection, getDocs, query, doc, where, updateDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import { ScrollView } from 'react-native';


const auth = getAuth();
const pointsToScore = 200;
const minimumPoints = 1;
let openTime;
let closeTime;
let startBackgroundTime;
let endBackgroundTime;
let backgroundTime = 0;

const TextScreen = ({route}) => {
  
  const usersPointsCollection = collection(db, 'usersPoints');

  const navigation = useNavigation();


  const formatDate = (date) => {
    const isoString = date.toISOString(); // Get the ISO string
    const [year, month, day] = isoString.split('T')[0].split('-'); // Extract year, month, and day
    return `${day}/${month}/${year}`; // Format the date as dd/MM/yyyy
  };

  let sixDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-6)));
  let fiveDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-5)));
  let fourDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-4)));
  let threeDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-3)));
  let twoDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-2)));
  let yesterday = formatDate(new Date(new Date().setDate(new Date().getDate()-1)));
  let today = formatDate(new Date());

  let dayOfWeek = new Date(new Date().setDate(new Date().getDate())).getDay() === 0 ? 7 : new Date(new Date().setDate(new Date().getDate())).getDay();


  let allDaysOfWeek = [today, yesterday, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo, sixDaysAgo];
  let currentWeek = allDaysOfWeek.slice(0, dayOfWeek)

  const smallTxt = 16;
  const mediumTxt = 20; 
  const largeTxt = 24;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [expressions, setExpressions] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState('0');
  const [currentDailyScore, setCurrentDailyScore] = useState(0);
  const [daysInRowVal, setDaysInRowVal] = useState(0);
  const [lastUpdateVal, setLastUpdateVal] = useState('');
  const [totalPointsVal, setTotalPointsVal] = useState(0);
  const [weeklyPointsVal, setWeeklyPointsVal] = useState(0);
  const [documentIdPoints, setDocumentIdPoints] = useState('tempid');
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  const [ptsText, setPtsText] = useState('pts');
  const [streakText, setStreakText] = useState('streak')

  const interpolatedValueForX = useRef(new Animated.Value(0)).current;
  const pointsRotation = useRef(new Animated.Value(0)).current;
  const pointsOffset = useRef(new Animated.Value(160)).current; 
  const daysOffset = useRef(new Animated.Value(-200)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current; 

  const docRefPoints = doc(db, "usersPoints", documentIdPoints);


  const xPositionDeg = interpolatedValueForX.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"]
  })

  const rotatePointsVal = pointsRotation.interpolate({
    inputRange: [0, 2160],
    outputRange: ["0deg", "2160deg"]
})


  const scaleTextUp = () => {
    if (fontSize === 16) {
      setFontSize(mediumTxt)
      saveTxtSize('fontSize', '20')
    } else if ( fontSize === 20) {
      setFontSize(largeTxt)
      saveTxtSize('fontSize', '24')
    }
  }

  const scaleTextDown = () => {
    if (fontSize === 24) {
      setFontSize(mediumTxt)
      saveTxtSize('fontSize', '20')
    } else if ( fontSize === 20) {
      setFontSize(smallTxt)
      saveTxtSize('fontSize', '16')
    }
  }

  const switchDarkMode = () => {
    if (darkMode === '0') {
      setDarkMode('1');
      save('darkMode', '1')
    } else {
      setDarkMode('0')
      save('darkMode', '0')
    }
  }

  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
  };


  

  const exitButton = () => {

    closeTime = new Date().getTime();

    console.log('test screen was on in ', closeTime - openTime, 'miliseconds.');
    console.log('my time in background: ', backgroundTime);

    Animated.spring(interpolatedValueForX, {
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    updatePointsInFb();

    backgroundTime = 0;

    setTimeout(() => {

      navigation.navigate('Reading', {within168Hours: route.params.within168Hours});
    }, 800)
  }

  
  const showPointsAnimation = (bonusPoints) => {

    //let bonusPoints2 = Math.floor((closeTime - openTime - backgroundTime) / 1000 * 2 / 3) 
    //animate points container
    Animated.spring(pointsOffset, {
        toValue: 0,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

    Animated.timing(pointsRotation, {
        duration: 600,
        toValue: 3600,
        bounciness: 10, 
        useNativeDriver: true,
    }).start();

    Animated.timing(titleOpacity, {
        duration: 600,
        toValue: 0.1,
        bounciness: 0,
        easing: Easing.bezier(0,1.14,.44,.97), 
        useNativeDriver: true,
    }).start();

    if (currentDailyScore < pointsToScore && currentDailyScore + bonusPoints >= pointsToScore && bonusPoints > minimumPoints) {
        Animated.spring(daysOffset, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    }
  }



  const updatePointsInFb = async () => {

    let bonusPoints = Math.floor((closeTime - openTime - backgroundTime) / 1000 * 2 / 3) 
    console.log('bounus points is: ', bonusPoints);

    setDisplayedPoints(bonusPoints)

    if (documentIdPoints !== 'tempid' && bonusPoints > minimumPoints) {

    
      showPointsAnimation(bonusPoints);

      updateDoc(docRefPoints, {
        dailyPoints: lastUpdateVal === formatDate(new Date()) ? currentDailyScore + bonusPoints : bonusPoints,
        totalPoints: totalPointsVal + bonusPoints,
        weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + bonusPoints : bonusPoints,
        lastUpdate: formatDate(new Date()),
        daysInRow: currentDailyScore < pointsToScore && currentDailyScore + bonusPoints >= pointsToScore ? daysInRowVal + 1 : daysInRowVal
      })
      .then(docRef => {
        console.log("A New Document Field has been added to an existing document updaiting points");
      })
      .catch(error => {
        console.log(error);
      })
    }
  }


  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function saveTxtSize(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setDarkMode(result)
    } else {
      console.log('No values stored under that key: ', key);
    }
  }

  async function getValueForTxtSize(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      let tempNummer = parseInt(result)
      setFontSize(tempNummer)
    } else {
      console.log('No values stored under that key font: ', key);
    }
  }

  useEffect(() => {

    getValueFor('darkMode');
    getValueForTxtSize('fontSize')
    textData.map(el => {
        if (el.textId === route.params.textId) {
          setTitle(el.title);
          setText(el.text)
          setExpressions(el.expressions);
          if (el.links) {
            setPictures(el.links);
          }
        }
    })


    if (route.params.language === 'PL') {
      setPtsText('pkt');
      setStreakText('seria');
    } else if (route.params.language === 'ES') {
      setPtsText('pts');
      setStreakText('racha');
    } else if (route.params.language === 'DE') {
      setPtsText('Pkt');
      setStreakText('Serie');
    }  else if (route.params.language === 'LT') {
      setPtsText('tašk');
      setStreakText('serija');
    }  else if (route.params.language === 'UA') {
      setPtsText('б');
      setStreakText('серія');
    }  else if (route.params.language === 'AR') {
      setPtsText('نقاط');
      setStreakText('سلسلة');
    }


  }, [])



  useEffect(() => {

    openTime = new Date().getTime();


    const getDataFb = async () => {

      
      const q3 = query(usersPointsCollection, where('userRef', '==', auth.currentUser.uid))
      const querySnapshot3 = await getDocs(q3);

      if (querySnapshot3.empty) {
        console.log('no data for userPoints for this user in Learnword screen. this is an error. there should be document for this user!');
      } else {

        querySnapshot3.forEach((doc) => {
            
            if (doc.data().lastUpdate !== formatDate(new Date())) {
              setCurrentDailyScore(0);
            } else {
              setCurrentDailyScore(doc.data().dailyPoints);
            }
            setDaysInRowVal(() => {
              if (doc.data().lastUpdate !== today && doc.data().lastUpdate !== yesterday) {
                return 0;
              } else {
                return doc.data().daysInRow
              }
            })
            
            setTotalPointsVal(doc.data().totalPoints);
            setLastUpdateVal(doc.data().lastUpdate);
            setWeeklyPointsVal(doc.data().weeklyPoints);
            setDocumentIdPoints(doc.id); 
            
            
          });

      }


    }

    getDataFb();


    return () => {
        getDataFb;
    };
  }, [])


  useEffect(() => {

    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground!');
        endBackgroundTime = new Date().getTime();

        backgroundTime = backgroundTime + endBackgroundTime - startBackgroundTime;
      } else if (nextAppState === 'background') {
        console.log('App has gone to the background!');
        startBackgroundTime = new Date().getTime();

      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);



  return (
    <View style={{...styles.mainContainer, backgroundColor: darkMode === '1' ? 'black' : 'white'}}>

        <View style={styles.head}>
        <View style={styles.symbolCont}>
          <TouchableOpacity onPress={scaleTextDown}>
            <Text style={{...styles.symbolTxt, color: darkMode === '1' ?  'white' : 'black'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={scaleTextUp}>
            <Text style={{...styles.symbolTxt, color: darkMode === '1' ?  'white' : 'black'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={switchDarkMode}>
            <Image style={{...styles.bulbPic, tintColor: darkMode === '1' ? 'white' : 'black'}} source={require('../../../assets/lightbulb.png')} />
          </TouchableOpacity>
        </View>
    
          <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => exitButton()}>
                <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.body}>

          <Animated.View style={{...styles.bonusPointsContainer, transform: [{translateX: pointsOffset}]}}>
              <View>
                  <Text style={styles.bonusPointsText}>+</Text>
              </View>
              <Animated.View style={{transform: [{rotateX: rotatePointsVal}]}}>

                  <Text style={styles.bonusPointsText}> {displayedPoints} </Text>
              </Animated.View>
              <Text style={styles.bonusPointsText}>{ptsText}</Text>
          </Animated.View>


          <Animated.View style={{...styles.daysValContainer, transform: [{translateX: daysOffset}]}}>
                  <View> 
                      <Text style={styles.daysValText}>{daysInRowVal + 1} </Text>
                  </View>
                  <Image source={require('../../../assets/sun.png')}  style={styles.sunImg}/>
                  <Text style={styles.daysValText}> {streakText}</Text>
          </Animated.View>

          <ScrollView style={styles.textMainContainer}>
          <View style={styles.titleCont}>
            <Animated.Text style={{...styles.textTitle, opacity: titleOpacity, color: darkMode === '1' ?  'white' : 'black'}}>{title}</Animated.Text>
          </View>
            <Animated.Text style={{...styles.textMain, opacity: titleOpacity, color: darkMode === '1' ?  'white' : 'black', fontSize}}>{text}</Animated.Text>

            <Animated.Text style={{...styles.textTitleExp, opacity: titleOpacity, color: darkMode === '1' ?  'white' : 'black'}}>Expressions:</Animated.Text>


            {expressions.map((item) => {

              let translation = ''
              

              if (route.params.language === 'PL') {
                translation = item.pl
              } else if (route.params.language === 'DE') {
                translation = item.ger
              } else if (route.params.language === 'LT') {
                translation = item.lt
              } else if (route.params.language === 'AR') {
                translation = item.ar
              } else if (route.params.language === 'UA') {
                translation = item.ua
              } else if (route.params.language === 'ES') {
                translation = item.sp
              } else if (route.params.language === 'EN') {
                translation = item.eng
              }

              return (
                
                <View key={item.key}>
                  <Animated.Text style={{...styles.textExpressions, opacity: titleOpacity, textAlign: route.params.language === 'AR' ? 'right' : 'left', color: darkMode === '1' ?  'white' : 'black', fontSize}}>{item.nor} - {translation}</Animated.Text>
                </View>
              )
            })}


            <Animated.View style={{...styles.photosContainer, opacity: titleOpacity}}>

              {pictures.map((picture) => {
                return(
                  <View key={picture.key} style={styles.photoHolder}>
                    <Image style={styles.photo} source={{uri: picture.link}}/>
                    <Text style={{...styles.photoDesc, color: darkMode === '1' ?  'white' : 'black'}}>{picture.desc}</Text>
                  </View>
                )
              })}

            </Animated.View>

          <View style={{height: 200}}></View>
          </ScrollView>
        </View>
    </View>
  )
}

export default TextScreen