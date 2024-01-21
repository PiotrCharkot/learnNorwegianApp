import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import AnswerButton from '../../../../../components/buttons/AnswerButton'
import generalStyles from '../../../../../styles/generalStyles';


const answerBonus = generalStyles.answerBonus;
const currentScreen = 6; //current screen
const answerOne = 'hun skal besøke';  //answer a
const answerTwo = 'ville hun besøke'; //answer b
const answerThree = 'hun ville besøke'; //answer c
const answerFour = 'hun besøker'; //answer d
const correctAnswers = [false, true, false, false];  //correct answer true or false


const Class2x5x6 = ({route}) => {  //name

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    
    const [isAnswerAChecked, setIsAnswerAChecked] = useState(false);
    const [isAnswerBChecked, setIsAnswerBChecked] = useState(false);
    const [isAnswerCChecked, setIsAnswerCChecked] = useState(false);
    const [isAnswerDChecked, setIsAnswerDChecked] = useState(false);
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);


    
    useFocusEffect(() => {
        
      if (latestScreen > currentScreen) {
          setLatestScreenDone(latestScreen);
          setComeBack(true);
      }

      if (route.params.userPoints > 0) {
          console.log('setting new points', route.params.userPoints );
          setCurrentPoints(userPoints)
      }

        
    })

  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

            <View style={styles.topView}>
                <Text style={styles.questionText}>Select the correct answer to complete the sentence.</Text>
                <Text style={styles.textBody}>Hvis hun kunne fly, ________ alle landene i verden.</Text>
                <Text style={styles.textBody}>(If she could fly, she would visit all the countries in the world.)</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <AnswerButton text={answerOne} returnAnswer={(boolean) => setIsAnswerAChecked(boolean)}/>
                <AnswerButton text={answerTwo} returnAnswer={(boolean) => setIsAnswerBChecked(boolean)}/>
                <AnswerButton text={answerThree} returnAnswer={(boolean) => setIsAnswerCChecked(boolean)}/>
                <AnswerButton text={answerFour} returnAnswer={(boolean) => setIsAnswerDChecked(boolean)}/>
            </View>
          
        </ScrollView>


        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar  
          callbackButton={'checkAnswer'} 
          userAnswers={[isAnswerAChecked, isAnswerBChecked, isAnswerCChecked, isAnswerDChecked]} 
          correctAnswers={correctAnswers}
          answerBonus={answerBonus}
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
          linkNext={'Class2x5x7'}  //link to next screen
          linkPrevious={'Class2x5x5'} //link to previous screen
          correctMsg={`You’ve almost mastered that!`} //correct msg
          wrongMsg={'Argh!'} //wrong msg
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

export default Class2x5x6 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
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
  questionText: {
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginTop: 10,
    marginBottom: 40
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textBody: {
    fontSize: generalStyles.screenTextSizeSmallest,
    fontWeight: generalStyles.learningScreenTitleFontWeightMediumPlus,
    flexWrap: 'wrap'
  },
  textBold: {
    color: 'grey'
  },
  textColor: {
    color: '#6441A5',
  },
  
})