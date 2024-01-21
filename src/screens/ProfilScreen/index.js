import { View, Text, TouchableOpacity, Image, Dimensions, Animated, ScrollView} from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import styles from './style'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { authentication } from '../../../firebase/firebase-config';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { signOut } from "firebase/auth";


const screenWidth = Dimensions.get('window').width;


const ProfilScreen = () => {


  const auth = getAuth();
  const user = auth.currentUser;

  const storage = getStorage();

  let sixDaysAgo = new Date(new Date().setDate(new Date().getDate()-6)).toLocaleDateString();
  let fiveDaysAgo = new Date(new Date().setDate(new Date().getDate()-5)).toLocaleDateString();
  let fourDaysAgo = new Date(new Date().setDate(new Date().getDate()-4)).toLocaleDateString();
  let threeDaysAgo = new Date(new Date().setDate(new Date().getDate()-3)).toLocaleDateString();
  let twoDaysAgo = new Date(new Date().setDate(new Date().getDate()-2)).toLocaleDateString();
  let yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString();
  let today = new Date().toLocaleDateString();

  let dayOfWeek = new Date(new Date().setDate(new Date().getDate())).getDay() === 0 ? 7 : new Date(new Date().setDate(new Date().getDate())).getDay();

  let allDaysOfWeek = [today, yesterday, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo, sixDaysAgo];
  let currentWeek = allDaysOfWeek.slice(0, dayOfWeek)
 
  const randomPicture = ['reindeer-profile.png', 'reindeer-profile2.png', 'reindeer-profile3.png','reindeer-profile4.png', 'reindeer-profile5.png', 'reindeer-profile6.png', 'reindeer-profile7.png', 'reindeer-profile8.png']
  

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const userFbPoints = collection(db, 'usersPoints');

  const [userLoged, setUserLoged] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [userEmail, setUserEmail] = useState('No email');
  const [userPoints, setUserPoints] = useState(0);
  const [userDays, setUserDays] = useState(0);
  const [userId, setUserId] = useState('');
  const [userAnonymous, setUserAnonymous] = useState(false);
  const [userDailyPoints, setUserDailyPoints] = useState(0);
  const [userWeeklyPoints, setUserWeeklyPoints] = useState(0);
  const [userShortId, setUserShortId] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState('reindeer-profile3.png');
  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const overlayOffset = useRef(new Animated.Value(0)).current;
  
  let randomIndex;

  const signOutFunc = () => {
    signOut(authentication)
      .then(() => {
        setUserLoged(false);
      })
      .catch(() => {
        console.log("Could not log out!");
      });
  }

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


  const downloadFromFb = async () => {
    
    console.log( 'id to download picture', user.uid);


    if (user) {
      getDownloadURL(ref(storage, 'profilePictures/' + user.uid))
      .then((url) => {
          
        setProfilePicUrl(url)
          
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'storage/object-not-found') {
          //console.log('no file for profile');

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
  
        if (doc.data().lastUpdate !== new Date().toLocaleDateString()) {
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


  useEffect(() => {
  
    randomIndex = Math.floor(Math.random() * randomPicture.length);
    setNewProfilePic(randomPicture[randomIndex]);
    
  }, [])
  
  

  useEffect(() => {


    
    if (user) {
      console.log('user id in Profile screen: ', user.uid);
      //setUserId(user.uid); 
    }

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
          {userLoged ? null : <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.textLoginButton}>LOG IN</Text>
          </TouchableOpacity>}  
        </View>

        <TouchableOpacity style={styles.settingsImgContainer} onPress={() => navigation.navigate('Settings')}>
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
              <Text>Points</Text>
            </View>
            <View style={styles.rightTopInfo}>
              <Text style={styles.pointsText}>{userDays}</Text>
              <Text>Days</Text>
            </View>

          </View>
          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>Username</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{username}</Text>  
            </View>
          </View>

          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>Email</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userEmail}</Text>  
            </View>
          </View>


          <TouchableOpacity style={styles.btnChangePicOpacity} onPress={() => navigation.navigate('ChangePic', {userId: user.uid})}>
            <Text style={styles.btnChangePicOpacityText}>Change Picture</Text>
          </TouchableOpacity>


          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>Daily points</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userDailyPoints}</Text>  
            </View>
          </View>


          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>Weekly points</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userWeeklyPoints}</Text>  
            </View>
          </View>

          <View style={styles.valContainer}>
            <View style={styles.fieldDesc}>
              <Text style={styles.fieldDescText}>My Id</Text>
            </View>
            <View style={styles.fieldVal}>
              <Text style={styles.fieldValText}>{userShortId}</Text>  
            </View>
          </View>
          
        </ScrollView>
        </View>
      </View>
      
     
        
      
      
      <Animated.View style={{...styles.whiteOverlay, opacity: overlayOpacity, transform: [{translateX: overlayOffset}]}}></Animated.View>
    
        
    </View>
  )
}

export default ProfilScreen;

