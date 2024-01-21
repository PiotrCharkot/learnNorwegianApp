import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 5; //screen numer


const Class6x5x5 = ({ route }) => { //name

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    
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
            <Text style={styles.text}>We can use both '<Text style={styles.textColor}>ingen</Text>' and '<Text style={styles.textColor}>ikke noen</Text>' (nobody/any) when we talk about persons and nouns that are masculine, feminine or plural:</Text>
          </View>



          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg har dessverre <Text style={styles.exampleTextSmallColor}>ikke noen</Text> penn.</Text>
            <Text style={styles.textSmall}>Unfortunately, I don't have any pen.</Text>
          </View>


          <View style={styles.textContainer}>
            <Text style={styles.text}>'<Text style={styles.textColor}>ikke noen</Text>' cannot come first in the sentence. Then we must use '<Text style={styles.textColor}>ingen</Text>':</Text>
          </View>



          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}><Text style={styles.exampleTextSmallColor}>Ingen</Text> er hjemme.</Text>
            <Text style={styles.textSmall}>Nobody is at home.</Text>
          </View>
          

          <View style={styles.textContainer}>
            <Text style={styles.text}>We cannot use '<Text style={styles.textColor}>ingen</Text>' in the sentence in the perfect tense or when we have modal verb. Then we must use '<Text style={styles.textColor}>ikke noen</Text>':</Text>
          </View>



          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg kan <Text style={styles.exampleTextSmallColor}>ikke</Text> se <Text style={styles.exampleTextSmallColor}>noen</Text>.</Text>
            <Text style={styles.textSmall}>I can't see anyone.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}>Hun har <Text style={styles.exampleTextSmallColor}>ikke</Text> funnet <Text style={styles.exampleTextSmallColor}>noen</Text> stoler.</Text>
            <Text style={styles.textSmall}>She hasn't found any chairs.</Text>
          </View>

            
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x5x6'} //link next screen 
          linkPrevious={'Class6x5x4'} // link previous screen
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

export default Class6x5x5 //name export 

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
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textInEgz: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
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
  questionText: {
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginVertical: 10,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
    width: '100%',
  },
  exampleContainer: {
    paddingHorizontal: generalStyles.paddingHorizontalEgzCont,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: 0,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleText: {
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textAlign: 'center',
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
  
})

