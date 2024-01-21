import { View, Text, Image, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import styles from './style'


const ChangePictureScreen = ({route}) => {

    const navigation = useNavigation();

    const screenWidth = Dimensions.get("window").width;
    
    const {userId} = route.params;
    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${userId}`);


    console.log('user id in change pic: ', userId);
    const [image, setImage] = useState(null);

    const picturePositionY = useRef(new Animated.Value(-screenWidth)).current;
    const blueBckPositionY = useRef(new Animated.Value(-screenWidth)).current;
    const opacityBlue = useRef(new Animated.Value(0)).current;
    const opacityGreen = useRef(new Animated.Value(0)).current;


    const hideGreenCloud = () => {
        Animated.timing(opacityGreen, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    const flashGreenCloud = () => {
        Animated.sequence([
            Animated.timing(opacityBlue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(opacityGreen, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
          ]).start();
    }

    const flashBlueCloud = () => {
        hideGreenCloud();
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityBlue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(opacityBlue, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                })
              ])
           
        ).start();

    }

    const pickImage = async () => {
        
        hideGreenCloud();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        console.log(result);

        if (!result.canceled) {
            
            setImage(result.assets[0].uri);
        }
    };
    

    const uploadToFb = async () => {
        //start animation
        flashBlueCloud();
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.onerror = (e) => {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
      
        uploadBytesResumable(storageRef, blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            opacityBlue.stopAnimation();
            flashGreenCloud();
        });
       
    }


    useEffect(() => {
      Animated.parallel([
        Animated.timing(picturePositionY, {
            toValue: 0,
            duration: 2500,
            easing: Easing.bezier(.3,.88,0,.98),
            useNativeDriver: true
        }),
        Animated.timing(blueBckPositionY, {
            toValue: 0,
            duration: 2300,
            delay: 200,
            easing: Easing.bezier(.3,.88,0,.98),
            useNativeDriver: true
        })
      ]).start()
    }, [])
    
    
  return (
    <View style={styles.mainContainer}>
        <Animated.View style={{transform: [{translateY: blueBckPositionY}]}}>

            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.backgroundTop} >
            
                <TouchableOpacity style={styles.xImgContainer} onPress={() => navigation.navigate('profil')}>
                <Image style={styles.xImg} source={require('../../../assets/close.png')} />
                </TouchableOpacity>

            </LinearGradient>
        </Animated.View>

        <View style={styles.bottomContainer}>


            <Animated.View style={{...styles.imgContainer, ...styles.shadowImg, transform: [{translateY: picturePositionY}]}}>

                <Image source={{ uri: image }} style={styles.img} /> 
            </Animated.View>

            {image ? (
                <View style={styles.buttonContainer}>

         
                
                <GradientButton  
                height={40} 
                width={200}
                colorA={'#3a7bd5'} 
                colorB={'#3a6073'} 
                callbackFunc={uploadToFb} 
                text={'Use that image'}
                colorText={'white'}
                noText={false}
                startGradient={[0.0, 0.0]}
                endGradient={[1.0, 1.0]}
                borderTopRightRadius={20} 
                borderBottomRightRadius={20} 
                borderTopLeftRadius={20} 
                borderBottomLeftRadius={20} 
                
                />

                </View> 
            ) : (
                <View style={{height: 190}} ></View>
            )
            }

            <GradientButton  
            height={40} 
            width={200}
            colorA={'#3a7bd5'} 
            colorB={'#3a6073'} 
            callbackFunc={pickImage} 
            text={'Pick an image'}
            colorText={'white'}
            noText={false}
            startGradient={[0.0, 0.0]}
            endGradient={[1.0, 1.0]}
            borderTopRightRadius={20} 
            borderBottomRightRadius={20} 
            borderTopLeftRadius={20} 
            borderBottomLeftRadius={20} 
            />

            
        </View>

        <View style={styles.cloudContainer}>
            
            <Animated.Image style={{...styles.blueCloudImg, opacity: opacityBlue}} source={require('../../../assets/upload.png')} />
            <Animated.Image style={{...styles.greenCloudImg, opacity: opacityGreen}} source={require('../../../assets/upload-success.png')} />
        </View>
      
      
    </View>

    
  )
}

export default ChangePictureScreen