import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from 'firebase/auth';
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 8;



const Class2x4x8 = ({route}) => {


    const auth = getAuth();
    const user = auth.currentUser;
  
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
           
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmallColor2}>Direct speech</Text>
            <Text style={styles.textSmall}>Han sa, "Jeg har spist frokost."</Text>
            <Text style={styles.textSmall}>(He said, "I have eaten breakfast.")</Text>
            <Text style={styles.exampleTextSmallColor}>Indirect speech</Text>
            <Text style={styles.textSmall}>Han sa at han hadde spist frokost.</Text>
            <Text style={styles.textSmall}>(He said that he had eaten breakfast.)</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>You know the drill. We changed "har" (have) into "hadde" (had) as we talked about information that we've recived in the past. {'\n\n'}We also turned "Jeg" (I) into "han" (he).</Text>
          </View>

        </ScrollView>
    

        <View style={styles.progressBarContainer}>

            <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
            <BottomBar 
            linkNext={'Class2x4x9'}
            linkPrevious={'Class2x4x7'} 
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

export default Class2x4x8

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
    color: 'darkred',
    fontWeight: '500'
  },
  boldText: {
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  textName: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: '600',
    color: '#cf5eff'
  },
  exampleContainer: {
    paddingBottom: 16,
    paddingHorizontal: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  exampleTextSmallColor: {
    fontSize: 20,
    fontWeight: generalStyles.exampleTextWeight,
    marginTop: 40,
    marginBottom: 10,
    color: '#6441A5'
},
exampleTextSmallColor2: {
    fontSize: 20,
    fontWeight: generalStyles.exampleTextWeight,
    marginTop: 20,
    marginBottom: 10,
    color: 'darkred'
  },
  exampleText: {
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
  
})