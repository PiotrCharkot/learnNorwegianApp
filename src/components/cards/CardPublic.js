import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CardPublic = (params) => {

    const navigation = useNavigation();

    const wordsOwn = collection(db, 'wordsOwn');

    const [documentId, setDocumentId] = useState(params.docForUpdate);
    const [addBtnTxt, setAddBtnTxt] = useState('Add to your lists');
    const [alreadyAdded, setAlreadyAdded] = useState(false);


    const pressLearn = () => {
        navigation.navigate('LearnWord', {refToList: params.listReference, userId: params.currentUser, savedLang: 'EN', own: true, myTitle: params.title})
    }
    
    const addToYour = async () => {
        
        let tempObj;
        let newId = uuid.v4();
        let docId = uuid.v4();
        const q = query(wordsOwn, where('refNum', '==', params.listReference))
          const querySnapshot = await getDocs(q);
          
          
          querySnapshot.forEach( async (docum) => {
            tempObj = docum.data();
            tempObj.public = false;
            tempObj.useRef = params.currentUser;
            tempObj.refNum = newId;
            

            let tempArr = Array.from(Array(tempObj.wordsArr.length).keys());
            let addToUserInfo = {
                refToList: newId,
                words1: tempArr,
                words2: [],
                words3: [],
                words4: [],
                words5: [],
            }

            let temporaryObj = JSON.parse(JSON.stringify(params.allArrs));
            temporaryObj.push(addToUserInfo);

            await setDoc(doc(db, 'wordsOwn', docId), tempObj)
            .then( async () => {
                setAddBtnTxt('List added');
                setAlreadyAdded(true);
                console.log('added this list to your lists')
                await updateDoc(doc(db, "usersWordsInfo", documentId), {
                    wordList: temporaryObj
                })
                .then(docRef => {
                    console.log("A New Document for user info after adding public list");
                    params.resetData(newId);
                })
                .catch(error => {
                    console.log(error);
                })
            }
            )
            .catch((error) => {
                console.log(error)
            });

        });
        
    }
    
    useEffect(() => {
      
        setDocumentId(params.docForUpdate)
     
    }, [params.docForUpdate])
    



  return (
    <View style={styles.mainContainer}>
        
        <View style={styles.bigCircle}>
            <View style={styles.smallCircle}>
                <Text style={styles.textTitle}>{params.title}</Text>
                <Text style={styles.textLang}>{params.lang}</Text>
                <Text style={styles.textLang}></Text>
                
            </View>
        </View>
        <View style={styles.wordNrCont}>
            <Text style={styles.wordNrText}>{params.wordsLength} words</Text>
        </View>
        
      <Text></Text>
      <Text></Text>
      {params.userId === params.currentUser ? <View></View> : <TouchableOpacity style={styles.touchableEdit}> 
        <Text style={styles.touchableEditText} onPress={alreadyAdded ? null : addToYour}>{addBtnTxt}</Text>
      </TouchableOpacity>}
      
      <TouchableOpacity style={styles.touchableTest} onPress={pressLearn}> 
        <Text style={styles.touchableTestText}>See</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CardPublic


const styles = StyleSheet.create({
    mainContainer: {
        height: screenWidth * 0.5,
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 20,
        overflow: 'hidden'
    },
    bigCircle: {
        height: screenWidth * 0.8,
        width: screenWidth * 0.8,
        backgroundColor: 'pink',
        borderRadius: screenWidth * 0.8 / 2,
        transform: [{translateX: -screenWidth * 0.2}]
    },
    smallCircle: {
        height: screenWidth * 0.8,
        width: screenWidth * 0.8,
        backgroundColor: '#282e38',
        borderRadius: screenWidth * 0.8 / 2,
        transform: [{translateX: -screenWidth * 0.05}, {translateY: screenWidth * 0.05}],
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    textLang: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    touchableEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 110,
        borderRadius: 5,
        bottom: 10,
        left: 30,
        borderWidth: 1,
        borderColor: 'white'
    },
    touchableEditText: {
        color: 'white',
        fontSize: 12
    },
    touchableTest: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 70,
        borderRadius: 5,
        bottom: 10,
        right: 25,
        borderWidth: 1.5,
        borderColor: '#282e38'
    },
    touchableTestText: {
        color: '#282e38',
        fontWeight: '500',
        fontSize: 12
    },
    wordNrCont: {
        position: 'absolute',
        top: 10,
        left: 25
    },
    wordNrText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '500'
    }
   
});