import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../Styles/theme';


export const CustomLargeInput = (props) => {
  const [focus, setfocus] = useState(false);
  const { inputStyle,
    secureTextEntry,
    label,
    type,
    placeholderText,
    onChangeText,
    value,
    errorMessage,
    keyboardType,
    maxLength,
    editable,
    selectedValue,
    labelBG,
    childComponent,
    title,
    visible,
    setvisible,
    icon,
    iconname,
    viewEmailInput,
    required } = props;


  

  const [showPassword, setShowPassword] = useState(true);


  const togglePasswordView = () => {
    setShowPassword(!showPassword)
  }


  return (
    <>

      <View style={styles.container}>
        <View style={[styles.labelContainer, { backgroundColor: labelBG }]}>
          <Text style={[styles.label, {
            color: Boolean(errorMessage) ? 'red' : COLORS.primary,
          }]}>{label}</Text>
        </View>
        {type === 'text' &&
          <View style={[styles.textInput, { borderColor: Boolean(errorMessage) ? 'red' : COLORS.primary ,
                        flexDirection:'row',justifyContent:'space-between' }]}>
         
          <Icon
                name={iconname}
                size={15}
                config={icoMoonConfigSet}
                style={{ color: 'grey' ,textAlignVertical:'center',marginRight:5}}
          />
          <TextInput 
            editable={editable}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholderText}
            onChangeText={onChangeText}
            value={value}
            maxLength={100}
            color={'grey'}
            multiline={true}
            underlineColorAndroid='grey'
            placeholderTextColor={'grey'}
            onFocus={() => setfocus(true)}
            onBlur={() => setfocus(false)}
          />
           </View>
          }
      </View>
      {Boolean(errorMessage) ?
        <Text style={styles.error}>{errorMessage}</Text>
        : null}</>
  )
}





const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
    height: 75,
    
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.font_400 
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: -13,
    left:10,
    padding: 5,
    zIndex: 50,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: '80%',
    

  },
  inputText: {
    fontSize: 15,
    fontFamily: Fonts.font_500,
    color: '#6B7B8D',
    //textAlignVertical: 'top',
    height: '100%',
    width: '90%',
    
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropdownIcon: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    color: 'red',
    fontFamily: Fonts.font_500
  }
})