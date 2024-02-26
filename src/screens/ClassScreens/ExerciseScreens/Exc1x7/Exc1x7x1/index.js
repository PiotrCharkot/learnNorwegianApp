import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import DraggableQuick from '../../../../../components/other/DraggableQuick';
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
import aatest from '../../../../../listData/aatest';


const dataForMarkers = {
    part: 'exercise',
    section: 'section1',
    class: 'class1'
}

const typesInSet = [aatest, aatest, type2prep, type1prep, type5prep, type7prep, type8prep];
const linkList = ['Exc1x7x1', 'Type6', 'Type2', 'Type1', 'Type5', 'Type7', 'Type8'];
let usedItems = [];

const currentScreen = 1;
const allScreensNum = linkList.length;


const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;


const leftContainerCapacity = 5;
const rightContainerCapacity = 10;


//Type6 opening screen

const Exc1x7x1 = ({route}) => {



    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState([]);
    const [isCorrect, setIsCorrect] = useState([]);
    const [isCorrectNewArr, setIsCorrectNewArr] = useState([]);
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [instructions, setInstructions] = useState('Sort the words into the correct categories.');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');
    const [translationLeft, setTranslationLeft] = useState('')
    const [translationRight, setTranslationRight] = useState('')


    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);


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
            setInstructions('Posortuj słowa do właściwych kategorii.')
          } else if (savedLang === 'DE') {
            setInstructions('Sortiere die Wörter in die richtigen Kategorien.')
          } else if (savedLang === 'LT') {
            setInstructions('Sugrupuokite žodžius į teisingas kategorijas.')
          } else if (savedLang === 'AR') {
            setInstructions('رتب الكلمات في الفئات الصحيحة')
          } else if (savedLang === 'UA') {
            setInstructions('Розсортуйте слова за правильними категоріями.')
          } else if (savedLang === 'ES') {
            setInstructions('Ordena las palabras en las categorías correctas.')
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
          let newArrLineBreaker = [];
  
          for (let j = 0; j < typesInSet[i][randomVal].correctAnswers.length; j++) {
              if (typesInSet[i][randomVal].wordsWithGaps[j] === '            ') {
                  newArrGaps.push(j)
              } else if (typesInSet[i][randomVal].wordsWithGaps[j] === 'lineBreaker') {
                newArrLineBreaker.push(j)
              } else {
                  newArrText.push(j)
              }
          }
  
  
          typesInSet[i][randomVal].gapsIndex = newArrGaps;
          typesInSet[i][randomVal].textIndex = newArrText;
          typesInSet[i][randomVal].lineBreaker = newArrLineBreaker;
  
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
  
        
        tempArr.push(typesInSet[i][randomVal]);
        
        usedItems.push(typesInSet[i][randomVal]);
        typesInSet[i].splice(randomVal, 1);
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


      if(tempArr[0].translations) {
        if (route.params.savedLang === 'PL') {
          setTranslationLeft(tempArr[0].translations.pl[0])
          setTranslationRight(tempArr[0].translations.pl[1])
        } else if (route.params.savedLang === 'DE') {
          setTranslationLeft(tempArr[0].translations.ger[0])
          setTranslationRight(tempArr[0].translations.ger[1])
        } else if (route.params.savedLang === 'LT') {
          setTranslationLeft(tempArr[0].translations.lt[0])
          setTranslationRight(tempArr[0].translations.lt[1])
        } else if (route.params.savedLang === 'AR') {
          setTranslationLeft(tempArr[0].translations.ar[0])
          setTranslationRight(tempArr[0].translations.ar[1])
        } else if (route.params.savedLang === 'UA') {
          setTranslationLeft(tempArr[0].translations.ua[0])
          setTranslationRight(tempArr[0].translations.ua[1])
        } else if (route.params.savedLang === 'ES') {
          setTranslationLeft(tempArr[0].translations.sp[0])
          setTranslationRight(tempArr[0].translations.sp[1])
        } else if (route.params.savedLang === 'EN') {
          setTranslationLeft(tempArr[0].translations.eng[0])
          setTranslationRight(tempArr[0].translations.eng[1])
        }
      }


      setWords(tempArr[0].words);
      setCorrectAnswers(tempArr[0].correctAnswers);
      setIsCorrect(Array(tempArr[0].words.length).fill(0));
      setIsCorrectNewArr(Array(tempArr[0].words.length).fill(0));
      setContentReady(true);
  
      
      for (let i = 0;  i < typesInSet.length; i++) {
        typesInSet[i].push(usedItems[i]);
      }

      usedItems = []
    
    
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

    

    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

        {contentReady ? <View style={styles.body}>
            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.middelView}>
                <View style={styles.doubleFrame}>
                    <View style={styles.leftSideFrame}>
                        <View style={styles.frameTitle}>

                            <Text style={{...styles.frameTitleTextLeft, textAlign: language === 'AR' ? 'right' : 'center'}} >{exeList[0].translations ? translationLeft : exeList[0].leftTitle}</Text>
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

                            <Text style={{...styles.frameTitleTextRight, textAlign: language === 'AR' ? 'right' : 'center'}} >{exeList[0].translations ? translationRight : exeList[0].rightTitle}</Text>
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

            
          
            </View> : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'chooseCorrectCategory'} 
        userAnswers={words}
        correctAnswers={correctAnswers}
        containerCapacity={[leftContainerCapacity, rightContainerCapacity]}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={linkList[currentScreen]}
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

export default Exc1x7x1

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