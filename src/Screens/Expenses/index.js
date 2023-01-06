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
import { SAVE_EXP, BASE_URL,ROUTES,TOTAL_KM } from '../../Apis/SecondApi';
import { LoaderTwo, LoaderThree } from '../../Components/Loader';
import axios from 'axios';
import qs from 'qs';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [datetotalkm,setdatetotalkm]=useState('')
  const [loader, setloader] = useState(false)
  const [isksk,setisksk]=useState('')
  useEffect(() => {
    getRoutes()
    fisksk()
    OS()
    async function fisksk(){
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
      setisksk(Data.IsISKOSK)
      console.log(isksk)
    }
  }, []);

  const HQ = async()=>{
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = await JSON.parse(userData)
    switch(Data.role){
      case 'FSO':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '175' })
        }
        else{
          setinput({ ...input, da: '175' })
        }
        break;
      }
      case 'ASM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '200' })
        }
        else{
          setinput({ ...input, da: '200' })
        }
        break;
      }
      case 'ZSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '200' })
        }
        else{
          setinput({ ...input, da: '200' })
        }
        break;
      }
      case 'RSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '225' })
        }
        else{
          setinput({ ...input, da: '250' })
        }
        break;
      }
      case 'SM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '300' })
        }
        else{
          setinput({ ...input, da: '300' })
        }
        break;
      }
    }
    console.log((datetotalkm*2.95)+parseFloat(input.da),'here');
  }
  const EX = async()=>{
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = await JSON.parse(userData)
    switch(Data.role){
      case 'FSO':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '200' })
        }
        else{
          setinput({ ...input, da: '225' })
        }
        break;
      }
      case 'ASM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '225' })
        }
        else{
          setinput({ ...input, da: '250' })
        }
        break;
      }
      case 'ZSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '225' })
        }
        else{
          setinput({ ...input, da: '250' })
        }
        break;
      }
      case 'RSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '275' })
        }
        else{
          setinput({ ...input, da: '300' })
        }
        break;
      }
      case 'SM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '350' })
        }
        else{
          setinput({ ...input, da: '350' })
        }
        break;
      }
    }
  }
  const OS = async()=>{
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = await JSON.parse(userData)
    switch(Data.role){
      case 'FSO':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '250' })
        }
        else{
          setinput({ ...input, da: '275' })
        }
        break;
      }
      case 'ASM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '325' })
        }
        else{
          setinput({ ...input, da: '300' })
        }
        break;
      }
      case 'ZSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '325' })
        }
        else{
          setinput({ ...input, da: '300' })
        }
        break;
      }
      case 'RSM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '375' })
        }
        else{
          setinput({ ...input, da: '350' })
        }
        break;
      }
      case 'SM':{
        if(isksk=='ISK'){
          setinput({ ...input, da: '400' })
        }
        else{
          setinput({ ...input, da: '400' })
        }
        break;
      }
    }
  }
  const onChange = async (event, value) => {
    await setDate(value);
    // console.log(value,'inside onchange')
    getRoutes();
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
    setloader(true);
    OS();
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let body = {
      user_id: Data.Userid,
      assigned_date:moment(date).format('YYYY-MM-DD'),
    }
    let body2={
      user_id: Data.Userid,
      date:moment(date).format('YYYY-MM-DD'),
    }
    axios.post(`${BASE_URL}/${TOTAL_KM}`,
      qs.stringify(body2)).then(async (response) => {
        await setdatetotalkm(response.data.report.distance)
        // console.log(datetotalkm,'here')
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
    axios.post(`${BASE_URL}/${ROUTES}`,
      qs.stringify(body)).then(async (response) => {
        // await setstate(response.data.routes)
        
        // AsyncStorage.setItem('Routes', JSON.stringify(response.data.routes.new));
        const dropdata = response.data.routes.map(item => ({
          label: item.route_name,
          value: item.route_id
        }))
        await setstate(dropdata)
        console.log(dropdata,'routes');
        setloader(false)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
 const [input, setinput] = useState({
    date: param !== '' ? param.date : ' ',
    route: '',
    town: param !== '' ? param.town_visited : ' ',
    da: param !== '' ? param.da : ' ',
    kilomtr: param !== '' ? param.tabike_km : '0',
    type: ' ',
    fare: param !== '' ? param.ta_bus : '0',
    bikeexp: param !== '' ? param.ta_bike_amount : '0',
    addtnl: param !== '' ? param.additional_km : '0',
    lodge: param !== '' ? param.lodge : '0',
    courier: param !== '' ? param.courier : '0',
    sundries: param !== '' ? param.sundries : '0',
    remarks: param !== '' ? param.remarks : '',
    total: '', 
    Custmr_Hq: param !== '' ? param.km_customer_to_hq : '0'
  })
  const PostSave = async () => {
    console.log('inside')
    const Route = await AsyncStorage.getItem('Routes');
    let route = JSON.parse(Route)
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      user_id: Data.Userid,
      date: moment(date).format("YYYY-MM-DD"),
      expense_type: isSelected ? 'Route' : (isSelected ? 'Meeting' : 'Task'),
      route_id:value,
      town_visited: input.town,
      da: input.da,
      // //ta:100,
      ta_type: 'monthly',
      ta_bus: input.fare,
      ta_bike_km:datetotalkm==''?'0':datetotalkm,
      ta_bike_amount: input.bikeexp,
      lodge: input.lodge,
      courier: input.courier,
      sundries: input.sundries,
      additional_km: input.addtnl,
      remarks: input.remarks,
      total: isksk=='ISK'?JSON.stringify(parseFloat(input.da) + parseFloat(input.fare, 10) + parseFloat(input.courier, 10) + parseFloat(input.lodge, 10) + parseFloat(input.sundries, 10) +
      parseFloat(input.bikeexp, 10) + (datetotalkm * 2.9) + parseFloat(input.addtnl * 2.9) + parseFloat(input.Custmr_Hq * 2.9, 10)):JSON.stringify(parseFloat(input.da, 10) + parseFloat(input.fare, 10) + parseFloat(input.courier, 10) + parseFloat(input.lodge, 10) + parseFloat(input.sundries, 10) +
      parseFloat(input.bikeexp, 10) + parseFloat(datetotalkm * 2.75, 10) + parseFloat(input.addtnl * 2.75, 10) + parseFloat(input.Custmr_Hq * 2.75, 10)),
      created_date: moment().format("YYYY-MM-DD"),
      modified_date: moment().format("YYYY-MM-DD"),
      status: 'Saved',
      km_customer_to_hq: input.Custmr_Hq,

      
    }
    console.log('posts',posts)
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
            onPressdate={() => setIsPickerShow(true)}
            value={moment(date).format("YYYY-MM-DD")}
          //datePicker={true}
          //icon={true}
          //iconname='location'
          />
          {isPickerShow && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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
                  setSelection6(false), OS())}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>OS</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected5}
                onValueChange={() => (setSelection4(false), setSelection5(true),
                  setSelection6(false),HQ())}
                style={styles.checkbox}
              />
              <Text style={styles.text3}>HQ</Text>
            </View>
            <View style={styles.row}>
              <CheckBox
                value={isSelected6}
                onValueChange={() => (setSelection4(false), setSelection5(false),
                  setSelection6(true), EX())}
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
            label3='Train'
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
                editable={false}
                keyboardType='numeric'
                label={'Kilometer'}
                labelBG='white'
                placeholderText={datetotalkm}
                value={datetotalkm}
                onChangeText={(text) => {
                  setdatetotalkm(text)
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
            label='Lodge'
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
            placeholderText=' '
            value={param !== '' ? param.total : isksk=='ISK'?JSON.stringify(parseFloat(input.da, 10) + parseFloat(input.fare, 10) + parseFloat(input.courier, 10) + parseFloat(input.lodge, 10) + parseFloat(input.sundries, 10) + parseFloat(input.bikeexp, 10) + (datetotalkm * 2.9) + parseFloat(input.addtnl * 2.9, 10) + parseFloat(input.Custmr_Hq * 2.9, 10)):JSON.stringify(parseFloat(input.da, 10) + parseFloat(input.fare, 10) + parseFloat(input.courier, 10) + parseFloat(input.lodge, 10) + parseFloat(input.sundries, 10) + parseFloat(input.bikeexp, 10) + parseFloat(datetotalkm * 2.75, 10) + parseFloat(input.addtnl * 2.75, 10) + parseFloat(input.Custmr_Hq * 2.75, 10))}
          // onChangeText={(text) => {
          //   setinput({ ...input, total: text })
          // }}
          //iconname='location'

          />
          <LoaderThree loader={loader} />
          
        {param == ''?
          <CustomButton
            title={'Submit'}
            onPress={() => PostSave()}
          />:
          <></>
        }
        </View>
        :
        <View>
          <LoaderTwo loader={loader}/>
          <Text>Loading ....</Text>
          </View>
        }
        {state.length == 0 || loader == false ||
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
