import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import { BASE_URL, PRODUCTS } from '../../Apis/SecondApi';
//import {Cust}

const Products = ({ navigation }) => {
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  const [state2, setstate2] = useState('');
  useEffect(() => {
    getProducts()
  }, []);

  async function getProducts() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      //product_id: 5
    }
    axios.post(`http://ayurwarecrm.com/demo/ajax/products?userid=${Data.Userid}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        // console.log(response.data)
        await setstate1(response.data)
        setstate1(response.data)
        setstate2(response.data)
        // onPressHandler(state2.pmProductId, 'All')
        console.log(state1);

        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  const [state, setstate] = useState({
    data: [{ id: 1, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
    { id: 2, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
    { id: 3, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
    { id: 4, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
    { id: 5, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
    { id: 6, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
    { id: 7, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
    { id: 8, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
    { id: 9, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
    { id: 10, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
    { id: 11, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
    { id: 12, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
    ],
    data1: [
      { id: 1, name: 'Medical Oils', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
      { id: 2, name: 'Lahyam', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
      { id: 3, name: 'Tablets', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
      { id: 4, name: 'Medical Oils', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
      { id: 5, name: 'Lahyam', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
      { id: 6, name: 'Tablets', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
      { id: 7, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
      { id: 8, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
      { id: 9, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
      { id: 10, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047' },
      { id: 11, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047' },
      { id: 12, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047' },
    ]
  })
  const [Data, setData] = useState(state.data)
  const [Category, setCategory] = useState(state.data1)
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [active, setactive] = useState('All');
  const [filteredDataSource, setFilteredDataSource] = useState(state.data);
  const [masterDataSource, setMasterDataSource] = useState(state.data);

  const onPressHandler = (id, pmCategory) => {
    //setstate1(state2)
    if(pmCategory=='All')
    {
    setactive(pmCategory);
    setstate1(state2);
    }
    else{
      setactive(pmCategory);
    setstate1(state2.filter((items) => items.pmCategory === pmCategory));
  }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  // const handleSearch = (value) => {
  //   const filteredData = Data.filter(item => {
  //     const formattedQuery = item.name.toUpperCase();
  //     const textData = value.toUpperCase();
  //     return formattedQuery.indexOf(textData) > -1;
  //   })
  //   setData(filteredData);
  //   setQuery(value)
  //   if (!value || value === '') {
  //     setData(state.data);
  //   }
  // };
  const handleSearch = (value) => {
    if(active=='All'){
      const filteredData = state2.filter(item => {
        const formattedQuery = item.pmProductName.toUpperCase();
        const textData = value.toUpperCase();
        return formattedQuery.indexOf(textData) > -1;
      })
      setstate1(filteredData);
      setSearch(value);
      setQuery(value)
      if (!value || value === '') {
        setstate1(state2);
      } 
    }
    else{
    const filteredData = state2.filter((items) => items.pmCategory === active).filter(item => {
      const formattedQuery = item.pmProductName.toUpperCase();
      const textData = value.toUpperCase();
      return formattedQuery.indexOf(textData) > -1;
    })
    setstate1(filteredData);
    setSearch(value);
    setQuery(value)
    if (!value || value === '') {
      setstate1(state2.filter((items) => items.pmCategory === active));
    }
  }
  };
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Products'}
        onpress={() => navigation.goBack()}
      />
      {state1 && state2 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <Text style={styles.text}>{'Categories'}</Text>
          <View >
          <TouchableOpacity style={[{width: SIZES.image170,
    height: SIZES.zindex40,
    borderWidth: 1,
    backgroundColor: COLORS.background,
    borderColor: COLORS.primary,
    borderRadius: 7,
    marginTop:10,
    marginBottom:10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',},
                  {
                    backgroundColor: active == 'All' ?
                      COLORS.primary : COLORS.background
                  }]}
                    onPress={() => onPressHandler(state2.pmProductId, 'All')}>
                    <Text style={[styles.text2,
                    {
                      color: active == 'All' ?
                        COLORS.white : COLORS.primary_black
                    }]}>All
                    </Text>

                  </TouchableOpacity>
            <FlatList style={{ backgroundColor: 'white', height: SIZES.height70 }}
              data={state2.filter((v, i, a) => a.findIndex(v2 => (v2.pmCategory === v.pmCategory)) === i)}
              horizontal={true}
              scrollEnabled={true}
              //ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              //numColumns={1}
              keyExtractor={(item) => {
                return item.pmProductId;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={[styles.logosecond,
                  {
                    backgroundColor: active == item.pmCategory ?
                      COLORS.primary : COLORS.background
                  }]}
                    onPress={() => onPressHandler(item.pmProductId, item.pmCategory)}>
                    <Text style={[styles.text2,
                    {
                      color: active == item.pmCategory ?
                        COLORS.white : COLORS.primary_black
                    }]}>{item.pmCategory}
                    </Text>

                  </TouchableOpacity>
                )
              }}
            />
          </View>
          {/*<View style={styles.logosecond}>
                        <Text style={styles.text2}>{'All Categories'}</Text>  
                    </View>*/}
                    <View
        style={styles.searchheader}>
        <Icon
          name={"search"}
          color={COLORS.primary}
          size={SIZES.icon}
          config={icoMoonConfigSet}
          style={{ opacity: .4, marginHorizontal: SIZES.ten }}
        />
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(value) => handleSearch(value)}
          value={search}
          returnKeyType={"next"}
          autoFocus={true}
          status='info'
          placeholder='Search Products'
          style={{
            fontFamily: Fonts.font_400,
            fontSize: SIZES.medium,
            width: '100%'
          }}
          textStyle={{ color: '#000', fontFamily: Fonts.font_400 }}
        />
      </View>
          <FlatList style={{ backgroundColor: 'white', marginBottom: 180 }}
            data={state1}
            horizontal={false}
            scrollEnabled={true}
            //ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.pmProductId;
            }}
            renderItem={({ item }) => {
              return (
                <View>

                  <View style={styles.card}>
                    <View style={styles.logofirst}>
                      <Image
                        style={styles.tinyLogo}
                        source={require('../../Assets/Images/medicine.png')}
                      />
                    </View>
                    <View style={{ width: SIZES.windowwidth / 2.3 }}>
                      <Text style={styles.text}>{item.pmProductName}</Text>
                      <Text style={styles.text2}>{item.pmProductCode}</Text>
                      <Text style={styles.text3}>{item.pmCategory}/{item.pmDivisionCode}</Text>
                      <Text style={styles.text}>MRP : {item.insideKeralaPrice}</Text>
                    </View>

                    {/*<View style={styles.logo}>
                                  <Icon
                                      name  ={"plus"}
                                      color ={COLORS.primary}
                                      size  ={SIZES.icon}
                                      config={icoMoonConfigSet}
                                      //onPress
                                      //style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
                                  />
                                </View>*/}
                  </View>

                  <View style={styles.line} />
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
          <Text>No Products To Display</Text>
        </View>
      }
    </View>

  )
}
export default Products;

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
    margin: 10,
    alignItems: 'center',
    //marginBottom:60
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  logo: {
    width: SIZES.radius30,
    height: SIZES.radius30,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
    borderRadius: SIZES.eight,
    //borderColor:COLORS.primary,
    //borderWidth:1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    //marginRight:10
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
    backgroundColor: '#E8E8E8'
  },
  searchheader: {
    backgroundColor: '#fff',
    height: SIZES.image50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    //borderColor:COLORS.primary,
    //borderWidth:.5,
    borderRadius: SIZES.radius30,
    elevation: 10,
    shadowColor: 'black',
    marginBottom: 20
  },
  logofirst: {
    opacity: .4,
    width: SIZES.height70,
    height: SIZES.height70,
    borderWidth: .5,
    backgroundColor: COLORS.primary_light,
    borderColor: COLORS.primary,
    borderRadius: 7,
    justifyContent: 'center'
  },
  logosecond: {
    //opacity:.4 ,
    width: SIZES.image170,
    height: SIZES.zindex40,
    borderWidth: 1,
    backgroundColor: COLORS.background,
    borderColor: COLORS.primary,
    borderRadius: 7,
    marginBottom: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //elevation:10,
    //shadowColor:COLORS.primary
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },


});