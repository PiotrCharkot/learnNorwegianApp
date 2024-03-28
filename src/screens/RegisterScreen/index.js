import { View, Text, Image, KeyboardAvoidingView, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useNavigation } from "@react-navigation/native";
import { authentication } from '../../../firebase/firebase-config';
import { db } from '../../../firebase/firebase-config'
import { collection, getDocs, query, where, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, linkWithCredential, updateProfile  } from "firebase/auth";
import { Input } from "react-native-elements";
import { withAnchorPoint } from 'react-native-anchor-point';
import { LinearGradient } from 'expo-linear-gradient';
import uuid from 'react-native-uuid';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style';
import forbiddenUsernames from '../../listData/otherData/forbiddenUsernames';

const offsetButton = 25;
const usersPointsCollection = collection(db, 'usersPoints');


const RegisterScreen = () => {

    const navigation = useNavigation();

    const userNames = collection(db, 'userNames');
    const docRefUserList = doc(db, "userNames", "DbIjRsGg1IzAgJs0vC81");

    const screenWidth = Dimensions.get("window").width;
    const interpolatedValue = useRef(new Animated.Value(0)).current;
    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    const buttonLoginPos = useRef(new Animated.Value(-290)).current;
    const messageContainerPos = useRef(new Animated.Value(-500)).current;
    const [imageLink, setImageLink] = useState(require('../../../assets/sign-in.png'));
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageText, setMessageText] = useState("Looks like an unknown error");
    const [userNamesList, setUserNamesList] = useState([]);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

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
                
                setMessageText('Oops! It seems you forgot to type in your email. Let\'s fill that in to move forward!');
                
            } else if (errorCode === 'auth/missing-password') {
                
                setMessageText('We noticed you skipped the password field. Please enter your password to secure your account');
                
            } else if (errorCode === 'auth/weak-password') {
               
                setMessageText('Your password needs to be between 6 and 50 characters long');
                
            } else if (errorCode === 'auth/invalid-email') {
               
                setMessageText('Oops, that doesn\'t look like a valid email address. Let\'s try again!');
                
            } else if (errorCode === 'auth/email-already-in-use') {
                
                setMessageText('This email is already in use. Please try another one or log in if you\'re already a member');
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
        setMessageText('Looks like you missed a step! Please enter a username to continue.');
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
        navigation.navigate('Login');
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
        toValue: -500,
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
                            autoCapitalize='none'
                            placeholder='username (max 20 characters)'
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
                            placeholder='email address'
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
                            placeholder='password (6-50 characters)'
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
                            <Text style={styles.inputTakenMsgTxt}>{isUsernameTaken ? 'This username is already taken. Please choose another.' : ''}</Text>
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
                            text={' back    '}
                            colorText={'grey'}
                            startGradient={[1.0, 0.0]}
                            endGradient={[1.0, 1.0]}
                            borderTopRightRadius={20} 
                            borderBottomRightRadius={20} 
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