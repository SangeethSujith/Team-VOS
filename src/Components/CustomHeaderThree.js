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

export const CustomHeaderThree = (props) => {
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
                        color={COLORS.white}
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
        minHeight: 50,
        alignContent: 'center',
        backgroundColor: 'transparent',
    },
    container: {
        zIndex: 10,
        //justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        paddingHorizontal: 25,
        //borderBottomColor:COLORS.otp_bck,
        backgroundColor:'transparent'
        //borderWidth:1,
        //borderColor:COLORS.white
    },
    heading: {
        //fontFamily: "poppins",
        fontFamily : Fonts.font_400,
        fontSize:SIZES.verylarge,
        //fontStyle : 'normal',
        //textAlign:'center',
        //marginTop:heightPercentageToDP(.5),
        //fontSize: Theme.FONT_BIG,  
        //fontSize : Theme.FONT_TWNETY,
        marginLeft:30,
        color:COLORS.white,
      }  ,
    skip:{
        color:COLORS.gray_700,
        fontFamily:Fonts.font_800,
        fontSize:SIZES.medium
    }
})