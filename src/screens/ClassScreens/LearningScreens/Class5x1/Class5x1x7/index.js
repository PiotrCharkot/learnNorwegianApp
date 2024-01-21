import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect  } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';

const currentScreen = 7; //screen number



const Class5x1x7 = ({route}) => {  //screen name

  
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
            <Text style={{...styles.text , fontSize: 20, fontWeight: '600', color: '#6441A5'}}>Adverbs formed from adjectives:{'\n\n'}</Text>
            <Text style={styles.text}>Simply add <Text style={styles.textColor}>-t</Text> to the adjective.</Text>
          </View>
          

          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>rask (fast) → raskt (quickly)</Text>
            <Text style={styles.exampleTextSmall}>åpen (open) → åpent (openly)</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.textSmall}>Han løper raskt for å nå bussen.</Text>
            <Text style={styles.textSmall}>He runs quickly to catch the bus.</Text>
          </View>


          <View style={styles.textContainer}>
            
            <Text style={styles.text}>For adjectives ending in -ig add <Text style={styles.textColor}>-vis</Text>.</Text>
          </View>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTextSmall}>sannsynlig (probable) → sannsynligvis (probably)</Text>
            <Text style={styles.exampleTextSmall}>heldig (lucky) → heldigvis (fortunately)</Text>
            <Text style={styles.textSmall}></Text>
            <Text style={styles.textSmall}>Heldigvis hadde jeg med paraplyen da det begynte å regne.</Text>
            <Text style={styles.textSmall}>Fortunately, I had the umbrella with me when it started to rain.</Text>
          </View>

          
        </ScrollView>
    
        <View style={styles.progressBarContainer}>

          <ProgressBar screenNum={currentScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>
        </View>

        <View style={styles.bottomBarContainer}>
          <BottomBar 
          linkNext={'Class5x1x8'} //link next
          linkPrevious={'Class5x1x6'}  //link previous
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

export default Class5x1x7 //name for export

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
    marginBottom: generalStyles.marginBottomTextCont,
    marginHorizontal: generalStyles.marginHorizontalTextCont
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
    color: generalStyles.colorText,
  },
  exampleContainer: {
    paddingHorizontal: generalStyles.paddingHorizontalEgzCont,
    paddingVertical: generalStyles.paddingVerticalEgzCont,
    marginHorizontal: generalStyles.marginHorizontalEgzCont,
    marginVertical: generalStyles.marginVerticalEgzCont,
    alignItems: 'center',
    backgroundColor: generalStyles.exampleBackgroundColor,
    borderRadius: generalStyles.borderRadiusEgzCont
  },
  exampleTextSmall: {
    fontSize: generalStyles.exampleTextSizeSmall,
    fontWeight: generalStyles.exampleTextWeight,
    textAlign: 'center',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: generalStyles.bottomBarDistFromBottom,
    width: '100%',
  },
  
  
})