import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 2; //screen numer


const Class2x1x2 = ({ route }) => { //name

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
            console.log('setting new points', route.params.userPoints );
            setCurrentPoints(userPoints)
        }

        
    })

    


    

  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Let's explore some examples to illustrate the affirmative word order:</Text>
          </View>

          

          <View style={styles.exampleContainer}>
          <Text style={{...styles.exampleText, color: '#6441A5', fontSize: 18, marginBottom: 10}}>Hun spiser epler.</Text>
            <Text style={styles.exampleText}>Subject</Text>
            <Text style={styles.text}>Hun (She)</Text>
            <Text style={styles.textColor}>+</Text>
            <Text style={styles.exampleText}>Verb</Text>
            <Text style={styles.text}>spiser (eats)</Text>
            <Text style={styles.textColor}>+</Text>
            <Text style={styles.exampleText}>Object</Text>
            <Text style={styles.text}>epler (apples)</Text>
          </View>

          <View style={styles.exampleContainer}>
          <Text style={{...styles.exampleText, color: '#6441A5', fontSize: 18, marginBottom: 10}}>De reiser til Spania.</Text>
            <Text style={styles.exampleText}>Subject</Text>
            <Text style={styles.text}>De (They)</Text>
            <Text style={styles.textColor}>+</Text>
            <Text style={styles.exampleText}>Verb</Text>
            <Text style={styles.text}>reiser (travel)</Text>
            <Text style={styles.textColor}>+</Text>
            <Text style={styles.exampleText}>Object</Text>
            <Text style={styles.text}>til Spania (to Spain)</Text>
          </View>
          

          

            
        </ScrollView>
    
        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class2x1x3'} //link next screen 
          linkPrevious={'Class2x1x1'} // link previous screen
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

export default Class2x1x2 //name export 

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
    marginBottom: 20,
    marginHorizontal: 20
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textColor: {
    fontSize: 20,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'white',
    fontWeight: '500'
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
    bottom: 0,
    width: '100%',
  },
  exampleContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.exampleTextWeight,
  },
  
})

