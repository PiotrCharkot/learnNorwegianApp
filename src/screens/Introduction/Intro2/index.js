import { View, Text, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";

const Intro2 = () => {


    const navigation = useNavigation();

    


  return (
    <View style={styles.mainContainer}>

        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Flashcards</Text>
        </Animated.View>


        

        <Animated.View style={{...styles.buttonContainer, opacity: opacityText3}}>
            <TouchableOpacity>

                <Image source={require('../../../../assets/arrow-right.png')} style={styles.iconImg}/>
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
        textAlign: 'justify'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 100,
        right: 0,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        height: 50,
        width: 50,
        tintColor: '#3F00FF'
    },
})