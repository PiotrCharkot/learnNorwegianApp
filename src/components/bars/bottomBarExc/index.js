// import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native'
// import React, { useState, useEffect, useRef } from 'react'
// import { useFocusEffect } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
// import GradientButton from '../../buttons/GradientButton'

// const screenWidth = Dimensions.get('window').width;
// const iconColor = 'white';
// const screenBonus = 10;

// const imgLinks = [require('../../../../assets/reindeerSmile_NoBackground.png'), require('../../../../assets/reindeerSmile4_NoBackground.png')]



// const BottomBar = (params) => {


//     const navigation = useNavigation();

   
//     const correctMessagePosition = useRef(new Animated.Value(0)).current;
//     const correctImagePosition = useRef(new Animated.Value(0)).current;
//     const wrongMessagePosition = useRef(new Animated.Value(0)).current;

//     const correctAnswers = params.correctAnswers;
//     const [pathIcon, setPathIcon] = useState('next');
//     const [pathBackIcon, setPathBackIcon] = useState('previous');
//     const [buttonFunction, setButtonFunction] = useState(params.callbackButton);
//     const [currentPoints, setCurrentPoints] = useState(params.userPoints);
//     const [failedAnswer, setFaildAnswer] = useState(false);
//     const [imgLink, setImgLink] = useState(imgLinks[0]);
//     const [imgMargin, setImgMargin] = useState(0);
    

//     const goBack = () => {

//         if (params.questionScreen && pathIcon === 'next' && buttonFunction === 'goToNext' && params.currentScreen === params.latestScreen) {
//             setButtonFunction('checkAnswer');
//             setPathIcon('tick');

//             setCurrentPoints(() => {
//                 return failedAnswer ? params.userPoints - screenBonus : params.userPoints - screenBonus - params.answerBonus;
//             })

//             Animated.spring(correctMessagePosition, {
//                 toValue: 0,
//                 duration: 200,
//                 delay: 200,
//                 useNativeDriver: true
//             }).start();

//             Animated.spring(correctImagePosition, {
//                 toValue: 0,
//                 duration: 200,
//                 useNativeDriver: true
//             }).start();
//         } else {
//             navigation.navigate({
//                 name: params.linkPrevious,
//                 params: { latestScreen: params.latestScreen, userPoints: currentPoints },
//                 merge: true,
//             });
//         }
        
        
//     }

//     const changeIcon = () => {

//         if (params.userPoints > currentPoints) {
//             setCurrentPoints(params.userPoints)
//         }
//         if (params.currentScreen < params.latestScreen) {
//             setPathIcon('next')
//         }
        
//     }

//     const buttonAction = () => {
//         if (buttonFunction === 'checkAnswer' && params.currentScreen >= params.latestScreen ) {
            
//             let isCorrect = () => {
//                 let returnVal;
//                 for (let i = 0; i < correctAnswers.length; i++) {
//                     if (correctAnswers[i] === params.userAnswers[i]) {
//                         returnVal = true;
//                     } else {
//                         setFaildAnswer(true);
//                         return false;
//                     }
//                 }
                
//                 return returnVal;
//             }
            
//             if (isCorrect()) {
//                 setButtonFunction('goToNext');
//                 setPathIcon('next');
                
//                 Animated.spring(correctMessagePosition, {
//                     toValue: -170,
//                     duration: 200,
//                     useNativeDriver: true
//                 }).start();

//                 Animated.spring(correctImagePosition, {
//                     delay: 400,
//                     toValue: -220,
//                     duration: 200,
//                     bounciness: 7,
//                     useNativeDriver: true
//                 }).start();
                
//                 setCurrentPoints(() => {
//                     return failedAnswer ? params.userPoints + screenBonus : params.userPoints + screenBonus + params.answerBonus;
//                 })
//             } else {
//                 Animated.spring(wrongMessagePosition, {
//                     toValue: -170,
//                     duration: 200,
//                     useNativeDriver: true
//                 }).start()
//             }

//         } else if (buttonFunction === 'checkAllAnswers' && params.currentScreen >= params.latestScreen ) {
//             let returnArr = [];

//             for (let i = 0; i < correctAnswers.length; i++) {
//                 if (correctAnswers[i] === params.userAnswers[i]) {
//                     returnArr.push(true);
//                 } else {
//                     returnArr.push(false);
//                 }
//             }

//             params.checkAns(returnArr);

//             setButtonFunction('goToNext');
//             setPathIcon('next');
//         } else {
            
//             navigation.navigate(params.linkNext, {
//                 userPoints: currentPoints, latestScreen: params.latestScreen, comeBackRoute: params.comeBack 
//             })
//         }
        
//     }

//     useEffect(() => {
//         if (buttonFunction === 'checkAnswer' || buttonFunction === 'checkAllAnswers') {
//             setPathIcon('tick');
//             setImgLink(() => imgLinks[Math.floor(Math.random() * imgLinks.length)])
//             setImgMargin(() => Math.floor(Math.random() * 200))

