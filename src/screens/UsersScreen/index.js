import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, Dimensions, FlatList } from 'react-native'
import { Input } from "react-native-elements";
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../../firebase/firebase-config';
import { collection, getDocs, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import { authentication } from '../../../firebase/firebase-config';
import { withAnchorPoint } from 'react-native-anchor-point';
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get("window").width;



const UsersScreen = () => {
    
    
    const usersPointsCollection = collection(db, 'usersPoints');

    const navigation = useNavigation();

    const pointsToScore = 200;

    let sixDaysAgo = new Date(new Date().setDate(new Date().getDate()-6)).toLocaleDateString();
    let fiveDaysAgo = new Date(new Date().setDate(new Date().getDate()-5)).toLocaleDateString();
    let fourDaysAgo = new Date(new Date().setDate(new Date().getDate()-4)).toLocaleDateString();
    let threeDaysAgo = new Date(new Date().setDate(new Date().getDate()-3)).toLocaleDateString();
    let twoDaysAgo = new Date(new Date().setDate(new Date().getDate()-2)).toLocaleDateString();
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString();
    let today = new Date().toLocaleDateString();

    let dayOfWeek = new Date(new Date().setDate(new Date().getDate())).getDay() === 0 ? 7 : new Date(new Date().setDate(new Date().getDate())).getDay();

    let allDaysOfWeek = [today, yesterday, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo, sixDaysAgo];
    let currentWeek = allDaysOfWeek.slice(0, dayOfWeek)


    const interpolatedValueForX = useRef(new Animated.Value(0)).current;

    const [points, setPoints] = useState('');

    const [currentDailyScore, setCurrentDailyScore] = useState(0);
    const [daysInRowVal, setDaysInRowVal] = useState(0);
    const [lastUpdateVal, setLastUpdateVal] = useState('');
    const [totalPointsVal, setTotalPointsVal] = useState(0);
    const [weeklyPointsVal, setWeeklyPointsVal] = useState(0);
    const [documentId, setDocumentId] = useState('tempid');

    const docRef = doc(db, "usersPoints", documentId);


    const usersIds = [
        {
            userName: 'piotrek',
            userId: 'HZM7dIZ33mewcrN70AigjvZmAKA3',
            key: 0
        },
        {
            userName: 'testing33',
            userId: 'XgSk3fUb3ZQJ0r6XoxnBi2tebDj1',
            key: 1
        },
        {
            userName: 'zorya',
            userId: 'FlZKA9bozsToVKnJyx9MTE47L1J3',
            key: 2
        },
        {
            userName: 'kvitka',
            userId: 'xFMsyK8sMZNIO2Nft002FOIgBMB2',
            key: 3
        },
        {
            userName: 'kalyna23',
            userId: 'LNJzO0RJ2qbTB0pm8B7Ub6FxRwU2',
            key: 4
        },
        {
            userName: 'blitzzz',
            userId: 'EBZVTJhQ8WQXmBzQ6PJqKP8EfqV2',
            key: 5
        },
        {
            userName: 'Guest571034',
            userId: 'VPcHRyaFILTAyskDB5auKFnWqcf1',
            key: 6
        },
        {
            userName: 'Guest654282',
            userId: 'YvoNGvr330ahPYfmSGcygiX2iH42',
            key: 7
        },
        {
            userName: 'duskfall',
            userId: 'wFFd1YUbboMIBIX2YzGaSYV1kTM2',
            key: 8
        },
        {
            userName: 'himmels',
            userId: 'VBHNP0cMyvUio5uT7yRkpBtP30C2',
            key: 9
        },
        {
            userName: 'polarlicht',
            userId: 'oELuWbizyFe2bxSTSVx5KTKBk4p1',
            key: 10
        },
        {
            userName: 'voidshell',
            userId: 'KsIqKGmIvndG5PrUISNau41MGWq2',
            key: 11
        }
    ]


    const xPositionDeg = interpolatedValueForX.interpolate({
        inputRange: [0, 360],
        outputRange: ["0deg", "180deg"]
    })



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
    
            navigation.navigate('profil');
        }, 800)
    }



    const getValue = async (id) => {


        const q = query(usersPointsCollection, where('userRef', '==', id))
        const querySnapshot = await getDocs(q);
        

        if (querySnapshot.empty) {
            
            
        } else {
        
            querySnapshot.forEach((doc) => {
            
                if (doc.data().lastUpdate !== today) {
                    setCurrentDailyScore(0);
                } else {
                    setCurrentDailyScore(doc.data().dailyPoints);
                }
                setDaysInRowVal(() => {
                    if (doc.data().lastUpdate !== today && doc.data().lastUpdate !== yesterday) {
                        return 0;
                    } else {
                        return doc.data().daysInRow
                    }
                })
                
                setTotalPointsVal(doc.data().totalPoints);
                setLastUpdateVal(doc.data().lastUpdate);
                setWeeklyPointsVal(doc.data().weeklyPoints);
                setDocumentId(doc.id);
            
            
            });
        }


    } 


    const updateValue = () => {
        
        let myNumericValue = 0;
        
        if (documentId != 'tempid') {
            

            if (points) {
                myNumericValue = parseInt(points, 10);
            } else {
                myNumericValue = Math.floor(Math.random() * (300 - 50 + 1) + 50);
                setPoints(myNumericValue)
            }
    
            
            console.log('adding value', myNumericValue);
    
    
    
            updateDoc(docRef, {
                dailyPoints: lastUpdateVal === new Date().toLocaleDateString() ? currentDailyScore + myNumericValue : myNumericValue,
                totalPoints: totalPointsVal + myNumericValue,
                weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + myNumericValue : myNumericValue,
                lastUpdate: new Date().toLocaleDateString(),
                daysInRow: currentDailyScore < pointsToScore && currentDailyScore + myNumericValue >= pointsToScore ? daysInRowVal + 1 : daysInRowVal
            })
            .then(docRef => {
            console.log("Points have been added to bot user");
            setPoints('');
            setDocumentId('tempid');
            })
            .catch(error => {
            console.log(error);
            setDocumentId('error');
            })
        }

        
        

        
    } 


    return(
        <View style={styles.mainContainer}>

            <Animated.View style={{...styles.iconXContainer, ...getTransform(25, 25, { rotate: xPositionDeg }, { translateX: 0 }, 0.5, 0.5)}}>
                <TouchableOpacity onPress={() => exitButton()}>
                    <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

                </TouchableOpacity>
            </Animated.View>


            <View style={styles.inputContainer}>

            <Input 
                placeholder='type number'
                keyboardType='numeric'
                value={points}
                onChangeText={(usersInput) => setPoints(usersInput)}/>
            </View>


            <View style={styles.dataContainer}>
                <Text>id: {documentId.slice(0, 15)}</Text>
                <Text>pts: {points}</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => updateValue()}>
                <Text>Add points</Text>
            </TouchableOpacity>

            <ScrollView style={styles.textContainer}>


                {usersIds.map((item) => {
                    return <View key={item.key} style={styles.userContainer}>
                        <Text style={styles.userText}>{item.userName}</Text> 
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => getValue(item.userId)}>
                                <Text>Choose</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                })}

                
            </ScrollView>
        </View>
    )
}

export default UsersScreen

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'grey'
    },
    iconXContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        left: screenWidth - 50,
        top: 50
    },
    textContainer: {
        width: '100%',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginTop: 100,
        width: '80%',
        paddingHorizontal: 20,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    btnContainer: {
        flexDirection: 'row'
    },
    btn: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginLeft: 20
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20
    }
  
})