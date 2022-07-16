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
import { DrawerActions } from '@react-navigation/native';
import { Icon, icoMoonConfigSet } from '../Styles/icons';

export const CustomHeader = (props) => {
    const {
        heading ,
        onpress,
        iconname
         } = props;
    return (
        <View style={[styles.headerWrapper]}>
            <View style={styles.container}>
                <TouchableOpacity 
                 onPress={onpress}
                >
                    <Icon
                        name={'menu'}
                        //type='ionicon'
                        color={COLORS.gray_700}
                        size={SIZES.icon}
                        config={icoMoonConfigSet}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>{heading} </Text>
                
                <TouchableOpacity >
                    <Icon
                        name={iconname}
                        //type='ionicon'
                        color={COLORS.gray_700}
                        size={SIZES.icon}
                        config={icoMoonConfigSet}
                    />
                </TouchableOpacity> 
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    headerWrapper: {
        height: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 70,
        minHeight: 50,
        alignContent: 'center',
        backgroundColor: COLORS.white,
        elevation: 20,
        shadowColor: COLORS.black,
        
    },
    container: {
        zIndex: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        paddingHorizontal: SIZES.ten,
        borderBottomColor:COLORS.otp_bck,
        borderWidth:1,
        borderColor:COLORS.white
    },
    heading: {
        //fontFamily: "poppins",
        fontFamily : Fonts.font_700,
        fontSize:SIZES.extralarge,
        //fontStyle : 'normal',
        //textAlign:'center',
        //marginTop:heightPercentageToDP(.5),
        //fontSize: Theme.FONT_BIG,  
        //fontSize : Theme.FONT_TWNETY,
        color:COLORS.primary_black,
      }  ,
    skip:{
        color:COLORS.gray_700,
        fontFamily:Fonts.font_800,
        fontSize:14
    }
})