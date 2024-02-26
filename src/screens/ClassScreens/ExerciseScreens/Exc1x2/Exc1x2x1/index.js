import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useState, useEffect, useRef} from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
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


// import files with data and Loader component

// add markers for data

const dataForMarkers = {
  part: 'exercise',
  section: 'section1',
  class: 'class0'
}



// set typeInSet as array with data from import
// set array with links to screens
// set correct firsts link and data type


const typesInSet = [aatest, aatest, type4prep, type2prep, type5prep, type6prep, type7prep, type8prep];
const linkList = ['Exc1x2x1', 'Type1', 'Type4', 'Type2', 'Type5', 'Type6', 'Type7', 'Type8'];
let usedItems = [];



//set current screen as 1 and allScreenNum

const currentScreen = 1;
const allScreensNum = linkList.length;

const colorUnderline = generalStyles.colorHighlightChoiceOption;
const colorChosenAns = generalStyles.colorHighlightChoosenAnswer;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];


// delete exitLink



//Type1 opening screen

const Exc1x2x1 = ({route}) => {
  

  // destruction of route object moves to useEffect in if statment if (route.params)

  const [latestScreenDone, setLatestScreenDone] = useState(currentScreen); // set to current screen
  const [latestScreenAnswered, setLatestScreenAnswered] = useState(0); // set to 0

  const [currentPoints, setCurrentPoints] = useState(0); // set to 0
  const [comeBack, setComeBack] = useState(false);
  const [answersChecked, setAnswersChecked] = useState([]);
  const [resetCheck, setResetCheck] = useState(false);
  const [correctAnswers, setCorrectAnswers]= useState([]); // in opening screen set correct Ansewers after setting ExeList in useEffect (tempArr)
  const [instructions, setInstructions] = useState('Choose the correct word to complete the sentence.');
  const [newInstructions, setNewInstructions] = useState('');
  const [language, setLanguage] = useState('EN');

  // create content redy as false and exeList as []

  const [contentReady, setContentReady] = useState(false);
  const [exeList, setExeList] = useState([]);


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

    // destruction of route object if (route.params)
    if (route.params) {
      const {userPoints, latestScreen, comeBackRoute, latestAnswered, nextScreen, savedLang} = route.params;
      

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
        setInstructions('Wybierz właściwe słowo, aby uzupełnić zdanie.')
      } else if (savedLang === 'DE') {
        setInstructions('Wähle das richtige Wort, um den Satz zu vervollständigen.')
      } else if (savedLang === 'LT') {
        setInstructions('Pasirinkite teisingą žodį, kad užbaigtumėte sakinį.')
      } else if (savedLang === 'AR') {
        setInstructions('اختر الكلمة الصحيحة لإكمال الجملة')
      } else if (savedLang === 'UA') {
        setInstructions('Виберіть правильне слово, щоб завершити речення.')
      } else if (savedLang === 'ES') {
        setInstructions('Elige la palabra correcta para completar la oración.')
      }
      
      setLanguage(savedLang)
    }

  })


  // add this useEffect that sets array with links and questions and counts totalPoints 

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
        setLatestScreenAnswered(currentScreen); //set to currentScreen
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
  


  // change comeBackRoute to comeBack in progressBar
  // change screenNum to 1 in progressBar

  // set ScrollView in contentReady
  // set content to exeList[0].content

  // bottom bar => delete previousLink,    add isFirstScreen={true}   currentScreen set to currentScreen
  // bottom bar => delete totalPoints and dataForMarkers,         set linkNext to linkNext={linkList[currentScreen]}

  return (
    <View style={styles.mainContainer}>

      {contentReady ? <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.topView}>
            <Text style={{...styles.questionText, textAlign: language === 'AR' ? 'right' : 'left' }}>{exeList[0].instructions ? newInstructions : instructions}</Text>
          </View>

          <View style={styles.middleView}>


            {exeList[0].nuberOfQuestions > 0 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA1}} >
                <Text style={styles.text}>
                {exeList[0].questions[0][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA1(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[0][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A1 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA1(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[0][2]}</Text>
                        </TouchableOpacity>{exeList[0].questions[0][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            

            {exeList[0].nuberOfQuestions > 1 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA2}} >
                <Text style={styles.text}>
                {exeList[0].questions[1][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA2(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[1][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A2 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA2(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[1][2]}</Text>
                        </TouchableOpacity>{exeList[0].questions[1][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            
            

            {exeList[0].nuberOfQuestions > 2 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA3}} >
                <Text style={styles.text}>
                {exeList[0].questions[2][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA3(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[2][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A3 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA3(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[2][2]}</Text>
                        </TouchableOpacity>{exeList[0].questions[2][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            



            {exeList[0].nuberOfQuestions > 3 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA4}} >
                <Text style={styles.text}>
                {exeList[0].questions[3][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA4(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[3][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A4 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA4(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[3][2]}</Text>
                        </TouchableOpacity>{exeList[0].questions[3][3]}
                </Text>
            </Animated.View> : <View style={{height: 0}}></View>}
            


            {exeList[0].nuberOfQuestions > 4 ? <Animated.View style={{...styles.questionContainer, backgroundColor: backgroundA5}} >
                <Text style={styles.text}>
                {exeList[0].questions[4][0]}<TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 1 ? colorChosenAns : colorUnderline}} onPress={() => {setA5(1); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[4][1]}</Text>
                            </TouchableOpacity> / <TouchableOpacity style={{...styles.answerOpacity, backgroundColor: A5 === 2 ? colorChosenAns : colorUnderline}} onPress={() => {setA5(2); resetAnimation();}}>
                            <Text style={styles.text}>{exeList[0].questions[4][2]}</Text>
                        </TouchableOpacity>{exeList[0].questions[4][3]}
                </Text>
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
        callbackButton={'checkAllAnswers'}
        correctAnswers={correctAnswers}
        userAnswers={[A1, A2, A3, A4, A5]}
        linkNext={linkList[currentScreen]} 
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
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

export default Exc1x2x1

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
})