import { View, Text, StyleSheet, Image, Dimensions, Animated} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import MaskedView from '@react-native-community/masked-view';
import * as SecureStore from 'expo-secure-store';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WelcomeScreen = () => {

    const navigation = useNavigation();

    const opacityFront = useRef(new Animated.Value(1)).current;
    const opacityText = useRef(new Animated.Value(1)).current;


    const [playIntro, setPlayIntro] = useState(false);


    //get timestamp from securestore for appFirstLunch. If value === undefinde than show intro and set value

    const moveToMain = (shouldPlayIntro) => {

      if (shouldPlayIntro) { // get value from SecureStore to check if intro was shown
        navigation.replace('Intro1', {skipable: false, language: 'EN'});  
      } else {
        navigation.navigate("Main");
        // change value in SecureStore to => intro shown
      }
    }

    useEffect(() => {

      const checkFirstLaunch = async () => {
        try {
          const firstLaunch = await SecureStore.getItemAsync('firstLaunchTime166'); 
          if (firstLaunch === null) {

            console.log('luanching for the first time');
            //setPlayIntro(true);
            const currentTime = new Date().toISOString();
            await SecureStore.setItemAsync('firstLaunchTime166', currentTime);

            setTimeout(() => {
              moveToMain(true);
              
            }, 3800); //in production change to 3800 ms
          } else {

            setTimeout(() => {
              moveToMain(false);
              
            }, 3800); //in production change to 3800 ms
          }
  
        } catch (error) {
          console.error('Error setting first launch time:', error);
        }
      };
  
      
      
      
      Animated.timing(opacityFront, {
        duration: 2000,
        delay: 0,
        toValue: 0,
        useNativeDriver: true
      }).start()
      
      Animated.timing(opacityText, {
        duration: 2000,
        delay: 2000,
        toValue: 0,
        useNativeDriver: true
      }).start()
      
      
      
      checkFirstLaunch();

    }, [])
    

  return (
    <View style={styles.mainContainer}>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <Animated.View
          style={{
            backgroundColor: 'rgba(0, 255, 0, 0)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            

            <Animated.Text style={{...styles.logoText, opacity: opacityText,}}>Lær norsk</Animated.Text>
          
          </Animated.View>
        }
        >
        <View style={styles.backgroundContainer}>

          <Image style={styles.pictureFlag} source={(require('../../../assets/logo3NoBackground.png'))} />
        </View>
        
      </MaskedView>
      <Animated.Image style={{...styles.pictureFlagTop, opacity: opacityFront}} source={(require('../../../assets/logo3NoBackground.png'))} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%', 
    backgroundColor: 'white',
  },
  maskedView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  backgroundContainer: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pictureFlag: {
    height: screenWidth  ,
    width: screenWidth ,
    marginBottom: 0,
    marginLeft: 0
  },
  pictureFlagTop: {
    position: 'absolute',
    top: screenHeight / 2 - screenWidth / 2,
    height: screenWidth  ,
    width: screenWidth ,
    marginBottom: 0,
    marginLeft: 7 
  },
  logoText: {
    marginTop: 80,
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    opacity: 1
  },
  
})

export default WelcomeScreen