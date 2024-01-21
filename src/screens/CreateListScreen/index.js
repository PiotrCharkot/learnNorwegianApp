import { View, Text, TouchableOpacity, FlatList, Image, Animated } from 'react-native'
import React, {useState, useRef, useEffect, createRef}  from 'react'
import { Input } from "react-native-elements"; 
import { CheckBox, Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import styles from './style'
import { withAnchorPoint } from 'react-native-anchor-point';
import uuid from 'react-native-uuid';
import { db } from '../../../firebase/firebase-config'



const CreateListScreen = ({ route }) => {

    const {userReference} = route.params;
    const navigation = useNavigation();
    let wordIdentification = 0;


    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [norWord, setNorWord] = useState('');
    const [transWord, setTransWord] = useState('');
    const [documentId, setDocumentId] = useState('tempid');
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [isSelectedPublic, setIsSelectedPublic] = useState(false);


    const userWordsData = collection(db, 'usersWordsInfo');
    const docRef = doc(db, "usersWordsInfo", documentId);

    const norInput = createRef();
    const transInput = createRef();

    const [dataFlatList, setDataFlatList] = useState([]);

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const messageOpacity = useRef(new Animated.Value(0)).current;
    const [showMessage, setShowMessage] = useState(false)


    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    const deletePosition = (pairKey) => {
        let tempObj = [];
        
        dataFlatList.map(item => {
            if (item.key !== pairKey) {
                tempObj.push(item)
            }
        } );

        setDataFlatList(tempObj);
        
    }

    const dismissMessage = () => {
        Animated.timing(messageOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            setShowMessage(false);
        }, 500);
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
            tempObj.push({
                nor: norWord,
                eng: transWord,
                key: wordKey,
                wordId: tempObj.length === 0 ? 0 : tempObj[tempObj.length - 1].wordId + 1,
                soundLink: ''
            })

            
            norInput.current.clear();
            transInput.current.clear();
            setNorWord('');
            setTransWord('');
            
            setDataFlatList(tempObj);
        }
        
        
    }

    const createList = async () => {
        console.log('add list to firebase');

        if (title !== '' && language !== '') {
            let docId = uuid.v4();
            let listRef = uuid.v4();
            await setDoc(doc(db, 'wordsOwn', docId),{
                listLang: language,
                refNum: listRef,
                listTitle: title,
                public: isSelectedPublic,
                useRef: userReference,
                wordsArr: dataFlatList
            })

            
            let tempArr = Array.from(Array(dataFlatList.length).keys())
            console.log('temporrary arr ', tempArr);
            let addToUserInfo = {
                refToList: listRef,
                words1: tempArr,
                words2: [],
                words3: [],
                words4: [],
                words5: [],
            }

            console.log('object ', addToUserInfo);
            let tempInfo = JSON.parse(JSON.stringify(allUsersArrs))
            tempInfo.push(addToUserInfo)

            console.log('final ', tempInfo);

            await updateDoc(docRef, {
                wordList: tempInfo
            })
            .then(docRef => {
                console.log("A New Document Field has been added to an existing document");
            })
            .catch(error => {
                console.log(error);
            })


            exitButton();
        } else {
            //display message
            console.log('display message to fill rest of form ');
            setShowMessage(true);
            Animated.timing(messageOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
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

            const q2 = query(userWordsData, where('userReference', '==', userReference))
            const querySnapshot2 = await getDocs(q2);
            querySnapshot2.forEach((doc) => {
            
                setDocumentId(doc.id);
                setAllUsersArrs(doc.data().wordList);
            
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
        <Text style={styles.labelText}>Title</Text>
        <Input 
        style={styles.input}
        placeholder='Title e.g. Nouns - A1'
        onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.labelText}>Language</Text>
        <Input 
        style={styles.input}
        placeholder='Your language e.g. english'
        onChangeText={(text) => setLanguage(text)}
        autoCapitalize='none'
        />

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

            {dataFlatList.length > 1 ? <TouchableOpacity  style={styles.opacityBtn} onPress={() => createList()}>
                <Text style={styles.opacityBtnText}>Create list</Text>
            </TouchableOpacity> : <View style={styles.infoContainer}>
                <Text style={styles.textInfo}>Add at least two pairs of words to create a list</Text>

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
            onPress={() => setIsSelectedPublic(!isSelectedPublic)}
            //checkedColor={'green'}
            containerStyle={
                {backgroundColor: 'white'}
            }
            textStyle={{
                color: 'grey',
                fontSize: 12
            }}
            />

            
        
        </View>

        {showMessage ? <Animated.View style={{...styles.messageContainer, opacity: messageOpacity}}>
            <Text style={styles.opacityBtnTextInfo}>Hold up! A list without a 'Title' and 'Language'? Please fill them in before making a list.</Text>
            <TouchableOpacity  style={styles.confirmationBtn} onPress={() => dismissMessage()}>
                <Text style={styles.opacityBtnText}>Ok</Text>
            </TouchableOpacity>
        </Animated.View> : <View></View>}   
        
    </View>
  )
}

export default CreateListScreen