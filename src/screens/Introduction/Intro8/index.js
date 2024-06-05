import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Intro8 = () => {

    const navigation = useNavigation();


    const opacityTitle = useRef(new Animated.Value(0)).current;

    
    const opacityLangList = useRef(new Animated.Value(0)).current;
    




    const runAnimation = () => {

        Animated.timing(opacityTitle, {
            duration: 1500,
            delay: 500,     
            toValue: 1,
            useNativeDriver: true
        }).start();


        Animated.timing(opacityLangList, {
            duration: 1500,
            delay: 1500,     
            toValue: 1,
            useNativeDriver: true
        }).start();



    };



    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }



    const changeLanguage = (language) => {


        if (language !== null) {
          
          save('language', language);
    
        }



        Animated.timing(opacityTitle, {
            duration: 1500,
            delay: 200,     
            toValue: 0,
            useNativeDriver: true
        }).start();


        Animated.timing(opacityLangList, {
            duration: 1500,
            delay: 200,     
            toValue: 0,
            useNativeDriver: true
        }).start();



        setTimeout(() => {
            navigation.replace("Main");
        }, 1800);
        
        
    }
    

    

    useEffect(() => {

        runAnimation();
      

    }, [])
    


  return (
    <Animated.View style={styles.mainContainer}>

        





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Choose your language</Text>
        </Animated.View>


        <Animated.View style={{...styles.langListContainer, opacity: opacityLangList}}>

            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('EN')}>
                <Image source={require('../../../../assets/flags/united-kingdom.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>English</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('DE')}>
                <Image source={require('../../../../assets/flags/german.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>Deutsch</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('PL')}>
                <Image source={require('../../../../assets/flags/poland.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>Polski</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('LT')}>
                <Image source={require('../../../../assets/flags/lithuania.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>Lietuvių</Text>

            </TouchableOpacity>


            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('UA')}>
                <Image source={require('../../../../assets/flags/ukraine.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>Українська</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('ES')}>
                <Image source={require('../../../../assets/flags/spain.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>Español</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.btn} onPress={() => changeLanguage('AR')}>
                <Image source={require('../../../../assets/flags/arabic.png')} style={styles.flagImg}/>

                <Text style={styles.textInBtn}>العربية</Text>

            </TouchableOpacity>
        </Animated.View>


       




        
        
    </Animated.View>
  )
}

export default Intro8


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 80
        
    },
    titleText: {
        fontSize: 25,
        fontWeight: '450',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    langListContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#d4eafc',
        width: '70%',
        marginBottom: 14,
        paddingVertical: 6,
        borderRadius: 13,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#9fd2fc'
    },
    flagImg: {
        height: 25,
        width: 25,
        marginHorizontal: 6
    },
    textInBtn: {
        fontSize: 16
    }
    
   
})