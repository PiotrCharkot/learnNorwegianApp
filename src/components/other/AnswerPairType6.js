import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { Audio } from "expo-av";
import AnswerPairType4 from './AnswerPairType4';



const AnswerPairType6 = (item) => {
    
    
    const playWordSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: item.dataParams.item.links },
            { shouldPlay: true }
          );
    }

  return (
    <View style={styles.mainContainer}>

        <TouchableOpacity style={styles.iconContainer}  onPress={playWordSound}>
            <Text style={styles.textAnswers}>{item.dataParams.item.answerData.map((element, index, arr) => index === arr.length - 1 ? element : element + ' / ')} - {item.dataParams.item.translationData}</Text>
            <Image style={styles.iconSoundImg} source={require('../../../assets/wordSound.png')} />
        </TouchableOpacity>
    </View>
  )
}

export default AnswerPairType6

 

const styles = StyleSheet.create({
    mainContainer: {
      marginBottom: 5,
    },
    textAnswers: {
        fontWeight: '600'
    },
    iconContainer: {
        paddingRight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9b4fa',
        borderRadius: 5,
        paddingLeft: 5
    },
    iconSoundImg: {
        height: 25,
        width: 25,
        marginVertical: 5,
        marginLeft: 20,
        tintColor: 'white',
    },
})

