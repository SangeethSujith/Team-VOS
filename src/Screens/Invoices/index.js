import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal, Dimensions, ViewComponent } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import { CustomFilter } from '../../Components/CustomFilter';
import axios from 'axios';
import { API_URL, GET_INVOICES, GET_INVOICES_DETAILS, GET_ORDERS, GET_INVOICES_FSO } from '../../Apis/FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo, LoaderThree } from '../../Components/Loader';
import moment from 'moment'
//import Modal from 'react-native-modal';
//import {Cust}
const Invoices = ({ navigation, route }) => {
  const [state, setstate] = useState('');
  const [loader, setloader] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [details, setdetails] = useState('')
  const [DetailsF, setDetailsF] = useState('')
  const [date, setDate] = useState(moment().subtract(30, 'days').format('DD-MM-YYYY'));
  useEffect(() => {
    getInvoices()
    console.log("30 days before" + date)
  }, []);
  const { param, param1 } = route.params;
  const Height = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [datePicker1, setDatePicker1] = useState(false);
  const [value1, setvalue1] = useState(moment().format('DD-MM-YYYY'));
  const [value2, setvalue2] = useState(moment().subtract(30, 'days').format('DD-MM-YYYY'));
  const [date2, setDate2] = useState(new Date(Date.now()))
  const [date1, setDate1] = useState(new Date(new Date().setDate(date2.getDate() - 30)))
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [PickerVisible, setPickerVisible] = useState(false);
  const [items, setitems] = useState('');
  // function onDateSelected1(event, value) {
  //   setvalue1(value);
  //   setDatePicker(false);
  // };
  const onDateSelected1 = (event, value) => {
    setDate1(value);
    setvalue2(moment(date1).format('DD-MM-YYYY'))
    setIsPickerShow(false)
  };
  function onDateSelected2(event, value) {
    setDate2(value);
    setvalue1(moment(date2).format('DD-MM-YYYY'))
    setIsPickerShow2(false)
  };
  function datefilter() {
    setstate('')
    getInvoices()
    console.log("30 days before" + date)
    setPickerVisible(false)
    //setData
  }
  async function getInvoices() {
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    const current = new Date();
    const prior = new Date().setDate(current.getDate() - 30);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    console.log(Data.UserCode)
    console.log(current.toISOString().split('T')[0]);
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    let Home = `${API_URL}/${GET_INVOICES}?Offset=0&Limit=0&FromDate=${'01-06-2022'}&ToDate=${'01-07-2022'}&CustomerCode=${param1}`
    let Customer = `${API_URL}/${GET_INVOICES_FSO}?Offset=0&Limit=0&FromDate=${'01-06-2022'}&ToDate=${'01-06-2022'}&FSOCode=${Data.UserCode}`
    console.log(Home);
    // console.log(Customer);
    axios.get(param ? Home : Customer,
      headers).then(async (response) => {
        setloader(false)
        await setstate(response.data.Data)
        console.log(response.data.Data);
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  async function InvoiceDetails(item) {
    const token = await AsyncStorage.getItem('userToken');
    setloader1(true)
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    console.log(item.ID)
    axios.get(`${API_URL}/${GET_INVOICES_DETAILS}?ID=${item.ID}`,
      headers).then(async (response) => {

        await setdetails(response.data.Data)
        await setDetailsF(response.data.Data.SalesInvoiceTrans[0])
        console.log(DetailsF);
        //console.log(response.data.Data.SalesInvoiceTrans[0])
        setloader1(false)
        console.log(item.ID);
        openModal(item)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  // const openModal = (item) => {
  //   setModalVisible(true);
  // }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Invoices'}
        onpress={() => navigation.goBack()}
      />
      <LoaderThree loader={loader1} />
      <CustomFilter
        value1={date1}
        value2={date2}
        onPressdate1={() => setIsPickerShow(true)}
        condition1={isPickerShow}
        text1={moment(date1).format("YYYY-MM-DD")}
        onChangevalue1={onDateSelected1}
        onPressdate2={() => setIsPickerShow2(true)}
        condition2={isPickerShow2}
        text2={moment(date2).format("YYYY-MM-DD")}
        onChangevalue2={onDateSelected2}
        onPress={() => datefilter()}
        PickerVisible={PickerVisible}
        PickerVisibletrue={() => setPickerVisible(true)}
        PickerVisiblefalse={() => setPickerVisible(false)}
      />
      {state !== '' && state.length > 0 ?
        <View>
          <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 90 }}>
            <FlatList style={{ backgroundColor: 'white', height: '97%' }}
              //contentContainerStyle={{marginBottom:170}}
              data={state}
              horizontal={false}
              scrollEnabled={true}
              //ListFooterComponent={}
              showsVerticalScrollIndicator={false}
              //inverted={true}
              //scrollsToTop
              //contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
              numColumns={1}
              keyExtractor={(item) => {
                return item.InvoiceNo;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => navigation.navigate('InvoiceDetails', { id: item })}>
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
                            <Text style={styles.text}>{'Customer'}</Text>
                            <Text style={styles.text}>{': '}</Text>
                          </View>
                          <Text style={styles.text3}>{item.CustomerName}</Text>
                        </View>
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
                    <Text style={[styles.text3, { alignSelf: 'flex-end' }]}>{item.Status}</Text>
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
                <View>
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
                        {/* <Text style={styles.text}>{''}</Text> */}
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text2}>{'No.of Items'}</Text>
                          <Text style={styles.text2}>{': '}</Text>
                        </View>
                        <Text style={styles.text}>{details.NoOfItems}</Text>
                        {/* <Text style={styles.text}>{''}</Text> */}
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text2}>{'Date'}</Text>
                          <Text style={styles.text2}>{': '}</Text>
                        </View>
                        <Text style={styles.text}>{details.InvoiceDate}</Text>
                        {/* <Text style={styles.text}>{''}</Text> */}
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text2}>{'Amount'}</Text>
                          <Text style={styles.text2}>{': '}</Text>
                        </View>
                        <Text style={styles.text}>{details.NetAmount}</Text>
                        {/* <Text style={styles.text}>{''}</Text> */}
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
                    {/* <FlatList style={{ backgroundColor: 'white' }}
                      //contentContainerStyle={{marginBottom:170}}
                      data={DetailsF}
                      horizontal={false}
                      scrollEnabled={true}
                      //ListFooterComponent={}
                      showsVerticalScrollIndicator={false}
                      numColumns={1}
                      keyExtractor={(item) => {
                        return item.ItemID;
                      }}
                      renderItem={({ item }) => { */}
                    <View style={{ marginLeft: 10, width: '70%', marginTop: 5 }}>
                      <Text style={styles.text}>{DetailsF.ItemName}</Text>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text2}>{'Qty'}</Text>
                          <Text style={styles.text2}>{': '}</Text>
                        </View>
                        <Text style={styles.text}>{DetailsF.Qty}</Text>
                      </View>
                      <View style={styles.textrow}>
                        <View style={styles.innerrow}>
                          <Text style={styles.text2}>{'price'}</Text>
                          <Text style={styles.text2}>{': '}</Text>
                        </View>
                        <Text style={styles.text}>{DetailsF.MRP}</Text>
                      </View>
                    </View>
                    {/* }}
                    /> */}
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
            </View>
          </Modal>
        </View> :
        <View>
          <LoaderTwo loader={loader} />
          {/* <Text>Loading...............</Text> */}
        </View>}
      {state.length == 0 && loader == false &&
        <View style={{ marginTop: '90%', alignSelf: 'center' }}>
          <Text>No Invoices</Text>
        </View>
      }
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