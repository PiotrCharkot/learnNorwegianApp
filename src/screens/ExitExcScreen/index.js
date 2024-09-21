import { View, Text, Dimensions, Easing, Animated, StyleSheet } from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'
import { onAuthStateChanged  } from 'firebase/auth';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { authentication } from '../../../firebase/firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";
import GradientButton from '../../components/buttons/GradientButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isTablet = screenWidth / screenHeight > 0.65;
const pointsToScore = 200;
const rotationTime = 300;

const usersPointsCollection = collection(db, 'usersPoints');
const usersAchivments = collection(db, 'usersAchivments');

const ExitExcScreen = ({route}) => {

  const navigation = useNavigation();
  const { userPoints, allPoints, dataMarkers, savedLang } = route.params;

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

  const [indicatotValue, setIndicatorValue] = useState(0);
  const [userId, setUserId] = useState('userId');
  const [currentDailyScore, setCurrentDailyScore] = useState(0);
  const [daysInRowVal, setDaysInRowVal] = useState(0);
  const [lastUpdateVal, setLastUpdateVal] = useState('');
  const [totalPointsVal, setTotalPointsVal] = useState(0);
  const [weeklyPointsVal, setWeeklyPointsVal] = useState(0);
  const [documentId, setDocumentId] = useState('tempid');
  const [myDocumentId, setMyDocumentId] = useState('tempid');
  const [showLineOffset, setShowLineOffset] = useState(false);
  const [dayUp, setDayUp] = useState(false);
  const [underFiveDone, setUnderFiveDone] = useState(true);
  const [tempObj, setTempObj] = useState({});
  const [allowChangesFb, setAllowChangesFb] = useState(false);
  const [pointsText, setPointsText] = useState('points');
  const [todaysScoreText, setTodaysScoreText] = useState('Today\'s score');
  const [transformStyle, setTransformStyle] = useState({});
  const [daysInRowText, setDaysInRowText] = useState(() => {
    if (savedLang === 'PL') {
      return 'dni z rzędu'
    } else if (savedLang === 'DE') {
      return 'Tage in Folge'
    } else if (savedLang === 'LT') {
      return 'dienos iš eilės'
    } else if (savedLang === 'AR') {
      return 'أيام متتالية'
    } else if (savedLang === 'UA') {
      return 'дні поспіль'
    } else if (savedLang === 'ES') {
      return 'días consecutivos'
    } else if (savedLang === 'EN') {
      return 'days in a row'
    } 
  });
  const [day1, setDay1] = useState('day in a row');
  const [manyDays, setManyDays] = useState('days in a row');
  const [btnHomeText, setBtnHomeText] = useState('Home');
  const [btnRankingText, setBtnRankingText] = useState('View rankings');

  const interpolatedValue = useRef(new Animated.Value(-180)).current;
  const interpolatedValueFull = useRef(new Animated.Value(-180)).current;
  const interpolatedValueFlipFirst = useRef(new Animated.Value(0)).current;
  const interpolatedValueFlipSecond = useRef(new Animated.Value(-90)).current;
  const lineOffset = useRef(new Animated.Value(currentDailyScore - pointsToScore)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

    
  const docRef = doc(db, "usersPoints", documentId);
  const myDocRef = doc(db, "usersAchivments", myDocumentId)

  const rotateVal = interpolatedValueFlipFirst.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"]
  })

  const rotateValTrans = interpolatedValueFlipSecond.interpolate({
    inputRange: [-90, 0],
    outputRange: ["-90deg", "0deg"]
  })

  const coverPositionDeg = interpolatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"]
  })


  const coverPositionDegFull = interpolatedValueFull.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"]
  })

  useEffect(() => {

    const unscubscribe = onAuthStateChanged(authentication, (authUser) => {
        
      if (authUser) {

        
        setUserId(authUser.uid)

      }
    });

    return unscubscribe;
  }, [])


  useEffect(() => {

    

    const getDataFb = async () => {


      const q2 = query(usersAchivments, where('userRef', '==', userId))
      const querySnapshot2 = await getDocs(q2);
      

      if (querySnapshot2.empty) {
        console.log('getting userAchivments document failed in Exit screen, it is an error');
      } else {
    
        querySnapshot2.forEach((doc) => {
          console.log(doc.id, doc.data());
          setMyDocumentId(doc.id)


          if (dataMarkers.part === 'learning') {


            let objectDescritpror = Object.getOwnPropertyDescriptor(doc.data(), dataMarkers.part)
            let objectDescritprorCopy = JSON.parse(JSON.stringify(objectDescritpror.value))

              

            let objectDescritpror2 = Object.getOwnPropertyDescriptor(objectDescritpror.value, dataMarkers.section);



            let newArr = objectDescritpror2.value.map((item, index) => index === dataMarkers.class ? item + 1 : item);
            
            

            objectDescritpror2.value.map((item, index) => index === dataMarkers.class && item >= 5 ? setUnderFiveDone(false) : null)

            
            

            for (const key in objectDescritprorCopy) {
              

              if (key.toString() === dataMarkers.section) {
                objectDescritprorCopy[key] = newArr;
              }
            }


            


            setTempObj(objectDescritprorCopy);
            setAllowChangesFb(true);


          } else if (dataMarkers.part === 'exercise') {



            let newObjectDescritpror = Object.getOwnPropertyDescriptor(doc.data(), dataMarkers.part)
            let newObjectDescritprorCopy = JSON.parse(JSON.stringify(newObjectDescritpror.value))
            
            
            
            let newObjectDescritpror2 = Object.getOwnPropertyDescriptor(newObjectDescritpror.value, dataMarkers.section);
            let newObjectDescritprorCopy2 = JSON.parse(JSON.stringify(newObjectDescritpror2.value))

            let newObjectDescritpror3 = Object.getOwnPropertyDescriptor(newObjectDescritpror2.value, dataMarkers.class);


            
            let newNewArr = newObjectDescritpror3.value.map((item, index) => {
              if (index === 0 && item < Math.floor(userPoints / allPoints * 100)) {
                
                item = Math.floor(userPoints / allPoints * 100)
                
                return item
              } else if (index === 0 && item >= Math.floor(userPoints / allPoints * 100)) {
                return item
              }
              
              
              if (index === 1) {
                
                item = item + userPoints
                
                return item
              } else if (index === 2) {
                
                item = item + allPoints
                
                return item
              }
            })
            
            

            for (const key in newObjectDescritprorCopy2) {
              
              if (key.toString() === dataMarkers.class) {
                
                newObjectDescritprorCopy2[key] = newNewArr;
              }
            }


            

            for (const key in newObjectDescritprorCopy) {

              if (key.toString() === dataMarkers.section) {

                newObjectDescritprorCopy[key] = newObjectDescritprorCopy2
              }
            }



            setTempObj(newObjectDescritprorCopy);
            setAllowChangesFb(true);

          }


          
          
        });
      }


      const q = query(usersPointsCollection, where('userRef', '==', userId))
      const querySnapshot = await getDocs(q);
      

      if (querySnapshot.empty) {
        
        
      } else {
    
        querySnapshot.forEach((doc) => {
          
          if (doc.data().lastUpdate !== formatDate(new Date())) {
            setCurrentDailyScore(0);
          } else {
            setCurrentDailyScore(doc.data().dailyPoints);
          }
          setDaysInRowVal(() => {
            if (doc.data().lastUpdate !== today && doc.data().lastUpdate !== yesterday) {
              return 0;
            } else {
              if (doc.data().daysInRow === 1) {
                setDaysInRowText(day1);
              } else {
                setDaysInRowText(manyDays);
              }
              return doc.data().daysInRow
            }
          })
          
          setTotalPointsVal(doc.data().totalPoints);
          setLastUpdateVal(doc.data().lastUpdate);
          setWeeklyPointsVal(doc.data().weeklyPoints);
          setDocumentId(doc.id);
          setShowLineOffset(true);
          
        });
      }


      
        
        

    }

    if (userId !== 'userId') {

      getDataFb();
    }



    return () => {
        getDataFb;
    };
  }, [userId])



  useEffect(() => {

   
    let resultIndicatorValue = -180 + userPoints / allPoints * 180;
    setIndicatorValue(Math.floor(userPoints / allPoints * 100))

    Animated.timing(interpolatedValue, {
      toValue: resultIndicatorValue,
      duration: 3000,
      speed: 1,
      delay: 300,
      easing: Easing.bezier(.35,-0.01,.63,1),
      bounciness: 12,
      useNativeDriver: true,
    }).start();

    Animated.timing(interpolatedValueFull, {
      toValue: 0,
      duration: 3000,
      speed: 1,
      delay: 300,
      easing: Easing.bezier(.35,-0.01,.63,1),
      bounciness: 12,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(buttonOpacity, {
      toValue: 1,
      delay: 1300,
      duration: 1000,
      useNativeDriver: true
    }).start();

    
    
  }, [])


  useEffect(() => {
    if (showLineOffset) {

      if (currentDailyScore >= pointsToScore) {
        setDayUp(true);
      }

      if (currentDailyScore < pointsToScore && currentDailyScore + userPoints >= pointsToScore && underFiveDone) {

        if (daysInRowVal + 1 === 1) {
          setTimeout(() => {
            
            setDaysInRowText(day1);
          }, 4100);
        } else {
          setTimeout(() => {
            
            setDaysInRowText(manyDays);
          }, 4100);
        }

        Animated.timing(interpolatedValueFlipFirst, {
          toValue: 90,
          duration: rotationTime,
          delay: 4100,
          easing: Easing.bezier(.49,.13,1,1),
          useNativeDriver: true
        }).start();
        Animated.timing(interpolatedValueFlipSecond, {
            toValue: 0,
            duration: rotationTime,
            delay: rotationTime + 4100,
            easing: Easing.bezier(.67,1.08,1,1),
            useNativeDriver: true
        }).start();

        setTimeout(() => {
          setDayUp(true);
        }, 4100);
      }

      Animated.sequence([
        Animated.timing(lineOffset, {
          toValue: currentDailyScore - pointsToScore >= 0 ? 0 : currentDailyScore - pointsToScore,
          duration: 0,
          speed: 1,
          delay: 0,
          easing: Easing.bezier(.35,-0.01,.63,1),
          useNativeDriver: true,
        }),
  
        Animated.timing(lineOffset, {
          toValue: currentDailyScore - pointsToScore + userPoints >= 0 && underFiveDone ? 0 : underFiveDone ? currentDailyScore - pointsToScore + userPoints : currentDailyScore - pointsToScore < 0 ? currentDailyScore - pointsToScore : 0,
          duration: 4000,
          speed: 1,
          delay: 0,
          easing: Easing.bezier(.35,-0.01,.63,1),
          useNativeDriver: true,
        })
      ]).start();

      if (dataMarkers.part === 'learning' && allowChangesFb && underFiveDone) {

        updateDoc(myDocRef, {
          learning: tempObj
        })
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document Learning part");
        })
        .catch(error => {
            console.log(error);
        })

      } else if (dataMarkers.part === 'exercise' && allowChangesFb) {
        updateDoc(myDocRef, {
          exercise: tempObj
        })
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document Exercise part");
        })
        .catch(error => {
            console.log(error);
        })
      }


      if (underFiveDone) {

        updateDoc(docRef, {
          dailyPoints: lastUpdateVal === formatDate(new Date()) ? currentDailyScore + userPoints : userPoints,
          totalPoints: totalPointsVal + userPoints,
          weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + userPoints : userPoints,
          lastUpdate: formatDate(new Date()),
          daysInRow: currentDailyScore < pointsToScore && currentDailyScore + userPoints >= pointsToScore ? daysInRowVal + 1 : daysInRowVal
        })
        .then(docRef => {
            console.log("A New Document Field has been added to an existing document Points part");
        })
        .catch(error => {
            console.log(error);
        })
        

      }
      
     
    }
    
    
  }, [showLineOffset])
  


  useEffect(() => {
    if (savedLang === 'PL') {
      setPointsText('punkty');
      setDay1('dzień z rzędu');
      setManyDays('dni z rzędu');
      setTodaysScoreText('Dzisiejszy wynik');
      setBtnHomeText('Strona główna');
      setBtnRankingText('Zobacz rankingi');
    } else if (savedLang === 'DE') {
      setPointsText('punkte');
      setDay1('Tag in Folge');
      setManyDays('Tage in Folge');
      setTodaysScoreText('Heutiger Punktestand');
      setBtnHomeText('Startseite');
      setBtnRankingText('Rankings ansehen');
    } else if (savedLang === 'LT') {
      setPointsText('taškai');
      setDay1('diena iš eilės');
      setManyDays('dienos iš eilės');
      setTodaysScoreText('Šiandienos rezultatas');
      setBtnHomeText('Pagrindinis');
      setBtnRankingText('Peržiūrėti reitingus');
    } else if (savedLang === 'AR') {
      setPointsText('نقاط');
      setDay1('يوم متتالي');
      setManyDays('أيام متتالية');
      setTodaysScoreText('نتيجة اليوم');
      setBtnHomeText('الرئيسية');
      setBtnRankingText('عرض التصنيفات');
    } else if (savedLang === 'UA') {
      setPointsText('бали');
      setDay1('день поспіль');
      setManyDays('дні поспіль');
      setTodaysScoreText('Сьогоднішній результат');
      setBtnHomeText('Головна');
      setBtnRankingText('Переглянути рейтинги');
    } else if (savedLang === 'ES') {
      setPointsText('puntos');
      setDay1('día consecutivo');
      setManyDays('días consecutivos');
      setTodaysScoreText('Puntuación de hoy');
      setBtnHomeText('Inicio');
      setBtnRankingText('Ver clasificaciones');
    } 
  }, [])



  useEffect(() => {
    
    if (underFiveDone !== null) {
      
      const newTransformStyle = getTransform(screenWidth, screenWidth, { rotate: underFiveDone ? coverPositionDeg : coverPositionDegFull }, { translateX: 0 }, 0.5, 0);
      setTransformStyle(newTransformStyle);
    }
  }, [underFiveDone]);

  

  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {

  
    let transform = {
        transform: [{ perspective: 100 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth, height: viewHeight});
  };

  const goToMain = () => {
    navigation.navigate("Main");
    
  }

  const goToResults = () => {
    navigation.navigate("results");
    
  }
    

  return (

    <View style={styles.mainContainer}>

    
      <View style={styles.topView}>
        <View style={styles.topLeftView}>
          <Text style={styles.numbersTxt}>+ {underFiveDone ? userPoints : 0}</Text>
          <Text style={styles.resultsTxt}>{pointsText}</Text>
        </View>
        <View style={styles.topRightView}>
          <View >

            <Animated.View style={{...styles.numberHolder, transform: [{perspective: 500}, {rotateY: rotateVal}]}}>
              <Text style={styles.numbersTxt}>{daysInRowVal}</Text>
            </Animated.View>
            <Animated.View style={{transform: [{perspective: 500}, {rotateY: rotateValTrans}]}}>
              <Text style={styles.numbersTxt}>{daysInRowVal + 1}</Text>
            </Animated.View>
          </View>
        <Text style={styles.resultsTxt}>{daysInRowText}</Text>
        </View>

      </View>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View style={styles.mainMaskContainer}>
            <View style={{
              ...styles.circleIndicator, 
              alignItems: indicatotValue > 55 ? 'center' : 'flex-start', 
              paddingTop: indicatotValue > 55 ? 35 : indicatotValue > 30 ? 50 : 70, 
              paddingLeft: indicatotValue > 55 ? 0 : indicatotValue > 30 ? 40 : 20 }}>
              <Text style={styles.resultPercentText}>{underFiveDone ? indicatotValue : 0} %</Text>
            </View>
          </View>
        }
        >
        
        <View style={styles.mainBackgroundContainer}>

          
          <LinearGradient colors={['#16A085', '#F4D03F']} start={[0.1, 0.5]} end={[0.9, 0.5]} style={styles.indicatorGradient} />
        


          <Animated.View style={{
            ...styles.animatedView,
            ...transformStyle
          }}>

            <LinearGradient colors={[ 'rgba(255,255,255,0)',  'white']} start={[1.0, 0.0]} end={[1.0, 0.03]} style={styles.animatedViewGradient} />
            
          </Animated.View>

          
          <View style={styles.bottomCoverView} >
          </View>
          
        </View>

        
      </MaskedView>
      <View style={styles.bottomView}>
        
        <View style={styles.buttonsContainer}>
          <Animated.View style={{...styles.buttonView, opacity: buttonOpacity}}>
          <GradientButton  
          height={40} 
          width={screenWidth / 1.5 }
          colorA={'#485563'} 
          colorB={'#29323c'} 
          callbackFunc={goToMain} 
          path={'home'} 
          colorIcon={'white'}
          heightIcon={15} 
          widthIcon={15}
          fontSize={16}
          noText={false}
          text={btnHomeText}
          colorText={'white'}
          startGradient={[1.0, 0.0]}
          endGradient={[1.0, 1.0]}
          borderTopRightRadius={20} 
          borderTopLeftRadius={20} 
          borderBottomRightRadius={20} 
          borderBottomLeftRadius={20}
          marginR={5}
          />
          </Animated.View>
          <Animated.View style={{...styles.buttonView, opacity: buttonOpacity}}>
          <GradientButton  
          height={40} 
          width={screenWidth / 1.5 }
          colorA={'#485563'} 
          colorB={'#29323c'} 
          callbackFunc={goToResults} 
          path={'results'} 
          colorIcon={'white'}
          heightIcon={15} 
          widthIcon={15}
          fontSize={16}
          noText={false}
          text={btnRankingText}
          colorText={'white'}
          startGradient={[1.0, 0.0]}
          endGradient={[1.0, 1.0]}
          borderTopRightRadius={20} 
          borderTopLeftRadius={20} 
          borderBottomRightRadius={20} 
          borderBottomLeftRadius={20}
          marginR={5}
          />
          </Animated.View>
        </View>

                 
        


        <View style={{...styles.dayProgressContainer, shadowColor: dayUp ? 'yellow' : 'transparent'}}>
          <View style={styles.progressLine}>
            <Animated.View style={{...styles.progress, width: pointsToScore, transform: [{translateX: lineOffset}], borderColor: dayUp ? 'yellow' : 'transparent' }}></Animated.View>
          </View>

        </View>
        <Text style={styles.todayScoreText}>{todaysScoreText}: {showLineOffset && underFiveDone ? currentDailyScore + userPoints : showLineOffset ? currentDailyScore : 0}</Text>

      </View>
      
    </View>
  )
}

