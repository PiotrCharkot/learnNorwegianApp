import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type9sentence from '../../../../../listData/dataExercise/A1/Sounds/Type9';
import { authentication, db } from '../../../../../../firebase/firebase-config';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


const storage = getStorage();
const functions = getFunctions();

const dataForMarkers = { // change here according to section
    part: 'exercise',
    section: 'section1',
    class: 'class0'
}





const linkList = ['Type11opening', 'Type9x2', 'Type9x3'];

const currentScreen = 1;
const allScreensNum = linkList.length;






//Type11 opening screen

const Type11opening = ({ route }) => {
  

    
    const [isCorrect, setIsCorrect] = useState([]);
    const [isCorrectNewArr, setIsCorrectNewArr] = useState([]);
    const [numberGaps, setNumberGaps] = useState(0);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState([]);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [instructions, setInstructions] = useState('Record sentence and compare with');
    const [translation, setTranslation] = useState('');
    const [language, setLanguage] = useState('EN');
    const [soundLink, setSoundLink] = useState('')
    
    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);


    

    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingUri, setRecordingUri] = useState(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [expectedText, setExpectedText] = useState('Hei, hvordan har du det i dag?'); // Example Norwegian text
    const [isMatching, setIsMatching] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [timer, setTimer] = useState(null);

    
    const translationPosition = useRef(new Animated.Value(500)).current;



    useFocusEffect(() => {

      

      if (route.params) {
        const {userPoints, latestScreen, comeBackRoute, latestAnswered, nextScreen, savedLang, data} = route.params;

        
        if (latestScreen > currentScreen) {
          setLatestScreenAnswered(latestAnswered);
          setLatestScreenDone(latestScreen);
          setComeBack(true);
        }

        if (route.params.userPoints > 0) {
            
          setCurrentPoints(userPoints)
        }

        
        if (savedLang === 'PL') {
          setInstructions('Słuchaj i ustaw słowa w kolejności')
        } else if (savedLang === 'DE') {
          setInstructions('Hören und ordne die Wörter der Reihe nach an')
        } else if (savedLang === 'LT') {
          setInstructions('Klausykite ir sudėliokite žodžius pagal eilę')
        } else if (savedLang === 'AR') {
          setInstructions('استمع ورتب الكلمات بالترتيب')
        } else if (savedLang === 'UA') {
          setInstructions('Слухайте та розташовуйте слова за порядком')
        } else if (savedLang === 'ES') {
          setInstructions('Escucha y ordena las palabras')
        }
        
        setLanguage(savedLang)
      }
      
        
    })


    useEffect(() => {

      let parsedData = Object.keys(route.params.data).length === 0 ? {} : JSON.parse(route.params.data) 
      let dataForExercise = Object.keys(route.params.data).length === 0 ? type9sentence : parsedData.sounds.type9;

      
      let tempArr = []; 
      let alreadyUsed = [];
      let sumOfAllPoints = 0;
  
  
      for (let i = 0; tempArr.length < allScreensNum; i++) {

          let randomVal = Math.floor(Math.random() * dataForExercise.length);

          if (!alreadyUsed.includes(randomVal)) {
              

              tempArr.push(dataForExercise[randomVal]);
              alreadyUsed.push(randomVal)
              
          }
          
      }
  
      tempArr.push(sumOfAllPoints);
      tempArr.push(dataForMarkers);
      
        
        
      setExeList(tempArr);

      
      //setExpectedText(tempArr.correctAnswers[0]);
      setSoundLink(tempArr[0].soundLink);
      setWords(tempArr[0].wordsWithGaps);
      setCorrectAnswers(tempArr[0].correctAnswers);
      setNumberGaps(tempArr[0].gapsIndex.length);
      setIsCorrect(Array(tempArr[0].correctAnswers.length).fill(0));
      setIsCorrectNewArr(Array(tempArr[0].correctAnswers.length).fill(0));

      if (route.params.savedLang === 'PL') {
        setTranslation(tempArr[0].translations.pl)
      } else if (route.params.savedLang === 'DE') {
        setTranslation(tempArr[0].translations.ger)
      } else if (route.params.savedLang === 'LT') {
        setTranslation(tempArr[0].translations.lt)
      } else if (route.params.savedLang === 'AR') {
        setTranslation(tempArr[0].translations.ar)
      } else if (route.params.savedLang === 'UA') {
        setTranslation(tempArr[0].translations.ua)
      } else if (route.params.savedLang === 'ES') {
        setTranslation(tempArr[0].translations.sp)
      } else if (route.params.savedLang === 'EN') {
        setTranslation(tempArr[0].translations.eng)
      }



      setContentReady(true);

      
  
    
    
    }, [])



    useEffect(() => {
        (async () => {
          const { status } = await Audio.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Microphone permission is needed to record audio.'
            );
          }
        })();
    }, []);

  
      

    useEffect(() => {
      
      if (answersChecked.length !== 0) {
        setLatestScreenAnswered(currentScreen); 
        for (let i = 0; i < answersChecked.length; i++) {

          const newArr = [...isCorrect]; 
          newArr.map((val, ind) => {
              answersChecked[ind] ? newArr[ind] = 1 : newArr[ind] = 2
          })

          setIsCorrect(newArr);

          
        }


    
        Animated.timing(translationPosition, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bezier(.7,.93,.57,.99),
            useNativeDriver: true
        }).start()
    

        
      }
    
      
    }, [answersChecked])



    useEffect(() => {
        return () => {
          if (recording) {
            stopRecording();
          }
          if (sound) {
            sound.unloadAsync();
          }
        };
    }, [recording, sound]);



    const startRecording = async () => {
        try {
          const { status } = await Audio.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('Vi trenger mikrofontilgang for å ta opp stemmen din');
            return;
          }
    
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          const newRecording = new Audio.Recording();
          await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await newRecording.startAsync();
          setRecording(newRecording);
          setIsRecording(true);
          
          // Start timer for max 20 seconds
          const startTime = Date.now();
          const timerId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setRecordingTime(elapsed);
            
            if (elapsed >= 20) {
              clearInterval(timerId);
              stopRecording();
            }
          }, 1000);
          
          setTimer(timerId);
        } catch (error) {
          console.error('Failed to start recording', error);
        }
      };
    
      const stopRecording = async () => {
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
        
        setRecordingTime(0);
        setIsRecording(false);
        
        if (!recording) return;
        
        try {
            // Check if the recording is actually recording before stopping
            const status = await recording.getStatusAsync();
            if (status.canRecord) {
              await recording.stopAndUnloadAsync();
              const uri = recording.getURI();
              setRecordingUri(uri);
            } else {
              console.log('Recording was already stopped');
            }
        } catch (error) {
            console.error('Failed to stop recording', error);
            // Even if there's an error, still set recording to null to prevent further issues
        } finally {
            setRecording(null);
        }
      };
    
      const playSound = async () => {
        if (!recordingUri) return;
        
        try {
          if (sound) {
            await sound.unloadAsync();
          }
          
          const { sound: newSound } = await Audio.Sound.createAsync({ uri: recordingUri });
          setSound(newSound);
          await newSound.playAsync();
        } catch (error) {
          console.error('Failed to play sound', error);
        }
      };
    
      const transcribeAudio = async () => {
        if (!recordingUri) {
            console.error('No recording URI available');
            return;
        }
        
        console.log('Starting transcription with URI:', recordingUri);
        setIsTranscribing(true);
        
        try {
          // Create a blob to upload
          const response = await fetch(recordingUri);
          const blob = await response.blob();
          console.log('Blob created:', blob.size, 'bytes');
          
          // Upload to Firebase Storage temporarily
          const audioRef = ref(storage, `temp_recordings/${Date.now()}.m4a`);
          await uploadBytes(audioRef, blob);
          console.log('Audio uploaded to Firebase Storage');
          
          // Get download URL for the file
          const downloadURL = await getDownloadURL(audioRef);
          console.log('Download URL obtained:', downloadURL);
          
          // Call your Firebase Cloud Function
          const transcribeFunction = httpsCallable(functions, 'transcribeSpeech');
          console.log('Calling Cloud Function with URL:', downloadURL);

          const params = {
            audioUrl: downloadURL,
            language: 'en-US'
          };
            
          console.log('Params object:', JSON.stringify(params));
          const result = await transcribeFunction(params);
          
          // Process result
          console.log('Transcription result:', result.data);
          setTranscription(result.data.transcription);
          
          // Check if transcription matches the expected text
          checkTextMatch(result.data.transcription, expectedText);
          
          // Delete the temporary file
          await deleteObject(audioRef);
          console.log('Temporary audio file deleted');
        } catch (error) {
          console.error('Transcription error:', error);
          if (error.code) console.error('Error code:', error.code);
          if (error.message) console.error('Error message:', error.message);
          if (error.details) console.error('Error details:', error.details);
          alert('Det oppstod en feil under transkriberingen');
        } finally {
          setIsTranscribing(false);
        }
      };
    
      const checkTextMatch = (transcribed, expected) => {
        // Simple string comparison - you might want to make this more sophisticated
        const normalizedTranscribed = transcribed.toLowerCase().trim();
        const normalizedExpected = expected.toLowerCase().trim();
        
        // Calculate similarity or just check if they're close enough
        const isMatch = normalizedTranscribed === normalizedExpected;
        setIsMatching(isMatch);
      };


    
    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

      {contentReady ? <View style={styles.body}>

        <View style={styles.topView}>
          <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{instructions}</Text>
          
        </View>

        <View style={styles.middleSection}>
              

        <Text style={styles.expectedText}>Vennligst si: "{expectedText}"</Text>
      
        <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPressIn={() => {
              if (!isRecording) {
                startRecording();
              }
            }}
            onPressOut={() => {
              if (isRecording) {
                stopRecording();
              }
            }}
            >
            <Text style={styles.buttonText}>
                {isRecording ? `Tar opp (${recordingTime}s)` : 'Trykk og hold for å ta opp'}
            </Text>
        </TouchableOpacity>
        
        {recordingUri && (
          <TouchableOpacity style={styles.button} onPress={playSound}>
            <Text style={styles.buttonText}>Spill av opptak</Text>
            </TouchableOpacity>
        )}
        
        {recordingUri && (
          <TouchableOpacity 
            style={styles.button} 
            onPress={transcribeAudio}
            disabled={isTranscribing}
            >
            <Text style={styles.buttonText}>
                {isTranscribing ? 'Transkriberer...' : 'Transkriber opptak'}
            </Text>
            </TouchableOpacity>
        )}
        
        {isTranscribing && <ActivityIndicator size="large" color="#0000ff" />}
        
        {transcription ? (
          <View style={styles.resultContainer}>
            <Text style={styles.transcription}>Din tekst: {transcription}</Text>
            <Text style={[
              styles.matchResult, 
              isMatching ? styles.matchSuccess : styles.matchFailure
            ]}>
                {isMatching ? '✓ Teksten stemmer!' : '✗ Teksten stemmer ikke.'}
            </Text>
            </View>
        ) : null}

        
        </View>

        
        <View>
          <Animated.View style={{...styles.translationContainer,  transform: [{translateY: translationPosition}]}}>
            <Text style={styles.translationText}>{translation}</Text>
          </Animated.View>
        </View>
        </View>  : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAnswerGapsTextSounds'}
        userAnswers={words}
        correctAnswers={correctAnswers}
        numberOfGaps={numberGaps}
        linkNext={linkList[currentScreen]}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        isFirstScreen={true}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        resetCheck={resetCheck}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        questionList={exeList}
        links={linkList}
        savedLang={language}
        />
      </View>
    </View>
  )
}

export default Type11opening


const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
  },
  head: {},
  body: {
    height: '100%',
    width: '100%',
  },
  topView: {
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: 20
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginTop: 10,
    marginBottom: 0,
  },
  middleSection: {
    width: '100%',
    alignItems: 'center'
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  norwegianTextContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  recordBtnContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  expectedText: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },
  recordButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 100,
    marginBottom: 20,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#f44336',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: '100%',
  },
  transcription: {
    fontSize: 16,
    marginBottom: 10,
  },
  matchResult: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchSuccess: {
    color: 'green',
  },
  matchFailure: {
    color: 'red',
  },
  translationContainer: {
    position: 'absolute',
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  translationText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center'
  },
  loaderDisplay: {}
  
})

