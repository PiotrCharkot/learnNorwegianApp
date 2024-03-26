import {View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from "expo-av";
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



//Type9x10

const Type9x10 = ({ route }) => {
    
    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params;

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
    const [translation, setTranslation] = useState('')
    
    const [soundLink, setSoundLink] = useState(exeList[nextScreen - 1].soundLink)
    
    
    const translationPosition = useRef(new Animated.Value(500)).current;


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

        
      if (savedLang === 'PL') {
        setTranslation(exeList[nextScreen - 1].translations.pl)
      } else if (savedLang === 'DE') {
        setTranslation(exeList[nextScreen - 1].translations.ger)
      } else if (savedLang === 'LT') {
        setTranslation(exeList[nextScreen - 1].translations.lt)
      } else if (savedLang === 'AR') {
        setTranslation(exeList[nextScreen - 1].translations.ar)
      } else if (savedLang === 'UA') {
        setTranslation(exeList[nextScreen - 1].translations.ua)
      } else if (savedLang === 'ES') {
        setTranslation(exeList[nextScreen - 1].translations.sp)
      } else if (savedLang === 'EN') {
        setTranslation(exeList[nextScreen - 1].translations.eng)
      }
        
      
        
    })


    useEffect(() => {
      if (latestScreen < nextScreen) {
        setTimeout(() => {
          playSound()
        }, 500);
      }
    }, []);

    
      

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

        Animated.timing(translationPosition, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bezier(.7,.93,.57,.99),
          useNativeDriver: true
        }).start()
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


    const playSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: soundLink }, 
            { shouldPlay: true }
        );
    }

    
    
  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

      <View style={styles.body}>

        <View style={styles.topView}>
            <View style={styles.pictureContainer}>
                <TouchableOpacity onPress={playSound}>
                <Image style={styles.pictureSound} source={require('../../../../../../assets/volume.png')} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.squaresViewContainer}>


            {words.map((item, index) => {
                
                if (exeList[nextScreen - 1].textIndex.includes(index)) {
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
                        colors={isCorrect[index] === 0 || index > exeList[nextScreen - 1].correctAnswers.length ? [gradientTop, gradientBottom] : isCorrect[index] === 1 ? [correct , correct1] : [incorrect1 , incorrect]}
                        key={index}
                            style={[
                            isMovedOver && styles.draggableContainerSwap,
                            item.trim() == '' && !exeList[nextScreen - 1].gapsIndex.includes(index) ?  styles.draggableContainerEmpty : styles.draggableContainer,
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
        <View>
          <Animated.View style={{...styles.translationContainer,  transform: [{translateY: translationPosition}]}}>
            <Text style={styles.translationText}>{translation}</Text>
          </Animated.View>
        </View>
        </View> 
        
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAnswerGapsTextSounds'}
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

export default Type9x10


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
    flexWrap: 'wrap',
  },
  draggableContainer: {
    height: 30,
    paddingHorizontal: 6,
    paddingVertical: 6,
    justifyContent: 'center',
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
    fontSize: 12,
    fontWeight: '500',
    flexWrap: 'wrap',
    
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 6,
    marginHorizontal: 2,
  },
  spacer: {
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    height: 40,
    width: '100%',
  },
  pictureContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureSound: {
    height: 50,
    width: 50,
    tintColor: generalStyles.colorText2
  },
  translationContainer: {
    position: 'absolute',
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  translationText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center'
  }
})

