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
const currentScreen = 0; //current screen 


const gradientTop = generalStyles.gradientTopDraggable2;
const gradientBottom = generalStyles.gradientBottomDraggable2;

const wordsCorrect = [  // words in correct orders
    [
        ['jeg', 'spiser', 'mat', 'nå'],
        ['nå',  'spiser', 'jeg','mat'],
        ['mat', 'spiser', 'jeg', 'nå'],
    ]
]

const Class1x1x9 = ({ route }) => { // name


    const auth = getAuth();
    const user = auth.currentUser;

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    
    const [movingDraggable, setMovingDraggable] = useState(null);
    const [releaseDraggable, setReleaseDraggable] = useState(null);
    const [words, setWords] = useState(['nå', 'jeg' , 'mat', 'spiser' ]); // words to sort in random order
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
              <Text style={styles.questionText}>Rearrange the words to form a correct sentence.</Text>
              <Text style={styles.textBody}>(additional info text e.g. translation)</Text>
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
        linkNext={'Class?x?x?'} //link next screen 
        linkPrevious={'Class?x?x?'} //link previous screen
        correctMsg={'Keep up the good work'} //correct msg
        wrongMsg={'Oh shoot, that is wrong!'} //wrong msg
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={currentScreen}
        questionScreen={true}
        comeBack={comeBack}
        allScreensNum={allScreensNum}
        />
      </View>
    </View>
  )
}

export default Class1x1x9 //name export

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
    marginTop: 10,
    marginBottom: 40
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

