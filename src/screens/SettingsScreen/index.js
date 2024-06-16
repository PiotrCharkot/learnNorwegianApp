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

const SettingsScreen = ({route}) => {

  const auth = getAuth();
  const user = auth.currentUser;

  const navigation = useNavigation();

  const {choosenLanguage} = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const confirmationPos = useRef(new Animated.Value(200)).current;
  const interpolatedValueForX = useRef(new Animated.Value(0)).current;
  

  const [soundOn, setSoundOn] = useState('1');
  const [notificationsOn, setNotificationsOn] = useState('0');
  const [userLoged, setUserLoged] = useState(false);
  const [sound, setSound] = useState();
  const [sound2, setSound2] = useState();
  const [buttonsLabelArray, setButtonsLabelArray] = useState(['Get a PRO account', 'Sound', 'Notifications', 'Log out', 'Log in', 'Change password', 'Contact us', 'About App', 'Delete account', 'Privacy policy', 'Terms and conditions']);
  const [msgText, setMsgText] = useState('You must be logged in to proceed with further action');
  

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
      .catch((error) => {
        console.log("Could not log out! Error: ", error);
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


  const playSound2 = async () => {
    await sound2?.replayAsync(); 
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

    if (soundOn === '1') {
      playSound2();
    }

    setTimeout(() => {

        navigation.navigate('profil');
    }, 800)
}

  useEffect(() => {
    getValueFor('sound');
    getValueFor('notifications');


    if (choosenLanguage === 'PL') {
      setButtonsLabelArray(["Załóż konto PRO", "Dźwięk", "Powiadomienia", "Wyloguj się", "Zaloguj się", "Zmień hasło", "Skontaktuj się z nami", "O aplikacji", "Usuń konto", "Polityka prywatności", "Warunki użytkowania"]);
      setMsgText('Musisz być zalogowany, aby kontynuować dalsze działanie.');
    } else if (choosenLanguage === 'DE') {
      setButtonsLabelArray(["Hol dir ein PRO-Konto", "Ton", "Benachrichtigungen", "Abmelden", "Anmelden", "Passwort ändern", "Kontaktiere uns", "Über die App", "Konto löschen", "Datenschutzrichtlinie", "Nutzungsbedingungen"]);
      setMsgText('Sie müssen angemeldet sein, um mit weiteren Aktionen fortzufahren.');
    } else if (choosenLanguage === 'LT') {
      setButtonsLabelArray(["Įsigyk PRO paskyrą", "Garsas", "Pranešimai", "Atsijungti", "Prisijungti", "Pakeisti slaptažodį", "Susisiekite su mumis", "Apie programą", "Ištrinti paskyrą", "Privatumo politika", "Naudojimosi sąlygos"]);
      setMsgText('Privalote būti prisijungęs, kad galėtumėte tęsti tolesnius veiksmus.');
    } else if (choosenLanguage === 'AR') {
      setButtonsLabelArray(["احصل على حساب برو", "الصوت", "الإشعارات", "تسجيل الخروج", "تسجيل الدخول", "تغيير كلمة السر", "اتصل بنا", "عن التطبيق", "حذف الحساب", "سياسة الخصوصية", "الشروط والأحكام"]);
      setMsgText('يجب أن تكون مسجلاً للدخول للمتابعة بأي إجراءات أخرى');
    } else if (choosenLanguage === 'UA') {
      setButtonsLabelArray(["Отримайте PRO-акаунт", "Звук", "Сповіщення", "Вийти", "Увійти", "Змінити пароль", "Зв'яжіться з нами", "Про додаток", "Видалити акаунт", "Політика конфіденційності", "Умови користування"]);
      setMsgText('Ви повинні бути увійшли, щоб продовжити діяльність.');
    } else if (choosenLanguage === 'ES') {
      setButtonsLabelArray(["Obtén una cuenta PRO", "Sonido", "Notificaciones", "Cerrar sesión", "Iniciar sesión", "Cambiar contraseña", "Contáctanos", "Acerca de la aplicación", "Eliminar cuenta", "Política de privacidad", "Términos y condiciones"]);
      setMsgText('Debes estar registrado para continuar con la acción.');
    } 
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


  useEffect(() => {
    const loadSound2 = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('./../../../assets/sounds/pebbelsClick.wav')
      );
      setSound2(sound);
    };

    loadSound2();

    return () => {
      sound2?.unloadAsync();
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
            <Text style={styles.buttonText}>{buttonsLabelArray[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={switchSound}>
          <Image source={soundOn === '1' ? require('../../../assets/volume.png') : require('../../../assets/mute.png')}  style={{...styles.buttonImg, tintColor: soundOn === '1' ?  'green' : 'grey'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={switchNotifications}>
          <Image source={notificationsOn === '1' ? require('../../../assets/notification.png') : require('../../../assets/notification-off.png')}  style={{...styles.buttonImg, tintColor: notificationsOn === '1' ?  'green' : 'grey'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[2]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? signOutFunc() : navigation.navigate('Login', {choosenLanguage: choosenLanguage})}>
          <Image source={userLoged ? require('../../../assets/exit.png') : require('../../../assets/log-in.png')}  style={{...styles.buttonImg,  tintColor: userLoged ? 'red' : 'green'}}/>
          {userLoged ? <Text style={styles.buttonText}>{buttonsLabelArray[3]}</Text> : <Text style={styles.buttonText}>{buttonsLabelArray[4]}</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? navigation.navigate({name: 'Reauth', params: {changePass: true, choosenLanguage: choosenLanguage}}) : showConfirmation()}>
          <Image source={require('../../../assets/password.png')}  style={{...styles.buttonImg, tintColor: 'pink'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[5]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => navigation.navigate({name: 'Contact', params: {choosenLanguage: choosenLanguage}})}>
          <Image source={require('../../../assets/send.png')}  style={{...styles.buttonImg, tintColor: 'purple'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[6]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => navigation.navigate({name: 'About', params: {choosenLanguage: choosenLanguage}})}>
          <Image source={require('../../../assets/about.png')}  style={{...styles.buttonImg, tintColor: 'salmon'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[7]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => userLoged ? navigation.navigate({name: 'Reauth', params: {changePass: false, choosenLanguage: choosenLanguage}}) : showConfirmation()}>
          <Image source={require('../../../assets/bin.png')}  style={{...styles.buttonImg}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[8]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => navigation.navigate({name: 'Privacy', params: {choosenLanguage: choosenLanguage}})}>
          <Image source={require('../../../assets/file.png')}  style={{...styles.buttonImg, tintColor: 'grey'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[9]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOpacity} onPress={() => navigation.navigate({name: 'Terms', params: {choosenLanguage: choosenLanguage}})}>
          <Image source={require('../../../assets/terms.png')} style={{...styles.buttonImg, tintColor: 'grey'}}/>
            <Text style={styles.buttonText}>{buttonsLabelArray[10]}</Text>
          </TouchableOpacity>

          <View style={{height: 80}}></View>

        </Animated.ScrollView>
        
      </View>

      <Animated.View style={{...styles.confirmationContainer, transform: [{translateY: confirmationPos}]}}>
            <View style={styles.confirmationContainerInside}>

              <Text style={styles.confirmationText}>{msgText}</Text>

              <View style={styles.confirmationBtnCont}>
                  <TouchableOpacity style={styles.confirmationBtn} onPress={() => navigation.navigate('Login', {choosenLanguage: choosenLanguage})}>
                      <Text style={styles.confirmationBtnTxt}>{buttonsLabelArray[4]}</Text>
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