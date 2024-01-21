import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, FlatList, Dimensions  } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';
import Loader from '../../../../../components/other/Loader';
import AnswerPairType4 from '../../../../../components/other/AnswerPairType4';
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


const screenWidth = Dimensions.get('window').width;
const typesInSet = [type4prep, type1prep, type5prep, type6prep, type7prep, type8prep];
const linkList = ['Exc1x5x1', 'Type1', 'Type5', 'Type6', 'Type7', 'Type8'];


const currentScreen = 1;
const allScreensNum = linkList.length;

const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];



//Type4 opening screen

const Exc1x5x1 = ({route}) => {

    
    const [A1, setA1] = useState('');
    const [A2, setA2] = useState('');
    const [A3, setA3] = useState('');
    const [A4, setA4] = useState('');
    const [A5, setA5] = useState('');
    const [A6, setA6] = useState('');
    const [A7, setA7] = useState('');
    const [A8, setA8] = useState('');
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(0);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);
    const [correctAnswers, setCorrectAnswers]= useState([]);
    const [instructions, setInstructions] = useState('Type the correct word.');
    const [newInstructions, setNewInstructions] = useState('');
    const [language, setLanguage] = useState('EN');

    const [translations, setTranslations] = useState([]);
    const [hideShowText, setHideShowText] = useState('Show answers');
    const [hideTxt, setHideTxt] = useState('Hide answers')
    const [dataForAnswer, setDataForAnswers] = useState([]);
    const [answersShown, setAnswersShown] = useState(false);
    
    const [contentReady, setContentReady] = useState(false);
    const [exeList, setExeList] = useState([]);

    const a1background = useRef(new Animated.Value(0)).current;
    const a2background = useRef(new Animated.Value(0)).current;
    const a3background = useRef(new Animated.Value(0)).current;
    const a4background = useRef(new Animated.Value(0)).current;
    const a5background = useRef(new Animated.Value(0)).current;
    const a6background = useRef(new Animated.Value(0)).current;
    const a7background = useRef(new Animated.Value(0)).current;
    const a8background = useRef(new Animated.Value(0)).current;
    const answerPosition = useRef(new Animated.Value(220)).current;
    

    const backgroundArray = [a1background, a2background, a3background, a4background, a5background, a6background, a7background, a8background];


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

    const backgroundA6 = a6background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA7 = a7background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA8 = a8background.interpolate({
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
        
        setLanguage(savedLang)
        console.log('show lang:', language);

        if (savedLang === 'PL') {
          setInstructions('Wpisz odpowiednie słowo.')
          setHideShowText('pokaz odpowiedzi')
          setHideTxt('ukryj odpowiedzi')
        } else if (savedLang === 'DE') {
          setInstructions('Gib das richtige Wort ein.')
          setHideShowText('pokaz odpowiedzi niem')
          setHideTxt('ukryj odpowiedzi niem')
        } else if (savedLang === 'LT') {
          setInstructions('Įvesk teisingą žodį.')
          setHideShowText('pokaz odpowiedzi')
          setHideTxt('ukryj odpowiedzi lt')
        } else if (savedLang === 'AR') {
          setInstructions('اكتب الكلمة الصحيحة')
          setHideShowText('pokaz odpowiedzi')
          setHideTxt('ukryj odpowiedzi ar')
        } else if (savedLang === 'UA') {
          setInstructions('Введіть правильне слово.')
          setHideShowText('pokaz odpowiedzi ukr')
          setHideTxt('ukryj odpowiedzi')
        } else if (savedLang === 'ES') {
          setInstructions('Escribe la palabra correcta.')
          setHideShowText('pokaz odpowiedzi spa')
          setHideTxt('ukryj odpowiedzi')
      }
        

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
  
          for (let j = 0; j < typesInSet[i][randomVal].correctAnswers.length; j++) {
              if (typesInSet[i][randomVal].wordsWithGaps[j] === '            ') {
                  newArrGaps.push(j)
              } else {
                  newArrText.push(j)
              }
          }
  
  
          typesInSet[i][randomVal].gapsIndex = newArrGaps;
          typesInSet[i][randomVal].textIndex = newArrText;
  
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
  
        
        tempArr.push(typesInSet[i][randomVal])
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
  
  
    
    }, [])


    useEffect(() => {
      
      let myFlatListArray = []; 

      if (contentReady) {
        if (exeList[0].translations) {
          if (route.params.savedLang === 'PL') {
            setTranslations(exeList[0].translations.pl)
          } else if (route.params.savedLang === 'DE') {
            setTranslations(exeList[0].translations.ger)
          } else if (route.params.savedLang === 'LT') {
            setTranslations(exeList[0].translations.lt)
          } else if (route.params.savedLang === 'AR') {
            setTranslations(exeList[0].translations.ar)
          } else if (route.params.savedLang === 'UA') {
            setTranslations(exeList[0].translations.ua)
          } else if (route.params.savedLang === 'ES') {
            setTranslations(exeList[0].translations.sp)
          } else if (route.params.savedLang === 'EN') {
            setTranslations(exeList[0].translations.eng)
          }
        }


        for (let i = 0; i < exeList[0].correctAnswers.length; i++) {
            
          if (exeList[0].translations) {
            if (language === 'PL') {
              myFlatListArray[i] = {
                    translationData: exeList[0].translations.pl[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'DE') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.ger[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'LT') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.lt[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'AR') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.ar[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'UA') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.ua[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'ES') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.sp[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
              } else if (language === 'EN') {
                myFlatListArray[i] = {
                    translationData: exeList[0].translations.eng[i],
                    answerData: exeList[0].correctAnswers[i],
                    key: i
                }
            }
          } else {
            myFlatListArray[i] = {
                  answerData: exeList[0].correctAnswers[i],
                  key: i
              }
          }
        }
  
  
        setDataForAnswers(myFlatListArray);
      }



      


    }, [contentReady])
    
      


    useEffect(() => {

      console.log('show me my link list: ', linkList);
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


        Animated.timing(answerPosition, {
          toValue: 150,
          duration: 500,
          useNativeDriver: false
        }).start()


        setAnswersShown(false);
        
      }
      
    
    }, [answersChecked])



    const renderAnswer = (item) => {
      return <AnswerPairType4 dataParams={item} />
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

            <View style={styles.bodyContainer}>


                {exeList[0].nuberOfQuestions > 0 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
                    <Text style={styles.text}>{exeList[0].questions[0][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => {setA1(text.toLowerCase().trim())}}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[0][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[0] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                

                {exeList[0].nuberOfQuestions > 1 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA2}}>
                    <Text style={styles.text}>{exeList[0].questions[1][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA2(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[1][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[1] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[0].nuberOfQuestions > 2 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA3}}>
                    <Text style={styles.text}>{exeList[0].questions[2][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA3(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[2][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[2] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[0].nuberOfQuestions > 3 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA4}}>
                    <Text style={styles.text}>{exeList[0].questions[3][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA4(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[3][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[3] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                



                {exeList[0].nuberOfQuestions > 4 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA5}}>
                    <Text style={styles.text}>{exeList[0].questions[4][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA5(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[4][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[4] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[0].nuberOfQuestions > 5 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA6}}>
                    <Text style={styles.text}>{exeList[0].questions[5][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA6(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[5][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[5] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[0].nuberOfQuestions > 6 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA7}}>
                    <Text style={styles.text}>{exeList[0].questions[6][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA7(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[6][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[6] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[0].nuberOfQuestions > 7 ? <View style={styles.shadowWrapper}>
                  <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA8}}>
                    <Text style={styles.text}>{exeList[0].questions[7][0]}</Text> 

                        <View style={styles.inputContainer}>

                            <Input 
                            inputStyle={styles.inputContainerTextStyle}
                            inputContainerStyle={styles.inputContainerStyle}
                            autoCapitalize='none'
                            onChangeText={(text) => setA8(text.toLowerCase().trim())}
                            onSelectionChange={() => resetAnimation()}
                            /> 
                        </View>
                    <Text style={styles.textRight}>{exeList[0].questions[7][1]} <Text style={styles.textTranslation}>{exeList[0].translations ? translations[7] : ''}</Text></Text>
                  </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                
                
            </View>
            <View style={{height: 200}}></View>

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
        callbackButton={'checkAllAnswers'} 
        userAnswers={[A1, A2, A3, A4, A5, A6, A7, A8]}
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

export default Exc1x5x1

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
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
  questionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
  },
  scrollStyles: {
    alignItems: 'center'
  },
  shadowWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'white',
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
  bodyContainer: {
    paddingTop: 10
  },
  text: {
    fontSize: 16,
    paddingBottom: 4,
    fontWeight: '400',
  },
  textRight: {
    fontSize: 16,
    paddingBottom: 4,
    fontWeight: '400',
    marginRight: 20
  },
  textTranslation: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic'
  },
  inputContainerTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  inputContainer: {
    width: 100,
  },
  inputContainerStyle: {
    height: 40, 
    borderBottomColor: 'transparent',
    marginBottom: -21,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textBold: {
    color: 'grey'
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