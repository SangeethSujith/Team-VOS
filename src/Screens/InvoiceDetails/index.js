import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import React, { useEffect, useState } from 'react';
import { LoaderTwo } from '../../Components/Loader';
import axios from 'axios';
import { API_URL, GET_INVOICES_DETAILS } from '../../Apis/FirstApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InvoiceDetails = ({ navigation, route }) => {
  const { id } = route.params;
  const Height = Dimensions.get('window').height;
  const [details, setdetails] = useState('')
  const [DetailsF, setDetailsF] = useState('')
  const [loader, setloader] = useState(false);
  useEffect(() => {
    InvoiceDetails()
  }, []);
  async function InvoiceDetails() {
    const token = await AsyncStorage.getItem('userToken');
    setloader(true)
    // console.log(id.ID)
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_INVOICES_DETAILS}?ID=${id.ID}`,
      headers).then(async (response) => {
        await setdetails(response.data.Data)
        await setDetailsF(response.data.Data.SalesInvoiceTrans)
        // console.log(response.data.Data);
        console.log(details.SalesInvoiceTrans[0]);
        setloader(false)
        //console.log(JSON.stringify(id));
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Invoice Details'}
        onpress={() => navigation.goBack()}
      />
      {details !== '' && DetailsF.length > 0 ?
        <View style={{}}>
          <View style={{ margin: 10 }}>
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
                    <Text style={styles.text}> {details.NetAmount}</Text>
                    {/* <Text style={styles.text}>{''}</Text> */}
                  </View>
                </View>
              </View>

              {/* <Icon
                name={"file-text1"}
                color={'#319A2E'}
                size={SIZES.radius15}
                config={icoMoonConfigSet}
                style={{ marginTop: 5 }}
              /> */}
              <Text style={styles.heading}>Invoice Items</Text>
              {/* <View style={styles.line} /> */}
              <View>
                {/* <FlatList style={{ backgroundColor: 'white' }}
                //contentContainerStyle={{marginBottom:170}}
                data={DetailsF}
                horizontal={false}
                scrollEnabled={true}
                //ListFooterComponent={}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  <View style={{ marginLeft: 10, width: '70%', marginTop: 5 }}>
                    <Text style={styles.text}>{item.ItemName}</Text>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'Qty'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text}>{item.Qty}</Text>
                    </View>
                    <View style={styles.textrow}>
                      <View style={styles.innerrow}>
                        <Text style={styles.text2}>{'price'}</Text>
                        <Text style={styles.text2}>{': '}</Text>
                      </View>
                      <Text style={styles.text}>{item.MRP}</Text>
                    </View>
                  </View>
                }}
              /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.primary_light, height: Height / 1.45 }}>
                  <View>
                    {DetailsF.map((item) => {
                      return (
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                          <Text style={styles.text}>{item.ItemName}</Text>
                          <View style={styles.textrow}>
                            <View style={styles.innerrow}>
                              <Text style={styles.text3}>{'Qty'}</Text>
                              <Text style={styles.text3}>{': '}</Text>
                            </View>
                            <Text style={styles.text3}>{item.Qty}</Text>
                          </View>
                          <View style={styles.textrow}>
                            <View style={styles.innerrow}>
                              <Text style={styles.text3}>{'price'}</Text>
                              <Text style={styles.text3}>{': '}</Text>
                            </View>
                            <Text style={styles.text3}>{item.MRP}</Text>
                          </View>
                          <View style={styles.line} />
                        </View>

                      );
                    })}
                  </View>
                </ScrollView>
                {/* <Text>{JSON.stringify(DetailsF)}</Text> */}
              </View>
              {/* <CustomButton
              style={{ alignSelf: 'flex-end' }}
              width1={'30%'}
              title={'Go Back'}
              height1={'25%'}
              onPress={() => navigation.goBack()}
            /> */}
            </View>


          </View>
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          {/* <Text>Loading...............</Text> */}
        </View>}
      {/* {DetailsF.length == 0 && loader == false &&
        <View style={{ marginTop: '90%', alignSelf: 'center' }}>
          <Text>No Items</Text>
        </View>
      } */}
    </View>
  )
}
export default InvoiceDetails

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
    alignSelf: 'center',
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