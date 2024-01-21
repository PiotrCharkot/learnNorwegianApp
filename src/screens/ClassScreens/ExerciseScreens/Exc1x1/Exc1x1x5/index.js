import { View, Text, StyleSheet, Animated  } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButtonSmall from '../../../../../components/buttons/AnswerButtonSmall';
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 5;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const answer1 = 'meg';
const answer2 = 'oss';
const answer3 = 'dere';
const answer4 = 'deg';
const answer5 = 'ønsker';
const answer6 = 'kommer til å';
const answer7 = 'skal';
const answer8 = 'trenger';
const answer9 = 'dere';
const answer10 = 'deg';
const answer11 = 'meg';
const answer12 = 'seg';
const answer13 = 'oss';
const answer14 = 'dere';
const answer15 = 'seg';
const answer16 = 'deg';
const correctAnswers = [[false, true, false, false], [false, true, true, false], [false, false, true, false], [false, false, true, false]];



const Exc1x1x5 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum} = route.params;
    
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
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);

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
        
        if (latestScreen > currentScreen) {
          setLatestScreenAnswered(latestAnswered);
          setLatestScreenDone(latestScreen);
          setComeBack(true)
        }

        if (route.params.userPoints > 0) {
            console.log('setting new points', route.params.userPoints );
            setCurrentPoints(userPoints)
        }
    })

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
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>
            <View style={styles.topView}>
                <Text style={styles.questionText}>Choose correct answers.</Text>
            </View>

            <View style={styles.middleView}>
                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
                    <Text style={styles.questionTextMiddle}>Vi skynder _______ til stasjonen.</Text>

                    <View style={styles.buttonsContainer}>
                        <AnswerButtonSmall text={answer1} returnAnswer={(boolean) => setIsAnswer1Checked(boolean)}/>
                        <AnswerButtonSmall text={answer2} returnAnswer={(boolean) => setIsAnswer2Checked(boolean)}/>
                        <AnswerButtonSmall text={answer3} returnAnswer={(boolean) => setIsAnswer3Checked(boolean)}/>
                        <AnswerButtonSmall text={answer4} returnAnswer={(boolean) => setIsAnswer4Checked(boolean)}/>
                    </View>
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}}>
                    <Text style={styles.questionTextMiddle}>Jeg _______ dra på ferie snart.</Text>

                    <View style={styles.buttonsContainer}>
                        <AnswerButtonSmall text={answer5} returnAnswer={(boolean) => setIsAnswer5Checked(boolean)}/>
                        <AnswerButtonSmall text={answer6} returnAnswer={(boolean) => setIsAnswer6Checked(boolean)}/>
                        <AnswerButtonSmall text={answer7} returnAnswer={(boolean) => setIsAnswer7Checked(boolean)}/>
                        <AnswerButtonSmall text={answer8} returnAnswer={(boolean) => setIsAnswer8Checked(boolean)}/>
                    </View>
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}}>
                    <Text style={styles.questionTextMiddle}> Jeg gleder _______ til å se deg igjen.</Text>

                    <View style={styles.buttonsContainer}>
                        <AnswerButtonSmall text={answer9} returnAnswer={(boolean) => setIsAnswer9Checked(boolean)}/>
                        <AnswerButtonSmall text={answer10} returnAnswer={(boolean) => setIsAnswer10Checked(boolean)}/>
                        <AnswerButtonSmall text={answer11} returnAnswer={(boolean) => setIsAnswer11Checked(boolean)}/>
                        <AnswerButtonSmall text={answer12} returnAnswer={(boolean) => setIsAnswer12Checked(boolean)}/>
                    </View>
                </Animated.View>

                <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}}>
                    <Text style={styles.questionTextMiddle}>Faren min barberer _______ hver dag.</Text>

                    <View style={styles.buttonsContainer}>
                        <AnswerButtonSmall text={answer13} returnAnswer={(boolean) => setIsAnswer13Checked(boolean)}/>
                        <AnswerButtonSmall text={answer14} returnAnswer={(boolean) => setIsAnswer14Checked(boolean)}/>
                        <AnswerButtonSmall text={answer15} returnAnswer={(boolean) => setIsAnswer15Checked(boolean)}/>
                        <AnswerButtonSmall text={answer16} returnAnswer={(boolean) => setIsAnswer16Checked(boolean)}/>
                    </View>
                </Animated.View>

            </View>
          
        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'checkAnswersManyQ'} 
        userAnswers={allUserAnswers}
        correctAnswers={correctAnswers}
        answerBonus={15}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={'Exc1x1x6'}
        linkPrevious={'Exc1x1x4'}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        resetCheck={resetCheck}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        />
      </View>
    </View>
  )
}

export default Exc1x1x5

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: 'white'
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