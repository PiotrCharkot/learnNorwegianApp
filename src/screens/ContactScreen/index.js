import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;


const ContactScreen = ({route}) => {
        
    

    const navigation = useNavigation();


    const interpolatedValueForX = useRef(new Animated.Value(0)).current;



    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })



    const getTransform = (viewHeight, viewWidth, transValA, transValB, valX, valY) => {
        let transform = {
            transform: [{ perspective: 400 }, transValA, transValB],
        };
        return withAnchorPoint(transform, { x: valX, y: valY }, { width: viewWidth * 1.5, height: viewHeight * 1.5 });
      };
    
      const exitButton = () => {
    
        Animated.spring(interpolatedValueForX, {
            toValue: 360,
            speed: 1,
            bounciness: 12,
            useNativeDriver: true,
        }).start();
    
        setTimeout(() => {
    
            navigation.navigate('Settings', {choosenLanguage: route.params.choosenLanguage});
        }, 800)
    }


    return(
        <View style={styles.mainContainer}>

            <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={() => exitButton()}>
                    <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

                </TouchableOpacity>
            </Animated.View>


            <ScrollView style={styles.textContainer}>
                <Text style={styles.text}>
                    
<Text style={styles.titleText}>Contact Us</Text> {'\n\n\n'}

<Text style={styles.subtitleText}>We’re Here to Help!</Text>{'\n\n'}

Have questions, feedback, or need assistance? Reach out to us, and we'll ensure your language learning journey is smooth and enjoyable. Here’s how you can contact us:{'\n\n'}

<Text style={styles.subtitleText}>Email Us</Text>{'\n\n'}
<Text style={styles.textCursive}>Support: support@learnnorwegianapp.com</Text> - Get help with any issues or questions. Send us your feedback, suggestions, and ideas.{'\n\n'}
<Text style={styles.subtitleText}>Follow Us</Text>{'\n\n'}
{/* <Text style={styles.textCursive}>Facebook</Text>: Facebook.com/AppName{'\n'}
<Text style={styles.textCursive}>Twitter</Text>: @AppName{'\n'} */}
<Text style={styles.textCursive}>Instagram: @learnnorwegiannow{'\n\n'}</Text>
<Text style={styles.subtitleText}>Frequently Asked Questions</Text>{'\n\n'}
For quick answers, check out our FAQ section on our website: <Text style={styles.textCursive}>www.learnnorwegianapp.com/faq</Text>{'\n\n'}
We look forward to hearing from you and are eager to help you make the most of <Text style={styles.textCursive}>Learn Norwegian</Text>. Whether you have a question, a problem, or just want to share your experiences, don't hesitate to get in touch!{'\n\n\n\n\n\n'}

</Text>
            </ScrollView>
        </View>
    )
}

export default ContactScreen

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'grey'
    },
    iconXContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 50,
        top: 50
    },
    textContainer: {
        width: '100%',
        marginTop: 100,
        paddingHorizontal: 20
    },
    titleText: {
        fontSize: 20,
        fontWeight: '700'
    },
    subtitleText: {
        fontSize: 16,
        fontWeight: '600',
    },
    text: {
        fontSize: 14,
    },
    textCursive: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '600'
    }
  
})