import { View, Text, TouchableOpacity, FlatList, Image, Animated, Dimensions } from 'react-native'
import React, {useState, useRef, useEffect, createRef}  from 'react'
import { Input } from "react-native-elements"; 
import { CheckBox, Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from './style'
import { withAnchorPoint } from 'react-native-anchor-point';
import uuid from 'react-native-uuid';
import { db } from '../../../firebase/firebase-config'

const screenHight = Dimensions.get('window').height;

const EditListScreen = ({ route }) => {

    const {userReference, refToList} = route.params;
    const navigation = useNavigation();
    
    
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [norWord, setNorWord] = useState('');
    const [transWord, setTransWord] = useState('');
    const [documentId, setDocumentId] = useState('tempid');
    const [documentIdInfoDoc, setDocumentIdInfoDoc] = useState('tempid');
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [lastIdentification, setLastIdentification] = useState(0);
    const [isSelectedPublic, setIsSelectedPublic] = useState(false);
    const [newWordIdArr, setNewWordIdArr] = useState([])
    const [removedWordIdArr, setRemovedWordIdArr] = useState([]);
    
    
    
    const wordsUserInfo = collection(db, 'usersWordsInfo');
    const wordsOwn = collection(db, 'wordsOwn');
    const docRef = doc(db, "usersWordsInfo", documentIdInfoDoc);
    const docRefOwn = doc(db, "wordsOwn", documentId);
    
    const norInput = createRef();
    const transInput = createRef();
    
    const [dataFlatList, setDataFlatList] = useState([]);
    
    const confirmationPos = useRef(new Animated.Value(200)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;


    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    const deletePosition = (pairKey) => {
        let tempObj = [];
        
        dataFlatList.map(item => {
            if (item.key !== pairKey) {
                tempObj.push(item)
            } else {
                let tempRemovedArr = JSON.parse(JSON.stringify(removedWordIdArr));
                tempRemovedArr.push(item.wordId);
                setRemovedWordIdArr(tempRemovedArr);
            }
        } );

        setIsChanged(true);
        setDataFlatList(tempObj);
        
    }


    const renderWords = ({item, index}) => {

    
        return <View style={styles.wordsContainer}>
    
          <Text style={styles.wordsText}>{item.nor} - {item.eng} </Text>
          <TouchableOpacity onPress={() => {deletePosition(item.key)}}>
            <Image style={styles.image} source={require('../../../assets/close.png')} />
          </TouchableOpacity>
        </View>
    }

    const addWordToList = () => {

        if (norWord !== '' && transWord !== '') {
            
            let wordKey = uuid.v4();
            let tempObj = JSON.parse(JSON.stringify(dataFlatList))
            let tempNewArr = JSON.parse(JSON.stringify(newWordIdArr))
            tempObj.push({
                nor: norWord,
                eng: transWord,
                key: wordKey,
                wordId: lastIdentification,
                soundLink: ''
            })
            
            tempNewArr.push(lastIdentification);
            setNewWordIdArr(tempNewArr);
            
            norInput.current.clear();
            transInput.current.clear();
            setLastIdentification(lastIdentification + 1);
            setNorWord('');
            setTransWord('');
            setIsChanged(true);
            setDataFlatList(tempObj);
        }
        
        
    }


    const showConfirmation = () => {
        Animated.spring(confirmationPos, {
            toValue: -screenHight / 2 + 65,
            speed: 3,
            bounciness: 5,
            useNativeDriver: true,
        }).start();
    
    }

    const hideConfirmation = () => {
        Animated.spring(confirmationPos, {
            toValue: 200,
            speed: 10,
            bounciness: 5,
            useNativeDriver: true,
        }).start();
    }

    const deleteList = async () => {
       
        await deleteDoc(docRefOwn);

        exitButton();
    }

    const updateList = async () => {
        console.log('add list to firebase');
        if (dataFlatList.length > 0) {
            await updateDoc(docRefOwn, {
                wordsArr: dataFlatList
            })
            .then(docRef => {
                console.log("own list update from edit screen");
                updateUserInfo();
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            console.log('display message cant be empty');
        }
        
        //display message cant be empty
    }



    const updateUserInfo = async () => {

        let tempArr = allUsersArrs; 

        tempArr.map(obj => {
            if (obj.refToList === refToList) {
                obj.words1 = [...obj.words1, ...newWordIdArr];
                //myArray = myArray.filter( ( el ) => !toRemove.includes( el ) );
                obj.words1 = obj.words1.filter(el => !removedWordIdArr.includes(el))
                obj.words2 = obj.words2.filter(el => !removedWordIdArr.includes(el))
                obj.words3 = obj.words3.filter(el => !removedWordIdArr.includes(el))
                obj.words4 = obj.words4.filter(el => !removedWordIdArr.includes(el))
                obj.words5 = obj.words5.filter(el => !removedWordIdArr.includes(el))
            }
        })

        await updateDoc(docRef, {
            wordList: tempArr
        })
        .then(docRef => {
            console.log("own list update from edit screen");
        })
        .catch(error => {
            console.log(error);
        })
        
        exitButton();
    }

    const updatePublicVal = async () => {
        await updateDoc(docRefOwn, {
            public: !isSelectedPublic
        })
        .then(docRef => {
            console.log("public val update from edit screen");
        })
        .catch(error => {
            console.log(error);
        })
    }


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
                params: {userRef: userReference}
              });
        }, 800)
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };


    useEffect(() => {

        const getDataFb = async () => {

            const q = query(wordsUserInfo, where('userReference', '==', userReference))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            
                
                setDocumentIdInfoDoc(doc.id);
                setAllUsersArrs(doc.data().wordList)
                
                
            })


            const q2 = query(wordsOwn, where('refNum', '==', refToList))
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
            
                setLastIdentification(doc.data().wordsArr[doc.data().wordsArr.length - 1].wordId + 1);
                
                setDocumentId(doc.id);
                setDataFlatList(doc.data().wordsArr);
                setIsSelectedPublic(doc.data().public)
                
            })
        }
      

        getDataFb();

        return () => {
            getDataFb;
        };
    }, [])
    

  return (
    <View style={styles.mainContainer}> 

      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
        <TouchableOpacity onPress={() => exitButton()}>
            <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

        </TouchableOpacity>
      </Animated.View>
      <View style={styles.inputContainer}>
        

        <View style={styles.addingContainer}>
        
            <View style={styles.inputHolder}>

                <Input 
                style={styles.input}
                ref={norInput}
                placeholder='norwegian word'
                inputContainerStyle={styles.inputSmallContainerStyle}
                onChangeText={(text) => setNorWord(text)}
                autoCapitalize='none'
    
                />
            </View>
            
            <View style={styles.inputHolder}>

                <Input 
                style={styles.input}
                ref={transInput}
                placeholder='translation'
                inputContainerStyle={styles.inputSmallContainerStyle}
                onChangeText={(text) => setTransWord(text)}
                autoCapitalize='none'
                />
            </View>

            
        </View>

        
        <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.opacityBtn} onPress={() => addWordToList()}>
                <Text style={styles.opacityBtnText}>Add</Text>
            </TouchableOpacity>

            {isChanged ? <TouchableOpacity  style={styles.opacityBtn} onPress={() => updateList()}>
                <Text style={styles.opacityBtnText}>Update list</Text>
            </TouchableOpacity> : <View style={styles.infoContainer}>
                <Text style={styles.textInfo}>Add words and update list</Text>

            </View> }
        </View>

        <View style={styles.addedWords}>
            <FlatList 
            style={styles.flatList}
            data={dataFlatList}
            renderItem={renderWords}
            keyExtractor={(item) => item.key}
            //inverted={true}
            />
        </View>


        

        
      </View>
        <View style={styles.checkboxContainer}>
                

            <CheckBox
            center
            title="share this list with other users"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={isSelectedPublic}
            onPress={() => {
                updatePublicVal()
                setIsSelectedPublic(!isSelectedPublic);
                
            }}
            //checkedColor={'green'}
            containerStyle={
                {backgroundColor: 'white'}
            }
            textStyle={{
                color: 'grey',
                fontSize: 12
            }}
            />


            <TouchableOpacity style={styles.deleteOpacity} onPress={showConfirmation}>
                <Text style={styles.deleteOpacityText}>Delete list</Text>
            </TouchableOpacity>
            
        
        </View>

        <Animated.View style={{...styles.confirmationContainer, transform: [{translateY: confirmationPos}]}}>
            <View style={styles.confirmationContainerInside}>

                <Text style={styles.confirmationText}>About to throw this list into a shredder. Still on board?</Text>

                <View style={styles.confirmationBtnCont}>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={deleteList}>
                        <Text style={styles.confirmationBtnTxt}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={hideConfirmation}>
                        <Text style={styles.confirmationBtnTxt}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    </View>
  )
}

export default EditListScreen