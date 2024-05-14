import { View, Text, StyleSheet, Image, Dimensions, Animated} from 'react-native'
import React, {useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import MaskedView from '@react-native-community/masked-view';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WelcomeScreen = () => {

    const navigation = useNavigation();

    const opacityFront = useRef(new Animated.Value(1)).current;
    const opacityText = useRef(new Animated.Value(1)).current;


    const moveToMain = () => {
      if (false) { // get value from SecureStore to check if intro was shown
        navigation.replace("Main");
      } else {
        navigation.replace("Intro1");  
        // change value in SecureStore to => intro shown
      }
    }

    useEffect(() => {

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


      setTimeout(() => {
          moveToMain();
          
      }, 3800); //in production change to 3800 ms

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
    marginLeft: 7 
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
    fontSize: 48,
    color: 'black',
    fontWeight: 'bold',
    opacity: 1
  },
  
})

export default WelcomeScreen