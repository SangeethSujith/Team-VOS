import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Modal, Dimensions, ViewComponent,TextInput } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import { CustomFilter } from '../../Components/CustomFilter';
import axios from 'axios';
import { API_URL, GET_INVOICES, NOT_PURCHASED } from '../../Apis/FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo, LoaderThree } from '../../Components/Loader';
import moment from 'moment'
//import Modal from 'react-native-modal';
//import {Cust}

const ItemsNCustomers = ({ navigation, route }) => {
  const { param } = route.params;
  const [state, setstate] = useState('');
  const [loader, setloader] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [details, setdetails] = useState('')
  const [DetailsF, setDetailsF] = useState('')
  const [date, setDate] = useState(moment().subtract(30, 'days').format('DD-MM-YYYY'));

  useEffect(() => {
    getItems()
    console.log("30 days before" + date)
    setFilteredDataSource(state);
  }, []);

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
    getItems()
    console.log("30 days before" + date)
    setPickerVisible(false)
    //setData
  }
  async function getItems() {
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    const current = new Date();
    const prior = new Date().setDate(current.getDate() - 30);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    console.log(current.toISOString().split('T')[0]);
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    console.log(param)
    axios.get(`${API_URL}/${NOT_PURCHASED}?FromDate=${value2}&ToDate=${value1}&CustomerCode=${param}`,
      headers).then(async (response) => {
        setloader(false)
        await setstate(response.data.Data)
        setFilteredDataSource(response.data.Data)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  const [search,setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState('');
  // const [masterDataSource, setMasterDataSource] = useState(state);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = state.filter(
        function (item) {
          const itemData = item.ItemName
            ? item.ItemName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(state);
      // console.log(filteredDataSource);
      setSearch(text);
    }
  };
  //   async function InvoiceDetails(item) {
  //     const token = await AsyncStorage.getItem('userToken');
  //     setloader1(true)
  //     let headers = {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       }
  //     };
  //     console.log(item.ID)
  //     axios.get(`${API_URL}/${GET_INVOICES_DETAILS}?ID=${item.ID}`,
  //       headers).then(async (response) => {

  //         await setdetails(response.data.Data)
  //         await setDetailsF(response.data.Data.SalesInvoiceTrans[0])
  //         console.log(DetailsF);
  //         //console.log(response.data.Data.SalesInvoiceTrans[0])
  //         setloader1(false)
  //         console.log(item.ID);
  //         openModal(item)
  //         return {
  //           response: response.data
  //         };
  //       }).catch((err) => {
  //         console.log(err)
  //       });
  //   }

  //   const openModal = (item) => {
  //     setModalVisible(true);
  //   }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={' '}
        onpress={() => navigation.goBack()}
      />
      <LoaderThree loader={loader1} />
      {state !== '' ?
        <View>
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
       <View style={styles.searchheader}>
            <Icon
              name={'search'}
              color={COLORS.primary}
              size={SIZES.icon}
              config={icoMoonConfigSet}
              style={{opacity: 0.4, marginHorizontal: SIZES.ten}}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              returnKeyType={'next'}
              autoFocus={false}
              //showSoftInputOnFocus={false}
              //onChangeText={(text) => searchFilterFunction(text)}
              //onClear={(text) => searchFilterFunction('')}
              //status='info'
              placeholder="Search Products"
              style={{
                fontFamily: Fonts.font_400,
                fontSize: SIZES.medium,
                width: '100%',
              }}
              textStyle={{color: '#000', fontFamily: Fonts.font_400}}
            />
          </View>
          <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 20 }}>
            <FlatList style={{ backgroundColor: 'white', height: '97%' }}
              //contentContainerStyle={{marginBottom:170}}
              data={filteredDataSource}
              horizontal={false}
              scrollEnabled={true}
              //ListFooterComponent={}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              keyExtractor={(item, index) => index}
              renderItem={({ item,index }) => {
                return (
                  <TouchableOpacity
                  //onPress={() => InvoiceDetails(item)}
                  >
                    <View style={styles.card}>
                      <Icon
                        name={"file-text1"}
                        color={'#319A2E'}
                        size={SIZES.radius15}
                        config={icoMoonConfigSet}
                        style={{ marginTop: 2 }}
                      />
                      <View style={{ width: SIZES.windowwidth / 2, marginLeft: 20 }}>
                        {/* <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text}>{'Item No'}</Text>
                            <Text style={styles.text}>{': '}</Text>
                          </View>
                          <Text style={styles.text3}>{item.ItemCode}</Text>
                        </View> */}
                        {/* <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Item Name'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View> */}
                         <View style={{flexDirection:'row'}}>
                        <Text style={styles.text}>{index+1} . </Text>
                        <Text style={styles.text2}>{item.ItemName}</Text>
                        </View>
                        {/* </View> */}
                        {/* <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Customer Name'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View>
                          <Text style={styles.text3}>{item.CustomerName}</Text>
                        </View> */}
                      </View>
                    </View>
                    <View style={styles.line} />
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </View> :
        <View>
          <LoaderTwo loader={loader} />
          {/* <Text>Loading...............</Text> */}
        </View>}
      {state.length == 0 && loader == false &&
        <View style={{ marginTop: '90%', alignSelf: 'center' }}>
          <Text>No Items</Text>
        </View>
      }
      
    </View>
      



  )
}

export default ItemsNCustomers;

const styles = StyleSheet.create({
  searchheader: {
    // backgroundColor: '#fff',
    height: SIZES.image50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: COLORS.white,
    //borderColor:COLORS.primary,
    //borderWidth:.5,
    borderRadius: SIZES.radius30,
    // elevation: 10,
    shadowColor: 'black',
    marginHorizontal:20,
  },
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
    //alignItems: 'center',
    //justifyContent: 'space-around',
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
    //marginBottom: 5,
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