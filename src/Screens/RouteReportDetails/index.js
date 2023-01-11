import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import React, { useEffect, useState } from 'react';
import { LoaderTwo } from '../../Components/Loader';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL, ROUTE_REPORT_DETAILS } from '../../Apis/SecondApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RouteReportDetails = ({navigation,route}) => {
const {param}=route.params;
const [loader, setloader] = useState(false);
const[state,setstate]=useState('')
  useEffect(() => {
    reportdetails()
  }, []);
  async function reportdetails() {
    setloader(true);
    console.log(param.route_report_id,'inside params')
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let body = {
      user_id: Data.Userid,
      route_report_id:param.route_report_id
    }
    console.log(body)
    axios.post(`${BASE_URL}/${ROUTE_REPORT_DETAILS}`,
    qs.stringify(body)).then(async (response) => {
      await setstate(response.data.route_report)
      console.log(state,"state")
        setloader(false)
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
        heading={'Report Details'}
        onpress={() => navigation.goBack()}
      />
      {state !== ''?
        <View>
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
                      <Text style={styles.text1}>{'Route Report ID'}</Text>
                      <Text style={styles.text1}>{': '}</Text>
                    </View>
                    <Text style={styles.text1}>{state.route_report_id}</Text>
                    
                  </View>
                  <View style={styles.textrow}>
                    <View style={styles.innerrow}>
                      <Text style={styles.text1}>{'Date'}</Text>
                      <Text style={styles.text1}>{': '}</Text>
                    </View>
                    <Text style={styles.text1}>{state.created_date}</Text>
                    
                  </View>
                  <View style={styles.textrow}>
                    <View style={styles.innerrow}>
                      <Text style={styles.text1}>{'Report Type'}</Text>
                      <Text style={styles.text1}>{': '}</Text>
                    </View>
                    <Text style={styles.text1}>{state.report_type}</Text>
                    
                  </View>
                  {state.description!==''&&
                  <View style={styles.textrow}>
                    <View style={styles.innerrow}>
                      <Text style={styles.text1}>{'Description'}</Text>
                      <Text style={styles.text1}>{': '}</Text>
                    </View>
                    <Text style={styles.text1}> {state.description}</Text>
                    
                  </View>
                  }
                </View>
              </View>

              
            </View>


          </View>
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          
        </View>}
      
    </View>
  )
}

export default RouteReportDetails

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
      text1: {
        color: COLORS.black,
        fontSize: SIZES.medium,
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
        marginBottom:10,
        //width:300
      },
      innerrow: {
        width: '100%',
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

})