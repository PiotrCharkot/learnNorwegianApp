import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';

const offsetButton = 25;

const ForgetPassScreen = ({route}) => {

    const navigation = useNavigation();
    const auth = getAuth();

    const {choosenLanguage} = route.params;

    const screenWidth = Dimensions.get("window").width;
    const screenHight = Dimensions.get("window").height;
    const isTablet = screenWidth / screenHight > 0.65;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonLoginPos = useRef(new Animated.Value(-290)).current;
    const messageContainerPos = useRef(new Animated.Value(-screenWidth)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/lock-question.png'));
    const [email, setEmail] = useState("");
    const [messageText, setMessageText] = useState("");
    const [placeholder, setPlaceholder] = useState('email for password reset');
    const [errorMessage1, setErrorMessage1] = useState("Invalid email format. Please check your email address and try again");
    const [errorMessage2, setErrorMessage2] = useState("It seems you forgot to type in your email. Let's fill that in to move forward!");
    const [errorMessage3, setErrorMessage3] = useState("It looks like this email isn't registered with us yet");
    const [loginBtnText, loginRegisterBtnText] = useState('log in');
    


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

const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('display message with instructions for user here');
        setMessageText("Check your inbox for a password reset email. Follow the link inside to create a new password. Need more help? Contact support.")
        Animated.spring(messageContainerPos, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
        setEmail('');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
            setMessageText(errorMessage1);
        } else if (errorCode === 'auth/missing-email') {
            setMessageText(errorMessage2);
        } else if (errorCode === 'auth/user-not-found') {
            setMessageText(errorMessage3);
        }



        console.log('error code', errorCode);
        console.log('error msg', errorMessage);
        Animated.spring(messageContainerPos, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    });
}

const backToLogIn = () => {

    setImageLink(require('../../../assets/login.png'))

    closeScreenAnimation();

    setTimeout(() => {
        navigation.navigate('Login', {choosenLanguage: choosenLanguage});
        setTimeout(() => {
            
            setImageLink(require('../../../assets/lock-question.png'))
        }, 300);
    }, 2000);
}

const exitButton = () => {
    console.log('exxit');

    setImageLink(require('../../../assets/goodbye.png'))
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

useFocusEffect(
    useCallback(() => {
    const unsubscribe = openScreenAnimation(); 

    return () => unsubscribe;
  }, []))

useEffect(() => {

    openScreenAnimation();


    if (choosenLanguage === 'PL') {
        setPlaceholder('email do resetowania hasła');
        setErrorMessage1("Nieprawidłowy format adresu e-mail. Proszę sprawdzić swój adres e-mail i spróbować ponownie");
        setErrorMessage2("Wygląda na to, że zapomniałeś wpisać swój email. Uzupełnijmy to, aby przejść dalej!");
        setErrorMessage3("Wygląda na to, że ten email nie jest jeszcze zarejestrowany u nas");
        loginRegisterBtnText("zaloguj się");

    } else if (choosenLanguage === 'DE') {
        setPlaceholder('E-Mail für Passwort-Reset');
        setErrorMessage1("Ungültiges E-Mail-Format. Bitte überprüfen Sie Ihre E-Mail-Adresse und versuchen Sie es erneut");
        setErrorMessage2("Es scheint, dass du vergessen hast, deine E-Mail einzugeben. Lass uns das ausfüllen, um fortzufahren!");
        setErrorMessage3("Es sieht so aus, als wäre diese E-Mail noch nicht bei uns registriert");
        loginRegisterBtnText("anmelden");
    } else if (choosenLanguage === 'LT') {
        setPlaceholder('el. paštas slaptažodžio atstatymui');
        setErrorMessage1("Neteisingas el. pašto formatas. Patikrinkite savo el. pašto adresą ir bandykite vėl");
        setErrorMessage2("Atrodo, pamiršote įvesti savo el. paštą. Užpildykime tai, kad galėtume tęsti!");
        setErrorMessage3("Atrodo, kad šis el. paštas dar nėra užregistruotas pas mus");
        loginRegisterBtnText("prisijungti");
    } else if (choosenLanguage === 'AR') {
        setPlaceholder('البريد الإلكتروني لإعادة تعيين كلمة المرور');
        setErrorMessage1("تنسيق البريد الإلكتروني غير صالح. يرجى التحقق من عنوان بريدك الإلكتروني وحاول مرة أخرى");
        setErrorMessage2("يبدو أنك نسيت كتابة بريدك الإلكتروني. دعنا نملأ ذلك للمضي قدمًا");
        setErrorMessage3("يبدو أن هذا البريد الإلكتروني لم يُسجل معنا بعد");
        loginRegisterBtnText("تسجيل الدخول");
    } else if (choosenLanguage === 'UA') {
        setPlaceholder('електронна адреса для скидання пароля');
        setErrorMessage1(" Недійсний формат електронної адреси. Будь ласка, перевірте свою адресу електронної пошти та спробуйте ще раз");
        setErrorMessage2("Здається, ви забули ввести свою електронну адресу. Давайте заповнимо це, щоб рухатися далі!");
        setErrorMessage3("Здається, ця електронна адреса ще не зареєстрована у нас");
        loginRegisterBtnText("увійти");
    } else if (choosenLanguage === 'ES') {
        setPlaceholder('correo electrónico para restablecer contraseña');
        setErrorMessage1("Formato de correo electrónico inválido. Por favor, verifica tu dirección de correo electrónico e inténtalo de nuevo");
        setErrorMessage2("Parece que olvidaste escribir tu correo electrónico. ¡Vamos a completarlo para avanzar!");
        setErrorMessage3("Parece que este correo electrónico aún no está registrado con nosotros");
        loginRegisterBtnText("iniciar sesión");
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

                        <View style={styles.inputHolderDown}>

                            <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            placeholder={placeholder}
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/email.png')}/>}
                            type={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        
                        <View style={{...styles.loginButtonPos}}>
                            <View style={{...styles.shadowStrong, height: 40, width: 40, backgroundColor: 'white', borderRadius: 20}}> 
                                <GradientButton  
                                height={40} 
                                width={40}
                                colorA={'white'} 
                                colorB={'#c256e3'} 
                                callbackFunc={resetPassword} 
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

                        
                            
                    </View>
                   
                    <Animated.View style={{...styles.regButtonCont, ...styles.shadowStrong, transform: [{translateX: buttonLoginPos}]}}>
                        <GradientButton  
                            height={40} 
                            width={isTablet? screenWidth * 1 / 4 + offsetButton : screenWidth * 1.5 / 4 + offsetButton}
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={backToLogIn} 
                            path={'register'} 
                            heightIcon={15} 
                            widthIcon={15}
                            colorIcon={'grey'}
                            noText={false}
                            text={loginBtnText}
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


export default ForgetPassScreen