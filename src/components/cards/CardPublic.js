import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firebase-config'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;


const CardPublic = (params) => {

    const navigation = useNavigation();

    const wordsOwn = collection(db, 'wordsOwn');

    const [documentId, setDocumentId] = useState(params.docForUpdate);
    const [addBtnTxt, setAddBtnTxt] = useState('Add to your lists');
    const [addBtnSuccesTxt, setAddBtnSuccesTxt] = useState('List added');

    const [seeBtnTxt, setSeeBtnTxt] = useState('See');
    const [alreadyAdded, setAlreadyAdded] = useState(false);



    const pressLearn = () => {
        navigation.navigate('LearnWord', {refToList: params.listReference, userId: params.currentUser, savedLang: 'EN', own: true, myTitle: params.title, userLangOwnCard: params.choosenLang})
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
                setAddBtnTxt(addBtnSuccesTxt);
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
    

    useEffect(() => {

        if (params.choosenLang === 'PL') {
            setAddBtnTxt('Dodaj do swoich list');
            setAddBtnSuccesTxt('Lista dodana');
            setSeeBtnTxt('Zobacz');
        } else if (params.choosenLang === 'DE') {
            setAddBtnTxt('Zu Listen hinzufügen');
            setAddBtnSuccesTxt('Liste hinzugefügt');
            setSeeBtnTxt('Sehen');
        } else if (params.choosenLang === 'LT') {
            setAddBtnTxt('Pridėti prie savo sąrašų');
            setAddBtnSuccesTxt('Sąrašas pridėtas');
            setSeeBtnTxt('Matyti');
        } else if (params.choosenLang === 'AR') {
            setAddBtnTxt('أضف إلى قوائمك');
            setAddBtnSuccesTxt('تم إضافة القائمة');
            setSeeBtnTxt('انظر');
        } else if (params.choosenLang === 'UA') {
            setAddBtnTxt('Додати до своїх списків');
            setAddBtnSuccesTxt('Список додано');
            setSeeBtnTxt('Бачити');
        } else if (params.choosenLang === 'ES') {
            setAddBtnTxt('Añadir a tus listas');
            setAddBtnSuccesTxt('Lista añadida');
            setSeeBtnTxt('Ver');
        }
  
    }, [])


  return (
    <View style={styles.mainContainer}>
        
        <View style={styles.bigCircle}>
            <View style={styles.smallCircle}>
                <Text style={styles.textTitle} allowFontScaling={false}>{params.title}</Text>
                <Text style={styles.textLang} allowFontScaling={false}>{params.lang}</Text>
                <Text style={styles.textLang} allowFontScaling={false}></Text>
                
            </View>
        </View>
        <View style={styles.wordNrCont}>
            <Text style={styles.wordNrText}>{params.wordsLength} ord</Text>
        </View>
        
      <Text></Text>
      <Text></Text>
      {params.userId === params.currentUser ? <View></View> : <TouchableOpacity style={styles.touchableEdit}> 
        <Text style={styles.touchableEditText} onPress={alreadyAdded ? null : addToYour}>{addBtnTxt}</Text>
      </TouchableOpacity>}
      
      <TouchableOpacity style={styles.touchableTest} onPress={pressLearn}> 
        <Text style={styles.touchableTestText}>{seeBtnTxt}</Text>
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
        paddingRight: 20,
        paddingLeft: screenWidth * 0.3
    },
    textTitle: {
        color: 'white',
        fontSize: isWideScreen ? 30 : 20,
        fontWeight: '600',
        textAlign: 'right'
    },
    textLang: {
        color: 'white',
        fontSize: isWideScreen ? 24 : 16,
        fontWeight: '500',
        textAlign: 'right'
    },
    touchableEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: isWideScreen ? 20 * ratioForWideScreen : 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        bottom: 10,
        left: 30,
        borderWidth: 1,
        borderColor: 'white'
    },
    touchableEditText: {
        color: 'white',
        fontSize: 10
    },
    touchableTest: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: isWideScreen ? 20 * ratioForWideScreen : 20,
        width: isWideScreen ? 70 * ratioForWideScreen :70,
        borderRadius: 5,
        bottom: 10,
        right: 25,
        borderWidth: 1.5,
        borderColor: '#282e38'
    },
    touchableTestText: {
        color: '#282e38',
        fontWeight: '500',
        fontSize: isWideScreen ? 20 : 10
    },
    wordNrCont: {
        position: 'absolute',
        top: 10,
        left: 25
    },
    wordNrText: {
        color: 'white',
        fontSize: isWideScreen ? 26 : 13,
        fontWeight: '500'
    }
   
});