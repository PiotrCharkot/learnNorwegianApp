import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import GradientButton from '../../buttons/GradientButton';
import generalStyles from '../../../styles/generalStyles';

const screenWidth = Dimensions.get('window').width;
const iconColor = 'white';

const imgLinks = [require('../../../../assets/reindeerSmile_NoBackground.png'), require('../../../../assets/reindeerSmile4_NoBackground.png')]



const BottomBar = (params) => {


    const navigation = useNavigation();

    
    const correctMessagePosition = useRef(new Animated.Value(0)).current;
    const correctImagePosition = useRef(new Animated.Value(0)).current;
    const wrongMessagePosition = useRef(new Animated.Value(0)).current;

    const correctAnswers = params.correctAnswers;
    const [pathIcon, setPathIcon] = useState('next');
    const [pathBackIcon, setPathBackIcon] = useState('previous');
    const [buttonFunction, setButtonFunction] = useState(params.callbackButton);
    const [currentPoints, setCurrentPoints] = useState(params.userPoints);
    const [failedAnswer, setFaildAnswer] = useState(false);
    const [imgLink, setImgLink] = useState(imgLinks[0]);
    const [imgMargin, setImgMargin] = useState(0);
    const [letGoBack, setLetGoBack] = useState(true);
    const [answCheckOnce, setAnswCheckOnce] = useState(false);
    

    const goBack = () => {

        console.log('is coming back: ', params.comeBack);
        if (params.questionScreen && pathIcon === 'next' && buttonFunction === 'goToNext' && params.currentScreen === params.latestScreen && letGoBack) {
            console.log('btn functions is: ', buttonFunction);
            setButtonFunction(params.callbackButton);
            setPathIcon('tick');
            console.log('failed answer in goback is: ', failedAnswer);
            
            setCurrentPoints(() => {
                return failedAnswer ? params.userPoints : params.userPoints - params.answerBonus;
            })

            Animated.spring(correctMessagePosition, {
                toValue: 0,
                duration: 200,
                delay: 200,
                useNativeDriver: true
            }).start();

            Animated.spring(correctImagePosition, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
           
            console.log('current points when go back: ', currentPoints);
            console.log('num when go back: ', params.currentScreen);
            navigation.navigate({
                name: params.linkPrevious,
                params: { latestScreen: params.latestScreen, userPoints: currentPoints, latestAnswered: params.latestAnswered, allScreensNum: params.allScreensNum, exeList: params.questionList, linkList: params.links, nextScreen: params.currentScreen - 1, savedLang: params.savedLang },
                merge: true,
            });
        }
        
        
    }


    const changeIcon = () => {

        //console.log('last answerd: ', params.latestAnswered, 'current screen: ', params.currentScreen, 'latest screen: ', params.latestScreen );
        if (params.userPoints > currentPoints) {
            setCurrentPoints(params.userPoints)
        }
        if (params.currentScreen < params.latestScreen) {
            setPathIcon('next')
        }
        
    }

    const buttonAction = () => {
        if (buttonFunction === 'checkAnswer' && params.currentScreen >= params.latestScreen ) {

            let additonalScreenPoints = params.learningLastScreen ? params.currentScreen * generalStyles.screenBonus : 0;
            
            let isCorrect = () => {
                let returnVal;
                for (let i = 0; i < correctAnswers.length; i++) {
                    if (correctAnswers[i] === params.userAnswers[i]) {
                        returnVal = true;
                    } else {
                        setFaildAnswer(true);
                        return false;
                    }
                }
                
                return returnVal;
            }
            
            if (isCorrect()) {
                setButtonFunction('goToNext');
                setPathIcon('next');
                
                Animated.spring(correctMessagePosition, {
                    toValue: -170,
                    duration: 200,
                    useNativeDriver: true
                }).start();

                Animated.spring(correctImagePosition, {
                    delay: 400,
                    toValue: -220,
                    duration: 200,
                    bounciness: 7,
                    useNativeDriver: true
                }).start();
                
                setCurrentPoints(() => {
                    
                    return failedAnswer ? params.userPoints + additonalScreenPoints : params.userPoints + params.answerBonus  + additonalScreenPoints ;
                })
            } else {
                Animated.spring(wrongMessagePosition, {
                    toValue: -170,
                    duration: 200,
                    useNativeDriver: true
                }).start()
            }

        } else if (buttonFunction === 'checkAnswersManyQ' && params.currentScreen >= params.latestScreen) {
            let bonusAnswer = generalStyles.bonusCheckAnswersManyQ;
            let questionPoints = 0;
            let returnArr = [];

            let isCorrect = (questionAns, userAns) => {
                let returnVal;
                for (let i = 0; i < questionAns.length; i++) {
                    if (questionAns[i] === userAns[i]) {
                        returnVal = true;
                    } else {
                        return false;
                    }
                }
                
                return returnVal;
            }

            for (let i = 0; i < correctAnswers.length; i++) {
                let tempVal = isCorrect(correctAnswers[i], params.userAnswers[i]);
                returnArr.push(tempVal);
                if (tempVal) {
                    questionPoints = questionPoints + bonusAnswer;
                }
            }


            params.checkAns(returnArr);

            
            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        } else if (buttonFunction === 'checkAllAnswers' && params.currentScreen >= params.latestScreen) {

            let bonusAnswer = generalStyles.bonusCheckAllAnswers;
            let returnArr = [];
            let questionPoints = 0;

            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i] === params.userAnswers[i]) {
                    returnArr.push(true);
                    questionPoints = questionPoints + bonusAnswer;
                } else {
                    returnArr.push(false);
                }
            }

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }
            

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        }  else if (buttonFunction === 'checkAllAnswersInput' && params.currentScreen >= params.latestScreen) {

            let bonusAnswer = generalStyles.bonusCheckAllAnswersInput;
            let returnArr = [];
            let questionPoints = 0;

            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i].includes(params.userAnswers[i].replace(/\s+/g, ' '))) {
                    returnArr.push(true);
                    questionPoints = questionPoints + bonusAnswer;
                } else {
                    returnArr.push(false);
                }
            }

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }
            

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        } else if (buttonFunction === 'matchLR' && params.currentScreen >= params.latestScreen) {
            let bonusAnswer = generalStyles.bonusMatchLR;
            let returnArr = [];
            let questionPoints = 0;

            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers.includes(params.userAnswers[i] + params.userAnswers2[i])) {
                    returnArr.push(true);
                    questionPoints = questionPoints + bonusAnswer;
                } else {
                    returnArr.push(false);
                }
            } 

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        } else if (buttonFunction === 'checkAnswerGapsText' && params.currentScreen >= params.latestScreen) {
            
            
            let bonusAnswer = generalStyles.bonusCheckAnswerGapsText;
            let returnArr = [];
            let questionPoints = correctAnswers.length * bonusAnswer * -1 + (params.numberOfGaps * bonusAnswer);
            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i].toLowerCase() === params.userAnswers[i].toLowerCase()) {
                    returnArr.push(true);
                    questionPoints = questionPoints + bonusAnswer;
                } else {
                    returnArr.push(false);
                }
            }
            
            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        } else if (buttonFunction === 'checkAnswerGapsTextSounds' && params.currentScreen >= params.latestScreen) {
            
            
            let bonusAnswer = generalStyles.bonusCheckAnswerGapsTextSounds;
            let returnArr = [];
            let questionPoints = correctAnswers.length * bonusAnswer * -1 + (params.numberOfGaps * bonusAnswer);
            for (let i = 0; i < correctAnswers.length; i++) {
                if (correctAnswers[i].toLowerCase() === params.userAnswers[i].toLowerCase()) {
                    returnArr.push(true);
                    questionPoints = questionPoints + bonusAnswer;
                } else {
                    returnArr.push(false);
                }
            }
            
            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        }  else if (buttonFunction === 'chooseCorrectCategory' && params.currentScreen >= params.latestScreen) {

            let bonusAnswer = generalStyles.bonusChooseCorrectCategory;
            let returnArr = [];
            let questionPoints = 0;
            for (let i = 0; i < params.userAnswers.length; i++) {
                if (correctAnswers[0].includes(params.userAnswers[i]) && i < params.containerCapacity[0]) {
                    returnArr.push(1);
                    questionPoints = questionPoints + bonusAnswer;
                } else  if (correctAnswers[1].includes(params.userAnswers[i]) && i >= params.containerCapacity[0] && i < params.containerCapacity[1]) {
                    returnArr.push(1);
                    questionPoints = questionPoints + bonusAnswer;
                } else if (params.userAnswers[i] === '???') {
                    returnArr.push(3)
                } else if (i >= params.containerCapacity[1]) {
                    returnArr.push(3)
                } else {
                    returnArr.push(2);
                }
            }

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
            
        } else if (buttonFunction === 'markMistakes' && params.currentScreen >= params.latestScreen) {
            let bonusAnswer = generalStyles.bonusMarkMistakes;
            let returnArr = [];
            let questionPoints = 0;
            let wrongAnswer = 0; 
            let correctAnswer = 0;

            for (let i = 0; i < params.textLength; i++) {
                if (correctAnswers.includes(i)) {
                    if (params.userAnswers.includes(i)) {
                        returnArr.push(1);
                        questionPoints = questionPoints + bonusAnswer;
                        correctAnswer++;
                    } else {
                        returnArr.push(0);
                        wrongAnswer++;
                        console.log('pushing wrong');
                    }
                } else {
                    returnArr.push(0)
                }
            }

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                
                let penaltyWrongAns = (params.userAnswers.length - correctAnswers.length + wrongAnswer) * generalStyles.bonusMarkMistakesPenaltyPoints;
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints - penaltyWrongAns;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        }  else if (buttonFunction === 'orderChceck' && params.currentScreen >= params.latestScreen) {
            let answersToLowerCase = [];
            let bonusAnswer = generalStyles.bonusOrderChceck;
            let returnArr = [];
            let questionPoints = 0;

            const arrayEquals = (a, b) => {
                return Array.isArray(a) &&
                    Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((val, index) => val === b[index]);
            }


            for (let i = 0; i < params.userAnswers.length; i++) {
                
                answersToLowerCase.push(params.userAnswers[i].map((item) => item.toLowerCase()))
            } 
            
            

            for (let i = 0; i < answersToLowerCase.length; i++) {
                let tempVal = false;
                for (let j = 0; j < correctAnswers[i].length; j++) {
                    if (arrayEquals(correctAnswers[i][j], answersToLowerCase[i])) {
                        
                        tempVal = true
                    }
                }
                returnArr.push(tempVal)
                if (tempVal) {
                    questionPoints = questionPoints + bonusAnswer;
                }
            }

            params.checkAns(returnArr);

            if (!answCheckOnce && params.currentScreen > params.latestAnswered) {
                setCurrentPoints(() => {
                    return params.userPoints + questionPoints;
                })
            }

            setAnswCheckOnce(true);
            setLetGoBack(false);
            setButtonFunction('goToNext');
            setPathIcon('next');
        } else if (buttonFunction === 'checkAnswerOrderCheck' && params.currentScreen >= params.latestScreen ) {

            let additonalScreenPoints = params.learningLastScreen ? params.currentScreen * generalStyles.screenBonus : 0;

            const arrayEquals = (a, b) => {
                return Array.isArray(a) &&
                    Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((val, index) => val === b[index]);
            }
            
            let isCorrect = () => {
                let returnArr = [];
                
                for (let i = 0; i < params.userAnswers.length; i++) {
                    let tempVal = false;
                    for (let j = 0; j < correctAnswers[i].length; j++) {
                        if (arrayEquals(correctAnswers[i][j], params.userAnswers[i])) {
                            
                            tempVal = true
                        }
                    }
                    returnArr.push(tempVal)
                }

                if (!returnArr[0]) {

                    setFaildAnswer(true);
                }
                return returnArr[0];
            }
            
            if (isCorrect()) {
                setButtonFunction('goToNext');
                setPathIcon('next');
                
                Animated.spring(correctMessagePosition, {
                    toValue: -170,
                    duration: 200,
                    useNativeDriver: true
                }).start();

                Animated.spring(correctImagePosition, {
                    delay: 400,
                    toValue: -220,
                    duration: 200,
                    bounciness: 7,
                    useNativeDriver: true
                }).start();
                
                setCurrentPoints(() => {
                    return failedAnswer ? params.userPoints + additonalScreenPoints : params.userPoints + params.answerBonus + additonalScreenPoints;
                })
            } else {
                Animated.spring(wrongMessagePosition, {
                    toValue: -170,
                    duration: 200,
                    useNativeDriver: true
                }).start()
            }

        } else {
  
            navigation.navigate(params.linkNext, {
                userPoints: currentPoints, latestScreen: params.latestScreen, comeBackRoute: params.comeBack, allPoints: params.totalPoints, latestAnswered: params.latestAnswered, dataMarkers: params.dataForMarkers, allScreensNum: params.allScreensNum, exeList: params.questionList, linkList: params.links, nextScreen: params.currentScreen + 1, savedLang: params.savedLang 
            })
        }
        
    }

    useEffect(() => {
        if (params.questionScreen) {
            setButtonFunction(params.callbackButton)
            setPathIcon('tick');
            setImgLink(() => imgLinks[Math.floor(Math.random() * imgLinks.length)])
            setImgMargin(() => Math.floor(Math.random() * 200))



        }
    }, [params.resetCheck])

    useFocusEffect(() => {
        
        changeIcon();
    })

    useEffect(() => {
        Animated.spring(wrongMessagePosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start()
    }, [params.userAnswers])

    


  return (
    <View>
        <Animated.View style={{...styles.imageContainer, transform: [{translateY: correctImagePosition }], marginLeft: imgMargin }}>

            <Image style={styles.imageCorrect} source={imgLink} />
        </Animated.View>
        
        <Animated.View style={{...styles.wrongMessageContainer, transform: [{translateY: wrongMessagePosition}] }}>
            <Text style={styles.textMessage}>{params.wrongMsg}</Text>
        </Animated.View>


        <Animated.View style={{...styles.correctMessageContainer, transform: [{translateY: correctMessagePosition}] }}>
            <Text style={styles.textMessage}>{params.correctMsg}</Text>
        </Animated.View>

        <View style={styles.mainContainer}>

        
            {params.isFirstScreen ? null : <View style={styles.buttonBackContainer}>
                    <GradientButton 
                    height={params.buttonHeight ? params.buttonHeight : 40} 
                    width={params.buttonWidth ? params.buttonWidth : 40}
                    colorA={'white'} 
                    colorB={'#c256e3'} 
                    callbackFunc={goBack} 
                    path={pathBackIcon} 
                    heightIcon={20} 
                    widthIcon={20}
                    colorIcon={iconColor}
                    noText={params.noText}
                    text={params.text}
                    startGradient={[0.0, 0.0]}
                    endGradient={[1.0, 1.0]}
                    borderTopRightRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                    borderBottomRightRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                    borderTopLeftRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                    borderBottomLeftRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} />
                </View> }
            
            <View style={styles.buttonContainer}>
                <GradientButton 
                height={params.buttonHeight ? params.buttonHeight : 40} 
                width={params.buttonWidth ? params.buttonWidth : 40}
                colorA={'white'} 
                colorB={'#c256e3'} 
                callbackFunc={buttonAction} 
                path={pathIcon} 
                heightIcon={20} 
                widthIcon={20}
                colorIcon={iconColor}
                noText={params.noText}
                text={params.text}
                startGradient={[0.0, 0.0]}
                endGradient={[1.0, 1.0]}
                borderTopRightRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                borderBottomRightRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                borderTopLeftRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} 
                borderBottomLeftRadius={params.buttonHeight ? params.buttonHeight / 2 : 20} />
            </View>

        </View>
    </View>
  )
}

export default BottomBar

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        bottom: 0,
        height: 100,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5
    },
    buttonContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 60,
        top: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5
    },
    buttonBackContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: 20,
        top: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.5,
        elevation: 5
    },
    correctMessageContainer: {
        position: 'absolute',
        width: '100%',
        height: 70,
        backgroundColor: '#cffadb',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 2,
        borderTopColor: 'green'
        
    },
    wrongMessageContainer: {
        position: 'absolute',
        width: '100%',
        height: 70,
        backgroundColor: '#ffd4e1',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 2,
        borderTopColor: 'red'
        
    },
    imageContainer: {
        position: 'absolute',
        width: 170,
        height: 160,
        top: -100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible'
        
    },
    imageCorrect: {
        height: 160,
        width: '100%',
        shadowColor: 'black',
        overflow: 'visible',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.5,
        
    },
    textMessage: {
        color: 'brown',
        fontSize: 16,
        fontWeight: '700'
    }
})