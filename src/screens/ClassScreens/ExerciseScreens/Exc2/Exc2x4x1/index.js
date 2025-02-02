import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type3data from '../../../../../listData/dataExercise/A2/Noun/Type3'
import type4data from '../../../../../listData/dataExercise/A2/Noun/Type4'
import type5data from '../../../../../listData/dataExercise/A2/Noun/Type5'
import type6data from '../../../../../listData/dataExercise/A2/Noun/Type6'



const dataForMarkers = {
    part: 'exercise',
    section: 'section2',
    class: 'class3'
}


let option1 = [type3data, type4data, type5data, type6data, type3data];
let option2 = [type3data, type6data, type4data, type5data, type3data];

const links1 = ['Exc2x4x1', 'Type4', 'Type5', 'Type6', 'Type3'];
const links2 = ['Exc2x4x1', 'Type6', 'Type4', 'Type5', 'Type3'];


let typesInSet = [];
let linkList = [];
let usedItems = [];

const currentScreen = 1;
let allScreensNum = option1.length;

const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;







//Type3 opening screen

const Exc2x4x1 = ({ route }) => {
    
    
    
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
    const [instructions, setInstructions] = useState('Drag and drop the words into the correct gaps.');
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
            setInstructions('Przeciągnij i upuść słowa we właściwe luki.')
          } else if (savedLang === 'DE') {
            setInstructions('Ziehe die Wörter in die richtigen Lücken.')
          } else if (savedLang === 'LT') {
            setInstructions('Tempkite žodžius į teisingas vietas.')
          } else if (savedLang === 'AR') {
            setInstructions('اسحب وأفلت الكلمات في الفراغات الصحيحة')
          } else if (savedLang === 'UA') {
            setInstructions('Перетягніть слова в правильні пропуски.')
          } else if (savedLang === 'ES') {
            setInstructions('Arrastra y suelta las palabras en los huecos correctos.')
          }
          
          setLanguage(savedLang)
        }
      
        
    })


    useEffect(() => {

      let parsedData = Object.keys(route.params.data).length === 0 ? {} : JSON.parse(route.params.data) 
      let type3dataNew = Object.keys(route.params.data).length === 0 ? type3data : parsedData.noun.type3
      let type4dataNew = Object.keys(route.params.data).length === 0 ? type4data : parsedData.noun.type4
      let type5dataNew = Object.keys(route.params.data).length === 0 ? type5data : parsedData.noun.type5
      let type6dataNew = Object.keys(route.params.data).length === 0 ? type6data : parsedData.noun.type6

      option1 = [type3dataNew, type4dataNew, type5dataNew, type6dataNew, type3dataNew];
      option2 = [type3dataNew, type6dataNew, type4dataNew, type5dataNew, type3dataNew];

      let tempArr = []; 
      let sumOfAllPoints = 0;

      let randomNumber = Math.floor(Math.random()* 2);
      console.log('set of exrecises nummer: ', randomNumber);



      if (randomNumber === 0) {
        typesInSet = option1;
        linkList = links1;
        allScreensNum = option1.length;
      } else if (randomNumber === 1) {
        typesInSet = option2
        linkList = links2;
        allScreensNum = option2.length;
      }
  
  
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
          
          sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].nuberOfQuestions * generalStyles.bonusCheckAllAnswersInput
  
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
                            
                            <Text style={styles.textInDraggable} allowFontScaling={false}>{item}</Text>
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

export default Exc2x4x1


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
    margin: 4,
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
    fontSize: 13,
    fontWeight: '500',
    flexWrap: 'wrap',
    
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 4,
    marginHorizontal: 2
    
  },
  spacer: {
    borderBottomColor: 'purple',
    borderBottomWidth: 0.5,
    height: 20,
    width: '100%',
    marginBottom: 10
  },
  lineBreaker: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    height: 0,
    width: '100%'
  },
})

