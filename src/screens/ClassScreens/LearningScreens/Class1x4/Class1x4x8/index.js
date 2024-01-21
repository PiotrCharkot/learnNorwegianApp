import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 8; //screen number



const Class1x4x8 = ({route}) => {  //screen name

  
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
            <Text style={{...styles.text , fontSize: 20, fontWeight: '600', color: '#6441A5'}}>Group four:</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>These verbs end in vowels like: -u, -o, -e, -ø. {'\n\n\n'}They get the <Text style={styles.textColor}>-dd</Text> ending:{'\n'}</Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>å bety<Text style={styles.textSmall}> - bety<Text style={styles.textColor}>dd</Text></Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>å tro<Text style={styles.textSmall}> - tro<Text style={styles.textColor}>dd</Text></Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>å snø<Text style={styles.textSmall}> - snø<Text style={styles.textColor}>dd</Text></Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>å oppnå<Text style={styles.textSmall}> - oppnå<Text style={styles.textColor}>dd</Text></Text></Text>
          </View>
          
        </ScrollView>
    

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class1x4x9'} //link next
          linkPrevious={'Class1x4x7'}  //link previous
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

export default Class1x4x8 //name for export

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
    marginBottom: 0,
    marginHorizontal: 20
  },
  textSmall: {
    fontSize: generalStyles.screenTextSizeSmall,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textColor: {
    color: '#6441A5',
  },
  exampleContainer: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: 6
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
  
})