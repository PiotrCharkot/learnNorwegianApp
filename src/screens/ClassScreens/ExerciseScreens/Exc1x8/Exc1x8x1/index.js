import { View, Text, StyleSheet, Animated, Dimensions, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonRev from '../../../../../components/buttons/AnswerButtonRevers';
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import type1data from '../../../../../listData/exerciseData/A1/Type1Data/Prepositions'
import type2data from '../../../../../listData/exerciseData/A1/Type2Data/Prepositions'
import type3data from '../../../../../listData/exerciseData/A1/Type3Data/Prepositions'
import type4data from '../../../../../listData/exerciseData/A1/Type4Data/Prepositions'
import type5data from '../../../../../listData/exerciseData/A1/Type5Data/Prepositions'
import type6data from '../../../../../listData/exerciseData/A1/Type6Data/Prepositions'
import type7data from '../../../../../listData/exerciseData/A1/Type7Data/Prepositions'
import type8data from '../../../../../listData/exerciseData/A1/Type8Data/Prepositions'


const dataForMarkers = {
  part: 'exercise',
  section: 'section1',
  class: 'class1'
}


let option1 = [type7data, type1data, type2data, type5data, type6data, type7data, type8data];
let option2 = [type7data, type1data, type4data, type5data];
let option3 = [type7data, type1data, type3data];

const links1 = ['Exc1x8x1', 'Type1', 'Type2', 'Type5', 'Type6', 'Type7', 'Type8'];
const links2 = ['Exc1x8x1', 'Type1', 'Type4', 'Type5'];
const links3 = ['Exc1x8x1', 'Type1', 'Type3'];



let typesInSet = [];
let linkList = [];

let usedItems = [];


const currentScreen = 1;
let allScreensNum = option1.length;


const correct1 = generalStyles.gradientBottomCorrectDraggable;




//Type7 opening screen

const Exc1x8x1 = ({route}) => {


  const [answersChecked, setAnswersChecked] = useState([]);
  const [showMistakes, setShowMistakes] = useState(false);
  const [markedWords, setMarkdWords] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
  const [comeBack, setComeBack] = useState(false);
  const [resetCheck, setResetCheck] = useState(false);
  const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
  const [isCorrect, setIsCorrect] = useState([]);
  const [isCorrectNewArr, setIsCorrectNewArr] = useState([]);
  const [words, setWords] = useState([]);
  const [wordsCorrect, setWordsCorrect] = useState([]);
  const [correctAnswers, setCorrectAnswers]= useState([]);
  const [instructions, setInstructions] = useState('Find and mark the mistakes in the text.');
  const [newInstructions, setNewInstructions] = useState('');
  const [language, setLanguage] = useState('EN');
  const [btnTextShow, setButtonTextShow] = useState('Hide Mistakes')
  const [btnTextHide, setButtonTextHide] = useState('Show Mistakes')


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
        setInstructions('Znajdź i zaznacz błędy w tekście.');
        setButtonTextShow('Ukryj błędy');
        setButtonTextHide('Pokaż błędy');
      } else if (savedLang === 'DE') {
        setInstructions('Finde und markiere die Fehler im Text.');
        setButtonTextShow('Fehler verbergen');
        setButtonTextHide('Fehler anzeigen');
      } else if (savedLang === 'LT') {
        setInstructions('Raskite ir pažymėkite klaidas tekste.');
        setButtonTextShow('Slėpti klaidas');
        setButtonTextHide('Rodyti klaidas');
      } else if (savedLang === 'AR') {
        setInstructions('ابحث وعلّم الأخطاء في النص');
        setButtonTextShow('اخفِ الأخطاء');
        setButtonTextHide('عرض الأخطاء');
      } else if (savedLang === 'UA') {
        setInstructions('Знайдіть і відзначте помилки в тексті.');
        setButtonTextShow('Сховати помилки');
        setButtonTextHide('Показати помилки');
      } else if (savedLang === 'ES') {
        setInstructions('Encuentra y marca los errores en el texto.');
        setButtonTextShow('Ocultar errores');
        setButtonTextHide('Mostrar errores');
      }
      
      setLanguage(savedLang)
    }
      
  })

  useEffect(() => {

    let parsedData = Object.keys(route.params.data).length === 0 ? {} : JSON.parse(route.params.data) 
    let type7dataNew = Object.keys(route.params.data).length === 0 ? type7data : parsedData.adverbs.type7

    option1 = [type7dataNew, type1data, type2data, type5data, type6data, type7data, type8data];
    option2 = [type7dataNew, type1data, type4data, type5data];
    option3 = [type7dataNew, type1data, type3data];


    let tempArr = []; 
    let sumOfAllPoints = 0;

    let randomNumber = Math.floor(Math.random()* 3);
    console.log('in opennig type7 set of exrecises nummer: ', randomNumber);


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
        sumOfAllPoints = sumOfAllPoints + typesInSet[i][randomVal].leftSideWords.length * generalStyles.bonusMatchLR
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


    setWords(tempArr[0].words);
    setWordsCorrect(tempArr[0].wordsCorrect);
    setCorrectAnswers(tempArr[0].mistakesIndex);
    setIsCorrect(Array(tempArr[0].words.length).fill(0));
    setIsCorrectNewArr(Array(tempArr[0].words.length).fill(0));
    setContentReady(true);

    
    for (let i = 0;  i < typesInSet.length; i++) {
      typesInSet[i].push(usedItems[i]);
    }

    usedItems = []


  }, [])


  useEffect(() => {
      
    if (answersChecked.length !== 0) {

      setLatestScreenAnswered(currentScreen);
        
      setShowMistakes(true)
      for (let i = 0; i < answersChecked.length; i++) {

        const newArr = [...isCorrect];
        newArr.map((val, ind) => {
            answersChecked[ind] === 1 ? newArr[ind] = 1 : newArr[ind] = 0
        })
        
        setIsCorrect(newArr);
      }
  }
  
  }, [answersChecked])
    


  const markWord = (word) => {

    
    if (markedWords.includes(word) && !showMistakes) {
      let tempArr = [...markedWords];

      let ind = tempArr.indexOf(word);
      tempArr.splice(ind, 1);

      setMarkdWords(tempArr);
    } else if (!showMistakes) {
      let tempArr = [...markedWords];

      tempArr.push(word);
      
      setMarkdWords(tempArr);
    } else if (markedWords.includes(word) && showMistakes){
      let tempArr = [...markedWords];

      let ind = tempArr.indexOf(word);
      tempArr.splice(ind, 1);

      setMarkdWords(tempArr);
    }
    
    
  }

    
  return (
    <View style={styles.mainContainer}>

      {contentReady ? <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.topView}>
              <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
          </View>

          <View style={styles.textContainer}>
              

            {showCorrect ? wordsCorrect.map((item, index) => {

              if (item === 'linebreaker') {
                return (
                  <View style={styles.lineBreaker} key={index}>
                      
                  </View>
                )
              } else {
                return (
                    <TouchableOpacity key={index} style={{
                        ...styles.touchable,
                        backgroundColor: 'transparent'
                  }}>
                  <Text style={{
                      ...styles.wordsTxt
                    }}>{item}</Text>
                </TouchableOpacity>
                
                )
              }
                
                
            }) :  words.map((item, index) => {

              if (item === 'linebreaker') {
                return (
                  <View style={styles.lineBreaker} key={index}>
                      
                  </View>
                )
              } else {
                return (
                    <TouchableOpacity key={index} onPress={() => markWord(index)} style={{
                        ...styles.touchable,
                        backgroundColor: isCorrect[index] === 1 ? correct1 : markedWords.includes(index) ? generalStyles.colorHighlightChoosenAnswer : 'transparent'
                    }}>
                  <Text style={{
                      ...styles.wordsTxt,
                      textDecorationLine: correctAnswers.includes(index) && showMistakes ? 'underline' : null,
                      textDecorationColor: 'red'
                    }}>{item}</Text>
                </TouchableOpacity>
                
              )
              }
                
              
            })}

          </View>


          <View style={styles.btnContainer}>
          
            {showMistakes ? <AnswerButtonRev text={showCorrect ? btnTextHide : btnTextShow} colors={['#00308F', '#007FFF']}  returnAnswer={(boolean) => setShowCorrect(boolean)} savedLang={language}/> : null}
          </View>
          

            
          
        </ScrollView> : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        

        
        <View style={styles.progressBarContainer}>
            <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

        </View>

    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'markMistakes'} 
        userAnswers={markedWords}
        correctAnswers={correctAnswers}
        textLength={words.length}
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

export default Exc1x8x1

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white'
  },
  head: {},
  body: {
    height: '100%',
    width: '100%',
    marginTop: 80,
    marginBottom: 100,
  },
  progressBarContainer: {
    width: '100%',
    position: 'absolute',
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
  textContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  touchable: {
    borderRadius: 4,
    marginBottom: 4,
    paddingHorizontal: 2
  },
  wordsTxt: {
    fontSize: 15,
    fontWeight: '500'
  },
  btnContainer: {
    marginLeft: 20,
    marginTop: 50
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textBold: {
    color: 'grey'
  },
  lineBreaker: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    height: 0,
    width: '100%',
    marginBottom: 10,
    marginTop: 6
  },

})