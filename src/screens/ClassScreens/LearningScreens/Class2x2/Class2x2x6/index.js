import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 6;



const Class2x2x6 = ({route}) => {

  
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
            <Text style={styles.text}>Let's have look on how to create negative sentence. {'\n\n'}As to do that we usually add the word <Text style={styles.textColor}>'ikke'</Text> (not) after the verb. The word <Text style={styles.textColor}>'ikke'</Text> negates the action or state expressed by the verb. Here are some examples:</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.textSmall}>Jeg spiser epler.</Text>
            <Text style={styles.exampleTextSmall}>Jeg spiser <Text style={styles.exampleTextSmallColor}>ikke</Text> epler.</Text>
            <Text style={styles.textSmall}>(I don't eat apples.)</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.textSmall}>Hun jobber i dag.</Text>
            <Text style={styles.exampleTextSmall}>Hun jobber <Text style={styles.exampleTextSmallColor}>ikke</Text> i dag.</Text>
            <Text style={styles.textSmall}>(She is not working today.)</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.textSmall}>De bor i Oslo.</Text>
            <Text style={styles.exampleTextSmall}>De bor <Text style={styles.exampleTextSmallColor}>ikke</Text> i Oslo.</Text>
            <Text style={styles.textSmall}>(They don't live in Oslo.)</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.textSmall}>Vi skal reise til Spania.</Text>
            <Text style={styles.exampleTextSmall}>Vi skal <Text style={styles.exampleTextSmallColor}>ikke</Text> reise til Spania.</Text>
            <Text style={styles.textSmall}>(We will not travel to Spain.)</Text>
          </View>

        </ScrollView>
    
        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class2x2x7'}
          linkPrevious={'Class2x2x5'} 
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

export default Class2x2x6

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
    color: 'darkred',
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
    marginVertical: 12,
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
    color: 'darkred'
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