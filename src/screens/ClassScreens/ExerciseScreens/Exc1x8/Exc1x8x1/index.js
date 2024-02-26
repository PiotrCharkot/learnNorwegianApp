import { View, Text, StyleSheet, Animated, Dimensions, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonRev from '../../../../../components/buttons/AnswerButtonRevers';
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


const typesInSet = [aatest, aatest, type2prep, type1prep, type5prep, type6prep, type8prep];
const linkList = ['Exc1x8x1', 'Type7', 'Type2', 'Type1', 'Type5', 'Type6', 'Type8'];
let usedItems = [];


const currentScreen = 1;
const allScreensNum = linkList.length;


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
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    height: 0,
    width: '100%',
    marginBottom: 10
  },

})