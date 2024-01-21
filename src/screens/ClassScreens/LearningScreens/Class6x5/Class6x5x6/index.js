import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 6; //screen numer


const Class6x5x6 = ({ route }) => { //name

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
            <Text style={styles.text}>We use both '<Text style={styles.textColor}>ingenting</Text>' and '<Text style={styles.textColor}>ikke noe</Text>' (nothing/anything) when we have no concrete reference and when we are talking about nouns that are neuter, singular:</Text>
          </View>



          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg kjøpte <Text style={styles.exampleTextSmallColor}>ikke noe</Text>.</Text>
            <Text style={styles.textSmall}>I didn't buy anything.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}><Text style={styles.exampleTextSmallColor}>Ingenting</Text> er dyrt i denne butikken.</Text>
            <Text style={styles.textSmall}>Nothing is expensive in this store.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}><Text style={styles.exampleTextSmallColor}>Ikke noe</Text> var igjen på tallerkenen.</Text>
            <Text style={styles.textSmall}>Nothing was left on the plate.</Text>
          </View>


          <View style={styles.textContainer}>
            <Text style={styles.text}>We must use '<Text style={styles.textColor}>ikke noe</Text>' in the perfect tense and when we have modal verbs:</Text>
          </View>



          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Jeg har <Text style={styles.exampleTextSmallColor}>ikke</Text> kjøpt <Text style={styles.exampleTextSmallColor}>noe</Text>.</Text>
            <Text style={styles.textSmall}>I haven't bought anything.</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.exampleTextSmall}>Jeg skal <Text style={styles.exampleTextSmallColor}>ikke</Text> kjøpe <Text style={styles.exampleTextSmallColor}>noe</Text>.</Text>
            <Text style={styles.textSmall}>I'm not going to buy anything.</Text>
          </View>
          

            
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x5x7'} //link next screen 
          linkPrevious={'Class6x5x5'} // link previous screen
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

export default Class6x5x6 //name export 

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

