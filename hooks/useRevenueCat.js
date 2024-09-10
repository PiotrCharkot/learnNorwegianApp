import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesOffering } from "react-native-purchases";
import Constants from 'expo-constants';
import { EXPO_PUBLIC_API_KEY_APPLE, EXPO_PUBLIC_API_KEY_GOOGLE } from '@env';


const extra = Constants.expoConfig?.extra;

const APIKeys = {
    apple: extra?.EXPO_PUBLIC_API_KEY_APPLE,
    google: extra?.EXPO_PUBLIC_API_KEY_GOOGLE
};

const typesOfMembership = {
    monthly: 'pro'
}

function useRevenueCat() {

    const [currentOffering, setCurrentOffering] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [managementURL, setManagementURL] = useState(null);

    const isProMember = customerInfo?.entitlements.active.PremiumAccess;


    useEffect(() => {
      
        const fetchData = async () => {

            console.log('setting Purchases for RevenueCat');
            
            Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

            if (Platform.OS == 'android') {
                console.log('setting Purchases for android');
                await Purchases.configure({ apiKey: APIKeys.google})
            } else if (Platform.OS == 'ios') {
                await Purchases.configure({ apiKey: APIKeys.apple})
            }

            const offerings = await Purchases.getOfferings();
            const customerInfo = await Purchases.getCustomerInfo();


            setCurrentOffering(offerings.current);
            setCustomerInfo(customerInfo);
            setManagementURL(customerInfo.managementURL);

            console.log('cutomer info is: ', customerInfo);
            console.log('offerings in setup are: ', offerings.current);
        }
    

        fetchData().catch(console.error);
      
    }, []);



    useEffect(() => {
      
        const customerInfoUpdated = async (purchaserInfo) => {
            setCustomerInfo(purchaserInfo);
        }; 


        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated); 
    
      
    }, []);
    
    
    return { currentOffering, customerInfo, isProMember, managementURL }

}


export default useRevenueCat;