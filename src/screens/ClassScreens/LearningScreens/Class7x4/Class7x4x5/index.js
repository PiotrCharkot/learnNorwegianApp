import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 5; //current screen


const Class7x4x5 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const soundA = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILbillig.mp3?alt=media&token=27b90566-4edb-4e7c-a4f3-59478d532b90';


    const soundB = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILfoolge.mp3?alt=media&token=cbce8125-6de2-44b6-85e2-6101ee60c25e';


    const soundC = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILrettferdig.mp3?alt=media&token=1903262e-ae0b-40e0-9914-9781e4c054b7';
    
    
    const soundD = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILselge.mp3?alt=media&token=751a7097-81f6-4f1c-8e71-2b58923fc5c2';



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
              <Text style={styles.text}>The letter "<Text style={styles.textColor}>g</Text>" is silent at the end of "og" and as well as at the end of adjectives ending in -ig and some words ending in -ge.</Text>
          </View>

          


          <TouchableOpacity onPress={() => {playSound(soundA)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>billi<Text style={styles.exampleTextColor}>g</Text> - <Text style={styles.exampleTextTrans}>/ˈbɪlːɪ/</Text></Text>
                <Text style={styles.exampleTextTrans}>cheap</Text>
            </View>
          </TouchableOpacity>

          
            


          <TouchableOpacity onPress={() => {playSound(soundB)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>å føl<Text style={styles.exampleTextColor}>g</Text>e - <Text style={styles.exampleTextTrans}>/fø`l:ə/</Text></Text>
                <Text style={styles.exampleTextTrans}>to follow</Text>
            </View>
          </TouchableOpacity>




          <TouchableOpacity onPress={() => {playSound(soundC)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>rettferdi<Text style={styles.exampleTextColor}>g</Text> - <Text style={styles.exampleTextTrans}>/ˈrɛtːfærdi/</Text></Text>
                <Text style={styles.exampleTextTrans}>fair</Text>
            </View>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => {playSound(soundD)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>å sel<Text style={styles.exampleTextColor}>g</Text>e - <Text style={styles.exampleTextTrans}>/se`l:ə/</Text></Text>
                <Text style={styles.exampleTextTrans}>to sell</Text>
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
          linkNext={'Class7x4x6'} //link next
          linkPrevious={'Class7x4x4'} //link previous
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

export default Class7x4x5 //name for export

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
  textUnderline: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    textDecorationLine: 'underline'
  },
  textColor: {
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: 'grey',
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
    color: '#595959'
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