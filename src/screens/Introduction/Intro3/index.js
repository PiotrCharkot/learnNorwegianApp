import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Intro3 = () => {

    const navigation = useNavigation();


    const opacityTitle = useRef(new Animated.Value(0)).current;

    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const opacityReplayBtn = useRef(new Animated.Value(0)).current;

    const xPosNextBtn = useRef(new Animated.Value(300)).current;
    const xPosReplayBtn = useRef(new Animated.Value(-300)).current;

    const opacityBar = useRef(new Animated.Value(0)).current;
    const barPosition = useRef(new Animated.Value(0)).current;

    const opacityPointer = useRef(new Animated.Value(1)).current;
    const pointerPositionX = useRef(new Animated.Value(0)).current;
    const pointerPositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    
    const opacityUpperText = useRef(new Animated.Value(0)).current;
    const opacityLowerText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText = useRef(new Animated.Value(0)).current;
    

    const opacityFlashcardBtn = useRef(new Animated.Value(0)).current;
    const opacityCreateBtn = useRef(new Animated.Value(0)).current;
    




    const runAnimation = () => {


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

        

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText}>Create your own flashcards</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText}></Text>

        </Animated.View>



        
        <Animated.View style={{...styles.flashcardBtnContainer}}>
            <Animated.Image source={require('../../../../assets/myFlashBtn.png')} style={{...styles.flashcardIntroBtnImg, opacity: opacityFlashcardBtn}}/>
        </Animated.View>

        



        <Animated.View style={{...styles.createBtnContainer}}>
            <Animated.Image source={require('../../../../assets/createBtn.png')} style={{...styles.createBtnImg, opacity: opacityCreateBtn}}/>
        </Animated.View>



        <Animated.View style={{...styles.pointerContainer, transform: [{translateY: pointerPositionY}, {translateX: pointerPositionX}]}}>
            <Animated.Image source={require('../../../../assets/pointer.png')} style={{...styles.pointerImg, opacity: opacityPointer}}/>
        </Animated.View>





        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            <Image source={require('../../../../assets/bar-word.png')} style={styles.barImg}/>
            <Animated.Image source={require('../../../../assets/bar-empty.png')} style={{...styles.barImg, opacity: opacityBar}}/>
        </Animated.View>






        <Animated.View style={{...styles.buttonContainerReplay, opacity: opacityReplayBtn, transform: [{translateX: xPosReplayBtn}]}}>
            <TouchableOpacity onPress={runAnimation}>

                <Image source={require('../../../../assets/reload.png')} style={styles.iconReplayImg}/>
            </TouchableOpacity>
        </Animated.View>


        <Animated.View style={{...styles.buttonContainer, opacity: opacityNextBtn, transform: [{translateX: xPosNextBtn}]}}>
            <TouchableOpacity>

                <Image source={require('../../../../assets/arrow-right.png')} style={styles.iconImg}/>
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
        fontWeight: '450'
    },
    textContainer: {
        marginTop: 100,
        marginHorizontal: 20,
    },
    bodyText: {
        fontSize: 20,
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
        height: 150
        
    },
    barImg: {
        position: 'absolute',
        width: '100%',
        height: 150
    },
    pointerContainer: {
        position: 'absolute',
        height: 30,
        width: 30
    },
    pointerImg: {
        height: 30,
        width: 30
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
        bottom: 200,
        marginHorizontal: 20,
    },
    flashcardBtnContainer: {
        position: 'absolute',
        left: 25,
        top: 40
    },
    flashcardIntroBtnImg: {
        height: 30,
        width: 90
    },
    createBtnContainer: {
        position: 'absolute',
        top: screenHeight - 160 - screenWidth / 7.2,
    },
    createBtnImg: {
        width: screenWidth,
        height: screenWidth / 7.2
    }
})