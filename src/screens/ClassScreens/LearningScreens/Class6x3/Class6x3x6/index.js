import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 6; //screen numer


const Class6x3x6 = ({ route }) => { //name

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
            <Text style={styles.text}>Let's start with <Text style={styles.boldText}>hvem</Text>, <Text style={styles.boldText}>hva</Text> and <Text style={styles.boldText}>hvor</Text>:</Text>
          </View>


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hvem (who)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvem er han?</Text>
            <Text style={styles.textInEgz}>Who is he?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvem har tatt boken min?</Text>
            <Text style={styles.textInEgz}>Who took my book?</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hva (what)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hva spiser du?</Text>
            <Text style={styles.textInEgz}>What are you eating?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hva heter du?</Text>
            <Text style={styles.textInEgz}>What is your name?</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hvor (where)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvor bor du?</Text>
            <Text style={styles.textInEgz}>Where do you live?</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvor er nøklene mine?</Text>
            <Text style={styles.textInEgz}>Where are my keys?</Text>
          </View>

            
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x3x7'} //link next screen 
          linkPrevious={'Class6x3x5'} // link previous screen
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

export default Class6x3x6 //name export 

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

