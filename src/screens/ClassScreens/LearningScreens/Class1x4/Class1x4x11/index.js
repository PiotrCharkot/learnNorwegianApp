import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 11; //current screen 



const Class1x4x11 = ({route}) => {  //name 

  
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
            <Text style={styles.text}>You can use the present perfect tense in Norwegian in the following situations:</Text>
            <Text style={styles.text}></Text>


            

          </View>


            <Text style={{...styles.textSmall, marginHorizontal: 20, marginTop: 8}}> - to describe past actions with present relevance,</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Han har arbeidet hele dagen.</Text>
            <Text style={styles.exampleTextSmallThin}>He has worked all day.</Text>
          </View>

            <Text style={{...styles.textSmall, marginHorizontal: 20, marginTop: 8}}> - to describe experiences or accomplishments with no specific time,</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg har besøkt Paris.</Text>
            <Text style={styles.exampleTextSmallThin}>I have visited Paris.</Text>
          </View>

            <Text style={{...styles.textSmall, marginHorizontal: 20, marginTop: 8}}> - to describe actions that started in the past and continue up to the present,</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>De har bodd her i ti år.</Text>
            <Text style={styles.exampleTextSmallThin}>They have lived here for ten years.</Text>
          </View>

            <Text style={{...styles.textSmall, marginHorizontal: 20, marginTop: 8}}> - to describe actions that have been repeated up to the present,</Text>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Hun har lest boka flere ganger.</Text>
            <Text style={styles.exampleTextSmallThin}>She has read the book several times.</Text>
          </View>
        </ScrollView>


        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>
    

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class1x4x12'} //link next sceen
          linkPrevious={'Class1x4x10'} //link previous screen 
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

export default Class1x4x11 //link last screen

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
    marginBottom: 0,
    marginHorizontal: 20
  },
  textSmall: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  exampleContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  exampleText: {
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
  },
  exampleTextSmallThin: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },


})