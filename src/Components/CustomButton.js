import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {Fonts ,COLORS, SIZES} from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';


export const CustomButton = (props) => {
    const { 
        width1,
        height1,
        onPress,
        title,
        style,
        disabled,
        icon,
        titleStyle } = props;
    return (
        <TouchableOpacity
            //style={[styles.largeButtonContainer, style,{height:height1 || 45},{width:width1 || '100%'},
            //disabled && { borderColor: 'rgba(0,0,0,0.2' }
            //]}
            onPress={onPress}
            activeOpacity={.8}
            //disabled={disabled}
        >
        <LinearGradient colors={[ '#50C878','#009E60', COLORS.primary]}  
                        style={[styles.largeButtonContainer, 
                                style,
                                {height:height1 || SIZES.button},{width:width1 || '100%'},
            //disabled && { borderColor: 'rgba(0,0,0,0.2' }
            ]}>
           
                <Text style={[styles.largeButtonText, titleStyle,
                disabled && { color: COLORS.primary }
                ]}>{title}</Text>
                
                {/*{Boolean(icon) && InputIcon(icon)}*/}
           
        </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    largeButtonContainer: {
        borderRadius   : 5,
        justifyContent : 'center',
        alignItems     : 'center',
        borderColor    : COLORS.primary, 
        backgroundColor: COLORS.primary,
        marginVertical: 10,
        elevation: 4,
        shadowColor: 'black',

    },
    largeButtonText: {
        fontSize      : SIZES.medium,
        color         : 'white',
        //textAlign     : "center",
        //justifyContent: 'center',
        //alignSelf     : 'center',
        fontFamily    : Fonts.font_700
    },
    Buttonstyle: {
        //height        : '100%',
        //justifyContent: 'center',
        //alignItems    : 'center',
        borderRadius  : 15,
        flexDirection : 'row',
        
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },

});