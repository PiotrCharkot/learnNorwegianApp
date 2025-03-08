import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useFocusEffect } from "@react-navigation/native";
import { Input } from "react-native-elements";
import ProgressBar from '../../../../../components/bars/progressBar'
import BottomBar from '../../../../../components/bars/bottomBar'
import generalStyles from '../../../../../styles/generalStyles';
import AnswerPairType4 from '../../../../../components/other/AnswerPairType4';
import AnswerPairType6 from '../../../../../components/other/AnswerPairType6';



const screenWidth = Dimensions.get('window').width;
const outputColors = [generalStyles.wrongAnswerConfirmationColor, generalStyles.neutralAnswerConfirmationColor, generalStyles.correctAnswerConfirmationColor];

const exitLink = 'ExitExcScreen'

const Type4 = ({route}) => {

    const {userPoints, latestScreen, comeBackRoute, latestAnswered, allScreensNum, exeList, linkList, nextScreen, savedLang} = route.params
    
    const [A1, setA1] = useState('');
    const [A2, setA2] = useState('');
    const [A3, setA3] = useState('');
    const [A4, setA4] = useState('');
    const [A5, setA5] = useState('');
    const [A6, setA6] = useState('');
    const [A7, setA7] = useState('');
    const [A8, setA8] = useState('');
    const [answersChecked, setAnswersChecked] = useState([])
    const [currentPoints, setCurrentPoints] = useState(userPoints);
    const [latestScreenDone, setLatestScreenDone] = useState(nextScreen);
    const [comeBack, setComeBack] = useState(false);
    const [resetCheck, setResetCheck] = useState(false);
    const [latestScreenAnswered, setLatestScreenAnswered] = useState(latestAnswered);
    const [instructions, setInstructions] = useState('Type the correct word.');
    const [newInstructions, setNewInstructions] = useState('');
    const [translations, setTranslations] = useState([]);
    const [hideShowText, setHideShowText] = useState('Show answers');
    const [hideTxt, setHideTxt] = useState('Hide answers')
    const [dataForAnswer, setDataForAnswers] = useState([]);
    const [answersShown, setAnswersShown] = useState(false);

    const a1background = useRef(new Animated.Value(0)).current;
    const a2background = useRef(new Animated.Value(0)).current;
    const a3background = useRef(new Animated.Value(0)).current;
    const a4background = useRef(new Animated.Value(0)).current;
    const a5background = useRef(new Animated.Value(0)).current;
    const a6background = useRef(new Animated.Value(0)).current;
    const a7background = useRef(new Animated.Value(0)).current;
    const a8background = useRef(new Animated.Value(0)).current;
    const answerPosition = useRef(new Animated.Value(220)).current;
    

    const backgroundArray = [a1background, a2background, a3background, a4background, a5background, a6background, a7background, a8background];


    const backgroundA1 = a1background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })
    
    const backgroundA2 = a2background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA3 = a3background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA4 = a4background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA5 = a5background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA6 = a6background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA7 = a7background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const backgroundA8 = a8background.interpolate({
        inputRange: [-100, 0, 100], 
        outputRange: outputColors
    })

    const resetAnimation = () => {

        setResetCheck(!resetCheck)
        for (let i = 0; i < answersChecked.length; i++) {
            Animated.timing(backgroundArray[i], {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }

    useFocusEffect(() => {
        

        if (latestScreen > nextScreen) {
            setLatestScreenAnswered(latestAnswered);
            setLatestScreenDone(latestScreen);
            setComeBack(true)
        }

        if (route.params.userPoints > 0) {
            console.log('setting new points', route.params.userPoints );
            setCurrentPoints(userPoints)
        }

        if (exeList[nextScreen - 1].instructions) {
            if (savedLang === 'PL') {
                setNewInstructions(exeList[nextScreen - 1].instructions.pl)
                setHideShowText('Pokaż odpowiedzi')
                setHideTxt('Ukryj odpowiedzi')
              } else if (savedLang === 'DE') {
                setNewInstructions(exeList[nextScreen - 1].instructions.ger)
                setHideShowText('Antworten anzeigen')
                setHideTxt('Antworten verbergen')
              } else if (savedLang === 'LT') {
                setNewInstructions(exeList[nextScreen - 1].instructions.lt)
                setHideShowText('Rodyti atsakymus')
                setHideTxt('Slėpti atsakymus')
              } else if (savedLang === 'AR') {
                setNewInstructions(exeList[nextScreen - 1].instructions.ar)
                setHideShowText('عرض الإجابات')
                setHideTxt('اخفِ الإجابات')
              } else if (savedLang === 'UA') {
                setNewInstructions(exeList[nextScreen - 1].instructions.ua)
                setHideShowText('Показати відповіді')
                setHideTxt('Сховати відповіді')
              } else if (savedLang === 'ES') {
                setNewInstructions(exeList[nextScreen - 1].instructions.sp)
                setHideShowText('Mostrar respuestas')
                setHideTxt('Ocultar respuestas')
              } else if (savedLang === 'EN') {
                setNewInstructions(exeList[nextScreen - 1].instructions.eng)
            }
        } else {
            if (savedLang === 'PL') {
                setInstructions('Wpisz odpowiednie słowo.')
                setHideShowText('Pokaż odpowiedzi')
                setHideTxt('Ukryj odpowiedzi')
              } else if (savedLang === 'DE') {
                setInstructions('Gib das richtige Wort ein.')
                setHideShowText('Antworten anzeigen')
                setHideTxt('Antworten verbergen')
              } else if (savedLang === 'LT') {
                setInstructions('Įvesk teisingą žodį.')
                setHideShowText('Rodyti atsakymus')
                setHideTxt('Slėpti atsakymus')
              } else if (savedLang === 'AR') {
                setInstructions('اكتب الكلمة الصحيحة')
                setHideShowText('عرض الإجابات')
                setHideTxt('اخفِ الإجابات')
              } else if (savedLang === 'UA') {
                setInstructions('Введіть правильне слово.')
                setHideShowText('Показати відповіді')
                setHideTxt('Сховати відповіді')
              } else if (savedLang === 'ES') {
                setInstructions('Escribe la palabra correcta.')
                setHideShowText('Mostrar respuestas')
                setHideTxt('Ocultar respuestas')
            }
        }

        
        

        if (exeList[nextScreen - 1].translations) {
            if (savedLang === 'PL') {
                setTranslations(exeList[nextScreen - 1].translations.pl);
              } else if (savedLang === 'DE') {
                setTranslations(exeList[nextScreen - 1].translations.ger);
              } else if (savedLang === 'LT') {
                setTranslations(exeList[nextScreen - 1].translations.lt);
              } else if (savedLang === 'AR') {
                setTranslations(exeList[nextScreen - 1].translations.ar);
              } else if (savedLang === 'UA') {
                setTranslations(exeList[nextScreen - 1].translations.ua);
              } else if (savedLang === 'ES') {
                setTranslations(exeList[nextScreen - 1].translations.sp);
              } else if (savedLang === 'EN') {
                setTranslations(exeList[nextScreen - 1].translations.eng);
            }
        } 


        
        
    })



    useEffect(() => {
        let tempArr = [];

        for (let i = 0; i < exeList[nextScreen - 1].correctAnswers.length; i++) {
            


          if (exeList[nextScreen - 1].translationsLinks) {
            if (savedLang === 'PL') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.pl[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'DE') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.ger[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'LT') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.lt[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'AR') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.ar[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'UA') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.ua[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'ES') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.sp[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
              } else if (savedLang === 'EN') {
                tempArr[i] = {
                    translationData: exeList[nextScreen - 1].translations.eng[i],
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    links: exeList[nextScreen - 1].translationsLinks[i],
                    key: i
                }
            }
          } else if (exeList[nextScreen - 1].translations && !exeList[nextScreen - 1].translationsLinks) {
                if (savedLang === 'PL') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.pl[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'DE') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.ger[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'LT') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.lt[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'AR') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.ar[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'UA') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.ua[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'ES') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.sp[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                  } else if (savedLang === 'EN') {
                    tempArr[i] = {
                        translationData: exeList[nextScreen - 1].translations.eng[i],
                        answerData: exeList[nextScreen - 1].correctAnswers[i],
                        key: i
                    }
                }
            } else {
                tempArr[i] = {
                    answerData: exeList[nextScreen - 1].correctAnswers[i],
                    key: i
                }
            }
        }


        console.log('my flat list data', tempArr);
        setDataForAnswers(tempArr);


    }, [])
    

    useEffect(() => {

        console.log('show me my link list: ', linkList);
        console.log('my current screen is: ', nextScreen);
        if (answersChecked.length !== 0) {
          setLatestScreenAnswered(nextScreen); 
          let delayAnimation = 0;
          for (let i = 0; i < answersChecked.length; i++) {


            if (answersChecked[i]) {
                Animated.timing(backgroundArray[i], {
                    toValue: 100,
                    duration: 500,
                    delay: delayAnimation,
                    useNativeDriver: false
                }).start()
            } else {
                Animated.timing(backgroundArray[i], {
                    toValue: -100,
                    duration: 500,
                    delay: delayAnimation,
                    useNativeDriver: false
                }).start()
            }

            
            delayAnimation = delayAnimation + 200;
            }

            Animated.timing(answerPosition, {
                toValue: 150,
                duration: 500,
                useNativeDriver: false
            }).start()


            setAnswersShown(false);
        }
      
    
    }, [answersChecked])


    const renderAnswer = (item) => {
      if (exeList[nextScreen - 1].translationsLinks) {

        return <AnswerPairType6 dataParams={item} />
      } else {

        return <AnswerPairType4 dataParams={item} />
      }
    }


    const showHideAnswers = () => {
        if (answersShown) {
            setAnswersShown(false);
            Animated.timing(answerPosition, {
                toValue: 150,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            setAnswersShown(true);
            Animated.timing(answerPosition, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }

    

  return (
    <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>

            <View style={styles.topView}>
                <Text style={{...styles.questionText, textAlign: savedLang === 'AR' ? 'right' : 'left' }}>{exeList[nextScreen - 1].instructions ? newInstructions : instructions}</Text>
            </View>

            <View style={styles.bodyContainer}>


                {exeList[nextScreen - 1].nuberOfQuestions > 0 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA1}}>
            
                        
                    
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[0][0]}</Text>

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => {setA1(text.toLowerCase().trim())}}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity>
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[0][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[0]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                

                {exeList[nextScreen - 1].nuberOfQuestions > 1 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA2}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[1][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef2.focus();
                              }}
                            >


                                <Input 
                                ref={(input) => { this.inputRef2 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA2(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity>
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[1][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[1]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[nextScreen - 1].nuberOfQuestions > 2 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA3}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[2][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef3.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef3 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA3(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity>
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[2][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[2]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[nextScreen - 1].nuberOfQuestions > 3 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA4}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[3][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef4.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef4 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA4(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity> 
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[3][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[3]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                



                {exeList[nextScreen - 1].nuberOfQuestions > 4 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA5}}>
                    <Text style={styles.text}>{exeList[nextScreen - 1].questions[4][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef5.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef5 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA5(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity> 
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[4][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[4]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[nextScreen - 1].nuberOfQuestions > 5 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA6}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[5][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef6.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef6 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA6(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity> 
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[5][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[5]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[nextScreen - 1].nuberOfQuestions > 6 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA7}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[6][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef7.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef7 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA7(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity> 
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[6][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[6]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                


                {exeList[nextScreen - 1].nuberOfQuestions > 7 ? <View style={styles.shadowWrapper}>
                    <Animated.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollStyles} style={{...styles.questionContainer, backgroundColor: backgroundA8}}>
                        <Text style={styles.text}>{exeList[nextScreen - 1].questions[7][0]}</Text> 

                            <View style={styles.inputContainer}>

                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{ top: 50, bottom: 70, left: 50, right: 50 }}
                              onPress={() => {
                                this.inputRef8.focus();
                              }}
                            >

                                <Input 
                                ref={(input) => { this.inputRef8 = input; }}
                                inputStyle={styles.inputContainerTextStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                autoCapitalize='none'
                                onChangeText={(text) => setA8(text.toLowerCase().trim())}
                                onSelectionChange={() => resetAnimation()}
                                /> 
                            </TouchableOpacity> 
                            </View>
                        <Text style={styles.textRight}>{exeList[nextScreen - 1].questions[7][1]} <Text style={styles.textTranslation}>{exeList[nextScreen - 1].translations ? `(`+translations[7]+`)` : ''}</Text></Text>
                    </Animated.ScrollView>
                </View> : <View style={{height: 0}}></View>}
                
                
            </View>

            <View style={{height: 200}}></View>
          
        </ScrollView>

        <Animated.View style={{...styles.answerContainer, transform: [{translateY: answerPosition}]}}>
            
            <View style={styles.answersListContainer}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    decelerationRate={0}
                    data={dataForAnswer}
                    renderItem={renderAnswer}
                    keyExtractor={(item) => item.key}
                    scrollEventThrottle={16}
                />
            </View>
            <TouchableOpacity style={styles.hideShowBtn} onPress={showHideAnswers}>
                <Text style={styles.hideShowTxt}>{answersShown ? hideTxt : hideShowText}</Text>
            </TouchableOpacity>
        </Animated.View>

        <View style={styles.progressBarContainer}>
          <ProgressBar screenNum={nextScreen} totalLenghtNum={allScreensNum} latestScreen={latestScreenDone} comeBack={comeBackRoute}/>

        </View>
    

      <View style={styles.bottomBarContainer}>
        <BottomBar  
        callbackButton={'checkAllAnswersInput'} 
        userAnswers={[A1, A2, A3, A4, A5, A6, A7, A8]}
        correctAnswers={exeList[nextScreen - 1].correctAnswers.map((item) => item.map((element) => element.toLowerCase() ))}
        buttonWidth={generalStyles.buttonNextPrevSize}
        buttonHeight={generalStyles.buttonNextPrevSize}
        linkNext={allScreensNum === nextScreen ? exitLink : linkList[nextScreen]}
        linkPrevious={linkList[nextScreen - 2]}
        userPoints={currentPoints}
        latestScreen={latestScreenDone}
        currentScreen={nextScreen}
        questionScreen={true}
        comeBack={comeBack}
        checkAns={(arr) => setAnswersChecked(arr)}
        resetCheck={resetCheck}
        latestAnswered={latestScreenAnswered}
        allScreensNum={allScreensNum}
        questionList={exeList}
        links={linkList}
        savedLang={savedLang}
        totalPoints={exeList[exeList.length - 2]}
        dataForMarkers={exeList[exeList.length - 1]}
        />
      </View>
    </View>
  )
}

export default Type4

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%'
  },
  head: {},
  body: {
    height: '100%',
    width: '100%',
    marginTop: 80,
    marginBottom: 100
  },
  progressBarContainer: {
    width: '100%',
    position: 'absolute',
  },
  topView: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20
  },
  questionText: {
    fontSize: generalStyles.exerciseScreenTitleSize,
    fontWeight: generalStyles.exerciseScreenTitleFontWeight,
    marginVertical: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10, 
    borderRadius: 10,
    height: 45,
  },
  scrollStyles: {
    alignItems: 'center'
  },
  shadowWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4.5,
    elevation: 5
  },
  bodyContainer: {
    paddingTop: 10
  },
  text: {
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: '400',
  },
  textRight: {
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: '400',
    marginRight: 20
  },
  textTranslation: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic'
  },
  inputContainerTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    width: 100,
  },
  inputContainerStyle: {
    height: 50, 
    borderBottomColor: 'transparent',
    marginBottom: -21,
    borderBottomWidth: 0,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textBold: {
    color: 'grey'
  },
  answerContainer: {
    position: 'absolute',
    marginHorizontal: 20,
    bottom: 100,
    width: screenWidth - 40
  },
  hideShowBtn: {
    position: 'absolute',
    bottom: 147,
    borderWidth: 3,
    borderColor: '#6441A5',
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 8,
    backgroundColor: '#e49dfa',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  hideShowTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  answersListContainer: {
    borderWidth: 3,
    borderColor: '#6441A5',
    padding: 10,
    backgroundColor: '#e49dfa',
    height: 150,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  }

})