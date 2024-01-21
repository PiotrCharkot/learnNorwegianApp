import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonSmall from '../../../../../components/buttons/AnswerButtonSmall';
import generalStyles from '../../../../../styles/generalStyles';


const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const exitLink = 'ExitExcScreen'



const Type5 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params;
    
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
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    const [instructions, setInstructions] = useState('some instructions english type 4');
    const [newInstructions, setNewInstructions] = useState('');

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
        
        if (latestScreen > nextScreen) {
          setLatestScreenAnswered(latestAnswered);
          setLatestScreenDone(latestScreen);
          setComeBack(true)
        }

        if (route.params.userPoints > 0) {
          console.log('setting new points', route.params.userPoints );
          setCurrentPoints(userPoints)
        }

        if (exeList[nextScreen - 1].instructions) {
          if (savedLang === 'PL') {
              setNewInstructions(exeList[nextScreen - 1].instructions.pl)
            } else if (savedLang === 'DE') {
              setNewInstructions(exeList[nextScreen - 1].instructions.ger)
            } else if (savedLang === 'LT') {
              setNewInstructions(exeList[nextScreen - 1].instructions.lt)
            } else if (savedLang === 'AR') {
              setNewInstructions(exeList[nextScreen - 1].instructions.ar)
            } else if (savedLang === 'UA') {
              setNewInstructions(exeList[nextScreen - 1].instructions.ua)
            } else if (savedLang === 'ES') {
              setNewInstructions(exeList[nextScreen - 1].instructions.sp)
            } else if (savedLang === 'EN') {
              setNewInstructions(exeList[nextScreen - 1].instructions.eng)
          }
        } else {
          if (savedLang === 'PL') {
              setInstructions('polskie instrukcje type 5')
            } else if (savedLang === 'DE') {
              setInstructions('niemieckie instrukcje type 5')
            } else if (savedLang === 'LT') {
              setInstructions('litewskie instrukcje type 5')
            } else if (savedLang === 'AR') {
              setInstructions('arabskie instrukcje type 5')
            } else if (savedLang === 'UA') {
              setInstructions('ukr instrukcje type 5')
            } else if (savedLang === 'ES') {
              setInstructions('esp instrukcje type 5')
          }
        }
    })

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
      }
      
    
    }, [answersChecked])

    
  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.middleView}>

              {exeList[nextScreen - 1].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
                  <Text style={styles.questionTextMiddle}>{exeList[nextScreen - 1].questions[0]}</Text>

                  <View style={styles.buttonsContainer}>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[0]} returnAnswer={(boolean) => setIsAnswer1Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[1]} returnAnswer={(boolean) => setIsAnswer2Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[2]} returnAnswer={(boolean) => setIsAnswer3Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[3]} returnAnswer={(boolean) => setIsAnswer4Checked(boolean)}/>
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[nextScreen - 1].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}}>
                  <Text style={styles.questionTextMiddle}>{exeList[nextScreen - 1].questions[1]}</Text>

                  <View style={styles.buttonsContainer}>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[4]} returnAnswer={(boolean) => setIsAnswer5Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[5]} returnAnswer={(boolean) => setIsAnswer6Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[6]} returnAnswer={(boolean) => setIsAnswer7Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[7]} returnAnswer={(boolean) => setIsAnswer8Checked(boolean)}/>
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[nextScreen - 1].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}}>
                  <Text style={styles.questionTextMiddle}>{exeList[nextScreen - 1].questions[2]}</Text>

                  <View style={styles.buttonsContainer}>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[8]} returnAnswer={(boolean) => setIsAnswer9Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[9]} returnAnswer={(boolean) => setIsAnswer10Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[10]} returnAnswer={(boolean) => setIsAnswer11Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[11]} returnAnswer={(boolean) => setIsAnswer12Checked(boolean)}/>
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

              {exeList[nextScreen - 1].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}}>
                  <Text style={styles.questionTextMiddle}>{exeList[nextScreen - 1].questions[3]}</Text>

                  <View style={styles.buttonsContainer}>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[12]} returnAnswer={(boolean) => setIsAnswer13Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[13]} returnAnswer={(boolean) => setIsAnswer14Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[14]} returnAnswer={(boolean) => setIsAnswer15Checked(boolean)}/>
                      <AnswerButtonSmall text={exeList[nextScreen - 1].allAnswers[15]} returnAnswer={(boolean) => setIsAnswer16Checked(boolean)}/>
                  </View>
              </Animated.View> : <View style={{height: 0}}></View>}
              

            </View>
          
        </ScrollView>


        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'checkAnswersManyQ'} 
        userAnswers={allUserAnswers}
        correctAnswers={exeList[nextScreen - 1].correctAnswers}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={allScreensNum === nextScreen ? exitLink : linkList[nextScreen]}
        linkPrevious={linkList[nextScreen - 2]}
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

export default Type5

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