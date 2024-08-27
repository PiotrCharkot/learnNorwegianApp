import { View, Text, StyleSheet, Image, Dimensions, Animated, ScrollView, TouchableOpacity, Alert} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Loader from '../../components/other/Loader';
import useRevenueCat from '../../../hooks/useRevenueCat';
import Purchases from 'react-native-purchases';
import { db } from '../../../firebase/firebase-config'
import { getAuth } from "firebase/auth";
import { authentication } from '../../../firebase/firebase-config';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Paywall = ({route}) => {

    const navigation = useNavigation();

    const { language } = route.params;

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;

    
    const { currentOffering, customerInfo, isProMember} = useRevenueCat();
    const [underPurchaseProcess, setUnderPurchaseProcess] = useState(false);

    const [title, setTitile] = useState('Unlock premium content and access all exclusive features!');
    const [subtitle1, setSubtitile1] = useState('Interactive exercises');
    const [subtitle2, setSubtitile2] = useState('Customizable flashcards');
    const [subtitle3, setSubtitile3] = useState('Detailed grammar guides');
    const [subtitle4, setSubtitile4] = useState('Reading practice');
    const [text1, setText1] = useState('Engage with varied exercises.');
    const [text2, setText2] = useState('Explore flashcards from A1 to C2 levels with usage examples and audio.');
    const [text3, setText3] = useState('Dive into detailed, step-by-step explanations of grammar concepts.');
    const [text4, setText4] = useState('Read texts at different difficulty levels with handy expressions.');
    const [btnPurchaseTxt, setBtnPurchaseTxt] = useState('month');
    const [btnRestoreTxt, setBtnRestoreTxt] = useState('Restore purchases');
    const [successTxt1, setSuccessTxt1] = useState('Success');
    const [successTxt2, setSuccessTxt2] = useState('Your purchase has been restored');
    const [errorTxt1, setErrorTxt1] = useState('Error');
    const [errorTxt2, setErrorTxt2] = useState('No purchases to restore');
    const [documentId, setDocumentId] = useState('tempid');


    const userPoints = collection(db, "usersPoints");
    const docRef = doc(db, "usersPoints", documentId);


    const handleMonthlyPurchase = async () => {
        if (!currentOffering?.monthly) return;


        setUnderPurchaseProcess(true);

        const purchaseInfo = await Purchases.purchasePackage(currentOffering.monthly);

        console.log('Monthly subscription is purchased: ', purchaseInfo.customerInfo.entitlements.active);

        if (purchaseInfo.customerInfo.entitlements.active.PremiumAccess) {
            
            updateProVal();
            setUnderPurchaseProcess(false);
            navigation.goBack();
        }
    };


    const restorePurchases = async () => {

        const purchaserInfo = await Purchases.restorePurchases();

        if (purchaserInfo.activeSubscriptions.length > 0) {

            Alert.alert(successTxt1, successTxt2);
            navigation.goBack();
        } else {
            Alert.alert(errorTxt1, errorTxt2);
        }
    }


    const updateProVal = async () => {

        await updateDoc(docRef, {
            userIsPro: true
        })
        .then(docRef => {
            console.log('user pro value is updated to => true');
        })
        .catch(error => {
            console.log(error);
        })

    }


    const exitButton = () => {
    
    
        navigation.goBack();
    
    };



    useEffect(() => {


        //console.log('current offerings are: ', currentOffering);
      
        if (language === 'PL') {
            setTitile('Odblokuj treści premium');
            setSubtitile1('Interaktywne ćwiczenia');
            setSubtitile2('Konfigurowalne fiszki');
            setSubtitile3('Szczegółowe przewodniki gramatyczne');
            setSubtitile4('Ćwiczenia w czytaniu');
            setText1('Weź udział w różnorodnych ćwiczeniach.');
            setText2('Odkrywaj fiszki od poziomu A1 do C2 z przykładami użycia i nagraniami audio.');
            setText3('Ucz się szczegółowych zagadnień gramatycznych krok po kroku.');
            setText4('Czytaj teksty na różnych poziomach trudności z przydatnymi wyrażeniami.');
            setBtnPurchaseTxt('miesiąc');
            setBtnRestoreTxt('Przywróć zakupy');
            setSuccessTxt1('Sukces');
            setSuccessTxt2('Twój zakup został przywrócony');
            setErrorTxt1('Błąd');
            setErrorTxt2('Brak zakupów do przywrócenia');
        
        } else if (language === 'DE') {
            setTitile('Premium-Inhalte freischalten');
            setSubtitile1('Interaktive Übungen');
            setSubtitile2('Anpassbare Karteikarten');
            setSubtitile3('Detaillierte Grammatikleitfäden');
            setSubtitile4('Leseübungen');
            setText1('Nehmen Sie an verschiedenen Übungen teil.');
            setText2('Erkunden Sie Karteikarten von A1 bis C2 mit Anwendungsbeispielen und Audio.');
            setText3('Lernen Sie detaillierte Grammatik-Konzepte Schritt für Schritt.');
            setText4('Lesen Sie Texte auf unterschiedlichen Schwierigkeitsgraden mit nützlichen Ausdrücken.');
            setBtnPurchaseTxt('Monat');
            setBtnRestoreTxt('Einkäufe wiederherstellen');
            setSuccessTxt1('Erfolg');
            setSuccessTxt2('Ihr Kauf wurde wiederhergestellt');
            setErrorTxt1('Fehler');
            setErrorTxt2('Keine Einkäufe zum Wiederherstellen');
        } else if (language === 'LT') {
            setTitile('Atrakinkite aukščiausios kokybės turinį');
            setSubtitile1('Interaktyvūs pratimai');
            setSubtitile2('Pritaikomos kortelės');
            setSubtitile3('Išsamūs gramatikos vadovai');
            setSubtitile4('Skaitymo praktika');
            setText1('Dalyvaukite įvairiuose pratimuose.');
            setText2('Atraskite korteles nuo A1 iki C2 lygio su vartojimo pavyzdžiais ir garso įrašais.');
            setText3('Mokykitės išsamių gramatikos koncepcijų žingsnis po žingsnio.');
            setText4('Skaitykite tekstus įvairiais sudėtingumo lygiais su naudingomis frazėmis.');
            setBtnPurchaseTxt('mėnuo');
            setBtnRestoreTxt('Atkurti pirkinius');
            setSuccessTxt1('Sėkmė');
            setSuccessTxt2('Jūsų pirkimas buvo atkurtas');
            setErrorTxt1('Klaida');
            setErrorTxt2('Nėra pirkinių, kuriuos būtų galima atkurti');
        } else if (language === 'AR') {
            setTitile('افتح المحتوى المميز');
            setSubtitile1('تمارين تفاعلية');
            setSubtitile2('بطاقات تعليمية قابلة للتخصيص');
            setSubtitile3('أدلة نحوية مفصلة');
            setSubtitile4('ممارسة القراءة');
            setText1('شارك في مجموعة متنوعة من التمارين.');
            setText2('استكشف البطاقات التعليمية من مستوى A1 إلى C2 مع أمثلة على الاستخدام والصوت.');
            setText3('تعلم مفاهيم القواعد التفصيلية خطوة بخطوة.');
            setText4('اقرأ نصوصًا بمستويات صعوبة مختلفة مع عبارات مفيدة.');
            setBtnPurchaseTxt('شهر');
            setBtnRestoreTxt('استعادة المشتريات');
            setSuccessTxt1('نجاح');
            setSuccessTxt2('تمت استعادة مشترياتك');
            setErrorTxt1('خطأ');
            setErrorTxt2('لا توجد مشتريات لاستعادتها');
        } else if (language === 'UA') {
            setTitile('Відкрийте преміум-контент');
            setSubtitile1('Інтерактивні вправи');
            setSubtitile2('Налаштовувані картки');
            setSubtitile3('Детальні граматичні посібники');
            setSubtitile4('Практика читання');
            setText1('Беріть участь у різноманітних вправах.');
            setText2('Досліджуйте картки від рівня A1 до C2 з прикладами використання та аудіо.');
            setText3('Вивчайте детальні граматичні концепції крок за кроком.');
            setText4('Читайте тексти різних рівнів складності з корисними виразами.');
            setBtnPurchaseTxt('місяць');
            setBtnRestoreTxt('Відновити покупки');
            setSuccessTxt1('Успіх');
            setSuccessTxt2('Вашу покупку відновлено');
            setErrorTxt1('Помилка');
            setErrorTxt2('Немає покупок для відновлення');
        } else if (language === 'ES') {
            setTitile('Desbloquea contenido premium');
            setSubtitile1('Ejercicios interactivos');
            setSubtitile2('Tarjetas personalizables');
            setSubtitile3('Guías de gramática detalladas');
            setSubtitile4('Práctica de lectura');
            setText1('Participa en una variedad de ejercicios.');
            setText2('Explora tarjetas desde niveles A1 hasta C2 con ejemplos de uso y audio.');
            setText3('Aprende conceptos gramaticales detallados paso a paso.');
            setText4('Lee textos en diferentes niveles de dificultad con expresiones útiles.');
            setBtnPurchaseTxt('mes');
            setBtnRestoreTxt('Restaurar compras');
            setSuccessTxt1('Éxito');
            setSuccessTxt2('Tu compra ha sido restaurada');
            setErrorTxt1('Error');
            setErrorTxt2('No hay compras para restaurar');
        } 
    
      
    }, [])


    useEffect(() => {


        const getDataFb = async () => {
            
            const q = query(userPoints, where('userRef', '==', userId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
            
                setDocumentId(doc.id);
            
            })
        }
        
        
        
        
        
        getDataFb();
      
    
      return () => {
        getDataFb;
      }
    }, [])
    


    if (!currentOffering || underPurchaseProcess) {
        return (
            <Loader />
        );
    }
    

  return (
    <ScrollView style={styles.mainContainer}>
        <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={require('../../../assets/logo3NoBackground.png')} />
        </View>
        <View style={styles.head}>
            <TouchableOpacity onPress={() => exitButton()}>
                <Image style={{...styles.iconX}} source={require('../../../assets/close.png')} />

            </TouchableOpacity>
        </View>
        
        <View style={styles.infoContainer}>

            <Text style={styles.textTitle} allowFontScaling={false}>{title}</Text>

            
            <View style={styles.contentContainer}>

                
                    <View style={styles.textRowCont}>
                        <Image style={styles.smallImg} source={require('../../../assets/exercise.png')}/>
                        <Text style={styles.textCont} allowFontScaling={false}>{subtitle1}</Text>
                    </View>
                        <Text style={styles.textCont3} allowFontScaling={false}>{text1}</Text>

                    <View style={styles.textRowCont}>
                        <Image style={styles.smallImg} source={require('../../../assets/flashcard.png')}/>
                        <Text style={styles.textCont} allowFontScaling={false}>{subtitle2}</Text>
                    </View>
                        <Text style={styles.textCont3} allowFontScaling={false}>{text2}</Text>

                    <View style={styles.textRowCont}>
                        <Image style={styles.smallImg} source={require('../../../assets/learn.png')}/>
                        <Text style={styles.textCont} allowFontScaling={false}>{subtitle3}</Text>
                    </View>
                        <Text style={styles.textCont3} allowFontScaling={false}>{text3}</Text>

                    <View style={styles.textRowCont}>
                        <Image style={styles.smallImg} source={require('../../../assets/openBook.png')}/>
                        <Text style={styles.textCont} allowFontScaling={false}>{subtitle4}</Text>
                    </View>
                        <Text style={styles.textCont3} allowFontScaling={false}>{text4}</Text>

                    
            </View>
        </View>

        <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={handleMonthlyPurchase}>
                <Text style={styles.btnText} allowFontScaling={false}>{currentOffering.monthly?.product.priceString} / {btnPurchaseTxt}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.restoreBtn} onPress={restorePurchases}>
                <Text style={styles.restoreBtnText} allowFontScaling={false}>{btnRestoreTxt}</Text>
            </TouchableOpacity>
        </View>

        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        
    },
    infoContainer: {
        flex: 1,
        width: '100%',
        height: screenWidth + 85,
        justifyContent: 'flex-start',
        //backgroundColor: 'pink'
        //alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    btn: {
        width: screenWidth - 80,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007FFF',
        marginBottom: 20
    },
    btnText: {
        color: 'white',
    },
    head: {
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    iconX: {
        height: 25,
        width: 25,
        tintColor: 'grey'
    },
    logoContainer: {
        position: 'absolute',
        top: 100,
    },
    logoImg: {
        height: screenWidth,
        width: screenWidth,
        opacity: 0.2
    },
    textTitle: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50,
        paddingHorizontal: 20,
        color: '#007FFF',
    },
    textCont: {
        //textAlign: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: '500',
        
    },
    textRowCont: {
        flexDirection: 'row',
        paddingLeft: 35,
    },
    smallImg: {
        height: 25,
        width: 25,
        tintColor: '#025bb5'
    },
    textCont2: {
        textAlign: 'center',
        //paddingLeft: 40,
        paddingBottom: 10,
        fontSize: 23,
        fontWeight: '500'
    },
    textCont3: {
        textAlign: 'left',
        paddingBottom: 10,
        paddingLeft: 70,
        paddingRight: 22,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: '500',
        color: '#404040',
    },
    contentContainer: {
        //backgroundColor: 'salmon'
    },
    restoreBtn: {

    },
    restoreBtnText: {
        color: '#007FFF',
        textDecorationLine: 'underline',
        textDecorationColor: '#007FFF',
        fontSize: 14,
        marginBottomBottom: 80,
    },
})

export default Paywall