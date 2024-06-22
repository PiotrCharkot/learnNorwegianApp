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


    async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }
    
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log('result is in SecureStore');
      } else {
        if (key === 'sound') {
          save('sound', '1');  
        } else if (key === 'notifications') {
          save('notifications', '0'); 
        } else if (key === 'language') {
          save('language', 'EN');
        }
        
      }
    }

    

    const moveToMain = (shouldPlayIntro) => {

      if (shouldPlayIntro) { 
        navigation.replace('Intro1', {skipable: false, language: 'EN'});  
      } else {
        navigation.navigate("Main");
      }
    }

    useEffect(() => {
console.log('width',screenWidth);
      const checkFirstLaunch = async () => {
        try {
          const firstLaunch = await SecureStore.getItemAsync('firstLaunchTime'); 
          if (firstLaunch === null) {

            console.log('luanching for the first time');

            const currentTime = new Date().toISOString();
            await SecureStore.setItemAsync('firstLaunchTime', currentTime);

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
      
      
      getValueFor('sound');
      getValueFor('notifications');
      getValueFor('language');
      
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
            

            <Animated.Text style={{...styles.logoText, opacity: opacityText,}} allowFontScaling={false}>Lær norsk</Animated.Text>
          
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
    fontSize: Math.floor(screenWidth / 8.5),
    color: 'black',
    fontWeight: 'bold',
    opacity: 1
  },
  
})

export default WelcomeScreen