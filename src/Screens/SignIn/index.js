import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { Validate } from '../../Components/ValidateInput';
import { BASE_URL, LOGIN } from '../../Apis/SecondApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderThree } from '../../Components/Loader';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setSignIn } from '../../redux/slices/authSlice';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    console.log(uniqueId);
  };
  getdeviceId();

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setloginError] = useState({
    email: '',
    password: '',
  });

  const [Loader, setLoader] = useState(false);

  async function signInApi() {
    //uploadBusinessImage = async () => {
    //await AsyncStorage.getItem('accessToken').then(value => {

    const data = new FormData();
    //data.append('logo', this.state.image);
    data.append('username', loginData.email);
    data.append('password', loginData.password);
    var config = {
      method: 'POST',
      url: `${BASE_URL}/${LOGIN}?username=${loginData.email}&password=${loginData.password}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
        if (response.data.Status == 1) {
          console.log(response.data.Userid);
          AsyncStorage.setItem('User_Data', JSON.stringify(response.data));
          const user = {
            isLoggedIn: true,
            userData: response.data
          };
          dispatch(setSignIn(user));
          setLoader(false);
          navigation.navigate('Home')
        }
        else {
          setloginError({
            ...loginError,
            email: '  ',
            password: 'Invalid Username or Password.',
          })
          //console.log('Invalid User Name and Password');
        }
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
    //}
    //);
  };

  

  const validateInputs = () => {
    const emailError = Validate('UserName', 'isEmpty', loginData.email)
    const pswError = Validate('Password', 'isEmpty', loginData.password)
    setloginError({
      ...loginError,
      email: emailError,
      password: pswError
    })
    if (emailError === '' && pswError === '') {
      return true
    } else {
      return false
    }
  }

  const handleLogin = async () => {
    // console.log(validateInputs())
    if (validateInputs()) {
      setLoader(true);
      signInApi();
    }

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, }}
        enableOnAndroid={Platform.OS === 'android'}
        enableAutomaticScroll={true}>
        <View style={styles.container}>
          {/*<View style={styles.circle}>*/}
          <Image
            style={styles.tinyLogo}
            source={require('../../Assets/Images/index.jpg')}
          />
          {/*</View>*/}
          <Text style={styles.appname}>Team VOS</Text>
          <View style={[styles.card, styles.elevation]}>
            <View style={{ margin: 5 }}>
              <CustomInput
                type='text'
                label='User Name'
                labelBG='white'
                placeholderText='Enter User Name'
                iconname='user-1'
                onChangeText={(email) => {
                  setloginData({ ...loginData, email: email })
                  setloginError({ ...loginError, email: Validate('UserName', 'isEmpty', email) })
                }}
                value={loginData.email}
                errorMessage={loginError.email}
              />
              <CustomInput
                type='text'
                label='Password'
                labelBG='white'
                iconname='user-lock'
                placeholderText='Enter Password'
                icon={true}
                onChangeText={(pswd) => {
                  setloginData({ ...loginData, password: pswd })
                  setloginError({ ...loginError, password: Validate('Password', 'isEmpty', pswd) })
                }}
                value={loginData.password}
                errorMessage={loginError.password}
              />
              <CustomButton
                title={'Sign In'}
                onPress={() => handleLogin()}
              // onPress={() => navigation.navigate('Home')}
              />
              <LoaderThree loader={Loader} />
              <Text style={styles.text}>
                Forgot your Password??
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    //backgroundColor:'#bbfccc'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    width: '100%',
    //marginVertical: 10,
    alignSelf: 'center',
    //height:'50%',
    marginTop: 40,
    justifyContent: 'flex-end',
    borderColor: 'transparent',

  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: 'grey',
    fontSize: 12,
    fontFamily: Fonts.font_500,
    marginVertical: 5,
    alignSelf: 'flex-end'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 70,
    backgroundColor: 'white',
    elevation: 20,
    shadowColor: 'green',
    justifyContent: 'center'

  },
  appname: {
    fontFamily: Fonts.font_800,
    fontSize: SIZES.extralarge,
    color: '#08a352',
    alignSelf: 'center',
    marginTop: 10
  },
  tinyLogo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  nameLogo: {
    alignSelf: 'center'
  }
});