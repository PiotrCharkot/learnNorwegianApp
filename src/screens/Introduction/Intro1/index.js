import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";

const Intro1 = () => {


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
            delay: 7000, // change to 7000 when in prod
            toValue: 1,
            useNativeDriver: true
        }).start();
      
    }, [])
    


  return (
    <View style={styles.mainContainer}>

        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Welcome</Text>
        </Animated.View>


        <Animated.View style={{...styles.textContainer, opacity: opacityText1}}>

            <Text style={styles.bodyText}>Discover Language, Discover the World.</Text>
        </Animated.View>


        <Animated.View style={{...styles.textContainer, opacity: opacityText2}}>

            <Text style={styles.bodyText}>Start your Norwegian language journey with our app, designed to make learning engaging and effective.</Text>
        </Animated.View>


        <Animated.View style={{...styles.textContainer, opacity: opacityNextBtn}}>

            <Text style={styles.bodyText}>There’s plenty to do here. Let's explore together!</Text>
        </Animated.View>

        <Animated.View style={{...styles.buttonContainer, opacity: opacityNextBtn, transform: [{translateX: xPosNextBtn}]}}>
            <TouchableOpacity onPress={() => navigation.replace("Intro2")}>

                <Image source={require('../../../../assets/arrow-right.png')} style={styles.iconImg}/>
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
        textAlign: 'center'
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
})