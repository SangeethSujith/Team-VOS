import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import {Fonts ,COLORS,SIZES} from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';


export const CustomPlusbutton = (props) => {
    const { 
        onPress,
        style
     } = props;
    return (
       
        <TouchableOpacity onPress={onPress} style={styles.plusbutton}>
        <LinearGradient colors={[ '#50C878','#009E60', COLORS.primary]} style={style} >
                <Text style={styles.plus}>
                  +
                </Text>
        </LinearGradient>
        </TouchableOpacity>
       
    )
}




const styles = StyleSheet.create({
    plus:{
        color:'white',
        alignSelf:'center',
        //textAlignVertical:'center',
        fontSize:35,
      },
      plusbutton:{
        //height:SIZES.plusbutton,
        //width:SIZES.plusbutton,
        //borderRadius:SIZES.radius30,
        overflow:'hidden',
        alignSelf:'flex-end',
        //backgroundColor:'green',
        //marginTop:80,
        //justifyContent:'center',
        //borderColor:'white',
        //borderWidth:.5,
        //elevation: 20,
        //shadowColor: 'black',
        //justifyContent:'center',
        marginTop:-SIZES.profile,
        
      },
});