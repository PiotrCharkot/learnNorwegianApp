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
                <Text style={styles.text}>Terms and Conditions
Last updated: [Insert Date]

Welcome to [App Name], the mobile application designed to help you learn the Norwegian language efficiently and effectively. By accessing or using our app, you agree to be bound by the terms and conditions set forth below. If you do not agree with any part of these terms, you should not use this app.

1. Eligibility
This app is intended for use by individuals aged 13 and above. By using [App Name], you represent and warrant that you are of legal age to form a binding contract and meet all of the foregoing eligibility requirements. If you do not meet these requirements, you must not access or use the app.

2. Account Registration
To access some features of the app, you must register for an account. When registering, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.

3. Free Trial
[App Name] offers a one-week free trial to new users. During the free trial period, you will have full access to the app's features without charge. You must cancel your trial before it ends to avoid charges. If you do not cancel, your subscription will automatically renew into a paid monthly subscription.

4. Subscription and Payment
After the free trial period, [App Name] requires a paid subscription to continue access. Subscriptions are billed on a monthly basis and will automatically renew each month on the date of the initial subscription. You can cancel your subscription at any time before the next billing cycle to avoid future charges. All payments made are non-refundable.

5. Intellectual Property
All rights, title, and interest in and to [App Name] (including any and all intellectual property) are and will remain the exclusive property of [Your Company Name] and its licensors. The terms do not grant you any rights to use any branding or logos used in our Services.

6. Termination
We may terminate or suspend your account and bar access to the app immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.

7. Changes to Terms
We reserve the right, at our sole discretion, to modify or replace these terms at any time. What constitutes a material change will be determined at our sole discretion. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our app after those revisions become effective, you agree to be bound by the revised terms.

8. Contact Us
If you have any questions about these Terms, please contact us at [Your Contact Information].</Text>
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
        backgroundColor: 'pink',
        width: '100%',
        marginTop: 100,
        paddingHorizontal: 20
    }
  
})