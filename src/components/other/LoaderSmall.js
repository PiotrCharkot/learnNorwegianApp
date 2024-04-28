import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'


const screenWidth = Dimensions.get('window').width


const LoaderSmall = () => {


    const positionCircle1 = useRef(new Animated.Value(-50)).current;
    const positionCircle2 = useRef(new Animated.Value(-50)).current;
    const positionCircle3 = useRef(new Animated.Value(-50)).current;
    const opacityCircle1 = useRef(new Animated.Value(0)).current;
    const opacityCircle2 = useRef(new Animated.Value(0)).current;
    const opacityCircle3 = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(opacityCircle1, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityCircle1, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(positionCircle1, {
                    toValue: 50,
                    duration: 1000,
                    delay: 500,
                    useNativeDriver: true
                })
            ])
            , {
                useNativeDriver: true,
                isInteraction: false,
                iterations: 10
            }
        ).start()
        
        setTimeout(() => {
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(opacityCircle2, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityCircle2, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.timing(positionCircle2, {
                        toValue: 50,
                        duration: 1000,
                        delay: 500,
                        useNativeDriver: true
                    })
                ])
                , {
                    useNativeDriver: true,
                    isInteraction: false,
                    iterations: 10
                }
            ).start()
        }, 666);

        setTimeout(() => {
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(opacityCircle3, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityCircle3, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.timing(positionCircle3, {
                        toValue: 50,
                        duration: 1000,
                        delay: 500,
                        useNativeDriver: true
                    })
                ])
                , {
                    useNativeDriver: true,
                    isInteraction: false,
                    iterations: 10
                }
            ).start()
        }, 1333);
    }, [])
    

  return (
    <View style={styles.mainContainer}>
        <Animated.View style={{...styles.circle, opacity: opacityCircle1, transform: [{translateX: positionCircle1}]}}></Animated.View>
        <Animated.View style={{...styles.circle, opacity: opacityCircle2, transform: [{translateX: positionCircle2}]}}></Animated.View>
        <Animated.View style={{...styles.circle, opacity: opacityCircle3, transform: [{translateX: positionCircle3}]}}></Animated.View>
      
    </View>
  )
}

export default LoaderSmall



const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: screenWidth * 0.35 + 110,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    circle: {
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})