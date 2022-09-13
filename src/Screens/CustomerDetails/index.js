import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import { API_URL, GET_AGING } from '../../Apis/FirstApi';
import qs from 'qs';
import axios from 'axios';
//import {Cust}

const CustomerDetails = ({ navigation, route }) => {
  const { param } = route.params;
  const [loader, setloader] = useState(false);
  const [loader1, setloader1] = useState('ERORR');
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getAging()
  }, []);

  async function getAging() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    console.log(Data.UserCode);
    const token = await AsyncStorage.getItem('userToken');
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_AGING}?CustomerCode=${param.sc}`,
      headers).then(async (response) => {
        setloader(false)
        await setstate1(response.data.Data)
        console.log(state1);
        return {
          response: response.data
        };
      }).catch((err) => {
        //setloader(false)
        console.log(err)
      });
  }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Customer Details'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' && state1.length > 0 ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <Text style={styles.text}>{param.n}</Text>
          <Text style={styles.text3}>{param.c}</Text>
          <Text style={styles.text1}>{'Outstanding'}</Text>
          <View style={styles.line} />
          {/* <View style={styles.textrow}>
            <Text style={styles.text3}>{'0-30 Days'}</Text>
            <Text style={styles.text4}>{'0.00'}</Text>
          </View> */}
          <FlatList style={{ backgroundColor: 'white' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            //ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.textrow}>
                  <Text style={styles.text4}>{item.Ageing}</Text>
                  <Text style={styles.text4}>{item.OutstandingAmount}</Text>
                </View>
                // <View style={styles.line} />
              )
            }}
          />
          <View style={styles.line} />
          <View style={styles.buttonrow}>
            <CustomButtonTwo
              title={'Order Details'}
              width1={SIZES.image210}
              onPress={() => navigation.navigate('InvoiceOrder', { param: param.sc })}
            />
            <CustomButtonTwo
              title={'Invoices'}
              width1={SIZES.image210}
              onPress={() => navigation.navigate('Invoices', { param: true, param1: param.sc })}
            />
          </View>
          <CustomButtonTwo
            title={'View Subledger'}
            //width1 ={SIZES.image210} 
            onPress={() => navigation.navigate('SubLedger', { param: param.sc })}
          />
          <CustomButtonTwo
            title={'Products  Not  Purchased '}
            //width1 ={SIZES.image210} 
            onPress={() => navigation.navigate('ItemsNCustomers', { param: param.sc })}
          />
          {/*<View style={styles.buttonrow}>
                 <CustomButtonTwo
                     title  ={'Dispatch Details'}
                     width1 ={SIZES.image210} 
                     onPress={()=>navigation.navigate('DispatchDetails')}
                  />
                  <CustomButtonTwo
                     title  ={'Collection'}
                     width1 ={SIZES.image210}
                     onPress={()=>navigation.navigate('SampleIssue')}
                  />
                  </View>*/}
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          {/* <Text>Loading...............</Text> */}
        </View>}
    </View>

  )
}
export default CustomerDetails;

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
    alignSelf: 'center'
  },
  text1: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
    marginVertical: 15,
    //alignSelf:'center'
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
    alignSelf: 'center',
    //marginVertical: 5,
  },
  text4: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center',
    //marginBottom: 5
    marginVertical: 5,
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
    marginVertical: 10,
    justifyContent: 'space-evenly',
    height: 45,
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
    justifyContent: 'space-between',
    marginTop: 5
  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  line: {
    height: .5,
    width: '100%',
    backgroundColor: '#b2b8b4'
  },
});