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

    const {userReference, choosenLang} = route.params;
    const navigation = useNavigation();
    let wordIdentification = 0;


    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [norWord, setNorWord] = useState('');
    const [transWord, setTransWord] = useState('');
    const [documentId, setDocumentId] = useState('tempid');
    const [allUsersArrs, setAllUsersArrs] = useState([]);
    const [isSelectedPublic, setIsSelectedPublic] = useState(false);
    const [labelTitle, setLabelTitle] = useState('Title');
    const [labelLanguage, setLabelLanguage] = useState('Language');
    const [btnAdd, setBtnAdd] = useState('Add');
    const [btnCreate, setBtnCreate] = useState('Create list');
    const [messageEmpty, setMessageEmpty] = useState('Please fill in the Title and Language fields before creating your list.');
    const [textAddTwo, setTextAddTwo] = useState('Add at least two pairs of words to create a list')
    const [placeholder1, setPlaceholder1] = useState('Title e.g. Nouns - A1')
    const [placeholder2, setPlaceholder2] = useState('Your language e.g. english')
    const [placeholder3, setPlaceholder3] = useState('Norwegian word')
    const [placeholder4, setPlaceholder4] = useState('translation')
    const [checkBoxLabel, setCheckBoxLabel] = useState('share this list with other users')


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


    useEffect(() => {

        if (choosenLang === 'PL') {
            setMessageEmpty('Proszę wypełnić pola Tytuł i Język przed utworzeniem listy');
            setLabelTitle('Tytuł');
            setLabelLanguage('Język');
            setBtnAdd('Dodaj');
            setBtnCreate('Utwórz listę');
            setTextAddTwo('Dodaj przynajmniej dwie pary słów, aby stworzyć listę');
            setCheckBoxLabel('udostępnij tę listę innym użytkownikom');
            setPlaceholder1('Tytuł np. Rzeczowniki - A1');
            setPlaceholder2('Twój język np. polski');
            setPlaceholder3('Norweskie słowo');
            setPlaceholder4('Tłumaczenie');

        } else if (choosenLang === 'DE') {
            setMessageEmpty('Bitte füllen Sie die Felder Titel und Sprache aus, bevor Sie Ihre Liste erstellen');
            setLabelTitle('Titel');
            setLabelLanguage('Sprache');
            setBtnAdd('Hinzufügen');
            setBtnCreate('Liste erstellen');
            setTextAddTwo('Füge mindestens zwei Wortpaare hinzu, um eine Liste zu erstellen');
            setCheckBoxLabel('teile diese Liste mit anderen Benutzern');
            setPlaceholder1('Nouns - A1: Titel z.B. Nomen - A1');
            setPlaceholder2('Deine Sprache z.B. Deutsch');
            setPlaceholder3('Norwegisches Wort');
            setPlaceholder4('Übersetzung');
            
        } else if (choosenLang === 'LT') {
            setMessageEmpty('Prašome užpildyti Laukelius Pavadinimas ir Kalba prieš kuriant sąrašą');
            setLabelTitle('Pavadinimas');
            setLabelLanguage('Kalba');
            setBtnAdd('Pridėti');
            setBtnCreate('Sukurti sąrašą');
            setTextAddTwo('Pridėkite bent dvi žodžių poras, kad sukurtumėte sąrašą');
            setCheckBoxLabel('pasidalinkite šiuo sąrašu su kitais vartotojais');
            setPlaceholder1('Pavadinimas pvz., Daiktavardžiai - A1');
            setPlaceholder2('Tavo kalba pvz., lietuvių');
            setPlaceholder3('Norvegiškas žodis');
            setPlaceholder4('Vertimas');
            
        } else if (choosenLang === 'AR') {
            setMessageEmpty('الرجاء ملء حقول العنوان واللغة قبل إنشاء قائمتك');
            setLabelTitle('العنوان');
            setLabelLanguage('اللغة');
            setBtnAdd('أضف');
            setBtnCreate('إنشاء قائمة');
            setTextAddTwo('أضف على الأقل زوجين من الكلمات لإنشاء قائمة');
            setCheckBoxLabel('شارك هذه القائمة مع المستخدمين الآخرين');
            setPlaceholder1('العنوان مثلاً، الأسماء');
            setPlaceholder2('لغتك مثلاً، العربية');
            setPlaceholder3('كلمة نرويجية');
            setPlaceholder4('ترجمة');
            
        } else if (choosenLang === 'UA') {
            setMessageEmpty('Будь ласка, заповніть поля Назва та Мова перед створенням списку');
            setLabelTitle('Назва');
            setLabelLanguage('Мова');
            setBtnAdd('Додати');
            setBtnCreate('Створити список');
            setTextAddTwo('Додайте принаймні дві пари слів, щоб створити список');
            setCheckBoxLabel('поділіться цим списком з іншими користувачами');
            setPlaceholder1('Назва напр., Іменники - A1');
            setPlaceholder2('Твоя мова напр., українська');
            setPlaceholder3('Норвезьке слово');
            setPlaceholder4('Переклад');
            
        } else if (choosenLang === 'ES') {
            setMessageEmpty('Por favor, rellene los campos de Título e Idioma antes de crear su lista');
            setLabelTitle('Título');
            setLabelLanguage('Idioma');
            setBtnAdd('Añadir');
            setBtnCreate('Crear lista');
            setTextAddTwo('Añade al menos dos pares de palabras para crear una lista');
            setCheckBoxLabel('comparte esta lista con otros usuarios');
            setPlaceholder1('Título p.ej., Sustantivos - A1');
            setPlaceholder2('Tu idioma p.ej., español');
            setPlaceholder3('Palabra noruega');
            setPlaceholder4('Traducción');
          
        }

    }, [])
    

  return (
    <View style={styles.mainContainer}> 
       
      <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
        <TouchableOpacity onPress={() => exitButton()}>
            <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

        </TouchableOpacity>
      </Animated.View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>{labelTitle}</Text>
        <Input 
        style={styles.input}
        placeholder={placeholder1}
        onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.labelText}>{labelLanguage}</Text>
        <Input 
        style={styles.input}
        placeholder={placeholder2}
        onChangeText={(text) => setLanguage(text)}
        autoCapitalize='none'
        />

        <View style={styles.addingContainer}>
        
            <View style={styles.inputHolder}>

                <Input 
                style={styles.input}
                ref={norInput}
                placeholder={placeholder3}
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
                inputContainerStyle={styles.inputSmallContainerStyle}
                onChangeText={(text) => setTransWord(text)}
                autoCapitalize='none'
                />
            </View>

            
        </View>

        
        <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.opacityBtn} onPress={() => addWordToList()}>
                <Text style={styles.opacityBtnText}>{btnAdd}</Text>
            </TouchableOpacity>

            {dataFlatList.length > 1 ? <TouchableOpacity  style={styles.opacityBtn} onPress={() => createList()}>
                <Text style={styles.opacityBtnText}>{btnCreate}</Text>
            </TouchableOpacity> : <View style={styles.infoContainer}>
                <Text style={styles.textInfo}>{textAddTwo}</Text>

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
            <Text style={styles.opacityBtnTextInfo}>{messageEmpty}</Text>
            <TouchableOpacity  style={styles.confirmationBtn} onPress={() => dismissMessage()}>
                <Text style={styles.opacityBtnText}>OK</Text>
            </TouchableOpacity>
        </Animated.View> : <View></View>}   
        
    </View>
  )
}

export default CreateListScreen