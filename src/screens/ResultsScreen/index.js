import { View, Text, FlatList, Image, Animated, Easing, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef, useCallback}  from 'react'
import { onAuthStateChanged, getAuth  } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { authentication } from '../../../firebase/firebase-config';
import RankingItem from '../../components/other/RankingItem';
import styles from './style';


const usersPointsCollection = collection(db, 'usersPoints');

let extraItem = {
  dailyPoints: 0,
  daysInRow: 0,
  lastUpdate: '',
  totalPoints: 0,
  userName: 'extra',
  userRef: 'extra.png',
  weeklyPoints: 0
}


const ResultsScreen = () => {

  
  const storage = getStorage();
  const auth = getAuth();


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

  const rotationTime = 300;




  const userNumCap = 50;

  const [choosenLanguage, setChoosenLanguage] = useState('EN');
  const [weekly, setWeekly] = useState(false);
  const [dataFlatList, setDataFlatList] = useState([]);
  const [dataFlatListWeekly, setDataFlatListWeekly] = useState([]);
  const [userId, setUserId] = useState(auth.currentUser.uid);
  const [imgSrc, setImgSrc] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [imgSrc2, setImgSrc2] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [imgSrc3, setImgSrc3] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [imgSrcWeekly, setImgSrcWeekly] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [imgSrc2Weekly, setImgSrc2Weekly] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [imgSrc3Weekly, setImgSrc3Weekly] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHD_transparent_picture.png&psig=AOvVaw06tXtft-O_kCjAPf3xT_cS&ust=1677700689506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLD1rp-Auf0CFQAAAAAdAAAAABAE");
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [firstNameWeekly, setFirstNameWeekly] = useState('');
  const [secondNameWeekly, setSecondNameWeekly] = useState('');
  const [thirdNameWeekly, setThirdNameWeekly] = useState('');
  const [pointsFirst, setPointsFirst] = useState('');
  const [pointsSecond, setPointsSecond] = useState('');
  const [pointsThird, setPointsThird] = useState('');
  const [pointsFirstWeekly, setPointsFirstWeekly] = useState('');
  const [pointsSecondWeekly, setPointsSecondWeekly] = useState('');
  const [pointsThirdWeekly, setPointsThirdWeekly] = useState('');
  const [daysFirst, setDaysFirst] = useState('');
  const [daysSecond, setDaysSecond] = useState('');
  const [daysThird, setDaysThird] = useState('');
  const [daysFirstWeekly, setDaysFirstWeekly] = useState('');
  const [daysSecondWeekly, setDaysSecondWeekly] = useState('');
  const [daysThirdWeekly, setDaysThirdWeekly] = useState('');
  const [idFirst, setIdFirst] = useState('');
  const [idSecond, setIdSecond] = useState('');
  const [idThird, setIdThird] = useState('');
  const [idFirstWeekly, setIdFirstWeekly] = useState('');
  const [idSecondWeekly, setIdSecondWeekly] = useState('');
  const [idThirdWeekly, setIdThirdWeekly] = useState('');
  const [weeklyText, setWeeeklyText] = useState('Weekly Ranking');
  const [alltimeText, setAlltimeText] = useState('All-Time Ranking');
  const [toggleText, setToggleText] = useState('Toggle rankings');
  

  const interpolatedValueFlipFirst = useRef(new Animated.Value(0)).current;
  const interpolatedValueFlipSecond = useRef(new Animated.Value(-90)).current;

  const rotateVal = interpolatedValueFlipFirst.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"]
  })

  const rotateValTrans = interpolatedValueFlipSecond.interpolate({
      inputRange: [-90, 0],
      outputRange: ["-90deg", "0deg"]
  })



  const isFocused = useIsFocused();

  useEffect(() => {
    getDataFb(); 
  }, [isFocused]);

  
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setChoosenLanguage(result);
    } else {
      console.log('No values stored under that key.');
    }
  }


  useFocusEffect(
    useCallback(() => {

      
      getValueFor('language');
  
      
    }, [])
  );



  useEffect(() => {
    if (choosenLanguage === 'PL') {
      setWeeeklyText('Tygodniowy ranking');
      setAlltimeText('Ogólny ranking');
      setToggleText('Przełącz rankingi');
    } else if (choosenLanguage === 'DE') {
      setWeeeklyText('Wöchentliches Ranking');
      setAlltimeText('Allzeit-Ranking');
      setToggleText('Rankings umschalten');
    } else if (choosenLanguage === 'LT') {
      setWeeeklyText('Savaitinis reitingas');
      setAlltimeText('Visų laikų reitingas');
      setToggleText('');
    } else if (choosenLanguage === 'AR') {
      setWeeeklyText('التصنيف الأسبوعي');
      setAlltimeText('التصنيف العام');
      setToggleText('تبديل التصنيفات');
    } else if (choosenLanguage === 'UA') {
      setWeeeklyText('Щотижневий рейтинг');
      setAlltimeText('Рейтинг за весь час');
      setToggleText('Перемикати рейтинги');
    } else if (choosenLanguage === 'ES') {
      setWeeeklyText('Clasificación semanal');
      setAlltimeText('Clasificación general');
      setToggleText('Alternar clasificaciones');
    }
  }, [choosenLanguage]);




  const getDataFb = async () => {

    let tempDataArray = [];
    let tempDataArrayWeekly = [];

    let userExtraObject = {};
    let userExtraObjectWeekly = {};

    let addUserObject = false;
    let addUserObjectWeekly = false;

    
    const allDocsInPointsCol = query(usersPointsCollection);
    const querySnapshotAllDocs = await getDocs(allDocsInPointsCol);
    
    querySnapshotAllDocs.forEach((doc) => {
      tempDataArray.push(doc.data());
      tempDataArrayWeekly.push(doc.data());
    })

    if (tempDataArray.length > 0) {

      
      for (let i = 0; i < tempDataArrayWeekly.length; i++) {


        if (!currentWeek.includes(tempDataArrayWeekly[i].lastUpdate)) {
          tempDataArrayWeekly[i].weeklyPoints = 0;
        }
      }


      tempDataArray.sort((a,b) => b.totalPoints - a.totalPoints);
      tempDataArrayWeekly.sort((a,b) => b.weeklyPoints - a.weeklyPoints);

      for (let i = 0; i < tempDataArray.length; i++) {
        tempDataArray[i].position = i + 1;
        tempDataArrayWeekly[i].position = i + 1;


        if (tempDataArray[i].userRef === userId && i + 1 > userNumCap) {
          
          addUserObject = true;
          userExtraObject = tempDataArray[i];
          
        }


        if (tempDataArrayWeekly[i].useRef === userId && i + 1 > userNumCap) {

          addUserObjectWeekly = true;
          userExtraObjectWeekly = tempDataArrayWeekly[i];

        }

        
      }
    }
    
     


    
    setDataFlatList(() => {
      let arrayCapped = [];
      arrayCapped = tempDataArray.slice(3, userNumCap);
      if (addUserObject) {
        arrayCapped.push(userExtraObject);
        addUserObject = false;
      }
      arrayCapped.push(extraItem);
      return arrayCapped;
    });

    setDataFlatListWeekly(() => {
      let arrayCappedWeekly = [];
      arrayCappedWeekly = tempDataArrayWeekly.slice(3, userNumCap);
      if (addUserObjectWeekly) {
        arrayCappedWeekly.push(userExtraObjectWeekly);
      }
      arrayCappedWeekly.push(extraItem);
      return arrayCappedWeekly;
    });

    
    if (tempDataArray.length > 0) {
      for (let i = 0; i < 3; i++) {
        getDownloadURL(ref(storage, 'profilePictures/' + tempDataArray[i].userRef))
        .then((url) => {
          
          if (i === 0) {
            setImgSrc(url)
            setFirstName(tempDataArray[i].userName)
            setIdFirst(tempDataArray[i].userRef)
            
            setDaysFirst(() => {
              if (tempDataArray[i].lastUpdate !== today && tempDataArray[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArray[i].daysInRow;
              }
            })
            setPointsFirst(tempDataArray[i].totalPoints)
          } else if (i === 1) {
            setImgSrc2(url)
            setSecondName(tempDataArray[i].userName)
            setIdSecond(tempDataArray[i].userRef)

            setDaysSecond(() => {
              if (tempDataArray[i].lastUpdate !== today && tempDataArray[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArray[i].daysInRow;
              }
            })
            setPointsSecond(tempDataArray[i].totalPoints)
          } else if (i === 2) {
            setImgSrc3(url)
            setThirdName(tempDataArray[i].userName)
            setIdThird(tempDataArray[i].userRef)

            setDaysThird(() => {
              if (tempDataArray[i].lastUpdate !== today && tempDataArray[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArray[i].daysInRow;
              }
            })
            setPointsThird(tempDataArray[i].totalPoints)
          }
            
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'storage/object-not-found') {
          console.log('no file for profile');
          }
        });

        getDownloadURL(ref(storage, 'profilePictures/' + tempDataArrayWeekly[i].userRef))
        .then((url) => {
          
          if (i === 0) {
            setImgSrcWeekly(url)
            setFirstNameWeekly(tempDataArrayWeekly[i].userName)
            setIdFirstWeekly(tempDataArrayWeekly[i].userRef)
            
            setDaysFirstWeekly(() => {
              if (tempDataArrayWeekly[i].lastUpdate !== today && tempDataArrayWeekly[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArrayWeekly[i].daysInRow;
              }
            })
            setPointsFirstWeekly(tempDataArrayWeekly[i].weeklyPoints)
          } else if (i === 1) {
            setImgSrc2Weekly(url)
            setSecondNameWeekly(tempDataArrayWeekly[i].userName)
            setIdSecondWeekly(tempDataArrayWeekly[i].userRef)

            setDaysSecondWeekly(() => {
              if (tempDataArrayWeekly[i].lastUpdate !== today && tempDataArrayWeekly[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArrayWeekly[i].daysInRow;
              }
            })
            setPointsSecondWeekly(tempDataArrayWeekly[i].weeklyPoints)
          } else if (i === 2) {
            setImgSrc3Weekly(url)
            setThirdNameWeekly(tempDataArrayWeekly[i].userName)
            setIdThirdWeekly(tempDataArrayWeekly[i].userRef)
            setDaysThirdWeekly(() => {
              if (tempDataArrayWeekly[i].lastUpdate !== today && tempDataArrayWeekly[i].lastUpdate !== yesterday) {
                return 0;
              } else {
                return tempDataArrayWeekly[i].daysInRow;
              }
            })
            setPointsThirdWeekly(tempDataArrayWeekly[i].weeklyPoints)
          }
            
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'storage/object-not-found') {
          console.log('no file for profile');
          }
        });
      }
    }
    
    
    
  }


  const changeSide = () => {

    if (!weekly) {
      setWeekly(true);
      Animated.timing(interpolatedValueFlipFirst, {
        toValue: 90,
        duration: rotationTime,
        delay: 0,
        easing: Easing.bezier(.49,.13,1,1),
        useNativeDriver: true
      }).start();
      Animated.timing(interpolatedValueFlipSecond, {
          toValue: 0,
          duration: rotationTime,
          delay: rotationTime,
          easing: Easing.bezier(.67,1.08,1,1),
          useNativeDriver: true
      }).start();

    } else {
      setWeekly(false);

      Animated.timing(interpolatedValueFlipFirst, {
        toValue: 0,
        duration: rotationTime,
        delay: rotationTime,
        easing: Easing.bezier(.49,.13,1,1),
        useNativeDriver: true
      }).start();
      Animated.timing(interpolatedValueFlipSecond, {
          toValue: -90,
          duration: rotationTime,
          delay: 0,
          easing: Easing.bezier(.67,1.08,1,1),
          useNativeDriver: true
      }).start();
    }
    
  }

  return (
    <View style={styles.mainContainer}>


      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => changeSide()}>
          <Text style={styles.toggleText} allowFontScaling={false}>{toggleText}</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.switcherContainer}>

        <Animated.View style={{...styles.switcherHolder, transform: [{perspective: 500}, {rotateY: rotateVal}]}}>
          <TouchableOpacity onPress={() => changeSide()}>
            <Text style={styles.switcherText} allowFontScaling={false}>{alltimeText}</Text>

          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{...styles.switcherHolder, position: 'absolute', transform: [{perspective: 500}, {rotateY: rotateValTrans}]}}>
          <TouchableOpacity onPress={() => changeSide()}>
          <Text style={styles.switcherText} allowFontScaling={false}>{weeklyText}</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>

      {weekly ?  <View style={styles.topContainer}>
        <View style={{...styles.positionSecond, borderColor: idSecondWeekly === auth.currentUser.uid ? '#1D976C': '#A7BFE8'}}>
          <Image style={styles.pictureSecond}  source={{ uri: imgSrc2Weekly }} />
          <Text style={styles.positionText} allowFontScaling={false}>2</Text>
          <Text style={styles.userNameTop} numberOfLines={1} allowFontScaling={false}>{secondNameWeekly}</Text>
          <Text style={styles.pointsTop} allowFontScaling={false}>{daysSecondWeekly} / {pointsSecondWeekly}</Text>
        </View>
        <View style={{...styles.positionThird, borderColor: idThirdWeekly === auth.currentUser.uid ? '#1D976C': '#A7BFE8'}}>
          <Image style={styles.pictureThird}  source={{ uri: imgSrc3Weekly }} />
          <Text style={styles.positionText} allowFontScaling={false}>3</Text>
          <Text style={styles.userNameTop} numberOfLines={1} allowFontScaling={false}>{thirdNameWeekly}</Text>
          <Text style={styles.pointsTop} allowFontScaling={false}>{daysThirdWeekly} / {pointsThirdWeekly}</Text>
        </View>
        <View style={{...styles.positionFirst, borderColor: idFirstWeekly === auth.currentUser.uid ? '#1D976C': '#6190E8'}}>
          <Image style={styles.pictureFirst}  source={{ uri: imgSrcWeekly }} />
          <Text style={styles.positionText} allowFontScaling={false}>1</Text>
          <Text style={styles.userNameTop} numberOfLines={1}  allowFontScaling={false}>{firstNameWeekly}</Text>
          <Text style={styles.pointsTop} allowFontScaling={false}>{daysFirstWeekly} / {pointsFirstWeekly}</Text>
        </View>
      </View> : <View style={styles.topContainer}>
        <View style={{...styles.positionSecond, borderColor: idSecond === auth.currentUser.uid ? '#1D976C' : '#A7BFE8'}}>
          <Image style={{...styles.pictureSecond}}  source={{ uri: imgSrc2 }} />
          <Text style={styles.positionText} allowFontScaling={false}>2</Text>
          <Text style={styles.userNameTop} numberOfLines={1} allowFontScaling={false}>{secondName}</Text>
          <Text style={styles.pointsTop} allowFontScaling={false}>{daysSecond} / {pointsSecond}</Text>
        </View>
        <View style={{...styles.positionThird, borderColor: idThird === auth.currentUser.uid ? '#1D976C' : '#A7BFE8'}}>
          <Image style={styles.pictureThird}  source={{ uri: imgSrc3 }} />
          <Text style={styles.positionText} allowFontScaling={false}>3</Text>
          <Text style={styles.userNameTop} numberOfLines={1} allowFontScaling={false}>{thirdName}</Text>
          <Text style={styles.pointsTop}  allowFontScaling={false}>{daysThird} / {pointsThird}</Text>
        </View>
        <View style={{...styles.positionFirst, borderColor: idFirst === auth.currentUser.uid ? '#1D976C' : '#6190E8'}}>
          <Image style={styles.pictureFirst}  source={{ uri: imgSrc }} />
          <Text style={styles.positionText} allowFontScaling={false}>1</Text>
          <Text style={styles.userNameTop} numberOfLines={1}  allowFontScaling={false}>{firstName}</Text>
          <Text style={styles.pointsTop} allowFontScaling={false}>{daysFirst} / {pointsFirst}</Text>
        </View>
      </View>}



      
      <View style={styles.middleContainer}>
        
        { weekly ? <FlatList
          data={dataFlatListWeekly}
          estimatedItemSize={68}
          keyExtractor={(item) => item.userRef}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RankingItem params={item} userRef={userId} today={today} yesterday={yesterday} weekly={true}/>}
          /> : <FlatList
          data={dataFlatList}
          estimatedItemSize={68}
          keyExtractor={(item) => item.userRef}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RankingItem params={item} userRef={userId} today={today} yesterday={yesterday} weekly={false}/>}
        />}
        
       
      </View>
      
    </View>
  )
}

export default ResultsScreen