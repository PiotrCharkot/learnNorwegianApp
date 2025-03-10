import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import AnswerPairType4 from '../../../../../components/other/AnswerPairType4';
import AnswerPairType6 from '../../../../../components/other/AnswerPairType6';




const colorUnderline = generalStyles.colorHighlightChoiceOption;
const colorChosenAns = generalStyles.colorHighlightChoosenAnswer;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const screenWidth = Dimensions.get('window').width;

const exitLink = 'ExitExcScreen'

const Type1 = ({route}) => {
  

  const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params  


  const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
  const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);

  const [currentPoints, setCurrentPoints] = useState(0);
  const [comeBack, setComeBack] = useState(false);
  const [answersChecked, setAnswersChecked] = useState([]);
  const [resetCheck, setResetCheck] = useState(false);
  const [instructions, setInstructions] = useState('Choose the correct word to complete the sentence.');
  const [newInstructions, setNewInstructions] = useState('');
  const [hideShowText, setHideShowText] = useState('Show answers');
  const [hideTxt, setHideTxt] = useState('Hide answers')
  const [dataForAnswer, setDataForAnswers] = useState([]);
  const [answersShown, setAnswersShown] = useState(false);
  
  const answerPosition = useRef(new Animated.Value(220)).current;
  

  

  const a1background = useRef(new Animated.Value(0)).current;
  const a2background = useRef(new Animated.Value(0)).current;
  const a3background = useRef(new Animated.Value(0)).current;
  const a4background = useRef(new Animated.Value(0)).current;
  const a5background = useRef(new Animated.Value(0)).current;

  const [A1, setA1] = useState(null);
  const [A2, setA2] = useState(null);
  const [A3, setA3] = useState(null);
  const [A4, setA4] = useState(null);
  const [A5, setA5] = useState(null);


  const backgroundArray = [a1background, a2background, a3background, a4background, a5background]


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

  const backgroundA5 = a5background.interpolate({
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
    
   
    
  useFocusEffect(() => {
    if (latestScreen > nextScreen) {
      setLatestScreenDone(latestScreen);
      setLatestScreenAnswered(latestAnswered);
      setComeBack(true)
    }

    if (route.params.userPoints > 0) {
      console.log('setting new points type1', route.params.userPoints );
      console.log('answers: ', exeList[nextScreen - 1].correctAnswers);
      setCurrentPoints(userPoints)
    }

    if (exeList[nextScreen - 1].instructions) {
      if (savedLang === 'PL') {
          setNewInstructions(exeList[nextScreen - 1].instructions.pl)
          setHideShowText('Pokaż odpowiedzi')
          setHideTxt('Ukryj odpowiedzi')
        } else if (savedLang === 'DE') {
          setNewInstructions(exeList[nextScreen - 1].instructions.ger)
          setHideShowText('Antworten anzeigen')
          setHideTxt('Antworten verbergen')
        } else if (savedLang === 'LT') {
          setNewInstructions(exeList[nextScreen - 1].instructions.lt)
          setHideShowText('Rodyti atsakymus')
          setHideTxt('Slėpti atsakymus')
        } else if (savedLang === 'AR') {
          setNewInstructions(exeList[nextScreen - 1].instructions.ar)
          setHideShowText('عرض الإجابات')
          setHideTxt('اخفِ الإجابات')
        } else if (savedLang === 'UA') {
          setNewInstructions(exeList[nextScreen - 1].instructions.ua)
          setHideShowText('Показати відповіді')
          setHideTxt('Сховати відповіді')
        } else if (savedLang === 'ES') {
          setNewInstructions(exeList[nextScreen - 1].instructions.sp)
          setHideShowText('Mostrar respuestas')
          setHideTxt('Ocultar respuestas')
        } else if (savedLang === 'EN') {
          setNewInstructions(exeList[nextScreen - 1].instructions.eng)
      }
    } else {
      if (savedLang === 'PL') {
          setInstructions('Wybierz właściwe słowo, aby uzupełnić zdanie.')
          setHideShowText('Pokaż odpowiedzi')
          setHideTxt('Ukryj odpowiedzi')
        } else if (savedLang === 'DE') {
          setInstructions('Wähle das richtige Wort, um den Satz zu vervollständigen.')
          setHideShowText('Antworten anzeigen')
          setHideTxt('Antworten verbergen')
        } else if (savedLang === 'LT') {
          setInstructions('Pasirinkite teisingą žodį, kad užbaigtumėte sakinį.')
          setHideShowText('Rodyti atsakymus')
          setHideTxt('Slėpti atsakymus')
        } else if (savedLang === 'AR') {
          setInstructions('اختر الكلمة الصحيحة لإكمال الجملة')
          setHideShowText('عرض الإجابات')
          setHideTxt('اخفِ الإجابات')
        } else if (savedLang === 'UA') {
          setInstructions('Виберіть правильне слово, щоб завершити речення.')
          setHideShowText('Показати відповіді')
          setHideTxt('Сховати відповіді')
        } else if (savedLang === 'ES') {
          setInstructions('Elige la palabra correcta para completar la oración.')
          setHideShowText('Mostrar respuestas')
          setHideTxt('Ocultar respuestas')
      }
    }
    
  })



    useEffect(() => {
            let tempArr = [];
  
  
            if (exeList[nextScreen - 1].correctAnswersList) {
  
              for (let i = 0; i < exeList[nextScreen - 1].correctAnswersList.length; i++) {
                
    
    
                if (exeList[nextScreen - 1].translationsLinks) {
                  if (savedLang === 'PL') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.pl[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'DE') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ger[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'LT') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.lt[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'AR') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ar[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'UA') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ua[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'ES') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.sp[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                    } else if (savedLang === 'EN') {
                      tempArr[i] = {
                          translationData: exeList[nextScreen - 1].translationsCorrectAnswers.eng[i],
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          links: exeList[nextScreen - 1].translationsLinks[i],
                          key: i
                      }
                  }
                } else if (exeList[nextScreen - 1].translationsCorrectAnswers && !exeList[nextScreen - 1].translationsLinks) {
                      if (savedLang === 'PL') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.pl[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'DE') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ger[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'LT') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.lt[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'AR') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ar[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'UA') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.ua[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'ES') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.sp[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                        } else if (savedLang === 'EN') {
                          tempArr[i] = {
                              translationData: exeList[nextScreen - 1].translationsCorrectAnswers.eng[i],
                              answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                              key: i
                          }
                      }
                  } else {
                      tempArr[i] = {
                          answerData: [exeList[nextScreen - 1].correctAnswersList[i]],
                          key: i
                      }
                  }
              }
      
      
              console.log('my flat list data', tempArr);
              setDataForAnswers(tempArr);
  
            }
    
            
    
    
        }, [])




  useEffect(() => {

    

    if (answersChecked.length !== 0) {
        setLatestScreenAnswered(nextScreen);
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



        
        
                
        if (exeList[nextScreen - 1].translationsCorrectAnswers) {
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
    if (exeList[nextScreen - 1].translationsLinks) {

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

        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.topView}>
            <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
          </View>

          <View style={styles.middleView}>


            {exeList[nextScreen - 1].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}} >
                <Text style={styles.text}>
                {exeList[nextScreen - 1].questions[0][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA1(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[0][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA1(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[0][2]}</Text>
                        </TouchableOpacity>{exeList[nextScreen - 1].questions[0][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            

            {exeList[nextScreen - 1].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
                <Text style={styles.text}>
                {exeList[nextScreen - 1].questions[1][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA2(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[1][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA2(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[1][2]}</Text>
                        </TouchableOpacity>{exeList[nextScreen - 1].questions[1][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            
            

            {exeList[nextScreen - 1].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
                <Text style={styles.text}>
                {exeList[nextScreen - 1].questions[2][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA3(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[2][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA3(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[2][2]}</Text>
                        </TouchableOpacity>{exeList[nextScreen - 1].questions[2][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            



            {exeList[nextScreen - 1].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
                <Text style={styles.text}>
                {exeList[nextScreen - 1].questions[3][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA4(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[3][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA4(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[3][2]}</Text>
                        </TouchableOpacity>{exeList[nextScreen - 1].questions[3][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            


            {exeList[nextScreen - 1].nuberOfQuestions > 4 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA5}} >
                <Text style={styles.text}>
                {exeList[nextScreen - 1].questions[4][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA5(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[4][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA5(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[nextScreen - 1].questions[4][2]}</Text>
                        </TouchableOpacity>{exeList[nextScreen - 1].questions[4][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            
            
           

           
          </View>
        </ScrollView>


        
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
          <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAllAnswers'}
        correctAnswers={exeList[nextScreen - 1].correctAnswers}
        userAnswers={[A1, A2, A3, A4, A5]}
        linkNext={allScreensNum === nextScreen ? exitLink : linkList[nextScreen]} 
        linkPrevious={linkList[nextScreen - 2]}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
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

export default Type1

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
  middleView: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'white'
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginVertical: 10,
  },
  questionContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.5,
    elevation: 5
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    
  },
  answerOpacity: {
    justifyContent: 'flex-end',
    alignItems: 'center', 
    backgroundColor: 'lightgrey', 
    paddingHorizontal: 5,
    borderRadius: 6,
    transform: [{translateY: 3}]
    
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  loaderDisplay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
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