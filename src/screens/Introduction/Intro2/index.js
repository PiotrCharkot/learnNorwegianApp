import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;

const Intro2 = ({route}) => {

    const navigation = useNavigation();


    const {skipable, language, replayed} = route.params


    const opacityTitle = useRef(new Animated.Value(0)).current;
    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const opacityReplayBtn = useRef(new Animated.Value(0)).current;
    const opacityBar = useRef(new Animated.Value(1)).current;
    const barPosition = useRef(new Animated.Value(-1000)).current;
    const opacityPointer = useRef(new Animated.Value(0)).current;
    const pointerPositionX = useRef(new Animated.Value(0)).current;
    const pointerPositionY = useRef(new Animated.Value(0)).current;
    const opacityLangOne = useRef(new Animated.Value(0)).current;
    const opacityLang = useRef(new Animated.Value(0)).current;
    const opacityUpperText = useRef(new Animated.Value(0)).current;
    const opacityUpperText2 = useRef(new Animated.Value(0)).current;
    const opacityUpperText3 = useRef(new Animated.Value(0)).current;
    const opacityUpperText4 = useRef(new Animated.Value(0)).current;
    const opacityLowerText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText = useRef(new Animated.Value(0)).current;
    const opacityCard = useRef(new Animated.Value(0)).current;
    const opacityCard2 = useRef(new Animated.Value(0)).current;
    const opacityCard2rev = useRef(new Animated.Value(0)).current;
    const opacityFlashcardBtn = useRef(new Animated.Value(0)).current;
    const opacityFlashcardBtn2 = useRef(new Animated.Value(0)).current;
    const xPosNextBtn = useRef(new Animated.Value(300)).current;
    const xPosReplayBtn = useRef(new Animated.Value(-300)).current;




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

        Animated.sequence([
            Animated.timing(barPosition, {
                duration: 2000,
                delay: 100,
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: -200,
                useNativeDriver: true
            }),
            Animated.timing(barPosition, {
                duration: 8000,
                delay: 1000,
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: 0,
                useNativeDriver: true
            })
        ]).start();


        Animated.sequence([
            Animated.timing(pointerPositionY, {
                duration: 100,
                toValue: screenHeight / 2 + 15,
                useNativeDriver: true
            }),
            Animated.timing(opacityLangOne, {
                duration: 1000,
                delay: 1000,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1200,
                    delay: 5500,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 55,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    delay: 5500,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: screenWidth - 50 - screenWidth / 2,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacityLang, {
                duration: 700,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(pointerPositionY, {
                duration: 1000,
                delay: 1000,     
                easing: Easing.bezier(.38,.72,.68,1),
                toValue: 270,
                useNativeDriver: true
            }),
            Animated.timing(pointerPositionY, {
                duration: 1000,
                delay: 200,
                easing: Easing.bezier(.39,.1,.3,1.0),
                toValue: 85,
                useNativeDriver: true
            }),
            Animated.timing(opacityLang, {
                duration: 700,
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityUpperText, {
                    duration: 1000,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1200,    
                    delay: 700,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: screenHeight - 150 - 135,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    delay: 900,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacityCard, {
                duration: 2000,
                delay: 2000,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityUpperText, {
                duration: 1000,
                delay: 4000,
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 50,
                    useNativeDriver: true
                }),
                Animated.timing(opacityUpperText2, {
                    duration: 1200,
                    delay: 200,
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(pointerPositionX, {
                duration: 1200,
                delay: 200,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: -50,
                useNativeDriver: true
            }),
            Animated.timing(pointerPositionX, {
                duration: 1200,
                delay: 200,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: 50,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityUpperText2, {
                    duration: 1000,
                    delay: 1000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityCard, {
                    duration: 1000,
                    delay: 2000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityUpperText3, {
                    duration: 1000,
                    delay: 1000,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityFlashcardBtn2, {
                    duration: 1000,
                    delay: 1800,     
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1200,
                    delay: 200,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 55,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    delay: 500,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: - screenWidth / 2 + 51,
                    useNativeDriver: true
                }),
                Animated.timing(opacityCard2rev, {
                    duration: 1000,
                    delay: 1000,     
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityCard2, {
                    duration: 1000,
                    delay: 1800,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityFlashcardBtn, {
                    duration: 1000,
                    delay: 1800,     
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1200,
                    delay: 700,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: isWideScreen ? screenHeight - 150 - 110 : screenHeight - 150 - 40,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    delay: 1000,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(opacityUpperText3, {
                duration: 1000,
                delay: 3000,     
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(pointerPositionX, {
                    duration: 1200,
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 50,
                    useNativeDriver: true
                }),
                Animated.timing(opacityUpperText4, {
                    duration: 1200,
                    delay: 600,
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(pointerPositionX, {
                duration: 1200,
                delay: 200,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: -50,
                useNativeDriver: true
            }),
            Animated.timing(pointerPositionX, {
                duration: 1200,
                delay: 200,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: 50,
                useNativeDriver: true
            }),
            Animated.timing(opacityFlashcardBtn2, {
                duration: 100,
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.timing(opacityCard2rev, {
                duration: 100,
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityLangOne, {
                    duration: 1000,
                    delay: 4000,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityFlashcardBtn, {
                    duration: 1000,
                    delay: 4000,
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityCard2, {
                    duration: 2000,
                    delay: 4000,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityUpperText4, {
                    duration: 2000,
                    delay: 5500,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(xPosNextBtn, {
                    duration: 100,
                    delay: 5500, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(xPosReplayBtn, {
                    duration: 100,
                    delay: 5500, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityNextBtn, {
                    duration: 2000,
                    delay: 6000, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityReplayBtn, {
                    duration: 2000,
                    delay: 6000, 
                    toValue: 1,
                    useNativeDriver: true
                })
            ])

            

            
        
        ]).start();


        Animated.sequence([
            Animated.timing(opacityTitle, {
                duration: 1000,
                delay: 2500,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityTitle, {
                duration: 1500,
                delay: 1800,
                toValue: 0,
                useNativeDriver: true
            })
        ]).start();
        

        Animated.sequence([
            Animated.timing(opacityMiddleText, {
                duration: 1000,
                delay: 4500,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityMiddleText, {
                duration: 1000,
                delay: 2500,
                toValue: 0,
                useNativeDriver: true
            })
        ]).start();


        Animated.sequence([
            Animated.timing(opacityLowerText, {
                duration: 1000,
                delay: 7000,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityLowerText, {
                duration: 1000,
                delay: 3500,
                toValue: 0,
                useNativeDriver: true
            })
        ]).start()




        Animated.timing(opacityBar, {
            duration: 700,
            delay: 1800,
            toValue: 0,
            useNativeDriver: true
        }).start();


       
        Animated.timing(opacityPointer, {
            duration: 1000,
            delay: 2900,
            toValue: 1,
            useNativeDriver: true
        }).start();
      

    }

    useEffect(() => {

        runAnimation();
        console.log('width', screenWidth);

    }, [])
    


  return (
    <View style={styles.mainContainer}>


        <Animated.View style={{...styles.flashcardBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/flashcardIntroBtn2.png')} style={{...styles.flashcardIntroBtnImg, opacity: opacityFlashcardBtn2}}/>
        </Animated.View>


        <Animated.View style={{...styles.flashcardBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/flashcardIntroBtn.png')} style={{...styles.flashcardIntroBtnImg, opacity: opacityFlashcardBtn}}/>
        </Animated.View>

        
        <Animated.View style={{...styles.langContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/langOne.png')} style={{...styles.langOneImg, opacity: opacityLangOne}}/>
            <Animated.Image source={require('../../../../assets/introPictures/langList.png')} style={{...styles.langImg, opacity: opacityLang}}/>
        </Animated.View>



        <Animated.View style={{...styles.cardImgContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/flashcardIntro.png')} style={{...styles.cardImg, opacity: opacityCard}}/>
        </Animated.View>


        <Animated.View style={{...styles.cardImgContainer2}}>
            <Animated.Image source={require('../../../../assets/introPictures/flashcardIntro2rev.png')} style={{...styles.cardImg2, opacity: opacityCard2rev}}/>
        </Animated.View>



        <Animated.View style={{...styles.cardImgContainer2}}>
            <Animated.Image source={require('../../../../assets/introPictures/flashcardIntro2.png')} style={{...styles.cardImg2, opacity: opacityCard2}}/>
        </Animated.View>



        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            {isWideScreen ? <Image source={require('../../../../assets/introPictures/bar-word-ipad2.png')} style={styles.barImg}/> : <Image source={require('../../../../assets/introPictures/bar-word.png')} style={styles.barImg}/>}
            
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-empty-ipad2.png')} style={{...styles.barImg, opacity: opacityBar}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-empty.png')} style={{...styles.barImg, opacity: opacityBar}}/>}
            
        </Animated.View>





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText} allowFontScaling={false}>Flashcards</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2} allowFontScaling={false}>Over <Text style={styles.bodyTextBold2}>1000</Text> words and expressions across all difficulty levels. Practical examples, pronunciations, and translations that help you master Norwegian.</Text>

        </Animated.View>

        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText2}}>
            <Text style={styles.bodyText}></Text>
            <Text style={styles.bodyText}></Text>
            <Text style={styles.bodyText} allowFontScaling={false}>Choose between '<Text style={styles.bodyTextBold}>Learn</Text>' and '<Text style={styles.bodyTextBold}>Test</Text>' mode.</Text>

        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText3}}>
            <Text style={styles.bodyText2}></Text>
            <Text style={styles.bodyText2} allowFontScaling={false}>You can choose which side of the flashcards is shown first. Select either the side with translations or the side with words in Norwegian.</Text>

        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText4}}>
            <Text style={styles.bodyText2}></Text>
            <Text style={styles.bodyText2} allowFontScaling={false}>Use buttons with arrows. If you remember a word, press the <Text style={styles.bodyTextBold3}>up arrow</Text> to see it less often. If it is hard to remember, press the <Text style={styles.bodyTextBold2}>down arrow</Text> to see it more often.</Text>

        </Animated.View>

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Build your vocabulary with flashcards</Text>

        </Animated.View>

        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>First, select your preferred language from the list</Text>

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
            <TouchableOpacity  onPress={() => navigation.replace("Intro3", {skipable, language, replayed})}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </View>
  )
}

export default Intro2


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
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
        marginTop: 100,
        marginHorizontal: 20,
    },
    bodyText: {
        fontSize: isWideScreen ? 30 : 20,
        textAlign: 'center',
    },
    bodyText2: {
        fontSize: isWideScreen ? 26 : 18,
        textAlign: 'center',
    },
    bodyTextBold: {
        fontSize: isWideScreen ? 30 : 20,
        color: 'green',
        fontWeight: '700'
    },
    bodyTextBold2: {
        fontSize: isWideScreen ? 26 : 18,
        color: 'red',
        fontWeight: '700'
    },
    bodyTextBold3: {
        fontSize: isWideScreen ? 26 : 18,
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
    langContainer: {
        position: 'absolute',
        right: 25,
        top: 45
    },
    langOneImg: {
        height: isWideScreen ? 20 * ratioForWideScreen : 20,
        width: isWideScreen ? 50 * ratioForWideScreen : 50
    },
    langImg: {
        position: 'absolute',
        width: isWideScreen ? 50 * ratioForWideScreen : 50,
        height: isWideScreen ? 236 * ratioForWideScreen : 236
    },
    upperTextContainer: {
        position: 'absolute',
        top: isWideScreen ? 70 * ratioForWideScreen : 70,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    middleTextContainer: {
        position: 'absolute',
        top: screenHeight / 2,
        marginHorizontal: 20,
    },
    lowerTextContainer: {
        position: 'absolute',
        bottom: 200,
        marginHorizontal: 20,
    },
    cardImgContainer: {
        position: 'absolute',
        top: isWideScreen ? screenHeight - 250 - 375 * ratioForWideScreen : screenHeight - 150 - 375,
    },
    cardImg: {
        width: isWideScreen ? 260 * ratioForWideScreen : 260,
        height: isWideScreen ? 375 * ratioForWideScreen : 375
    },
    cardImgContainer2: {
        position: 'absolute',
        top: screenHeight - 150 - screenWidth * 0.7,
    },
    cardImg2: {
        width: screenWidth,
        height: screenWidth * 0.7
    },
    flashcardBtnContainer: {
        position: 'absolute',
        left: 25,
        top: 40
    },
    flashcardIntroBtnImg: {
        height: isWideScreen ? 25 * ratioForWideScreen : 25,
        width: isWideScreen ? 52 * ratioForWideScreen : 52
    }
})