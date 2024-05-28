import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CardOwn = (params) => {

    const navigation = useNavigation();

    const [btnEdit, setBtnEdit] = useState('Edit list');
    const [btnTest, setBtnTest] = useState('Test');


    useEffect(() => {

        if (params.choosenLang === 'PL') {
            setBtnEdit('Edytuj listę');
            setBtnTest('Test');
        } else if (params.choosenLang === 'DE') {
            setBtnEdit('Liste bearbeiten');
            setBtnTest('Test');
        } else if (params.choosenLang === 'LT') {
            setBtnEdit('Redaguoti sąrašą');
            setBtnTest('Testas');
        } else if (params.choosenLang === 'AR') {
            setBtnEdit('تعديل القائمة');
            setBtnTest('اختبار');
        } else if (params.choosenLang === 'UA') {
            setBtnEdit('Редагувати список');
            setBtnTest('Тест');
        } else if (params.choosenLang === 'ES') {
            setBtnEdit('Editar lista');
            setBtnTest('Prueba');
        }
  
      }, [])

    const pressTest = () => {
        navigation.navigate('TestWord', {refToList: params.listReference, userId: params.userId, savedLang: 'EN', own: true, myTitle: params.title, userLangOwnCard: params.choosenLang})
    }
    
    const editList = () => {
        console.log('ref in card', params.listReference);
        
        navigation.navigate({
            name: 'EditList',
            params: {userReference: params.userId, refToList: params.listReference, choosenLang: params.choosenLang}
        })
    }
    
  return (
    <View style={styles.mainContainer}>
        
        <View style={styles.bigCircle}>
            <View style={styles.smallCircle}>
                <Text style={styles.textTitle}>{params.title}</Text>
                <Text style={styles.textLang}>{params.lang}</Text>
                <Text style={styles.textLang}></Text>
                
            </View>
        </View>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity style={styles.touchableEdit}> 
        <Text style={styles.touchableEditText} onPress={editList}>{btnEdit}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableTest} onPress={pressTest}> 
        <Text style={styles.touchableTestText}>{btnTest}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CardOwn


const styles = StyleSheet.create({
    mainContainer: {
        height: screenWidth * 0.5,
        width: screenWidth * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 30,
        marginBottom: 20,
        overflow: 'hidden'
    },
    bigCircle: {
        height: screenWidth * 0.8,
        width: screenWidth * 0.8,
        backgroundColor: 'red',
        borderRadius: screenWidth * 0.8 / 2,
        transform: [{translateX: -screenWidth * 0.2}]
    },
    smallCircle: {
        height: screenWidth * 0.8,
        width: screenWidth * 0.8,
        backgroundColor: '#282e38',
        borderRadius: screenWidth * 0.8 / 2,
        transform: [{translateX: -screenWidth * 0.05}, {translateY: screenWidth * 0.05}],
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingLeft: screenWidth * 0.3
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'right'
    },
    textLang: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right'
    },
    touchableEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        bottom: 10,
        left: 30,
        borderWidth: 1,
        borderColor: 'white'
    },
    touchableEditText: {
        color: 'white',
        fontSize: 12
    },
    touchableTest: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 70,
        borderRadius: 5,
        bottom: 10,
        right: 25,
        borderWidth: 1.5,
        borderColor: '#282e38'
    },
    touchableTestText: {
        color: '#282e38',
        fontWeight: '500',
        fontSize: 12
    },
   
});