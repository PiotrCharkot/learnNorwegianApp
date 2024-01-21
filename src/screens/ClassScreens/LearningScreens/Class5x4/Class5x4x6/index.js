import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import AnswerButton from '../../../../../components/buttons/AnswerButton'
import generalStyles from '../../../../../styles/generalStyles';


const answerBonus = generalStyles.answerBonus;
const currentScreen = 6; //current screen
const answerOne = 'høyeste';  //answer a
const answerTwo = 'høy'; //answer b
const answerThree = 'høyest'; //answer c
const answerFour = 'høyere'; //answer d
const correctAnswers = [false, false, false, true];  //correct answer true or false


const Class5x4x6 = ({route}) => {  //name

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    const auth = getAuth();
    const user = auth.currentUser;
    
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
          setCurrentPoints(userPoints)
      }

        
    })

  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

            <View style={styles.topView}>
                <Text style={styles.questionText}>Choose correct form of adjective 'tall'.</Text>
                <Text style={styles.textBody}>Han er ______ enn sin bror.</Text>
                <Text style={styles.textBody}>He is taller than his brother.</Text>
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
          linkNext={'Class5x4x7'}  //link to next screen
          linkPrevious={'Class5x4x5'} //link to previous screen
          correctMsg={'Outstanding!'} //correct msg
          wrongMsg={'Oh shoot, that is wrong!'} //wrong msg
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

export default Class5x4x6 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
  },
  head: {},
  body: {
    height: '100%',
    width: '100%',
    marginTop: generalStyles.marginTopBody,
    marginBottom: generalStyles.marginBottomBody,
  },
  progressBarContainer: {
    width: '100%',
    position: 'absolute',
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
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
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
    color: generalStyles.colorText1,
  },
  
})