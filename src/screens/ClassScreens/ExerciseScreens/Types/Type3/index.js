import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';



const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;


const exitLink = 'ExitExcScreen'


const Type3 = ({ route }) => {
    
    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params
    

    const isCorrectNewArr = Array(exeList[nextScreen - 1].correctAnswers.length).fill(0);
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [isCorrect, setIsCorrect] = useState(isCorrectNewArr);
    const [answersChecked, setAnswersChecked] = useState([]);
    const [words, setWords] = useState(exeList[nextScreen - 1].wordsWithGaps);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    
    const [instructions, setInstructions] = useState('Drag and drop the words into the correct gaps.');
    const [newInstructions, setNewInstructions] = useState('');
    

    useFocusEffect(() => {
      
      if (latestScreen > nextScreen) {
          setLatestScreenAnswered(latestAnswered);
          setLatestScreenDone(latestScreen);
          setComeBack(true);
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
            setInstructions('Przeciągnij i upuść słowa we właściwe luki.')
          } else if (savedLang === 'DE') {
            setInstructions('Ziehe die Wörter in die richtigen Lücken.')
          } else if (savedLang === 'LT') {
            setInstructions('Tempkite žodžius į teisingas vietas.')
          } else if (savedLang === 'AR') {
            setInstructions('اسحب وأفلت الكلمات في الفراغات الصحيحة')
          } else if (savedLang === 'UA') {
            setInstructions('Перетягніть слова в правильні пропуски.')
          } else if (savedLang === 'ES') {
            setInstructions('Arrastra y suelta las palabras en los huecos correctos.')
        }
      }
    })

    useEffect(() => {
      setMovingDraggable(null);
      setReleaseDraggable(null);
      return () => {};
    }, [words]);

    useEffect(() => {
      
      if (answersChecked.length !== 0) {
        setLatestScreenAnswered(nextScreen); 
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
      <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }} allowFontScaling={false}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.squaresViewContainer}>


              {words.map((item, index) => {
                  
                  if (exeList[nextScreen - 1].textIndex.includes(index) && !exeList[nextScreen - 1].lineBreaker.includes(index)) {
                      return (
                          <View style={styles.exgzampleTextContainer} key={index}>
                              <Text style={styles.exgzampleText} allowFontScaling={false}>{item}</Text>
                          </View>
                      )
                  } else if (exeList[nextScreen - 1].lineBreaker.includes(index)) {
                    return (
                        <View style={styles.lineBreaker} key={index}>
                            
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
                          colors={isCorrect[index] === 0 || index > exeList[nextScreen - 1].correctAnswers.length ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                          key={index}
                              style={[
                              isMovedOver && styles.draggableContainerSwap,
                              item.trim() == '' && !exeList[nextScreen - 1].gapsIndex.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
                              ]}
                          >
                              
                              <Text style={styles.textInDraggable} allowFontScaling={false}>{item}</Text>
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
        correctAnswers={exeList[nextScreen - 1].correctAnswers}
        numberOfGaps={exeList[nextScreen - 1].gapsIndex.length}
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

export default Type3


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
    marginBottom: 0,
    marginHorizontal: 20
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginTop: 10,
    marginBottom: 0,
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
    height: 30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 4,
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
    paddingTop: 0,
    paddingLeft: 4,
    paddingBottom: 0,
    paddingRight: 4,
    height: 26,
    borderWidth: 2,
    borderColor: "red",
  },
  textInDraggable: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white'
  },
  exgzampleText: {
    fontSize: 13,
    fontWeight: '500',
    flexWrap: 'wrap',
    
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 4,
    marginHorizontal: 2
    
  },
  spacer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    height: 20,
    width: '100%',
    marginBottom: 10
  },
  lineBreaker: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    height: 0,
    width: '100%'
  },
})

