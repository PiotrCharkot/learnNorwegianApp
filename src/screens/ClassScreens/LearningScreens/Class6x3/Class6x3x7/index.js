import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 7; //screen numer


const Class6x3x7 = ({ route }) => { //name

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
            <Text style={styles.text}>We'll carry on with <Text style={styles.boldText}>når</Text>, <Text style={styles.boldText}>hvorfor</Text> and <Text style={styles.boldText}>hvordan</Text>:</Text>
          </View>


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>når (when)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Når kommer toget?</Text>
            <Text style={styles.textInEgz}>When does the train arrive?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Når har du bursdag?</Text>
            <Text style={styles.textInEgz}>When is your birthday?</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hvorfor (why)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvorfor gråter hun?</Text>
            <Text style={styles.textInEgz}>Why is she crying?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvorfor er du her?</Text>
            <Text style={styles.textInEgz}>Why are you here?</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hvordan (how)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvordan går det?</Text>
            <Text style={styles.textInEgz}>How are you doing?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvordan kommer jeg til stasjonen?</Text>
            <Text style={styles.textInEgz}>How do I get to the station?</Text>
          </View>

            
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x3x8'} //link next screen 
          linkPrevious={'Class6x3x6'} // link previous screen
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

export default Class6x3x7 //name export 

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
    color: generalStyles.colorText1,
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
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleText: {
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  exampleTextSmall: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
})

