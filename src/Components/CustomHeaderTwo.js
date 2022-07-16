import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    Platform,
    Dimensions
} from 'react-native';
import { COLORS ,Fonts, SIZES } from '../Styles/theme';
import { Icon, icoMoonConfigSet } from '../Styles/icons';
import { NavigationContainer } from '@react-navigation/native';

export const CustomHeaderTwo = (props) => {
    const {
        heading ,
        onpress,
        iconname,
         } = props;
    return (
        <View style={[styles.headerWrapper]}>
            <View style={styles.container}>
                <TouchableOpacity 
                onPress={onpress}
                >
                    <Icon
                        name={'arrow-left2'}
                        //type='ionicon'
                        color={COLORS.gray_700}
                        size={SIZES.icon}
                        config={icoMoonConfigSet}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>{heading} </Text>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    headerWrapper: {
        height: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 70,
        minHeight: SIZES.image50,
        alignContent: 'center',
        backgroundColor: COLORS.white,
        elevation: 20,
        shadowColor: COLORS.black,
        
    },
    container: {
        zIndex: 10,
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        backgroundColor:'transparent'
    },
    heading: {
        fontFamily : Fonts.font_400,
        fontSize:SIZES.verylarge,
        marginLeft:SIZES.radius30,
        color:COLORS.primary_black,
      }  ,
    skip:{
        color:COLORS.gray_700,
        fontFamily:Fonts.font_800,
        fontSize:SIZES.medium
    }
})