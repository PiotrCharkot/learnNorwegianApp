import { View, Text, StyleSheet, Animated, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';
import AnswerPairType4 from '../../../../../components/other/AnswerPairType4';
import AnswerPairType6 from '../../../../../components/other/AnswerPairType6';




const correct = generalStyles.gradientTopCorrectDraggable;
const correct1 = generalStyles.gradientBottomCorrectDraggable;
const incorrect = generalStyles.gradientBottomWrongDraggable;
const incorrect1 = generalStyles.gradientTopWrongDraggable;
const gradientTop = generalStyles.gradientTopDraggable;
const gradientBottom = generalStyles.gradientBottomDraggable;
const gradientTop2 = generalStyles.gradientTopDraggable3;
const gradientBottom2 = generalStyles.gradientBottomDraggable3;

const screenWidth = Dimensions.get('window').width;

const exitLink = 'ExitExcScreen'


const Type2 = ({route}) => {
    
    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params
    

    const isCorrectNewArr = Array(exeList[nextScreen - 1].leftSideWords.length).fill(0);
    
    const [wordsLeft, setWordsLeft] = useState(exeList[nextScreen - 1].leftSideWords);
    const [wordsRight, setWordsRight] = useState([]);
    const [correctAswers, setCorrectAnswers] = useState([]);
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [isCorrect, setIsCorrect] = useState(isCorrectNewArr);

    const [answersChecked, setAnswersChecked] = useState([]);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    const [instructions, setInstructions] = useState('Match items to their matches.');
    const [newInstructions, setNewInstructions] = useState('');
    const [hideShowText, setHideShowText] = useState('Show answers');
    const [hideTxt, setHideTxt] = useState('Hide answers')
    const [dataForAnswer, setDataForAnswers] = useState([]);
    const [answersShown, setAnswersShown] = useState(false);
     
    const answerPosition = useRef(new Animated.Value(220)).current;



    useEffect(() => {
     

      if (Array.isArray(exeList[nextScreen - 1].correctAnswers)) {

        console.log('The variable is an array in type2.');

        setWordsRight(exeList[nextScreen - 1].rightSideWords);
        setCorrectAnswers(exeList[nextScreen - 1].correctAnswers);

      } else if (typeof exeList[nextScreen - 1].correctAnswers === 'object' && exeList[nextScreen - 1].correctAnswers !== null) {

        console.log('The variable is an object in type2.');

        if (savedLang === 'PL') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.pl)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.pl)
        } else if (savedLang === 'DE') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.ger)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.ger)
        } else if (savedLang === 'LT') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.lt)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.lt)
        } else if (savedLang === 'AR') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.ar)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.ar)
        } else if (savedLang === 'UA') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.ua)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.ua)
        } else if (savedLang === 'ES') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.sp)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.sp)
        } else if (savedLang === 'EN') {
          setWordsRight(exeList[nextScreen - 1].rightSideWords.eng)
          setCorrectAnswers(exeList[nextScreen - 1].correctAnswers.eng)
        }
      }


    }, [])
    


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
              setInstructions('Dopasuj elementy do ich par.')
              setHideShowText('Pokaż odpowiedzi')
              setHideTxt('Ukryj odpowiedzi')
            } else if (savedLang === 'DE') {
              setInstructions('Ordne die Elemente ihren Pendants zu.')
              setHideShowText('Antworten anzeigen')
              setHideTxt('Antworten verbergen')
            } else if (savedLang === 'LT') {
              setInstructions('Suderinkite elementus su jų poromis.')
              setHideShowText('Rodyti atsakymus')
              setHideTxt('Slėpti atsakymus')
            } else if (savedLang === 'AR') {
              setInstructions('طابق العناصر مع مثيلاتها')
              setHideShowText('عرض الإجابات')
              setHideTxt('اخفِ الإجابات')
            } else if (savedLang === 'UA') {
              setInstructions('Відповідайте елементи з їх парами.')
              setHideShowText('Показати відповіді')
              setHideTxt('Сховати відповіді')
            } else if (savedLang === 'ES') {
              setInstructions('Empareja los elementos con sus pares.')
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
        for (let i = 0; i < answersChecked.length; i++) {

          const newArr = [...isCorrect];
          newArr.map((val, ind) => {
              answersChecked[ind] ? newArr[ind] = 1 : newArr[ind] = 2
          })

          setIsCorrect(newArr);
          
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


    const onMovingDraggable = (movingDraggable) => {
        setMovingDraggable(movingDraggable);
    };
    
    const onReleaseDraggable = (releaseDraggable) => {
        setMovingDraggable(null);
        setReleaseDraggable(releaseDraggable);
    };

    const swap = (index1, index2) => {
        var arr = [...wordsLeft];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWordsLeft(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };
    const swapRight = (index1, index2) => {
        var arr = [...wordsRight];
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
        setWordsRight(arr);
        setIsCorrect(isCorrectNewArr);
        setResetCheck(!resetCheck)
    };

  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.swapableContainer}>

                <View style={styles.leftContainer}>
                    {wordsLeft.map((item, index) => {
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
                                colors={ isCorrect[index] === 0 ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                                key={index}
                                    style={[
                                    isMovedOver && styles.draggableContainerSwap,
                                    styles.draggableContainer,
                                    ]}
                                >
                                    
                                    <Text style={styles.textInDraggable}>{item}</Text>
                                </LinearGradient>
                                );
                            }}
                            />
                        );
                        
                    })}
                </View>

                <View style={styles.rightContainer}>
                    {wordsRight.map((item, index) => {
                        return (
                            <Draggable
                            key={index}
                            index={index}
                            movingDraggable={movingDraggable}
                            onMovingDraggable={onMovingDraggable}
                            releaseDraggable={releaseDraggable}
                            onReleaseDraggable={onReleaseDraggable}
                            swap={swapRight}
                            renderChild={(isMovedOver) => {
                                return (
            
                                <LinearGradient
                                colors={isCorrect[index] === 0 ? [gradientTop2, gradientBottom2] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                                key={index}
                                    style={[
                                    isMovedOver && styles.draggableContainerSwap,
                                    styles.draggableContainer,
                                    ]}
                                >
                                    
                                    <Text style={styles.textInDraggable}>{item}</Text>
                                </LinearGradient>
                                );
                            }}
                            />
                        );
                        
                    })}
                </View>

            </View>
          
        </View>


        
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
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'matchLR'} 
        userAnswers={wordsLeft}
        userAnswers2={wordsRight}
        correctAnswers={correctAswers}
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

export default Type2

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
  swapableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
  },
  leftContainer: {
    width: '50%',
    borderRightWidth: 0.5,
    borderRightColor: 'lightgrey',
    paddingHorizontal: 10
},
rightContainer: {
    width: '50%',
    paddingHorizontal: 10
    
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
    fontSize: 18,
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
  draggableContainer: {
    height: 32,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    margin: 6,
    overflow: "hidden",
    backgroundColor: 'lightgreen',
    
  },
  draggableContainerSwap: {
    height: 32,
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
    color: 'white',
    
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