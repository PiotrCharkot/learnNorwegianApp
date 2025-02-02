import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 6; //current screen


const Class7x4x6 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const soundA = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILhalv.mp3?alt=media&token=8daac10e-936d-469e-8baf-b2dfd85240e1';


    const soundB = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILselv.mp3?alt=media&token=482f516c-dee1-4259-8b40-e3870819216e';


    const soundC = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILsoolv.mp3?alt=media&token=a63fc1d6-c5cb-4f09-82eb-cc2ea04886c7';
    
    
    const soundD = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILtolv2.mp3?alt=media&token=5a474bd4-4ba4-4e06-8f6a-04aee56e21fc';



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
              <Text style={styles.text}>Lastly, let's look at the letter "<Text style={styles.textColor}>v</Text>". It is silent at the end of some words. Let's look at some examples.</Text>
          </View>

          


          <TouchableOpacity onPress={() => {playSound(soundA)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>hal<Text style={styles.exampleTextColor}>v</Text> - <Text style={styles.exampleTextTrans}>/hal:/</Text></Text>
                <Text style={styles.exampleTextTrans}>half</Text>
            </View>
          </TouchableOpacity>

          
            


          <TouchableOpacity onPress={() => {playSound(soundB)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>sel<Text style={styles.exampleTextColor}>v</Text> - <Text style={styles.exampleTextTrans}>/sel:/</Text></Text>
                <Text style={styles.exampleTextTrans}>self</Text>
            </View>
          </TouchableOpacity>




          <TouchableOpacity onPress={() => {playSound(soundC)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>søl<Text style={styles.exampleTextColor}>v</Text> - <Text style={styles.exampleTextTrans}>/søl:/</Text></Text>
                <Text style={styles.exampleTextTrans}>silver</Text>
            </View>
          </TouchableOpacity>



          <TouchableOpacity onPress={() => {playSound(soundD)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>tol<Text style={styles.exampleTextColor}>v</Text> - <Text style={styles.exampleTextTrans}>/tål:/</Text></Text>
                <Text style={styles.exampleTextTrans}>twelve</Text>
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
          linkNext={'Class7x4x7'} //link next
          linkPrevious={'Class7x4x5'} //link previous
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

export default Class7x4x6 //name for export

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