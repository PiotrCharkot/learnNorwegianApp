import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3;  //current screen



const Class6x2x3 = ({route}) => { // name

  
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
            <Text style={styles.text}>We'll carry on with <Text style={styles.textColor}>possessive pronouns</Text> for <Text style={styles.boldText}>han</Text>, <Text style={styles.boldText}>hun</Text> and <Text style={styles.boldText}>det</Text>:</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>han</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hans</Text> / <Text style={styles.exampleTextSmallColor}>sin</Text> - [masculine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hans</Text> / <Text style={styles.exampleTextSmallColor}>si</Text> - [feminine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hans</Text> / <Text style={styles.exampleTextSmallColor}>sitt</Text> - [neuter]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hans</Text> / <Text style={styles.exampleTextSmallColor}>sine</Text> - [plural]</Text>  
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>hun</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hennes</Text> / <Text style={styles.exampleTextSmallColor}>sin</Text> - [masculine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hennes</Text> / <Text style={styles.exampleTextSmallColor}>si</Text> - [feminine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hennes</Text> / <Text style={styles.exampleTextSmallColor}>sitt</Text> - [neuter]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>hennes</Text> / <Text style={styles.exampleTextSmallColor}>sine</Text> - [plural]</Text>  
          </View>


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>det</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>dens</Text> / <Text style={styles.exampleTextSmallColor}>sin</Text> - [masculine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>dens</Text> / <Text style={styles.exampleTextSmallColor}>si</Text> - [feminine]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>dets</Text> / <Text style={styles.exampleTextSmallColor}>sitt</Text> - [neuter]</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>dens</Text> / <Text style={styles.exampleTextSmallColor}>sine</Text> - [plural]</Text>  
          </View>

        </ScrollView>

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x2x4'} //link to next screen
          linkPrevious={'Class6x2x2'}  //link to previous screen
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

export default Class6x2x3 //name for export

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
    color: generalStyles.colorText
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