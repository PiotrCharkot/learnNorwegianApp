import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import generalStyles from '../../styles/generalStyles';

const screenWidth = Dimensions.get('window').width;


const AnswerButtonSmall = (params) => {

    const [opacityButton, setOpacityButton] = useState(0.6);

    const answerButtonCallback = () => {
        opacityButton < 1 ? setOpacityButton(1) : setOpacityButton(0.6);
        opacityButton < 1 ? params.returnAnswer(true) : params.returnAnswer(false); 
    }


  return (
    <TouchableOpacity onPress={answerButtonCallback}>
        <LinearGradient colors={[generalStyles.gradientTopDraggable3, generalStyles.gradientBottomDraggable3]} style={{...styles.mainContainer, opacity: opacityButton}}>
            <Text style={styles.text}>{params.text}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default AnswerButtonSmall;

const styles = StyleSheet.create({
    mainContainer: {
        height: 25,
        width: screenWidth / 2 - 40,
        marginBottom: 10,
        marginRight: 10,
        paddingLeft: 5,
        justifyContent: 'center',
        borderRadius: 5
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    }
})