import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {Fonts ,COLORS, SIZES} from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';


export const CustomButtonTwo = (props) => {
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
            activeOpacity={0.5}
            //disabled={disabled}
        >
        <View style={[styles.largeButtonContainer, style,{height:height1 || SIZES.button},{width:width1 || '100%'},
            //disabled && { borderColor: 'rgba(0,0,0,0.2' }
            ]}>
            <View style={styles.Buttonstyle}> 
                <Text style={[styles.largeButtonText, titleStyle,
                disabled && { color: COLORS.primary }
                ]}>{title}</Text>
                <Text>   </Text>
                {/*{Boolean(icon) && InputIcon(icon)}*/}
            </View>
        </View>
        </TouchableOpacity>
    )
}




const styles = StyleSheet.create({
    largeButtonContainer: {
        //backgroundColor: 'white',
        //width          :{width},
        borderWidth    : .5,
        //height         : {height},
        borderRadius   : 5,
        justifyContent : 'center',
        alignItems     : 'center',
        //marginTop      : '3%',
        //margin         : '3%',
        borderColor:'transparent',
        borderBottomColor    : '#b2b8b4', 
        borderRightColor:'#b2b8b4',
        backgroundColor: COLORS.white,
        marginVertical: 10,
        elevation: 20,
        shadowColor: 'black',

    },
    largeButtonText: {
        fontSize      : SIZES.medium,
        color         : COLORS.primary,
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