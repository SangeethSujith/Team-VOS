import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SAVE_EXP, BASE_URL } from '../../Apis/SecondApi';
import { LoaderTwo, LoaderThree } from '../../Components/Loader';
import axios from 'axios';
import qs from 'qs';
import DropDownPicker from 'react-native-dropdown-picker';
//import {Cust}

const Expenses = ({ navigation, route }) => {
  const { param } = route.params;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [state, setstate] = useState('')
  const [date, setDate] = useState(param !== '' ? new Date(param.date) : new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);
  
  const [loader, setloader] = useState(false)
  useEffect(() => {
    getRoutes()
  }, []);
  const onChange = (event, value) => {
    setDate(value);
    // const route = state.filter((item) => item.date == moment(date).format("YYYY-MM-DD"))
    // console.log(route)
    // if (route.length > 0) {
    //   console.log(route[0].route_name)
    //   setroute(route[0].route_name)
    // }
    // else {
    //   setroute('no routes')
    // }
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  async function getRoutes() {
    //uploadBusinessImage = async () => {
      setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
      //console.log(Data.Userid);

    const data = new FormData();
    //data.append('logo', this.state.image);
    data.append('user_id', Data.Userid);
    var config = {
      method: 'POST',
      url: 'https://ayurwarecrm.com/demo/ajax/get_routes',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(state);
        setloader(false)
        const dropdata = response.data.routes.map(item => ({
          label: item.route_name,
          value: item.route_id
        }))
        // console.log(dropdata);
        setstate(dropdata)
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
    };
  const [input, setinput] = useState({
    date: param !== '' ? param.date : '',
    route: '',
    town: param !== '' ? param.town_visited : '',
    da: param !== '' ? param.da : '250',
    kilomtr: param !== '' ? param.tabike_km : '0', type: '',
    fare: param !== '' ? param.ta_bus : '0',
    bikeexp: param !== '' ? param.ta_bike_amount : '0',
    addtnl: param !== '' ? param.additional_km : '0',
    lodge: param !== '' ? param.lodge : '0', courier: param !== '' ? param.courier : '0',
    sundries: param !== '' ? param.sundries : '0',
    remarks: param !== '' ? param.remarks : '',
    total: '0', Custmr_Hq: param !== '' ? param.km_customer_to_hq : '0'
  })
  const PostSave = async () => {
    console.log('inside')
    const Route = await AsyncStorage.getItem('Routes');
    let route = JSON.parse(Route)
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      user_id: Data.Userid,
      route_id: route[0].route_id,
      date: moment(date).format("YYYY-MM-DD"),
      expense_type: isSelected ? 'Route' : (isSelected ? 'Meeting' : 'Task'),
      // task_id: 0,
      route_id:value,
      town_visited: input.town,
      da: input.da,
      // //ta:100,
      ta_type: 'monthly',
      ta_bus: input.fare,
      ta_bike_km: input.kilomtr,
      ta_bike_amount: input.bikeexp,
      lodge: input.lodge,
      courier: input.courier,
      sundries: input.sundries,
      additional_km: input.addtnl,
      remarks: input.remarks,
      total: JSON.stringify(parseInt(input.da, 10) + parseInt(input.courier, 10) + parseInt(input.lodge, 10) + parseInt(input.sundries, 10) +
        parseInt(input.bikeexp, 10) + parseInt(input.kilomtr * 2.9, 10) + parseInt(input.addtnl * 2.9, 10) + parseInt(input.Custmr_Hq * 2.9, 10)),
      created_date: moment().format("YYYY-MM-DD"),
      modified_date: moment().format("YYYY-MM-DD"),
      status: 'Saved',
      km_customer_to_hq: input.Custmr_Hq,
      // is_approved_by_asm:1,
      // asm_comment:fine,
      // is_approved_by_sm:1,
      // sm_comment:Fine,
      // is_approved_by_zsm:1,
      // zsm_comment:fine,is_approved_by_rsm:1,
      // rsm_comment:fine,
      // app_version:1
    }
    console.log(posts)
    setloader(true);
    axios.post(`${BASE_URL}/${SAVE_EXP}`, qs.stringify(posts)).then(async (response) => {
      if (response.status == 200) {
        setloader(false);
        Alert.alert(
          "Saved Successfully ", '',
          [
            {
              text: "Yes",
              cancelable: true,
              onPress: () => navigation.navigate('Home'),
              style: "cancel",
            }],
        );
      }
      else {
        setloader(false);
        Alert.alert(
          "Failed Saving Expenses, Try Again")
      }
    }
    ).catch((err) => {
      console.log(err)
    });

  }

  // const [state, setstate] = useState({
  //   data: [{ id: 1, name: 'Elaj ayrvedic clinic', date: '26/08/2022', address: 'Hospital_Cr', place: 'Calicut , hjfhkerh', visited: true },
  //   { id: 2, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 3, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut ,hkdfghgbved', visited: true },
  //   { id: 4, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 5, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 6, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 7, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 8, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 9, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 10, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 11, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 12, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 13, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 14, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
  //   { id: 15, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true }]
  // })
  const [isSelected, setSelection] = useState(true);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(true);
  const [isSelected5, setSelection5] = useState(false);
  const [isSelected6, setSelection6] = useState(false);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView behavior={"position"}
        contentContainerStyle={{ flexGrow: 1, }}
        enableOnAndroid={Platform.OS === 'android'}
        enableAutomaticScroll={true} >
        <CustomHeaderTwo
          heading={'Expenses'}
          onpress={() => navigation.goBack()}
        />
        {state !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <Text style={styles.text2}>{'Expense Type'}</Text>
          <View style={styles.checkboxrow}>
            <View style={styles.row}>
              <CheckBox
                value={isSelected}
                onValueChange={() => (setSelection(true), setSelection2(false), setSelection3(false))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>Route</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected2}
                onValueChange={() => (setSelection2(true), setSelection(false), setSelection3(false))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>Meeting</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected3}
                onValueChange={() => (setSelection3(true), setSelection2(false), setSelection(false))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>Task</Text>
            </View>
          </View>
          <CustomInput
            type='calender'
            label='Date'
            labelBG='white'
            placeholderText='22/04/2022'
            onPressdate={() => setIsPickerShow(true)}
            value={moment(date).format("YYYY-MM-DD")}
          //datePicker={true}
          //icon={true}
          //iconname='location'
          />
          {isPickerShow && (
            <DateTimePicker
              value={date}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onChange}
              style={styles.datePicker}
            />
          )}
            {isSelected==true? 
              <View style={styles.custom}>
        <View style={[styles.labelContainer, { backgroundColor: '#fff'}]}>
          <Text style={[styles.label, {
            color: COLORS.primary,
          }]}>Routes</Text>
        </View>
              <DropDownPicker
      open={open}
      value={value}
      items={state}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="MODAL"
      modalProps={{
  animationType: "fade",
}}
      placeholderStyle={{
  color: "grey", fontSize: SIZES.medium, fontFamily: Fonts.font_400,
}}

dropDownContainerStyle={{
  backgroundColor: "#fff",borderColor:'#fff',
}}
      style={{borderColor:'#fff',}}
    />
</View>
          :
          <></>
          }
          <CustomInput
            type='text'
            //keyboardType='numeric'
            label='Town Visited'
            labelBG='white'
            placeholderText='Enter Town Visited'
            value={input.town}
            onChangeText={(text) => {
              setinput({ ...input, town: text })
            }}
          //iconname='location'

          />
          <Text style={styles.text2}>{'DA'}</Text>
          <View style={styles.checkboxrow}>
            <View style={styles.row}>
              <CheckBox
                value={isSelected4}
                onValueChange={() => (setSelection4(true), setSelection5(false),
                  setSelection6(false), setinput({ ...input, da: '250' }))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>OS</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected5}
                onValueChange={() => (setSelection4(false), setSelection5(true),
                  setSelection6(false), setinput({ ...input, da: '175' }))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>HQ</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected6}
                onValueChange={() => (setSelection4(false), setSelection5(false),
                  setSelection6(true), setinput({ ...input, da: '200' }))}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>EX-HQ</Text>
            </View>
          </View>
          <CustomInput
            type='text'
            label='Da'
            labelBG='white'
            placeholderText='250.00            '
            value={input.da}

          //iconname='location'

          />
          <CustomInput
            type='dropdown'
            label='Select Travel Type'
            labelBG='white'
            placeholderText='Bus'
            label1='Bus'
            label2='Bike'
            selectedvalue={input.type}
            ValueChange={(itemValue, itemIndex) =>
              setinput({ ...input, type: itemValue })
            }
            keyboardType='numeric'
          //icon={true}
          //iconname='location'

          />
          {input.type !== 'js' &&
            <CustomInput
              type='text'
              keyboardType='numeric'
              label={'Fare'}
              labelBG='white'
              placeholderText='0       '
              value={input.fare}
              onChangeText={(text) => {
                setinput({ ...input, fare: text })
              }}
            //iconname='location'

            />}
          {input.type == 'js' &&
            <View>
              <CustomInput
                type='text'
                keyboardType='numeric'
                label={'Kilometer'}
                labelBG='white'
                placeholderText='0       '
                value={input.kilomtr}
                onChangeText={(text) => {
                  setinput({ ...input, kilomtr: text })
                }}
              //iconname='location'

              />
              <CustomInput
                type='text'
                label='Bike Expenses'
                labelBG='white'
                placeholderText='0.0     '
                value={input.bikeexp}
                onChangeText={(text) => {
                  setinput({ ...input, bikeexp: text })
                }}
                keyboardType='numeric'
              //iconname='location'

              />
              <CustomInput
                type='text'
                keyboardType='numeric'
                label='Additional KM'
                labelBG='white'
                placeholderText='0.0    '
                value={input.addtnl}
                onChangeText={(text) => {
                  setinput({ ...input, addtnl: text })
                }}
              //iconname='location'

              />
              <CustomInput
                type='text'
                keyboardType='numeric'
                label='KM from last Customer to HQ'
                labelBG='white'
                placeholderText='0.0    '
                value={input.Custmr_Hq}
                onChangeText={(text) => {
                  setinput({ ...input, Custmr_Hq: text })
                }}
              //iconname='location'

              />
            </View>}
          <CustomInput
            type='text'
            label='Lodge(max 1000)'
            keyboardType='numeric'
            labelBG='white'
            placeholderText='0.0       '
            value={input.lodge}
            onChangeText={(text) => {
              setinput({ ...input, lodge: text })
            }}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Courier'
            labelBG='white'
            keyboardType='numeric'
            placeholderText='0.0               '
            value={input.courier}
            onChangeText={(text) => {
              setinput({ ...input, courier: text })
            }}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Sundries'
            labelBG='white'
            keyboardType='numeric'
            placeholderText='0.0                       '
            value={input.sundries}
            onChangeText={(text) => {
              setinput({ ...input, sundries: text })
            }}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Remarks'
            labelBG='white'
            placeholderText='Enter Remarks                       '
            value={input.remarks}
            onChangeText={(text) => {
              setinput({ ...input, remarks: text })
            }}


          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Total'
            labelBG='white'
            placeholderText='250'
            value={param !== '' ? param.total : JSON.stringify(parseInt(input.da, 10) + parseInt(input.courier, 10) + parseInt(input.lodge, 10) + parseInt(input.sundries, 10) +
              parseInt(input.bikeexp, 10) + parseInt(input.kilomtr * 2.9, 10) + parseInt(input.addtnl * 2.9, 10) + parseInt(input.Custmr_Hq * 2.9, 10))}
          // onChangeText={(text) => {
          //   setinput({ ...input, total: text })
          // }}
          //iconname='location'

          />
          <LoaderThree loader={loader} />
          <CustomButton
            title={'Submit'}
            onPress={() => PostSave()}
          />
        </View>
        :
        <View>
          <LoaderTwo loader={loader}/>
          <Text>Loading ....</Text>
          </View>
        }
        {state.length == 0 && loader == false &&
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text2}>{'Check Connection'}</Text>
        </View>
      }
      </KeyboardAwareScrollView>
    </View>

  )
}

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  custom:{
    // position: 'relative',
    // marginVertical: 10,
    // // padding:5,
    // height: SIZES.button,
    // borderRadius:5,
    borderColor:COLORS.primary,
    // // zIndex:1
    marginTop:3,
    marginBottom:4,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical:7,
    backgroundColor:'#fff',
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
    margin: 10
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
    alignSelf: 'center'
  },
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
    //alignSelf:'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center'
    //marginVertical:15,
  },
  textInput: {
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor:'#fff',
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
    borderWidth: .5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    marginTop: -80
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
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});