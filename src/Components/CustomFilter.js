import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Fonts, COLORS, SIZES } from '../Styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { CustomInput } from './CustomInput';
import { CustomButton } from './CustomButton';
import { CustomButtonTwo } from './CustomButtonTwo';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


export const CustomFilter = (props) => {
  const {
    onPress,
    style,
    value1,
    value2,
    text1,
    text2,
    condition2,
    onChangevalue1,
    condition1,
    onChangevalue2,
    onPressdate1,
    onPressdate2,
    PickerVisible,
    PickerVisibletrue,
    PickerVisiblefalse,
    datePicker1,
    datePicker2
  } = props;
  //const [PickerVisible, setPickerVisible] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [date1, setDate1] = useState(new Date(Date.now()));

  const onPress1 = () => {
    console.log('filter')
  };


  return (
    <View style={styles.plusbutton}>
      <TouchableOpacity onPress={PickerVisibletrue} activeOpacity={.7}>
        <Text style={styles.plus}>
          Filter
        </Text>
      </TouchableOpacity>
      <Modal isVisible={PickerVisible}
        onBackdropPress={PickerVisiblefalse}
        backdropOpacity={0.5}
        swipeDirection={'up'}
        style={styles.modalView}
        backdropTransitionOutTiming={0} >
        <View style={styles.modalStyle}>
          <View style={{ margin: 20 }}>
            <Text style={styles.filter}>Filter By Date</Text>
            <CustomInput
              type='calender'
              label='Start Date'
              labelBG='white'
              placeholderText='Select Start Date            '
              value={text1}
              //onPressdate={() => setIsPickerShow(true)}
              //input={text1}
              //onChangevalue={onChangevalue1}
              onPressdate={onPressdate1}
            //datePicker={datePicker1}
            />
            {condition1 && (
              <DateTimePicker
                value={value1}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onChangevalue1}
                style={styles.datePicker}
              />
            )}
            <CustomInput
              type='calender'
              label='End Date'
              labelBG='white'
              placeholderText='Select End Date'
              value={text2}
              onPressdate={onPressdate2}
            />
            {condition2 && (
              <DateTimePicker
                value={value2}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onChangevalue2}
                style={styles.datePicker}
              />
            )}
            <View style={styles.buttonrow}>
              <CustomButtonTwo
                title={'Cancel'}
                width1={SIZES.image210}
                onPress={PickerVisiblefalse}
              />
              <CustomButton
                title={'Apply'}
                width1={SIZES.image210}
                onPress={onPress}
              />
            </View>

          </View>
        </View>
      </Modal>
    </View>
  )
}




const styles = StyleSheet.create({
  plus: {
    //color:COLORS.white,
    color: COLORS.primary_black,
    alignSelf: 'center',
    fontFamily: Fonts.font_500,
    //textAlignVertical:'center',
    fontSize: SIZES.large,
  },
  filter: {
    color: COLORS.black,
    marginVertical: 20,
    //alignSelf:'center',
    fontFamily: Fonts.font_600,
    //textAlignVertical:'center',
    fontSize: SIZES.large,
  },
  plusbutton: {
    height: 40,
    width: '100%',
    //borderRadius:SIZES.radius30,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: '#D1F4D1',
    //backgroundColor:COLORS.primary,
    //marginTop:80,
    //justifyContent:'center',
    //borderColor:'white',
    //borderWidth:.5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    //marginTop:-SIZES.profile,
    //marginHorizontal:25,
    //marginBottom:25 

  },
  modalStyle: {
    height: '40%',
    width: '100%',
    alignSelf: 'baseline',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius25
  },
  modalView: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop:5
  },
});