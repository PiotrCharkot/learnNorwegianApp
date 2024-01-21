import { View, Text, Dimensions, Easing, Animated, StyleSheet } from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'
import { onAuthStateChanged  } from 'firebase/auth';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { authentication } from '../../../firebase/firebase-config';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";
import GradientButton from '../../components/buttons/GradientButton';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const pointsToScore = 200;
const rotationTime = 300;

const usersPointsCollection = collection(db, 'usersPoints');
const usersAchivments = collection(db, 'usersAchivments');

const ExitExcScreen = ({route}) => {

  const navigation = useNavigation();
  const { userPoints, allPoints, dataMarkers } = route.params;

  let sixDaysAgo = new Date(new Date().setDate(new Date().getDate()-6)).toLocaleDateString();
  let fiveDaysAgo = new Date(new Date().setDate(new Date().getDate()-5)).toLocaleDateString();
  let fourDaysAgo = new Date(new Date().setDate(new Date().getDate()-4)).toLocaleDateString();
  let threeDaysAgo = new Date(new Date().setDate(new Date().getDate()-3)).toLocaleDateString();
  let twoDaysAgo = new Date(new Date().setDate(new Date().getDate()-2)).toLocaleDateString();
  let yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString();
  let today = new Date().toLocaleDateString();

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
  const [tempObj, setTempObj] = useState({})
  const [allowChangesFb, setAllowChangesFb] = useState(false)

  const interpolatedValue = useRef(new Animated.Value(-180)).current;
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

  useEffect(() => {

    const unscubscribe = onAuthStateChanged(authentication, (authUser) => {
        
      if (authUser) {

        
        setUserId(authUser.uid)

      }
    });

    return unscubscribe;
  }, [])


  useEffect(() => {

    console.log('on exit points: ', userPoints);

    console.log('some markers', dataMarkers);

    

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



            let newArr = objectDescritpror2.value.map((item, index) => index === dataMarkers.class ? item + 1 : item) 
            

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
        
        //setDataToFb();
      } else {
    
        //setIsNewUser(false);
        
        querySnapshot.forEach((doc) => {
          console.log('my date in fb: ', doc.data().lastUpdate, 'date new:', new Date().toLocaleDateString());
          if (doc.data().lastUpdate !== new Date().toLocaleDateString()) {
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

      if (currentDailyScore < pointsToScore && currentDailyScore + userPoints >= pointsToScore) {

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
          duration: 100,
          speed: 1,
          delay: 0,
          easing: Easing.bezier(.35,-0.01,.63,1),
          useNativeDriver: true,
        }),
  
        Animated.timing(lineOffset, {
          toValue: currentDailyScore - pointsToScore + userPoints >= 0 ? 0 : currentDailyScore - pointsToScore + userPoints,
          duration: 4000,
          speed: 1,
          delay: 0,
          easing: Easing.bezier(.35,-0.01,.63,1),
          useNativeDriver: true,
        })
      ]).start();

      if (dataMarkers.part === 'learning' && allowChangesFb) {

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

      updateDoc(docRef, {
        dailyPoints: lastUpdateVal === new Date().toLocaleDateString() ? currentDailyScore + userPoints : userPoints,
        totalPoints: totalPointsVal + userPoints,
        weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + userPoints : userPoints,
        lastUpdate: new Date().toLocaleDateString(),
        daysInRow: currentDailyScore < pointsToScore && currentDailyScore + userPoints >= pointsToScore ? daysInRowVal + 1 : daysInRowVal
      })
      .then(docRef => {
          console.log("A New Document Field has been added to an existing document Points part");
      })
      .catch(error => {
          console.log(error);
      })
      
     
    }
    
    
  }, [showLineOffset])
  




  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
      let transform = {
          transform: [{ perspective: 100 }, transValA, transValB],
      };
      return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth, height: viewHeight});
  };

  const goToMain = () => {
    navigation.navigate("Main");
    console.log('routing to main');
  }

  const goToResults = () => {
    navigation.navigate("results");
    console.log('routing to main');
  }
    

  return (

    <View style={styles.mainContainer}>

    
      <View style={styles.topView}>
        <View style={styles.topLeftView}>
          <Text style={styles.numbersTxt}>+ {userPoints}</Text>
          <Text style={styles.resultsTxt}>points</Text>
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
        <Text style={styles.resultsTxt}>days in a row</Text>
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
              <Text style={styles.resultPecentText}>{indicatotValue }%</Text>
            </View>
          </View>
        }
        >
        
        <View style={styles.mainBackgroundContainer}>

          
          <LinearGradient colors={['#16A085', '#F4D03F']} start={[0.1, 0.5]} end={[0.9, 0.5]} style={styles.indicatorGradient} />
        


          <Animated.View style={{
            ...styles.animatedView,
            ...getTransform(screenWidth, screenWidth, { rotate: coverPositionDeg }, { translateX: 0 }, 0.5, 0)
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
          path={'forgot'} 
          colorIcon={'white'}
          heightIcon={15} 
          widthIcon={15}
          fontSize={16}
          noText={false}
          text={' go to main'}
          colorText={'white'}
          startGradient={[1.0, 0.0]}
          endGradient={[1.0, 1.0]}
          borderTopRightRadius={20} 
          borderTopLeftRadius={20} 
          borderBottomRightRadius={20} 
          borderBottomLeftRadius={20}
          />
          </Animated.View>
          <Animated.View style={{...styles.buttonView, opacity: buttonOpacity}}>
          <GradientButton  
          height={40} 
          width={screenWidth / 1.5 }
          colorA={'#485563'} 
          colorB={'#29323c'} 
          callbackFunc={goToResults} 
          path={'forgot'} 
          colorIcon={'white'}
          heightIcon={15} 
          widthIcon={15}
          fontSize={16}
          noText={false}
          text={' check rankings '}
          colorText={'white'}
          startGradient={[1.0, 0.0]}
          endGradient={[1.0, 1.0]}
          borderTopRightRadius={20} 
          borderTopLeftRadius={20} 
          borderBottomRightRadius={20} 
          borderBottomLeftRadius={20} 
          />
          </Animated.View>
        </View>

                 
        


        <View style={{...styles.dayProgressContainer, shadowColor: dayUp ? 'yellow' : 'transparent'}}>
          <View style={styles.progressLine}>
            <Animated.View style={{...styles.progress, width: pointsToScore, transform: [{translateX: lineOffset}], borderColor: dayUp ? 'yellow' : 'transparent' }}></Animated.View>
          </View>

        </View>
        <Text style={styles.todayScoreText}>Today score: {currentDailyScore + userPoints}</Text>

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
    height: screenWidth - 100,
    width: screenWidth - 100,
    borderRadius: (screenWidth - 100 / 2),
    backgroundColor: 'transparent',
    borderWidth: 40,
    borderColor: 'black',
    
    justifyContent: 'flex-start',
    
  },
  resultPecentText: {
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
    top: screenHeight / 4 + 10,
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
