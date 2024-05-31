import { View, Text, StyleSheet, Animated, TouchableOpacity, Image, Easing, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState } from 'react'
import { useNavigation } from "@react-navigation/native";



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Intro4 = () => {

    const navigation = useNavigation();


    const opacityTitle = useRef(new Animated.Value(0)).current;

    const backgroundColor = useRef(new Animated.Value(0)).current;

    const opacityNextBtn = useRef(new Animated.Value(0)).current;
    const opacityReplayBtn = useRef(new Animated.Value(0)).current;

    const xPosNextBtn = useRef(new Animated.Value(300)).current;
    const xPosReplayBtn = useRef(new Animated.Value(-300)).current;
    
    const opacityBar = useRef(new Animated.Value(1)).current;
    const opacityBar2 = useRef(new Animated.Value(0)).current;
    const barPosition = useRef(new Animated.Value(0)).current;
    
    const opacityPointer = useRef(new Animated.Value(1)).current;
    const pointerPositionX = useRef(new Animated.Value(0)).current;
    const pointerPositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    
    const opacityUpperText = useRef(new Animated.Value(0)).current;
    const opacityMiddleText = useRef(new Animated.Value(0)).current;
    const opacityLowerText = useRef(new Animated.Value(0)).current;
    const opacityLowerText2 = useRef(new Animated.Value(0)).current;
    const opacityLowerText3 = useRef(new Animated.Value(0)).current;
    
    
    const opacityExerciseMenu = useRef(new Animated.Value(0)).current;
    const yPosMenu = useRef(new Animated.Value(0)).current;
    
    
    const opacityFillGap1 = useRef(new Animated.Value(0)).current;
    const opacityFillGap2 = useRef(new Animated.Value(0)).current;
    const opacityFillGap3 = useRef(new Animated.Value(0)).current;
    const opacityFillGap4 = useRef(new Animated.Value(0)).current;
    const opacityFillGap5 = useRef(new Animated.Value(0)).current;
    

    const opacitySort1 = useRef(new Animated.Value(0)).current;
    const opacitySort2 = useRef(new Animated.Value(0)).current;
    const opacitySort3 = useRef(new Animated.Value(0)).current;
    const opacitySort4 = useRef(new Animated.Value(0)).current;
    const opacitySort5 = useRef(new Animated.Value(0)).current;
    const opacitySort6 = useRef(new Animated.Value(0)).current;

    const opacityDragableImg = useRef(new Animated.Value(0)).current;
    const dragablePositionX = useRef(new Animated.Value(0)).current;
    const dragablePositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    
    const opacityDragable2Img = useRef(new Animated.Value(0)).current;
    const dragable2PositionX = useRef(new Animated.Value(0)).current;
    const dragable2PositionY = useRef(new Animated.Value(screenHeight / 2)).current;
    


    const backgroundColorInterpolate = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
    });




    const runAnimation = () => {


        Animated.timing(opacityReplayBtn, {
            duration: 300,
            toValue: 0,
            useNativeDriver: true
        }).start();


        Animated.timing(xPosReplayBtn, {
            duration: 100,
            delay: 300, 
            toValue: -300,
            useNativeDriver: true
        }).start();


        Animated.timing(yPosMenu, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true
        }).start();

        Animated.timing(pointerPositionY, {
            duration: 1000,
            delay: 500, 
            toValue: screenHeight / 2,
            useNativeDriver: true
        }).start();

        Animated.timing(pointerPositionX, {
            duration: 1000,
            delay: 200, 
            toValue: 0,
            useNativeDriver: true
        }).start();

        Animated.sequence([
            Animated.timing(barPosition, {
                duration: 1500,
                delay: 500,
                easing: Easing.bezier(.3,.88,0,.98),
                toValue: -200,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityBar, {
                    duration: 1500,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityBar2, {
                    duration: 1500,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(barPosition, {
                    duration: 8000,
                    delay: 1500,
                    easing: Easing.bezier(.3,.88,0,.98),
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]),

        ]).start();


/////////////////////////////////
        Animated.sequence([
            Animated.timing(opacityTitle, {
                duration: 1500,
                delay: 3000,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityExerciseMenu, {
                duration: 2000,
                delay: 1000,     
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(opacityTitle, {
                duration: 1000,
                delay: 100,     
                toValue: 0,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(yPosMenu, {
                    duration: 3000,
                    delay: 500, 
                    toValue: -300,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 2800,
                    delay: 500, 
                    toValue: 100,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityLowerText, {
                    duration: 2000,
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenHeight / 2,
                    useNativeDriver: true
                })
            ]),
            Animated.parallel([
                Animated.timing(yPosMenu, {
                    duration: 3000,
                    delay: 100, 
                    toValue: -600,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 2800,
                    delay: 100, 
                    toValue: 100,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(pointerPositionY, {
                duration: 1000,
                delay: 300, 
                toValue: 300,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(opacityExerciseMenu, {
                    duration: 1000,
                    delay: 300, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityLowerText, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(backgroundColor, {
                    duration: 2000,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                })
            ]),
            Animated.timing(opacityFillGap1, {
                duration: 1500,
                delay: 500,
                toValue: 1,
                useNativeDriver: false,
            }),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenWidth / 1.6 + 40,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 300, 
                    toValue: -35,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenWidth / 1.6 + 30,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionX, {
                    duration: 1000,
                    delay: 300, 
                    toValue: -35,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityFillGap2, {
                    duration: 100,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityDragableImg, {
                    duration: 100,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenWidth / 1.6 * 0.3 + 70,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 450, 
                    toValue: 135,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: screenWidth / 1.6 * 0.3 + 60,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionX, {
                    duration: 1000,
                    delay: 450, 
                    toValue: 135,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 200, 
                    toValue: screenWidth / 1.6 * 0.3 + 85,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 250, 
                    toValue: -120,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionY, {
                    duration: 1000,
                    delay: 200, 
                    toValue: screenWidth / 1.6 * 0.3 + 75,
                    useNativeDriver: true
                }),
                Animated.timing(dragablePositionX, {
                    duration: 1000,
                    delay: 250, 
                    toValue: -120,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityDragableImg, {
                    duration: 100,
                    delay: 200,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap5, {
                    duration: 300,
                    delay: 300,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap3, {
                    duration: 1000,
                    delay: 2000,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap4, {
                    duration: 1000,
                    delay: 3500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityFillGap1, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap2, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap3, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap5, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityFillGap4, {
                    duration: 1000,
                    delay: 3000,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(backgroundColor, {
                    duration: 2000,
                    delay: 3000,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLowerText2, {
                    duration: 1000,
                    delay: 4500,
                    toValue: 0,
                    useNativeDriver: false,
                }),
            ]),
            Animated.timing(opacitySort1, {
                duration: 1000,
                delay: 1000,
                toValue: 1,
                useNativeDriver: false,
            }),
            Animated.parallel([
                Animated.timing(dragable2PositionY, {
                    duration: 100,
                    toValue: (screenWidth - 50) / 0.95 / 6 * 5 + 50,
                    useNativeDriver: true
                }),
                Animated.timing(dragable2PositionX, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: (screenWidth - 50) / 0.95 / 6 * 5 + 65,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 300, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacitySort2, {
                    duration: 100,
                    delay: 1500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityDragable2Img, {
                    duration: 100,
                    delay: 1500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
            ]),
            Animated.parallel([
                Animated.timing(pointerPositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: (screenWidth - 50) / 0.95 * 0.4 + 65,
                    useNativeDriver: true
                }),
                Animated.timing(pointerPositionX, {
                    duration: 1000,
                    delay: 450, 
                    toValue: (screenWidth - 50) / -4 + 5,
                    useNativeDriver: true
                }),
                Animated.timing(dragable2PositionY, {
                    duration: 1000,
                    delay: 300, 
                    toValue: (screenWidth - 50) / 0.95 * 0.4 + 50,
                    useNativeDriver: true
                }),
                Animated.timing(dragable2PositionX, {
                    duration: 1000,
                    delay: 450, 
                    toValue: (screenWidth - 50) / -4 + 5,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacityDragable2Img, {
                    duration: 100,
                    delay: 200,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort3, {
                    duration: 300,
                    delay: 300,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLowerText3, {
                    duration: 1000,
                    delay: 500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort4, {
                    duration: 1000,
                    delay: 1800,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort5, {
                    duration: 1000,
                    delay: 3500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort6, {
                    duration: 1000,
                    delay: 5500,
                    toValue: 1,
                    useNativeDriver: false,
                }),
            ]),
            Animated.parallel([
                Animated.timing(opacitySort1, {
                    duration: 100,
                    delay: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort2, {
                    duration: 100,
                    delay: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort3, {
                    duration: 100,
                    delay: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort4, {
                    duration: 100,
                    delay: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort5, {
                    duration: 100,
                    delay: 100,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacitySort6, {
                    duration: 1000,
                    delay: 3000,
                    toValue: 0,
                    useNativeDriver: false,
                }),
                Animated.timing(opacityLowerText3, {
                    duration: 1000,
                    delay: 4500,
                    toValue: 0,
                    useNativeDriver: false,
                }),
            ]),

/////////////////////////////////
            Animated.parallel([
                Animated.timing(xPosNextBtn, {
                    duration: 100,
                    delay: 200, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(xPosReplayBtn, {
                    duration: 100,
                    delay: 200, 
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.timing(opacityNextBtn, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.timing(opacityReplayBtn, {
                    duration: 2000,
                    delay: 500, 
                    toValue: 1,
                    useNativeDriver: true
                })
            ])
        ]).start()
        

    }

    

    useEffect(() => {

        runAnimation();
      

    }, [])
    


  return (
    <Animated.View style={{...styles.mainContainer, backgroundColor: backgroundColorInterpolate}}>

        




        <Animated.View style={{...styles.exerciseMenuContainer, transform: [{translateY: yPosMenu}]}}>
            <Animated.Image source={require('../../../../assets/exerciseMenu.png')} style={{...styles.exerciseMenuImg, opacity: opacityExerciseMenu}}/>
        </Animated.View>
        


        <Animated.View style={styles.fillGapContainer}>
            <Animated.Image source={require('../../../../assets/fillGap1.png')} style={{...styles.fillGapImg, opacity: opacityFillGap1}}/>
            <Animated.Image source={require('../../../../assets/fillGap2.png')} style={{...styles.fillGapImg, opacity: opacityFillGap2}}/>
            <Animated.Image source={require('../../../../assets/fillGap5.png')} style={{...styles.fillGapImg, opacity: opacityFillGap5}}/>
            <Animated.Image source={require('../../../../assets/fillGap3.png')} style={{...styles.fillGapImg, opacity: opacityFillGap3}}/>
            <Animated.Image source={require('../../../../assets/fillGap4.png')} style={{...styles.fillGapImg, opacity: opacityFillGap4}}/>
        </Animated.View>


        <Animated.View style={styles.sortContainer}>
            <Animated.Image source={require('../../../../assets/sort1.png')} style={{...styles.sortImg, opacity: opacitySort1}}/>
            <Animated.Image source={require('../../../../assets/sort2.png')} style={{...styles.sortImg, opacity: opacitySort2}}/>
            <Animated.Image source={require('../../../../assets/sort3.png')} style={{...styles.sortImg, opacity: opacitySort3}}/>
            <Animated.Image source={require('../../../../assets/sort4.png')} style={{...styles.sortImg, opacity: opacitySort4}}/>
            <Animated.Image source={require('../../../../assets/sort5.png')} style={{...styles.sortImg, opacity: opacitySort5}}/>
            <Animated.Image source={require('../../../../assets/sort6.png')} style={{...styles.sortImg, opacity: opacitySort6}}/>
        </Animated.View>


        <Animated.View style={{...styles.dragableImgContainer, transform: [{translateY: dragablePositionY}, {translateX: dragablePositionX}]}}>
            <Animated.Image source={require('../../../../assets/dragableImg.png')} style={{...styles.dragableImg, opacity: opacityDragableImg}}/>
        </Animated.View>


        <Animated.View style={{...styles.dragableImgContainer, transform: [{translateY: dragable2PositionY}, {translateX: dragable2PositionX}]}}>
            <Animated.Image source={require('../../../../assets/dragableImg2.png')} style={{...styles.dragable2Img, opacity: opacityDragable2Img}}/>
        </Animated.View>




        <Animated.View style={{...styles.barImgContainer, transform: [{translateY: barPosition}]}}>
            <Animated.Image source={require('../../../../assets/bar-word.png')} style={{...styles.barImg, opacity: opacityBar}}/>
            <Animated.Image source={require('../../../../assets/bar-exe.png')} style={{...styles.barImg, opacity: opacityBar2}}/>
        </Animated.View>





        <Animated.View style={{...styles.titleContainer, opacity: opacityTitle}}>

            <Text style={styles.titleText}>Interactive Exercises</Text>
        </Animated.View>


        <Animated.View style={{...styles.upperTextContainer, opacity: opacityUpperText}}>
            <Text style={styles.bodyText2}></Text>

        </Animated.View>

        

        <Animated.View style={{...styles.middleTextContainer, opacity: opacityMiddleText}}>
            <Text style={styles.bodyText}></Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText}}>
            <Text style={styles.bodyText}>Select from various grammar exercises on different levels and topics</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer2, opacity: opacityLowerText2}}>
            <Text style={styles.bodyText}>Drag and drop words, fill in gaps, match words, listen and sort sentences and many more interactive exercises</Text>

        </Animated.View>


        <Animated.View style={{...styles.lowerTextContainer, opacity: opacityLowerText3}}>
            <Text style={styles.bodyText}>There are hundreds of grammar exercises here and new are added every day!</Text>

        </Animated.View>



        <Animated.View style={{...styles.pointerContainer, transform: [{translateY: pointerPositionY}, {translateX: pointerPositionX}]}}>
            <Animated.Image source={require('../../../../assets/pointer.png')} style={{...styles.pointerImg, opacity: opacityPointer}}/>
        </Animated.View>



        <Animated.View style={{...styles.buttonContainerReplay, opacity: opacityReplayBtn, transform: [{translateX: xPosReplayBtn}]}}>
            <TouchableOpacity onPress={runAnimation}>

                <Image source={require('../../../../assets/reload.png')} style={styles.iconReplayImg}/>
            </TouchableOpacity>
        </Animated.View>


        <Animated.View style={{...styles.buttonContainer, opacity: opacityNextBtn, transform: [{translateX: xPosNextBtn}]}}>
            <TouchableOpacity onPress={() => navigation.replace("Intro5")}>

                <Image source={require('../../../../assets/arrow-right.png')} style={styles.iconImg}/>
            </TouchableOpacity>
        </Animated.View>
        
    </Animated.View>
  )
}

export default Intro4


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 100
        
    },
    titleText: {
        fontSize: 40,
        fontWeight: '450',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    textContainer: {
        marginTop: 100
    },
    bodyText: {
        fontSize: 20,
        textAlign: 'center',
    },
    bodyText2: {
        fontSize: 18,
        textAlign: 'center',
    },
    bodyTextBold: {
        fontSize: 20,
        color: 'green',
        fontWeight: '700'
    },
    bodyTextBold2: {
        fontSize: 18,
        color: 'red',
        fontWeight: '700'
    },
    bodyTextBold3: {
        fontSize: 18,
        color: 'green',
        fontWeight: '700'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 120,
        right: 0,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        height: 50,
        width: 50,
        tintColor: 'purple'
    },
    buttonContainerReplay: {
        position: 'absolute',
        bottom: 120,
        left: 0,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconReplayImg: {
        height: 50,
        width: 50,
        tintColor: 'purple'
    },
    barImgContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 150
        
    },
    barImg: {
        position: 'absolute',
        width: '100%',
        height: 150
    },
    pointerContainer: {
        position: 'absolute',
        height: 30,
        width: 30
    },
    pointerImg: {
        height: 30,
        width: 30
    },
    upperTextContainer: {
        position: 'absolute',
        top: 70,
        marginHorizontal: 20,
    },
    middleTextContainer: {
        position: 'absolute',
        top: screenHeight / 2,
        marginHorizontal: 20,
    },
    lowerTextContainer: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    lowerTextContainer2: {
        position: 'absolute',
        bottom: 150,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    exerciseMenuContainer: {
        position: 'absolute',
        top: 200,
    },
    exerciseMenuImg: {
        width: screenWidth,
        height: screenWidth * 3.7
    },
    fillGapContainer: {
        position: 'absolute',
        top: 70,
        width: '100%',
    },
    fillGapImg: {
        position: 'absolute',
        width: screenWidth,
        height: screenWidth / 1.6
    },
    dragableImgContainer: {
        position: 'absolute',
    },
    dragableImg: {
        height: 30,
        width: 45,
        borderRadius: 8
    },
    sortContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 70,
        width: '100%',
    },
    sortImg: {
        position: 'absolute',
        width: screenWidth - 50,
        height: (screenWidth - 50) / 0.95
    },
    dragable2Img: {
        height: 28,
        width: 60,
        borderRadius: 8
    },
})