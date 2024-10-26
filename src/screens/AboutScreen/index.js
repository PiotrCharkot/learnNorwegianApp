import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;


const AboutScreen = ({route}) => {
        
    

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
                    
<Text style={styles.titleText}>About Learn Norwegian</Text>{'\n\n\n'}

<View style={styles.btnContainer}>

    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Intro1', {skipable: true, language: route.params.choosenLanguage, replayed: true})}>
        <Text style={styles.btnText}>Watch intro</Text>
    </TouchableOpacity>
</View>

{'\n\n\n'}
<Text style={styles.subtitleText}>Discover Language, Discover the World</Text>{'\n\n'}

Welcome to <Text style={styles.textCursive}>Learn Norwegian</Text>, the innovative mobile application launched in 2024, designed to revolutionize the way you learn Norwegian. Whether you are starting from scratch or looking to master the language, our app offers a comprehensive set of tools to help you achieve your goals. Available in multiple languages including English, German, Polish, Spanish, Ukrainian, Lithuanian, and Arabic, <Text style={styles.textCursive}>Learn Norwegian</Text> caters to a global audience, making language learning accessible to everyone.{'\n\n\n'}

<Text style={styles.subtitleText}>Our Approach</Text>{'\n\n'}
<Text style={styles.textCursive}>Diverse Learning Sections</Text>:{'\n\n'}
<Text style={styles.textCursive}>Learn Norwegian</Text> is structured into distinct sections, each tailored to different aspects of language learning:{'\n\n'}

<Text style={styles.textCursive}>Grammar Guide (English Only)</Text>:{'\n\n'}
Dive deep into the intricacies of Norwegian grammar with our exclusive English-only section. This part of the app provides step-by-step explanations of various grammatical concepts, helping you grasp complex rules with ease.{'\n\n'}
<Text style={styles.textCursive}>Interactive Exercises</Text>:{'\n\n'}
Sharpen your skills with a variety of interactive grammar exercises. Whether it's filling in the gaps, dragging and dropping words, choosing the correct answer from multiple choices, matching words, or sorting sentences you hear, our exercises make learning engaging and effective.{'\n\n'}
<Text style={styles.textCursive}>Flashcards for Fluency</Text>:{'\n\n'}
Build your vocabulary with our flashcard system, featuring Norwegian words and expressions across all difficulty levels from A1 to C2. Each card includes practical examples, audio pronunciations, and translations in your chosen language. Rate words, adjust frequency, create your own flashcards, or save and use flashcards shared by the community to enhance your learning experience.{'\n\n'}
<Text style={styles.textCursive}>Reading and Comprehension</Text>:{'\n\n'}
Improve your reading skills with texts tailored to various difficulty levels. Each reading material is accompanied by a list of useful expressions used within the text, with translations available in your selected language.{'\n\n\n'}
<Text style={styles.subtitleText}>Community and Rewards</Text>{'\n\n'}
<Text style={styles.textCursive}>Engage and Excel</Text>:{'\n\n'}
Join a community of learners and compete in our rankings. Earn points through activities like grammar exercises, reading, or using flashcards. Track your progress with daily streaks by earning a minimum of 200 points a day, and see how you stack up in our weekly and all-time rankings.{'\n\n\n'}

<Text style={styles.subtitleText}>Continuous Improvement</Text>{'\n\n'}
Our commitment to enhancing your learning experience is reflected in our constant updates. We continuously add, change, and improve content within <Text style={styles.textCursive}>Learn Norwegian</Text> to keep the learning process dynamic and up-to-date.{'\n\n\n'}

<Text style={styles.subtitleText}>Get Started Today!</Text>{'\n\n'}
Create your account, customize your profile with your username and picture, and embark on your language learning journey with <Text style={styles.textCursive}>Learn Norwegian</Text>. Discover the joy of learning Norwegian and unlock new opportunities.{'\n\n'}

For any inquiries or feedback, please contact us at: <Text style={styles.textCursive}>support@learnnorwegianapp.com</Text>{'\n\n\n\n\n\n'}

</Text>
            </ScrollView>
        </View>
    )
}

export default AboutScreen

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
        paddingHorizontal: 20,
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
    },
    btnContainer: {
        width: screenWidth - 40,
        alignItems: 'center',
    },
    btn: {
        width: screenWidth - 80,
        height: 44,
        borderRadius: 22,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    btnText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'white'
    }
    
})