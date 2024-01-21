import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const CardExerciseList = (params) => {
    
    const { language, title } = params;
    
    const navigation = useNavigation();

    
  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => navigation.navigate(params.link, {savedLang: language})}>
        <View style={styles.innerContainer}>
            <LinearGradient colors={[ '#6BE68E', '#38663C']} style={styles.gradient} >

            <Text style={styles.textTitle}>{title
            }</Text>
            <Text style={styles.textDescription}>{params.description}</Text>
            
      

            </LinearGradient>
        </View>
        
        <View style={{...styles.offsetSquare, backgroundColor: 'transparent'}}>

            {params.showPro ? <View style={{ ...styles.proView, backgroundColor: 'transparent', transform: [{rotate: '-30deg'}] }}>
            <Text style={styles.textPro}>PRO</Text>
            
        </View> : <View>
        <Text style={styles.textLevel}>{params.level}</Text>
            </View>}
        
        </View>
    </TouchableOpacity>
  )
}

export default CardExerciseList


const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 10,
        height: screenWidth * 0.35,
        width: screenWidth * 0.6,
        borderRadius: 18,
        backgroundColor: '#051E22',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: -5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 5
    },
    innerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: screenWidth * 0.35,
        width: screenWidth * 0.6,
        borderWidth: 0,
        borderColor: 'white',
        backgroundColor: '#68d2d4',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 18,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 70,
        overflow: 'hidden'
    },
    gradient: {
        height: '100%',
        width: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 18,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 70,
    },
    offsetSquare: {
        position: 'absolute',
        bottom: -20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenWidth * 0.2,
        width: screenWidth * 0.2,
        backgroundColor: '#c9ebf0',
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: '50%',
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: -5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4.5,
        elevation: 5
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        shadowColor: 'black',
        shadowOffset: {
            width: -1,
            height: -1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4.5,
        elevation: 5
    },
    textDescription: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    textLevel: {
        color: '#68d2d4',
        fontSize: 22,
        fontWeight: '900'
    },
    textPro: {
        color: '#68d2d4',
        fontSize: 20,
        fontWeight: '800'
    },
    proView: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
    },
})
