import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment'
import { BASE_URL, GET_ROUTES } from '../../Apis/SecondApi';
//import {Cust}

const Routes = ({ navigation }) => {
  
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getRoutes()
  }, []);

  async function getRoutes() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let body = {
      user_id: Data.Userid,
    }
    axios.post(`${BASE_URL}/${GET_ROUTES}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data.routes)
        console.log(response.data.routes);
        AsyncStorage.setItem('Routes', JSON.stringify(response.data.routes.new));

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
        heading={'Routes'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <FlatList style={{ backgroundColor: 'white' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.route_id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TodayCallsRoute', { param: item })}>
                  <View style={styles.card}>
                    <Image
                      style={{ width: '15%', height: '100%', resizeMode: 'contain', alignSelf: 'center', opacity: .6 }}
                      source={require('../../Assets/Images/route.png')}>
                    </Image>
                    <View style={{ marginLeft: 10, width: 'auto' }}>
                      <Text style={styles.text}>{item.route_name}</Text>
                      <Text style={styles.text2}>{item.date}</Text>
                      <Text style={styles.text2}></Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading...............</Text>
        </View>}
      {state1.length == 0 && loader == false &&
        <View style={{ marginTop: '60%', alignSelf: 'center' }}>
          <Text>No Routes To Display</Text>
        </View>
      }

    </View>

  )
}
export default Routes;

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
    backgroundColor: '#b2b8b4',
    //marginVertical:5
  },



});