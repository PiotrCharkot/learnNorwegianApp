import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 7;  //current screen



const Class6x2x7 = ({route}) => { // name

  
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
            <Text style={styles.text}>More examples of <Text style={styles.textColor}>possessive pronouns</Text>:</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>vår</Text> familie - our family</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>deres</Text> lærer - your teacher</Text>
            <Text style={styles.textSmall}>[masculine]</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>vårt</Text> hjem - our home</Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>deres</Text> forslag - their proposal</Text>
            <Text style={styles.textSmall}>[neuter]</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>våre</Text> bøker - our books</Text>  
            <Text style={styles.textSmall}><Text style={styles.exampleTextSmallColor}>deres</Text> hender - their hands</Text>  
            <Text style={styles.textSmall}>[plural]</Text>  
          </View>


          <View style={styles.textContainer}>
            <Text style={styles.text}>It is important to note that that <Text style={styles.textColor}>possessive pronouns</Text> can be before or after the noun.</Text>
          </View>
          


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}><Text style={styles.exampleTextSmallColor}>min</Text> stol</Text>
            <Text style={styles.exampleTextSmall}></Text>
            <Text style={styles.textSmall}>or</Text>
            <Text style={styles.exampleTextSmall}></Text>
            <Text style={styles.exampleTextSmall}>stolen <Text style={styles.exampleTextSmallColor}>min</Text></Text>
          </View>

        </ScrollView>

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x2x8'} //link to next screen
          linkPrevious={'Class6x2x6'}  //link to previous screen
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

export default Class6x2x7 //name for export

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