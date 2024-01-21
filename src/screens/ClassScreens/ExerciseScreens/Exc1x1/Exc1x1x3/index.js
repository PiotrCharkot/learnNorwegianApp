import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 3;
const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;


const correctAnswers = ['Over', '80%', 'av', 'befolkningen', 'i Norge','bor i', 'byer og', 'tetsteder,', 'og de', 'fleste', 'byene', 'ligger', 'ved', 'kysten.', 'De', 'vokste', 'opprinnelig', 'fram', 'der det', 'var', 'næringsgrunnlag,', 'og der', 'det gikk', 'vei', 'eller', 'man', 'kunne', 'komme', 'fram', 'med båt.', 'Bergen er', 'et godt', 'eksempel.', 'Fram til', '1830', 'var', 'Bergen', 'Norges', 'største', 'by.' ];
const indexOfGaps = [3, 12, 16, 24, 28, 35]
const indexOfText = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39]
//const indexOfText = [...correctAnswers.keys()].map(i => i);


const isCorrectNewArr = Array(correctAnswers.length).fill(0);


const Exc1x1x3 = ({ route }) => {

  const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum} = route.params
    

    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [isCorrect, setIsCorrect] = useState(isCorrectNewArr);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState(['Over', '80%', 'av', '            ', 'i Norge','bor i', 'byer og', 'tetsteder,', 'og de', 'fleste', 'byene', 'ligger', '            ', 'kysten.', 'De', 'vokste','            ', 'fram', 'der det', 'var', 'næringsgrunnlag,', 'og der', 'det gikk', 'vei', '            ', 'man', 'kunne', 'komme', '            ', 'med båt.', 'Bergen er', 'et godt', 'eksempel.', 'Fram til', '1830', '            ', 'Bergen', 'Norges', 'største', 'by.', '!!!' , 'var', 'gammel', 'befolkningen', 'er','eller', 'andre', 'opprinnelig', 'bli', 'ung','fram', 'pen', 'ved', 'til', 'fra' ]);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    

    useFocusEffect(() => {
      
        if (latestScreen > currentScreen) {
            setLatestScreenAnswered(latestAnswered);
            setLatestScreenDone(latestScreen);
            setComeBack(true);
        }

        if (route.params.userPoints > 0) {
            console.log('setting new points', route.params.userPoints );
            setCurrentPoints(userPoints)
        }
    })

    useEffect(() => {
      setMovingDraggable(null);
      setReleaseDraggable(null);
      return () => {};
    }, [words]);

    useEffect(() => {
      
      if (answersChecked.length !== 0) {
        setLatestScreenAnswered(currentScreen); 
        for (let i = 0; i < answersChecked.length; i++) {

          const newArr = [...isCorrect];
          newArr.map((val, ind) => {
              answersChecked[ind] ? newArr[ind] = 1 : newArr[ind] = 2
          })

          setIsCorrect(newArr);
          
        }
    }
  
  }, [answersChecked])

    const onMovingDraggable = (movingDraggable) => {
        setMovingDraggable(movingDraggable);
    };
    
    const onReleaseDraggable = (releaseDraggable) => {
        setMovingDraggable(null);
        setReleaseDraggable(releaseDraggable);
    };

    const swap = (index1, index2) => {
        var arr = [...words];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWords(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };


  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={styles.questionText}>Place right words in gaps.</Text>
            </View>

            <View style={styles.squaresViewContainer}>


              {words.map((item, index) => {
                  
                  if (indexOfText.includes(index)) {
                      return (
                          <View style={styles.exgzampleTextContainer} key={index}>
                              <Text style={styles.exgzampleText}>{item}</Text>
                          </View>
                      )
                  } else if (item === '!!!') {
                      return (
                          <View style={styles.spacer} key={index}>
                              
                          </View>
                      )
                  }
                  else {
                    return (
                      <Draggable
                      key={index}
                      index={index}
                      movingDraggable={movingDraggable}
                      onMovingDraggable={onMovingDraggable}
                      releaseDraggable={releaseDraggable}
                      onReleaseDraggable={onReleaseDraggable}
                      swap={swap}
                      renderChild={(isMovedOver) => {
                          return (
      
                          <LinearGradient
                          colors={isCorrect[index] === 0 || index > correctAnswers.length ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                          key={index}
                              style={[
                              isMovedOver && styles.draggableContainerSwap,
                              item.trim() == '' && !indexOfGaps.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                              ]}
                          >
                              
                              <Text style={styles.textInDraggable}>{item}</Text>
                          </LinearGradient>
                          );
                      }}
                      />
                    );
                  }
                  
              })}

            </View>
        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAnswerGapsText'}
        userAnswers={words}
        correctAnswers={correctAnswers}
        numberOfGaps={indexOfGaps.length}
        answerBonus={15}
        linkNext={'Exc1x1x4'}
        linkPrevious={'Exc1x1x2'} 
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
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

export default Exc1x1x3


const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
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
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  squaresViewContainer: {
    flexDirection: "row",
    padding: 16,
    height: 200,
    flexWrap: 'wrap'
  },
  draggableContainer: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'lightgreen'
  },
  draggableContainerEmpty: {
    width: 0,
    height: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 8,
    margin: 0,
    overflow: "hidden",
    backgroundColor: 'white'
  },
  draggableContainerSwap: {
    paddingTop: 4,
    paddingLeft: 4,
    paddingBottom: 0,
    paddingRight: 4,
    height: 30,
    borderWidth: 2,
    borderColor: "red",
  },
  textInDraggable: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
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
  spacer: {
    height: 80,
    width: '100%',
  },
})

