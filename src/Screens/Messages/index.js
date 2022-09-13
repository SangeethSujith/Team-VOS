import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import { BASE_URL, MESSAGES } from '../../Apis/SecondApi';
//import {Cust}

const Messages = ({ navigation }) => {

  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getMessages()
  }, []);

  async function getMessages() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      message_id: 8
    }
    axios.post(`${BASE_URL}/${MESSAGES}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data.messages.new)
        //console.log(response.data.messages);
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }

  const [state, setstate] = useState({
    data: [{ id: 1, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 2, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 3, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 4, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 5, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 6, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 7, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 8, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 9, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 10, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 11, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 12, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 13, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 14, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 15, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true }]
  })
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Messages'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <FlatList style={{ backgroundColor: 'white' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            //ListFooterComponent={}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.message_assign_id;
            }}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={styles.card}>
                    <Icon
                      name={"user-1"}
                      color={COLORS.primary}
                      size={50}
                      config={icoMoonConfigSet}
                      style={{ opacity: .5 }}
                    />
                    <View style={{ marginLeft: 10, width: '80%' }}>
                      <Text style={styles.text}>{item.message_title}</Text>
                      <Text style={styles.text3}>{item.date}</Text>
                      <Text style={styles.text2}>Created By :{item.created_by} </Text>
                      <View style={styles.message}>
                        <Text style={styles.messagetext}>
                          {item.message}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
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
          <Text>No Messages To Display</Text>
        </View>
      }
    </View>

  )
}
export default Messages;

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
    fontFamily: Fonts.font_800,
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
  messagetext: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    margin: 10,
    textAlign: 'left'
    //marginVertical:15,
  },
  message: {
    width: '100%',
    height: 'auto',
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    //opacity:.5
    //alignSelf:'center'
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



});