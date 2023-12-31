import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import { BASE_URL, LEADS } from '../../Apis/SecondApi';
//import {Cust}

const Leads = ({ navigation }) => {
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('')
  useEffect(() => {
    getLeads()
  }, []);
  async function getLeads() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    // console.log(Data.Userid);
    let body = {
      UserId: Data.Userid
    }
    axios.post(`${BASE_URL}/${LEADS}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data.customers)
        // console.log(response.data.customers)
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
        heading={'Doctors'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60, justifyContent: 'center' }}>
          <FlatList style={{ backgroundColor: 'white' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            //ListFooterComponent={}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateCall', { param: item })}
                >
                  <View style={styles.card}>
                    <Icon
                      name={"phone"}
                      color={'#319A2E'}
                      size={15}
                      config={icoMoonConfigSet}
                      style={{ marginTop: 5 }}
                    />
                    <View style={{ marginLeft: 10, width: '100%' }}>
                      <Text style={styles.text}>{item.smStoreName}</Text>
                      <Text style={styles.text3}>{item.smPhone1}</Text>
                      <Text style={styles.text3}>{item.smCreationDate}</Text>
                    </View>
                  </View>
                  <View style={styles.line}/>
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
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text2}>{'No Leads to show , click PLUS icon to create a new one'}</Text>
        </View>
      }
      <TouchableOpacity style={{ position: 'absolute', left: 0, right: 20, bottom: 0 }}>
        <CustomPlusbutton
          onPress={() => navigation.navigate('CreateCall', { param: [] })}
          style={styles.plusbutton}
        />
      </TouchableOpacity>
    </View>

  )
}
export default Leads;

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
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_500,
    marginBottom: 3,
  },
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
    //marginBottom:3,
    width: '60%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.vsmall,
    fontFamily: Fonts.font_400,
    marginVertical: 2,
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
    //elevation: 2,
    //shadowColor: 'black',
    justifyContent: 'center',
    //marginTop:-SIZES.profile
  },
  plus: {
    color: 'white',
    alignSelf: 'center',
    //textAlignVertical:'center',
    fontSize: 35,
  },



});