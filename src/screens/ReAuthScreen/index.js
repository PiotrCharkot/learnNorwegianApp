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

    const {changePass} = route.params;


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
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

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
        setMessageText('We encountered an issue while trying to delete your account. Please try again or contact support for assistance.');
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
            setMessageText('Are you sure you want to delete your account?');

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
                
            setMessageText('Oops! It seems you forgot to type in your email. Let\'s fill that in to move forward!');
            
        } else if (errorCode === 'auth/missing-password') {
            
            setMessageText('We noticed you skipped the password field. Please enter your password to proceed');
            
        } else if (errorCode === 'auth/invalid-email') {
           
            setMessageText('Oops, that doesn\'t look like a valid email address. Let\'s try again!');
            
        } else if (errorCode === 'auth/wrong-password') {
            
            setMessageText('Wrong password. Please try again or contact support for assistance');
            
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
        navigation.navigate('UpdatePassword');
        
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

    openScreenAnimation()
   
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
                            placeholder={changePass ? 'current password' : 'password'}
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
                            <Text style={styles.msgTxt}>{changePass ? 'Enter your email and current password to proceed' : 'Enter your email and password to proceed'}</Text>
                        </View>
                            
                    </View>

                    
                    
                    
                </View>


                
            </Animated.View>

            <Animated.View style={{...styles.messageContainer, transform: [{translateX: messageContainerPos}]}}>
                <LinearGradient colors={['#6d28ed', '#fafafa']} style={styles.messageGradient}  start={[0.0, 1.0]} end={[1.0, 1.0]}>

                
                    <Text style={styles.messageText}>{messageText}</Text>

                    <View style={styles.messageButtonsContainer}>

                        {showDeleteBtn ? <TouchableOpacity style={styles.messageButtons} onPress={deleteAccount}>
                            <Text style={styles.messageButtonsText}>Yes</Text>
                        </TouchableOpacity> : <View></View>}

                        <TouchableOpacity style={styles.messageButtons} onPress={hideMessage}>
                            <Text style={styles.messageButtonsText}>{showDeleteBtn ? 'No' : 'OK'}</Text>
                        </TouchableOpacity>
                    </View>
                    

                </LinearGradient>
            </Animated.View>
        </LinearGradient>
    </KeyboardAvoidingView>
  )
}


export default ReAuthScreen