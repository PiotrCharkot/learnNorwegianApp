import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 8; //screen numer


const Class6x3x8 = ({ route }) => { //name

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
            <Text style={styles.text}>Last <Text style={styles.textColor}>question word</Text> is sort of special case. It 'agrees' with gender of a noun. It is '<Text style={styles.boldText}>hvilken</Text>' for masculine and feminine nouns. '<Text style={styles.boldText}>hvilket</Text>' is used for neuter nouns and '<Text style={styles.boldText}>hvilke</Text>' is for plural nouns:</Text>
          </View>


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>hvilken/hvilket/hvilke (which)</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvilken bok vil du lese?</Text>
            <Text style={styles.textInEgz}>Which book do you want to read?</Text>
            <Text style={styles.textInEgz}>[masculine/feminine]</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvilket eple er søtest?</Text>
            <Text style={styles.textInEgz}>Which apple is the sweetest?</Text>
            <Text style={styles.textInEgz}>[neuter]</Text>
            <Text style={styles.textInEgz}></Text>
            <Text style={styles.exampleTextSmall}>Hvilke sko skal jeg ta på?</Text>
            <Text style={styles.textInEgz}>Which shoes should I put on?</Text>
            <Text style={styles.textInEgz}>[plural]</Text>
          </View>

          

            
        </ScrollView>
    

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class6x3x9'} //link next screen 
          linkPrevious={'Class6x3x7'} // link previous screen
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

export default Class6x3x8 //name export 

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

