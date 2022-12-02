import {StyleSheet, View, FlatList, Text, Dimensions,TouchableOpacity,Modal} from 'react-native';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo';
import {COLORS, Fonts, SIZES} from '../../Styles/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, GET_LEDGER} from '../../Apis/FirstApi';
import React, {useState, useEffect} from 'react';
import {LoaderOne, LoaderTwo} from '../../Components/Loader';
import {CustomFilter} from '../../Components/CustomFilter';
import {Icon, icoMoonConfigSet} from '../../Styles/icons';
import {CustomButton} from '../../Components/CustomButton';
import moment from 'moment';
// import { TouchableOpacity } from 'react-native-gesture-handler';


const SubLedger = ({navigation, route}) => {
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getInvoices();
  }, []);
  const item = ({item}) => {
    const openModal = item => {
      setstate1(item);
      setModalVisible(true);
      // console.log(param.sc);
    };
    return (
      <>
        <View
          style={{flexDirection: 'row', borderWidth: 1, borderColor: '#d1d7db'}}>
          <View
            style={{
              borderRightWidth: 1,
              borderColor: '#d1d7db',
              width: Width / 3.7,
              paddingLeft: 6,
              height: 30,
              justifyContent: 'center',
            }}>
            <Text style={{color: COLORS.primary, fontSize: 14}}>
              {' '}
              {item.TransDate}
            </Text>
          </View>
          <TouchableOpacity onPress={() => openModal(item)}>
          <View
            style={{
              borderRightWidth: 1,
              borderColor: '#d1d7db',
              width: Width / 4,
              height: 30,
              justifyContent: 'center',
              paddingLeft: 6,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                textAlign: 'right',
                marginRight: 5,
              }}>
              {item.TransNo}
            </Text>
          </View>
          </TouchableOpacity>
          <View
            style={{
              borderRightWidth: 1,
              borderColor: '#d1d7db',
              width: Width / 5,
              height: 30,
              justifyContent: 'center',
              paddingLeft: 6,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                textAlign: 'right',
                marginRight: 5,
              }}>
              {item.Debit}
            </Text>
          </View>
          <View
            style={{
              width: Width / 5,
              height: 30,
              justifyContent: 'center',
              paddingLeft: 6,
            }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                textAlign: 'right',
                marginRight: 5,
              }}>
              {item.Credit}
            </Text>
          </View>
        </View>
      </>
    );
  };
  const {param} = route.params;
  const [loader, setloader] = useState(false);
  const [state, setstate] = useState('');
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);
  // const [datePicker, setDatePicker] = useState(false);
  // const [datePicker1, setDatePicker1] = useState(false);
  const [value1, setvalue1] = useState(moment().format('DD-MM-YYYY'));
  const [value2, setvalue2] = useState(moment().subtract(30, 'days').format('DD-MM-YYYY'));
  const [date2, setDate2] = useState(new Date(Date.now()));
  const [date1, setDate1] = useState(new Date(new Date().setDate(date2.getDate() - 30)));
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [PickerVisible, setPickerVisible] = useState(false);
  // const [sumcredit,setsumcredit]=useState('0');
  // const [sumdebit,setsumdebit]=useState('0');
  const [date, setDate] = useState(
    moment().subtract(30, 'days').format('DD-MM-YYYY'),
  );

  const onDateSelected1 = (event, value) => {
    setDate1(value);
    setvalue2(moment(date1).format('DD-MM-YYYY'));
    console.log(value2);
    setIsPickerShow(false);
  };
  const onDateSelected2 = (event, value) => {
    setDate2(value);
    setvalue1(moment(date2).format('DD-MM-YYYY'));
    console.log(value1);
    setIsPickerShow2(false);
  };
  function datefilter() {
    setstate('');
    getInvoices();
    // console.log('30 days before' + date);
    setPickerVisible(false);
  }
  async function getInvoices(){
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    // console.log('Invoices function');
    // console.log(value2);
    // console.log(value1);
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    axios
      .get(
        `${API_URL}/${GET_LEDGER}?FromDate=${value2}&ToDate=${value1}&CustomerCode=${param}`,
        headers,
      )
      .then(async response => {
        setstate(response.data.Data);
        // setsumdebit(parseFloat(
        //   state.reduce((a, c) => {
        //     return a + c.Debit;
        //   }, 0),
        //   ).toFixed(2))
        //   setsumcredit(parseFloat(
        //     state.reduce((a, c) => {
        //       return a + c.Credit;
        //     }, 0),
        //     ).toFixed(2))
        //     console.log('sdebit',sumdebit)
        //     console.log('scredit',sumcredit)  
            // let sum = response.data.Data.reduce((a, c) => { return a + c.Debit }, 0);
            // console.log('sum: ', sum)
            // console.log(response.data.Data);


            // parseFloat(
              //   state.reduce((a, c) => {
                //     return a + c.Credit;
                //   }, 0),
                // ).toFixed(2) -
                //   parseFloat(
                  //     state.reduce((a, c) => {
          //       return a + c.Debit;
          //     }, 0),
          //   ).toFixed(2)
          
          
          setloader(false);
          return {
            response: response.data,
          };
        })
      .catch(err => {
        setloader(false);
        console.log(err);
      });
  }
  return (
    <>
      <View style={styles.container}>
        <CustomHeaderTwo
          heading={'Sub Ledger'}
          onpress={() => navigation.goBack()}
        />
        <CustomFilter
          value1={date1}
          value2={date2}
          onPressdate1={() => setIsPickerShow(true)}
          condition1={isPickerShow}
          onChangevalue1={onDateSelected1}
          text1={moment(date1).format('YYYY-MM-DD')}
          onPressdate2={() => setIsPickerShow2(true)}
          condition2={isPickerShow2}
          onChangevalue2={onDateSelected2}
          text2={moment(date2).format('YYYY-MM-DD')}
          onPress={() => datefilter()}
          PickerVisible={PickerVisible}
          PickerVisibletrue={() => setPickerVisible(true)}
          PickerVisiblefalse={() => setPickerVisible(false)}
        />
        {state !== '' && state.length > 0 ? (
          <View style={{marginHorizontal: 10}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              //inverted
              data={state}
              renderItem={item}
              keyExtractor={(item, index) => index}
              style={{marginBottom: 120}}
              ListHeaderComponent={
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#d1d7db',
                    }}>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 3.7,
                        paddingLeft: 6,
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                        Date
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 4,
                        paddingLeft: 6,
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                        Trans Type
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 5,
                        height: 30,
                        justifyContent: 'center',
                        paddingLeft: 6,
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16,}}>
                        Debit
                      </Text>
                    </View>
                    <View
                      style={{
                        width: Width / 5,
                        height: 30,
                        justifyContent: 'center',
                        paddingLeft: 6,
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                        Credit
                      </Text>
                    </View>
                  </View>
                </View>
              }
              ListFooterComponent={
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#d1d7db',
                    }}>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 3.7,
                        paddingLeft: 6,
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                        Total
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 4,
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text> </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 5,
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 16,
                          textAlign: 'right',
                          // marginRight: 5,
                        }}>
                        {parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Debit;
                          }, 0),
                        ).toFixed(1)}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: Width / 5,
                        // alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontSize: 16,
                          textAlign: 'right',
                          
                        }}>
                        {parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Credit;
                          }, 0),
                        ).toFixed(1)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: '#d1d7db',
                    }}>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 3.7,
                        paddingLeft: 6,
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                        Balance
                      </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 4,
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text> </Text>
                    </View>
                    <View
                      style={{
                        borderRightWidth: 1,
                        borderColor: '#d1d7db',
                        width: Width / 5,
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16}}>
                      {parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Credit;
                          }, 0),
                        ).toFixed(1) < parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Debit;
                          }, 0),
                        ).toFixed(1)?
                          parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Debit;
                          }, 0),
                        ).toFixed(2) -
                          parseFloat(
                            state.reduce((a, c) => {
                              return a + c.Credit;
                            }, 0),
                          ).toFixed(2):' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: Width / 5,
                        alignItems: 'center',
                        height: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: COLORS.primary, fontSize: 16,textAlign: 'right',}}>
                        {parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Debit;
                          }, 0),
                        ).toFixed(1) <= parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Credit;
                          }, 0),
                        ).toFixed(1)?
                          parseFloat(
                          state.reduce((a, c) => {
                            return a + c.Credit;
                          }, 0),
                        ).toFixed(2) -
                          parseFloat(
                            state.reduce((a, c) => {
                              return a + c.Debit;
                            }, 0),
                          ).toFixed(2):' '}
                      </Text>
                    </View>
                  </View>
                </View>
              }
            />
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onBackdropPress={() => setModalVisible(false)}
              backdropOpacity={0.5}
              onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}>
              <View style={[styles.modalStyle, {marginTop: Height / 10}]}>
                <View style={{margin: 10}}>
                  <Text style={styles.heading}>Invoice Details</Text>
                  <View style={styles.line} />
                  <View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Icon
                        name={'file-text1'}
                        color={'#319A2E'}
                        size={SIZES.radius15}
                        config={icoMoonConfigSet}
                        style={{marginTop: 5}}
                      />
                      <View
                        style={{
                          marginLeft: 10,
                          width: Width/2.7,
                        }}>
                        {/* <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Customer Name'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View>
                          <Text style={styles.text}>{state1.CustomerName}</Text>
                          {/* <Text style={styles.text}>{''}</Text>
                        </View> */}
                        <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Transaction Type'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View>
                          <Text style={styles.text}>{state1.TransNo}</Text>
                          
                        </View>
                        <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Transaction Number'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View>
                          <Text style={styles.text}>{state1.TransactionNo}</Text>
                        </View>
                        <View style={styles.textrow}>
                          <View style={styles.innerrow}>
                            <Text style={styles.text2}>{'Trans Date'}</Text>
                            <Text style={styles.text2}>{': '}</Text>
                          </View>
                          <Text style={styles.text}>{state1.TransDate}</Text>
                        </View>
                      </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Icon
                      name={"file-text1"}
                      color={'#319A2E'}
                      size={SIZES.radius15}
                      config={icoMoonConfigSet}
                      style={{ marginTop: 5 }}
                    />
                     </View> */}
                    <CustomButton
                      style={{alignSelf: 'flex-end'}}
                      width1={'30%'}
                      title={'Close'}
                      height1={'35%'}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        ) : (
          <View>
            <LoaderTwo loader={loader} />
            {/* <Text>Loading...............</Text> */}
          </View>
        )}
        {state.length == 0 && loader == false && (
          <View style={{marginTop: '90%', alignSelf: 'center'}}>
            <Text>No Sub Ledger</Text>
          </View>
        )}
      </View>
    </>
  );
};
export default SubLedger;

const styles = StyleSheet.create({
  modalStyle: {
    height: '22%',
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
    // alignItems: 'center',
    //width:300
  },
  innerrow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 'auto',
    flexDirection: 'row',
    //justifyContent: 'space-around',
    margin: 10,
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
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#b2b8b4',
  },
});
