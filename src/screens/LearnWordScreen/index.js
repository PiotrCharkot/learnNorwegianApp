import { View, Text, FlatList, Animated, Dimensions, TouchableOpacity, Image, Easing, AppState } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { useNavigation } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs, query, doc, where, updateDoc, setDoc } from "firebase/firestore";
import styles from './style'
import CardLearn from '../../components/cards/CardLearn'
import Loader from '../../components/other/Loader';
import { FlashList } from '@shopify/flash-list';
import uuid from 'react-native-uuid';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.7 + 20;
const spacerSize = (screenWidth - cardSize) / 2;
const pointsToScore = 200;
const minimumPoints = 1;
let openTime;
let closeTime;
let startBackgroundTime;
let endBackgroundTime;
let backgroundTime = 0;



const LearnWordScreen = ({route}) => {
    
    const {userId, refToList, savedLang, own, userN, myTitle, userLangOwnCard} = route.params;
    const words = collection(db, own ? 'wordsOwn' : 'words');
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

    
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const pointsRotation = useRef(new Animated.Value(0)).current;
    const pointsOffset = useRef(new Animated.Value(160)).current; 
    const daysOffset = useRef(new Animated.Value(-200)).current;
    const titleOpacity = useRef(new Animated.Value(1)).current; 
    
    const [dataFlatList, setDataFlatList] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const [serverData, setServerData] = useState([]);
    const [title, setTitle] = useState('');
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
    
    
    const docRefPoints = doc(db, "usersPoints", documentIdPoints);

    

    const rotatePointsVal = pointsRotation.interpolate({
        inputRange: [0, 2160],
        outputRange: ["0deg", "2160deg"]
    })

    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    const exitButton = () => {

        closeTime = new Date().getTime();

        console.log('screen was on in ', openTime - closeTime, 'miliseconds.');
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
    
            if (own) {
                navigation.navigate({
                    name: 'PublicLists',
                    params: {userRef: userId, choosenLang: userLangOwnCard}
                  })
            } else {
                navigation.navigate('Main');
            }
        }, 1000)
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };


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
    
    

    useEffect(() => {

        openTime = new Date().getTime();


        const getDataFb = async () => {

            const q = query(words, where('refNum', '==', refToList))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setTitle(doc.data().title)
                setServerData(doc.data().wordsArr)
                setShowContent(true);
            });


            const q3 = query(usersPointsCollection, where('userRef', '==', userId))
            const querySnapshot3 = await getDocs(q3);

            if (querySnapshot3.empty) {
                console.log('no data for userPoints for this user in Learnword screen. this is an error. there should be document for this user!'); 
                //error handling here
                //setDataToFbPoints();
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

        if (savedLang === 'PL') {
            setPtsText('pkt');
            setStreakText('seria');
        } else if (savedLang === 'ES') {
            setPtsText('pts');
            setStreakText('racha');
        } else if (savedLang === 'DE') {
            setPtsText('Pkt');
            setStreakText('Serie');
        }  else if (savedLang === 'LT') {
            setPtsText('tašk');
            setStreakText('serija');
        }  else if (savedLang === 'UA') {
            setPtsText('б');
            setStreakText('серія');
        }  else if (savedLang === 'AR') {
            setPtsText('نقاط');
            setStreakText('سلسلة');
        }


        return () => {
            getDataFb;
        };
    }, [])


    useEffect(() => {
        if (showContent) {
            
            setDataFlatList([{key: 'left-spacer'}, ...serverData, {key: 'right-spacer'}])
            
        }
    }, [showContent])


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
    


    const renderCard = ({item, index}) => {

        
    
        if (!item.nor) {
          return <View style={{width: spacerSize}} ></View>
        }
        
    
        return <View>
    
          <CardLearn key={index} wordData={item} lang={savedLang}/>
        </View>
    }


  return (
    
    <View style={styles.mainContainer}>

        <View style={styles.header}>
            <View style={styles.headBottom}>
                
                <View style={styles.createButtonContainer}>
                  
                </View>
                
                <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                    <TouchableOpacity style={styles.xContainer} hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }} onPress={exitButton}>
                    <Image style={styles.iconXImg} source={require('../../../assets/close.png')} />
                    </TouchableOpacity>
                    
                </Animated.View>
            
            </View>

        </View>
        
            <View style={styles.body}>
                <Animated.View style={{...styles.titleContainer, opacity: titleOpacity}}>
                    <Text style={styles.titleText}>{own ? myTitle : title}</Text>
                </Animated.View>

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
                
                {showContent ? (
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 0, width: 100}}></View>
                        <FlashList 
                            //style={styles.flatlist}
                            horizontal
                            estimatedItemSize={cardSize}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={cardSize}
                            decelerationRate={0}
                            data={dataFlatList}
                            renderItem={renderCard}
                            keyExtractor={(item) => item.key}
                            scrollEventThrottle={16}
                            
                            />
                
                        </View>
                ) : (
                    <View style={styles.loaderDisplay}>
                        <Loader />
                    </View>
                )}
            </View>
            
        
  
    </View>
    
    
  )
}

export default LearnWordScreen