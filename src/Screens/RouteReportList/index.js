import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import moment from 'moment';
import { BASE_URL, GET_ROUTE_REPORT } from '../../Apis/SecondApi';
import axios from 'axios';

const RouteReportList = ({navigation}) => {
    const [loader, setloader] = useState(false);
  const [state, setstate] = useState('');
  useEffect(() => {
    getreports();
  },[])

  async function getreports() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let body = {
      user_id: Data.Userid,
    }
    axios.post(`${BASE_URL}/${GET_ROUTE_REPORT}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate(response.data.routes)
        console.log(response.data.routes);
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
        heading={'Route Reports'}
        onpress={() => navigation.goBack()}
      />
      {state !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <FlatList style={{ backgroundColor: 'white', height: '100%' }}
            data={state}
            horizontal={false}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('RouteReportDetails', { param: item })}>
                  <View style={styles.card}>
                    <Image
                      style={{ width: '15%', height: '100%', resizeMode: 'contain', alignSelf: 'center', opacity: .5, borderColor: COLORS.primary, borderWidth: 1 }}
                      source={require('../../Assets/Images/accounting.png')}>
                    </Image>
                    <View style={{ width: '75%' }}>
                      <Text style={styles.text2}>{item.report_type}</Text>
                      <Text style={styles.text3}>{item.created_date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />

          <CustomPlusbutton
            onPress={() => navigation.navigate('RouteReport', { param: '' })}
            style={styles.plusbutton}
          />
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading...............</Text>
        </View>}
      {state.length == 0 && loader == false &&
        <View style={{ marginTop: '60%', alignSelf: 'center' }}>
          <Text>No Reports To Display</Text>
        </View>
      }
    </View>

  )
}

export default RouteReportList

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      card: {
        backgroundColor: 'white',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-around',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
      },
      elevation: {
        //elevation: 20,
        //shadowColor: 'black',
      },
      text: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_500,
        marginBottom: 3,
      },
      text2: {
        color: COLORS.heading_black,
        fontSize: SIZES.medium,
        fontFamily: Fonts.font_400,
        marginBottom: 3,
      },
      text3: {
        color: 'grey',
        fontSize: SIZES.vsmall,
        fontFamily: Fonts.font_400,
        //marginVertical:15,
      },
      text4: {
        color: COLORS.primary,
        fontSize: SIZES.vsmall,
        fontFamily: Fonts.font_600,
        //opacity:.5
        //marginVertical:15,
      },
      plusbutton: {
        height: SIZES.plusbutton,
        width: SIZES.plusbutton,
        borderRadius: SIZES.radius30,
        //overflow:'hidden',
        //alignSelf:'flex-end',
        backgroundColor: 'green',
        //marginTop:80,
        //justifyContent:'center',
        borderColor: 'white',
        borderWidth: .5,
        //elevation: 20,
        //shadowColor: 'black',
        justifyContent: 'center',
        //marginTop:-SIZES.profile,
    
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
        backgroundColor: '#b2b8b4',
        //marginVertical:5
      },

})