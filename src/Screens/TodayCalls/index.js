import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment';
//import {Cust}

const TodayCalls = ({ navigation }) => {

  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  // const { param } = route.params;
  useEffect(() => {
    getCalls()
  }, []);

  async function getCalls() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      date: moment().format("YYYY-MM-DD"),
    }
    axios.post(`https://ayurwarecrm.com/teamvos-new/ajax/get_calls_update`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data.calls.new)
        console.log(response.data.calls.new);
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
        heading={'Calls'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' ?
        <View style={{ marginHorizontal: 20, marginTop: 20, marginBottom: 60 }}>
          <FlatList style={{ backgroundColor: 'white' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            //ListFooterComponent={}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.customer_id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('CallDetails', { param: item })}>
                  <View style={styles.card}>
                    <Icon
                      name={"phone"}
                      color={'#319A2E'}
                      size={SIZES.radius15}
                      config={icoMoonConfigSet}
                      style={{ marginTop: 5 }}
                    />
                    <View style={{ width: SIZES.windowwidth / 2 }}>
                      {/* <Text style={styles.text}>{item.name}</Text> */}
                      <Text style={styles.text}>{item.customer.smStoreName}</Text>
                      {/* <Text style={styles.text2}>{item.information_conveyed}</Text> */}
                      <Text style={styles.text3}>{item.customer.smCity}</Text>
                    </View>
                    <View>
                      <Text style={styles.text2}>{item.status == 'Not Visited' ? 'Not Visited' : 'Visited'}</Text>
                      <Text style={styles.text3}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={styles.line} />
                </TouchableOpacity>
              )
            }}
          />
          {/*<CustomPlusbutton
                onPress={()=>navigation.navigate('CreateCall')}
                style={styles.plusbutton}
                  />*/}
        </View>
        :
        <View style={{justifyContent:'center',flex:1}}>
          <LoaderTwo loader={loader} />
        </View>
        }
      {state1.length == 0 && loader == false &&
        <View style={{justifyContent:'center' }}>
          <Text style={styles.text}>No Calls To Display</Text>
        </View>
      }
    </View>

  )
}
export default TodayCalls;

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
    marginBottom: 3,
  },
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_400,
    //marginVertical:15,
  },
  plusbutton: {
    height: SIZES.plusbutton,
    width: SIZES.plusbutton,
    borderRadius: SIZES.radius30,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    //marginTop:80,
    //justifyContent:'center',
    borderColor: 'white',
    borderWidth: .5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    marginTop: -SIZES.profile
  },
  plus: {
    color: 'white',
    alignSelf: 'center',
    //textAlignVertical:'center',
    fontSize: 35,
  },



});