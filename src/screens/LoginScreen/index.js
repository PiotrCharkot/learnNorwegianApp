import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from '../../../firebase/firebase-config';
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';

const offsetButton = 25;

const LoginScreen = ({route}) => {

    const navigation = useNavigation();

    const {choosenLanguage} = route.params;

    const screenWidth = Dimensions.get("window").width;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonForgetPos = useRef(new Animated.Value(-290)).current;
    const buttonRegisterPos = useRef(new Animated.Value(-290)).current;
    const messageContainerPos = useRef(new Animated.Value(-500)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/login.png'));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageText, setMessageText] = useState("Looks like an unknown error");
    const [showForgotBtn, setShowForgotBtn] = useState(true);
    const [buttonLabels, setButtonLabels] = useState([' forgot password', ' register']);
    const [placeholderArray, setPlaceholderArray] = useState(['email address', 'password']);
    const [errorMessage1, setErrorMessage1] = useState("No email found. Hit 'Register account' or try to log in with correct email");
    const [errorMessage2, setErrorMessage2] = useState("Wrong password. Try again or hit 'Forgot password' to reset");
    const [errorMessage3, setErrorMessage3] = useState("Invalid email format. Please check your email address and try again");
    const [registerBtnText, setRegisterBtnText] = useState('Register account');
    const [forgotBtnText, setForgotBtnText] = useState('Forgot password')
    


const circlePositionDeg = interpolatedValue.interpolate({
    inputRange: [0, 180, 360],
    outputRange: ["-180deg", "0deg", "180deg"]
})

const xPositionDeg = interpolatedValueForX.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "180deg"]
})

