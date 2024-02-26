import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonSmall from '../../../../../components/buttons/AnswerButtonSmall';
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


const typesInSet = [aatest, aatest, type2prep, type1prep, type6prep, type7prep, type8prep];
const linkList = ['Exc1x6x1', 'Type5', 'Type2', 'Type1', 'Type6', 'Type7', 'Type8'];
let usedItems = [];

const currentScreen = 1;
const allScreensNum = linkList.length;

const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];


//Type5 opening screen

const Exc1x6x1 = ({route}) => {

    
    const [isAnswer1Checked, setIsAnswer1Checked] = useState(false);
    const [isAnswer2Checked, setIsAnswer2Checked] = useState(false);
    const [isAnswer3Checked, setIsAnswer3Checked] = useState(false);
    const [isAnswer4Checked, setIsAnswer4Checked] = useState(false);
    const [isAnswer5Checked, setIsAnswer5Checked] = useState(false);
    const [isAnswer6Checked, setIsAnswer6Checked] = useState(false);
    const [isAnswer7Checked, setIsAnswer7Checked] = useState(false);
    const [isAnswer8Checked, setIsAnswer8Checked] = useState(false);
    const [isAnswer9Checked, setIsAnswer9Checked] = useState(false);
    const [isAnswer10Checked, setIsAnswer10Checked] = useState(false);
    const [isAnswer11Checked, setIsAnswer11Checked] = useState(false);
    const [isAnswer12Checked, setIsAnswer12Checked] = useState(false);
    const [isAnswer13Checked, setIsAnswer13Checked] = useState(false);
    const [isAnswer14Checked, setIsAnswer14Checked] = useState(false);
    const [isAnswer15Checked, setIsAnswer15Checked] = useState(false);
    const [isAnswer16Checked, setIsAnswer16Checked] = useState(false);
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [instructions, setInstructions] = useState('Choose the correct answer from the options provided.');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');


    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);

    const a1background = useRef(new Animated.Value(0)).current;
    const a2background = useRef(new Animated.Value(0)).current;
    const a3background = useRef(new Animated.Value(0)).current;
    const a4background = useRef(new Animated.Value(0)).current;

    const backgroundArray = [a1background, a2background, a3background, a4background];

    const allUserAnswers = [
        [isAnswer1Checked, isAnswer2Checked, isAnswer3Checked, isAnswer4Checked],
        [isAnswer5Checked, isAnswer6Checked, isAnswer7Checked, isAnswer8Checked],
        [isAnswer9Checked, isAnswer10Checked, isAnswer11Checked, isAnswer12Checked],
        [isAnswer13Checked, isAnswer14Checked, isAnswer15Checked, isAnswer16Checked],
    ]

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

        setResetCheck(!resetCheck)
        for (let i = 0; i < answersChecked.length; i++) {
            Animated.timing(backgroundArray[i], {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }

    useEffect(() => {
        resetAnimation();
    }, [isAnswer1Checked, isAnswer2Checked, isAnswer3Checked, isAnswer4Checked,
        isAnswer5Checked, isAnswer6Checked, isAnswer7Checked, isAnswer8Checked,
        isAnswer9Checked, isAnswer10Checked, isAnswer11Checked, isAnswer12Checked,
        isAnswer13Checked, isAnswer14Checked, isAnswer15Checked, isAnswer16Checked])

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
            setInstructions('Wybierz odpowiednią odpowiedź spośród podanych opcji.')
          } else if (savedLang === 'DE') {
            setInstructions('Wähle die richtige Antwort aus den angegebenen Optionen.')
          } else if (savedLang === 'LT') {
            setInstructions('Pasirinkite teisingą atsakymą iš pateiktų variantų.')
          } else if (savedLang === 'AR') {
            setInstructions('اختر الإجابة الصحيحة من الخيارات المقدمة')
          } else if (savedLang === 'UA') {
            setInstructions('Виберіть правильну відповідь з наданих варіантів.')
          } else if (savedLang === 'ES') {
            setInstructions('Elige la respuesta correcta de las opciones proporcionadas.')
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


        setCorrectAnswers(tempArr[0].correctAnswers);
        setContentReady(true);
    
        
        for (let i = 0;  i < typesInSet.length; i++) {
          typesInSet[i].push(usedItems[i]);
        }

        usedItems = []
    
    
    
      }, [])
      

    useEffect(() => {

        if (answersChecked.length !== 0) {
          setLatestScreenAnswered(currentScreen);
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
      
    
    }, [answersChecked])

    
  return (
    <View style={styles.mainContainer}>

        {contentReady ? <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.middleView}>

              {exeList[0].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
                  <Text style={styles.questionTextMiddle}>{exeList[0].questions[0]}</Text>

                  <View style={styles.buttonsContainer}>
                    {exeList[0].allAnswers[0] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[0]} returnAnswer={(boolean) => setIsAnswer1Checked(boolean)}/>}
                    {exeList[0].allAnswers[1] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[1]} returnAnswer={(boolean) => setIsAnswer2Checked(boolean)}/>}
                    {exeList[0].allAnswers[2] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[2]} returnAnswer={(boolean) => setIsAnswer3Checked(boolean)}/>}
                    {exeList[0].allAnswers[3] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[3]} returnAnswer={(boolean) => setIsAnswer4Checked(boolean)}/>}
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[0].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}}>
                  <Text style={styles.questionTextMiddle}>{exeList[0].questions[1]}</Text>

                  <View style={styles.buttonsContainer}>
                    {exeList[0].allAnswers[4] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[4]} returnAnswer={(boolean) => setIsAnswer5Checked(boolean)}/>}
                    {exeList[0].allAnswers[5] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[5]} returnAnswer={(boolean) => setIsAnswer6Checked(boolean)}/>}
                    {exeList[0].allAnswers[6] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[6]} returnAnswer={(boolean) => setIsAnswer7Checked(boolean)}/>}
                    {exeList[0].allAnswers[7] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[7]} returnAnswer={(boolean) => setIsAnswer8Checked(boolean)}/>}
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[0].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}}>
                  <Text style={styles.questionTextMiddle}>{exeList[0].questions[2]}</Text>

                  <View style={styles.buttonsContainer}>
                    {exeList[0].allAnswers[8] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[8]} returnAnswer={(boolean) => setIsAnswer9Checked(boolean)}/>}
                    {exeList[0].allAnswers[9] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[9]} returnAnswer={(boolean) => setIsAnswer10Checked(boolean)}/>}
                    {exeList[0].allAnswers[10] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[10]} returnAnswer={(boolean) => setIsAnswer11Checked(boolean)}/>}
                    {exeList[0].allAnswers[11] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[11]} returnAnswer={(boolean) => setIsAnswer12Checked(boolean)}/>}
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[0].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}}>
                  <Text style={styles.questionTextMiddle}>{exeList[0].questions[3]}</Text>

                  <View style={styles.buttonsContainer}>
                    {exeList[0].allAnswers[12] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[12]} returnAnswer={(boolean) => setIsAnswer13Checked(boolean)}/>}
                    {exeList[0].allAnswers[13] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[13]} returnAnswer={(boolean) => setIsAnswer14Checked(boolean)}/>}
                    {exeList[0].allAnswers[14] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[14]} returnAnswer={(boolean) => setIsAnswer15Checked(boolean)}/>}
                    {exeList[0].allAnswers[15] === '' ? <View></View> : <AnswerButtonSmall text={exeList[0].allAnswers[15]} returnAnswer={(boolean) => setIsAnswer16Checked(boolean)}/>}
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

            </View>
          
        </ScrollView> : <View style={styles.loaderDisplay}>
            <Loader />
        </View> }
        


        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'checkAnswersManyQ'} 
        userAnswers={allUserAnswers}
        correctAnswers={correctAnswers}
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

export default Exc1x6x1

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
  middleView: {
    marginHorizontal: 20
  },
  questionContainer: {
    marginBottom: 15,
    borderRadius: 10,
    paddingHorizontal: 10, 
    paddingTop: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.5,
    elevation: 5
  },
  questionTextMiddle: {
    fontSize: 16
  },
  buttonsContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
    flexDirection: 'row'
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