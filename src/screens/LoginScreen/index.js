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

const LoginScreen = () => {

    const navigation = useNavigation();

    const screenWidth = Dimensions.get("window").width;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonForgetPos = useRef(new Animated.Value(-290)).current;
    const buttonRegisterPos = useRef(new Animated.Value(-290)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/login.png'));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    


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
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  
  exitButton();
}

const registerButton = () => {
    console.log('register button pressed');
    setImageLink(require('../../../assets/sign-in.png'))

    closeLoginAnimation();

    setTimeout(() => {
        
        navigation.navigate('Register');
        
        setTimeout(() => {
            
            setImageLink(require('../../../assets/login.png'))
        }, 300);
    }, 2000);
}

const forgotButton = () => {
    setImageLink(require('../../../assets/lock-question.png'))

    closeLoginAnimation();

    setTimeout(() => {
        
        navigation.navigate('Forget');
        
        setTimeout(() => {
            
            setImageLink(require('../../../assets/login.png'))
        }, 300);
    }, 2000);
}

const exitButton = () => {

    setImageLink(require('../../../assets/goodbye.png'))
    Animated.spring(interpolatedValueForX, {
        toValue: 360,
        speed: 1,
        bounciness: 12,
        useNativeDriver: true,
    }).start();

    closeLoginAnimation();

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
    const unsubscribe = openLoginAnimation(); 

    return () => unsubscribe;
  }, []))

useEffect(() => {

    openLoginAnimation();
   
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
                            placeholder='email address'
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
                            placeholder='password'
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
                            width={screenWidth * 1.5 / 4 + offsetButton }
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={forgotButton} 
                            path={'forgot'} 
                            colorIcon={'grey'}
                            heightIcon={15} 
                            widthIcon={15}
                            noText={false}
                            text={' forgot password'}
                            colorText={'grey'}
                            startGradient={[1.0, 0.0]}
                            endGradient={[1.0, 1.0]}
                            borderTopRightRadius={20} 
                            borderBottomRightRadius={20} 
                        />
                    </Animated.View>
                    <Animated.View style={{...styles.regButtonCont, ...styles.shadowStrong, transform: [{translateX: buttonRegisterPos}]}}>
                        <GradientButton  
                            height={40} 
                            width={screenWidth * 1.5 / 6 + offsetButton}
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={registerButton} 
                            path={'register'}
                            colorIcon={'grey'} 
                            heightIcon={15} 
                            widthIcon={15}
                            noText={false}
                            text={' register'}
                            colorText={'grey'}
                            startGradient={[1.0, 0.0]}
                            endGradient={[1.0, 1.0]}
                            borderTopRightRadius={20} 
                            borderBottomRightRadius={20} 
                        />
                    </Animated.View>
                </View>


                
            </Animated.View>
        </LinearGradient>
    </KeyboardAvoidingView>
  )
}


export default LoginScreen