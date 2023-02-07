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
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SAVE_CALL, BASE_URL } from '../../Apis/SecondApi';
import { LoaderOne, LoaderThree } from '../../Components/Loader';
import axios from 'axios';
import qs from 'qs';
import { Validate } from '../../Components/ValidateInput';

const CallDetails = ({ navigation, route }) => {
  const { param, param2 } = route.params;
  const [state, setstate] = useState('')
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [loader, setloader] = useState(false)
  useEffect(() => {
    //();
    console.log('param', param)
  }, []);
  const [loginError, setloginError] = useState({
    pProdct: '',
    orderAmount: '',
    complaints: '',
    informtn: '',
    collection: '',
    distance: ''
  });
  const [input, setinput] = useState({
    status: '',
    pProdct: param.products_prescribed || '',
    orderAmount: param.order_booked || '',
    complaints: param.complaints || '',
    informtn: param.information_conveyed || '',
    collection: param.collection || '',
    distance: param.distance || '',
    remarks: param.remarks || ''
  })

  const validateInputs = () => {
    //const emailError = Validate('UserName', 'name', loginData.email)
    //const pswError = Validate('Password', 'isEmpty', loginData.password)
    const pProdctError = Validate('Products', 'isEmpty', input.pProdct)
    const orderAmountError = Validate('Amount', 'isEmpty', input.orderAmount)
    const complaintsError = Validate('Complaints', 'isEmpty', input.complaints)
    const informtnError = Validate('Information', 'isEmpty', input.informtn)
    const collectionError = Validate('Collection', 'isEmpty', input.collection)
    const distanceError = Validate('Distance', 'isEmpty', input.distance)
    setloginError({
      ...loginError,
      //email: emailError,
      //password: pswError
      pProdct: pProdctError,
      orderAmount: orderAmountError,
      complaints: complaintsError,
      informtn: informtnError,
      collection: collectionError,
      distance: distanceError
    })
    if (pProdctError === '' && orderAmountError === '' &&
      complaintsError === '' && informtnError === '' && collectionError === '' && distanceError === '') {
      return true
    } else {
      return false
    }
  }
  const handleLogin = async () => {
    // console.log(validateInputs())
    if (validateInputs()) {
      setloader(true);
      PostSave();
      //signInApi();
    }
  }

  const PostSave = async () => {
    console.log('inside')
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      user_id: Data.Userid,
      route_id: param.route_id,
      customer_id: param.customer_id,
      route_customer_id: param.route_customer_id,
      status: isSelected ? 'Visited' : 'Not Available',
      products_prescribed: input.pProdct,
      order_booked: input.orderAmount,
      // Now defaulted today's date but need to fix this in the api
      date:param==''?moment().format("YYYY-MM-DD"):param.route_date,
      complaints: input.complaints,
      information_conveyed: input.informtn,
      collection: input.collection,
      distance: input.distance,
      remarks: input.remarks

    }
    console.log('the data',posts)
    setloader(true);

    axios.post(`https://ayurwarecrm.com/teamvos-new/ajax/save_call`, qs.stringify(posts)).then(async (response) => {
      if (response.status == 200) {
        setloader(false);
        Alert.alert(
          "Saved Successfully ", ' ',
          [
            {
              text: "Ok",
              cancelable: true,
              onPress: () => navigation.navigate('TodayCallsRoute',{param:param2}),
              style: "cancel",
            }],
        );
      }
      else {
        setloader(false);
        Alert.alert(
          "Failed Saving Call Details, Try Again")
      }
    }
    ).catch((err) => {
      console.log(err)
    });

  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView behavior={"position"}
        contentContainerStyle={{ flexGrow: 1, }}
        enableOnAndroid={Platform.OS === 'android'}
        enableAutomaticScroll={true} >
        <CustomHeaderTwo
          heading={' '}
          onpress={() => navigation.goBack()}
        />
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          {/* <Text style={styles.text}>{param.products_prescribed}</Text>
          <Text style={styles.text2}>{param.information_conveyed}</Text> */}
          <Text style={styles.text}>{param.customer.smStoreName}</Text>
          <Text style={styles.text2}>{param.customer.smCity}</Text>
          <View style={styles.checkboxrow}>
            {param.status !== 'Visited' ?
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={styles.row}>
                  <CheckBox
                    value={isSelected}
                    onValueChange={() => (setSelection(true), setSelection2(false))}
                    style={styles.checkbox}
                  />
                  <Text style={styles.text3}>Mark as Visited</Text>
                </View>
                <View style={styles.row}>
                  <CheckBox
                    value={isSelected2}
                    onValueChange={() => (setSelection(false), setSelection2(true))}
                    style={styles.checkbox}
                  />
                  <Text style={styles.text3}>Not Available</Text>
                </View>
              </View>
              :
              <View>
                <Text style={styles.text3}>{param.status}</Text>
              </View>
            }
          </View>
          <CustomInput
            type='text'
            label='Prescribing Products'
            labelBG='white'
            placeholderText='Enter Prescribing Products     '
            value={input.pProdct}
            onChangeText={(text) => {
              setinput({ ...input, pProdct: text })
              setloginError({ ...loginError, pProdct: Validate('Products', 'isEmpty', input.pProdct) })
            }}
            errorMessage={loginError.pProdct}
          //style={{ width: '100%' }}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Amount Of Order Booked'
            labelBG='white'
            placeholderText='Enter Amount Of Order Booked       '
            keyboardType='numeric'
            value={input.orderAmount}
            onChangeText={(text) => {
              setinput({ ...input, orderAmount: text })
              setloginError({ ...loginError, orderAmount: Validate('Amount', 'distance', input.orderAmount) })
            }}
            errorMessage={loginError.orderAmount}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Complaints'
            labelBG='white'
            placeholderText='Enter Complaints           '
            value={input.complaints}
            onChangeText={(text) => {
              setinput({ ...input, complaints: text })
              setloginError({ ...loginError, complaints: Validate('Complaints', 'isEmpty', input.complaints) })
            }}
            errorMessage={loginError.complaints}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Information Conveyed'
            labelBG='white'
            placeholderText='Enter Information Conveyed        '
            value={input.informtn}
            onChangeText={(text) => {
              setinput({ ...input, informtn: text })
              setloginError({ ...loginError, informtn: Validate('Information', 'isEmpty', input.informtn) })
            }}
            errorMessage={loginError.informtn}

          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Collection'
            labelBG='white'
            placeholderText='Enter Collection       '
            keyboardType='numeric'
            value={input.collection}
            onChangeText={(text) => {
              setinput({ ...input, collection: text })
              setloginError({ ...loginError, collection: Validate('Collection', 'distance', input.collection) })
            }}
            errorMessage={loginError.collection}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Distance (K M)'
            keyboardType='numeric'
            labelBG='white'
            placeholderText='Distance from previous customer (K M)        '
            value={input.distance}
            onChangeText={(text) => {
              setinput({ ...input, distance: text })
              setloginError({ ...loginError, distance: Validate('Distance', 'distance', input.distance) })
            }}
            errorMessage={loginError.distance}
          //iconname='location'

          />
          <CustomInput
            type='text'
            label='Remarks'
            labelBG='white'
            placeholderText='Enter Remarks          '
            value={input.remarks}
            onChangeText={(text) => {
              setinput({ ...input, remarks: text })
            }}
          //iconname='location'

          />
          {param.status !== 'Visited' &&
            <View style={styles.buttonrow}>
              <CustomButton
                title={'Submit'}
                width1={SIZES.image210}
                onPress={() => handleLogin()}
              />
              <CustomButtonTwo
                title={'Sample Issue'}
                width1={SIZES.image210}
                onPress={() => navigation.navigate('SampleIssue',{param:param.customer_id})}
              />
            </View>}
          <LoaderThree loader={loader} />
        </View>
      </KeyboardAwareScrollView>
    </View>

  )
}
export default CallDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    textAlign: 'center'
  },
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
    alignSelf: 'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center'
    //marginVertical:15,
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