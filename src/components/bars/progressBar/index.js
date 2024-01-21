import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;
const progressLineLenght = screenWidth - 140;

const ProgressBar = (params) => {

    const navigation = useNavigation();

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;
    
    const progresLenght = params.screenNum;
    const totalLenght = params.totalLenghtNum;
    const latestScreen = params.latestScreen;
    const comeBack = params.comeBack;

    const lineOffset = useRef(new Animated.Value(- progressLineLenght / totalLenght)).current;

    const exitButton = () => {

        
        Animated.spring(interpolatedValueForX, {
            toValue: 360,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();
    
    
        setTimeout(() => {
    
            navigation.navigate('Main');
        }, 1500)
    }

    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
    };
    


    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })

    useEffect(() => {
        const unsubscribe = Animated.timing(lineOffset, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        return unsubscribe;
        
    }, [])

  return (
    <View style={styles.mainContainer}>
        <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
            <TouchableOpacity onPress={() => exitButton()}>
                <Image style={{...styles.iconX}} source={require('../../../../assets/close.png')} />

            </TouchableOpacity>
        </Animated.View>
        <Image style={{...styles.flagIcon}} source={require('../../../../assets/finish-flag.png')} />

        <View style={styles.progressLine}>
            {progresLenght === latestScreen && !comeBack ? null : <View style={{...styles.progressTotal, width: progressLineLenght / totalLenght * latestScreen }}></View>}
            
            <Animated.View style={{...styles.progress, width: progressLineLenght * progresLenght / totalLenght, transform: [{translateX: lineOffset}] }}></Animated.View>
        </View>

    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        height: 80,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5
    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'black'
    },
    iconXContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: 25,
        bottom: 10
    },
    flagIcon: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 50,
        bottom: 10
    },
    progressLine: {
        height: 10,
        width: progressLineLenght,
        marginBottom: 17.5,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        overflow: 'hidden'
    },
    progress: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cf5eff'
    },
    progressTotal: {
        position: 'absolute',
        height: 10,
        borderRadius: 5,
        backgroundColor: '#cf5eff',
        opacity: 0.4
    }
})