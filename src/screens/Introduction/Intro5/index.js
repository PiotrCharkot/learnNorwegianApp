import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;

const Intro5 = ({route}) => {

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
    
    
    const opacityLearn1 = useRef(new Animated.Value(0)).current;
    const opacityLearn2 = useRef(new Animated.Value(0)).current;
    const opacityLearn3 = useRef(new Animated.Value(0)).current;
    const opacityLearn4 = useRef(new Animated.Value(0)).current;
    
    
    
    
    


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
            Animated.timing(opacityTitle, {
                duration: 1500,
                delay: 3000,     
                toValue: 1,
                useNativeDriver: true
            }),
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
                }),
                Animated.timing(backgroundColor, {
                    duration: 2000,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                })
            ]),
            Animated.timing(opacityLearn1, {
                duration: 1300,
                toValue: 1,
                useNativeDriver: false,
            }),
            Animated.timing(opacityLearn2, {
                duration: 1300,
                delay: 1500,
                toValue: 1,
                useNativeDriver: false,
            }),
            Animated.parallel([
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 1000, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLearn3, {
                    duration: 1300,
                    delay: 1500,
                    toValue: 1,
                    useNativeDriver: false,
                })
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1200,
                    delay: 500, 
                    toValue: (screenWidth - 60) * 1.1 + 70 - 25,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    delay: 500, 
                    toValue: -100,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLearn4, {
                    duration: 200,
                    delay: 1700,
                    toValue: 1,
                    useNativeDriver: false,
                }),
            ]),
           
           
            Animated.parallel([
                Animated.timing(opacityLearn1, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLearn2, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLearn3, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLearn4, {
                    duration: 1000,
                    delay: 3000,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(backgroundColor, {
                    duration: 2000,
                    delay: 3000,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 4500,
                    toValue: 0,
                    useNativeDriver: true,
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

        




        <Animated.View style={{...styles.exerciseMenuContainer, transform: [{translateY: yPosMenu}]}}>
            <Animated.Image source={require('../../../../assets/introPictures/learningMenu.png')} style={{...styles.exerciseMenuImg, opacity: opacityExerciseMenu}}/>
        </Animated.View>
        


        <Animated.View style={styles.learnContainer}>
            <Animated.Image source={require('../../../../assets/introPictures/learn1.png')} style={{...styles.learnImg, opacity: opacityLearn1}}/>
            <Animated.Image source={require('../../../../assets/introPictures/learn2.png')} style={{...styles.learnImg, opacity: opacityLearn2}}/>
            <Animated.Image source={require('../../../../assets/introPictures/learn3.png')} style={{...styles.learnImg, opacity: opacityLearn3}}/>
            <Animated.Image source={require('../../../../assets/introPictures/learn4.png')} style={{...styles.learnImg, opacity: opacityLearn4}}/>
        </Animated.View>


        

        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-exe-ipad2.png')} style={{...styles.barImg, opacity: opacityBar}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-exe.png')} style={{...styles.barImg, opacity: opacityBar}}/>}
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-learn-ipad2.png')} style={{...styles.barImg, opacity: opacityBar2}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-learn.png')} style={{...styles.barImg, opacity: opacityBar2}}/>}
            
        </Animated.View>





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText} allowFontScaling={false}>Grammar Guide</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2}></Text>

        </Animated.View>

        

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText}></Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Understand Norwegian grammar with our step-by-step explanations (English only)</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer2, opacity: opacityLowerText2}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Take a short test at the end of each lesson</Text>

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
            <TouchableOpacity onPress={() => navigation.replace("Intro6", {skipable, language})}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </Animated.View>
  )
}

export default Intro5


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
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
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
   
})