//         }
//     }, [])

//     useFocusEffect(() => {
//         changeIcon();
//     })

//     useEffect(() => {
//         Animated.spring(wrongMessagePosition, {
//             toValue: 0,
//             duration: 200,
//             useNativeDriver: true
//         }).start()
//     }, [params.userAnswers])

    


//   return (
//     <View>
//         <Animated.View style={{...styles.imageContainer, transform: [{translateY: correctImagePosition }], marginLeft: imgMargin }}>

//             <Image style={styles.imageCorrect} source={imgLink} />
//         </Animated.View>
        
//         <Animated.View style={{...styles.wrongMessageContainer, transform: [{translateY: wrongMessagePosition}] }}>
//             <Text style={styles.textMessage}>Wrong Answer</Text>
//         </Animated.View>


//         <Animated.View style={{...styles.correctMessageContainer, transform: [{translateY: correctMessagePosition}] }}>
//             <Text style={styles.textMessage}>Correct Answer</Text>
//         </Animated.View>

//         <View style={styles.mainContainer}>

        
//             {params.isFirstScreen ? null : <View style={styles.buttonBackContainer}>
//                     <GradientButton 
//                     height={params.buttonHeight ? params.buttonHeight : 40} 
//                     width={params.buttonWidth ? params.buttonWidth : 40}
//                     colorA={'white'} 
//                     colorB={'#c256e3'} 
//                     callbackFunc={goBack} 
//                     path={pathBackIcon} 
//                     heightIcon={20} 
//                     widthIcon={20}
//                     colorIcon={iconColor}
//                     noText={params.noText}
//                     text={params.text}
//                     startGradient={[0.0, 0.0]}
//                     endGradient={[1.0, 1.0]}
//                     borderTopRightRadius={23} 
//                     borderBottomRightRadius={23} 
//                     borderTopLeftRadius={23} 
//                     borderBottomLeftRadius={23} />
//                 </View> }
            
//             <View style={styles.buttonContainer}>
//                 <GradientButton 
//                 height={params.buttonHeight ? params.buttonHeight : 40} 
//                 width={params.buttonWidth ? params.buttonWidth : 40}
//                 colorA={'white'} 
//                 colorB={'#c256e3'} 
//                 callbackFunc={buttonAction} 
//                 path={pathIcon} 
//                 heightIcon={20} 
//                 widthIcon={20}
//                 colorIcon={iconColor}
//                 noText={params.noText}
//                 text={params.text}
//                 startGradient={[0.0, 0.0]}
//                 endGradient={[1.0, 1.0]}
//                 borderTopRightRadius={23} 
//                 borderBottomRightRadius={23} 
//                 borderTopLeftRadius={23} 
//                 borderBottomLeftRadius={23} />
//             </View>

//         </View>
//     </View>
//   )
// }

// export default BottomBar

// const styles = StyleSheet.create({
//     mainContainer: {
//         position: 'absolute',
        
//         bottom: 0,
//         height: 100,
//         width: '100%',
//         backgroundColor: 'white',
//         shadowColor: 'black',
//         shadowOffset: {
//             width: 0,
//             height: -5,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4.5,
//         elevation: 5
//     },
//     buttonContainer: {
//         height: 25,
//         width: 25,
//         position: 'absolute',
//         left: screenWidth - 60,
//         top: 10,
//         shadowColor: 'black',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4.5,
//         elevation: 5
//     },
//     buttonBackContainer: {
//         height: 25,
//         width: 25,
//         position: 'absolute',
//         left: 20,
//         top: 10,
//         shadowColor: 'black',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4.5,
//         elevation: 5
//     },
//     correctMessageContainer: {
//         position: 'absolute',
//         width: '100%',
//         height: 70,
//         backgroundColor: '#cffadb',
//         justifyContent: 'center',
//         paddingLeft: 20,
//         borderTopWidth: 2,
//         borderTopColor: 'green'
        
//     },
//     wrongMessageContainer: {
//         position: 'absolute',
//         width: '100%',
//         height: 70,
//         backgroundColor: '#ffd4e1',
//         justifyContent: 'center',
//         paddingLeft: 20,
//         borderTopWidth: 2,
//         borderTopColor: 'red'
        
//     },
//     imageContainer: {
//         position: 'absolute',
//         width: 170,
//         height: 160,
//         top: -100,
//         backgroundColor: 'transparent',
//         justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'visible'
        
//     },
//     imageCorrect: {
//         height: 160,
//         width: '100%',
//         shadowColor: 'black',
//         overflow: 'visible',
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         shadowOpacity: 0.35,
//         shadowRadius: 9.5,
//         elevation: 5
        
//     },
//     textMessage: {
//         color: 'brown',
//         fontSize: 20,
//         fontWeight: '700'
//     }
// })