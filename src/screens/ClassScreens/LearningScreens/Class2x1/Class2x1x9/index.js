import {View, Text, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const answerBonus = generalStyles.answerBonus;
const currentScreen = 9; //current screen 


const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const wordsCorrect = [  // words in correct orders
    [
        ['her', 'jobber', 'jeg', 'nå'],
        ['nå', 'jobber', 'jeg' ,'her'],
    ]
]

const Class2x1x9 = ({ route }) => { // name

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(['jeg', 'jobber', 'her', 'nå']); // words to sort in random order
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const allUserAnswers = [words]
    

    useFocusEffect(() => {
        if (latestScreen > currentScreen) {
            setLatestScreenDone(latestScreen);
            setComeBack(true)
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
    };


  return (
    <View style={styles.mainContainer}>
      <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        <View style={styles.body}>

            <View style={styles.topView}>
                <Text style={styles.questionText}>Rearrange the words so this sentence: 'Jeg jobber her nå.' is still in correct positive form.</Text>
                <Text style={styles.textBody}>Jeg jobber her nå. -  I work here now.</Text>
            </View>

            <View style={styles.squaresViewContainer}>


                {words.map((item, index) => {
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
                            colors={[gradientTop, gradientBottom]}
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
    

      <View style={styles.bottomBarContainer}>
        <BottomBar 
        callbackButton={'checkAnswerOrderCheck'}
        userAnswers={allUserAnswers}
        correctAnswers={wordsCorrect}
        answerBonus={answerBonus}
        linkNext={'Class2x1x10'} //link next screen 
        linkPrevious={'Class2x1x8'} //link previous screen
        correctMsg={'There are a few solutions here'} //correct msg
        wrongMsg={'Verb must be on the second position.'} //wrong msg
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        allScreensNum={allScreensNum}
        savedLang={savedLang}
        />
      </View>
    </View>
  )
}

export default Class2x1x9 //name export

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
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginTop: 10,
    marginBottom: 40
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
    fontSize: generalStyles.screenTextSizeDraggable,
    fontWeight: generalStyles.fontWeightDraggable,
    color: 'white'
  },
  textBody: {
    fontSize: generalStyles.screenTextSizeSmallest,
    fontWeight: generalStyles.learningScreenTitleFontWeightMediumPlus,
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

