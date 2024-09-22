import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useNavigation } from "@react-navigation/native";
import { authentication } from '../../../firebase/firebase-config';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, linkWithCredential, updateProfile  } from "firebase/auth";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';
import forbiddenUsernames from '../../listData/otherData/forbiddenUsernames';

const offsetButton = 25;
const usersPointsCollection = collection(db, 'usersPoints');


const RegisterScreen = ({route}) => {

    const navigation = useNavigation();

    const {choosenLanguage} = route.params;

    const userNames = collection(db, 'userNames');
    const docRefUserList = doc(db, "userNames", "DbIjRsGg1IzAgJs0vC81");

    const screenWidth = Dimensions.get("window").width;
    const screenHight = Dimensions.get("window").height;
    const isTablet = screenWidth / screenHight > 0.65;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonLoginPos = useRef(new Animated.Value(-290)).current;
    const messageContainerPos = useRef(new Animated.Value(-screenWidth)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/sign-in.png'));
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageText, setMessageText] = useState("Looks like an unknown error");
    const [userNamesList, setUserNamesList] = useState([]);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [msgTaken, setMsgTaken] = useState("This username is already taken. Please choose another.")
    const [placeholderArray, setPlaceholderArray] = useState(['username (max 20 characters)', 'email address', 'password (6-50 characters)']);
    const [errorMessage1, setErrorMessage1] = useState("Oops! It seems you forgot to type in your email. Let's fill that in to move forward!");
    const [errorMessage2, setErrorMessage2] = useState("We noticed you skipped the password field. Please enter your password to secure your account");
    const [errorMessage3, setErrorMessage3] = useState("Your password needs to be between 6 and 50 characters long");
    const [errorMessage4, setErrorMessage4] = useState("Oops, that doesn't look like a valid email address. Let's try again!");
    const [errorMessage5, setErrorMessage5] = useState("This email is already in use. Please try another one or log in if you're already a member");
    const [errorMessage6, setErrorMessage6] = useState("Looks like you missed a step! Please enter a username to continue.");
    const [backBtnText, setBackBtnText] = useState('back')

    const credential = EmailAuthProvider.credential(email, password);

    const maxLength = 20;
    const maxLengthPassword = 50;
    const maxLengthEmail = 250;


const circlePositionDeg = interpolatedValue.interpolate({
    inputRange: [0, 180, 360],
    outputRange: ["-180deg", "0deg", "180deg"]
})

const xPositionDeg = interpolatedValueForX.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"]
})



const updateUserNamesList = async (userNameParam) => {
    let newUsersList = [...userNamesList, userNameParam.toLowerCase()]

    console.log('updated list is: ', userNamesList, newUsersList);

    updateDoc(docRefUserList, {
        nameList: newUsersList   
    })
    .then(docRef => {
        console.log("username is added to list of users: ", userNameParam);
    })
    .catch(error => {
        console.log(error);
    })
}


const updateUserNameInRankigs = async (userIdentyfication, userN) => {
    console.log('my id in update is: ', userIdentyfication, 'and name is: ', userN );
    
    
    const q = query(usersPointsCollection, where('userRef', '==', userIdentyfication))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {

        console.log('no data for userPoints for this user in RegisterScreen screen. this is an error. there should be document for this user!');

    } else {
        
        querySnapshot.forEach((item) => {

            const docRef = doc(db, "usersPoints", item.id);
            
            updateDoc(docRef, {
                userName: userN   
            })
            .then(docRef => {
                console.log("username in rankings has been updated to: ", userN);
            })
            .catch(error => {
                console.log(error);
            })
        })
    }
}

