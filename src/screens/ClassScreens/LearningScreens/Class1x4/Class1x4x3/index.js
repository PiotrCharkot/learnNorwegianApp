import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3; //current screen


const Class1x4x3 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);


    const playSound = async () => {
        
      const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2Fhar.mp3?alt=media&token=ba8d4cf1-6fa6-4433-a0d0-bff619f089f5' },  //link to sound file
          { shouldPlay: true }
        );
  }

    
    useFocusEffect(() => {
        
      if (latestScreen > currentScreen) {
          setLatestScreenDone(latestScreen);
          setComeBack(true);
      }

      if (route.params.userPoints > 0) {
          
          setCurrentPoints(userPoints)
      }

    })

  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

          <View style={styles.textContainer}>
              <Text style={styles.text}>Verb <Text style={styles.textColor}>har</Text> is always the same. For every object like jeg, du, hun, det it is in form: </Text>
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleText}>har</Text>
          </View>

          <View style={styles.textContainer}>
              <Text style={styles.text}>Get a feel for the 'har' sound:</Text>
          </View>

          <View style={styles.pictureContainer}>
            <TouchableOpacity onPress={playSound}>
              <Image style={styles.pictureSound} source={require('../../../../../../assets/volume.png')} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.textContainer}>
              <Text style={styles.text}>Let's have a look now on <Text style={styles.boldText}>regular</Text> and <Text style={styles.boldText}>irregular</Text> verbs in present perfect.</Text>
          </View>
        </ScrollView>


        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>
    

        <View style={styles.bottomBarContainer}>
          <BottomBar  
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
          linkNext={'Class1x4x4'} //link next
          linkPrevious={'Class1x4x2'} //link previous
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

export default Class1x4x3 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: generalStyles.backgroundColorLearnScreen
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
  textContainer: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20
  },
  questionText: {
    fontSize: generalStyles.learningScreenTitleSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight,
    marginVertical: 10,
  },
  text: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
  },
  textColor: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: '#6441A5',
    fontWeight: '500'
  },
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: '700'
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
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
    fontSize: generalStyles.exampleTextSize,
    fontWeight: generalStyles.exampleTextWeight,
  },
  pictureContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureSound: {
    height: 100,
    width: 100,
    tintColor: 'purple'
  }
  
})