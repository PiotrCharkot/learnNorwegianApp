import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;

const Intro6 = ({route}) => {

    const navigation = useNavigation();


    const {skipable, language} = route.params


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
    
    
    const opacityExerciseMenu = useRef(new Animated.Value(0)).current;
    const yPosMenu = useRef(new Animated.Value(0)).current;
    
    const opacityTextImg = useRef(new Animated.Value(0)).current;
    const yPosTextImg = useRef(new Animated.Value(0)).current;
    
    
    
    
    const opacityReadingBtn = useRef(new Animated.Value(0)).current;
    
    


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


        Animated.timing(yPosMenu, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();

        Animated.timing(yPosTextImg, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();

        Animated.timing(pointerPositionY, {
            duration: 800,
            toValue: screenHeight / 2,
            useNativeDriver: true
        }).start();

        Animated.timing(pointerPositionX, {
            duration: 800,
            toValue: 0,
            useNativeDriver: true
        }).start();

        

        Animated.sequence([
            Animated.timing(opacityTitle, {
                duration: 1500,
                delay: 1500,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityReadingBtn, {
                    duration: 1000,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1300,
                    delay: 300,
                    toValue: 55,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1300,
                    delay: 600,
                    toValue: - screenWidth / 2 + 90,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityExerciseMenu, {
                    duration: 2000,
                    delay: 1000,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityTitle, {
                    duration: 1000,
                    delay: 100,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1300,
                    delay: 1500,
                    toValue: screenHeight / 2,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 1800,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityReadingBtn, {
                    duration: 1000,
                    delay: 2000,
                    toValue: 0,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(yPosMenu, {
                    duration: 3000,
                    delay: 500, 
                    toValue: -300,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 2800,
                    delay: 500, 
                    toValue: 100,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityLowerText, {
                    duration: 2000,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenHeight / 2,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(yPosMenu, {
                    duration: 3000,
                    delay: 100, 
                    toValue: -600,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 2800,
                    delay: 100, 
                    toValue: 100,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(pointerPositionY, {
                duration: 1000,
                delay: 300, 
                toValue: 300,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityExerciseMenu, {
                    duration: 1000,
                    delay: 300, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 0,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityTextImg, {
                    duration: 1000,
                    delay: 300, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenHeight / 2,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(yPosTextImg, {
                    duration: 2500,
                    delay: 400, 
                    toValue: - screenWidth * 1.8,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 2200,
                    delay: 400, 
                    toValue: -180,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 2800, 
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityTextImg, {
                    duration: 1000,
                    delay: 4000, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 7000, 
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            
            
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

        

        <Animated.View style={{...styles.readingBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/readingHubBtn.png')} style={{...styles.readingBtnImg, opacity: opacityReadingBtn}}/>
        </Animated.View>



        <Animated.View style={{...styles.exerciseMenuContainer, transform: [{translateY: yPosMenu}]}}>
            <Animated.Image source={require('../../../../assets/introPictures/readingMenu.png')} style={{...styles.exerciseMenuImg, opacity: opacityExerciseMenu}}/>
        </Animated.View>


        <Animated.View style={{...styles.textImgContainer, transform: [{translateY: yPosTextImg}]}}>
            <Animated.Image source={require('../../../../assets/introPictures/textImg.png')} style={{...styles.textImg, opacity: opacityTextImg}}/>
        </Animated.View>
        

        

        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-learn-ipad2.png')} style={{...styles.barImg, opacity: opacityBar}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-learn.png')} style={{...styles.barImg, opacity: opacityBar}}/>}
            
        </Animated.View>





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText} allowFontScaling={false}>Reading Hub</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2}></Text>

        </Animated.View>

        

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText}></Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Improve your reading skills with texts on different levels</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer2, opacity: opacityLowerText2}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Each text comes with translations of useful expressions</Text>

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
            <TouchableOpacity onPress={() => navigation.replace("Intro7", {skipable, language})}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </Animated.View>
  )
}

export default Intro6


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
        fontSize: 20,
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
        bottom: isWideScreen ? 180 : 150,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    lowerTextContainer2: {
        position: 'absolute',
        bottom: isWideScreen ? 180 : 150,
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
        height: screenWidth * 3.5
    },
    textImgContainer: {
        position: 'absolute',
        top: 80,
    },
    textImg: {
        width: screenWidth,
        height: screenWidth * 2.82
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
    readingBtnContainer: {
        position: 'absolute',
        left: 25,
        top: 40
    },
    readingBtnImg: {
        height: isWideScreen ? 30 * ratioForWideScreen : 30,
        width: isWideScreen ? 115 * ratioForWideScreen : 115
    },
   
})