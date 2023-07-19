//import 'react-native-gesture-handler';
import React, { useState } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../Screens/SignIn';
const BeforeLoginCreator = createNativeStackNavigator();

function BeforeLoginStack({ navigation }) {
    return (
        <NavigationContainer>
            <BeforeLoginCreator.Navigator
                initialRouteName="SignIn" >
                <BeforeLoginCreator.Screen name="SignIn" component={SignIn}
                    options={{
                        header: () => null,
                        transitionSpec: {
                            open: config,
                            close: config,
                        },
                    }}
                />
            </BeforeLoginCreator.Navigator>
        </NavigationContainer>
    )
}




const config = {
    animation: 'spring',
    config: {
        stiffness: 100000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};



export default function BeforLogin() {
    return (

        <BeforeLoginStack />

    )
}