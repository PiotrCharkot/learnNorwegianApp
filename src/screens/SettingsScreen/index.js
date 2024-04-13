import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { authentication } from '../../../firebase/firebase-config';
import { withAnchorPoint } from 'react-native-anchor-point';
import { Audio } from 'expo-av';
import * as SecureStore from 'expo-secure-store';
import styles from './style'

const screenHight = Dimensions.get('window').height;

const SettingsScreen = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const confirmationPos = useRef(new Animated.Value(200)).current;
  const interpolatedValueForX = useRef(new Animated.Value(0)).current;
  

  const [soundOn, setSoundOn] = useState('1');
  const [notificationsOn, setNotificationsOn] = useState('0');
  const [userLoged, setUserLoged] = useState(false);
  const [sound, setSound] = useState();
  

  const rotateWheel = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: ['0deg', '360deg']
  });

  const xPositionDeg = interpolatedValueForX.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"]
  })

  const signOutFunc = () => {

    signOut(authentication)
      .then(() => {
        console.log('user  loged out');
        setUserLoged(false);
      })
      .catch(() => {
        console.log("Could not log out!");
      });
  };

  const switchSound = () => {
    if (soundOn === '1') {
      setSoundOn('0');
      save('sound', '0');
      console.log('sound mute');
    } else {
      setSoundOn('1');
      save('sound', '1');
      playSound();
      console.log('sound on');
    }
    //change in secure store 1 = sound, 0 = mute
  };

  const showConfirmation = () => {
    Animated.spring(confirmationPos, {
        toValue: -screenHight / 2 + 65,
        speed: 3,
        bounciness: 5,
        useNativeDriver: true,
    }).start();

  };

  const hideConfirmation = () => {
      Animated.spring(confirmationPos, {
          toValue: 200,
          speed: 10,
          bounciness: 5,
          useNativeDriver: true,
      }).start();
  };


  const switchNotifications = () => {
    if (notificationsOn === '1') {
      setNotificationsOn('0');
      save('notifications', '0');
    } else {
      setNotificationsOn('1');
      save('notifications', '1');
    }
    //change in secure store 1 = notifications on, 0 = notifcations off
  };


  const playSound = async () => {
    
    await sound?.replayAsync(); 
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      if (key === 'sound') {
        setSoundOn(result);
      } else if (key === 'notifications') {
        setNotificationsOn(result)
      }
    } else {
      if (key === 'sound') {
        setSoundOn('1');
        save('sound', '1');  
        console.log('No values stored under that key sound: ', key);
      } else if (key === 'notifications') {
        setNotificationsOn('0');
        save('notifications', '0'); 
        console.log('No values stored under that key notifications: ', key);
      }
      
    }
  }

  const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
  };

  const exitButton = () => {

    Animated.spring(interpolatedValueForX, {
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    setTimeout(() => {

        navigation.navigate('profil');
    }, 800)
}

  useEffect(() => {
    getValueFor('sound');
    getValueFor('notifications');
  }, [])
  

  useEffect(() => {

    const unscubscribe = onAuthStateChanged(authentication, (authUser) => {
      
      if (authUser && !authUser.isAnonymous) {
        setUserLoged(true);
      } 
      
      
    });
  
  return unscubscribe;
  }, [userLoged])


  useEffect(() => {
    const loadSound = async () => {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/pluck.mp3')
      );
      setSound(sound);
    };

    loadSound();

    
    return () => {
      sound?.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.mainContainer}>

      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
          <TouchableOpacity onPress={() => exitButton()}>
              <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

          </TouchableOpacity>
      </Animated.View>
      <Animated.Image source={require('../../../assets/settings.png')}  style={{...styles.mainImg, transform: [{rotate: rotateWheel}]}}/>

      <View style={styles.bottomContainer}> 

        <Animated.ScrollView style={styles.infoContainer} contentContainerStyle={styles.scrollStyle} onScroll={Animated.event(
          [{nativeEvent: {contentOffset: { y: scrollY}}}], 
          {useNativeDriver: true}
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
        
          <TouchableOpacity style={styles.btnOpacity} >
          <Image source={require('../../../assets/crown.png')}  style={styles.buttonImg}/>
            <Text style={styles.buttonText}>Upgrade to PRO </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={switchSound}>
          <Image source={soundOn === '1' ? require('../../../assets/volume.png') : require('../../../assets/mute.png')}  style={{...styles.buttonImg, tintColor: soundOn === '1' ?  'green' : 'grey'}}/>
            <Text style={styles.buttonText}>Sound</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={switchNotifications}>
          <Image source={notificationsOn === '1' ? require('../../../assets/notification.png') : require('../../../assets/notification-off.png')}  style={{...styles.buttonImg, tintColor: notificationsOn === '1' ?  'green' : 'grey'}}/>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? signOutFunc() : navigation.navigate('Login')}>
          <Image source={userLoged ? require('../../../assets/exit.png') : require('../../../assets/log-in.png')}  style={{...styles.buttonImg,  tintColor: userLoged ? 'red' : 'green'}}/>
          {userLoged ? <Text style={styles.buttonText}>Log out</Text> : <Text style={styles.buttonText}>Log in</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? navigation.navigate({name: 'Reauth', params: {changePass: true}}) : showConfirmation()}>
          <Image source={require('../../../assets/password.png')}  style={{...styles.buttonImg, tintColor: 'pink'}}/>
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} >
          <Image source={require('../../../assets/send.png')}  style={{...styles.buttonImg, tintColor: 'purple'}}/>
            <Text style={styles.buttonText}>Contact us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} >
          <Image source={require('../../../assets/about.png')}  style={{...styles.buttonImg, tintColor: 'salmon'}}/>
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? navigation.navigate({name: 'Reauth', params: {changePass: false}}) : showConfirmation()}>
          <Image source={require('../../../assets/bin.png')}  style={{...styles.buttonImg}}/>
            <Text style={styles.buttonText}>Delete account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} >
          <Image source={require('../../../assets/file.png')}  style={{...styles.buttonImg, tintColor: 'grey'}}/>
            <Text style={styles.buttonText}>Privacy policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} >
          <Image source={require('../../../assets/terms.png')}  style={{...styles.buttonImg, tintColor: 'grey'}}/>
            <Text style={styles.buttonText}>Terms and coditions</Text>
          </TouchableOpacity>


          <View style={{height: 80}}></View>

        </Animated.ScrollView>
        
      </View>

      <Animated.View style={{...styles.confirmationContainer, transform: [{translateY: confirmationPos}]}}>
            <View style={styles.confirmationContainerInside}>

                <Text style={styles.confirmationText}>You must be logged in to proceed with further action</Text>

                <View style={styles.confirmationBtnCont}>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.confirmationBtnTxt}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={hideConfirmation}>
                        <Text style={styles.confirmationBtnTxt}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    </View>
  )
}

export default SettingsScreen