import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import Type10data from '../../../../../listData/dataExercise/Type10data';
import A1Adjectives from '../../../../../listData/dataExercise/wordsGame/A1Adjectives';
import A1Nouns from '../../../../../listData/dataExercise/wordsGame/A1Nouns';
import A1Verbs from '../../../../../listData/dataExercise/wordsGame/A1Verbs';
import B1Adjectives from '../../../../../listData/dataExercise/wordsGame/B1Adjectives';
import B1Nouns from '../../../../../listData/dataExercise/wordsGame/B1Nouns';
import B1Verbs from '../../../../../listData/dataExercise/wordsGame/B1Verbs';
import C1Adjectives from '../../../../../listData/dataExercise/wordsGame/C1Adjectives';
import C1Nouns from '../../../../../listData/dataExercise/wordsGame/C1Nouns';
import C1Verbs from '../../../../../listData/dataExercise/wordsGame/C1Verbs';





const dataForMarkers = {
    part: 'wordGame',
    section: 'x',
    class: 'x'
}


// let option1 = [type2data, type1data, type2data, type5data, type6data, type7data, type8data];
// let option2 = [type2data, type1data, type4data, type5data];
// let option3 = [type2data, type1data, type3data];

// const links1 = ['Exc1x3x1', 'Type1', 'Type2', 'Type5', 'Type6', 'Type7', 'Type8'];
// const links2 = ['Exc1x3x1', 'Type1', 'Type4', 'Type5'];
// const links3 = ['Exc1x3x1', 'Type1', 'Type3'];

// let typesInSet = [];


let linkList = ['Type10opening', 'Type10X2', 'Type10last'];


let usedItems = [];

const currentScreen = 1;
let allScreensNum = 3;


const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;
const gradientTop = generalStyles.gradientTopDraggable;
const gradientBottom = generalStyles.gradientBottomDraggable;
const gradientTop2 = generalStyles.gradientTopDraggable3;
const gradientBottom2 = generalStyles.gradientBottomDraggable3;




//Type10 opening screen

