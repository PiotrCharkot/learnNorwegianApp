import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

const GradientButton = (params) => {

    let imgPath = require('../../../assets/login.png');
    
    if (params.path === 'tick') {
        imgPath = require('../../../assets/tick.png');
    } else if (params.path === 'register') {
        imgPath = require('../../../assets/registration.png');
    } else if (params.path === 'forgot') {
        imgPath = require('../../../assets/lock-question.png');
    } else if (params.path === 'next') {
        imgPath = require('../../../assets/next.png');
    } else if (params.path === 'previous') {
        imgPath = require('../../../assets/previous.png');
    } else if (params.path === 'wordUp') {
        imgPath = require('../../../assets/arrow-up.png');
    } else if (params.path === 'wordDown') {
        imgPath = require('../../../assets/arrow-down.png');
    } else if (params.path === 'results') {
        imgPath = require('../../../assets/results.png');
    } else if (params.path === 'home') {
        imgPath = require('../../../assets/home.png');
    }


  return (
    <View style={{
        ...styles.buttonContainer, 
        height: params.height, 
        width: params.width,
        borderTopRightRadius: params.borderTopRightRadius,
        borderTopLeftRadius: params.borderTopLeftRadius,
        borderBottomRightRadius: params.borderBottomRightRadius,
        borderBottomLeftRadius: params.borderBottomLeftRadius,
        overflow: 'hidden'
        }}>
      <LinearGradient style={styles.gradientContainer} colors={[params.colorA, params.colorB]} 
        start={params.startGradient}
        end={params.endGradient}>
      
        <TouchableOpacity style={{...styles.opacity, paddingLeft: params.paddingLeft ? params.paddingLeft : 0, justifyContent: params.justify ? params.justify : 'center'}} onPress={() => params.callbackFunc()}>
            <Image style={{ height: params.heightIcon, width: params.widthIcon, tintColor: params.colorIcon ? params.colorIcon : null, marginRight: params.marginR ? params.marginR : 0}} source={imgPath} />
            {params.noText ? null : <Text style={{...styles.text, color: params.colorText, fontSize: params.fontSize ? params.fontSize : 11}}>{params.text}</Text>}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    gradientContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    }, 
    opacity: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    text: {

    }
})


export default GradientButton