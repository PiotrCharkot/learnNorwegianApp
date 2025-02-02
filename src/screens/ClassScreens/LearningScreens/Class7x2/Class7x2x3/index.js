import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3; //current screen


const Class7x2x3 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const soundA = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FVKortEhest.mp3?alt=media&token=9cda2be2-b23e-424d-8697-16858190d924';


    const soundB = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FVKortEsentenceHest.mp3?alt=media&token=bffaa2f0-2e1a-4211-8550-3e814310ad71';


    const soundC = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FVLangEse.mp3?alt=media&token=1b362c63-0416-4895-abbe-b4c01a01c677';


    const soundD = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FVLangEsentence.mp3?alt=media&token=b269fe12-dff7-402b-b9e4-6dcc173b04dc';


    const playSound = async (soundLink) => {
        
      const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: soundLink },  //link to sound file
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
              <Text style={styles.text}>Next we'll have a look at short vowel "<Text style={styles.textColor}>e</Text>" in word "en hest" and long "<Text style={styles.textColor}>e</Text>" in "å se"</Text>
          </View>

          <TouchableOpacity onPress={() => {playSound(soundA)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>en h<Text style={styles.exampleTextColor}>e</Text>st - <Text style={styles.exampleTextTrans}>/hɛst/</Text></Text>
                <Text style={styles.exampleTextTrans}>a horse</Text>
            </View>
          </TouchableOpacity>

         


          <TouchableOpacity onPress={() => {playSound(soundB)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>Hesten er i stallen.</Text>
                <Text style={styles.exampleTextTrans}>The horse is in the stable.</Text>
            </View>
          </TouchableOpacity>

          
            


          <TouchableOpacity onPress={() => {playSound(soundC)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>å s<Text style={styles.exampleTextColor}>e</Text> - <Text style={styles.exampleTextTrans}>/seː/</Text></Text>
                <Text style={styles.exampleTextTrans}>to see</Text>
            </View>
          </TouchableOpacity>




                    
            <TouchableOpacity onPress={() => {playSound(soundD)}}>
                <View style={styles.exampleContainer}>
                    <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                    <Text style={styles.exampleText}>Jeg vil se en film.</Text>
                    <Text style={styles.exampleTextTrans}>I want to watch a movie.</Text>
                </View>
            </TouchableOpacity>
          
        </ScrollView>
    
        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar  
          buttonWidth={generalStyles.buttonNextPrevSize}
          buttonHeight={generalStyles.buttonNextPrevSize}
          linkNext={'Class7x2x4'} //link next
          linkPrevious={'Class7x2x2'} //link previous
          userPoints={currentPoints}
          latestScreen={latestScreenDone}
          currentScreen={currentScreen}
          comeBack={comeBack}
          allScreensNum={allScreensNum}
          savedLang={savedLang}
          />
        </View>
    </View>
  )
}

export default Class7x2x3 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: generalStyles.backgroundColorLearnScreen
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
    color: generalStyles.colorText1,
    fontWeight: generalStyles.textColorFontWeight
  },
  boldText: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeight
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
    width: '100%',
  },
  exampleContainer: {
    paddingRight: 30,
    paddingLeft: 30,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: generalStyles.marginVerticalEgzCont,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center'
  },
  exampleTextTrans: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  exampleTextColor: {
    fontSize: 22,
    fontWeight: '600',
    color: generalStyles.colorText
  },
  pictureContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  pictureSound: {
    height: 40,
    width: 40,
    tintColor: generalStyles.colorText2
  },
  pictureSoundInContainer: {
    position: 'absolute',
    right: 10,
    height: 20,
    width: 20,
    tintColor: generalStyles.colorText2
  }
  
})