const Type10opening = ({route}) => {
    
    
    
    const [wordsLeft, setWordsLeft] = useState([]);
    const [wordsRight, setWordsRight] = useState([]);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [isCorrect, setIsCorrect] = useState([]);
    const [isCorrectNewArr, setIsCorrectNewArr] = useState([]);

    const [answersChecked, setAnswersChecked] = useState([]);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [instructions, setInstructions] = useState('Match words to their translations.');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');

    

    const [contentReady, setContentReady] = useState(false)
    const [exeList, setExeList] = useState([])


    let wordsArray = [];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements at indices i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    const joinString = (str1, str2) => {
        return str1 + str2;
    }

    useFocusEffect(() => {

        if (route.params) {
          const {userPoints, latestScreen, comeBackRoute, latestAnswered, nextScreen, savedLang, refPath} = route.params;


          if (refPath === 'A1Verbs') {
            wordsArray = A1Verbs
          } else if  (refPath === 'A1Nouns') {
            wordsArray = A1Nouns
          } else if (refPath === 'A1Adjectives') {
            wordsArray = A1Adjectives
          } else if (refPath === 'B1Verbs') {
            wordsArray = B1Verbs
          } else if  (refPath === 'B1Nouns') {
            wordsArray = B1Nouns
          } else if (refPath === 'B1Adjectives') {
            wordsArray = B1Adjectives
          } else if (refPath === 'C1Verbs') {
            wordsArray = C1Verbs
          } else if  (refPath === 'C1Nouns') {
            wordsArray = C1Nouns
          } else if (refPath === 'C1Adjectives') {
            wordsArray = C1Adjectives
          }

          if (latestScreen > currentScreen) {
              setLatestScreenDone(latestScreen);
              setLatestScreenAnswered(latestAnswered);
              setComeBack(true)
          }
  
          if (route.params.userPoints > 0) {
              console.log('setting new points', route.params.userPoints );
              setCurrentPoints(userPoints)
          }

          if (savedLang === 'PL') {
            setInstructions('Dopasuj slowa do ich tlumaczen.')
          } else if (savedLang === 'DE') {
            setInstructions('Ordne die Elemente ihren Pendants zu.')
          } else if (savedLang === 'LT') {
            setInstructions('Suderinkite elementus su jų poromis.')
          } else if (savedLang === 'AR') {
            setInstructions('طابق العناصر مع مثيلاتها')
          } else if (savedLang === 'UA') {
            setInstructions('Відповідайте елементи з їх парами.')
          } else if (savedLang === 'ES') {
            setInstructions('Empareja los elementos con sus pares.')
          }
          
          setLanguage(savedLang)
        }
        
        
    })



    useEffect(() => {




    


        let sumOfAllPoints = 60;

        let temporaryRemoved = [];
        
        
        let tempArr = [];


        let choosenWords1 = [];
        let choosenWords2 = [];
        let choosenWords3 = [];

        let tempObj1 = {
            typeOfScreen: '2',
            correctAnswers: [],
            leftSideWords: [],
            rightSideWords: []
        }

        let tempObj2 = {
            typeOfScreen: '2',
            correctAnswers: [],
            leftSideWords: [],
            rightSideWords: []
        }

        let tempObj3 = {
            typeOfScreen: '2',
            correctAnswers: [],
            leftSideWords: [],
            rightSideWords: []
        }


        for (let i = 0; i < 5; i++) {

          let random1 = Math.floor(Math.random() * wordsArray.length);
          choosenWords1.push(wordsArray[random1]);
          temporaryRemoved.push(wordsArray[random1]);
          wordsArray.splice(random1, 1);


            
          let random2 = Math.floor(Math.random() * wordsArray.length);
          choosenWords2.push(wordsArray[random2]);
          temporaryRemoved.push(wordsArray[random2]);
          wordsArray.splice(random2, 1);
            
            
            
          let random3 = Math.floor(Math.random() * wordsArray.length);
          choosenWords3.push(wordsArray[random3]);
          temporaryRemoved.push(wordsArray[random3]);
          wordsArray.splice(random3, 1);




            

        }



        const setupWords = (words, object) => {

            for (let i = 0; i < choosenWords1.length; i++) {

                let tempTranslation = ''
    
    
                if (route.params.savedLang === 'PL') {
                    tempTranslation = words[i].pl
                } else if (route.params.savedLang === 'DE') {
                    tempTranslation = words[i].ger
                } else if (route.params.savedLang === 'LT') {
                    tempTranslation = words[i].lt
                } else if (route.params.savedLang === 'AR') {
                    tempTranslation = words[i].ar
                } else if (route.params.savedLang === 'UA') {
                    tempTranslation = words[i].ua
                } else if (route.params.savedLang === 'ES') {
                    tempTranslation = words[i].sp
                } else if (route.params.savedLang === 'EN') {
                    tempTranslation = words[i].eng
                }
    
    
    
                object.correctAnswers.push(joinString(words[i].nor, tempTranslation));
    
                object.leftSideWords.push(words[i].nor);
    
                object.rightSideWords.push(tempTranslation);
    
    
            }
            
            
            
            shuffleArray(object.rightSideWords)
        }






      


        setupWords(choosenWords1, tempObj1);
        setupWords(choosenWords2, tempObj2);
        setupWords(choosenWords3, tempObj3);

        




        tempArr.push(tempObj1);
        tempArr.push(tempObj2);
        tempArr.push(tempObj3);


        tempArr.push(sumOfAllPoints);
        tempArr.push(dataForMarkers);




        setExeList(tempArr);


   


      setWordsLeft(tempArr[0].leftSideWords);

      
      
      if (Array.isArray(tempArr[0].correctAnswers)) {

        console.log('The variable is an array.');

        setWordsRight(tempArr[0].rightSideWords);
        setCorrectAnswers(tempArr[0].correctAnswers);

      } else if (typeof tempArr[0].correctAnswers === 'object' && tempArr[0].correctAnswers !== null) {

        console.log('The variable is an object.');

        if (route.params.savedLang === 'PL') {
          setWordsRight(tempArr[0].rightSideWords.pl)
          setCorrectAnswers(tempArr[0].correctAnswers.pl)
        } else if (route.params.savedLang === 'DE') {
          setWordsRight(tempArr[0].rightSideWords.ger)
          setCorrectAnswers(tempArr[0].correctAnswers.ger)
        } else if (route.params.savedLang === 'LT') {
          setWordsRight(tempArr[0].rightSideWords.lt)
          setCorrectAnswers(tempArr[0].correctAnswers.lt)
        } else if (route.params.savedLang === 'AR') {
          setWordsRight(tempArr[0].rightSideWords.ar)
          setCorrectAnswers(tempArr[0].correctAnswers.ar)
        } else if (route.params.savedLang === 'UA') {
          setWordsRight(tempArr[0].rightSideWords.ua)
          setCorrectAnswers(tempArr[0].correctAnswers.ua)
        } else if (route.params.savedLang === 'ES') {
          setWordsRight(tempArr[0].rightSideWords.sp)
          setCorrectAnswers(tempArr[0].correctAnswers.sp)
        } else if (route.params.savedLang === 'EN') {
          setWordsRight(tempArr[0].rightSideWords.eng)
          setCorrectAnswers(tempArr[0].correctAnswers.eng)
        }
      }




      

      setIsCorrect(Array(tempArr[0].leftSideWords.length).fill(0));
      setIsCorrectNewArr(Array(tempArr[0].leftSideWords.length).fill(0));
      setContentReady(true);


      

      for (let i = 0; i < temporaryRemoved.length; i++) {
        wordsArray.push(temporaryRemoved[i]);
      };

      temporaryRemoved = [];
      
  
      
   
      usedItems = []
  
  
    }, [])



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
        var arr = [...wordsLeft];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWordsLeft(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };
    const swapRight = (index1, index2) => {
        var arr = [...wordsRight];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWordsRight(arr);
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

        <View style={styles.swapableContainer}>

            <View style={styles.leftContainer}>
                {wordsLeft.map((item, index) => {
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
                            colors={ isCorrect[index] === 0 ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                            key={index}
                                style={[
                                isMovedOver && styles.draggableContainerSwap,
                                styles.draggableContainer,
                                ]}
                            >
                                
                                <Text style={styles.textInDraggable}>{item}</Text>
                            </LinearGradient>
                            );
                        }}
                        />
                    );
                    
                })}
            </View>

            <View style={styles.rightContainer}>
                {wordsRight.map((item, index) => {
                    return (
                        <Draggable
                        key={index}
                        index={index}
                        movingDraggable={movingDraggable}
                        onMovingDraggable={onMovingDraggable}
                        releaseDraggable={releaseDraggable}
                        onReleaseDraggable={onReleaseDraggable}
                        swap={swapRight}
                        renderChild={(isMovedOver) => {
                            return (

                            <LinearGradient
                            colors={isCorrect[index] === 0 ? [gradientTop2, gradientBottom2] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                            key={index}
                                style={[
                                isMovedOver && styles.draggableContainerSwap,
                                styles.draggableContainer,
                                ]}
                            >
                                
                                <Text style={styles.textInDraggable}>{item}</Text>
                            </LinearGradient>
                            );
                        }}
                        />
                    );
                    
                })}
            </View>

        </View>

        </View> : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'matchLR'} 
        userAnswers={wordsLeft}
        userAnswers2={wordsRight}
        correctAnswers={correctAnswers}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        isFirstScreen={true}
        linkNext={linkList[currentScreen]}
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

export default Type10opening

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
  swapableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  leftContainer: {
    width: '50%',
    borderRightWidth: 0.5,
    borderRightColor: 'lightgrey',
    paddingHorizontal: 10
},
rightContainer: {
    width: '50%',
    paddingHorizontal: 10
    
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
    fontSize: 18,
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
  draggableContainer: {
    height: 32,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'lightgreen',
    
  },
  draggableContainerSwap: {
    height: 32,
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
    color: 'white',
    
  },

})