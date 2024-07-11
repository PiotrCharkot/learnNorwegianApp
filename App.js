import { StatusBar } from 'expo-status-bar';
import Router from './src/navigation/Router';
import { enableScreens } from 'react-native-screens';
import { registerRootComponent } from 'expo';


enableScreens();
registerRootComponent(App);

export default function App() {
  return (
    <>
      <StatusBar
       
        barStyle='dark-content'
  
      />
      <Router />
    </>
  );
}

