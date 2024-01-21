import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3;  //current screen



const Class4x2x3 = ({route}) => { // name

  
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
            <Text style={styles.text}>If we want to make plural form for masculine nouns that end on '<Text style={styles.textColor}>-er</Text>', we will just add ending '<Text style={styles.textColor1}>-e</Text>' for indefinite nouns or '<Text style={styles.textColor1}>-ne</Text>' for definite nouns. {'\n\n'}For these nouns in neuter form we will drop '<Text style={styles.textColor2}>e</Text>' from last syllable and add '<Text style={styles.textColor1}>-e</Text>' and '<Text style={styles.textColor1}>-ene</Text>'.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>en lærer (a teacher)</Text>
            <Text style={styles.textSmall}>indefinite plural: lærer<Text style={styles.textSmallColor}>e</Text></Text>
            <Text style={styles.textSmall}>definite plural: lærer<Text style={styles.textSmallColor}>ne</Text></Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>en kalender (a calendar)</Text>
            <Text style={styles.textSmall}>indefinite plural: kalender<Text style={styles.textSmallColor}>e</Text></Text>
            <Text style={styles.textSmall}>definite plural: kalender<Text style={styles.textSmallColor}>ne</Text></Text>
          </View>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>et lag<Text style={styles.exampleTextSmallColor}>e</Text>r (a storage)</Text>
            <Text style={styles.textSmall}>indefinite plural: lagr<Text style={styles.textSmallColor}>e</Text></Text>
            <Text style={styles.textSmall}>definite plural: lagr<Text style={styles.textSmallColor}>ene</Text></Text>
          </View>

        </ScrollView>

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class4x2x4'} //link to next screen
          linkPrevious={'Class4x2x2'}  //link to previous screen
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

export default Class4x2x3 //name for export

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
  textContainer: {
    marginTop: generalStyles.marginTopTextCont,
    marginBottom: generalStyles.marginBottomTextCont,
    marginHorizontal: generalStyles.marginHorizontalTextCont
  },
  textSmall: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
  },
  textSmallColor: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
    color: generalStyles.colorText,
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
  textColor1: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: generalStyles.colorText,
    fontWeight: generalStyles.textColorFontWeight
  },  
  textColor2: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'darkred',
    fontWeight: generalStyles.textColorFontWeight
  },  
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  exampleContainer: {
    paddingHorizontal: generalStyles.paddingHorizontalEgzCont,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: generalStyles.marginVerticalEgzCont,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
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
    bottom: generalStyles.bottomBarDistFromBottom,
    width: '100%',
  },
  
  
})