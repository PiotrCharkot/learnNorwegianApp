import { View, Text, StyleSheet, Animated, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar';
import AnswerButton from '../../../../../components/buttons/AnswerButton';
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 7;

const correct1 = generalStyles.gradientBottomCorrectDraggable;


const mistakesIndex = [8, 21, 24, 33];
const words = ['Ideelt', 'sett', 'ønsker', 'jeg', 'meg', 'seks', 'timers', 'arbeidsdag', 'før', 'småbarnforeldre,', 'slik', 'noen', 'politikere', 'har', 'foreslått.', 'Det', 'er', 'hektisk', 'å kombinere',  'foreldrerollen', 'med', 'fulltidjobb.', 'Ofte', 'rekker', 'ikke jeg', 'å hente', 'i', 'barnehagen', 'før', 'klokka', 'fem,', 'og', 'da', 'fått', 'jeg', 'dårlig', 'samvittighet.']
const wordsCorrect = ['Ideelt', 'sett', 'ønsker', 'jeg', 'meg', 'seks', 'timers', 'arbeidsdag', 'for', 'småbarnforeldre,', 'slik', 'noen', 'politikere', 'har', 'foreslått.', 'Det', 'er', 'hektisk', 'å kombinere',  'foreldrerollen', 'med', 'fulltidsjobb.', 'Ofte', 'rekker', 'jeg ikke', 'å hente', 'i', 'barnehagen', 'før', 'klokka', 'fem,', 'og', 'da', 'får', 'jeg', 'dårlig', 'samvittighet.']

const Exc1x1x7 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum} = route.params

   
    const [isCorrect, setIsCorrect] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [answersChecked, setAnswersChecked] = useState([]);
    const [showMistakes, setShowMistakes] = useState(false);
    const [markedWords, setMarkdWords] = useState([]);
    const [showCorrect, setShowCorrect] = useState(false);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);


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
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>
          <View style={styles.topView}>
              <Text style={styles.questionText}>Mark mistakes in text.</Text>
          </View>

          <View style={styles.textContainer}>
              

            {showCorrect ? wordsCorrect.map((item, index) => {
              return (
                <TouchableOpacity key={index} style={{
                  ...styles.touchable,
                  backgroundColor: 'transparent'
                  }}>
                  <Text style={{
                    ...styles.wordsTxt
                  }}>{item} </Text>
                </TouchableOpacity>
                
              )
          
            }) :  words.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => markWord(index)} style={{
                  ...styles.touchable,
                  backgroundColor: isCorrect[index] === 1 ? correct1 : markedWords.includes(index) ? generalStyles.colorHighlightChoosenAnswer : 'transparent'
                  }}>
                  <Text style={{
                    ...styles.wordsTxt,
                    textDecorationLine: mistakesIndex.includes(index) && showMistakes ? 'underline' : null,
                    textDecorationColor: 'red'
                  }}>{item} </Text>
                </TouchableOpacity>
                
              )
          
            })}

          </View>


          <View style={styles.btnContainer}>
          
            {showMistakes ? <AnswerButton text={'Show correct text'} colors={['#00308F', '#007FFF']}  returnAnswer={(boolean) => setShowCorrect(boolean)}/> : null}
          </View>
          

            
          
        </View>

        

    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'markMistakes'} 
        userAnswers={markedWords}
        correctAnswers={mistakesIndex}
        textLength={words.length}
        answerBonus={15}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={'Exc1x1x8'}
        linkPrevious={'Exc1x1x6'}
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

export default Exc1x1x7

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
  textContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  touchable: {
    borderRadius: 4,
    marginRight: 2,
    marginBottom: 4
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
  

})