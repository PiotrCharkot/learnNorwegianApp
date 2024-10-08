import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, {memo} from 'react'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const transparent = 'rgba(255,255,255,0)';
const isWideScreen = screenWidth > 550


const CardBlack = (params) => {

    const navigation = useNavigation();


    const handlePress = () => {

        if (params.hasAccess || !params.requiresPro) {
            navigation.navigate(params.link, {savedLang: params.savedLang})
        } else {
            navigation.navigate({
                name: 'Paywall',
                params: {language: params.savedLang}
            })
        }
    }

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={handlePress}>
        <View style={styles.gradientWrap}>
            
            <LinearGradient colors={['black', '#252626']} style={styles.gradientBig}>
            <View style={{...styles.lightCircle, shadowColor: params.color3}}></View>
                <View style={styles.innerContainer}>


                    

                    <View style={styles.middleContainer}>

                        <LinearGradient colors={['#252626', 'black']} style={styles.gradient} >

                        
                        <View style={styles.whiteLine}>
                            <LinearGradient colors={['#252626', params.color3, '#252626']} style={styles.gradient} />
                        </View>

                            <View style={styles.titleContainer}>
                                <Text style={{...styles.textTitle, shadowColor: params.color3}} allowFontScaling={false}>{params.title}</Text>
                                <Text style={styles.textDescription} allowFontScaling={false}>{params.description}</Text>
                            </View>


                            

                            
                            <View style={styles.reindeerContainer}>
                                <Image style={{...styles.reindeerPikto, tintColor: params.stars > 0 ? '#faf739' : '#252626'}} source={require('../../../assets/reindeerPikto.png')} />
                                <Image style={{...styles.reindeerPikto, tintColor: params.stars > 1 ? '#faf739' : '#252626'}} source={require('../../../assets/reindeerPikto.png')} />
                                <Image style={{...styles.reindeerPikto, tintColor: params.stars > 2 ? '#faf739' : '#252626'}} source={require('../../../assets/reindeerPikto.png')} />
                                <Image style={{...styles.reindeerPikto, tintColor: params.stars > 3 ? '#faf739' : '#252626'}} source={require('../../../assets/reindeerPikto.png')} />
                                <Image style={{...styles.reindeerPikto, tintColor: params.stars > 4 ? '#faf739' : '#252626'}} source={require('../../../assets/reindeerPikto.png')} />
                                
                            </View>


                            


                        <View style={styles.whiteLine}>
                            <LinearGradient colors={['#252626', params.color3, '#252626']} style={styles.gradient} />
                        </View>
                        </LinearGradient>

                        {params.hasAccess || !params.requiresPro ? null : <View style={styles.proContainer}>
                            <Image style={styles.proLockImg} source={require('../../../assets/padlock2.png')} />
                            <Text style={styles.proText}>PRO</Text>
                        </View>}
                        


                    </View>
                </View>
            </LinearGradient>
       
        </View>
    </TouchableOpacity>
  )
}

export default memo(CardBlack)


const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 10,
        height: screenWidth * 0.35,
        width: screenWidth * 0.6,
        borderRadius: 18,
        backgroundColor: '#fafbfc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'yellow',
        shadowColor: 'black',
        shadowOffset: {
            width: -5,
            height: -5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.5,
        elevation: 5,
        
    },
    gradientWrap: {
        borderRadius: 18,
        overflow: 'hidden'
    },
    innerContainer: {
        height: screenWidth * 0.35,
        width: screenWidth * 0.6,
        alignItems: 'center'
    },
    middleContainer: {
        height: screenWidth * 0.35,
        width: screenWidth * 0.35 + 20,
        position: 'absolute',
        
    }, 
    gradient: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        
    },
    gradientBig: {
        alignItems: 'center',
    },
    whiteLine: {
        height: screenWidth * 0.35,
        width: 3,
        
    },
    lightCircle: {
        height: screenWidth * 0.35 + 20,
        position: 'absolute',
        width: screenWidth * 0.35 + 20,
        borderRadius:  screenWidth * 0.35 + 20 / 2,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 14.5,
        elevation: 5,
        
    },
    titleContainer: {
        width: screenWidth * 0.35 + 14,
        marginTop: 20,
        paddingHorizontal: 10,

    },
    textTitle: {
        color: 'white',
        fontSize: isWideScreen ? 30 : 15,
        fontWeight: '800',
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
        fontSize: isWideScreen ? 20 : 11,
        fontWeight: '500'
    },
    reindeerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reindeerPikto: {
        height: 25,
        width: 25,
        tintColor: '#faf739',
        
    },
    proContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 35,
        left: screenWidth * 0.35 - 40,
        transform: [{rotate: '-20deg'}]
    },
    proText: {
        fontSize: 20,
        color: '#4a4a4a',
        fontWeight: '900',
        opacity: 0.5
    },
    proLockImg: {
        height: 15,
        width: 15,
        tintColor: '#4a4a4a',
        opacity: 0.5
    }
})


//#7affff
//#fffa96
//#ff94f6
//#9cffa2
//#ffa6a6