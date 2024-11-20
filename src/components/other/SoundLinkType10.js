import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { Audio } from "expo-av";



const SoundLinkType10 = (item) => {
    
    
    const playWordSound = async () => {
        
        const { sound: playbackObject } = await Audio.Sound.createAsync(
            { uri: item.dataParams.item.soundLinkForAnswers },
            { shouldPlay: true }
          );
    }

  return (
    <View style={styles.mainContainer}>

        <TouchableOpacity style={styles.iconContainer}  onPress={playWordSound}>
            <Text style={styles.textAnswers}>{item.dataParams.item.norWordForSounds}</Text>
            <Image style={styles.iconSoundImg} source={require('../../../assets/wordSound.png')} />
        </TouchableOpacity>
    </View>
  )
}

export default SoundLinkType10

 

const styles = StyleSheet.create({
    mainContainer: {
      marginBottom: 5,
    },
    textAnswers: {
        fontWeight: '600'
    },
    iconContainer: {
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