export default ExitExcScreen


const styles = StyleSheet.create({
  mainContainer: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: 'white',
  },
  topView: {
    height: screenHeight / 4,
    flexDirection: 'row',
    paddingTop: 100,
  },
  numbersTxt:{ 
    fontSize: 36,
    color: 'grey'
  },
  numberHolder: {
    position: 'absolute',
  },
  resultsTxt: {
    fontSize: 16,
    marginTop: 5
  },
  topLeftView: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightView: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMaskContainer: {
    backgroundColor: 'transparent',
    height: screenHeight / 2,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIndicator: {
    height: isTablet ? screenWidth - 400 : screenWidth - 100,
    width: isTablet ? screenWidth - 400 : screenWidth - 100,
    borderRadius: isTablet ? (screenWidth - 400 / 2) : (screenWidth - 100 / 2),
    backgroundColor: 'transparent',
    borderWidth: isTablet ? 60 : 35,
    borderColor: 'black',
    
    justifyContent: 'flex-start',
    
  },
  resultPercentText: {
    fontSize: 24,
    fontWeight: '700'
  },
  indicatorGradient: {
    height: '50%'
  },
  animatedView: {
    height: screenWidth,
    width: screenWidth,
    position: 'absolute',
    alignItems: 'center',
    borderTopColor: '#E5E5BE',
    top: isTablet ? screenHeight / 4 + 30 : screenHeight / 4 + 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  animatedViewGradient: {
    height: '100%', 
    width: '100%'
  },
  mainBackgroundContainer: {
    height: '100%',
    width: '100%',
  },
  bottomCoverView: {
    height: '50%', 
    backgroundColor: 'transparent', 
    borderTopWidth: 2, 
    borderTopColor: 'darkred'
  },
  bottomView: {
    height: screenHeight / 4,
    alignItems: 'center'
  },
  dayProgressContainer: {
    marginTop: -screenHeight / 8 - 100,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5
  },
  progressLine: {
    height: 10,
    width: pointsToScore,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
    
  },
  progress: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#283c86',
    borderWidth: 1,
    
  },
  todayScoreText: {
    fontSize: 12
  },
  buttonView: {
    marginTop: 10
  }
})
