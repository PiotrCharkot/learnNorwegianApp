import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;


const AnswerButton = (params) => {

    const [opacityButton, setOpacityButton] = useState(0.6);

    const answerButtonCallback = () => {
        opacityButton < 1 ? setOpacityButton(1) : setOpacityButton(0.6);
        opacityButton < 1 ? params.returnAnswer(true) : params.returnAnswer(false); 
    }


  return (
    <TouchableOpacity onPress={answerButtonCallback}>
        <LinearGradient colors={ params.colors ? params.colors : ['#6d28ed', '#b829e3']} style={{...styles.mainContainer, opacity: opacityButton}}>
            <Text style={styles.text}>{params.text}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default AnswerButton;

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: screenWidth - 40,
        marginBottom: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 16
    }
})