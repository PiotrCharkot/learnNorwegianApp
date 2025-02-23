import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type9sentence from '../../../../../listData/dataExercise/A1/Sounds/Type9';


const dataForMarkers = { // change here according to section
    part: 'exercise',
    section: 'section1',
    class: 'class0'
}


const recordingOptions = {
    android: {
      extension: '.wav',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
};


const linkList = ['Type11opening', 'Type9x2', 'Type9x3'];

const currentScreen = 1;
const allScreensNum = linkList.length;






//Type11 opening screen

const Type11opening = ({ route }) => {
    
    
    const recordingRef = useRef(null);

    const [recordedUri, setRecordedUri] = useState(null);
    const [sound, setSound] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);

    
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
    const [translation, setTranslation] = useState('')
    
    const [language, setLanguage] = useState('EN');
    const [soundLink, setSoundLink] = useState('')
    
    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);

    
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

      
      setSoundLink(tempArr[0].soundLink)
      setWords(tempArr[0].wordsWithGaps)
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
      


   // Start recording on press in.
   const startRecording = async () => {
    try {
      // Set the audio mode to allow recording.
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      recordingRef.current = recording;

      // Automatically stop recording after 20 seconds.
      setTimeout(() => {
        if (recordingRef.current) {
          stopRecording();
        }
      }, 20000);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Stop recording when user releases the button.
  const stopRecording = async () => {
    try {
      console.log('Stopping recording...');
      const recording = recordingRef.current;
      if (!recording) return;
      recordingRef.current = null;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stored at:', uri);
      setRecordedUri(uri);

    } catch (err) {
      console.error('Failed to stop recording', err);
    }


    Animated.timing(translationPosition, {
        toValue: 0,
        duration: 1000,
        easing: Easing.bezier(.7,.93,.57,.99),
        useNativeDriver: true
    }).start()


  };

  // Play back the recorded audio.
  const playSound = async () => {
    if (!recordedUri) return;
    try {
      console.log('Loading sound...');
      const { sound } = await Audio.Sound.createAsync(
        { uri: recordedUri },
        { shouldPlay: true }
      );
      setSound(sound);
      console.log('Playing sound...');
      await sound.playAsync();
    } catch (err) {
      console.error('Error playing sound', err);
    }
  };



  const playSoundNative = async () => {
    try {
      console.log('Loading sound...');
      const { sound2: playbackObject } = await Audio.Sound.createAsync(
        { uri: soundLink },
        { shouldPlay: true }
      );
    
    } catch (err) {
      console.error('Error playing sound', err);
    }
  };

  // Unload the sound when the component unmounts or sound changes.
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading sound...');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



  // Send the recorded file to Firebase Cloud Functions for transcription.
  const sendForTranscription = async () => {
    if (!recordedUri) return;
    setLoading(true);
    setTranscription('');
    try {
      const formData = new FormData();
      // React Native’s FormData expects a file object with uri, name, and type.
      formData.append('file', {
        uri: recordedUri,
        name: 'recording.wav',
        type: 'audio/wav'
      });

      // Replace with your actual Cloud Function endpoint.
      const response = await fetch(
        'https://us-central1-your-project-id.cloudfunctions.net/transcribeAudio',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const data = await response.json();
      setTranscription(data.transcription);
    } catch (error) {
      console.error('Transcription error:', error);
      Alert.alert('Error', 'There was a problem transcribing your audio.');
    } finally {
      setLoading(false);
    }
  };

  
    

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

        
      }
    
      
    }, [answersChecked])




    


    
    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

      {contentReady ? <View style={styles.body}>

        <View style={styles.topView}>
          <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{instructions}</Text>
          
        </View>


        <View style={styles.norwegianTextContainer}>

            <Text style={styles.norwegianText}>{correctAnswers[0]}</Text>
        </View>

        <View style={styles.recordBtnContainer}>

            <TouchableOpacity
                style={styles.recordButton}
                onPressIn={startRecording}
                onPressOut={stopRecording}
            >
                <Text style={styles.buttonText}>Tap and Hold to Record</Text>
            </TouchableOpacity>
            {recordedUri && (<View>


                <TouchableOpacity style={styles.playButton} onPress={playSound}>
                    <Text style={styles.buttonText}>Play Recording</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.playButton} onPress={playSoundNative}>
                    <Text style={styles.buttonText}>Compaee with native</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.transcribeButton} onPress={sendForTranscription}>
                    <Text style={styles.buttonText}>Transcribe</Text>
                </TouchableOpacity>
                </View>
            )}



            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
                {transcription !== '' && (
                <View style={styles.transcriptionContainer}>
                <Text style={styles.transcriptionLabel}>Transcription:</Text>
                <Text style={styles.transcriptionText}>{transcription}</Text>
                </View>
            )}
                

           
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
  recordButton: {
    backgroundColor: '#4287f5',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#34a853',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10
  },
  transcribeButton: {
    backgroundColor: '#f4b400',
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  transcriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transcriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transcriptionText: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
  }
})

