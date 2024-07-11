import { View, Text, StyleSheet, Image, Dimensions, Animated, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from "@react-navigation/native";
import Loader from '../../components/other/Loader';
import useRevenueCat from '../../../hooks/useRevenueCat';
import Purchases from 'react-native-purchases';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ManageSubScreen = ({route}) => {

    const { language } = route.params;

    const navigation = useNavigation();


    
    const { currentOffering, customerInfo, isProMember, managementURL} = useRevenueCat();


    const [title1, setTitile1] = useState('How to Restore Your Subscription');
    const [title2, setTitile2] = useState('How to Cancel Your Subscription');
    const [text1, setText1] = useState('If you have previously purchased a subscription and do not have PRO access after reinstalling the app, you can restore your subscription by tapping on \'Restore purchases\'');
    const [text2, setText2] = useState('Tap on the \'Cancel Subscription\' button. You will be redirected to a page where you can manage your subscription.');
    const [btnRestoreTxt, setBtnRestoreTxt] = useState('Restore purchases');
    const [btnCancelTxt, setBtnCancelTxt] = useState('Cancel subscription');
    const [successTxt1, setSuccessTxt1] = useState('Success');
    const [successTxt2, setSuccessTxt2] = useState('Your purchase has been restored');
    const [errorTxt1, setErrorTxt1] = useState('Error');
    const [errorTxt2, setErrorTxt2] = useState('No purchases to restore');



    useEffect(() => {
      
        if (language === 'PL') {
            setTitile1('Jak przywrócić subskrypcję');
            setTitile2('Jak anulować subskrypcję');
            setText1('Jeśli wcześniej zakupiłeś subskrypcję i nie masz dostępu do PRO po ponownym zainstalowaniu aplikacji, możesz przywrócić subskrypcję, klikając „Przywróć zakupy”.');
            setText2('Naciśnij przycisk „Anuluj subskrypcję”. Zostaniesz przekierowany na stronę, gdzie możesz zarządzać swoją subskrypcją.');
            setBtnRestoreTxt('Przywróć zakupy');
            setBtnCancelTxt('Anuluj subskrypcję');
            setSuccessTxt1('Sukces');
            setSuccessTxt2('Twój zakup został przywrócony');
            setErrorTxt1('Błąd');
            setErrorTxt2('Brak zakupów do przywrócenia');
        } else if (language === 'DE') {
            setTitile1('Wie Sie Ihr Abonnement wiederherstellen');
            setTitile2('Wie Sie Ihr Abonnement kündigen');
            setText1('Wenn Sie zuvor ein Abonnement gekauft haben und nach der Neuinstallation der App keinen PRO-Zugang haben, können Sie Ihr Abonnement wiederherstellen, indem Sie auf „Einkäufe wiederherstellen“ tippen.');
            setText2('Tippen Sie auf die Schaltfläche „Abonnement kündigen“. Sie werden auf eine Seite weitergeleitet, auf der Sie Ihr Abonnement verwalten können.');
            setBtnRestoreTxt('Einkäufe wiederherstellen');
            setBtnCancelTxt('Abonnement kündigen');
            setSuccessTxt1('Erfolg');
            setSuccessTxt2('Ihr Kauf wurde wiederhergestellt');
            setErrorTxt1('Fehler');
            setErrorTxt2('Keine Einkäufe zum Wiederherstellen');
        } else if (language === 'LT') {
            setTitile1('Kaip atkurti prenumeratą');
            setTitile2('Kaip atšaukti prenumeratą');
            setText1('Jei anksčiau pirkote prenumeratą ir po programėlės įdiegimo iš naujo neturite PRO prieigos, galite atkurti savo prenumeratą bakstelėję „Atkurti pirkinius“.');
            setText2('Bakstelėkite mygtuką „Atšaukti prenumeratą“. Būsite nukreipti į puslapį, kuriame galėsite tvarkyti savo prenumeratą.');
            setBtnRestoreTxt('Atkurti pirkinius');
            setBtnCancelTxt('Atšaukti prenumeratą');
            setSuccessTxt1('Sėkmė');
            setSuccessTxt2('Jūsų pirkimas buvo atkurtas');
            setErrorTxt1('Klaida');
            setErrorTxt2('Nėra pirkinių, kuriuos būtų galima atkurti');
        } else if (language === 'AR') {
            setTitile1('كيفية استعادة اشتراكك');
            setTitile2('كيفية إلغاء اشتراكك');
            setText1('إذا كنت قد اشتريت اشتراكًا سابقًا وليس لديك وصول PRO بعد إعادة تثبيت التطبيق، يمكنك استعادة اشتراكك من خلال النقر على "استعادة المشتريات".');
            setText2('انقر على زر "إلغاء الاشتراك". سيتم إعادة توجيهك إلى صفحة حيث يمكنك إدارة اشتراكك.');
            setBtnRestoreTxt('استعادة المشتريات');
            setBtnCancelTxt('إلغاء الاشتراك');
            setSuccessTxt1('نجاح');
            setSuccessTxt2('تمت استعادة مشترياتك');
            setErrorTxt1('خطأ');
            setErrorTxt2('لا توجد مشتريات لاستعادتها');
        } else if (language === 'UA') {
            setTitile1('Як відновити вашу підписку');
            setTitile2('Як скасувати підписку');
            setText1('Якщо ви раніше придбали підписку і не маєте доступу до PRO після перевстановлення додатка, ви можете відновити підписку, натиснувши «Відновити покупки».');
            setText2('Натисніть кнопку «Скасувати підписку». Вас буде перенаправлено на сторінку, де ви можете керувати своєю підпискою.');
            setBtnRestoreTxt('Відновити покупки');
            setBtnCancelTxt('Скасувати підписку');
            setSuccessTxt1('Успіх');
            setSuccessTxt2('Вашу покупку відновлено');
            setErrorTxt1('Помилка');
            setErrorTxt2('Немає покупок для відновлення');
        } else if (language === 'ES') {
            setTitile1('Cómo restaurar tu suscripción');
            setTitile2('Cómo cancelar tu suscripción');
            setText1('Si anteriormente compraste una suscripción y no tienes acceso PRO después de reinstalar la aplicación, puedes restaurar tu suscripción tocando en "Restaurar compras".');
            setText2('Toca el botón "Cancelar suscripción". Serás redirigido a una página donde podrás gestionar tu suscripción.');
            setBtnRestoreTxt('Restaurar compras');
            setBtnCancelTxt('Cancelar suscripción');
            setSuccessTxt1('Éxito');
            setSuccessTxt2('Tu compra ha sido restaurada');
            setErrorTxt1('Error');
            setErrorTxt2('No hay compras para restaurar');
        } 
    
      
    }, [])
    


    const cancelSubscription = () => {


        if (managementURL) {

            Linking.openURL(managementURL);
        } else {
            Alert.alert('Error', 'Log in to App Store or Google play and cancel subscription there.');
        }
    }


    const restorePurchases = async () => {

        const purchaserInfo = await Purchases.restorePurchases();

        if (purchaserInfo.activeSubscriptions.length > 0) {
            Alert.alert(successTxt1, successTxt2);
            navigation.goBack();
        } else {
            Alert.alert(errorTxt1, errorTxt2);
        }
    }



    const exitButton = () => {
    
    
        navigation.goBack();
    
    };


    if (!customerInfo) {
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
        <View style={styles.contentContainer}>

            <Text style={styles.textCont2}>{title1}</Text>
            <Text style={styles.textCont3}></Text>
            <Text style={styles.textCont3}>{text1}</Text>
            <Text style={styles.textCont3}></Text>
            <Text style={styles.textCont2}>{title2}</Text>
            <Text style={styles.textCont3}></Text>
            <Text style={styles.textCont3}>{text2}</Text>
            
        </View>
            
        </View>

        <View style={styles.btnContainer}>
            
            <TouchableOpacity style={styles.btn} onPress={restorePurchases}>
                <Text style={styles.btnText}>{btnRestoreTxt}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={cancelSubscription}>
                <Text style={styles.btnText}>{btnCancelTxt}</Text>
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
        height: screenWidth + 35,
        justifyContent: 'flex-start',
        //backgroundColor: 'pink'
        alignItems: 'center'
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
        marginBottom: 30
    },
    textCont: {
        textAlign: 'center',
        //paddingLeft: 40,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: '500'
    },
    textCont2: {
        textAlign: 'center',
        //paddingLeft: 40,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 20
    },
    textCont3: {
        textAlign: 'center',
        //paddingLeft: 40,
        paddingBottom: 10,
        fontSize: 17,
        fontWeight: '400',
        paddingHorizontal: 20
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
        //backgroundColor: 'pink'
    }
})

export default ManageSubScreen