import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, {useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isWideScreen = screenWidth > 550;

const Intro1 = ({route}) => {

    const {skipable, language} = route.params

    const navigation = useNavigation();

    const opacityTitle = useRef(new Animated.Value(0)).current;
    const opacityText1 = useRef(new Animated.Value(0)).current;
    const opacityText2 = useRef(new Animated.Value(0)).current;
    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const xPosNextBtn = useRef(new Animated.Value(300)).current;


    useEffect(() => {



        Animated.timing(opacityTitle, {
            duration: 2000,
            delay: 500,
            toValue: 1,
            useNativeDriver: true
        }).start();


        Animated.timing(opacityText1, {
            duration: 2000,
            delay: 2000,
            toValue: 1,
            useNativeDriver: true
        }).start();


        Animated.timing(opacityText2, {
            duration: 2000,
            delay: 4000,
            toValue: 1,
            useNativeDriver: true
        }).start();


        Animated.timing(xPosNextBtn, {
            duration: 100,
            delay: 6000, 
            toValue: 0,
            useNativeDriver: true
        }).start();
    

        Animated.timing(opacityNextBtn, {
            duration: 2000,
            delay: 7000,
            toValue: 1,
            useNativeDriver: true
        }).start();
      
    }, [])
    


  return (
    <View style={styles.mainContainer}>

        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Welcome</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityText1}}>

            <Text style={styles.bodyText}>Discover Language, Discover the World.</Text>
        </Animated.View>


        <Animated.View style={{...styles.middleTextContainer, opacity: opacityText2}}>

            <Text style={styles.bodyText}>Start your Norwegian language journey with our app, designed to make learning engaging and effective.</Text>
        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityNextBtn}}>

            <Text style={styles.bodyText}>There’s plenty to do here. Let's explore together!</Text>
        </Animated.View>

        <Animated.View style={{...styles.buttonContainer, opacity: opacityNextBtn, transform: [{translateX: xPosNextBtn}]}}>
            <TouchableOpacity onPress={() => navigation.replace("Intro2", {skipable, language})}>

                <Image source={require('../../../../assets/introPictures/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </View>
  )
}

export default Intro1


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        position: 'absolute',
        top: 100,
        marginHorizontal: 20,
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
    upperTextContainer: {
        position: 'absolute',
        top: 220,
        marginHorizontal: 20,
    },
    middleTextContainer: {
        position: 'absolute',
        top: 320,
        marginHorizontal: 20,
    },
    lowerTextContainer: {
        position: 'absolute',
        bottom: 170,
        marginHorizontal: 20,
    },
    bodyText: {
        fontSize: isWideScreen ? 30 : 20,
        textAlign: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 90,
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
})