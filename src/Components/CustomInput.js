import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../Styles/icons';
import { COLORS, Fonts, SIZES } from '../Styles/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';

export const CustomInput = (props) => {
  const [focus, setfocus] = useState(false);
  const { inputStyle,
    secureTextEntry,
    label,
    label1,
    label2,
    label3,
    type,
    placeholderText,
    onChangeText,
    value,
    errorMessage,
    keyboardType,
    maxLength,
    editable,
    onChangevalue,
    selectedValue,
    labelBG,
    childComponent,
    title,
    visible,
    setvisible,
    datePicker,
    onPressdate,
    icon,
    input,
    iconname,
    viewEmailInput,
    selectedvalue,
    ValueChange,
    width1,
    required } = props;




  const [showPassword, setShowPassword] = useState(true);
  //const [datePicker, setDatePicker] = useState(false);
  //const [date, setDate] = useState(new Date());

  const togglePasswordView = () => {
    setShowPassword(!showPassword)
  }
  //const [selectedLanguage, setSelectedLanguage] = useState();
  //const [open, setOpen] = useState(false);
  const [values, setValues] = useState(null);
  const [items, setItems] = useState([
    { label: 'Value1', value: 'apple' },
    { label: 'Value2', value: 'banana' }
  ]);
  {/*function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };*/}
  return (
    <>

      <View style={styles.container}>
        <View style={[styles.labelContainer, { backgroundColor: labelBG }]}>
          <Text style={[styles.label, {
            color: Boolean(errorMessage) ? 'red' : COLORS.primary,
          }]}>{label}</Text>
        </View>
        {type === 'text' &&
          <View style={[styles.textInput, {
            borderColor: Boolean(errorMessage) ? 'red' : COLORS.primary,
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
          }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name={iconname}
                size={SIZES.large}
                config={icoMoonConfigSet}
                style={{ color: 'grey', textAlignVertical: 'center', marginRight: 5 }}
              />
              <TextInput
                editable={editable}
                keyboardType={keyboardType}
                secureTextEntry={icon === true ? showPassword : secureTextEntry}
                placeholder={placeholderText}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxLength}
                color={COLORS.heading_black}
                underlineColorAndroid='transparent'
                style={{ fontSize: SIZES.medium, fontFamily: Fonts.font_400, width: iconname ? (icon ? '75%' : '100%') : '100%' }}
                placeholderTextColor={'grey'}
                onFocus={() => setfocus(true)}
                onBlur={() => setfocus(false)}
              />
            </View>
            {icon === true &&
              <TouchableOpacity onPress={() => togglePasswordView()}>
                <Icon
                  name={showPassword ? 'visibility_off' : 'visibility'}
                  size={19}
                  config={icoMoonConfigSet}
                  style={{ color: 'grey' }}
                />
              </TouchableOpacity>
            }
          </View>

        }
        {type === 'dropdown' &&

          <View style={[styles.textInput, {
            borderColor: Boolean(errorMessage) ? 'red' : COLORS.primary,
          }
          ]}>
            {/*<Text style={[styles.inputText, { color: COLORS.primary_black }]}>{placeholderText}</Text>
            <TouchableOpacity style={styles.dropdownIcon} onPress={() => setvisible(true)}>
              <Icon
                name={'arrow_drop_down'}
                size={29}
                config={icoMoonConfigSet}
                style={{ color: 'grey' }}
              />
            </TouchableOpacity>
           
           <DropDownPicker
                open={open}
                value={values}
                items={items}
                setOpen={setOpen}
                setValue={setValues}
                setItems={setItems}
                style={{borderColor:COLORS.primary  }}
                dropDownStyle={{backgroundColor: '#fff'}}
                containerStyle={{ }}
                labelStyle={{color:'grey'}}
            />*/}
            <Picker
              //ref={pickerRef}
              style={{ width: "100%" }}
              selectedValue={selectedvalue}
              itemStyle={{ color: COLORS.primary_black, fontSize: SIZES.medium }}
              onValueChange={ValueChange}
            >
              <Picker.Item label={label1} value="Bus" />
              <Picker.Item label={label2} value="Bike" />
              <Picker.Item label={label3} value="Train" />
            </Picker>
          </View>

        }
        {type === 'calender' &&
          <View style={[styles.textInput, {
            borderColor: Boolean(errorMessage) ? 'red' : COLORS.primary,
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
          }
          ]}>
            {/* <Text style={[styles.inputText, { color: COLORS.primary_black }]}>{input}</Text> */}
            {/* {datePicker === true &&
              <DateTimePicker
                //open={datePicker}
                value={value}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                //dateFormat="dd/MM/yyyy"
                onChange={onChangevalue}
                style={styles.datePicker}
              />} */}
            <TextInput
              editable={editable}
              keyboardType={keyboardType}
              secureTextEntry={icon === true ? showPassword : secureTextEntry}
              placeholder={placeholderText}
              onChangeText={onChangeText}
              value={value}
              maxLength={maxLength}
              color={COLORS.heading_black}
              underlineColorAndroid='transparent'
              style={{ fontSize: SIZES.medium, fontFamily: Fonts.font_400, width: iconname ? (icon ? '75%' : '100%') : 'auto' }}
              placeholderTextColor={'grey'}
              onFocus={() => setfocus(true)}
              onBlur={() => setfocus(false)}
            />
            <TouchableOpacity style={styles.dropdownIcon} onPress={onPressdate}
            >
              <Icon
                name={'calendar2'}
                size={19}
                config={icoMoonConfigSet}
                style={{ color: 'grey' }}
              />
            </TouchableOpacity>
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
    height: SIZES.button,
    //zIndex:1

  },
  label: {
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: -13,
    left: 10,
    padding: 5,
    zIndex: 50,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    height: '80%',

    //width:'100%'


  },
  inputText: {
    fontSize: SIZES.radius15,
    fontFamily: Fonts.font_500,
    color: '#6B7B8D',
    textAlignVertical: 'center',
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
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
})