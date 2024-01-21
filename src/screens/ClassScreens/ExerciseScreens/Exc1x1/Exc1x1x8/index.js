import {View, Text, StyleSheet, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 8;
const totalPoints = 212;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const wordsCorrect = [
    [
      ['drar', 'vi', 'på', 'ferie', 'i morgen', 'eller', 'i dag', '?' ],
      ['drar', 'vi', 'på', 'ferie', 'i dag', 'eller', 'i morgen', '?' ]
    ],[
      ['jeg', 'har', 'tid', 'til', 'å', 'vente', '.'],
      ['tid', 'til', 'å','vente', 'har' ,'jeg' , '.'],
    ],[
      ['jeg', 'spiser', 'mat', 'nå', '.'],
      ['nå', 'spiser', 'jeg', 'mat', '.'],
      ['mat', 'spiser', 'jeg', 'nå', '.'],
    ],[
      ['kan', 'du', 'hjelpe', 'meg', '?']
    ]
]

const Exc1x1x8 = ({ route }) => {

  const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum} = route.params
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState(['?', 'ferie', 'vi', 'i morgen', 'i dag', 'drar', 'på', 'eller' ]);
    const [words1, setWords1] = useState(['.', 'tid', 'til', 'har', 'å', 'jeg', 'vente' ]);
    const [words2, setWords2] = useState(['nå', '.', 'mat', 'spiser', 'jeg' ]);
    const [words3, setWords3] = useState(['du', 'meg', '?', 'kan', 'hjelpe' ]);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);

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
        if (latestScreen > currentScreen) {
          setLatestScreenAnswered(latestAnswered);
            setLatestScreenDone(latestScreen);
            setComeBack(true)
        }

        if (route.params.userPoints > 0) {
            console.log('setting new points', route.params.userPoints );
            setCurrentPoints(userPoints)
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
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={styles.questionText}>Place words in order.</Text>
            </View>

            <View style={styles.middelView}>
                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
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
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
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
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
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
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
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
                </Animated.View>
            
            </View>

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'orderChceck'}
        userAnswers={allUserAnswers}
        correctAnswers={wordsCorrect}
        answerBonus={15}
        linkNext={'ExitExcScreen'}
        linkPrevious={'Exc1x1x7'} 
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
        totalPoints={totalPoints}
        allScreensNum={allScreensNum}
        />
      </View>
    </View>
  )
}

export default Exc1x1x8


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
    marginVertical: 10,
  },
  middelView: {
    marginHorizontal: 20
  },
  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 35,
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

