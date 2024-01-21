import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 1;
const allScreensNum = 8;
const colorUnderline = generalStyles.colorHighlightChoiceOption;
const colorChosenAns = generalStyles.colorHighlightChoosenAnswer;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const correctAnswers = [1, 2, 2, 1, 1];

const Exc1x1x1 = ({route}) => {
  
  const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
  const [latestScreenAnswered, setLatestScreenAnswered] = useState(0);

  const [currentPoints, setCurrentPoints] = useState(0);
  const [comeBack, setComeBack] = useState(false);
  const [answersChecked, setAnswersChecked] = useState([]);

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

    
   
    
  useFocusEffect(() => {
    if (route.params) {
      const {userPoints, latestScreen, comeBackRoute, latestAnswered} = route.params;
      
      if (latestScreen > currentScreen) {
        setLatestScreenDone(latestScreen);
        setLatestScreenAnswered(latestAnswered);
        setComeBack(true)
      }

      if (route.params.userPoints > 0) {
        setCurrentPoints(userPoints)
    }
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
      <ProgressBar screenNum={1} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>
        <View style={styles.body}>
          <View style={styles.topView}>
            <Text style={styles.title}>Choose good anwer out of two</Text>
          </View>

          <View style={styles.middleView}>

            <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}} >
                <Text style={styles.text}>
                De snakket om det, <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 1 ? colorChosenAns : colorUnderline}} onPress={() => setA1(1)}>
                            <Text style={styles.text}>mens</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 2 ? colorChosenAns : colorUnderline}} onPress={() => setA1(2)}>
                            <Text style={styles.text}>fordi</Text>
                        </TouchableOpacity> de spiste
                </Text>
            </Animated.View>

            <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
                <Text style={styles.text}>
                Kristian drar på ferie <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 1 ? colorChosenAns : colorUnderline}} onPress={() => setA2(1)}>
                            <Text style={styles.text}>mens</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 2 ? colorChosenAns : colorUnderline}} onPress={() => setA2(2)}>
                            <Text style={styles.text}>til tross for at</Text>
                        </TouchableOpacity> han ikke har mye penger
                </Text>
            </Animated.View>
            

            <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
                <Text style={styles.text}>
                Faren hans dødde, <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 1 ? colorChosenAns : colorUnderline}} onPress={() => setA3(1)}>
                            <Text style={styles.text}>når</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 2 ? colorChosenAns : colorUnderline}} onPress={() => setA3(2)}>
                            <Text style={styles.text}>da</Text>
                        </TouchableOpacity> han var 12 år gammel
                </Text>
            </Animated.View>


            <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
                <Text style={styles.text}>
                Vi går en tur, <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 1 ? colorChosenAns : colorUnderline}} onPress={() => setA4(1)}>
                            <Text style={styles.text}>hvis</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 2 ? colorChosenAns : colorUnderline}} onPress={() => setA4(2)}>
                            <Text style={styles.text}>selv om</Text>
                        </TouchableOpacity> det er pent vær
                </Text>
            </Animated.View>

            <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA5}} >
                <Text style={styles.text}>
                Julie spør <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 1 ? colorChosenAns : colorUnderline}} onPress={() => setA5(1)}>
                            <Text style={styles.text}>om</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 2 ? colorChosenAns : colorUnderline}} onPress={() => setA5(2)}>
                            <Text style={styles.text}>fordi</Text>
                        </TouchableOpacity> du kan hjelpe henne.
                </Text>
            </Animated.View>
            
           

           
          </View>
        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAllAnswers'}
        correctAnswers={correctAnswers}
        userAnswers={[A1, A2, A3, A4, A5]}
        linkNext={'Exc1x1x2'} 
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        isFirstScreen={true}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        />
      </View>
    </View>
  )
}

export default Exc1x1x1

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
  middleView: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginVertical: 10,
  },
  questionContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.5,
    elevation: 1
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    
  },
  answerOpacity: {
    justifyContent: 'flex-end',
    alignItems: 'center', 
    backgroundColor: 'lightgrey', 
    borderRadius: 6,
    transform: [{translateY: 3}]
    
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
})