import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 7;  //current screen



const Class2x1x7 = ({route}) => { // name

  
    const {userPoints,  latestScreen, comeBackRoute, allScreensNum} = route.params
    
    

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


  return (
    <View style={styles.mainContainer}> 
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>If we have two verbs in a sentence, we connect them with <Text style={styles.boldText}>'å'</Text>. The second verb is always in the infinitive form.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg liker å lage mat.</Text>
            <Text style={styles.textSmall}>I like to cook.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg trenger å tjene penger.</Text>
            <Text style={styles.textSmall}>I need to earn money.</Text>
          </View>
          

          <View style={styles.textContainer}>
            <Text style={styles.text}>The exception is when the first verb is a <Text style={styles.boldText}>modal verb</Text> like <Text style={styles.textColor}>kan</Text> (can), <Text style={styles.textColor}>må</Text> (must), <Text style={styles.textColor}>vil</Text> (will), <Text style={styles.textColor}>bør</Text> (should).</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg kan snakke norsk.</Text>
            <Text style={styles.textSmall}>I can speak Norwegian.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Du bør dra tidlig.</Text>
            <Text style={styles.textSmall}>You should leave early.</Text>
          </View>
          

         
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class2x1x8'} //link to next screen
          linkPrevious={'Class2x1x6'}  //link to previous screen
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
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

export default Class2x1x7 //name for export

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
  textContainer: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20
  },
  textSmall: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textColor: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'green',
    fontWeight: '500'
  },
  textColor2: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'brown',
    fontWeight: '500'
  },  
  textColor3: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'salmon',
    fontWeight: '500'
  },  
  textColor4: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: '#999966',
    fontWeight: '500'
  },    
  textColor5: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: '#6770f0',
    fontWeight: '500'
  },  
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  exampleContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  exampleTextSmallColor: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    color: 'green'
  },
  exampleTextSmallColor2: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    color: 'brown'
  },
  exampleTextSmallColor3: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    color: 'salmon'
  },
  exampleTextSmallColor4: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    color: '#999966'
  },
  exampleTextSmallColor5: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    color: '#6770f0'
  },
  exampleText: {
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
  
})