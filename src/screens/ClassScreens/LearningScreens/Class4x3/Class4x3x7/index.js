import {View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const answerBonus = generalStyles.answerBonus;
const currentScreen = 7;  //current screen 
const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const totalPoints = 3 * generalStyles.answerBonus + currentScreen * generalStyles.screenBonus;
const dataForMarkers = {
  part: 'learning',
  section: 'section4',
  class: 2
}

const correctAnswers = ['Vi', 'trenger' ,'mer', 'informasjon.']; // array with correct words in line up to the word that goes in gap. exapmle ==> const correctAnswers = ['Jeg', 'trenger'];

const indexOfGaps = [2] // array with index of a gap in text
const indexOfText = [0, 1, 3] // array with indexes of text

const Class4x3x7 = ({ route }) => {  //screen name

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params

    const auth = getAuth();
    const user = auth.currentUser;
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(['Vi', 'trenger' ,'            ', 'informasjon.','!!!' ,'litt' , 'mange', 'mer' ]); // arr with word in order, after '!!!' comes word to choose from Vi trenger mer informasjon. 
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);
    

    useFocusEffect(() => {
      if (latestScreen > currentScreen) {
        setLatestScreenDone(latestScreen);
        setComeBack(true)
      }

      if (route.params.userPoints > 0) {
        
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
                <Text style={styles.questionText}>Drag correct answer into the gap.</Text>
                <Text style={styles.textBody}>(We need more information.)</Text>
            </View>

            <View style={styles.squaresViewContainer}>


                {words.map((item, index) => {
                    
                    if (indexOfText.includes(index)) {
                        return (
                            <View style={styles.exgzampleTextContainer} key={index}>
                                <Text style={styles.textBody}>{item}</Text>
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
                                colors={[gradientTop, gradientBottom]}
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
          callbackButton={'checkAnswer'}
          userAnswers={words}
          correctAnswers={correctAnswers}
          answerBonus={answerBonus}
          linkNext={'ExitExcScreen'} //link to next screen
          linkPrevious={'Class4x3x6'} //link to previous screen
          correctMsg={'Tremendous!'} //correct msg
          wrongMsg={'A minor slip up has surfaced.'} //wrong msg
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

export default Class4x3x7//name for export

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
    marginTop: generalStyles.marginTopTopView,
    marginBottom: generalStyles.marginBottomTopView,
    marginHorizontal: generalStyles. marginHorizontalTopView
  },
  questionText: {
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginVertical: 10,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
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
  textColor: {
    color: generalStyles.colorText1,
  },
  exgzampleTextContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    height: 30,
    marginVertical: 6,
    marginHorizontal: 3
    
  },
  spacer: {
    height: generalStyles.spacerInDraggable,
    width: '100%',
  },
})

