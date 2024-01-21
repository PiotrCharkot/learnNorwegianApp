import { View, Text, Animated, TouchableOpacity, FlatList, Image, Dimensions, Easing } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query, where, doc, updateDoc, setDoc  } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';
import styles from './style'
import CardFlippy from '../../components/cards/CardFlippy'
import Loader from '../../components/other/Loader';
import { withAnchorPoint } from 'react-native-anchor-point';
import { FlashList } from '@shopify/flash-list';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.7 + 20;
const spacerSize = (screenWidth - cardSize) / 2;
const pointsToScore = 200;
const minimumPoints = 1;
let indexOfElement;
let openTime;
let closeTime;


const TestWordScreen = ({route}) => {

    const {userId, refToList, savedLang, own, userN, myTitle} = route.params;

    const navigation = useNavigation();

    const words = collection(db, own ? 'wordsOwn' : 'words');
    const userWordsData = collection(db, 'usersWordsInfo');
    const usersPointsCollection = collection(db, 'usersPoints');

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

    
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const pointsRotation = useRef(new Animated.Value(0)).current;
    const pointsOffset = useRef(new Animated.Value(160)).current; 
    const daysOffset = useRef(new Animated.Value(-200)).current;
    const titleOpacity = useRef(new Animated.Value(1)).current; 

    const [dataFlatList, setDataFlatList] = useState([{key: 'not empty'}]);
    const [showContent, setShowContent] = useState(false);
    const [serverData, setServerData] = useState([]);
    const [userWordInfo, setUserWordInfo] = useState({});
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [documentId, setDocumentId] = useState('tempid');
    const [wordsLvlUp, setWordsLvlUp] = useState([]);
    const [wordsLvlDown, setWordsLvlDown] = useState([]);
    const [currentDailyScore, setCurrentDailyScore] = useState(0);
    const [daysInRowVal, setDaysInRowVal] = useState(0);
    const [lastUpdateVal, setLastUpdateVal] = useState('');
    const [totalPointsVal, setTotalPointsVal] = useState(0);
    const [weeklyPointsVal, setWeeklyPointsVal] = useState(0);
    const [documentIdPoints, setDocumentIdPoints] = useState('tempid');
    const [title, setTitle] = useState('');
    const [flip, setFlip] = useState(false);
    const [btnTxt, setBtnTxt] = useState('')
    const [flipOnStart, setFlipOnStart] = useState(false);
    const [lastIdentification, setLastIdentification] = useState(200);
    const [displayedPoints, setDisplayedPoints] = useState(0);
    
    const docRef = doc(db, "usersWordsInfo", documentId);
    const docRefPoints = doc(db, "usersPoints", documentIdPoints);



    const rotatePointsVal = pointsRotation.interpolate({
        inputRange: [0, 2160],
        outputRange: ["0deg", "2160deg"]
    })
    

    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }


    async function getValueForLangSettings(key) {

        
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            if (result === 'yes') {
                setFlipOnStart(true);
                setFlip(true);
            } else {
                setFlipOnStart(false);
                setFlip(false)
            }
        } else {
            console.log('no value for this key');
        }
    }


    

    const changeSides = () => {
        
        if (flip === false) {
            setShowContent(false);
            save('norwegianFirst', 'yes');
            setFlip(true);
            
        } else if (flip === true) {
            setShowContent(false);
            save('norwegianFirst', 'no');
            setFlip(false);
            
        }

        setTimeout(() => {
            
            setShowContent(true);
        }, 1000);
    }

    const exitButton = () => {

        closeTime = new Date().getTime();

        console.log('test screen was on in ', closeTime - openTime, 'miliseconds.');
        
        Animated.spring(interpolatedValueForX, {
            toValue: 360,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();
    
        updateUsersWordInfo();

        updatePointsInFb();
        
    
        setTimeout(() => {
    
            console.log('new object to return to fb: ', userWordInfo);
            if (own) {
                navigation.navigate({
                    name: 'MyList',
                    params: {userRef: userId}
                  })
            } else {
                navigation.navigate('Main');
            }
        }, 1300)
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };

    const confirmButton = (wordRef) => {
        
        setWordsLvlUp([...wordsLvlUp, wordRef])  
        console.log('word up', wordRef, wordsLvlUp);
    }

    const denyButton = (wordRef) => {
        
        setWordsLvlDown([...wordsLvlDown, wordRef])
        console.log('word down', wordRef, wordsLvlDown);
    }

    const updateUsersWordInfo = async () => {
        
        for (let i = 0; i < lastIdentification; i++) {
            
          
            if (wordsLvlUp.includes(i)) {
                if (userWordInfo.words1.includes(i)) {
                    for( let j = 0; j < userWordInfo.words1.length; j++){ 
    
                        if ( userWordInfo.words1[j] === i) { 
                    
                            let removedEl = userWordInfo.words1.splice(j, 1); 

                            userWordInfo.words2.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words2.includes(i)) {
                    for( let j = 0; j < userWordInfo.words2.length; j++){ 
    
                        if ( userWordInfo.words2[j] === i) { 
                    
                            let removedEl = userWordInfo.words2.splice(j, 1); 

                            userWordInfo.words3.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words3.includes(i)) {
                    for( let j = 0; j < userWordInfo.words3.length; j++){ 
    
                        if ( userWordInfo.words3[j] === i) { 
                    
                            let removedEl = userWordInfo.words3.splice(j, 1); 

                            userWordInfo.words4.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words4.includes(i)) {
                    for( let j = 0; j < userWordInfo.words4.length; j++){ 
    
                        if ( userWordInfo.words4[j] === i) { 
                    
                            let removedEl = userWordInfo.words4.splice(j, 1); 

                            userWordInfo.words5.push(...removedEl)
                        }
                    
                    }
                } 
            } 
            
            if (wordsLvlDown.includes(i)) {
                if (userWordInfo.words5.includes(i)) {
                    for( let j = 0; j < userWordInfo.words5.length; j++){ 
    
                        if ( userWordInfo.words5[j] === i) { 
                    
                            let removedEl = userWordInfo.words5.splice(j, 1); 

                            userWordInfo.words4.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words4.includes(i)) {
                    for( let j = 0; j < userWordInfo.words4.length; j++){ 
    
                        if ( userWordInfo.words4[j] === i) { 
                    
                            let removedEl = userWordInfo.words4.splice(j, 1); 

                            userWordInfo.words3.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words3.includes(i)) {
                    for( let j = 0; j < userWordInfo.words3.length; j++){ 
    
                        if ( userWordInfo.words3[j] === i) { 
                    
                            let removedEl = userWordInfo.words3.splice(j, 1); 

                            userWordInfo.words2.push(...removedEl)
                        }
                    
                    }
                } else if (userWordInfo.words2.includes(i)) {
                    for( let j = 0; j < userWordInfo.words2.length; j++){ 
    
                        if ( userWordInfo.words2[j] === i) { 
                    
                            let removedEl = userWordInfo.words2.splice(j, 1); 

                            userWordInfo.words1.push(...removedEl)
                        }
                    
                    }
                } 
            }
        }


        allUsersArrs.splice(indexOfElement, 1, userWordInfo) //here is the problem !!



        if (documentId !== 'tempid') {
            await updateDoc(docRef, {
                wordList: allUsersArrs
            })
            .then(docRef => {
                console.log("A New Document Field has been added to an existing document");
            })
            .catch(error => {
                console.log(error);
            })


        }
        
        

    }

    const showPointsAnimation = () => {

        let bonusPoints2 = Math.floor((closeTime - openTime) / 1000 * 2 / 3) 
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

        if (currentDailyScore < pointsToScore && currentDailyScore + bonusPoints2 >= pointsToScore && bonusPoints2 > minimumPoints) {
            Animated.spring(daysOffset, {
                toValue: 0,
                speed: 1,
                bounciness: 0,
                useNativeDriver: true,
            }).start();
        }
 
        
    }

    const updatePointsInFb = async () => {

        let bonusPoints = Math.floor((closeTime - openTime) / 1000 * 2 / 3) 
        console.log('bounus points is: ', bonusPoints);

        setDisplayedPoints(bonusPoints)

        if (documentIdPoints !== 'tempid' && bonusPoints > minimumPoints) {

        
            showPointsAnimation();

            updateDoc(docRefPoints, {
                dailyPoints: lastUpdateVal === new Date().toLocaleDateString() ? currentDailyScore + bonusPoints : bonusPoints,
                totalPoints: totalPointsVal + bonusPoints,
                weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + bonusPoints : bonusPoints,
                lastUpdate: new Date().toLocaleDateString(),
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
    
    const renderCard = ({item, index}) => {

        
    
        if (!item.nor) {
            return <View  style={{width: spacerSize}} ></View>
        }
        
        return <View >

            <CardFlippy key={index} wordData={item} lang={savedLang} setFlip={flip} flipFromStart={flipOnStart} callbackFunc={confirmButton} callbackFunc2={denyButton}/>
        </View>
    }

    useEffect(() => {

        console.log('show me my user name here: ', userN);
        openTime = new Date().getTime();


        //let docId = uuid.v4();

        // const setDataToFbPoints = async () => {
        //     await setDoc(doc(db, 'usersPoints', docId), {
        //         userRef: userId,
        //         userName: userN,
        //         totalPoints: 0,
        //         weeklyPoints: 0,
        //         dailyPoints: 0,
        //         daysInRow: 0,
        //         lastUpdate: new Date().toLocaleDateString(),
        //         userIsPro: false,
        //     });


        //     setDocumentIdPoints(docId);
        //     setLastUpdateVal(new Date().toLocaleDateString());
            
        // }


        const getDataFb = async () => {

            const q = query(words, where('refNum', '==', refToList))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                
                setTitle(doc.data().title)
                setServerData(doc.data().wordsArr)
                setLastIdentification(doc.data().wordsArr[doc.data().wordsArr.length - 1].wordId + 1);
                
            });

            const q2 = query(userWordsData, where('userReference', '==', userId))
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
                

                doc.data().wordList.map(item => {
                    if (item.refToList === refToList) {
                        setUserWordInfo(item)
                    }
                })

                indexOfElement = doc.data().wordList.findIndex( item => item.refToList === refToList)
                
                //setUserWordInfo(doc.data().wordList[refToList - 1])
                setAllUsersArrs(doc.data().wordList)
                setDocumentId(doc.id)
               
                setShowContent(true);
                
            });


            const q3 = query(usersPointsCollection, where('userRef', '==', userId))
            const querySnapshot3 = await getDocs(q3);

            if (querySnapshot3.empty) {
                console.log('no data for userPoints for this user in Learnword screen. this is an error. there should be document for this user!');
                //setDataToFbPoints();
            } else {

                querySnapshot3.forEach((doc) => {
                    
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
                    setDocumentIdPoints(doc.id); 
                    
                    
                  });

            }
            
        }

        getValueForLangSettings('norwegianFirst');

        if (savedLang === 'PL') {
            setBtnTxt('Pol');
        } else if (savedLang === 'ES') {
            setBtnTxt('Spa')
        } else if (savedLang === 'EN') {
            setBtnTxt('Eng')
        } else if (savedLang === 'DE') {
            setBtnTxt('Ger')
        }  else if (savedLang === 'LT') {
            setBtnTxt('Lit')
        }  else if (savedLang === 'UA') {
            setBtnTxt('Ukr')
        }  else if (savedLang === 'AR') {
            setBtnTxt('Ara')
        } 

        getDataFb();



        return () => {
            getDataFb;
        };
    }, [])


    useEffect(() => {
        if (showContent) {

            
            let modifiedData = [];
            let justAdded = [];
            let wordNotRepeatIn = 3;

            let arr1Leng = userWordInfo.words1.length;
            let arr2Leng = userWordInfo.words2.length + arr1Leng;
            let arr3Leng = userWordInfo.words3.length + arr2Leng;
            let arr4Leng = userWordInfo.words4.length + arr3Leng;
            let arr5Leng = userWordInfo.words5.length + arr4Leng;

            let arrayAllInfo = userWordInfo.words1.concat(userWordInfo.words2, userWordInfo.words3, userWordInfo.words4, userWordInfo.words5)

            for (let i = 0; i < 50; i++) {
                
                let random1 = arrayAllInfo[Math.floor(Math.random() * arr1Leng)];
                
                
                if (!justAdded.includes(random1)) {
                    let objToParse; 
                    serverData.map( el => {
                        if (el.wordId === random1) {
                            objToParse = el;
                        }
                    })
                    
                    let deepCopyObj1 = JSON.parse(JSON.stringify(objToParse))
                    deepCopyObj1.key = `${i.toString()}a`;
                    modifiedData.push(deepCopyObj1)
                    if (justAdded.length > wordNotRepeatIn) {
                        justAdded.shift();
                        justAdded.push(random1)
                    } else {
                        justAdded.push(random1)
                    }
                }
                

                let random2 = arrayAllInfo[Math.floor(Math.random() * arr2Leng)];
                
                if (!justAdded.includes(random2)) {
                    let objToParse; 
                    serverData.map( el => {
                        if (el.wordId === random2) {
                            objToParse = el;
                        }
                    })
                    
                    let deepCopyObj2 = JSON.parse(JSON.stringify(objToParse))
                    deepCopyObj2.key = `${i.toString()}b`;
                    modifiedData.push(deepCopyObj2)
                    if (justAdded.length > wordNotRepeatIn) {
                        justAdded.shift();
                        justAdded.push(random2)
                    } else {
                        justAdded.push(random2)
                    }
                }


                let random3 = arrayAllInfo[Math.floor(Math.random() * arr3Leng)];
                
                if (!justAdded.includes(random3)) {
                    let objToParse; 
                    serverData.map( el => {
                        if (el.wordId === random3) {
                            objToParse = el;
                        }
                    })
                    
                    let deepCopyObj3 = JSON.parse(JSON.stringify(objToParse))
                    deepCopyObj3.key = `${i.toString()}c`;
                    modifiedData.push(deepCopyObj3)
                    if (justAdded.length > wordNotRepeatIn) {
                        justAdded.shift();
                        justAdded.push(random3)
                    } else {
                        justAdded.push(random3)
                    }
                }


                let random4 = arrayAllInfo[Math.floor(Math.random() * arr4Leng)];
                
                if (!justAdded.includes(random4)) {
                    let objToParse; 
                    serverData.map( el => {
                        if (el.wordId === random4) {
                            objToParse = el;
                        }
                    })
                    
                    let deepCopyObj4 = JSON.parse(JSON.stringify(objToParse))
                    deepCopyObj4.key = `${i.toString()}d`;
                    modifiedData.push(deepCopyObj4)
                    if (justAdded.length > wordNotRepeatIn) {
                        justAdded.shift();
                        justAdded.push(random4)
                    } else {
                        justAdded.push(random4)
                    }
                }
                
                let random5 = arrayAllInfo[Math.floor(Math.random() * arr5Leng)];
                
                if (!justAdded.includes(random5)) {
                    let objToParse; 
                    serverData.map( el => {
                        if (el.wordId === random5) {
                            objToParse = el;
                        }
                    })
                    
                    let deepCopyObj5 = JSON.parse(JSON.stringify(objToParse))
                    deepCopyObj5.key = `${i.toString()}e`;
                    modifiedData.push(deepCopyObj5)
                    if (justAdded.length > wordNotRepeatIn) {
                        justAdded.shift();
                        justAdded.push(random5)
                    } else {
                        justAdded.push(random5)
                    }
                }
                
            } 
            
            console.log('length of list is: ', modifiedData.length);
            setDataFlatList([{key: 'left-spacer'}, ...modifiedData, {key: 'right-spacer'}])
            
        }
    }, [showContent])

   
    
  return (
    <View style={styles.mainContainer}>

        <View style={styles.header}>
            <View style={styles.headBottom}>
                
                <View style={styles.createButtonContainer}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={changeSides}>
                    {
                        flip ? (
                            <Text style={styles.textButton}>Nor - {own ? 'Trans' : btnTxt}</Text>
                        ) : (
                            <Text style={styles.textButton}>{own ? 'Trans' : btnTxt} - Nor</Text>
                        )
                    }
                    
                    </TouchableOpacity>
                </View>
                
                <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                    <TouchableOpacity style={styles.xContainer} onPress={exitButton}>
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
                <Text style={styles.bonusPointsText}>pts</Text>
            </Animated.View>


            <Animated.View style={{...styles.daysValContainer, transform: [{translateX: daysOffset}]}}>
                    <View> 
                        <Text style={styles.daysValText}>{daysInRowVal + 1} </Text>
                    </View>
                    <Image source={require('../../../assets/sun.png')}  style={styles.sunImg}/>
                    <Text style={styles.daysValText}> streak</Text>
            </Animated.View>


            {showContent ? (
                <FlashList 
                    
                    horizontal
                    //style={styles.flatlist}
                    estimatedItemSize={cardSize}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={cardSize}
                    decelerationRate={0}
                    data={dataFlatList}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.key}
                    scrollEventThrottle={16}
                />
            
            ) : (
                <View style={styles.loaderDisplay}>
                    <Loader />
                </View>
            )}

        </View>

    </View>
  )
}

export default TestWordScreen