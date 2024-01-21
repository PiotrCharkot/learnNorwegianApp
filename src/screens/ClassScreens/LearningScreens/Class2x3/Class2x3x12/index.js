import {View, Text, StyleSheet} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const answerBonus = generalStyles.answerBonus;
const currentScreen = 12; //current screen 


const totalPoints = 2 * generalStyles.answerBonus + currentScreen * generalStyles.screenBonus;
const dataForMarkers = {
  part: 'learning',
  section: 'section2',
  class: 2
}

const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const wordsCorrect = [  // words in correct orders ==> Hun bestilte mat fra en restaurant fordi hun ikke hadde tid til å lage middag.
    [
        ['Hun', 'bestilte', 'mat', 'fra en restaurant', 'fordi', 'hun', 'ikke', 'hadde', 'tid til å lage middag.'],
        ['mat', 'bestilte', 'Hun', 'fra en restaurant', 'fordi', 'hun', 'ikke', 'hadde', 'tid til å lage middag.'],
        ['fra en restaurant', 'bestilte', 'Hun', 'mat', 'fordi', 'hun', 'ikke', 'hadde', 'tid til å lage middag.'],
        ['hun', 'bestilte', 'mat', 'fra en restaurant', 'fordi', 'Hun', 'ikke', 'hadde', 'tid til å lage middag.'],
        ['mat', 'bestilte', 'hun', 'fra en restaurant', 'fordi', 'Hun', 'ikke', 'hadde', 'tid til å lage middag.'],
        ['fra en restaurant', 'bestilte', 'hun', 'mat', 'fordi', 'Hun', 'ikke', 'hadde', 'tid til å lage middag.'],
    ]
]

const Class2x3x12 = ({ route }) => { // name

    const auth = getAuth();
    const user = auth.currentUser;

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(['ikke', 'bestilte', 'tid til å lage middag.', 'hadde', 'fra en restaurant', 'Hun', 'fordi', 'mat', 'hun']); // words to sort in random order
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
                <Text style={styles.questionText}>Arrange the words so that the sentence starts with a main clause.</Text>
                <Text style={styles.textBody}>She ordered food from a restaurant because she didn't have time to cook dinner.</Text>
                
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
            linkNext={'ExitExcScreen'} //link next screen 
            linkPrevious={'Class2x3x11'} //link previous screen
            correctMsg={`Good job${user.isAnonymous ? '':  ` ${user.displayName}`}!`} //correct msg
            wrongMsg={'...fordi hun ikke hadde tid...'} //wrong msg
            buttonWidth={generalStyles.buttonNextPrevSize}
            buttonHeight={generalStyles.buttonNextPrevSize}
            userPoints={currentPoints}
            latestScreen={latestScreenDone}
            currentScreen={currentScreen}
            questionScreen={true}
            comeBack={comeBack}
            allScreensNum={allScreensNum}
            learningLastScreen={true}
            totalPoints={totalPoints}
            dataForMarkers={dataForMarkers}
            />
        </View>
    </View>
  )
}

export default Class2x3x12 //name export

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

