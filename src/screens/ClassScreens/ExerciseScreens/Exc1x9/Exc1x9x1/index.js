import {View, Text, StyleSheet, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type1prep from '../../../../../listData/exerciseData/A1/Type1Data/Prepositions'
import type2prep from '../../../../../listData/exerciseData/A1/Type2Data/Prepositions'
import type3prep from '../../../../../listData/exerciseData/A1/Type3Data/Prepositions'
import type4prep from '../../../../../listData/exerciseData/A1/Type4Data/Prepositions'
import type5prep from '../../../../../listData/exerciseData/A1/Type5Data/Prepositions'
import type6prep from '../../../../../listData/exerciseData/A1/Type6Data/Prepositions'
import type7prep from '../../../../../listData/exerciseData/A1/Type7Data/Prepositions'
import type8prep from '../../../../../listData/exerciseData/A1/Type8Data/Prepositions'


const dataForMarkers = {
    part: 'exercise',
    section: 'section1',
    class: 'class1'
}
  


const typesInSet = [type8prep, type4prep, type2prep, type1prep, type5prep, type6prep, type7prep, type8prep];
const linkList = ['Exc1x9x1', 'Type4', 'Type2', 'Type1', 'Type5', 'Type6', 'Type7', 'Type8'];


const currentScreen = 1;
const allScreensNum = linkList.length;

const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;



//Type8 opening screen

const Exc1x9x1 = ({ route }) => {

    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState([]);
    const [words1, setWords1] = useState([]);
    const [words2, setWords2] = useState([]);
    const [words3, setWords3] = useState([]);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [instructions, setInstructions] = useState('some instructions');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');


    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);

    const a1background = useRef(new Animated.Value(0)).current;
    const a2background = useRef(new Animated.Value(0)).current;
    const a3background = useRef(new Animated.Value(0)).current;
    const a4background = useRef(new Animated.Value(0)).current;

    const backgroundArray = [a1background, a2background, a3background, a4background];

    const allUserAnswers = [words, words1, words2, words3]  


    const backgroundA1 = a1background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })
    
    const backgroundA2 = a2background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA3 = a3background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA4 = a4background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const resetAnimation = () => {


        if (answersChecked.length !== 0) {
            setResetCheck(!resetCheck)
            for (let i = 0; i < answersChecked.length; i++) {
                Animated.timing(backgroundArray[i], {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }).start();
            }
        }
        
    }


    useFocusEffect(() => {

        if (route.params) {
          const {userPoints, latestScreen, comeBackRoute, latestAnswered, nextScreen, savedLang} = route.params;


          if (latestScreen > currentScreen) {
              setLatestScreenAnswered(latestAnswered);
              setLatestScreenDone(latestScreen);
              setComeBack(true)
            }
    
            if (route.params.userPoints > 0) {
                console.log('setting new points', route.params.userPoints );
                setCurrentPoints(userPoints)
          }

          if (savedLang === 'PL') {
            setInstructions('polskie instrukcje')
          } else if (savedLang === 'DE') {
            setInstructions('niemieckie instrukcje')
          } else if (savedLang === 'LT') {
            setInstructions('litewskie instrukcje')
          } else if (savedLang === 'AR') {
            setInstructions('arabskie instrukcje')
          } else if (savedLang === 'UA') {
            setInstructions('ukr instrukcje')
          } else if (savedLang === 'ES') {
            setInstructions('esp instrukcje')
          }
          
          setLanguage(savedLang)

        }
        
    })



    useEffect(() => {

        let tempArr = []; 
        let sumOfAllPoints = 0;
    
    
        for (let i = 0; i < typesInSet.length; i++) {
          let randomVal = Math.floor(Math.random() * typesInSet[i].length); 
    
    
          if (typesInSet[i][randomVal].typeOfScreen === '1') {
            sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].nuberOfQuestions * generalStyles.bonusCheckAllAnswers
          } else if (typesInSet[i][randomVal].typeOfScreen === '2') {
            sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].correctAnswers.length * generalStyles.bonusMatchLR
          } else if (typesInSet[i][randomVal].typeOfScreen === '3') {
    
            let newArrGaps = [];
            let newArrText = [];
    
            for (let j = 0; j < typesInSet[i][randomVal].correctAnswers.length; j++) {
                if (typesInSet[i][randomVal].wordsWithGaps[j] === '            ') {
                    newArrGaps.push(j)
                } else {
                    newArrText.push(j)
                }
            }
    
    
            typesInSet[i][randomVal].gapsIndex = newArrGaps;
            typesInSet[i][randomVal].textIndex = newArrText;
    
            sumOfAllPoints = sumOfAllPoints + newArrGaps.length * generalStyles.bonusCheckAnswerGapsText
    
          } else if (typesInSet[i][randomVal].typeOfScreen === '4') {
            
            sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].nuberOfQuestions * generalStyles.bonusCheckAllAnswers
    
          } else if (typesInSet[i][randomVal].typeOfScreen === '5') {
            
            sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].nuberOfQuestions * generalStyles.bonusCheckAnswersManyQ
    
          } else if (typesInSet[i][randomVal].typeOfScreen === '6') {
            
            sumOfAllPoints = sumOfAllPoints + (typesInSet[i][randomVal].correctAnswers[0].length + typesInSet[i][randomVal].correctAnswers[1].length) * generalStyles.bonusChooseCorrectCategory
    
          } else if (typesInSet[i][randomVal].typeOfScreen === '7') {
    
    
            let newArrMistakes = [];
    
    
            for (let j = 0; j < typesInSet[i][randomVal].words.length; j++) {
              
              if (typesInSet[i][randomVal].words[j] != typesInSet[i][randomVal].wordsCorrect[j]) {
                newArrMistakes.push(j);
              }
    
            }
    
            typesInSet[i][randomVal].mistakesIndex = newArrMistakes;
    
            sumOfAllPoints = sumOfAllPoints + newArrMistakes.length * generalStyles.bonusMarkMistakes
    
          } else if (typesInSet[i][randomVal].typeOfScreen === '8') {
            sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].nuberOfQuestions * generalStyles.bonusOrderChceck
          } 
    
          
          tempArr.push(typesInSet[i][randomVal])
        }
    
        
    
        tempArr.push(sumOfAllPoints);
        tempArr.push(dataForMarkers);
        
          
          
        console.log('my list of questions', tempArr);
        console.log('my total points: ', sumOfAllPoints);
        setExeList(tempArr);

        if (tempArr[0].instructions) {

          if (route.params.savedLang === 'PL') {
            setNewInstructions(tempArr[0].instructions.pl)
          } else if (route.params.savedLang === 'DE') {
            setNewInstructions(tempArr[0].instructions.ger)
          } else if (route.params.savedLang === 'LT') {
            setNewInstructions(tempArr[0].instructions.lt)
          } else if (route.params.savedLang === 'AR') {
            setNewInstructions(tempArr[0].instructions.ar)
          } else if (route.params.savedLang === 'UA') {
            setNewInstructions(tempArr[0].instructions.ua)
          } else if (route.params.savedLang === 'ES') {
            setNewInstructions(tempArr[0].instructions.sp)
          } else if (route.params.savedLang === 'EN') {
            setNewInstructions(tempArr[0].instructions.eng)
          }
        }


        setWords(tempArr[0].words1);
        setWords1(tempArr[0].words2);
        setWords2(tempArr[0].words3);
        setWords3(tempArr[0].words4);
        setCorrectAnswers(tempArr[0].wordsCorrect);
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

          let delayAnimation = 0;
          for (let i = 0; i < answersChecked.length; i++) {


            if (answersChecked[i]) {
                Animated.timing(backgroundArray[i], {
                    toValue: 100,
                    duration: 500,
                    delay: delayAnimation,
                    useNativeDriver: false
                }).start()
            } else {
                Animated.timing(backgroundArray[i], {
                    toValue: -100,
                    duration: 500,
                    delay: delayAnimation,
                    useNativeDriver: false
                }).start()
            }
            
            delayAnimation = delayAnimation + 200;
        }
        }
    }
  
  }, [answersChecked])

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
        resetAnimation()
        
    };

    const swap1 = (index1, index2) => {
        var arr = [...words1];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWords1(arr);
        resetAnimation()
        
    };


    const swap2 = (index1, index2) => {
      var arr = [...words2];
      var temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
      setWords2(arr);
      resetAnimation()
      
    };

    const swap3 = (index1, index2) => {
      var arr = [...words3];
      var temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
      setWords3(arr);
      resetAnimation()
      
    };


  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

      {contentReady ? <View style={styles.body}>

        <View style={styles.topView}>
            <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
        </View>

        <View style={styles.middelView}>

            {exeList[0].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
                {words.map((item, index) => {
                
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
                        colors={[gradientTop, gradientBottom]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !indexOfGaps.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                            ]}
                        >
                            
                            <Text style={styles.textInDraggable}>{item}</Text>
                        </LinearGradient>
                        );
                    }}
                    />
                );
                
                })}
            </Animated.View> : <View style={{height: 0}}></View>}
            

            {exeList[0].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
                {words1.map((item, index) => {
                
                return (
                    <Draggable
                    key={index}
                    index={index}
                    movingDraggable={movingDraggable}
                    onMovingDraggable={onMovingDraggable}
                    releaseDraggable={releaseDraggable}
                    onReleaseDraggable={onReleaseDraggable}
                    swap={swap1}
                    renderChild={(isMovedOver) => {
                        return (

                        <LinearGradient
                        colors={[gradientTop, gradientBottom]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !indexOfGaps.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                            ]}
                        >
                            
                            <Text style={styles.textInDraggable}>{item}</Text>
                        </LinearGradient>
                        );
                    }}
                    />
                );
                
                })}
            </Animated.View> : <View style={{height: 0}}></View>}
            


            {exeList[0].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
                {words2.map((item, index) => {
                
                return (
                    <Draggable
                    key={index}
                    index={index}
                    movingDraggable={movingDraggable}
                    onMovingDraggable={onMovingDraggable}
                    releaseDraggable={releaseDraggable}
                    onReleaseDraggable={onReleaseDraggable}
                    swap={swap2}
                    renderChild={(isMovedOver) => {
                        return (

                        <LinearGradient
                        colors={[gradientTop, gradientBottom]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !indexOfGaps.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                            ]}
                        >
                            
                            <Text style={styles.textInDraggable}>{item}</Text>
                        </LinearGradient>
                        );
                    }}
                    />
                );
                
                })}
            </Animated.View> : <View style={{height: 0}}></View>}
            


            {exeList[0].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
                {words3.map((item, index) => {
                
                return (
                    <Draggable
                    key={index}
                    index={index}
                    movingDraggable={movingDraggable}
                    onMovingDraggable={onMovingDraggable}
                    releaseDraggable={releaseDraggable}
                    onReleaseDraggable={onReleaseDraggable}
                    swap={swap3}
                    renderChild={(isMovedOver) => {
                        return (

                        <LinearGradient
                        colors={[gradientTop, gradientBottom]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !indexOfGaps.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                            ]}
                        >
                            
                            <Text style={styles.textInDraggable}>{item}</Text>
                        </LinearGradient>
                        );
                    }}
                    />
                );
                
                })}
            </Animated.View> : <View style={{height: 0}}></View>}
            

        </View>

        </View> : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'orderChceck'}
        userAnswers={allUserAnswers}
        correctAnswers={correctAnswers}
        linkNext={linkList[currentScreen]}
        isFirstScreen={true}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
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

export default Exc1x9x1


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
    marginBottom: 20,
    marginHorizontal: 20
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginTop: 10,
    marginBottom: 0,

  },
  middelView: {
    marginHorizontal: 20
  },
  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    backgroundColor: 'pink',
    borderRadius: 8
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
 
  draggableContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
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
    paddingTop: 4,
    paddingLeft: 4,
    paddingBottom: 0,
    paddingRight: 4,
    height: 30,
    borderWidth: 2,
    borderColor: "red",
  },
  textInDraggable: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  exgzampleText: {
    fontSize: 14,
    fontWeight: '500',
    flexWrap: 'wrap'
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 6,
    marginHorizontal: 3
    
  },
  spacer: {
    height: 80,
    width: '100%',
  },
})
