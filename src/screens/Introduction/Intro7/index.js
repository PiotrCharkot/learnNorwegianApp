import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import useRevenueCat from '../../../../hooks/useRevenueCat';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;

const Intro7 = ({route}) => {

    const navigation = useNavigation();

    const { currentOffering, customerInfo, isProMember} = useRevenueCat();


    const {skipable, language} = route.params;

    const price = '4.99 $'



    const opacityTitle = useRef(new Animated.Value(0)).current;

    const backgroundColor = useRef(new Animated.Value(0)).current;

    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const opacityReplayBtn = useRef(new Animated.Value(0)).current;

    const xPosNextBtn = useRef(new Animated.Value(300)).current;
    const xPosReplayBtn = useRef(new Animated.Value(-300)).current;
    
    const opacityBar = useRef(new Animated.Value(1)).current;
    const opacityBar2 = useRef(new Animated.Value(0)).current;
    const barPosition = useRef(new Animated.Value(0)).current;
    
    const opacityPointer = useRef(new Animated.Value(1)).current;
    const pointerPositionX = useRef(new Animated.Value(0)).current;
    const pointerPositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    
    const opacityUpperText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText = useRef(new Animated.Value(0)).current;
    const opacityLowerText = useRef(new Animated.Value(0)).current;
    const opacityLowerText2 = useRef(new Animated.Value(0)).current;
    const opacityLowerText3 = useRef(new Animated.Value(0)).current;
    
    
    
    const opacityProfilImg = useRef(new Animated.Value(0)).current;
    
    const opacitySettingsImg = useRef(new Animated.Value(0)).current;
    
    


    const backgroundColorInterpolate = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
    });




    const runAnimation = () => {



        if (skipable) {
            Animated.timing(xPosNextBtn, {
                duration: 100,
                delay: 2800, 
                toValue: 1,
                useNativeDriver: true
            }).start();

            Animated.timing(opacityNextBtn, {
                duration: 2000,
                delay: 3000, 
                toValue: 1,
                useNativeDriver: true
            }).start();
        }


        Animated.timing(opacityReplayBtn, {
            duration: 300,
            toValue: 0,
            useNativeDriver: true
        }).start();


        Animated.timing(xPosReplayBtn, {
            duration: 100,
            delay: 300, 
            toValue: -300,
            useNativeDriver: true
        }).start();


        

        Animated.timing(pointerPositionY, {
            duration: 1000,
            delay: 500, 
            toValue: screenHeight / 2,
            useNativeDriver: true
        }).start();

        Animated.timing(pointerPositionX, {
            duration: 1000,
            delay: 200, 
            toValue: 0,
            useNativeDriver: true
        }).start();

        Animated.timing(opacityLowerText3, {
            duration: 500,
            delay: 100, 
            toValue: 0,
            useNativeDriver: true
        }).start()

        Animated.sequence([
            Animated.timing(barPosition, {
                duration: 1500,
                delay: 500,
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: -200,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityBar, {
                    duration: 1500,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityBar2, {
                    duration: 1500,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(barPosition, {
                    duration: 8000,
                    delay: 1500,
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),

        ]).start();


        Animated.sequence([
            Animated.timing(opacityProfilImg, {
                duration: 1500,
                delay: 3500,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityLowerText, {
                duration: 1000,
                delay: 2500, 
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityLowerText, {
                    duration: 1000,
                    delay: 3500, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 4000, 
                    toValue: 90,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 4200, 
                    toValue: -screenWidth / 2 + 55,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacityLowerText2, {
                duration: 1000,
                delay: 500, 
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 400, 
                    toValue: screenWidth / 2 - 25,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 2800, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityProfilImg, {
                    duration: 1500,
                    delay: 3000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(opacitySettingsImg, {
                duration: 1500,
                delay: 500,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 1000, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1200,
                    delay: 800, 
                    toValue: screenWidth * 1.8 / 4.4 + 80,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText3, {
                    duration: 1000,
                    delay: 2500, 
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(opacitySettingsImg, {
                duration: 1500,
                delay: 6500,     
                toValue: 0,
                useNativeDriver: true
            }),
          
            
            Animated.parallel([
                Animated.timing(xPosNextBtn, {
                    duration: 100,
                    delay: 200, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(xPosReplayBtn, {
                    duration: 100,
                    delay: 200, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityNextBtn, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityReplayBtn, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 1,
                    useNativeDriver: true
                })
            ])
        ]).start()
        

    }

    

    useEffect(() => {

        runAnimation();
      

    }, [])
    


  return (
    <Animated.View style={{...styles.mainContainer, backgroundColor: backgroundColorInterpolate}}>

        




        <Animated.View style={styles.profilImgContainer}>
            <Animated.Image source={require('../../../../assets/introPictures/profilImg.png')} style={{...styles.profilImg, opacity: opacityProfilImg}}/>
        </Animated.View>
        

        <Animated.View style={styles.settingsImgContainer}>
            <Animated.Image source={require('../../../../assets/introPictures/settingsImg.png')} style={{...styles.settingsImg, opacity: opacitySettingsImg}}/>
        </Animated.View>

        
        

        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-learn-ipad2.png')} style={{...styles.barImg, opacity: opacityBar}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-learn.png')} style={{...styles.barImg, opacity: opacityBar}}/>}
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-profil-ipad2.png')} style={{...styles.barImg, opacity: opacityBar2}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-profil.png')} style={{...styles.barImg, opacity: opacityBar2}}/>}
            
        </Animated.View>





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Profil</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2}></Text>

        </Animated.View>

        

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText}></Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText}>Earn points for each activity. Track your progress and see how you rank among other learners.</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer2, opacity: opacityLowerText2}}>
            <Text style={styles.bodyText}>Create your account and customize your profile</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer2, opacity: opacityLowerText3}}>
            <Text style={styles.bodyText}>Enjoy full access to all features for the first week at no charge. After seven days upgrade to the <Text style={styles.bodyTextBold}>PRO version</Text> with a monthly subscription for only {currentOffering ? currentOffering.monthly.product.priceString : price} / month. Cancel anytime.</Text>

        </Animated.View>





        <Animated.View style={{...styles.pointerContainer, transform: [{translateY: pointerPositionY}, {translateX: pointerPositionX}]}}>
            <Animated.Image source={require('../../../../assets/introPictures/pointer.png')} style={{...styles.pointerImg, opacity: opacityPointer}}/>
        </Animated.View>



        <Animated.View style={{...styles.buttonContainerReplay, opacity: opacityReplayBtn, transform: [{translateX: xPosReplayBtn}]}}>
            <TouchableOpacity onPress={runAnimation}>

                <Image source={require('../../../../assets/introPictures/reload.png')} style={styles.iconReplayImg}/>
            </TouchableOpacity>
        </Animated.View>


        <Animated.View style={{...styles.buttonContainer, opacity: opacityNextBtn, transform: [{translateX: xPosNextBtn}]}}>
            <TouchableOpacity onPress={() => {
                    if (skipable) {
                        navigation.replace("Settings", { choosenLanguage: language });
                    } else {
                        navigation.replace("Intro8");
                    }
                }}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </Animated.View>
  )
}

export default Intro7


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 100
        
    },
    titleText: {
        fontSize: isWideScreen ? 50 : 40,
        fontWeight: '450',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    textContainer: {
        marginTop: 100
    },
    bodyText: {
        fontSize: isWideScreen ? 30 : 20,
        textAlign: 'center',
    },
    bodyText2: {
        fontSize: 18,
        textAlign: 'center',
    },
    bodyTextBold: {
        fontSize: isWideScreen ? 30 : 20,
        color: 'green',
        fontWeight: '700'
    },
    bodyTextBold2: {
        fontSize: 18,
        color: 'red',
        fontWeight: '700'
    },
    bodyTextBold3: {
        fontSize: 18,
        color: 'green',
        fontWeight: '700'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 120,
        right: 0,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        height: 50,
        width: 50,
        tintColor: 'purple'
    },
    buttonContainerReplay: {
        position: 'absolute',
        bottom: 120,
        left: 0,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconReplayImg: {
        height: 50,
        width: 50,
        tintColor: 'purple'
    },
    barImgContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: isWideScreen ? 180 : 150
        
    },
    barImg: {
        position: 'absolute',
        width: '100%',
        height: isWideScreen ? 180 : 150
    },
    pointerContainer: {
        position: 'absolute',
        height: 30,
        width: 30
    },
    pointerImg: {
        height: isWideScreen ? 30 * ratioForWideScreen : 30,
        width: isWideScreen ? 30 * ratioForWideScreen : 30
    },
    upperTextContainer: {
        position: 'absolute',
        top: 70,
        marginHorizontal: 20,
    },
    middleTextContainer: {
        position: 'absolute',
        top: screenHeight / 2,
        marginHorizontal: 20,
    },
    lowerTextContainer: {
        position: 'absolute',
        bottom: 250,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    lowerTextContainer2: {
        position: 'absolute',
        bottom: 250,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    exerciseMenuContainer: {
        position: 'absolute',
        top: 200,
    },
    exerciseMenuImg: {
        width: screenWidth,
        height: screenWidth * 3.1
    },
    learnContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 70,
        width: '100%',
    },
    learnImg: {
        position: 'absolute',
        width: screenWidth - 60,
        height: (screenWidth - 60) * 1.1
    },
    profilImgContainer: {
        position: 'absolute',
        top: 80,
    },
    profilImg: {
        width: screenWidth,
        height: screenWidth * 1.58
    },
    settingsImgContainer: {
        position: 'absolute',
        top: 80,
    },
    settingsImg: {
        width: screenWidth,
        height: screenWidth * 1.8
    },
   
})