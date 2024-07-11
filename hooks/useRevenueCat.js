import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { CustomerInfo, LOG_LEVEL, PurchasesOffering } from "react-native-purchases";
import { API_KEY_APPLE, API_KEY_GOOGLE } from '@env';


const APIKeys = {
    apple: API_KEY_APPLE,
    google: API_KEY_GOOGLE
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
                await Purchases.configure({ apiKey: APIKeys.google})
            } else if (Platform.OS == 'ios') {
                await Purchases.configure({ apiKey: APIKeys.apple})
            }

            const offerings = await Purchases.getOfferings();
            const customerInfo = await Purchases.getCustomerInfo();

            

            console.log('linkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk: ', customerInfo.managementURL);


            setCurrentOffering(offerings.current);
            setCustomerInfo(customerInfo);
            setManagementURL(customerInfo.managementURL);

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