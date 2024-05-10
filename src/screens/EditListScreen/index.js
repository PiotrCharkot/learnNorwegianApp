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

    const {userReference, refToList, choosenLang} = route.params;
    const navigation = useNavigation();
    
    const maxLengthWords = 200;
    
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
    const [messageAdd, setMessageAdd] = useState('Add words and update list');
    const [confirmDelete, setConfirmDelete] = useState('Are you sure you want to delete this list?');
    const [messageNotSaved, setMessageNotSaved] = useState('The word list was not updated. Are you sure you want to exit?')
    const [placeholder3, setPlaceholder3] = useState('Norwegian word');
    const [placeholder4, setPlaceholder4] = useState('translation');
    const [checkBoxLabel, setCheckBoxLabel] = useState('share this list with other users');
    const [buttonsArray, setButtonsArray] = useState(['Add', 'Update List', 'Delete list', 'Yes', 'No'])
    
    
    const wordsUserInfo = collection(db, 'usersWordsInfo');
    const wordsOwn = collection(db, 'wordsOwn');
    const docRef = doc(db, "usersWordsInfo", documentIdInfoDoc);
    const docRefOwn = doc(db, "wordsOwn", documentId);
    
    const norInput = createRef();
    const transInput = createRef();
    
    const [dataFlatList, setDataFlatList] = useState([]);
    
    const confirmationPos = useRef(new Animated.Value(300)).current;
    const confirmationPos2 = useRef(new Animated.Value(300)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;


    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    const deletePosition = (pairKey) => {
        let tempObj = [];
        
        dataFlatList.reverse().map(item => {
            if (item.key !== pairKey) {
                tempObj.push(item)
            } else {
                let tempRemovedArr = JSON.parse(JSON.stringify(removedWordIdArr));
                tempRemovedArr.push(item.wordId);
                setRemovedWordIdArr(tempRemovedArr);
            }
        } );

        setIsChanged(true);
        setDataFlatList(tempObj.reverse());
        
    }


    const renderWords = ({item, index}) => {

    
        return <View style={styles.wordsContainer}>
    
          <TouchableOpacity onPress={() => {deletePosition(item.key)}}>
            <Image style={styles.image} source={require('../../../assets/close.png')} />
          </TouchableOpacity>
          <Text style={styles.wordsText}>{item.nor} - {item.eng} </Text>
        </View>
    }

    const addWordToList = () => {

        if (norWord !== '' && transWord !== '') {
            
            let wordKey = uuid.v4();
            let tempObj = JSON.parse(JSON.stringify(dataFlatList.reverse()))
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
            setDataFlatList(tempObj.reverse());
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
            toValue: 300,
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
        
        if (dataFlatList.length > 0) {
            await updateDoc(docRefOwn, {
                wordsArr: dataFlatList.reverse()
            })
            .then(docRef => {
                
                updateUserInfo();
            })
            .catch(error => {
                console.log(error);
            })
        } else {
            
            showConfirmation();
        }
        
        
    }



    const updateUserInfo = async () => {

        let tempArr = allUsersArrs; 

        tempArr.map(obj => {
            if (obj.refToList === refToList) {
                obj.words1 = [...obj.words1, ...newWordIdArr];
                
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

        dismissMessageNotSaved();
    
        
        setTimeout(() => {
    
            navigation.navigate({
                name: 'MyList',
                params: {userRef: userReference, language: choosenLang}
              });
        }, 800)
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };


    const tryExitButton = () => {
        if (isChanged) {
            showMessageNotSaved();
        } else {
            exitButton();
        }
    }

    const showMessageNotSaved = () => {
        Animated.spring(confirmationPos2, {
            toValue: -screenHight / 2 + 65,
            speed: 3,
            bounciness: 5,
            useNativeDriver: true,
        }).start();
    
    }

    const dismissMessageNotSaved = () => {
        Animated.spring(confirmationPos2, {
            toValue: 300,
            speed: 10,
            bounciness: 5,
            useNativeDriver: true,
        }).start();
    }


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
                setDataFlatList(doc.data().wordsArr.reverse());
                setIsSelectedPublic(doc.data().public)
                
            })
        }
      

        getDataFb();

        return () => {
            getDataFb;
        };
    }, [])

    useEffect(() => {

        if (choosenLang === 'PL') {
            setConfirmDelete('Czy na pewno chcesz usunąć tę listę?');
            setMessageAdd('Dodaj słowa i zaktualizuj listę');
            setCheckBoxLabel('udostępnij tę listę innym użytkownikom');
            setPlaceholder3('Norweskie słowo');
            setPlaceholder4('Tłumaczenie');
            setButtonsArray(["Dodaj", "Zaktualizuj listę", "Usuń listę", "Tak", "Nie"]);
            setMessageNotSaved('Lista słów nie została zaktualizowana. Czy na pewno chcesz wyjść?');
        } else if (choosenLang === 'DE') {
            setConfirmDelete('Bist du sicher, dass du diese Liste löschen möchtest?');
            setMessageAdd('Wörter hinzufügen und Liste aktualisieren');
            setCheckBoxLabel('teile diese Liste mit anderen Benutzern');
            setPlaceholder3('Norwegisches Wort');
            setPlaceholder4('Übersetzung');
            setButtonsArray(["Hinzufügen", "Liste aktualisieren", "Liste löschen", "Ja", "Nein"]);
            setMessageNotSaved('Die Wortliste wurde nicht aktualisiert. Sind Sie sicher, dass Sie beenden möchten?');
        } else if (choosenLang === 'LT') {
            setConfirmDelete('Ar tikrai norite ištrinti šį sąrašą?');
            setMessageAdd('Pridėti žodžius ir atnaujinti sąrašą');
            setCheckBoxLabel('pasidalinkite šiuo sąrašu su kitais vartotojais');
            setPlaceholder3('Norvegiškas žodis');
            setPlaceholder4('Vertimas');
            setButtonsArray(["Pridėti", "Atnaujinti sąrašą", "Ištrinti sąrašą", "Taip", "Ne"]);
            setMessageNotSaved('Žodžių sąrašas nebuvo atnaujintas. Ar tikrai norite išeiti?');
        } else if (choosenLang === 'AR') {
            setConfirmDelete('هل أنت متأكد من أنك تريد حذف هذه القائمة؟');
            setMessageAdd('إضافة كلمات وتحديث القائمة');
            setCheckBoxLabel('شارك هذه القائمة مع المستخدمين الآخرين');
            setPlaceholder3('كلمة نرويجية');
            setPlaceholder4('ترجمة');
            setButtonsArray(["إضافة", "تحديث القائمة", "حذف القائمة", "نعم", "لا"]);
            setMessageNotSaved('لم يتم تحديث قائمة الكلمات. هل أنت متأكد أنك تريد الخروج؟');
        } else if (choosenLang === 'UA') {
            setConfirmDelete('Ви впевнені, що хочете видалити цей список?');
            setMessageAdd('Додати слова та оновити список');
            setCheckBoxLabel('поділіться цим списком з іншими користувачами');
            setPlaceholder3('Норвезьке слово');
            setPlaceholder4('Переклад');
            setButtonsArray(["Додати", "Оновити список", "Видалити список", "Так", "Ні"]);
            setMessageNotSaved('Список слів не був оновлений. Ви впевнені, що хочете вийти?');
        } else if (choosenLang === 'ES') {
            setConfirmDelete('¿Estás seguro de que quieres eliminar esta lista?');
            setMessageAdd('Añadir palabras y actualizar la lista');
            setCheckBoxLabel('comparte esta lista con otros usuarios');
            setPlaceholder3('Palabra noruega');
            setPlaceholder4('Traducción');
            setButtonsArray(["Añadir", "Actualizar lista", "Eliminar lista", "Sí", "No"]);
            setMessageNotSaved('La lista de palabras no se actualizó. ¿Estás seguro de que quieres salir?');
        }

    }, [])
    

  return (
    <View style={styles.mainContainer}> 

      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
        <TouchableOpacity onPress={() => tryExitButton()}>
            <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

        </TouchableOpacity>
      </Animated.View>
      <View style={styles.inputContainer}>
        

        <View style={styles.addingContainer}>
        
            <View style={styles.inputHolder}>

                <Input 
                style={styles.input}
                ref={norInput}
                placeholder={placeholder3}
                maxLength={maxLengthWords}
                inputContainerStyle={styles.inputSmallContainerStyle}
                onChangeText={(text) => setNorWord(text)}
                autoCapitalize='none'
    
                />
            </View>
            
            <View style={styles.inputHolder}>

                <Input 
                style={styles.input}
                ref={transInput}
                placeholder={placeholder4}
                maxLength={maxLengthWords}
                inputContainerStyle={styles.inputSmallContainerStyle}
                onChangeText={(text) => setTransWord(text)}
                autoCapitalize='none'
                />
            </View>

            
        </View>

        
        <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.opacityBtn} onPress={() => addWordToList()}>
                <Text style={styles.opacityBtnText}>{buttonsArray[0]}</Text>
            </TouchableOpacity>

            {isChanged ? <TouchableOpacity  style={styles.opacityBtn} onPress={() => updateList()}>
                <Text style={styles.opacityBtnText}>{buttonsArray[1]}</Text>
            </TouchableOpacity> : <View style={styles.infoContainer}>
                <Text style={styles.textInfo}>{messageAdd}</Text>

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
            title={checkBoxLabel}
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
                <Text style={styles.deleteOpacityText}>{buttonsArray[2]}</Text>
            </TouchableOpacity>
            
        
        </View>

        <Animated.View style={{...styles.confirmationContainer, transform: [{translateY: confirmationPos}]}}>
            <View style={styles.confirmationContainerInside}>

                <Text style={styles.confirmationText}>{confirmDelete}</Text>

                <View style={styles.confirmationBtnCont}>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={deleteList}>
                        <Text style={styles.confirmationBtnTxt}>{buttonsArray[3]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={hideConfirmation}>
                        <Text style={styles.confirmationBtnTxt}>{buttonsArray[4]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>



        <Animated.View style={{...styles.confirmationContainer, transform: [{translateY: confirmationPos2}]}}>
            <View style={styles.confirmationContainerInside}>

                <Text style={styles.confirmationText}>{messageNotSaved}</Text>

                <View style={styles.confirmationBtnCont}>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={exitButton}>
                        <Text style={styles.confirmationBtnTxt}>{buttonsArray[3]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmationBtn} onPress={dismissMessageNotSaved}>
                        <Text style={styles.confirmationBtnTxt}>{buttonsArray[4]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    </View>
  )
}

export default EditListScreen