import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';

const offsetButton = 25;

const ForgetPassScreen = () => {

    const navigation = useNavigation();

    const screenWidth = Dimensions.get("window").width;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonLoginPos = useRef(new Animated.Value(-290)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/lock-question.png'));
    


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

const logIn = () => {
    console.log('login button pressed');
}

const backToLogIn = () => {

    setImageLink(require('../../../assets/login.png'))

    closeScreenAnimation();

    setTimeout(() => {
        navigation.navigate('Login');
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

                        <View style={styles.inputHolderDown}>

                            <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            placeholder='send password to'
                            inputContainerStyle={styles.inputContainerStyle}
                            leftIcon={<Image style={styles.inputImg} source={require('../../../assets/email.png')}/>}
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
                            width={screenWidth * 1.5 / 6 + offsetButton}
                            colorA={'white'} 
                            colorB={'#e8cceb'} 
                            callbackFunc={backToLogIn} 
                            path={'register'} 
                            heightIcon={15} 
                            widthIcon={15}
                            colorIcon={'grey'}
                            noText={false}
                            text={' login'}
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


export default ForgetPassScreen