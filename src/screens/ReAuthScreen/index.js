import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useNavigation } from "@react-navigation/native";
import { authentication } from '../../../firebase/firebase-config';
import { EmailAuthProvider, deleteUser, getAuth, reauthenticateWithCredential  } from "firebase/auth";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';


const ReAuthScreen = ({route}) => {

    const {changePass, choosenLanguage} = route.params;


    const auth = getAuth();
    const user = auth.currentUser;

    const navigation = useNavigation();

    const screenWidth = Dimensions.get("window").width;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const messageContainerPos = useRef(new Animated.Value(-500)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/authentication.png'));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageText, setMessageText] = useState("Looks like an unknown error");
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const [msgForDelete, setMsgForDelete] = useState("Enter your email and password to proceed");
    const [msgForChange, setMsgForChange] = useState("Enter your email and current password to proceed");
    const [placeholderArray, setPlaceholderArray] = useState(['email address', 'password', 'current password']);
    const [errorMessage1, setErrorMessage1] = useState("Oops! It seems you forgot to type in your email. Let's fill that in to move forward!");
    const [errorMessage2, setErrorMessage2] = useState("We noticed you skipped the password field. Please enter your password to secure your account");
    const [errorMessage3, setErrorMessage3] = useState("Oops, that doesn't look like a valid email address. Let's try again!");
    const [errorMessage4, setErrorMessage4] = useState("Wrong password. Please try again or contact support for assistance");
    const [errorMessage5, setErrorMessage5] = useState("We encountered an issue while trying to delete your account. Please try again or contact support for assistance.");
    const [errorMessage6, setErrorMessage6] = useState("Are you sure you want to delete your account?");
    const [btnLabels, setBtnLabels] = useState(['Yes', 'No'])

    const credential = EmailAuthProvider.credential(email, password);


const circlePositionDeg = interpolatedValue.interpolate({
    inputRange: [0, 180, 360],
    outputRange: ["-180deg", "0deg", "180deg"] 
})

const xPositionDeg = interpolatedValueForX.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"]
})

