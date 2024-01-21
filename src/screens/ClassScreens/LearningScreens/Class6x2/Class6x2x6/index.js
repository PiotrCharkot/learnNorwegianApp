import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 6;  //current screen



const Class6x2x6 = ({route}) => { // name

  
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
            <Text style={styles.text}>You can see there are two forms to choose from (e.g. <Text style={styles.textColor}>hans</Text>/<Text style={styles.textColor}>sin</Text>) in third person (<Text style={styles.boldText}>han</Text>, <Text style={styles.boldText}>hun</Text>, <Text style={styles.boldText}>det</Text> or plural <Text style={styles.boldText}>de</Text>). {'\n\n'}We use form <Text style={styles.textColor}>sin</Text>/<Text style={styles.textColor}>sitt</Text>/<Text style={styles.textColor}>sine</Text> when we want to emphasize that object belongs to person in the sentence.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Lill kysser kjæresten <Text style={styles.exampleTextSmallColor}>sin</Text>.</Text>
            <Text style={styles.textSmall}>Lill kisses her <Text style={styles.textUnderline}>own</Text> boyfriend.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}>Lill kysser kjæresten <Text style={styles.exampleTextSmallColor}>hennes</Text>.</Text>
            <Text style={styles.textSmall}>Lill kisses her boyfriend.</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Ole malte huset <Text style={styles.exampleTextSmallColor}>sitt</Text>.</Text>
            <Text style={styles.textSmall}>Ole painted his <Text style={styles.textUnderline}>own</Text> house.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}>Ole malte huset <Text style={styles.exampleTextSmallColor}>hans</Text>.</Text>
            <Text style={styles.textSmall}>Ole painted his house.</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>In the second case we indicate that Lill kissed somebody's else boyfriend and Ole painted somebody's else house.</Text>
          </View>

        </ScrollView>

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x2x7'} //link to next screen
          linkPrevious={'Class6x2x5'}  //link to previous screen
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

export default Class6x2x6 //name for export

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
    color: generalStyles.colorText,
    fontWeight: generalStyles.textColorFontWeight
  },  
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  textUnderline: {
    textDecorationLine: 'underline',
    textDecorationColor: 'darkred', 
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