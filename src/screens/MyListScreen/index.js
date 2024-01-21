import { View, Text, TouchableOpacity, FlatList, Animated, Image } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { authentication } from '../../../firebase/firebase-config';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import styles from './style'
import CardOwn from '../../components/cards/CardOwn';




const wordsOwn = collection(db, 'wordsOwn');

const MyListScreen = ({ route }) => {


    const {userRef} = route.params
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [isContent, setIsContent] = useState(false); 
    const [dataFlatlist, setDataFlatlist] = useState([]);
    const [userId, setUserId] = useState('');

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const opacityMessage = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();

    const xPositionDeg = interpolatedValueForX.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "180deg"]
    })




    const renderItemFunc = ({item}) => {
  
      return <CardOwn lang={item.listLang} title={item.listTitle} userId={item.useRef} listReference={item.refNum} />
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
            console.log('there is no lists for this user')
            Animated.timing(opacityMessage, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }).start()
          } else {
            console.log('user exist in data base');
            setIsContent(true);
          }
          
          querySnapshot.forEach((doc) => {
            tempArr.push(doc.data());
          });
  
          setDataFlatlist(tempArr)
      }
  
      getDataFb();
    
      
    }, [isFocused])
    





  return (
    <View style={styles.mainContainer}>
    
      <View style={styles.createButtonContainer}>
        <TouchableOpacity style={styles.buttonContainerTop} onPress={() => navigation.navigate({
          name: 'PublicLists',
          params: {userRef: userId}
        })}>
          <Text style={styles.textButton}>See other user's lists</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
        <TouchableOpacity onPress={() => exitButton()}>
          
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
        
          <Text style={styles.emptyContentText}>You don't have any lists. Tap button at bottm to create a new list</Text>

        </Animated.View>}
      

      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.opacityBtn} onPress={() => navigation.navigate({
            name: 'CreateList',
            params: {userReference: userId}
        })}>
            <Text style={styles.buttonText}>Create new list + </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyListScreen