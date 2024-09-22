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
import styles from './style'
import CardOwn from '../../components/cards/CardOwn';




const wordsOwn = collection(db, 'wordsOwn');

const MyListScreen = ({ route }) => {


    const {userRef, language} = route.params
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [isContent, setIsContent] = useState(false); 
    const [dataFlatlist, setDataFlatlist] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('It looks like you haven’t created any flashcards in this section yet. Tap the "Create new" button and make your first card!');
    const [btnTxt, setBtnTxt] = useState('Create new');
    const [btnTxt2, setBtnTxt2] = useState('Explore Cards');
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [sound, setSound] = useState();
    

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const opacityMessage = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();

    const xPositionDeg = interpolatedValueForX.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "180deg"]
    })




    const renderItemFunc = ({item}) => {
  
      return <CardOwn lang={item.listLang} title={item.listTitle} userId={item.useRef} listReference={item.refNum} choosenLang={language}/>
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
  
          navigation.navigate('Main');
      }, 800)
    }
    

    useEffect(() => {

      
      setUserId(userRef);


      const getDataFb = async () => {

          const q = query(wordsOwn, where('useRef', '==', userRef))
          const querySnapshot = await getDocs(q);
          let tempArr = [];
  
          if (querySnapshot.empty) {
            Animated.timing(opacityMessage, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }).start()
          } else {
            setIsContent(true);
          }
          
          querySnapshot.forEach((doc) => {
            tempArr.push(doc.data());
          });
  
          setDataFlatlist(tempArr)
      }
  
      getDataFb();


      
    }, [isFocused])



    useEffect(() => {

      getValueFor('sound');


      if (language === 'PL') {
        setMessage('Wygląda na to, że nie stworzyłeś jeszcze żadnych fiszek w tej sekcji. Naciśnij przycisk "Utwórz nową" i stwórz swoją pierwszą kartę!');
        setBtnTxt('Utwórz nową');
        setBtnTxt2('Eksploruj karty');
      } else if (language === 'DE') {
        setMessage('Es sieht so aus, als hättest du in diesem Bereich noch keine Karteikarten erstellt. Tippe auf den Button "Neu erstellen" und mache deine erste Karte!');
        setBtnTxt('Neu erstellen');
        setBtnTxt2('Karten erkunden');
      } else if (language === 'LT') {
        setMessage('Atrodo, kad šiame skyriuje dar nesukūrėte jokių mokymosi kortelių. Paspauskite mygtuką „Sukurti naują“ ir sukurkite savo pirmąją kortelę!');
        setBtnTxt('Sukurti naują');
        setBtnTxt2('Tyrinėti korteles');
      } else if (language === 'AR') {
        setMessage('يبدو أنك لم تقم بإنشاء أي بطاقات تعليمية في هذا القسم بعد. انقر على زر "إنشاء جديد" واصنع بطاقتك الأولى');
        setBtnTxt('إنشاء جديد');
        setBtnTxt2('استكشاف البطاقات');
      } else if (language === 'UA') {
        setMessage('Здається, ви ще не створили жодної картки в цьому розділі. Натисніть кнопку "Створити нову" та зробіть свою першу картку!');
        setBtnTxt('Створити нову');
        setBtnTxt2('Досліджувати картки');
      } else if (language === 'ES') {
        setMessage('Parece que aún no has creado ninguna tarjeta en esta sección. ¡Toca el botón "Crear nueva" y haz tu primera tarjeta!');
        setBtnTxt('Crear nueva');
        setBtnTxt2('Explorar tarjetas');
      }

    }, []);



    useEffect(() => {

      const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
          require('./../../../assets/sounds/pebbelsClick.wav')
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
    
      <View style={styles.createButtonContainer}>
        <TouchableOpacity style={styles.buttonContainerTop} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => navigation.navigate({
          name: 'PublicLists',
          params: {userRef: userId, choosenLang: language}
        })}>
          <Text style={styles.textButton}>{btnTxt2}</Text>
        </TouchableOpacity>
      </View>
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

        </View> : <Animated.View style={{...styles.emptyContent, opacity: opacityMessage}}>
        
          <Text style={styles.emptyContentText}>{message}</Text>

        </Animated.View>}
      

      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.opacityBtn} onPress={() => navigation.navigate({
            name: 'CreateList',
            params: {userReference: userId, choosenLang: language}
        })}>
            <Text style={styles.buttonText}>{btnTxt} + </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyListScreen