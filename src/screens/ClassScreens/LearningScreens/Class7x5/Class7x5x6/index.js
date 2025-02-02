import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Audio } from "expo-av";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 6; //current screen


const Class7x5x6 = ({route}) => { //name for component

    const {userPoints, latestScreen, comeBackRoute, allScreensNum, savedLang} = route.params
    
    
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(currentScreen);
    const [comeBack, setComeBack] = useState(false);

    const soundA = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FINTOheterDuAnna.mp3?alt=media&token=79f33bac-8190-4f91-af7e-881c5ba5f9a8';


    const soundB = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FINTOkommerDuImorgen.mp3?alt=media&token=ef3dbceb-0e16-415e-aa99-37451c5f244e';


    const soundC = 'https://firebasestorage.googleapis.com/v0/b/norapp-69bd4.appspot.com/o/wordsList1%2FINTOhvaSkalDuGjoore.mp3?alt=media&token=ff316b30-b453-4334-8e38-a03f814ae579';
    
    


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
              <Text style={styles.text}>Questions usually have a pitch rise near the end.</Text>
          </View>

          


          <TouchableOpacity onPress={() => {playSound(soundA)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}><Text style={styles.exampleText}>Heter du Anna?</Text></Text>
                <Text style={styles.exampleTextTrans}>-----------¯¯¯¯¯</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => {playSound(soundB)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}><Text style={styles.exampleText}>Kommer du i morgen?</Text></Text>
                <Text style={styles.exampleTextTrans}>-----------------¯¯¯¯¯¯</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => {playSound(soundC)}}>
            <View style={styles.exampleContainer}>
                <Image style={styles.pictureSoundInContainer} source={require('../../../../../../assets/volume.png')} />
                <Text style={styles.exampleText}><Text style={styles.exampleText}>Hva skal du gjøre?</Text></Text>
                <Text style={styles.exampleTextTrans}>--------------¯¯¯¯¯¯</Text>
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
          linkNext={'Class7x5x7'} //link next
          linkPrevious={'Class7x5x5'} //link previous
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

export default Class7x5x6 //name for export

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
  exampleTextUnderline: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline'
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