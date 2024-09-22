import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;


const PrivacyScreen = ({route}) => {
        
    

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
                    
<Text style={styles.titleText}>Privacy Policy</Text>{'\n\n\n'}
<Text style={styles.subtitleText}>Effective Date: 06.22.2024</Text>{'\n\n'}

Welcome to <Text style={styles.textCursive}>Learn Norwegian</Text>, the mobile application designed to help you learn the Norwegian language. Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy explains how <Text style={styles.textCursive}>Norsk Navigator ("we", "us", or "our")</Text>  collects, uses, discloses, and safeguards your information when you use our app.{'\n\n\n'}

<Text style={styles.subtitleText}>1. Information Collection</Text>{'\n\n'}
We collect information in the following ways:{'\n\n'}

<Text style={styles.textCursive}>Information You Provide</Text>: This includes information necessary to enhance your experience, such as creating an account, subscribing to our service, participating in our community, or when you contact us directly.{'\n\n'}
<Text style={styles.textCursive}>Device Information</Text>: We may collect information about the device you use to access our app, including the hardware model, operating system version, unique device identifiers, and mobile network information.{'\n\n'}
<Text style={styles.textCursive}>Usage Data</Text>: Information on how you use our app, such as the features accessed, the time spent on the app, and other statistics.{'\n\n'}
<Text style={styles.textCursive}>User Content</Text>: Information included in the flashcards you create, the profile pictures you upload, and any other user-generated content.{'\n\n\n'}


<Text style={styles.subtitleText}>2. Use of Information</Text>{'\n\n'}
The information we collect is used to:{'\n\n'}

- provide, maintain, and improve our services.{'\n'}
- develop new features and services.{'\n'}
- personalize the app experience.{'\n'}
- communicate with you, including sending notices, updates, security alerts, and support messages.{'\n'}
- monitor and analyze trends and usage.{'\n'}
- enforce our Terms of Service, including combating fraud and abuse.{'\n\n\n'}


<Text style={styles.subtitleText}>3. Sharing of Information</Text>{'\n\n'}
We may share information as follows:{'\n\n'}

<Text style={styles.textCursive}>With Service Providers</Text>: We may share information with third-party vendors and service providers that perform services on our behalf, such as hosting, data analysis, and customer service.{'\n\n'}
<Text style={styles.textCursive}>Legal Requirements</Text>: We may disclose information if required to do so by law or in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend our rights or property, protect the safety of our users or the public, or to prevent or stop any illegal, unethical, or legally actionable activity.{'\n\n'}
<Text style={styles.textCursive}>Business Transfers</Text>: In the event of a merger, acquisition, or asset sale, your information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy.{'\n\n\n'}

<Text style={styles.subtitleText}>4. Your Rights</Text>{'\n\n'}
You have certain rights regarding the personal information we hold about you. These may include the right to request access, correction, or deletion of your personal information. You can typically manage your information directly within your account settings or by contacting us directly.{'\n\n\n'}

<Text style={styles.subtitleText}>5. Security</Text>{'\n\n'}
We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.{'\n\n\n'}

<Text style={styles.subtitleText}>6. International Data Transfers</Text>{'\n\n'}
Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.{'\n\n\n'}

<Text style={styles.subtitleText}>7. Changes to This Privacy Policy</Text>{'\n\n'}
We may update this Privacy Policy from time to time. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.{'\n\n\n'}

<Text style={styles.subtitleText}>8. Contact Us</Text>{'\n\n'}
If you have any questions about this Privacy Policy, please contact us at: <Text style={styles.textCursive}>support@learnnorwegianapp.com</Text>{'\n\n\n\n\n\n'}

</Text>
            </ScrollView>
        </View>
    )
}

export default PrivacyScreen

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