const openLoginAnimation = () => {

    setTimeout(() => {
        Animated.spring(interpolatedValue, {
            toValue: 180,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();

        Animated.spring(buttonRegisterPos, {
            delay: 1500,
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();

        Animated.spring(buttonForgetPos, {
            delay: 1000,
            toValue: 0,
            speed: 1,
            bounciness: 1,
            useNativeDriver: true,
        }).start();
    }, 300);
}

const closeLoginAnimation = () => {
    Animated.spring(interpolatedValue, {
        delay: 500,
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    Animated.spring(buttonRegisterPos, {
        delay: 100,
        toValue: -290,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

    Animated.spring(buttonForgetPos, {
        delay: 300,
        toValue: -290,
        speed: 1,
        bounciness: 1,
        useNativeDriver: true,
    }).start();

}

const logIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    setEmail('');
    setPassword('');
    console.log('user loged successfully!!!');
    exitButton(true); 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log('error login', errorCode);

    if (errorCode === 'auth/user-not-found') {
        setMessageText(errorMessage1);
        setShowForgotBtn(false);
    } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/missing-password') {
        setMessageText(errorMessage2);
        setShowForgotBtn(true);
    } else if (errorCode === 'auth/invalid-email') {
        setMessageText(errorMessage3);
        setShowForgotBtn(false);
    }


    Animated.spring(messageContainerPos, {
        toValue: 0,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();


  });

  
}

const registerButton = () => {
    console.log('register button pressed');
    setImageLink(require('../../../assets/sign-in.png'))

    hideMessage();
    closeLoginAnimation();

    setTimeout(() => {
        
        navigation.navigate('Register', {choosenLanguage: choosenLanguage});
        
        setTimeout(() => {
            
            setImageLink(require('../../../assets/login.png'))
        }, 300);
    }, 2000);
}

const forgotButton = () => {
    setImageLink(require('../../../assets/lock-question.png'))

    hideMessage();
    closeLoginAnimation();

    setTimeout(() => {
        
        navigation.navigate('Forget', {choosenLanguage: choosenLanguage});
        
        setTimeout(() => {
            
            setImageLink(require('../../../assets/login.png'))
        }, 300);
    }, 2000);
}

const exitButton = (boolean) => {

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
    closeLoginAnimation();

    setTimeout(() => {

        navigation.navigate('Main');
    }, 1500)
}


const hideMessage = () => {

    Animated.spring(messageContainerPos, {
        toValue: -500,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

    setShowForgotBtn(true);
}


const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
    let transform = {
        transform: [{ perspective: 400 }, transValA, transValB],
    };
    return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
};

useFocusEffect(
    useCallback(() => {
    const unsubscribe = openLoginAnimation(); 

    return () => unsubscribe;
}, []))

useEffect(() => {

    openLoginAnimation();


    if (choosenLanguage === 'PL') {
        setButtonLabels(["zapomniałem hasła", "zarejestruj się"]);
        setPlaceholderArray(["adres email", "hasło"]);
        setErrorMessage1("Nie znaleziono adresu e-mail. Kliknij 'Zarejestruj konto' lub spróbuj zalogować się z poprawnym adresem e-mail");
        setErrorMessage2("Błędne hasło. Spróbuj ponownie lub kliknij 'Zapomniałem hasła', aby zresetować");
        setErrorMessage3("Nieprawidłowy format adresu e-mail. Proszę sprawdzić swój adres e-mail i spróbować ponownie");
        setRegisterBtnText("Zarejestruj konto");
        setForgotBtnText("Zapomniałem hasła");

    } else if (choosenLanguage === 'DE') {
        setButtonLabels(["Passwort vergessen", "registrieren"]);
        setPlaceholderArray(["E-Mail-Adresse", "Passwort"]);
        setErrorMessage1("Keine E-Mail gefunden. Klicke auf 'Konto registrieren' oder versuche dich mit der richtigen E-Mail-Adresse anzumelden");
        setErrorMessage2("Falsches Passwort. Versuche es erneut oder klicke auf 'Passwort vergessen', um es zurückzusetzen");
        setErrorMessage3("Ungültiges E-Mail-Format. Bitte überprüfe deine E-Mail-Adresse und versuche es erneut");
        setRegisterBtnText("Konto registrieren");
        setForgotBtnText("Passwort vergessen");
    } else if (choosenLanguage === 'LT') {
        setButtonLabels(["pamiršau slaptažodį", "užsiregistruoti"]);
        setPlaceholderArray(["el. pašto adresas", "slaptažodis"]);
        setErrorMessage1("El. pašto adresas nerastas. Spustelėkite 'Registruoti paskyrą' arba bandykite prisijungti su teisingu el. pašto adresu");
        setErrorMessage2("Neteisingas slaptažodis. Bandykite vėl arba spauskite 'Pamiršau slaptažodį', kad atstatytumėte");
        setErrorMessage3("Neteisingas el. pašto formato. Prašome patikrinti savo el. pašto adresą ir bandyti dar kartą");
        setRegisterBtnText("Registruoti paskyrą");
        setForgotBtnText("Pamiršau slaptažodį");
    } else if (choosenLanguage === 'AR') {
        setButtonLabels(["نسيت كلمة السر", "التسجيل"]);
        setPlaceholderArray(["عنوان البريد الإلكتروني", "كلمة المرور"]);
        setErrorMessage1("لم يتم العثور على البريد الإلكتروني. اضغط على 'تسجيل حساب' أو حاول تسجيل الدخول بالبريد الإلكتروني الصحيح");
        setErrorMessage2("كلمة السر خاطئة. حاول مرة أخرى أو اضغط على 'نسيت كلمة السر' لإعادة تعيينها");
        setErrorMessage3("تنسيق البريد الإلكتروني غير صالح. يرجى التحقق من عنوان بريدك الإلكتروني والمحاولة مرة أخرى");
        setRegisterBtnText("تسجيل حساب");
        setForgotBtnText("نسيت كلمة السر");
    } else if (choosenLanguage === 'UA') {
        setButtonLabels(["забув пароль", "зареєструватися"]);
        setPlaceholderArray(["адреса електронної пошти", "пароль"]);
        setErrorMessage1("Електронну адресу не знайдено. Натисніть 'Зареєструвати акаунт' або спробуйте увійти з правильною електронною адресою");
        setErrorMessage2("Неправильний пароль. Спробуйте ще раз або натисніть 'Забули пароль', щоб скинути");
        setErrorMessage3("Недійсний формат електронної пошти. Будь ласка, перевірте свою адресу електронної пошти та спробуйте знову");
        setRegisterBtnText("Зареєструвати акаунт");
        setForgotBtnText("Забули пароль");
    } else if (choosenLanguage === 'ES') {
        setButtonLabels(["olvidé la contraseña", "registrarse"]);
        setPlaceholderArray(["dirección de correo electrónico", "contraseña"]);
        setErrorMessage1("No se encontró el correo electrónico. Haz clic en 'Registrar cuenta' o intenta iniciar sesión con el correo electrónico correcto");
        setErrorMessage2("Contraseña incorrecta. Intenta de nuevo o haz clic en 'Olvidé la contraseña' para restablecerla");
        setErrorMessage3("Formato de correo electrónico no válido. Por favor, revisa tu dirección de correo electrónico e inténtalo de nuevo");
        setRegisterBtnText("Registrar cuenta");
        setForgotBtnText("Olvidé la contraseña");
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
                            placeholder={placeholderArray[1]}
                            inputContainerStyle={styles.inputContainerStyle}
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
                                callbackFunc={logIn} 
                                path={'tick'} 
                                colorIcon={'grey'}
                                heightIcon={15} 
                                widthIcon={15}
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

                        
                            
                    </View>
                    <Animated.View style={{...styles.forgotButtonCont, ...styles.shadowStrong, transform: [{translateX: buttonForgetPos}]}}>
                        <GradientButton  
                            height={40} 
                            width={screenWidth * 1.5 / 2.8 + offsetButton }
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={forgotButton} 
                            path={'forgot'} 
                            colorIcon={'grey'}
                            heightIcon={15} 
                            widthIcon={15}
                            noText={false}
                            text={buttonLabels[0]}
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
                    <Animated.View style={{...styles.regButtonCont, ...styles.shadowStrong, transform: [{translateX: buttonRegisterPos}]}}>
                        <GradientButton  
                            height={40} 
                            width={screenWidth * 1.5 / 3.7 + offsetButton}
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={registerButton} 
                            path={'register'}
                            colorIcon={'grey'} 
                            heightIcon={15} 
                            widthIcon={15}
                            noText={false}
                            text={buttonLabels[1]}
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

                
                    <Text style={styles.messageText} >{messageText}</Text>

                    <View style={styles.messageButtonsContainer}>
                        {showForgotBtn ? <TouchableOpacity style={styles.messageButtons} onPress={forgotButton}>
                            <Text style={styles.messageButtonsText}>{forgotBtnText}</Text>
                        </TouchableOpacity> : <TouchableOpacity style={styles.messageButtons} onPress={registerButton}>
                            <Text style={styles.messageButtonsText}>{registerBtnText}</Text>
                        </TouchableOpacity>}
                        

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


export default LoginScreen