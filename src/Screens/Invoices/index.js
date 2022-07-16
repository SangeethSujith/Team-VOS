import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal, Dimensions } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import { CustomFilter } from '../../Components/CustomFilter';
import { getInvoices } from '../../Apis/ApiServices'
import axios from 'axios';
import { API_URL, GET_INVOICES, GET_INVOICES_DETAILS } from '../../Apis/FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Modal from 'react-native-modal';
//import {Cust}

const Invoices = ({ navigation }) => {
  const [state, setstate] = useState()
  const [details, setdetails] = useState()

  useEffect(() => {
    getInvoices()
  }, []);

  const Height = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);
  //const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [datePicker1, setDatePicker1] = useState(false);
  const [value1, setvalue1] = useState(new Date());
  const [value2, setvalue2] = useState(new Date());
  function onDateSelected1(event, value) {
    setvalue1(value);
    setDatePicker(false);
  };
  function onDateSelected2(event, value) {
    setvalue2(value);
    setDatePicker1(false);
  };
  function datefilter() {
    //setData
  }
  async function getInvoices() {
    const token = await AsyncStorage.getItem('userToken');

    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_INVOICES}?Offset=0&Limit=0&FromDate=${'09-04-2021'}&ToDate=${'31-03-2022'}&CustomerCode=${'C08954'}`,
      headers).then(async (response) => {

        await setstate(response.data.Data)
        //console.log(state);
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }

  async function InvoiceDetails(ID) {
    const token = await AsyncStorage.getItem('userToken');

    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_INVOICES_DETAILS}?ID=${JSON.stringify(ID)}`,
      headers).then(async (response) => {

        await setdetails(response.data.Data)
        console.log(details);
        console.log(JSON.stringify(ID));
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }

  const openModal = (item) => {
    setModalVisible(true);
  }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Invoices'}
        onpress={() => navigation.goBack()}
      />
      <CustomFilter
        value1={value1}
        value2={value2}
        text1={value1.toDateString()}
        text2={value2.toDateString()}
        onChangevalue1={onDateSelected1}
        onChangevalue2={onDateSelected2}
        onPressdate1={() => setDatePicker(true)}
        onPressdate2={() => setDatePicker1(true)}
        datePicker1={datePicker}
        datePicker2={datePicker1}
        onPress={() => datefilter()} />
      <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
        <FlatList style={{ backgroundColor: 'white', height: '97%' }}
          //contentContainerStyle={{marginBottom:170}}
          data={state}
          horizontal={false}
          scrollEnabled={true}
          //ListFooterComponent={}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => {
            return item.InvoiceNo;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => InvoiceDetails(item.ID) && openModal(item)}>
                <View style={styles.card}>
                  <Icon
                    name={"file-text1"}
                    color={'#319A2E'}
                    size={SIZES.radius15}
                    config={icoMoonConfigSet}
                    style={{ marginTop: 5 }}
                  />
                  <View style={{ width: SIZES.windowwidth / 2 }}>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text}>{'Invoice No'}</Text>
                        <Text style={styles.text}>{': '}</Text>
                      </View>
                      <Text style={styles.text3}>{item.InvoiceNo}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'No.of Items'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text3}>{item.NoOfItems}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'Amount'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text3}>{item.NetAmount}</Text>
                    </View>
                  </View>
                  <View style={{ alignSelf: 'flex-end' }}>
                    <Text style={styles.text}>{item.InvoiceDate}</Text>
                  </View>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modalStyle, { marginTop: Height / 10 }]}>
          <View style={{ margin: 10 }}>
            <Text style={styles.heading}>Invoice Details</Text>
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon
                name={"file-text1"}
                color={'#319A2E'}
                size={SIZES.radius15}
                config={icoMoonConfigSet}
                style={{ marginTop: 5 }}
              />
              <View style={{ marginLeft: 10, width: SIZES.windowwidth / 2.3 }}>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'Invoice No'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{details.InvoiceNo}</Text>
                </View>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'No.of Items'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{details.NoOfItems}</Text>
                </View>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'Date'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{details.InvoiceDate}</Text>
                </View>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'Amount'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{details.NetAmount}</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Icon
                name={"file-text1"}
                color={'#319A2E'}
                size={SIZES.radius15}
                config={icoMoonConfigSet}
                style={{ marginTop: 5 }}
              />
              <View style={{ marginLeft: 10, width: '70%' }}>
                <Text style={styles.text}>{'VYOSHAMRITHA Oil'}</Text>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'Qty'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{'2'}</Text>
                </View>
                <View style={styles.textrow}>
                  <View style={styles.innerrow}>
                    <Text style={styles.text2}>{'Value'}</Text>
                    <Text style={styles.text2}>{': '}</Text>
                  </View>
                  <Text style={styles.text}>{'01'}</Text>
                </View>
              </View>
            </View>
            <CustomButton
              style={{ alignSelf: 'flex-end' }}
              width1={'30%'}
              title={'close'}
              height1={'25%'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>




  )
}
export default Invoices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.small,
    fontFamily: Fonts.font_500,
    marginBottom: 5,
  },
  text2: {
    color: COLORS.black,
    fontSize: SIZES.small,
    fontFamily: Fonts.font_500,
    marginBottom: 5,
  },
  text3: {
    color: COLORS.heading_black,
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_400,
    marginBottom: 5,
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
  line: {
    height: .5,
    width: '100%',
    backgroundColor: '#b2b8b4'
  },
  modalStyle: {
    height: '40%',
    width: '90%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    elevation: 60,
    shadowColor: 'black',
    borderRadius: 10,
    //justifyContent:'center',
    //alignItems:'center'

  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    //width:300
  },
  innerrow: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    //fontFamily: "poppins",
    fontFamily: Fonts.font_400,
    fontSize: SIZES.large,
    //fontStyle : 'normal',
    //textAlign:'center',
    //marginTop:heightPercentageToDP(.5),
    //fontSize: Theme.FONT_BIG,  
    //fontSize : Theme.FONT_TWNETY,
    color: COLORS.primary_black,
    marginBottom: 10
  }



});