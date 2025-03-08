import { View, Text, StyleSheet, Animated, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonSmall from '../../../../../components/buttons/AnswerButtonSmall';
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import AnswerPairType4 from '../../../../../components/other/AnswerPairType4';
import AnswerPairType6 from '../../../../../components/other/AnswerPairType6';
import type3data from '../../../../../listData/dataExercise/A2/Future/Type3'
import type4data from '../../../../../listData/dataExercise/A2/Future/Type4'
import type5data from '../../../../../listData/dataExercise/A2/Future/Type5'
import type8data from '../../../../../listData/dataExercise/A2/Future/Type8'




const dataForMarkers = {
    part: 'exercise',
    section: 'section2',
    class: 'class1'
}

let option1 = [type5data, type3data, type4data, type8data, type5data];
let option2 = [type5data, type8data, type4data, type3data, type5data];

const links1 = ['Exc2x2x1', 'Type3', 'Type4', 'Type8', 'Type5'];
const links2 = ['Exc2x2x1', 'Type8', 'Type4', 'Type3', 'Type5'];


const screenWidth = Dimensions.get('window').width;

let typesInSet = [];
let linkList = [];

let usedItems = [];

const currentScreen = 1;
let allScreensNum = option1.length;

const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];


//Type5 opening screen

const Exc2x2x1 = ({route}) => {

    
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
        
    const [hideShowText, setHideShowText] = useState('Show answers');
    const [hideTxt, setHideTxt] = useState('Hide answers');
    const [dataForAnswer, setDataForAnswers] = useState([]);
    const [answersShown, setAnswersShown] = useState(false);

    
    const answerPosition = useRef(new Animated.Value(220)).current;

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
            setHideShowText('Pokaż odpowiedzi')
            setHideTxt('Ukryj odpowiedzi')
          } else if (savedLang === 'DE') {
            setInstructions('Wähle die richtige Antwort aus den angegebenen Optionen.')
            setHideShowText('Antworten anzeigen')
            setHideTxt('Antworten verbergen')
          } else if (savedLang === 'LT') {
            setInstructions('Pasirinkite teisingą atsakymą iš pateiktų variantų.')
            setHideShowText('Rodyti atsakymus')
            setHideTxt('Slėpti atsakymus')
          } else if (savedLang === 'AR') {
            setInstructions('اختر الإجابة الصحيحة من الخيارات المقدمة')
            setHideShowText('عرض الإجابات')
            setHideTxt('اخفِ الإجابات')
          } else if (savedLang === 'UA') {
            setInstructions('Виберіть правильну відповідь з наданих варіантів.')
            setHideShowText('Показати відповіді')
            setHideTxt('Сховати відповіді')
          } else if (savedLang === 'ES') {
            setInstructions('Elige la respuesta correcta de las opciones proporcionadas.')
            setHideShowText('Mostrar respuestas')
            setHideTxt('Ocultar respuestas')
          }
          
          setLanguage(savedLang)
        }
        
    })


    useEffect(() => {


      let parsedData = Object.keys(route.params.data).length === 0 ? {} : JSON.parse(route.params.data) 
      let type3dataNew = Object.keys(route.params.data).length === 0 ? type3data : parsedData.future.type3
      let type4dataNew = Object.keys(route.params.data).length === 0 ? type4data : parsedData.future.type4
      let type5dataNew = Object.keys(route.params.data).length === 0 ? type5data : parsedData.future.type5
      let type8dataNew = Object.keys(route.params.data).length === 0 ? type8data : parsedData.future.type8

      option1 = [type5dataNew, type3dataNew, type4dataNew, type8dataNew, type5dataNew];
      option2 = [type5dataNew, type8dataNew, type4dataNew, type3dataNew, type5dataNew];

      let tempArr = []; 
      let tempArrAnswers = []; 
      let sumOfAllPoints = 0;

      let randomNumber = Math.floor(Math.random()* 2);
      console.log('in opennig future set of exrecises nummer: ', randomNumber);


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


      let answerDataArr = tempArr[0].correctAnswers;

      for (let i = 0; i < answerDataArr.length; i++) {
          


        if (tempArr[0].translationsLinks) {
          if (route.params.savedLang === 'PL') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.pl[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'DE') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.ger[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'LT') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.lt[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'AR') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.ar[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'UA') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.ua[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'ES') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.sp[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
          } else if (route.params.savedLang === 'EN') {
            tempArrAnswers[i] = {
                translationData: tempArr[0].translationsCorrectAnswers.eng[i],
                answerData: [tempArr[0].correctAnswersList[i]],
                links: tempArr[0].translationsLinks[i],
                key: i
            }
        }
        } else if (tempArr[0].translationsCorrectAnswers && !tempArr[0].translationsLinks) {
          if (route.params.savedLang === 'PL') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.pl[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'DE') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.ger[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'LT') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.lt[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'AR') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.ar[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'UA') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.ua[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'ES') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.sp[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
            } else if (route.params.savedLang === 'EN') {
              tempArrAnswers[i] = {
                  translationData: tempArr[0].translationsCorrectAnswers.eng[i],
                  answerData: [tempArr[0].correctAnswersList[i]],
                  key: i
              }
          }
        } else {
          tempArrAnswers[i] = {
              answerData: [tempArr[0].allAnswers[i]],
              key: i
          }
        }
      }



      setDataForAnswers(tempArrAnswers);




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

         if (exeList[0].translationsCorrectAnswers) {
            Animated.timing(answerPosition, {
              toValue: 150,
              duration: 500,
              useNativeDriver: false
            }).start()


            setAnswersShown(false);
  
          }
      }
      
    
    }, [answersChecked])


    const renderAnswer = (item) => {
      if (exeList[0].translationsLinks) {

        return <AnswerPairType6 dataParams={item} />
      } else {

        return <AnswerPairType4 dataParams={item} />
      }
    }
  
  
    const showHideAnswers = () => {
        if (answersShown) {
            setAnswersShown(false);
            Animated.timing(answerPosition, {
                toValue: 150,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            setAnswersShown(true);
            Animated.timing(answerPosition, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }


    
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
        
        <Animated.View style={{...styles.answerContainer, transform: [{translateY: answerPosition}]}}>
                        
          <View style={styles.answersListContainer}>
              <FlatList 
                  showsVerticalScrollIndicator={false}
                  decelerationRate={0}
                  data={dataForAnswer}
                  renderItem={renderAnswer}
                  keyExtractor={(item) => item.key}
                  scrollEventThrottle={16}
              />
          </View>

          <TouchableOpacity style={styles.hideShowBtn} onPress={showHideAnswers}>
              <Text style={styles.hideShowTxt}>{answersShown ? hideTxt : hideShowText}</Text>
          </TouchableOpacity>

        </Animated.View>

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

export default Exc2x2x1

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
  answerContainer: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: 100,
    width: screenWidth - 40
  },
  hideShowBtn: {
    position: 'absolute',
    bottom: 147,
    borderWidth: 3,
    borderColor: '#6441A5',
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 8,
    backgroundColor: '#e49dfa',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  hideShowTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  answersListContainer: {
    borderWidth: 3,
    borderColor: '#6441A5',
    padding: 10,
    backgroundColor: '#e49dfa',
    height: 150,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  }
  

})