import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 10; //current screen


const totalPoints = 0 * generalStyles.answerBonus + currentScreen * generalStyles.screenBonus;
const dataForMarkers = {
    part: 'learning',
    section: 'section7',
    class: 4
  }


const Class7x5x10 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

   


    const playSound = async (soundLink) => {
        
      const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: soundLink },  //link to sound file
          { shouldPlay: true }
        );
    }

    
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

          <View style={styles.textContainer}>
              <Text style={styles.text}>One of the easiest ways to get the hang of intonation and stress is to imitate native speakers. {'\n\n'}Watch Norwegian TV shows, listen to podcasts, pay attention in everyday conversations or just use the listening exercise in our app in the exercise section. {'\n\n'}Try to copy the ups and downs of pitch, even if it feels exaggerated at first. {'\n\n'}If you listen carefully to native speakers and do a bit of practice, you’ll start picking up these patterns naturally. {'\n\n'}Good luck!</Text>
          </View>

          

          




        </ScrollView>
    
        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar  
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
          linkNext={'ExitExcScreen'} //link next
          linkPrevious={'Class7x5x9'} //link previous
          userPoints={currentPoints}
          latestScreen={latestScreenDone}
          currentScreen={currentScreen}
          comeBack={comeBack}
          allScreensNum={allScreensNum}
          learningLastScreenNoQuestion={true}
          totalPoints={totalPoints}
          dataForMarkers={dataForMarkers}
          savedLang={savedLang}
          />
        </View>
    </View>
  )
}

export default Class7x5x10 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: generalStyles.backgroundColorLearnScreen
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
  textContainer: {
    marginTop: generalStyles.marginTopTextCont,
    marginBottom: generalStyles.marginBottomTextCont,
    marginHorizontal: generalStyles.marginHorizontalTextCont
  },
  questionText: {
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginVertical: 10,
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textColor: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: generalStyles.colorText1,
    fontWeight: generalStyles.textColorFontWeight
  },
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
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
  exampleContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: generalStyles.marginVerticalEgzCont,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center'
  },
  exampleTextTrans: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  exampleTextColor: {
    fontSize: 22,
    fontWeight: '600',
    color: generalStyles.colorText
  },
  pictureContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  pictureSound: {
    height: 40,
    width: 40,
    tintColor: generalStyles.colorText2
  },
  pictureSoundInContainer: {
    position: 'absolute',
    right: 10,
    height: 20,
    width: 20,
    tintColor: generalStyles.colorText2
  }
  
})