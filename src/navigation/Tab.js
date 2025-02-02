import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Dimensions, Animated, Pressable, Image } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { authentication } from '../../firebase/firebase-config';
import { signInAnonymously, onAuthStateChanged, getAuth  } from 'firebase/auth';
import { db } from '../../firebase/firebase-config'
import { collection, doc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import uuid from 'react-native-uuid';
import LearningScreen from '../screens/LearningScreen';
import FlashcardScreen from '../screens/FlashcardScreen';
import ProfilScreen from '../screens/ProfilScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ExerciseScreen from '../screens/ExerciseScreen';


const Tab = createBottomTabNavigator();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get('window').height;
const isWideScreen = screenWidth > 550;

const usersAchivments = collection(db, 'usersAchivments');

const latestVersionOfUserAchivments = 2;


const Tabs = () => {




    const auth = getAuth();

    const storage = getStorage();


    const formatDate = (date) => {
        const isoString = date.toISOString(); // Get the ISO string
        const [year, month, day] = isoString.split('T')[0].split('-'); // Extract year, month, and day
        return `${day}/${month}/${year}`; // Format the date as dd/MM/yyyy
    };

    const randomPicture = ['reindeer-profile.png', 'reindeer-profile2.png', 'reindeer-profile3.png','reindeer-profile4.png', 'reindeer-profile5.png', 'reindeer-profile6.png', 'reindeer-profile7.png', 'reindeer-profile8.png', 'reindeer-profile9.png', 'reindeer-profile10.png', 'reindeer-profile11.png','reindeer-profile12.png', 'reindeer-profile13.png', 'reindeer-profile14.png', 'reindeer-profile15.png', 'reindeer-profile16.png', 'reindeer-profile17.png', 'reindeer-profile18.png', 'reindeer-profile19.png','reindeer-profile20.png', 'reindeer-profile21.png', 'reindeer-profile22.png', 'reindeer-profile23.png']
   

    const focusedIconColor = 'red'
    const focusedIconColor2 = '#b829e3'
    const iconColor = 'grey'
    const iconColor2 = '#b829e3'
    
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
    const [imageLoaded, setImageLoaded] = useState(false);
    const [newProfilePic, setNewProfilePic] = useState(randomPicture[Math.floor(Math.random() * randomPicture.length)]);
    const [tempObjAchivmentsLearning, setTempObjAchivmentsLearning] = useState({})
    const [allowUpdateAchivments, setAllowUpdateAchivments] = useState(false);

    const [achivmentsDocumentId, setAchivmentsDocumentId] = useState('tempid');


    const achivmentsDocRef = doc(db, 'usersAchivments', achivmentsDocumentId);

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
                
                console.log('user id in tab navigator is: ', authUser.uid, '    user is anonymous?: ' , authUser.isAnonymous);


                const checkVersionsOfFirebaseStorage = async () => {

                    const q2 = query(usersAchivments, where('userRef', '==', authUser.uid))
                    const querySnapshot2 = await getDocs(q2);
                    

                    if (querySnapshot2.empty) {
                        console.log('getting userAchivments document FAILED in Tab screen, it is an error');
                    } else {
                        querySnapshot2.forEach((doc) => {
                            
                            
                            if (doc.data().version != latestVersionOfUserAchivments) {
                                
                                console.log('these are data from firebase in tabscreen (it is an old version that will be updated to latest version): ', doc.data());
                                
                                let objectToSet = {}

                                setAchivmentsDocumentId(doc.id);
                                

                                

                                objectToSet = doc.data().learning;

                                // add here things depending on user current version of firebase (doc.data().version)
                                objectToSet.section7 = [0, 0, 0, 0, 0, 0];

                                setTempObjAchivmentsLearning(objectToSet);

                                


                                setAllowUpdateAchivments(true);
                            }
                        })
                    }

                }

                
                checkVersionsOfFirebaseStorage();

            }

            if (authUser && !authUser.isAnonymous) {
                console.log('loging as registred user: ', authUser.uid);
                
            } else if (!authUser) {
                signInAnonymously(authentication)
                .then(() => {
                    console.log('user identification after succesful anonymous sign in: ', auth.currentUser.uid);
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


        if (allowUpdateAchivments) {
            
            
            console.log('my new object to set is: ', tempObjAchivmentsLearning);


            updateDoc(achivmentsDocRef, {
                learning: tempObjAchivmentsLearning,
                version: latestVersionOfUserAchivments
            })
            .then(docRef => {
                console.log("Achivments entry in firebase was update to latest version numer: ", latestVersionOfUserAchivments);
            })
            .catch(error => {
                console.log(error);
            })


            setAllowUpdateAchivments(false);
            
            
        }
      
    
      
    }, [allowUpdateAchivments])
    


    useEffect(() => {
        
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
                lastUpdate: formatDate(new Date()),
                userIsPro: false,
                gold: 0,
                silver: 0,
                bronze: 0,
                version: 1,
                levelName: '',
                leaugeID: '',
                userBadge: ''
            });

            
        }


        const setDataToFbAchivments = async (userReference) => {

            let docId2 = uuid.v4();
        
        
            await setDoc(doc(db, 'usersAchivments', docId2), {
              userRef: userReference,
              version: latestVersionOfUserAchivments,
              learning: {
                section1: [0,0,0,0,0],
                section2: [0,0,0,0,0,0,0],
                section3: [0,0,0,0,0],
                section4: [0,0,0,0,0,0],
                section5: [0,0,0,0,0,0,0],
                section6: [0,0,0,0,0,0],
                section7: [0,0,0,0,0,0],
              },
              exercise: {
                section1: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                    class5: [0,0,0],
                },
                section2: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                    class5: [0,0,0],
                },
                section3: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                    class5: [0,0,0],
                },
                section4: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                },
                section5: {
                    class0: [0,0,0],
                    class1: [0,0,0],
                    class2: [0,0,0],
                    class3: [0,0,0],
                    class4: [0,0,0],
                    class5: [0,0,0],
                },
              }
            });
        }


        const setDataToFbWordsInfo = async (userReference) => {


            let docId3 = uuid.v4();



            await setDoc(doc(db, 'usersWordsInfo', docId3), {
              userReference: userReference,
              version: 1,
              wordList: [
                {
                  refToList: '1',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '2',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '3',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '4',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '5',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '6',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '7',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '8',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '9',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '10',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '11',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '12',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '13',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '14',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '15',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '16',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '17',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '18',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '19',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '20',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '21',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
                {
                  refToList: '22',
                  words1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
                  words2: [],
                  words3: [],
                  words4: [],
                  words5: [],
                },
              ],
              
            });
        }


        const uploadPictureToFb = async (urlParam, idParam) => {
        

            const blob = await new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.onload = () => {
                resolve(xhr.response);
              };
              xhr.onerror = (e) => {
                reject(new TypeError("Network request failed"));
              };
              xhr.responseType = "blob";
              xhr.open("GET", urlParam, true);
              xhr.send(null);
            });
        
            uploadBytesResumable(ref(storage, `profilePictures/${idParam}`), blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            
           
        }

        if (allowDataUpload && auth.currentUser.uid) {
            
            
            console.log('show me a user identification current user: ', auth.currentUser.uid);

            getDownloadURL(ref(storage, 'profilePictures/' + auth.currentUser.uid))
            .then((url) => {
                
                console.log('got url for profile picture in tab navigator');
                
            })
            .catch((error) => {
                console.log(error);
                if (error.code === 'storage/object-not-found') {
                

                getDownloadURL(ref(storage, 'profilePictures/' + newProfilePic))
                    .then((url) => {
                    
                        uploadPictureToFb(url, auth.currentUser.uid);
                    })
                    .catch((error) => {
                    console.log('Didnt get profile picture here');
                    })
                
                }
            });


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



    useEffect(() => {
        const loadImage = async () => {
            const source = require('../../assets/learn.png');
            const uri = Image.resolveAssetSource(source).uri;

            const source2 = require('../../assets/exercise.png');
            const uri2 = Image.resolveAssetSource(source2).uri;

            const source3 = require('../../assets/flashcard.png');
            const uri3 = Image.resolveAssetSource(source3).uri;

            const source4 = require('../../assets/profil.png');
            const uri4 = Image.resolveAssetSource(source4).uri;


            Image.getSize(uri, () => {
                setImageLoaded(true);
                
            }, (error) => {
                console.error('Failed to get image size:', error);
            });


            Image.getSize(uri2, () => {
                setImageLoaded(true);
                
            }, (error) => {
                console.error('Failed to get image size:', error);
            });

            Image.getSize(uri3, () => {
                setImageLoaded(true);
                
            }, (error) => {
                console.error('Failed to get image size:', error);
            });


            Image.getSize(uri4, () => {
                setImageLoaded(true);
                
            }, (error) => {
                console.error('Failed to get image size:', error);
            });
        };

        loadImage();
    }, []);
    

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
                                        }}>LÆR</Text>    
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
                                }}>ØVE</Text>
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
                        }}>TOPP</Text>
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
                                }}>ORD</Text>
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
        height: isWideScreen ? 120 : 90,
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
        position: 'absolute',
        alignItems: 'center', 
        justifyContent: 'center', 
        top: isWideScreen ? 10 : 0, 
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
        position: 'absolute',
        alignItems: 'center', 
        justifyContent: 'center', 
        top: isWideScreen ? -50 : -35, 
        backgroundColor: 'red',
        width: isWideScreen ? 100 : 70,
        height: isWideScreen ? 100 : 70,
        borderRadius: isWideScreen ? 50 : 35,
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
        width: isWideScreen ? 35 : 25,
        height: isWideScreen ? 35 : 25,
        tintColor: 'black'
    },
    iconText: {
        fontSize: isWideScreen ? 14 : 10,
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