import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import DraggableQuick from '../../../../../components/other/DraggableQuick';
import generalStyles from '../../../../../styles/generalStyles';


const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;


const leftContainerCapacity = 5;
const rightContainerCapacity = 10;

const exitLink = 'ExitExcScreen'


const Type6 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params

    const isCorrectNewArr = Array(exeList[nextScreen - 1].words.length).fill(0);

    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(exeList[nextScreen - 1].words);
    const [isCorrect, setIsCorrect] = useState(isCorrectNewArr)
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    const [instructions, setInstructions] = useState('some instructions english type 1');
    const [newInstructions, setNewInstructions] = useState('');
    const [translationLeft, setTranslationLeft] = useState('')
    const [translationRight, setTranslationRight] = useState('')

    useEffect(() => {
        setMovingDraggable(null);
        setReleaseDraggable(null);
        return () => {};
    }, [words]);

    useEffect(() => {
        
        if (answersChecked.length !== 0) {
          setLatestScreenAnswered(nextScreen);
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

        setIsCorrect(isCorrectNewArr)
        setResetCheck(!resetCheck)
       
    }

    useEffect(() => {
        resetAnimation();
    }, [])

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
            setInstructions('polskie instrukcje type 6')
          } else if (savedLang === 'DE') {
            setInstructions('niemieckie instrukcje type 6')
          } else if (savedLang === 'LT') {
            setInstructions('litewskie instrukcje type 6')
          } else if (savedLang === 'AR') {
            setInstructions('arabskie instrukcje type 6')
          } else if (savedLang === 'UA') {
            setInstructions('ukr instrukcje type 6')
          } else if (savedLang === 'ES') {
            setInstructions('esp instrukcje type 6')
        }
      }



      if(exeList[nextScreen - 1].translations) {
        if (savedLang === 'PL') {
          setTranslationLeft(exeList[nextScreen - 1].translations.pl[0])
          setTranslationRight(exeList[nextScreen - 1].translations.pl[1])
        } else if (savedLang === 'DE') {
          setTranslationLeft(exeList[nextScreen - 1].translations.ger[0])
          setTranslationRight(exeList[nextScreen - 1].translations.ger[1])
        } else if (savedLang === 'LT') {
          setTranslationLeft(exeList[nextScreen - 1].translations.lt[0])
          setTranslationRight(exeList[nextScreen - 1].translations.lt[1])
        } else if (savedLang === 'AR') {
          setTranslationLeft(exeList[nextScreen - 1].translations.ar[0])
          setTranslationRight(exeList[nextScreen - 1].translations.ar[1])
        } else if (savedLang === 'UA') {
          setTranslationLeft(exeList[nextScreen - 1].translations.ua[0])
          setTranslationRight(exeList[nextScreen - 1].translations.ua[1])
        } else if (savedLang === 'ES') {
          setTranslationLeft(exeList[nextScreen - 1].translations.sp[0])
          setTranslationRight(exeList[nextScreen - 1].translations.sp[1])
        } else if (savedLang === 'EN') {
          setTranslationLeft(exeList[nextScreen - 1].translations.eng[0])
          setTranslationRight(exeList[nextScreen - 1].translations.eng[1])
        }
      }
    })


    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>
            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.middelView}>
                <View style={styles.doubleFrame}>
                    <View style={styles.leftSideFrame}>
                        <View style={styles.frameTitle}>

                            <Text style={{...styles.frameTitleTextLeft, textAlign: savedLang === 'AR' ? 'right' : 'center'}} >{exeList[nextScreen - 1].translations ? translationLeft : exeList[nextScreen - 1].leftTitle}</Text>
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

                            <Text style={{...styles.frameTitleTextRight, textAlign: savedLang === 'AR' ? 'right' : 'center'}} >{exeList[nextScreen - 1].translations ? translationRight : exeList[nextScreen - 1].rightTitle}</Text>
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
        correctAnswers={exeList[nextScreen - 1].correctAnswers}
        containerCapacity={[leftContainerCapacity, rightContainerCapacity]}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={allScreensNum === nextScreen ? exitLink : linkList[nextScreen]}
        linkPrevious={linkList[nextScreen - 2]}
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

export default Type6

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
    marginBottom: 5,
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
    paddingVertical: 0,
    paddingRight: 10
    
},
  rightSideFrame: {
    width: '50%',
    paddingVertical: 0,
    paddingLeft: 10

  },
  frameTitle: {
    alignItems: 'center',
    marginBottom: 0
  },
  frameTitleTextLeft: {
    fontSize: 19,
    fontWeight: '600',
    color: generalStyles.colorText1
  },
  frameTitleTextRight: {
    fontSize: 19,
    fontWeight: '600',
    color: 'brown'
  },
  wordChoice: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 10
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginVertical: 10,
  },
  draggableContainer: {
    paddingHorizontal: 6,
    paddingVertical: 0,
    borderRadius: 8,
    height: 32,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  draggableContainerEmpty: {
    width: 0,
    height: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    margin: 0,
    overflow: "hidden",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  draggableContainerSwap: {
    paddingTop: 0,
    paddingLeft: 4,
    paddingBottom: 0,
    paddingRight: 4,
    height: 32,
    borderWidth: 2,
    borderColor: "red",
    alignItems: 'center',
    justifyContent: 'center'
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