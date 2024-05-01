import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;


const TermsScreen = ({route}) => {
        
    

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
                <TouchableOpacity onPress={() => exitButton()}>
                    <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

                </TouchableOpacity>
            </Animated.View>


            <ScrollView style={styles.textContainer}>
                <Text style={styles.text}>
                    
<Text style={styles.titleText}>Terms and Conditions</Text>{'\n\n\n'}

<Text style={styles.subtitleText}>Last updated: [Insert Date]</Text>{'\n\n'}

Welcome to <Text style={styles.textCursive}>[App Name]</Text>, the mobile application designed to help you learn the Norwegian language efficiently and effectively. By accessing or using our app, you agree to be bound by the terms and conditions set forth below. If you do not agree with any part of these terms, you should not use this app.{'\n\n\n'}

<Text style={styles.subtitleText}>1. Eligibility</Text>{'\n\n'}
This app is intended for use by individuals aged 13 and above. By using <Text style={styles.textCursive}>[App Name]</Text>, you represent and warrant that you are of legal age to form a binding contract and meet all of the foregoing eligibility requirements. If you do not meet these requirements, you must not access or use the app.{'\n\n\n'}

<Text style={styles.subtitleText}>2. Account Registration</Text>{'\n\n'}
While you can access some features of <Text style={styles.textCursive}>[App Name]</Text> without creating an account, registration is required to access the full capabilities, including the PRO version features after your free trial period ends. When registering, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.{'\n\n\n'}

<Text style={styles.subtitleText}>3. Free Trial</Text>{'\n\n'}
[App Name] offers a one-week free trial to new users. During the free trial period, you will have full access to the app's features without charge. After the trial period ends, you will lose access unless you register an account and upgrade to the PRO version by purchasing a monthly subscription, which can be canceled at any time.{'\n\n\n'}

<Text style={styles.subtitleText}>4. Subscription and Payment</Text>{'\n\n'}
To continue using the full features of <Text style={styles.textCursive}>[App Name]</Text> after the trial period, you must purchase a monthly subscription to the PRO version. Subscriptions are billed monthly and will automatically renew each month on the date of the initial subscription unless canceled. All payments made are non-refundable.{'\n\n\n'}

<Text style={styles.subtitleText}>5. User-Generated Content</Text>{'\n\n'}
<Text style={styles.textCursive}>Flashcards</Text>: Users may create and share their own flashcards with others. It is important that these flashcards do not contain any inappropriate or offensive language.{'\n\n'}
<Text style={styles.textCursive}>Profile Pictures</Text>: Users can upload profile pictures that may be visible to other users. It is crucial that these pictures do not include inappropriate or provocative content.{'\n\n'}
<Text style={styles.textCursive}>Usernames</Text>: Users may choose their usernames. These usernames must not include inappropriate or provocative words.{'\n\n\n'}

<Text style={styles.subtitleText}>6. Intellectual Property</Text>{'\n\n'}
All rights, title, and interest in and to <Text style={styles.textCursive}>[App Name]</Text> (including any and all intellectual property) are and will remain the exclusive property of <Text style={styles.textCursive}>[Your Company Name]</Text> and its licensors. The terms do not grant you any rights to use any branding or logos used in our Services.{'\n\n\n'}

<Text style={styles.subtitleText}>7. Termination</Text>{'\n\n'}
We may terminate or suspend your account and bar access to the app immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.{'\n\n\n'}

<Text style={styles.subtitleText}>8. Changes to Terms</Text>{'\n\n'}
We reserve the right, at our sole discretion, to modify or replace these terms at any time. What constitutes a material change will be determined at our sole discretion. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our app after those revisions become effective, you agree to be bound by the revised terms.{'\n\n\n'}

<Text style={styles.subtitleText}>9. Contact Us</Text>{'\n\n'}
If you have any questions about these Terms, please contact us at <Text style={styles.textCursive}>[Your Contact Information]</Text>.{'\n\n\n\n\n\n'}</Text>
            </ScrollView>
        </View>
    )
}

export default TermsScreen

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
    }
  
})