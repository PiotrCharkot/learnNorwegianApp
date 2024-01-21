import { View, Text, Animated, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useRef } from 'react'
import * as SecureStore from 'expo-secure-store';
import styles from './style'
import textData from '../../listData/textData'
import { useNavigation } from "@react-navigation/native";
import { withAnchorPoint } from 'react-native-anchor-point';
import { ScrollView } from 'react-native';

const TextScreen = ({route}) => {


  const navigation = useNavigation();

    const smallTxt = 16;
    const mediumTxt = 20; 
    const largeTxt = 24;

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [expressions, setExpressions] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [darkMode, setDarkMode] = useState('0');

    const interpolatedValueForX = useRef(new Animated.Value(0)).current;

    const xPositionDeg = interpolatedValueForX.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "180deg"]
    })


    const scaleTextUp = () => {
      if (fontSize === 16) {
        setFontSize(mediumTxt)
        saveTxtSize('fontSize', '20')
      } else if ( fontSize === 20) {
        setFontSize(largeTxt)
        saveTxtSize('fontSize', '24')
      }
    }

    const scaleTextDown = () => {
      if (fontSize === 24) {
        setFontSize(mediumTxt)
        saveTxtSize('fontSize', '20')
      } else if ( fontSize === 20) {
        setFontSize(smallTxt)
        saveTxtSize('fontSize', '16')
      }
    }

    const switchDarkMode = () => {
      if (darkMode === '0') {
        setDarkMode('1');
        save('darkMode', '1')
      } else {
        setDarkMode('0')
        save('darkMode', '0')
      }
    }

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
  
          navigation.navigate('Reading');
      }, 800)
    }


    async function save(key, value) {
      await SecureStore.setItemAsync(key, value);
    }

    async function saveTxtSize(key, value) {
      await SecureStore.setItemAsync(key, value);
    }
    
    async function getValueFor(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log("Here's your value", result);
        setDarkMode(result)
      } else {
        console.log('No values stored under that key.');
      }
    }

    async function getValueForTxtSize(key) {
      let result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log("Here's your value", result);
        let tempNummer = parseInt(result)
        setFontSize(tempNummer)
      } else {
        console.log('No values stored under that key font.');
      }
    }

    useEffect(() => {


      getValueFor('darkMode');
      getValueForTxtSize('fontSize')
      textData.map(el => {
          if (el.textId === route.params.textId) {
              setTitle(el.title);
              setText(el.text)
              setExpressions(el.expressions);
          }
      })
    }, [])
  return (
    <View style={{...styles.mainContainer, backgroundColor: darkMode === '1' ? 'black' : 'white'}}>

        <View style={styles.head}>
        <View style={styles.symbolCont}>
          <TouchableOpacity onPress={scaleTextDown}>
            <Text style={{...styles.symbolTxt, color: darkMode === '1' ?  'white' : 'black'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={scaleTextUp}>
            <Text style={{...styles.symbolTxt, color: darkMode === '1' ?  'white' : 'black'}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={switchDarkMode}>
            <Image style={{...styles.bulbPic, tintColor: darkMode === '1' ? 'white' : 'black'}} source={require('../../../assets/lightbulb.png')} />
          </TouchableOpacity>
        </View>
    
          <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
            <TouchableOpacity onPress={() => exitButton()}>
                <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.body}>

          <ScrollView style={styles.textMainContainer}>
          <View style={styles.titleCont}>
            <Text style={{...styles.textTitle, color: darkMode === '1' ?  'white' : 'black'}}>{title}</Text>
          </View>
            <Text style={{...styles.textMain, color: darkMode === '1' ?  'white' : 'black', fontSize}}>{text}</Text>

            <Text style={{...styles.textTitle, color: darkMode === '1' ?  'white' : 'black'}}>Expressions:</Text>

            <Text style={{...styles.textExpressions, color: darkMode === '1' ?  'white' : 'black', fontSize}}>{expressions}</Text>
          </ScrollView>
        </View>
    </View>
  )
}

export default TextScreen