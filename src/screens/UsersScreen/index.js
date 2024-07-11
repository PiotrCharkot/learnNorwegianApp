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


    const formatDate = (date) => {
        const isoString = date.toISOString(); // Get the ISO string
        const [year, month, day] = isoString.split('T')[0].split('-'); // Extract year, month, and day
        return `${day}/${month}/${year}`; // Format the date as dd/MM/yyyy
    };

    let sixDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-6)));
    let fiveDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-5)));
    let fourDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-4)));
    let threeDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-3)));
    let twoDaysAgo = formatDate(new Date(new Date().setDate(new Date().getDate()-2)));
    let yesterday = formatDate(new Date(new Date().setDate(new Date().getDate()-1)));
    let today = formatDate(new Date());

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
            userName: 'Cryptowave',
            userId: '6erXeolvGlPwGMs9AN5HOm8cn492',
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
        },
        {
            userName: 'Solera',
            userId: 'eKtawIcqIxRz3UpfhlEIzLMC8Wz1',
            key: 12
        },
        {
            userName: 'Halocrypt',
            userId: 'Lx6Dtjkvq5fjzmihqBLZ7VH4l0W2',
            key: 13
        },
        {
            userName: 'sombra',
            userId: 'qezEQ719twh7bC86zJs201WYZns1',
            key: 14
        },
        {
            userName: 'Aukso',
            userId: 'qdp6mjMi6OVvowedjqpHSqWJbCd2',
            key: 15
        },
        {
            userName: 'nebulux',
            userId: 'L4XAAmzbINP5Mon1t4Kwep8meR73',
            key: 16
        },
        {
            userName: 'Juno Eclipse',
            userId: 'jKdVAif84xhz0ryVOCAMNFwzNs23',
            key: 17
        },
        {
            userName: 'Feuerwerk',
            userId: 'YxDpyRrBU8M9HoF9QpdKzMsOJFO2',
            key: 18
        },
        {
            userName: 'zima',
            userId: 'LasHJ9YGhLMtZkPimWaYybyCoYZ2',
            key: 19
        },
        {
            userName: 'Dubina',
            userId: 'VZPtCPFFuGTW5PHJs4gwNckoU8b2',
            key: 20
        },
        {
            userName: 'Daina',
            userId: '6EVQLYyvp4NXjWjojDEqIx4oYbr2',
            key: 21
        },
        {
            userName: 'Spellbound',
            userId: 'EfCuBDZlvSZq03z6XGTxUzzS4zL2',
            key: 22
        },
        {
            userName: 'Mimosa',
            userId: 'kkqIyNMJvKTEU71s3Z37ZQXxxNT2',
            key: 23
        },
        {
            userName: 'Chabry',
            userId: 'E1Z33VyWABbhKodydBKBqBuCccu2',
            key: 24
        },
        {
            userName: 'Geisterwolf',
            userId: 'wbclBxTpY5MMZBUrFqLObxmkU4g2',
            key: 25
        },
        {
            userName: 'Vilkas',
            userId: 'LMXKPVF46cZgTywInubbOvKNcz92',
            key: 26
        },
        {
            userName: 'Astrocore',
            userId: 'LA3DEVvFoRf9QrLHnYkWg5wLi9A2',
            key: 27
        },
        {
            userName: 'Usniak',
            userId: 'eLgL05rHspUeFinIFZFg0E9HFPu2',
            key: 28
        },
        {
            userName: 'Nebesa',
            userId: 'OonXUsYMlPgppxK1YzbhnMzOaAE2',
            key: 29
        },
        {
            userName: 'Lunarscape',
            userId: 'RpxYlAMIJLPmCjMkq19PTC7k3nD2',
            key: 30
        },
        {
            userName: 'Ambar',
            userId: '5pN8DGNndCZjkoYpB0jLn5yDbqA2',
            key: 31
        },
        {
            userName: 'Marea',
            userId: 'HQf974VYVuWqymt7CDR684VWaLv1',
            key: 32
        },
        {
            userName: 'Kalyna',
            userId: 'AwYXHybC7UeewmoiWAowP6vOpri1',
            key: 33
        },
        {
            userName: 'zima86',
            userId: 'Y76jyGLnEWhd7OXj8FVHydS5J8q2',
            key: 34
        },
        {
            userName: 'juno',
            userId: '0da0F32UHjXEHWMdXtoSdph04Co2',
            key: 35
        },
        {
            userName: 'Ionpulse',
            userId: 'z1jMxf2x9tToP5GLLljMiQ1kE803',
            key: 36
        },
        {
            userName: 'Wanderlust',
            userId: 'qscHk9zIbveUClSpfyWeIl7Ljvh2',
            key: 37
        },
        {
            userName: 'Emberveil',
            userId: 'gBKHxti5mwQkIrhuBb4gp9NNyC53',
            key: 38
        },
        {
            userName: 'Guest302749',
            userId: 'A9d1zZPzbdNq78WPLVQ06PY77xD2',
            key: 39
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
                dailyPoints: lastUpdateVal === formatDate(new Date()) ? currentDailyScore + myNumericValue : myNumericValue,
                totalPoints: totalPointsVal + myNumericValue,
                weeklyPoints: currentWeek.includes(lastUpdateVal) ? weeklyPointsVal + myNumericValue : myNumericValue,
                lastUpdate: formatDate(new Date()),
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