const openScreenAnimation = () => {

    setTimeout(() => {
        Animated.spring(interpolatedValue, {
            toValue: 180,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();

        
    }, 300);
}

const closeScreenAnimation = () => {
    Animated.spring(interpolatedValue, {
        delay: 500,
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

}


const hideMessage = () => {

    Animated.spring(messageContainerPos, {
        toValue: -500,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

}


const deleteAccount = () => {
    
    deleteUser(user).then(() => {
      // User deleted.
      console.log('delete account acomplished');
      exitButton(true);

    }).catch((error) => {
      
    
        setShowDeleteBtn(false);
        setMessageText(errorMessage5);
      //reautication of user!
      console.log('delete account error: ', error.code);
    });

  };


const reAuthUser = () => {

    reauthenticateWithCredential(user, credential)
    .then(() => {

        if (changePass) {
            goToNewPassword();
        } else {

            setShowDeleteBtn(true);
            setMessageText(errorMessage6);

            Animated.spring(messageContainerPos, {
                toValue: 0,
                speed: 1,
                bounciness: 0,
                useNativeDriver: true,
            }).start();
            
        }

        setEmail('');
        setPassword('');
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;


        if (errorCode === 'auth/missing-email') {
                
            setMessageText(errorMessage1);
            
        } else if (errorCode === 'auth/missing-password') {
            
            setMessageText(errorMessage2);
            
        } else if (errorCode === 'auth/invalid-email') {
           
            setMessageText(errorMessage3);
            
        } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-mismatch') {
            
            setMessageText(errorMessage4);
            
        }

        Animated.spring(messageContainerPos, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();


        console.log("Error reuth code: ", errorCode);
        console.log("Error reuth msg: ", errorMessage);
    })


   
}


const goToNewPassword = () => {

    setImageLink(require('../../../assets/fingerprint.png')) 

    closeScreenAnimation();

    setTimeout(() => {
        navigation.navigate('UpdatePassword', {choosenLanguage: choosenLanguage});
        
    }, 1500);
}


const exitButton = (boolean) => {
    console.log('exxit');

    if (boolean) {

        setImageLink(require('../../../assets/remove-user.png'));
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

const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
};

useEffect(() => {

    openScreenAnimation();


    if (choosenLanguage === 'PL') {
        setMsgForDelete("Wprowadź swój email i hasło, aby kontynuować");
        setMsgForChange("Wprowadź swój email i aktualne hasło, aby kontynuować");
        setPlaceholderArray(["adres email", "hasło", "aktualne hasło"]);
        setErrorMessage1("Ups! Wygląda na to, że zapomniałeś wpisać swój email. Uzupełnijmy to, aby iść dalej!");
        setErrorMessage2("Zauważyliśmy, że pominąłeś pole hasła. Proszę wpisz swoje hasło, aby zabezpieczyć swoje konto.");
        setErrorMessage3("Ups, to nie wygląda na prawidłowy adres e-mail. Spróbujmy jeszcze raz!");
        setErrorMessage4("Błędne hasło. Proszę spróbuj ponownie lub skontaktuj się z pomocą techniczną.");
        setErrorMessage5("Napotkaliśmy problem podczas próby usunięcia Twojego konta. Proszę spróbuj ponownie lub skontaktuj się z pomocą techniczną.");
        setErrorMessage6("Czy na pewno chcesz usunąć swoje konto?");
        setBtnLabels(["Tak", "Nie"]);
    } else if (choosenLanguage === 'DE') {
        setMsgForDelete("Geben Sie Ihre E-Mail und Ihr Passwort ein, um fortzufahren");
        setMsgForChange("Geben Sie Ihre E-Mail und Ihr aktuelles Passwort ein, um fortzufahren");
        setPlaceholderArray(["E-Mail-Adresse", "Passwort", "aktuelles Passwort"]);
        setErrorMessage1("Hoppla! Es scheint, als hättest du vergessen, deine E-Mail einzugeben. Lass uns das ausfüllen, um weiterzumachen!");
        setErrorMessage2("Wir haben bemerkt, dass Sie das Passwortfeld übersprungen haben. Bitte geben Sie Ihr Passwort ein, um Ihr Konto zu sichern.");
        setErrorMessage3("Hoppla, das sieht nicht nach einer gültigen E-Mail-Adresse aus. Versuchen wir es noch einmal!");
        setErrorMessage4("Falsches Passwort. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support zur Unterstützung.");
        setErrorMessage5("Wir haben ein Problem beim Versuch, Ihr Konto zu löschen, festgestellt. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.");
        setErrorMessage6("Sind Sie sicher, dass Sie Ihr Konto löschen möchten?");
        setBtnLabels(["Ja", "Nein"]);
    } else if (choosenLanguage === 'LT') {
        setMsgForDelete("Įveskite savo el. pašto adresą ir slaptažodį, kad tęstumėte");
        setMsgForChange("Įveskite savo el. pašto adresą ir dabartinį slaptažodį, kad tęstumėte");
        setPlaceholderArray(["el. pašto adresas", "slaptažodis", "dabartinis slaptažodis"]);
        setErrorMessage1("Oi! Atrodo, pamiršote įvesti savo el. paštą. Užpildykime tai, kad galėtume tęsti!");
        setErrorMessage2("Pastebėjome, kad praleidote slaptažodžio lauką. Prašome įvesti savo slaptažodį, kad apsaugotumėte savo paskyrą.");
        setErrorMessage3("Oi, tai neatrodo kaip galiojantis el. pašto adresas. Bandykime dar kartą!");
        setErrorMessage4("Neteisingas slaptažodis. Bandykite dar kartą arba susisiekite su palaikymo tarnyba.");
        setErrorMessage5("Susidūrėme su problema bandydami ištrinti jūsų paskyrą. Prašome bandyti dar kartą arba susisiekti su pagalbos tarnyba.");
        setErrorMessage6("Ar tikrai norite ištrinti savo paskyrą?");
        setBtnLabels(["Taip", "Ne"]);
    } else if (choosenLanguage === 'AR') {
        setMsgForDelete("أدخل بريدك الإلكتروني وكلمة المرور للمتابعة");
        setMsgForChange("أدخل بريدك الإلكتروني وكلمة المرور الحالية للمتابعة");
        setPlaceholderArray(["عنوان البريد الإلكتروني", "كلمة المرور", "كلمة المرور الحالية"]);
        setErrorMessage1("أوه! يبدو أنك نسيت كتابة بريدك الإلكتروني. دعونا نملأ ذلك للمتابعة");
        setErrorMessage2("لاحظنا أنك تخطيت حقل كلمة المرور. يرجى إدخال كلمة المرور لتأمين حسابك");
        setErrorMessage3("أوه، هذا لا يبدو كعنوان بريد إلكتروني صحيح. دعونا نحاول مرة أخرى");
        setErrorMessage4("كلمة المرور خاطئة. يرجى المحاولة مرة أخرى أو اتصل بالدعم للحصول على المساعدة");
        setErrorMessage5("واجهنا مشكلة أثناء محاولة حذف حسابك. الرجاء المحاولة مرة أخرى أو الاتصال بالدعم للحصول على المساعدة");
        setErrorMessage6("هل أنت متأكد من أنك تريد حذف حسابك؟");
        setBtnLabels(["نعم", "لا"]);
    } else if (choosenLanguage === 'UA') {
        setMsgForDelete("Введіть свою електронну адресу та пароль, щоб продовжити");
        setMsgForChange("Введіть свою електронну адресу та поточний пароль, щоб продовжити");
        setPlaceholderArray(["адреса електронної пошти", "пароль", "поточний пароль"]);
        setErrorMessage1("Ой! Здається, ви забули ввести свою електронну адресу. Давайте заповнимо це, щоб рухатися далі!");
        setErrorMessage2("Pastebėjome, kad praleidote slaptažodžio lauką. Prašome įvesti savo slaptažodį, kad apsaugotumėte savo paskyrą.");
        setErrorMessage3("Ой, це не схоже на дійсну адресу електронної пошти. Спробуймо ще раз!");
        setErrorMessage4("Неправильний пароль. Будь ласка, спробуйте ще раз або зверніться до служби підтримки.");
        setErrorMessage5("Ми зіткнулися з проблемою під час спроби видалити ваш акаунт. Будь ласка, спробуйте ще раз або зверніться за допомогою до служби підтримки.");
        setErrorMessage6("Ви впевнені, що хочете видалити свій акаунт?");
        setBtnLabels(["Так", "Ні"]);
    } else if (choosenLanguage === 'ES') {
        setMsgForDelete("Ingresa tu correo electrónico y contraseña para continuar");
        setMsgForChange("Ingresa tu correo electrónico y contraseña actual para continuar");
        setPlaceholderArray(["dirección de correo electrónico", "contraseña", "contraseña actual"]);
        setErrorMessage1("¡Vaya! Parece que olvidaste escribir tu correo electrónico. Vamos a completarlo para avanzar.");
        setErrorMessage2("Nos dimos cuenta de que omitiste el campo de la contraseña. Por favor, ingresa tu contraseña para asegurar tu cuenta.");
        setErrorMessage3("Uy, eso no parece una dirección de correo electrónico válida. ¡Intentémoslo de nuevo!");
        setErrorMessage4("Contraseña incorrecta. Por favor, inténtalo de nuevo o contacta con soporte para obtener ayuda.");
        setErrorMessage5("Nos encontramos con un problema al intentar eliminar tu cuenta. Por favor, intenta de nuevo o contacta al soporte técnico para obtener ayuda.");
        setErrorMessage6("¿Estás seguro de que quieres eliminar tu cuenta?");
        setBtnLabels(["Sí", "No"]);
    } 
   
},[]);



  return (
    <KeyboardAvoidingView>
        <LinearGradient colors={['#6d28ed', '#b829e3']}
        style={styles.mainContainer}>
            <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                <TouchableOpacity onPress={() => exitButton()}>
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
                            placeholder={placeholderArray[0]}
                            autoCapitalize='none'
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/email.png')}/>}
                            type={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={styles.inputHolderDown}>

                            <Input 
                            style={styles.input}
                            placeholder={changePass ? placeholderArray[2] : placeholderArray[1]}
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/padlock.png')}/>}
                            secureTextEntry
                            type={"password"}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            />
                        </View>

                        <View style={{...styles.loginButtonPos, ...styles.shadowStrong}}>

                        <GradientButton  
                        height={40} 
                        width={40}
                        colorA={'white'} 
                        colorB={'#c256e3'} 
                        callbackFunc={reAuthUser} 
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


                        <View style={styles.msgCont}>
                            <Text style={styles.msgTxt}>{changePass ? msgForChange : msgForDelete}</Text>
                        </View>
                            
                    </View>

                    
                    
                    
                </View>


                
            </Animated.View>

            <Animated.View style={{...styles.messageContainer, transform: [{translateX: messageContainerPos}]}}>
                <LinearGradient colors={['#6d28ed', '#fafafa']} style={styles.messageGradient}  start={[0.0, 1.0]} end={[1.0, 1.0]}>

                
                    <Text style={styles.messageText}>{messageText}</Text>

                    <View style={styles.messageButtonsContainer}>

                        {showDeleteBtn ? <TouchableOpacity style={styles.messageButtons} onPress={deleteAccount}>
                            <Text style={styles.messageButtonsText}>{btnLabels[0]}</Text>
                        </TouchableOpacity> : <View></View>}

                        <TouchableOpacity style={styles.messageButtons} onPress={hideMessage}>
                            <Text style={styles.messageButtonsText}>{showDeleteBtn ? btnLabels[1] : 'OK'}</Text>
                        </TouchableOpacity>
                    </View>
                    

                </LinearGradient>
            </Animated.View>
        </LinearGradient>
    </KeyboardAvoidingView>
  )
}


export default ReAuthScreen