import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const isWideScreen = screenWidth > 550;
const ratioForWideScreen = 2;

const Intro3 = ({route}) => {

    const navigation = useNavigation();


    const {skipable, language} = route.params


    const opacityTitle = useRef(new Animated.Value(0)).current;

    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const opacityReplayBtn = useRef(new Animated.Value(0)).current;

    const xPosNextBtn = useRef(new Animated.Value(300)).current;
    const xPosReplayBtn = useRef(new Animated.Value(-300)).current;

    const opacityBar = useRef(new Animated.Value(1)).current;
    const barPosition = useRef(new Animated.Value(0)).current;

    const opacityPointer = useRef(new Animated.Value(1)).current;
    const pointerPositionX = useRef(new Animated.Value(0)).current;
    const pointerPositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    
    const opacityUpperText = useRef(new Animated.Value(0)).current;
    const opacityLowerText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText2 = useRef(new Animated.Value(0)).current;
    

    const opacityFlashcardBtn = useRef(new Animated.Value(0)).current;
    const opacityExploreCardsBtn = useRef(new Animated.Value(0)).current;
    const opacityCreateBtn = useRef(new Animated.Value(0)).current;
    const opacityForm = useRef(new Animated.Value(0)).current;
    const opacityFormFilled = useRef(new Animated.Value(0)).current;
    const opacityShare = useRef(new Animated.Value(0)).current;
    const opacityMarkedShare = useRef(new Animated.Value(0)).current;
    const opacityOwnCard = useRef(new Animated.Value(0)).current;
    




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
            Animated.parallel([
                Animated.timing(opacityFlashcardBtn, {
                    duration: 1000,
                    delay: 1200,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityMiddleText, {
                    duration: 2000,
                    delay: 1000,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1300,
                    delay: 1700,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 55,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1300,
                    delay: 2000,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: - screenWidth / 2 + 70,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacityCreateBtn, {
                duration: 1000,
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityFlashcardBtn, {
                    duration: 1000,
                    delay: 800,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityMiddleText, {
                    duration: 1000,
                    delay: 1000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1300,
                    delay: 300,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: screenHeight - 160 - screenWidth / 7.2 / 2,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1300,
                    delay: 200,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(opacityForm, {
                duration: 1300,
                delay: 200,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityCreateBtn, {
                    duration: 1000,
                    delay: 200,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityBar, {
                    duration: 1000,
                    delay: 200,     
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),
            Animated.timing(opacityFormFilled, {
                duration: 1000,
                delay: 700,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityShare, {
                duration: 1000,
                delay: 500,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(pointerPositionY, {
                duration: 1300,
                delay: 300,     
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: 110 + (screenWidth - 60) / 1.07,
                useNativeDriver: true
            }),
            Animated.timing(opacityMarkedShare, {
                duration: 300,
                delay: 200,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityLowerText, {
                    duration: 1500,
                    delay: 500,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 500,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 80 + (screenWidth - 60) / 1.07 * 0.75,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityForm, {
                    duration: 100,
                    delay: 100,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityShare, {
                    duration: 100,
                    delay: 100,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityFormFilled, {
                    duration: 1000,
                    delay: 1500,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityMarkedShare, {
                    duration: 1000,
                    delay: 1200,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText, {
                    duration: 1500,
                    delay: 3000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityOwnCard, {
                    duration: 1500,
                    delay: 3000,     
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityExploreCardsBtn, {
                    duration: 1500,
                    delay: 3200,     
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1300,
                    delay: 700,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 55,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1300,
                    delay: 1000,     
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: - screenWidth / 2 + 70,
                    useNativeDriver: true
                }),
                Animated.timing(opacityMiddleText2, {
                    duration: 1500,
                    delay: 1500,     
                    toValue: 1,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityOwnCard, {
                    duration: 1500,
                    delay: 3000,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityExploreCardsBtn, {
                    duration: 1500,
                    delay: 3200,     
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityMiddleText2, {
                    duration: 1500,
                    delay: 5500,     
                    toValue: 0,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityBar, {
                    duration: 1000,
                    delay: 700,     
                    toValue: 1,
                    useNativeDriver: true
                }),
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
                    delay: 700, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityReplayBtn, {
                    duration: 2000,
                    delay: 700, 
                    toValue: 1,
                    useNativeDriver: true
                })
            ])


        ]).start();
        

    }

    

    useEffect(() => {

        runAnimation();
      

    }, [])
    


  return (
    <View style={styles.mainContainer}>

        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}></Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2}></Text>

        </Animated.View>

    



        
        <Animated.View style={{...styles.flashcardBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/myFlashBtn.png')} style={{...styles.flashcardIntroBtnImg, opacity: opacityFlashcardBtn}}/>
        </Animated.View>

        <Animated.View style={{...styles.exploreCardsBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/exploreCardsBtn.png')} style={{...styles.exploreCardsBtnImg, opacity: opacityExploreCardsBtn}}/>
        </Animated.View>

        

        <Animated.View style={{...styles.formContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/ownFlashCard.png')} style={{...styles.formImg, opacity: opacityForm}}/>
        </Animated.View>


        <Animated.View style={{...styles.formContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/ownFlashCardFilled.png')} style={{...styles.formFilledImg, opacity: opacityFormFilled}}/>
        </Animated.View>


        <Animated.View style={{...styles.shareContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/shareImg.png')} style={{...styles.shareImg, opacity: opacityShare}}/>
        </Animated.View>


        <Animated.View style={{...styles.shareContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/shareMarkedImg.png')} style={{...styles.shareImg, opacity: opacityMarkedShare}}/>
        </Animated.View>


        <Animated.View style={{...styles.ownCardContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/ownCard.png')} style={{...styles.ownCardImg, opacity: opacityOwnCard}}/>
        </Animated.View>



        <Animated.View style={{...styles.createBtnContainer}}>
            <Animated.Image source={require('../../../../assets/introPictures/createBtn.png')} style={{...styles.createBtnImg, opacity: opacityCreateBtn}}/>
        </Animated.View>



        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Create your own flashcards</Text>

        </Animated.View>


        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText2}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Explore flashcards created by other users. Save and use them as your own.</Text>

        </Animated.View>

        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText} allowFontScaling={false}>Create, edit and share your word lists with other users</Text>

        </Animated.View>




        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            {isWideScreen ? <Animated.Image source={require('../../../../assets/introPictures/bar-word-ipad2.png')} style={{...styles.barImg, opacity: opacityBar}}/> : <Animated.Image source={require('../../../../assets/introPictures/bar-word.png')} style={{...styles.barImg, opacity: opacityBar}}/>}
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
            <TouchableOpacity onPress={() => navigation.replace("Intro4", {skipable, language})}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </View>
  )
}

export default Intro3


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
        fontSize: 40,
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    lowerTextContainer: {
        position: 'absolute',
        top: 140 + (screenWidth - 60) / 1.07 + screenWidth / 13.8,
        marginHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    flashcardBtnContainer: {
        position: 'absolute',
        left: 25,
        top: 40
    },
    flashcardIntroBtnImg: {
        height: isWideScreen ? ratioForWideScreen * 30 : 30,
        width: isWideScreen ? ratioForWideScreen * 90 : 90
    },
    exploreCardsBtnContainer: {
        position: 'absolute',
        left: 25,
        top: 40
    },
    exploreCardsBtnImg: {
        height: isWideScreen ? ratioForWideScreen * 30 : 30,
        width: isWideScreen ? ratioForWideScreen * 90 : 90
    },
    createBtnContainer: {
        position: 'absolute',
        top: screenHeight - 160 - screenWidth / 7.2,
    },
    createBtnImg: {
        width: screenWidth,
        height: screenWidth / 7.2
    },
    formContainer: {
        position: 'absolute',
        top: 80
    },
    formImg: {
        width: screenWidth - 60,
        height: (screenWidth - 60) / 1.47
    },
    formFilledContainer:  {
        position: 'absolute',
        top: 80
    },
    formFilledImg: {
        width: screenWidth - 60,
        height: (screenWidth - 60) / 1.07
    },
    shareContainer: {
        position: 'absolute',
        top: 100 + (screenWidth - 60) / 1.07
    },
    shareImg: {
        width: screenWidth,
        height: screenWidth / 13.8
    },
    ownCardContainer: {
        position: 'absolute',
        top: isWideScreen ? ratioForWideScreen * 120 : 80
    },
    ownCardImg: {
        width: isWideScreen ? screenWidth * 0.7 : screenWidth,
        height: isWideScreen ? screenWidth / 1.9  * 0.7 : screenWidth / 1.9 
    }
})