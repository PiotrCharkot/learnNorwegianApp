import { View, Text, TouchableOpacity, FlatList, Animated, Image } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { authentication } from '../../../firebase/firebase-config';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import { Audio } from 'expo-av';
import Loader from '../../components/other/Loader';
import styles from './style'
import CardPublic from '../../components/cards/CardPublic';




const wordsOwn = collection(db, 'wordsOwn');

const PublicListScreen = ({ route }) => {


    const {userRef, choosenLang} = route.params
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [isContent, setIsContent] = useState(false); 
    const [dataFlatlist, setDataFlatlist] = useState([]);
    const [userId, setUserId] = useState('');
    const [documentId, setDocumentId] = useState('tempid');
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [getNewData, setGetNewData] = useState('');
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [sound, setSound] = useState();


    const userWordsData = collection(db, 'usersWordsInfo');

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();

    const xPositionDeg = interpolatedValueForX.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "180deg"]
    })

    const renderItemFunc = ({item}) => {
  
      return <CardPublic 
        lang={item.listLang} 
        title={item.listTitle} 
        userId={item.useRef} 
        listReference={item.refNum} 
        currentUser={userRef} 
        allArrs={allUsersArrs}
        docForUpdate={documentId}
        choosenLang={choosenLang}
        wordsLength={item.wordsArr.length}
        resetData={(boolean) => setGetNewData(boolean)}
        />
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
      let transform = {
          transform: [{ perspective: 400 }, transValA, transValB],
      };
      return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };


    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        if (key === 'sound' && result === '0') {
          setIsSoundOn(false);
        } else if (key === 'sound' && result === '1') {
          setIsSoundOn(true);
        }
      } else {
        console.log('No values stored under that key: ', key);
      }
    }


    const playSound = async () => {
      await sound?.replayAsync(); 
    };


    const exitButton = () => {


      if (isSoundOn) {

        playSound();
      }

      Animated.spring(interpolatedValueForX, {
          toValue: 360,
          speed: 1,
          bounciness: 12,
          useNativeDriver: true,
      }).start();
  
      setTimeout(() => {
  
          navigation.navigate({
            name: 'MyList',
            params: {userRef: userId, language: choosenLang}
          });
      }, 800)
    }
    

    useEffect(() => {

      
      setUserId(userRef);


      const getDataFb = async () => {

        const q = query(wordsOwn, where('public', '==', true))
        const querySnapshot = await getDocs(q);
        let tempArr = [];

        
        querySnapshot.forEach((doc) => {
          tempArr.push(doc.data());
        });

        
        setDataFlatlist(tempArr);
        setIsContent(true);

        const q2 = query(userWordsData, where('userReference', '==', userRef))
          const querySnapshot2 = await getDocs(q2);
          querySnapshot2.forEach((doc) => {
          
              setDocumentId(doc.id);
              setAllUsersArrs(doc.data().wordList);
          
          })
      }
  
      getDataFb();
    
      
    }, [isFocused, getNewData])
    


    useEffect(() => {

      const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
          require('./../../../assets/sounds/pebbelsClick.wav')
        );
        setSound(sound);
      };
  
      loadSound();

      getValueFor('sound');
  
      return () => {
        sound?.unloadAsync();
      };
    }, []);



  return (
    <View style={styles.mainContainer}>
    
      
      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => exitButton()}>
            <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

        </TouchableOpacity>
      </Animated.View>

      {isContent ? <View style={styles.cardsContainer}>

           

        <FlatList 
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        decelerationRate={0}
        data={dataFlatlist}
        keyExtractor={(item) => item.refNum}
        renderItem={renderItemFunc}
        
        scrollEventThrottle={16}
        />

        </View> : <View style={styles.loaderDisplay}>
          <Loader />
        </View>}
      

    </View>
  )
}

export default PublicListScreen