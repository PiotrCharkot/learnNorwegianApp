import { View, Text, TouchableOpacity, FlatList, Animated, Image } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { authentication } from '../../../firebase/firebase-config';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import styles from './style'
import CardPublic from '../../components/cards/CardPublic';




const wordsOwn = collection(db, 'wordsOwn');

const PublicListScreen = ({ route }) => {


    const {userRef} = route.params
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [isContent, setIsContent] = useState(true); //diplay message if thera are no lists!!
    const [dataFlatlist, setDataFlatlist] = useState([]);
    const [userId, setUserId] = useState('');
    const [documentId, setDocumentId] = useState('tempid');
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [getNewData, setGetNewData] = useState('');


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

    const exitButton = () => {

      Animated.spring(interpolatedValueForX, {
          toValue: 360,
          speed: 1,
          bounciness: 12,
          useNativeDriver: true,
      }).start();
  
      setTimeout(() => {
  
          navigation.navigate({
            name: 'MyList',
            params: {userRef: userId}
          });
      }, 800)
    }
    

    useEffect(() => {

      
      setUserId(userRef);


      const getDataFb = async () => {

          const q = query(wordsOwn, where('public', '==', true))
          const querySnapshot = await getDocs(q);
          let tempArr = [];
  
          if (querySnapshot.empty) {
            console.log('there is no lists for this user')
          } else {
            console.log('user exist in data base');
          }
          
          querySnapshot.forEach((doc) => {
            tempArr.push(doc.data());
          });
  
          console.log('temporarttttt: ', tempArr);
          setDataFlatlist(tempArr);


          const q2 = query(userWordsData, where('userReference', '==', userRef))
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
            
                setDocumentId(doc.id);
                setAllUsersArrs(doc.data().wordList);
            
            })
      }
  
      getDataFb();
    
      
    }, [isFocused, getNewData])
    





  return (
    <View style={styles.mainContainer}>
    
      
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

        </View> : <View style={styles.emptyContent}>
        
            <Text style={styles.emptyContentText}>You don't have any lists. Tap button at bottm to create new list</Text>

        </View>}
      

    </View>
  )
}

export default PublicListScreen