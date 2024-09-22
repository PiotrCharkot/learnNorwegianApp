import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getAuth, updatePassword } from "firebase/auth";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';

const NewPasswordScreen = ({route}) => {


    const auth = getAuth();

    const user = auth.currentUser;
    
    const navigation = useNavigation();

    const {choosenLanguage} = route.params;

    const screenWidth = Dimensions.get("window").width;
    const screenHight = Dimensions.get("window").height;
    const isTablet = screenWidth / screenHight > 0.65;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const messageContainerPos = useRef(new Animated.Value(-screenHight)).current;
    const buttonLoginPos = useRef(new Animated.Value(-290)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/fingerprint.png'));
    const [password, setPassword] = useState("");
    const [messageText, setMessageText] = useState("Looks like an unknown error");
    const [placeholderText, setPlaceholderText] = useState('your new password');
    const [errorMessage1, setErrorMessage1] = useState("We noticed you skipped the password field. Please enter your password to proceed");
    const [errorMessage2, setErrorMessage2] = useState("Your password needs to be between 6 and 50 characters long");
    const [errorMessage3, setErrorMessage3] = useState("Please enter new password to continue");

    const maxLengthPassword = 50;
    


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


const hideMessage = () => {

    Animated.spring(messageContainerPos, {
        toValue: -screenHight,
        speed: 1,
        bounciness: 0,
        useNativeDriver: true,
    }).start();

}

const goToReAuth = () => {

    setImageLink(require('../../../assets/authentication.png')) 

    closeScreenAnimation();

    setTimeout(() => {
        navigation.navigate({name: 'Reauth', params: {changePass: true}});

        setTimeout(() => {
            
            setImageLink(require('../../../assets/fingerprint.png'))
        }, 300);
        
    }, 1500);
}

const updatePass = () => {
    console.log('update button pressed');


    if (password.trim()) {

        updatePassword(user, password).then(() => {
            // Update successful.
            console.log('update successful!');
            setPassword('');
            exitButton(true);
        }).catch((error) => {
            const errorCode = error.code;
            // An error ocurred
            // ...
            console.log('password update failed code', errorCode);
            //navigation.navigate('Reauth')
            //auth/requires-recent-login - reauth on this error code
            
            if (errorCode === 'auth/requires-recent-login') {
                
                goToReAuth();
            
            } else if (errorCode === 'auth/missing-password') {
                
                setMessageText(errorMessage1);
                
                Animated.spring(messageContainerPos, {
                    toValue: 0,
                    speed: 1,
                    bounciness: 0,
                    useNativeDriver: true,
                }).start();
                
            } else if (errorCode === 'auth/weak-password') {
                
                setMessageText(errorMessage2);
                
                Animated.spring(messageContainerPos, {
                    toValue: 0,
                    speed: 1,
                    bounciness: 0,
                    useNativeDriver: true,
                }).start();
                
            }
        
        
        
        });
    } else {
        setMessageText(errorMessage3);
        Animated.spring(messageContainerPos, {
            toValue: 0,
            speed: 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    }
      
}

const exitButton = (boolean) => {

    if (boolean) {
        setImageLink(require('../../../assets/update.png'))
    } else {
        setImageLink(require('../../../assets/goodbye.png'))
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

useFocusEffect(
    useCallback(() => {
    const unsubscribe = openScreenAnimation(); 

    return () => unsubscribe;
  }, []))

useEffect(() => {

    openScreenAnimation();

    if (choosenLanguage === 'PL') {
        setPlaceholderText("twoje nowe hasło");
        setErrorMessage1("Zauważyliśmy, że pominąłeś pole hasła. Proszę wpisz swoje hasło, aby kontynuować.");
        setErrorMessage2("Twoje hasło musi mieć od 6 do 50 znaków.");
        setErrorMessage3("Proszę wprowadzić nowe hasło, aby kontynuować.");
    } else if (choosenLanguage === 'DE') {
        setPlaceholderText("Ihr neues Passwort");
        setErrorMessage1("Wir haben bemerkt, dass Sie das Passwortfeld übersprungen haben. Bitte geben Sie Ihr Passwort ein, um fortzufahren.");
        setErrorMessage2("Ihr Passwort muss zwischen 6 und 50 Zeichen lang sein.");
        setErrorMessage3("Bitte geben Sie ein neues Passwort ein, um fortzufahren.");
    } else if (choosenLanguage === 'LT') {
        setPlaceholderText("jūsų naujas slaptažodis");
        setErrorMessage1("Pastebėjome, kad praleidote slaptažodžio lauką. Prašome įvesti savo slaptažodį, kad galėtumėte tęsti.");
        setErrorMessage2("Jūsų slaptažodis turi būti nuo 6 iki 50 simbolių ilgio.");
        setErrorMessage3("Prašome įvesti naują slaptažodį, kad tęstumėte.");
    } else if (choosenLanguage === 'AR') {
        setPlaceholderText("كلمة المرور الجديدة الخاصة بك");
        setErrorMessage1("لاحظنا أنك تخطيت حقل كلمة السر. الرجاء إدخال كلمة السر للمتابعة");
        setErrorMessage2("يجب أن تتراوح كلمة المرور الخاصة بك بين 6 و50 حرفًا");
        setErrorMessage3("يرجى إدخال كلمة مرور جديدة للمتابعة");
    } else if (choosenLanguage === 'UA') {
        setPlaceholderText("ваш новий пароль");
        setErrorMessage1("Ми помітили, що ви пропустили поле з паролем. Будь ласка, введіть свій пароль, щоб продовжити.");
        setErrorMessage2("Ваш пароль повинен містити від 6 до 50 символів.");
        setErrorMessage3("Будь ласка, введіть новий пароль, щоб продовжити.");
    } else if (choosenLanguage === 'ES') {
        setPlaceholderText("tu nueva contraseña");
        setErrorMessage1("Hemos notado que saltaste el campo de la contraseña. Por favor, ingresa tu contraseña para continuar.");
        setErrorMessage2("Tu contraseña debe tener entre 6 y 50 caracteres.");
        setErrorMessage3("Por favor, ingresa una nueva contraseña para continuar.");
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
                            placeholder={placeholderText}
                            inputContainerStyle={styles.inputContainerStyle}
                            maxLength={maxLengthPassword}
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
                        callbackFunc={updatePass} 
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


export default NewPasswordScreen