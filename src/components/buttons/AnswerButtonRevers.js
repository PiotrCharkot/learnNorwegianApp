import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;


const AnswerButtonRev = (params) => {

    const [opacityButton, setOpacityButton] = useState(1);

    const answerButtonCallback = () => {
        opacityButton > 0.65 ? setOpacityButton(0.65) : setOpacityButton(1);
        opacityButton > 0.65 ? params.returnAnswer(true) : params.returnAnswer(false); 
    }


  return (
    <TouchableOpacity onPress={answerButtonCallback}>
        <LinearGradient colors={ params.colors ? params.colors : ['#6d28ed', '#b829e3']} style={{...styles.mainContainer, opacity: opacityButton}}>
            <Text style={{...styles.text, textAlign: params.savedLang === 'AR' ? 'right' : 'left'}}>{params.text}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default AnswerButtonRev;

const styles = StyleSheet.create({
    mainContainer: {
        height: 50,
        width: screenWidth - 40,
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 16
    }
})