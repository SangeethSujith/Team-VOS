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
import axios from 'axios';
import { BASE_URL, EXPENCES, ROUTES } from '../../Apis/SecondApi';
//import {Cust}

const Expenseslist = ({ navigation }) => {
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  useEffect(() => {
    getExpenses();
    getRoutes();
  }, []);
  async function getRoutes() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      route_id: 18
    }
    axios.post(`${BASE_URL}/${ROUTES}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        //await setstate1(response.data.routes.new)
        //console.log(response.data.routes.new);
        AsyncStorage.setItem('Routes', JSON.stringify(response.data.routes.new));

        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  async function getExpenses() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      //user_id: 82,
      expense_id: 0
    }
    axios.post(`${BASE_URL}/${EXPENCES}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data.expenses.new)
        console.log(response.data.expenses.new);
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  const [state, setstate] = useState({
    data: [{ id: 1, name: 'Elaj ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut , hjfhkerh', visited: true },
    { id: 2, name: 'Kalpetta ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut', visited: true },
    { id: 3, name: 'Kannur ayrvedic clinic', date: '12/20/2022', address: 'Hospital_Cr', place: 'Calicut ,hkdfghgbved', visited: true },
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
  // const ListFooter = () => {
  //   //View to set in Footer
  //   return (
  //     <View >
  //       <Text style={styles.textStyle}>This is Footer</Text>
  //     </View>
  //   );
  // };
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Expenses'}
        onpress={() => navigation.goBack()}
      />
      {state1 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <FlatList style={{ backgroundColor: 'white', height: '100%' }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            // ListFooterComponent={ListFooter}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('Expenses', { param: item })}>
                  <View style={styles.card}>
                    <Image
                      style={{ width: '15%', height: '100%', resizeMode: 'contain', alignSelf: 'center', opacity: .5, borderColor: COLORS.primary, borderWidth: 1 }}
                      source={require('../../Assets/Images/accounting.png')}>
                    </Image>
                    <View style={{ width: '75%' }}>
                      {/* <Text style={styles.text}>{'Work with ASN kalpetta'}</Text> */}
                      <Text style={styles.text3}>{item.date}</Text>
                      <Text style={styles.text2}>{item.total}</Text>
                    </View>
                    {/* <Text style={styles.text4}>{'Synced'}</Text> */}
                  </View>
                  {/*<View style={styles.line}/>*/}
                </TouchableOpacity>
              )
            }}
          />

          <CustomPlusbutton
            onPress={() => navigation.navigate('Expenses', { param: '' })}
            //onPress={()=>console.log('preesss')}
            style={styles.plusbutton}
          />
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading...............</Text>
        </View>}
      {state1.length == 0 && loader == false &&
        <View style={{ marginTop: '60%', alignSelf: 'center' }}>
          <Text>No Expenses To Display</Text>
        </View>
      }
    </View>

  )
}
export default Expenseslist;

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



});