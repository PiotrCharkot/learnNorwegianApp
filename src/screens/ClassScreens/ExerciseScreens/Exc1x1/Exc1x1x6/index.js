import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import DraggableQuick from '../../../../../components/other/DraggableQuick';
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 6;
const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;


const leftContainerCapacity = 7;
const rightContainerCapacity = 14;


const correctAnswers = [['høyttaler', 'bil', 'melk' ,'flaske', 'farge'], ['kort', 'bord', 'barn',  'universitet', 'vindu']];


const Exc1x1x6 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum} = route.params

    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(['???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 'bil', 'bord', 'flaske', 'høyttaler', 'kort', 'universitet', 'vindu', 'melk', 'barn', 'farge'  ]);
    const [isCorrect, setIsCorrect] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);

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
                answersChecked[ind] === 1 ? newArr[ind] = 1 : answersChecked[ind] === 2 ? newArr[ind] = 2 : newArr[ind] = 3
            })
            
            
            setIsCorrect(newArr);
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
        resetAnimation();
        var arr = [...words];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        
        
        for (let j = 0; j < leftContainerCapacity - 1; j++) {
            for (let i = 0; i < leftContainerCapacity - 1; i++) {
                if (arr[i] === '???' && arr[i + 1] !== '???') {
                    var tempVal = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = tempVal;
                    
                }
            }
        }
    
        
    
        for (let j = 0; j < leftContainerCapacity - 1; j++) {
            for (let i = leftContainerCapacity; i < rightContainerCapacity - 1; i++) {
                if (arr[i] === '???' && arr[i + 1] !== '???') {
                    var tempVal = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = tempVal;
                    
                }
            }
        }
        
        setWords(arr);
    };
  
    


    const resetAnimation = () => {

        setIsCorrect([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ])
        setResetCheck(!resetCheck)
       
    }

    useEffect(() => {
        resetAnimation();
    }, [])

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


    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>
            <View style={styles.topView}>
                <Text style={styles.questionText}>Drag words to correct place.</Text>
            </View>

            <View style={styles.middelView}>
                <View style={styles.doubleFrame}>
                    <View style={styles.leftSideFrame}>
                        <View style={styles.frameTitle}>

                            <Text style={styles.frameTitleText} >EN</Text>
                        </View>
                        {words.map((item, index) => {
                    
                        if (index < leftContainerCapacity) {
                            return (
                                <DraggableQuick
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
                                    colors={item === '???' ? ['transparent', 'transparent'] : isCorrect[index] === 1 ? [correct , correct1] : isCorrect[index] === 2 ? [incorrect1 , incorrect] : [gradientTop, gradientBottom]}
                                    key={index}
                                        style={[
                                        isMovedOver && styles.draggableContainerSwap,
                                        item === '???' ? {borderColor: 'transparent'} : {borderColor: 'red '},
                                        index > leftContainerCapacity ?  styles.draggableContainerEmpty : styles.draggableContainer,
                                        ]}
                                    >
                                        
                                        <Text style={styles.textInDraggable}>{item === '???' ? ' ' : item}</Text>
                                    </LinearGradient>
                                    );
                                }}
                                />
                            )
                        } 
                        
                        })}
                    </View>
                    <View style={styles.rightSideFrame}>
                        <View style={styles.frameTitle}>

                            <Text style={styles.frameTitleText} >ET</Text>
                        </View>
                    {words.map((item, index) => {
                    
                    if (index >= leftContainerCapacity && index < rightContainerCapacity) {
                        return (
                            <DraggableQuick
                            
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
                                colors={item === '???' ? ['transparent', 'transparent'] : isCorrect[index] === 1 ? [correct , correct1] : isCorrect[index] === 2 ? [incorrect1 , incorrect] : [gradientTop, gradientBottom]}
                                key={index}
                                    style={[
                                    isMovedOver && styles.draggableContainerSwap,
                                    item === '???' ? {borderColor: 'transparent'} : {borderColor: 'red '},
                                    index < leftContainerCapacity && index > rightContainerCapacity ?  styles.draggableContainerEmpty : styles.draggableContainer,
                                    ]}
                                >
                                    
                                    <Text style={styles.textInDraggable}>{item === '???' ? ' ' : item}</Text>
                                </LinearGradient>
                                );
                            }}
                            />
                        )
                    } 
                    
                    })}
                    </View>
                </View>

                <View style={styles.wordChoice}>
                    {words.map((item, index) => {
                        
                        if (index >= rightContainerCapacity) {
                            return (
                                <DraggableQuick
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
                                        item === '???' ?  styles.draggableContainerEmpty : styles.draggableContainer,
                                        ]}
                                    >
                                        
                                        <Text style={styles.textInDraggable}> {item} </Text>
                                    </LinearGradient>
                                    );
                                }}
                                />
                            )
                        } 
                    
                    })}
                </View>
            </View>

            
          
        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'chooseCorrectCategory'} 
        userAnswers={words}
        correctAnswers={correctAnswers}
        containerCapacity={[leftContainerCapacity, rightContainerCapacity]}
        answerBonus={15}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={'Exc1x1x7'}
        linkPrevious={'Exc1x1x5'}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        resetCheck={resetCheck}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        />
      </View>
    </View>
  )
}

export default Exc1x1x6

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white'
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
  middelView: {},
  doubleFrame: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  leftSideFrame: {
    width: '50%',
    borderRightWidth: 0.3,
    borderRightColor: 'grey',
    paddingVertical: 10,
    paddingRight: 10
    
},
  rightSideFrame: {
    width: '50%',
    paddingVertical: 10,
    paddingLeft: 10

  },
  frameTitle: {
    alignItems: 'center',
    marginBottom: 20
  },
  frameTitleText: {
    fontSize: 19,
    fontWeight: '600'
  },
  wordChoice: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginVertical: 10,
  },
  draggableContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'transparent'
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
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 6,
    marginHorizontal: 3
    
  },
  spacer: {
    height: 40,
    width: '100%',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textBold: {
    color: 'grey'
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
  

})