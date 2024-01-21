import {View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import Draggable from '../../../../../components/other/Draggable'
import generalStyles from '../../../../../styles/generalStyles';


const currentScreen = 9; //screen numer


const Class2x3x9 = ({ route }) => { //name


    const auth = getAuth();
    const user = auth.currentUser;

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
            <Text style={styles.text}>Let's see some other examples.</Text>
          </View>

          

          <View style={styles.exampleContainer}>
          <Text style={{...styles.exampleText, color: '#6441A5', fontSize: 18, marginBottom: 10}}>Du kan låne boken min, hvis du ikke finner den på biblioteket.</Text>
            <Text style={{...styles.exampleText, color: 'green'}}>Main clause</Text>
            <Text style={styles.textInEgz}>Du kan låne boken min</Text>
            <Text style={styles.textInEgz}>(You can borrow my book)</Text>
            <Text style={styles.textColor3}>+</Text>
            <Text style={{...styles.exampleText, color: 'darkred'}}>Subordinate clause</Text>
            <Text style={styles.textInEgz}>hvis du <Text style={styles.textColor4}>ikke</Text> <Text style={styles.boldText}>finner</Text> den på biblioteket</Text>
            <Text style={styles.textInEgz}>(if you don't find it at the library)</Text>
          </View>


          <View style={styles.exampleContainer}>
          <Text style={{...styles.exampleText, color: '#6441A5', fontSize: 18, marginBottom: 10}}>Han besto eksamen, selv om han ikke studerte mye.</Text>
            <Text style={{...styles.exampleText, color: 'green'}}>Main clause</Text>
            <Text style={styles.textInEgz}>Han besto eksamen</Text>
            <Text style={styles.textInEgz}>(He passed the exam)</Text>
            <Text style={styles.textColor3}>+</Text>
            <Text style={{...styles.exampleText, color: 'darkred'}}>Subordinate clause</Text>
            <Text style={styles.textInEgz}>selv om han <Text style={styles.textColor4}>ikke</Text> <Text style={styles.boldText}>studerte</Text> mye</Text>
            <Text style={styles.textInEgz}>(even though he didn't study much)</Text>
          </View>
            
        </ScrollView>

        <View style={styles.progressBarContainer}>

            <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
            <BottomBar 
            linkNext={'Class2x3x10'} //link next screen 
            linkPrevious={'Class2x3x8'} // link previous screen
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

export default Class2x3x9 //name export 

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
    marginBottom: 10,
    marginHorizontal: 20
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
    color: 'green',
    fontWeight: '500'
  },
  textColor2: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'darkred',
    fontWeight: '500'
  },
  textColor3: {
    fontSize: 20,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'white',
    fontWeight: '500'
  },
  textColor4: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'salmon',
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
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  
})

