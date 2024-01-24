import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
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
    class: 'class3'
}



const typesInSet = [type3prep, type3prep, type2prep, type1prep, type5prep, type6prep, type7prep, type8prep];
const linkList = ['Exc1x4x1', 'Type3', 'Type2', 'Type1', 'Type5', 'Type6', 'Type7', 'Type8'];
let usedItems = [];

const currentScreen = 1;
const allScreensNum = linkList.length;

const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;







//Type3 opening screen

const Exc1x4x1 = ({ route }) => {
    
    
    
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
    const [instructions, setInstructions] = useState('some instructions');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');
    
    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);


    useFocusEffect(() => {

        if (route.params) {
          const {userPoints, latestScreen, comeBackRoute, latestAnswered, nextScreen, savedLang} = route.params;

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


        setWords(tempArr[0].wordsWithGaps)
        setCorrectAnswers(tempArr[0].correctAnswers);
        setNumberGaps(tempArr[0].gapsIndex.length);
        setIsCorrect(Array(tempArr[0].correctAnswers.length).fill(0));
        setIsCorrectNewArr(Array(tempArr[0].correctAnswers.length).fill(0));
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
              answersChecked[ind] ? newArr[ind] = 1 : newArr[ind] = 2
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
        var arr = [...words];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWords(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };

    
    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

      {contentReady ? <View style={styles.body}>

        <View style={styles.topView}>
            <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
        </View>

        <View style={styles.squaresViewContainer}>


            {words.map((item, index) => {
                
                if (exeList[0].textIndex.includes(index) && !exeList[0].lineBreaker.includes(index)) {
                    return (
                        <View style={styles.exgzampleTextContainer} key={index}>
                            <Text style={styles.exgzampleText}>{item}</Text>
                        </View>
                    )
                } else if (exeList[0].lineBreaker.includes(index)) {
                  return (
                      <View style={styles.lineBreaker} key={index}>
                          
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
        </View>  : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAnswerGapsText'}
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

export default Exc1x4x1


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
    height: 200,
    flexWrap: 'wrap'
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
    marginHorizontal: 2
    
  },
  spacer: {
    borderBottomColor: 'purple',
    borderBottomWidth: 0.5,
    height: 20,
    width: '100%',
  },
  lineBreaker: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    height: 0,
    width: '100%'
  },
})

