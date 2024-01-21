import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Dimensions, Animated, Pressable } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { authentication } from '../../firebase/firebase-config';
import { signInAnonymously, onAuthStateChanged, getAuth  } from 'firebase/auth';
import { db } from '../../firebase/firebase-config'
import { collection, doc, setDoc } from "firebase/firestore";
import uuid from 'react-native-uuid';
import LearningScreen from '../screens/LearningScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ExerciseScreen from '../screens/ExerciseScreen';


const Tab = createBottomTabNavigator();



const Tabs = () => {


    const auth = getAuth();
   

    const focusedIconColor = 'red'
    const focusedIconColor2 = '#b829e3'
    const iconColor = 'grey'
    const iconColor2 = '#b829e3'
    const screenWidth = Dimensions.get("window").width;
    const scale = useRef(new Animated.Value(1)).current;
    const scaleTwo = useRef(new Animated.Value(1)).current;
    const scaleThree = useRef(new Animated.Value(1)).current;
    const scaleFour = useRef(new Animated.Value(1)).current;
    const greyCircleOpacity = useRef(new Animated.Value(0)).current;
    const greyCircleOpacityTwo = useRef(new Animated.Value(0)).current;
    const greyCircleOpacityThree = useRef(new Animated.Value(0)).current;
    const greyCircleOpacityFour = useRef(new Animated.Value(0)).current;
    const shakeFirstIcon = useRef(new Animated.Value(0)).current;
    const shakeSecondIcon = useRef(new Animated.Value(0)).current;
    const shakeThirdIcon = useRef(new Animated.Value(0)).current;
    const shakeFourthIcon = useRef(new Animated.Value(0)).current;
    const shakeFifthIcon = useRef(new Animated.Value(0)).current;
    const redLineOffset = useRef(new Animated.Value(0)).current;
    const [triggerCircelOne, setTriggerCircleOne] = useState(0);
    const [triggerCircelTwo, setTriggerCircleTwo] = useState(0);
    const [triggerCircelThree, setTriggerCircleThree] = useState(0);
    const [triggerCircelFour, setTriggerCircleFour] = useState(0);
    const [triggerCircelFive, setTriggerCircleFive] = useState(0);
    const [numberOfCircleTriggered, setNumberOfCircleTriggered] = useState(0);
    const [allowDataUpload, setAllowDataUpload] = useState(false);

    const shakeOffset = 5;

    const navigation = useNavigation();

    const animateCircle = (circleNum) => {
        if (circleNum === 1) {
            setTriggerCircleOne(() => triggerCircelOne + 1);
            setNumberOfCircleTriggered(1);
            navigation.navigate('learning')
        } else if (circleNum === 2) {
            setTriggerCircleTwo(() => triggerCircelTwo + 1);
            setNumberOfCircleTriggered(2);
            navigation.navigate('exercise')
        } else if (circleNum === 3) {
            setTriggerCircleThree(() => triggerCircelThree + 1);
            setNumberOfCircleTriggered(3);
            navigation.navigate('flashcards')
        } else if (circleNum === 4) {
            setTriggerCircleFour(() => triggerCircelFour + 1);
            setNumberOfCircleTriggered(4);
            navigation.navigate('profil')
        } else if (circleNum === 5) {
            setTriggerCircleFive(() => triggerCircelFive + 1);
            setNumberOfCircleTriggered(5);
            navigation.navigate('results')
        }
    };

    useEffect(() => {

        
        
        const unscubscribe = onAuthStateChanged(authentication, (authUser) => {


            
            if (authUser) {
                console.log('in tab navigator - is anonymous?: ', authUser.isAnonymous);
                console.log('user id in tab navigator is: ', authUser.uid);
                

            }
            if (authUser && !authUser.isAnonymous) {
                console.log('loging as registred user: ', authUser);
                
            } else if (!authUser) {
                signInAnonymously(authentication)
                .then(() => {
                    console.log('anonymus sign in was success. user id is: ', authUser);
                    console.log('show me a user identification current user rught after anonymous sign  in: ', auth.currentUser.uid);
                    setAllowDataUpload(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });

                
                
            }
        });
    
        return unscubscribe;
    }, [])


    useEffect(() => {
        console.log('runing use efect');

        let randomGuestId = Math.floor(Math.random() * 1000000);
        let stringId = randomGuestId.toString()
        let nameToFb = 'Guest' + stringId;
        console.log('string id is: ', nameToFb);
        
        const setDataToFbPoints = async (userReference) => {
            let docId = uuid.v4();
            await setDoc(doc(db, 'usersPoints', docId), {
                userRef: userReference,
                userName: nameToFb,
                totalPoints: 0,
                weeklyPoints: 0,
                dailyPoints: 0,
                daysInRow: 0,
                lastUpdate: new Date().toLocaleDateString(),
                userIsPro: false,
            });

            
        }


        const setDataToFbAchivments = async (userReference) => {

            let docId2 = uuid.v4();
        
        
            await setDoc(doc(db, 'usersAchivments', docId2), {
              userRef: userReference,
              learning: {
                section1: [0,0,0,0,0],
                section2: [0,0,0,0,0,0,0],
                section3: [0,0,0,0,0],
                section4: [0,0,0,0,0],
                section5: [0,0,0,0,0],
                section6: [0,0,0,0,0],
              },
              exercise: {
                section1: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                    class5: [0,0,0],
                    class6: [0,0,0],
                    class7: [0,0,0],
                    class8: [0,0,0],
                    class9: [0,0,0],
                },
                section2: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                },
                section3: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                },
                section4: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                },
              },
              gold: 0,
              silver: 0,
              bronze: 0,
        
            });
        }


        const setDataToFbWordsInfo = async (userReference) => {


            let docId3 = uuid.v4();



            await setDoc(doc(db, 'usersWordsInfo', docId3), {
              userReference: userReference,
              wordList: [
                {
                  refToList: '1',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },{
                  refToList: '2',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '3',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },{
                  refToList: '4',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '5',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },{
                  refToList: '6',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '8',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },{
                  refToList: '9',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                }
              ],
              
            });
        }

        if (allowDataUpload && auth.currentUser.uid) {
            
            
            console.log('show me a user identification current user: ', auth.currentUser.uid);


            setDataToFbPoints(auth.currentUser.uid);
            setDataToFbAchivments(auth.currentUser.uid);
            setDataToFbWordsInfo(auth.currentUser.uid);


            setAllowDataUpload(false);
        }
    }, [allowDataUpload])
    

    useEffect(() => {

        if (triggerCircelOne !== 0 && numberOfCircleTriggered === 1) {
            Animated.parallel([
                Animated.spring(redLineOffset, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(greyCircleOpacity, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(greyCircleOpacity, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scale, {
                            toValue: 1.3,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.spring(scale, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),

                ]),
                Animated.sequence([
                    Animated.timing(shakeFirstIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFirstIcon, { toValue: -shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFirstIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFirstIcon, { toValue: 0, duration: 100, useNativeDriver: true })
                ])
            ]).start();
        } else if (triggerCircelTwo !== 0 && numberOfCircleTriggered === 2) {
            Animated.parallel([
                Animated.spring(redLineOffset, {
                    toValue: (screenWidth - 42) / 5,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(greyCircleOpacityTwo, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(greyCircleOpacityTwo, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scaleTwo, {
                            toValue: 1.3,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.spring(scaleTwo, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),

                ]),
                Animated.sequence([
                    Animated.timing(shakeSecondIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeSecondIcon, { toValue: -shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeSecondIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeSecondIcon, { toValue: 0, duration: 100, useNativeDriver: true })
                ])
            ]).start();
        } else if (triggerCircelThree !== 0 && numberOfCircleTriggered === 3) {
            Animated.parallel([
                Animated.spring(redLineOffset, {
                    toValue: (screenWidth - 42) / 5 * 3,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(greyCircleOpacityThree, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(greyCircleOpacityThree, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scaleThree, {
                            toValue: 1.3,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.spring(scaleThree, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),

                ]),
                Animated.sequence([
                    Animated.timing(shakeThirdIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeThirdIcon, { toValue: -shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeThirdIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeThirdIcon, { toValue: 0, duration: 100, useNativeDriver: true })
                ])
            ]).start();

        } else if (triggerCircelFour !== 0 && numberOfCircleTriggered === 4) {
            Animated.parallel([
                Animated.spring(redLineOffset, {
                    toValue: (screenWidth - 42) / 5 * 4,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(greyCircleOpacityFour, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),
                    Animated.parallel([
                        Animated.timing(greyCircleOpacityFour, {
                            toValue: 0,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.spring(scaleFour, {
                            toValue: 1.3,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.spring(scaleFour, {
                        toValue: 1,
                        duration: 10,
                        useNativeDriver: true,
                    }),

                ]),
                Animated.sequence([
                    Animated.timing(shakeFourthIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFourthIcon, { toValue: -shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFourthIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFourthIcon, { toValue: 0, duration: 100, useNativeDriver: true })
                ])
            ]).start();
        } else if (triggerCircelFive !== 0 && numberOfCircleTriggered === 5) {
            Animated.parallel([
                Animated.spring(redLineOffset, {
                    toValue: (screenWidth - 42) / 5 * 2,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(shakeFifthIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFifthIcon, { toValue: -shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFifthIcon, { toValue: shakeOffset, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeFifthIcon, { toValue: 0, duration: 100, useNativeDriver: true })
                ])
            ]).start();
        }
        
        
    }, [triggerCircelOne, triggerCircelTwo, triggerCircelThree, triggerCircelFour, triggerCircelFive]);


    return (
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            
            tabBarStyle: {
                ...styles.tabBar,
                ...styles.shadow
            }
        }}
        >
            <Tab.Screen name="learning" component={LearningScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (

                    <Pressable 
                            style={styles.pressableMenu} 
                            onPress={() => animateCircle(1)}
                            >
                        <MaskedView 
                            style={{ ...styles.maskView }}
                            maskElement={
                                    <View style={{...styles.maskView}}>
                                    
                                        <Animated.Image
                                            source={require('../../assets/learn.png')} 
                                            resizeMode='contain'
                                            style={{
                                                ...styles.iconImg,
                                                transform: [{translateX: shakeFirstIcon}]
                                            }}
                                            />
                
                                        <Text
                                            style={{
                                                ...styles.iconText
                                            }}>LEARN</Text>    
                                    </View>}
                        >
                        

                        <LinearGradient colors={focused ? [focusedIconColor, focusedIconColor2] : [iconColor, iconColor2]} 
                        start={[0.3, 0.0]}
                        end={[0.7, 0.0]} 
                        style={{...styles.pressableMenu}}>

                        </LinearGradient>

                        </MaskedView>
                        <Animated.View style={{
                            ...styles.greyCircle,
                            opacity: greyCircleOpacity,
                            transform: [{ scaleX: scale }, { scaleY: scale }],
                        }}></Animated.View>
                        <Animated.View style={{
                            ...styles.redLineMenu,
                            transform: [{ translateX: redLineOffset }],

                        }}
                        >
                            <LinearGradient colors={[focusedIconColor, focusedIconColor2]} 
                            start={[0.0, 0.0]}
                            end={[1.0, 0.0]} 
                            style={{height: 2,
                                    width: 30,
                                    borderRadius: 1}}
                            >

                            </LinearGradient>
                        </Animated.View>
                    </Pressable>
                )
            }} />
            <Tab.Screen name="exercise" component={ExerciseScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Pressable 
                    style={styles.pressableMenu}
                    onPress={() => animateCircle(2)}
                    >
                        <MaskedView
                        style={{ ...styles.maskView }}
                        maskElement={
                            <View style={{...styles.maskView}}>
                                <Animated.Image
                                source={require('../../assets/exercise.png')} 
                                resizeMode='contain'
                                style={{
                                    ...styles.iconImg,
                                    
                                    transform: [{translateX: shakeSecondIcon}]
                                }}
                                />

                                <Text
                                style={{
                                    ...styles.iconText
                                }}>TRAIN</Text>
                                    </View>
                        }>
                            <LinearGradient colors={focused ? [focusedIconColor, focusedIconColor2] : [iconColor, iconColor2]} 
                            start={[0.3, 0.0]}
                            end={[0.7, 0.0]} 
                            style={{...styles.pressableMenu}}>

                            </LinearGradient>

                        </MaskedView>
                        <Animated.View style={{
                            ...styles.greyCircle,
                            opacity: greyCircleOpacityTwo,
                            transform: [{ scaleX: scaleTwo }, { scaleY: scaleTwo }],
                        }}></Animated.View>
                        
                    </Pressable>
                ),
            }}/>
            <Tab.Screen name="results" component={ResultsScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Pressable style={{
                            ...styles.centerIcon,
                            ...styles.shadow
                        }}
                        onPress={() => animateCircle(5)}>
                        <Animated.Image
                        source={require('../../assets/results.png')} 
                        resizeMode='contain'
                        style={{
                            ...styles.iconImg,
                            tintColor: focused ? 'pink' :  'white',
                            transform: [{translateX: shakeFifthIcon}]
                        }}
                        />

                        <Text
                        style={{
                            color: focused ? 'pink' :  'white',
                            ...styles.iconText
                        }}>RESULTS</Text>
                    </Pressable>
                ),
            }}/>
            <Tab.Screen name="flashcards" component={FlashcardScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Pressable 
                    style={styles.pressableMenu} 
                    onPress={() => animateCircle(3)}
                    >
                        <MaskedView
                         style={{ ...styles.maskView }}
                         maskElement={
                            <View style={{...styles.maskView}}>
                                <Animated.Image
                                source={require('../../assets/flashcard.png')} 
                                resizeMode='contain'
                                style={{
                                    ...styles.iconImg,
                                    tintColor: focused ? focusedIconColor : iconColor,
                                    transform: [{translateX: shakeThirdIcon}]
                                }}
                                />

                                <Text
                                style={{
                                    color: focused ? focusedIconColor : iconColor,
                                    ...styles.iconText
                                }}>CARDS</Text>
                            </View>
                         }>
                            <LinearGradient colors={focused ? [focusedIconColor, focusedIconColor2] : [iconColor, iconColor2]} 
                                start={[0.3, 0.0]}
                                end={[0.7, 0.0]} 
                                style={{...styles.pressableMenu}}>

                            </LinearGradient>
                        </MaskedView>
                        <Animated.View style={{
                            ...styles.greyCircle,
                            opacity: greyCircleOpacityThree,
                            transform: [{ scaleX: scaleThree }, { scaleY: scaleThree }],
                        }}></Animated.View>
                        
                    </Pressable>
                ),
            }}/>
            <Tab.Screen name="profil" component={ProfilScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Pressable 
                    style={styles.pressableMenu} 
                    onPress={() => animateCircle(4)}
                    >
                        <MaskedView
                        style={{ ...styles.maskView }}
                        maskElement={
                            <View style={{...styles.maskView}}>
                                <Animated.Image
                                source={require('../../assets/profil.png')} 
                                resizeMode='contain'
                                style={{
                                    ...styles.iconImg,
                                    tintColor: focused ? focusedIconColor : iconColor,
                                    transform: [{translateX: shakeFourthIcon}]
                                }}
                                />

                                <Text
                                style={{
                                    color: focused ? focusedIconColor : iconColor,
                                    ...styles.iconText
                                }}>PROFIL</Text>
                            </View>
                        }>

                            <LinearGradient colors={focused ? [focusedIconColor, focusedIconColor2] : [iconColor, iconColor2]} 
                                start={[0.3, 0.0]}
                                end={[0.7, 0.0]} 
                                style={{...styles.pressableMenu}}>

                            </LinearGradient>
                        </MaskedView>
                        <Animated.View style={{
                            ...styles.greyCircle,
                            opacity: greyCircleOpacityFour,
                            transform: [{ scaleX: scaleFour }, { scaleY: scaleFour }],
                        }}></Animated.View>
                        
                    </Pressable>
                ),
            }}/>

        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        backgroundColor: '#ffffff', 
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 15,
        height: 90,
    },
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5

    },
    pressableMenu: {
        alignItems: 'center', 
        justifyContent: 'center', 
        top: 10, 
        width: 80,
        height: 80,
    },
    maskView: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 80,
        height: 80,
    },
    centerIcon: {
        alignItems: 'center', 
        justifyContent: 'center', 
        top: -30, 
        backgroundColor: 'red',
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    greyCircle: {
        height: 40, 
        width: 40,
        position: 'absolute',
        borderWidth: 3,
        borderColor: 'lightgrey', 
        borderRadius: 20,
    },
    iconImg: {
        width: 25,
        height: 25,
        tintColor: 'black'
    },
    iconText: {
        fontSize: 10,
        top: 6,
    },
    redLineMenu: {
        height: 2,
        width: 30,
        borderRadius: 1,
        backgroundColor: 'red', 
        position: 'absolute',
        bottom: 0,
        left: 25,
    }
})

export default Tabs;