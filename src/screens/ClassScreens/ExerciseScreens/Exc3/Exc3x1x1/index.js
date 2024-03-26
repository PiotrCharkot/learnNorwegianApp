import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type9sentence from '../../../../../listData/dataExercise/B1/Sounds/Type9';


const dataForMarkers = {
    part: 'exercise',
    section: 'section3',
    class: 'class0'
}



const linkList = ['Exc3x1x1', 'Type9x2', 'Type9x3', 'Type9x4', 'Type9x5', 'Type9x6', 'Type9x7', 'Type9x8', 'Type9x9', 'Type9x10'];

const currentScreen = 1;
const allScreensNum = linkList.length;

const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;







//Type9 opening screen

const Exc3x1x1 = ({ route }) => {
    
    
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
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
    const [instructions, setInstructions] = useState('Listen and align words in order');
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
            console.log('setting new points', route.params.userPoints );
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

      console.log('data for exrcises', dataForExercise);
      
      let tempArr = []; 
      let alreadyUsed = [];
      let sumOfAllPoints = 0;
  
  
      for (let i = 0; tempArr.length < allScreensNum; i++) {

          let randomVal = Math.floor(Math.random() * dataForExercise.length);

          if (!alreadyUsed.includes(randomVal)) {
              let newArrGaps = [];
              let newArrText = [];


              for (let j = 0; j < dataForExercise[randomVal].correctAnswers.length; j++) {
                  if (dataForExercise[randomVal].wordsWithGaps[j] === '          ') {
                      newArrGaps.push(j)
                  } else {
                      newArrText.push(j)
                  }
              }

              dataForExercise[randomVal].gapsIndex = newArrGaps;
              dataForExercise[randomVal].textIndex = newArrText;

              sumOfAllPoints = sumOfAllPoints + newArrGaps.length * generalStyles.bonusCheckAnswerGapsTextSounds

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
      setMovingDraggable(null);
      setReleaseDraggable(null);
      return () => {};
    }, [words]);

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
      if (soundLink !== '') {
        setTimeout(() => {
          playSound()
        }, 500);
      }
    }, [contentReady]);


    const onMovingDraggable = (movingDraggable) => {
        setMovingDraggable(movingDraggable);
    };
    
    const onReleaseDraggable = (releaseDraggable) => {
        setMovingDraggable(null);
        setReleaseDraggable(releaseDraggable);
    };

    const swap = (index1, index2) => {
        var arr = [...words];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWords(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };


    const playSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: soundLink }, 
            { shouldPlay: true }
        );
    }

    
    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

      {contentReady ? <View style={styles.body}>

        <View style={styles.topView}>
          <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{instructions}</Text>
          <View style={styles.pictureContainer}>
              <TouchableOpacity onPress={playSound}>
              <Image style={styles.pictureSound} source={require('../../../../../../assets/volume.png')} />
              </TouchableOpacity>
          </View>
        </View>

        <View style={styles.squaresViewContainer}>


            {words.map((item, index) => {
                
                if (exeList[0].textIndex.includes(index)) {
                    return (
                        <View style={styles.exgzampleTextContainer} key={index}>
                            <Text style={styles.exgzampleText}>{item}</Text>
                        </View>
                    )
                } else if (item === '!!!') {
                    return (
                        <View style={styles.spacer} key={index}>
                            
                        </View>
                    )
                }
                else {
                    return (
                    <Draggable
                    key={index}
                    index={index}
                    movingDraggable={movingDraggable}
                    onMovingDraggable={onMovingDraggable}
                    releaseDraggable={releaseDraggable}
                    onReleaseDraggable={onReleaseDraggable}
                    swap={swap}
                    renderChild={(isMovedOver) => {
                        return (

                        <LinearGradient
                        colors={isCorrect[index] === 0 || index > exeList[0].correctAnswers.length ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !exeList[0].gapsIndex.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                            ]}
                        >
                            
                            <Text style={styles.textInDraggable}>{item}</Text>
                        </LinearGradient>
                        );
                    }}
                    />
                    );
                }
                
            })}

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

export default Exc3x1x1


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
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  squaresViewContainer: {
    flexDirection: "row",
    padding: 16,
    flexWrap: 'wrap',
  },
  draggableContainer: {
    height: 30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'lightgreen'
  },
  draggableContainerEmpty: {
    width: 0,
    height: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    margin: 0,
    overflow: "hidden",
    backgroundColor: 'white'
  },
  draggableContainerSwap: {
    paddingTop: 0,
    paddingLeft: 4,
    paddingBottom: 0,
    paddingRight: 4,
    height: 26,
    borderWidth: 2,
    borderColor: "red",
  },
  textInDraggable: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white'
  },
  exgzampleText: {
    fontSize: 12,
    fontWeight: '500',
    flexWrap: 'wrap',
    
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 6,
    marginHorizontal: 2,
  },
  spacer: {
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    height: 40,
    width: '100%',
  },
  pictureContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureSound: {
    height: 50,
    width: 50,
    tintColor: generalStyles.colorText2
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

