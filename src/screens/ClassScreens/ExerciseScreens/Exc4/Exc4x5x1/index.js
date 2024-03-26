import {View, Text, StyleSheet, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type1data from '../../../../../listData/dataExercise/B2/All/Type1';
import type2data from '../../../../../listData/dataExercise/B2/All/Type2';
import type3data from '../../../../../listData/dataExercise/B2/All/Type3';
import type4data from '../../../../../listData/dataExercise/B2/All/Type4';
import type5data from '../../../../../listData/dataExercise/B2/All/Type5';
import type6data from '../../../../../listData/dataExercise/B2/All/Type6';
import type7data from '../../../../../listData/dataExercise/B2/All/Type7';
import type8data from '../../../../../listData/dataExercise/B2/All/Type8';



const dataForMarkers = {
    part: 'exercise',
    section: 'section4',
    class: 'class4'
}
  


let option1 = [type8data, type1data, type2data, type6data, type5data, type7data];
let option2 = [type8data, type3data, type4data, type5data, type1data];
let option3 = [type8data, type7data, type3data, type5data, type2data];

const links1 = ['Exc4x5x1', 'Type1', 'Type2', 'Type6', 'Type5', 'Type7'];
const links2 = ['Exc4x5x1', 'Type3', 'Type4', 'Type5', 'Type1'];
const links3 = ['Exc4x5x1', 'Type7', 'Type3', 'Type5', 'Type2'];



let typesInSet = [];
let linkList = [];

let usedItems = [];


const currentScreen = 1;
let allScreensNum = option1.length;

const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;



//Type8 opening screen

const Exc4x5x1 = ({ route }) => {

    
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
    const [instructions, setInstructions] = useState('Sort the words to form a correct sentence.');
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
            setInstructions('Uporządkuj słowa, aby utworzyć poprawne zdanie.')
          } else if (savedLang === 'DE') {
            setInstructions('Sortiere die Wörter, um einen korrekten Satz zu bilden.')
          } else if (savedLang === 'LT') {
            setInstructions('Sudėliokite žodžius į teisingą sakinį.')
          } else if (savedLang === 'AR') {
            setInstructions('رتب الكلمات لتكوين جملة صحيحة')
          } else if (savedLang === 'UA') {
            setInstructions('Впорядкуйте слова, щоб сформувати правильне речення.')
          } else if (savedLang === 'ES') {
            setInstructions('Ordena las palabras para formar una oración correcta.')
          }
          
          setLanguage(savedLang)

        }
        
    })



    useEffect(() => {


      
      let parsedData = Object.keys(route.params.data).length === 0 ? {} : JSON.parse(route.params.data);
      let type1dataNew = Object.keys(route.params.data).length === 0 ? type1data : parsedData.all.type1;
      let type2dataNew = Object.keys(route.params.data).length === 0 ? type2data : parsedData.all.type2;
      let type3dataNew = Object.keys(route.params.data).length === 0 ? type3data : parsedData.all.type3;
      let type4dataNew = Object.keys(route.params.data).length === 0 ? type4data : parsedData.all.type4;
      let type5dataNew = Object.keys(route.params.data).length === 0 ? type5data : parsedData.all.type5;
      let type6dataNew = Object.keys(route.params.data).length === 0 ? type6data : parsedData.all.type6;
      let type7dataNew = Object.keys(route.params.data).length === 0 ? type7data : parsedData.all.type7;
      let type8dataNew = Object.keys(route.params.data).length === 0 ? type8data : parsedData.all.type8;

      option1 = [type8dataNew, type1dataNew, type2dataNew, type6dataNew, type5dataNew, type7dataNew];
      option2 = [type8dataNew, type3dataNew, type4dataNew, type5dataNew, type1dataNew];
      option3 = [type8dataNew, type7dataNew, type3dataNew, type5dataNew, type2dataNew];


      let tempArr = []; 
      let sumOfAllPoints = 0;


      let randomNumber = Math.floor(Math.random()* 3);
      console.log('in opennig type8 set of exrecises nummer: ', randomNumber);


      if (randomNumber === 0) {
        typesInSet = option1;
        linkList = links1;
        allScreensNum = option1.length;
      } else if (randomNumber === 1) {
        typesInSet = option2
        linkList = links2;
        allScreensNum = option2.length;
      } else if (randomNumber === 2) {
        typesInSet = option3
        linkList = links3;
        allScreensNum = option3.length;
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


      setWords(tempArr[0].words1);
      setWords1(tempArr[0].words2);
      setWords2(tempArr[0].words3);
      setWords3(tempArr[0].words4);
      setCorrectAnswers(tempArr[0].wordsCorrect);
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

export default Exc4x5x1


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
