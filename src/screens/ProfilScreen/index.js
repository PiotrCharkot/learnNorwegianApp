import { View, Text, TouchableOpacity, Image, Dimensions, Animated, ScrollView} from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigation, useIsFocused, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import styles from './style'
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



const screenWidth = Dimensions.get('window').width;


const ProfilScreen = () => {


  const auth = getAuth();
  const user = auth.currentUser;

  const storage = getStorage();

  const formatDate = (date) => {
    const isoString = date.toISOString(); // Get the ISO string
    const [year, month, day] = isoString.split('T')[0].split('-'); // Extract year, month, and day
    return `${day}/${month}/${year}`; // Format the date as dd/MM/yyyy
  };

  let sixDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-6)));
  let fiveDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-5)));
  let fourDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-4)));
  let threeDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-3)));
  let twoDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-2)));
  let yesterday = formatDate(new Date(new Date().setDate(new Date().getDate()-1)));
  let today = formatDate(new Date());

  let dayOfWeek = new Date(new Date().setDate(new Date().getDate())).getDay() === 0 ? 7 : new Date(new Date().setDate(new Date().getDate())).getDay();

  let allDaysOfWeek = [today, yesterday, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo, sixDaysAgo];
  let currentWeek = allDaysOfWeek.slice(0, dayOfWeek)
 
  const randomPicture = ['reindeer-profile.png', 'reindeer-profile2.png', 'reindeer-profile3.png','reindeer-profile4.png', 'reindeer-profile5.png', 'reindeer-profile6.png', 'reindeer-profile7.png', 'reindeer-profile8.png', 'reindeer-profile9.png', 'reindeer-profile10.png', 'reindeer-profile11.png','reindeer-profile12.png', 'reindeer-profile13.png', 'reindeer-profile14.png', 'reindeer-profile15.png', 'reindeer-profile16.png', 'reindeer-profile17.png', 'reindeer-profile18.png', 'reindeer-profile19.png','reindeer-profile20.png', 'reindeer-profile21.png', 'reindeer-profile22.png', 'reindeer-profile23.png']
  

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const userFbPoints = collection(db, 'usersPoints');

  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [userLoged, setUserLoged] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [userEmail, setUserEmail] = useState('No email');
  const [userPoints, setUserPoints] = useState(0);
  const [userDays, setUserDays] = useState(0);
  const [userDailyPoints, setUserDailyPoints] = useState(0);
  const [userWeeklyPoints, setUserWeeklyPoints] = useState(0);
  const [userShortId, setUserShortId] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(randomPicture[Math.floor(Math.random() * randomPicture.length)]);
  const [labelsArray, setLabelsArray] = useState(['Points', 'Day', 'Days', 'Username', 'Email', 'Daily points', 'Weekly points', 'My Id', 'Change picture']);
  const [loginLabel, setLoginLabel] = useState('Log in')
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  
  //let randomIndex;


  const uploadToFb = async (urlParam) => {
        

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", urlParam, true);
      xhr.send(null);
    });

    uploadBytesResumable(ref(storage, `profilePictures/${user.uid}`), blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    
   
  }


  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setChoosenLanguage(result);
    } else {
      console.log('No values stored under that key: ', key);
    }
  }


  const downloadFromFb = async () => {
    
 


    if (user) {
      getDownloadURL(ref(storage, 'profilePictures/' + user.uid))
      .then((url) => {
          
        setProfilePicUrl(url)
          
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'storage/object-not-found') {
          

          getDownloadURL(ref(storage, 'profilePictures/' + newProfilePic))
            .then((url) => {
            
              setProfilePicUrl(url)
              uploadToFb(url);
            })
            .catch((error) => {
              console.log('Didnt get profile picture here');
            })
          
        }
      });
    }
    

    const q = query(userFbPoints, where('userRef', '==', user.uid))
    const querySnapshot = await getDocs(q);


    if (querySnapshot.empty) {
      console.log('there is no user in usersPoint collection with id: ', user.uid);
      setUserDays(0);
      setUserPoints(0);
      setUserDailyPoints(0);
      setUserWeeklyPoints(0);
    } else {

      querySnapshot.forEach((doc) => {
    
      
        setUserDays(doc.data().daysInRow);
        setUserPoints(doc.data().totalPoints);
        setUserDailyPoints(doc.data().dailyPoints);
        setUserWeeklyPoints(doc.data().weeklyPoints);
        setUsername(doc.data().userName);
  
        if (doc.data().lastUpdate !== today && doc.data().lastUpdate !== yesterday) {
          setUserDays(0);
        }
  
        if (doc.data().lastUpdate !== formatDate(new Date())) {
          setUserDailyPoints(0);
        }
  
        if (!currentWeek.includes(doc.data().lastUpdate)) {
          setUserWeeklyPoints(0)
        }
  
  
      })

    }



    

    let shortId = user.uid.substring(0, 10);
    setUserShortId(shortId)
  }


  useFocusEffect(
    useCallback(() => {

      
      getValueFor('language');
  
      
    }, [])
  );


  useEffect(() => {
    if (choosenLanguage === 'PL') {
      setLabelsArray(["Punkty", "Dzień", "Dni", "Nazwa użytkownika", "Email", "Punkty dziennie", "Punkty tygodniowe", "Mój Id", "Zmień zdjęcie"]);
      setLoginLabel('Zaloguj się');
    } else if (choosenLanguage === 'DE') {
      setLabelsArray(["Punkte", "Tag", "Tage", "Benutzername", "E-Mail", "Tägliche Punkte", "Wöchentliche Punkte", "Meine ID", "Bild ändern"]);
      setLoginLabel('Anmelden');
    } else if (choosenLanguage === 'LT') {
      setLabelsArray(["Taškai", "Diena", "Dienos", "Vartotojo vardas", "El. paštas", "Dienos taškai", "Savaitės taškai", "Mano Id", "Keisti nuotrauką"]);
      setLoginLabel('Prisijungti');
    } else if (choosenLanguage === 'AR') {
      setLabelsArray(["النقاط", "يوم", "أيام", "اسم المستخدم", "البريد الإلكتروني", "نقاط يومية", "نقاط أسبوعية", "هويتي", "تغيير الصورة"]);
      setLoginLabel('تسجيل الدخول');
    } else if (choosenLanguage === 'UA') {
      setLabelsArray(["Бали", "День", "Дні", "Ім'я користувача", "Електронна пошта", "Щоденні бали", "Тижневі бали", "Мій Id", "Змінити зображення"]);
      setLoginLabel('Увійти');
    } else if (choosenLanguage === 'ES') {
      setLabelsArray(["Puntos", "Día", "Días", "Nombre de usuario", "Correo electrónico", "Puntos diarios", "Puntos semanales", "Mi ID", "Cambiar imagen"]);
      setLoginLabel('Iniciar sesión');
    } else if (choosenLanguage === 'EN') {
      setLabelsArray(['Points', 'Day', 'Days', 'Username', 'Email', 'Daily points', 'Weekly points', 'My Id', 'Change picture']);
      setLoginLabel('Log in');
    }
  }, [choosenLanguage])



  // useEffect(() => {
  
  //   randomIndex = Math.floor(Math.random() * randomPicture.length);
  //   setNewProfilePic(randomPicture[randomIndex]);

    
  // }, [])
  
  

  useEffect(() => {


    if (user && !user.isAnonymous) {
      setUserLoged(true);
      setUsername(user.displayName);
      setUserEmail(user.email);
    } else {
      
      setUserLoged(false);
      setUserEmail('No email');
    }

    downloadFromFb();

  }, [userLoged, isFocused])

  useEffect(() => {

   
    if (isFocused) {
      Animated.sequence([
        
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        }),
    
        Animated.timing(overlayOffset, {
          toValue: -screenWidth,
          duration: 10,
          useNativeDriver: true
        }),
    
      ]).start()
    } else {
      Animated.sequence([
        Animated.timing(overlayOffset, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true
        }),
    
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 10,
          useNativeDriver: true
        }),
      ]).start()
      
    }
    
  }, [isFocused])




  return (
    <View style={styles.mainContainer}>
      

      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.backgroundTop}>
        <View style={styles.loginButtonContainer}>
          {userLoged ? null : <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => navigation.navigate("Login", {choosenLanguage: choosenLanguage})}>
            <Text style={styles.textLoginButton}>{loginLabel}</Text>
          </TouchableOpacity>}  
        </View>

        <TouchableOpacity style={styles.settingsImgContainer} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => navigation.navigate('Settings', {choosenLanguage: choosenLanguage})}>
          <Image style={styles.settingsImg} source={require('../../../assets/settings.png')} />
        </TouchableOpacity>

        
      </LinearGradient>
      
      
      <View style={styles.bottomContainer}> 

        
        <View style={{...styles.imgContainer, ...styles.shadowImg}}>
          <Image style={styles.img} source={{ uri: profilePicUrl }}/>
        </View>

        <View style={{height: 400}}>

        <ScrollView style={styles.infoContainer} contentContainerStyle={styles.scrollStyle} showsVerticalScrollIndicator={false}>
          <View style={styles.topInfo}>
            <View style={styles.leftTopInfo}>
              <Text style={styles.pointsText}>{userPoints}</Text>
              <Text>{labelsArray[0]}</Text>
            </View>
            <View style={styles.rightTopInfo}>
              <Text style={styles.pointsText}>{userDays}</Text>
              <Text>{userDays === 1 ? labelsArray[1] : labelsArray[2]}</Text>
            </View>

          </View>
          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>{labelsArray[3]}</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{username}</Text>  
            </View>
          </View>

          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>{labelsArray[4]}</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userEmail}</Text>  
            </View>
          </View>


          <TouchableOpacity style={styles.btnChangePicOpacity} onPress={() => navigation.navigate('ChangePic', {userId: user.uid, choosenLanguage: choosenLanguage})}>
            <Text style={styles.btnChangePicOpacityText}>{labelsArray[8]}</Text>
          </TouchableOpacity>


          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>{labelsArray[5]}</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userDailyPoints}</Text>  
            </View>
          </View>


          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>{labelsArray[6]}</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userWeeklyPoints}</Text>  
            </View>
          </View>

          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>{labelsArray[7]}</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userShortId}</Text>  
            </View>
          </View>


          {user.uid === 'HZM7dIZ33mewcrN70AigjvZmAKA3' ? <TouchableOpacity style={styles.btnChangePicOpacity} onPress={() => navigation.navigate('Users')}>
            <Text style={styles.btnChangePicOpacityText}>Users manager</Text>
          </TouchableOpacity> : <View></View>}

          <View style={{height: 100}}></View>
          
        </ScrollView>
        </View>
      </View>
      
     
        
      
      
      <Animated.View style={{...styles.whiteOverlay, opacity: overlayOpacity, transform: [{translateX: overlayOffset}]}}></Animated.View>
    
        
    </View>
  )
}

export default ProfilScreen;

