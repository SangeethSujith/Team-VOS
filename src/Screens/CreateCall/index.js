
import React, { useState,useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SAVE_CALL, BASE_URL ,GET_ROUTES} from '../../Apis/SecondApi';
import { LoaderOne, LoaderThree, LoaderTwo } from '../../Components/Loader';
import axios from 'axios';
import qs from 'qs';
import { Validate } from '../../Components/ValidateInput';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
//import { LoaderOne, LoaderThree } from '../../Components/Loader';
//import {Cust}

const CreateCall = ({ navigation,route}) => {
  const { param } = route.params;
  const [loader, setloader] = useState(false) 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState('');
  const [state, setstate] = useState('');
  useEffect(() => {
    getRoutes()
  }, []);
  async function getRoutes() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    // console.log('routes',Data.Userid);
    let body = {
      user_id: Data.Userid,
    }
    axios.post(`${BASE_URL}/${GET_ROUTES}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        // await setstate(response.data.routes)
        // console.log(response.data.routes);
        // AsyncStorage.setItem('Routes', JSON.stringify(response.data.routes.new));
        const dropdata = response.data.routes.map(item => ({
          label:item.route_name,
          value: item.route_id,
        }))
        // console.log(dropdata);
        setstate(dropdata)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
    //}
    //);
  const [loginError, setloginError] = useState({
    name: '',
    phone: '',
    address: '',
    details: '',
    registration_number: '',
    email: '',
  });
  const [input, setinput] = useState({
    //status: '',
    //pProdct: param.products_prescribed || '',
    name: param.name || '',
    phone: param.phone || '',
    address: param.address || '',
    city: param.details || '',
    registration_number: param.info || '',
    email: param.email || '',
  })
  // console.log('input data',input);
  const PostSave = async () => {
    console.log('inside')
    //const Route = await AsyncStorage.getItem('Routes');
    //let route = JSON.parse(Route)
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      user_id: Data.Userid,
      username:Data.Name,
      name: input.name,
      city : input.city,
      email: input.email,
      phone: input.phone,
      address: input.address,
      registration_number: input.registration_number,
      route_id:value,
    }
    console.log('upload',posts)
    setloader(true);
    axios.post(`https://ayurwarecrm.com/demo/ajax/save_customer_for_approvals`, qs.stringify(posts)).then(async (response) => {
      if (response.status == 200) {
        setloader(false);
        Alert.alert(
          "Saved Successfully ", ' ',
          [
            {
              text: "Ok",
              cancelable: true,
              onPress: () => navigation.navigate('Home'),
              style: "cancel",
            }],
        );
      }
      else {
        setloader(false);
        Alert.alert(
          "Failed Save, Try Again")
      }
    }
    ).catch((err) => {
      console.log(err)
    });

  }

  const validateInputs = () => {
    //const emailError = Validate('UserName', 'name', loginData.email)
    //const pswError = Validate('Password', 'isEmpty', loginData.password)
    const nameError = Validate('Name', 'isEmpty', input.name)
    const phoneError = Validate('Phone Number', 'isEmpty', input.phone)
    const addressError = Validate('Address', 'isEmpty', input.address)
    const detailsError = Validate('Details', 'isEmpty', input.city)
    // const informatnError = Validate('Information', 'isEmpty', input.registration_number)
    // const emailError = Validate('Email', 'email', input.email)
    setloginError({
      ...loginError,
      name: nameError,
      phone: phoneError,
      address: addressError,
      city: detailsError,
      // registration_number: informatnError,
      // email: emailError
    })
    if (nameError === '' && phoneError === '' &&
      addressError === '' && detailsError === '') {
      return true
    } else {
      return false
    }
  }
  const handleLogin = async () => {
    // console.log(validateInputs())
    if(value===''){
      Alert.alert(
        "Select route")
    }
    else{
    if (validateInputs()) {
      //navigation.navigate('Home')
      //setloader(true);
      PostSave();
    }
  }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, }}
        enableOnAndroid={Platform.OS === 'android'}
        enableAutomaticScroll={true}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <CustomHeaderTwo
            heading={' '}
            onpress={() => navigation.goBack()}
          />
          {state !== '' ?
          <View style={{ marginHorizontal: 25, marginTop: 20 }}>
            <Text style={styles.text}>Create New Doctor</Text>
            <CustomInput
              type='text'
              label='Name'
              labelBG='white'
              placeholderText='Enter Name'
              iconname='user-1'
              //keyboardType='numeric'
              value={input.name}
              onChangeText={(text) => {
                setinput({ ...input, name: text })
                setloginError({ ...loginError, name: Validate('Name', 'isEmpty', input.name) })
              }}
              errorMessage={loginError.name}

            />
            <CustomInput
              type='text'
              label='Phone Number'
              labelBG='white'
              placeholderText='Enter Phone Number'
              iconname='phone'
              keyboardType='numeric'
              value={input.phone}
              onChangeText={(text) => {
                setinput({ ...input, phone: text })
                setloginError({ ...loginError, phone: Validate('Phone Number', 'mobile', input.phone) })
              }}
              errorMessage={loginError.phone}
            />
            <CustomInput
              type='text'
              label='Address'
              labelBG='white'
              placeholderText='Enter Address'
              iconname='location'
              value={input.address}
              onChangeText={(text) => {
                setinput({ ...input, address: text })
                setloginError({ ...loginError, address: Validate('Address', 'isEmpty', input.address) })
              }}
              errorMessage={loginError.address}
            />
            <CustomInput
              type='text'
              label='City'
              labelBG='white'
              placeholderText='Enter Details'
              iconname='pen'
              value={input.city}
              onChangeText={(text) => {
                setinput({ ...input, city: text })
                setloginError({ ...loginError, city: Validate('Details', 'isEmpty', input.city) })
              }}
              errorMessage={loginError.city}
            />
            <CustomInput
              type='text'
              label='Registration Number'
              labelBG='white'
              placeholderText='Enter Registration Number'
              keyboardType='numeric'
              iconname='pen'
              value={input.registration_number}
              onChangeText={(text) => {
                setinput({ ...input, registration_number: text })
                // setloginError({ ...loginError, informatn: Validate('Informatn', 'isEmpty', input.registration_number) })
              }}
              errorMessage={loginError.registration_number}

            />
            <CustomInput
              type='text'
              label='E-mail'
              labelBG='white'
              placeholderText='Enter Email'
              iconname='email'
              value={input.email}
              onChangeText={(text) => {
                setinput({ ...input, email: text })
                setloginError({ ...loginError, email: Validate('Email', 'email', input.email) })
              }}
              errorMessage={loginError.email}
            />
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
            <CustomButton
              title={'Submit'}
              onPress={() => handleLogin()}
            />
          </View> 
          :
          <View>
          <LoaderTwo loader={loader}/>
          <Text>Loading ....</Text>
          </View>
          } 
        </View>
        {state.length == 0 && loader == false &&
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text2}>{'Check Connection'}</Text>
        </View>
      }
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default CreateCall;

const styles = StyleSheet.create({
  custom:{
    // position: 'relative',
    // marginVertical: 10,
    // // padding:5,
    // height: SIZES.button,
    // borderRadius:5,
    borderColor:COLORS.primary,
    // // zIndex:1
    marginTop:3,
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent:'flex-end',
    backgroundColor: 'white'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 70,
    paddingHorizontal: 15,
    width: '100%',
    //marginVertical: 10,
    alignSelf: 'center',
    height: '50%',
    //marginTop:40,
    justifyContent: 'flex-end',
    borderColor: 'transparent',

  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.heading_black,
    fontSize: SIZES.verylarge,
    fontFamily: Fonts.font_700,
    marginVertical: 15,
  },


});