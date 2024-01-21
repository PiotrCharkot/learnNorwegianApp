import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 1;   //current screen
const allScreensNum = 9;   //screens number

const Class3x4x1 = ({route}) => {   //name 

  const auth = getAuth();
  const user = auth.currentUser;


  const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [comeBack, setComeBack] = useState(false);



  useFocusEffect(() => {
    if (route.params) {
      const {userPoints, latestScreen, comeBackRoute} = route.params;
      
      if (latestScreen > currentScreen) {
        setLatestScreenDone(latestScreen);
        setComeBack(true)
      } 

      if (route.params.userPoints > 0) {
        setCurrentPoints(userPoints)
    }
    }
    
  })


  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.topView}>
            <Text style={styles.title}>S-verbs - S-verb</Text>
          </View>

          <View style={styles.middleView}>
            <Text style={styles.textGreeting}>
            God dag{user.isAnonymous ? <Text style={styles.textName}></Text> : <Text style={styles.textName}> {user.displayName}</Text>}!
            </Text>
            <Text style={styles.text}><Text style={styles.textColor}>S-verbs</Text> in Norwegian are verbs that end with <Text style={styles.boldText}>-s</Text> in their infinitive and conjugated forms. These verbs can have different functions and meanings. {'\n\n'}Here is an explanation and examples for some of the mentioned verbs.
            </Text>

            
          </View>
        </ScrollView>
    
        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBack}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class3x4x2'} //link to next screen
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
          isFirstScreen={true}
          userPoints={currentPoints}
          latestScreen={latestScreenDone}
          currentScreen={currentScreen}
          comeBack={comeBack}
          allScreensNum={allScreensNum}
          />
        </View>
    </View>
  )
}

export default Class3x4x1 // name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: generalStyles.backgroundColorLearnScreen
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
    marginHorizontal: 20,
  },
  middleView: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
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
    color: '#6441A5',
    fontWeight: '500'
  },
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  textGreeting: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    marginBottom: 20
  },
  textName: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: '600',
    color: '#cf5eff'
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
})