const openScreenAnimation = () => {

    setTimeout(() => {
        Animated.spring(interpolatedValue, {
            toValue: 180,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();

        Animated.spring(buttonLoginPos, {
            delay: 1000,
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();

        
    }, 100);
}

const closeScreenAnimation = () => {
    Animated.spring(interpolatedValue, {
        delay: 500,
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    Animated.spring(buttonLoginPos, {
        delay: 100,
        toValue: -290,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

}


const createUser = () => {
    if (username.trim() && !isUsernameTaken) {

        linkWithCredential(authentication.currentUser, credential)
        .then((usercred) => {
            const user = usercred.user;
            updateProfile(authentication.currentUser, {
                displayName: username
              }).then(() => {
                console.log('username updated to: ', username);
              }).catch((error) => {
                console.log(error);
              });
             
            
            updateUserNameInRankigs(user.uid, username);
            updateUserNamesList(username)
            
            console.log("Anonymous account successfully upgraded", user);
            setUsername('');
            setEmail('');
            setPassword('');
            exitButton(true);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;


            if (errorCode === 'auth/missing-email') {
                
                setMessageText(errorMessage1);
                
            } else if (errorCode === 'auth/missing-password') {
                
                setMessageText(errorMessage2);
                
            } else if (errorCode === 'auth/weak-password') {
               
                setMessageText(errorMessage3);
                
            } else if (errorCode === 'auth/invalid-email') {
               
                setMessageText(errorMessage4);
                
            } else if (errorCode === 'auth/email-already-in-use') {
                
                setMessageText(errorMessage5);
            }
    
            Animated.spring(messageContainerPos, {
                toValue: 0,
                speed: 1,
                bounciness: 0,
                useNativeDriver: true,
            }).start();
    
            console.log("Error upgrading anonymous account. Code", errorCode);
            console.log("Error upgrading anonymous account. Message", errorMessage);
        });
    
        
        
    } else {
        setMessageText(errorMessage6);
        Animated.spring(messageContainerPos, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    }


}

const backToLogIn = () => {

    setImageLink(require('../../../assets/login.png')) 

    hideMessage();
    closeScreenAnimation();

    setTimeout(() => {
        navigation.navigate('Login', {choosenLanguage: choosenLanguage});
        setTimeout(() => {
            
            setImageLink(require('../../../assets/sign-in.png'))
        }, 300);
    }, 2000);
}

const exitButton = (boolean) => {
    console.log('exxit');

    if (boolean) {
        setImageLink(require('../../../assets/userRegistered.png'));
    } else {
        setImageLink(require('../../../assets/goodbye.png'));
    }
    Animated.spring(interpolatedValueForX, {
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    hideMessage();
    closeScreenAnimation();

    setTimeout(() => {

        navigation.navigate('Main');
    }, 1500)
}


const hideMessage = () => {

    Animated.spring(messageContainerPos, {
        toValue: -screenWidth,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

}


const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
};

useEffect(() => {

    const getUserNames = async () => {
        const querySnapshot = await getDoc(docRefUserList);

        if (querySnapshot.empty) {
            console.log('no usernames data');
        } else {
            console.log('usernames data is: ', querySnapshot.data());
            setUserNamesList(querySnapshot.data().nameList)
        }
    }


    openScreenAnimation(); 
    getUserNames();


    if (choosenLanguage === 'PL') {
        setBackBtnText("wstecz");
        setPlaceholderArray(["nazwa użytkownika (max 20 znaków)", "adres email", "hasło (6-50 znaków)"]);
        setErrorMessage1("Ups! Wygląda na to, że zapomniałeś wpisać swój email. Uzupełnijmy to, aby iść dalej!");
        setErrorMessage2("Zauważyliśmy, że pominąłeś pole hasła. Proszę wpisz swoje hasło, aby zabezpieczyć swoje konto.");
        setErrorMessage3("Twoje hasło musi mieć od 6 do 50 znaków.");
        setErrorMessage4("Ups, to nie wygląda na prawidłowy adres e-mail. Spróbujmy jeszcze raz!");
        setErrorMessage5("Ten email jest już używany. Proszę spróbować innego lub zalogować się, jeśli jesteś już członkiem.");
        setErrorMessage6("Wygląda na to, że pominąłeś krok! Proszę wpisz nazwę użytkownika, aby kontynuować.");
        setMsgTaken("Ta nazwa użytkownika jest już zajęta. Proszę wybrać inną.");
    } else if (choosenLanguage === 'DE') {
        setBackBtnText("zurück");
        setPlaceholderArray(["Benutzername (max. 20 Zeichen)", "E-Mail-Adresse", "Passwort (6-50 Zeichen)"]);
        setErrorMessage1("Hoppla! Es scheint, als hättest du vergessen, deine E-Mail einzugeben. Lass uns das ausfüllen, um weiterzumachen!");
        setErrorMessage2("Wir haben bemerkt, dass Sie das Passwortfeld übersprungen haben. Bitte geben Sie Ihr Passwort ein, um Ihr Konto zu sichern.");
        setErrorMessage3("Ihr Passwort muss zwischen 6 und 50 Zeichen lang sein.");
        setErrorMessage4("Hoppla, das sieht nicht nach einer gültigen E-Mail-Adresse aus. Versuchen wir es noch einmal!");
        setErrorMessage5("Diese E-Mail wird bereits verwendet. Bitte versuchen Sie eine andere oder melden Sie sich an, wenn Sie bereits Mitglied sind.");
        setErrorMessage6("Sieht aus, als hätten Sie einen Schritt übersprungen! Bitte geben Sie einen Benutzernamen ein, um fortzufahren.");
        setMsgTaken("Dieser Benutzername ist bereits vergeben. Bitte wählen Sie einen anderen.");
    } else if (choosenLanguage === 'LT') {
        setBackBtnText("atgal");
        setPlaceholderArray(["vartotojo vardas (maks. 20 simbolių)", "el. pašto adresas", "slaptažodis (6-50 simbolių)"]);
        setErrorMessage1("Oi! Atrodo, pamiršote įvesti savo el. paštą. Užpildykime tai, kad galėtume tęsti!");
        setErrorMessage2("Pastebėjome, kad praleidote slaptažodžio lauką. Prašome įvesti savo slaptažodį, kad apsaugotumėte savo paskyrą.");
        setErrorMessage3("Jūsų slaptažodis turi būti nuo 6 iki 50 simbolių ilgio.");
        setErrorMessage4("Oi, tai neatrodo kaip galiojantis el. pašto adresas. Bandykime dar kartą!");
        setErrorMessage5("Šis el. paštas jau naudojamas. Prašome pabandyti kitą arba prisijunkite, jei jau esate narys.");
        setErrorMessage6("Atrodo, kad praleidote žingsnį! Prašome įvesti vartotojo vardą, kad tęstumėte.");
        setMsgTaken("Šis vartotojo vardas jau užimtas. Prašome pasirinkti kitą.");
    } else if (choosenLanguage === 'AR') {
        setBackBtnText("العودة");
        setPlaceholderArray(["اسم المستخدم (الحد الأقصى 20 حرفًا)", "عنوان البريد الإلكتروني", "كلمة المرور (6-50 حروف)"]);
        setErrorMessage1("أوه! يبدو أنك نسيت كتابة بريدك الإلكتروني. دعونا نملأ ذلك للمتابعة");
        setErrorMessage2("لاحظنا أنك تخطيت حقل كلمة المرور. يرجى إدخال كلمة المرور لتأمين حسابك");
        setErrorMessage3("كلمة المرور الخاصة بك يجب أن تكون بين 6 و50 حرفًا");
        setErrorMessage4("أوه، هذا لا يبدو كعنوان بريد إلكتروني صحيح. دعونا نحاول مرة أخرى");
        setErrorMessage5("هذا البريد الإلكتروني مستخدم بالفعل. يرجى تجربة آخر أو تسجيل الدخول إذا كنت عضوًا بالفعل");
        setErrorMessage6("يبدو أنك فاتك خطوة! الرجاء إدخال اسم مستخدم للمتابعة");
        setMsgTaken("هذا الاسم المستخدم محجوز بالفعل. الرجاء اختيار آخر");
    } else if (choosenLanguage === 'UA') {
        setBackBtnText("назад");
        setPlaceholderArray(["ім'я користувача (макс. 20 символів)", "адреса електронної пошти", "пароль (6-50 символів)"]);
        setErrorMessage1("Ой! Здається, ви забули ввести свою електронну адресу. Давайте заповнимо це, щоб рухатися далі!");
        setErrorMessage2("Pastebėjome, kad praleidote slaptažodžio lauką. Prašome įvesti savo slaptažodį, kad apsaugotumėte savo paskyrą.");
        setErrorMessage3("Ваш пароль повинен містити від 6 до 50 символів.");
        setErrorMessage4("Ой, це не схоже на дійсну адресу електронної пошти. Спробуймо ще раз!");
        setErrorMessage5("Ця електронна адреса вже використовується. Будь ласка, спробуйте іншу або увійдіть в систему, якщо ви вже є членом.");
        setErrorMessage6("Здається, ви пропустили крок! Будь ласка, введіть ім'я користувача, щоб продовжити.");
        setMsgTaken("Це ім'я користувача вже зайнято. Будь ласка, виберіть інше.");
    } else if (choosenLanguage === 'ES') {
        setBackBtnText("atrás");
        setPlaceholderArray(["nombre de usuario (máx. 20 caracteres)", "dirección de correo electrónico", "contraseña (6-50 caracteres)"]);
        setErrorMessage1("¡Vaya! Parece que olvidaste escribir tu correo electrónico. Vamos a completarlo para avanzar.");
        setErrorMessage2("Nos dimos cuenta de que omitiste el campo de la contraseña. Por favor, ingresa tu contraseña para asegurar tu cuenta.");
        setErrorMessage3("Tu contraseña debe tener entre 6 y 50 caracteres.");
        setErrorMessage4("Uy, eso no parece una dirección de correo electrónico válida. ¡Intentémoslo de nuevo!");
        setErrorMessage5("Este correo electrónico ya está en uso. Por favor, prueba con otro o inicia sesión si ya eres miembro.");
        setErrorMessage6("¡Parece que te saltaste un paso! Por favor, introduce un nombre de usuario para continuar.");
        setMsgTaken("Este nombre de usuario ya está tomado. Por favor, elija otro.");
    } 
   
},[]);



  return (
    <KeyboardAvoidingView>
        <LinearGradient colors={['#6d28ed', '#b829e3']}
        style={styles.mainContainer}>
            <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => exitButton()}>
                    <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={{...styles.circleContainer, ...getTransform(screenWidth, screenWidth, { rotate: circlePositionDeg }, { translateX: -screenWidth / 2 }, 0.165, 0.5)}}>
                <View style={styles.leftContainer}>
                <LinearGradient colors={['white', '#fafafa']} style={styles.mainContainer} start={[0.0, 1.0]} end={[1.0, 1.0]}>
                    <Image style={{...styles.leftImg, tintColor: 'grey'}} source={imageLink}/>
                </LinearGradient>
                </View>
                <View style={styles.loginContainer}>
                    <View style={{...styles.inputContainer, ...styles.shadow}}>

                        <View style={styles.inputHolder}>

                            <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            placeholder={placeholderArray[0]}
                            inputContainerStyle={styles.inputContainerStyle}
                            maxLength={maxLength}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/profil.png')}/>}
                            type={"text"}
                            value={username}
                            onChangeText={(text) => {
                                setUsername(text);
                                
                                if (userNamesList.includes(text.toLowerCase()) || forbiddenUsernames.includes(text.toLowerCase())) {
                                    setIsUsernameTaken(true);
                                } else {
                                    setIsUsernameTaken(false);
                                }
                            }}
                            />
                        </View>

                        <View style={styles.inputHolder}>

                            <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            placeholder={placeholderArray[1]}
                            inputContainerStyle={styles.inputContainerStyle}
                            maxLength={maxLengthEmail}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/email.png')}/>}
                            type={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={styles.inputHolderDown}>

                            <Input 
                            style={styles.input}
                            placeholder={placeholderArray[2]}
                            inputContainerStyle={styles.inputContainerStyle}
                            maxLength={maxLengthPassword}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/padlock.png')}/>}
                            secureTextEntry
                            type={"password"}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            />
                        </View>

                        <View style={{...styles.loginButtonPos}}>
                            <View style={{...styles.shadowStrong, height: 40, width: 40, backgroundColor: 'white', borderRadius: 20}}> 
                                <GradientButton  
                                height={40} 
                                width={40}
                                colorA={'white'} 
                                colorB={'#c256e3'} 
                                callbackFunc={createUser} 
                                path={'tick'} 
                                heightIcon={15} 
                                widthIcon={15}
                                colorIcon={'grey'}
                                noText={true}
                                startGradient={[0.0, 0.0]}
                                endGradient={[1.0, 1.0]}
                                borderTopRightRadius={20} 
                                borderBottomRightRadius={20} 
                                borderTopLeftRadius={20} 
                                borderBottomLeftRadius={20} 
                                />

                            </View>
                        </View>

                        <View style={styles.inputTakenMsgCont}>
                            <Text style={styles.inputTakenMsgTxt} allowFontScaling={false}>{isUsernameTaken ? msgTaken : ""}</Text>
                        </View>
                    
                    </View>



                    <Animated.View style={{...styles.regButtonCont, ...styles.shadowStrong, transform: [{translateX: buttonLoginPos}]}}>
                        <GradientButton  
                            height={40} 
                            width={screenWidth * 1.5 / 6 + offsetButton}
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={backToLogIn} 
                            path={'register'} 
                            heightIcon={15} 
                            widthIcon={15}
                            colorIcon={'grey'}
                            noText={false}
                            text={backBtnText}
                            colorText={'grey'}
                            startGradient={[1.0, 0.0]}
                            endGradient={[1.0, 1.0]}
                            borderTopRightRadius={20} 
                            borderBottomRightRadius={20} 
                            paddingLeft={30}
                            justify={'flex-start'}
                            marginR={5}
                            />
                    </Animated.View>
                </View>


                
            </Animated.View>

            

            <Animated.View style={{...styles.messageContainer, transform: [{translateX: messageContainerPos}]}}>
                <LinearGradient colors={['#6d28ed', '#fafafa']} style={styles.messageGradient}  start={[0.0, 1.0]} end={[1.0, 1.0]}>

                
                    <Text style={styles.messageText}>{messageText}</Text>

                    <View style={styles.messageButtonsContainer}>

                        <TouchableOpacity style={styles.messageButtons} onPress={hideMessage}>
                            <Text style={styles.messageButtonsText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    

                </LinearGradient>
            </Animated.View>
        </LinearGradient>
    </KeyboardAvoidingView>
  )
}


export default RegisterScreen