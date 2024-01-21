import {View, Text, StyleSheet, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';



const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const exitLink = 'ExitExcScreen'


const Type8 = ({ route }) => {

  const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState(exeList[nextScreen - 1].words1);
    const [words1, setWords1] = useState(exeList[nextScreen - 1].words2);
    const [words2, setWords2] = useState(exeList[nextScreen - 1].words3);
    const [words3, setWords3] = useState(exeList[nextScreen - 1].words4);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    const [instructions, setInstructions] = useState('some instructions english type 1');
    const [newInstructions, setNewInstructions] = useState('');

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
      if (latestScreen > nextScreen) {
        setLatestScreenAnswered(latestAnswered);
          setLatestScreenDone(latestScreen);
          setComeBack(true)
      }

      if (route.params.userPoints > 0) {
          console.log('setting new points', route.params.userPoints );
          setCurrentPoints(userPoints)
      }

      if (exeList[nextScreen - 1].instructions) {
        if (savedLang === 'PL') {
            setNewInstructions(exeList[nextScreen - 1].instructions.pl)
          } else if (savedLang === 'DE') {
            setNewInstructions(exeList[nextScreen - 1].instructions.ger)
          } else if (savedLang === 'LT') {
            setNewInstructions(exeList[nextScreen - 1].instructions.lt)
          } else if (savedLang === 'AR') {
            setNewInstructions(exeList[nextScreen - 1].instructions.ar)
          } else if (savedLang === 'UA') {
            setNewInstructions(exeList[nextScreen - 1].instructions.ua)
          } else if (savedLang === 'ES') {
            setNewInstructions(exeList[nextScreen - 1].instructions.sp)
          } else if (savedLang === 'EN') {
            setNewInstructions(exeList[nextScreen - 1].instructions.eng)
        }
      } else {
        if (savedLang === 'PL') {
            setInstructions('polskie instrukcje type 8')
          } else if (savedLang === 'DE') {
            setInstructions('niemieckie instrukcje type 8')
          } else if (savedLang === 'LT') {
            setInstructions('litewskie instrukcje type 8')
          } else if (savedLang === 'AR') {
            setInstructions('arabskie instrukcje type 8')
          } else if (savedLang === 'UA') {
            setInstructions('ukr instrukcje type 8')
          } else if (savedLang === 'ES') {
            setInstructions('esp instrukcje type 8')
        }
      }
    })

    useEffect(() => {

      setMovingDraggable(null);
      setReleaseDraggable(null);
      return () => {};
    }, [words]);

    useEffect(() => {
      
      console.log('answers are in screen 8: ', answersChecked);
      if (answersChecked.length !== 0) {
        setLatestScreenAnswered(nextScreen);
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
      <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.middelView}>

                {exeList[nextScreen - 1].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
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
                

                {exeList[nextScreen - 1].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
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
                


                {exeList[nextScreen - 1].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
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
                


                {exeList[nextScreen - 1].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
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

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'orderChceck'}
        userAnswers={allUserAnswers}
        correctAnswers={exeList[nextScreen - 1].wordsCorrect}
        linkNext={allScreensNum === nextScreen ? exitLink : linkList[nextScreen]}
        linkPrevious={linkList[nextScreen - 2]} 
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={nextScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        resetCheck={resetCheck}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        questionList={exeList}
        links={linkList}
        savedLang={savedLang}
        totalPoints={exeList[exeList.length - 2]}
        dataForMarkers={exeList[exeList.length - 1]}
        />
      </View>
    </View>
  )
}

export default Type8


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
