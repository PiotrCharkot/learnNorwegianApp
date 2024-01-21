import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 3; //screen number



const Class4x4x3 = ({route}) => {  //screen name

  
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
            <Text style={styles.text}>The <Text style={styles.textColor}>genitive</Text> case is used often in fixed phrases, expressions, or names:</Text>
          
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Kongen<Text style={styles.exampleTextSmallColor}>s</Text> nei<Text style={styles.textSmall}> - The king's no</Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Karl Johan<Text style={styles.exampleTextSmallColor}>s</Text> gate<Text style={styles.textSmall}> - Karl Johan's street</Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Norge<Text style={styles.exampleTextSmallColor}>s</Text> Bank<Text style={styles.textSmall}> - Bank of Norway</Text></Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>It is also used to determine the duration:</Text>
          
          </View>

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>ett år<Text style={styles.exampleTextSmallColor}>s</Text> ferie<Text style={styles.textSmall}> - one year vacation</Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>fem dager<Text style={styles.exampleTextSmallColor}>s</Text> sykdom<Text style={styles.textSmall}> - five days' illness</Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>to uker<Text style={styles.exampleTextSmallColor}>s</Text> tur<Text style={styles.textSmall}> - two week trip</Text></Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>We can also use it to point out where something is:</Text>
          
          </View>


          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Oslo<Text style={styles.exampleTextSmallColor}>s</Text> rådhus<Text style={styles.textSmall}> - town hall in Oslo</Text></Text>
          </View>
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>Norge<Text style={styles.exampleTextSmallColor}>s</Text> fjell<Text style={styles.textSmall}> - Norways mountains</Text></Text>
          </View>
        </ScrollView>

        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class4x4x4'} //link next
          linkPrevious={'Class4x4x2'}  //link previous
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

export default Class4x4x3 //name for export

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
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
    marginBottom: 0,
    marginHorizontal: generalStyles.marginHorizontalTextCont
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
    fontSize: generalStyles.screenTextSize,
    fontWeight: generalStyles.learningScreenTitleFontWeightMedium,
    color: generalStyles.colorText1,
    fontWeight: generalStyles.textColorFontWeight
  },
  exampleContainer: {
    paddingHorizontal: generalStyles.paddingHorizontalEgzCont,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  exampleTextSmallColor: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
    color: generalStyles.colorText,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
    width: '100%',
  },
  
  
})