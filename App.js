import React, { useEffect } from 'react';
import SplashSceen from './src/Screens/SplashScreen';
import { StatusBar } from 'react-native';
import { getToken } from './src/Apis/userServices'

export default function App() {
  useEffect(() => {
    getToken();
  }, []);
  return (
    <>
      <SplashSceen />
      {Platform.OS === 'android' && <StatusBar barStyle="dark-content" animated={true} />}
    </>
  );
}

