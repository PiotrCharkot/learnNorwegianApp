import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3; //current screen


const Class7x4x3 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const soundA = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILhvorfor.mp3?alt=media&token=49f1dd23-8dc8-4441-9d3e-9e44e2dc5911';


    const soundB = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILhjerte.mp3?alt=media&token=b1e4abdd-67e1-4bda-95fc-0eafd1753af2';


    const soundC = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILhjem.mp3?alt=media&token=8bfd27ec-c1e4-464c-983d-a8ad7b532a05';
    
    
    const soundD = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FSTILhjul.mp3?alt=media&token=7c152163-3b09-4bcb-abee-189d06cf9dba';


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
              <Text style={styles.text}>The “<Text style={styles.textColor}>h</Text>” is silent at the beginning of question words (hva, hvem, hvor etc.) and at the beginning of many other words.</Text>
          </View>

          


          <TouchableOpacity onPress={() => {playSound(soundA)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}><Text style={styles.exampleTextColor}>h</Text>vorfor - <Text style={styles.exampleTextTrans}>/ʋʊrˌfɔr/</Text></Text>
                <Text style={styles.exampleTextTrans}>why</Text>
            </View>
          </TouchableOpacity>

          
            


          <TouchableOpacity onPress={() => {playSound(soundB)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>et <Text style={styles.exampleTextColor}>h</Text>jerte - <Text style={styles.exampleTextTrans}>/jæʈə/</Text></Text>
                <Text style={styles.exampleTextTrans}>a heart</Text>
            </View>
          </TouchableOpacity>




          <TouchableOpacity onPress={() => {playSound(soundC)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>et <Text style={styles.exampleTextColor}>h</Text>jem - <Text style={styles.exampleTextTrans}>/jɛm/</Text></Text>
                <Text style={styles.exampleTextTrans}>a home</Text>
            </View>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={() => {playSound(soundD)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}>et <Text style={styles.exampleTextColor}>h</Text>jul - <Text style={styles.exampleTextTrans}>/jʉːl/</Text></Text>
                <Text style={styles.exampleTextTrans}>a wheel</Text>
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
          linkNext={'Class7x4x4'} //link next
          linkPrevious={'Class7x4x2'} //link previous
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

export default Class7x4x3 //name for export

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