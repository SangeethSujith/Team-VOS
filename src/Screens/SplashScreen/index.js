import React, { useState, useEffect } from 'react';
import {
    Text,
    View,StyleSheet,StatusBar,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Routes from '../../Route/route';
import { COLORS,SIZES,Fonts } from '../../Styles/theme';

//import { useSelector } from 'react-redux';
export default function SplashSceen({ }) {
    const [invisible, setinvisible] = useState(true);
    

    const hideSplashScreen = () => {
        setinvisible(false)
    }
    
                   
    useEffect(() => {
        //getUserToken();
        setTimeout(() => {
            hideSplashScreen();

        }, 2500);
        

    }, []);
    
    if (invisible) {
        return (
            <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:'#f0f0f0'}} >
                <StatusBar backgroundColor={'#f0f0f0'}/>
                    <Image
                        style={{resizeMode:'contain',alignSelf:'center',width:320 ,height:90}}
                        source={require('../../Assets/Images/namelogo.png')}
                    />
            </SafeAreaView>
        );
    }
    else {
        return (
            //getUserToken()
            <Routes />
        )
    }

}
    