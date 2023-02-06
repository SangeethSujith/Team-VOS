import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseDetails = ({ navigation, route }) => {
  const { param } = route.params;
  const [isksk, setisksk] = useState('');
  const [biketotal, setbiketotal] = useState('');
  useEffect(() => {
    fisksk();

    async function fisksk() {
      const userData = await AsyncStorage.getItem('User_Data');
      let Data = JSON.parse(userData);
      await setisksk(Data.IsISKOSK);
      await setbiketotal(isksk == 'ISK'
      ? JSON.stringify(
            parseFloat(param.ta_bike_km) * 2.9 +
            parseFloat(param.additional_km * 2.9, 10) +
            parseFloat(param.km_customer_to_hq * 2.9, 10),
        )
      : JSON.stringify(
            parseFloat(param.ta_bike_km) * 2.75 +
            parseFloat(param.additional_km * 2.75, 10) +
            parseFloat(param.km_customer_to_hq * 2.75, 10),
        ))
    }

  }, []);
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Expense Details'}
        onpress={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60, elevation: 25, justifyContent: 'center', }}>
        <Text style={styles.text2}>Expense Type : {param.expense_type} </Text>
        <Text style={styles.text2}>Date : {param.date} </Text>
        <Text style={styles.text2}>Town Visited : {param.town_visited} </Text>
        <Text style={styles.text2}>DA : {param.da} </Text>
        <Text style={styles.text2}>Travel Type : {param.travel_type} </Text>
        {param.travel_type !== "Bike" &&
          <Text style={styles.text2}>Fare : {param.ta_bus} </Text>
        }
        {param.travel_type == "Bike" &&
          <>
            <Text style={styles.text2}>Kilometer : {param.ta_bike_km} KM</Text>
            <Text style={styles.text2}>Additional KM : {param.additional_km} KM</Text>
            <Text style={styles.text2}>KM from Last Customer to HQ : {param.km_customer_to_hq} KM</Text>
            <Text style={styles.text2}>Bike Expenses : {biketotal} </Text>
          </>}
        <Text style={styles.text2}>Lodge : {param.lodge} </Text>
        <Text style={styles.text2}>Courier : {param.courier} </Text>
        <Text style={styles.text2}>Remarks : {param.remarks} </Text>
        <Text style={styles.text2}>Total : {param.total} </Text>

      </View>
    </View>
  )
}

export default ExpenseDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  custom: {
    // position: 'relative',
    // marginVertical: 10,
    // // padding:5,
    // height: SIZES.button,
    // borderRadius:5,
    borderColor: COLORS.primary,
    // // zIndex:1
    marginTop: 3,
    marginBottom: 4,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
    // position:'absolute'
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

  card: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    margin: 10,
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.verylarge,
    fontFamily: Fonts.font_500,
    marginBottom: 3,
    alignSelf: 'center',
  },
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_400,
    marginBottom: 10,
    //alignSelf:'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center',
    //marginVertical:15,
  },
  textInput: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    // position:'absolute',
    // height: '80%',

    //width:'100%'
  },
  plusbutton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    marginTop: 80,
    //justifyContent:'center',
    borderColor: 'white',
    borderWidth: 0.5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    marginTop: -80,
  },
  plus: {
    color: 'white',
    alignSelf: 'center',
    //textAlignVertical:'center',
    fontSize: 35,
  },
  checkboxrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.ten,
    justifyContent: 'space-evenly',
    height: SIZES.button,
    width: '100%',
    elevation: 6,
    borderRadius: 5,
    //borderColor:'grey',
    //borderWidth:1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
