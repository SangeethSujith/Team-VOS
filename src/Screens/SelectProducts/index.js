import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TextInput, Image, Modal, Dimensions, Alert } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import { CustomInput } from '../../Components/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoaderOne, LoaderTwo } from '../../Components/Loader';
import qs from 'qs';
import axios from 'axios';
import { BASE_URL, PRODUCTS } from '../../Apis/SecondApi';
import { API_URL, GET_OFFER } from '../../Apis/FirstApi';
import { useIsFocused } from "@react-navigation/native";
//import {Cust}

const SelectProducts = ({ navigation, route }) => {
  const { param, pid, param2 } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setloader] = useState(false);
  const [state1, setstate1] = useState('');
  const [state2, setstate2] = useState('');
  const Height = Dimensions.get('window').height;
  const [state, setstate] = useState({
    data: [{ id: 1, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
    { id: 2, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
    { id: 3, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
    { id: 4, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
    { id: 5, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
    { id: 6, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
    { id: 7, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
    { id: 8, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
    { id: 9, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
    { id: 10, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
    { id: 11, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
    { id: 12, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
    ],
    data1: [
      { id: 1, name: 'Medical Oils', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
      { id: 2, name: 'Lahyam', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
      { id: 3, name: 'Tablets', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
      { id: 4, name: 'Medical Oils', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
      { id: 5, name: 'Lahyam', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
      { id: 6, name: 'Tablets', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
      { id: 7, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
      { id: 8, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
      { id: 9, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
      { id: 10, name: 'Anuthailam', place: 'Calicut', Nos: '100 ml', Code: 'PROD0047', Price: '10' },
      { id: 11, name: 'Arukaladi Oil', place: 'Calicut', Nos: '200 ml', Code: 'PROD0047', Price: '10' },
      { id: 12, name: 'Asanavilwadi', place: 'Calicut', Nos: '30 ml', Code: 'PROD0047', Price: '10' },
    ]
  })
  const [Data, setData] = useState(state.data)
  const [array, setarray] = useState([])
  const [arraypost, setarraypost] = useState([])
  const [Category, setCategory] = useState(state.data1)
  const [item, setitem] = useState('')
  const [Quantity, setQuantity] = useState('')
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [active, setactive] = useState('New Medicines');
  const [offer, setoffer] = useState('nill');
  const isFocused = useIsFocused();
  const [filteredDataSource, setFilteredDataSource] = useState(state.data);
  const [masterDataSource, setMasterDataSource] = useState(state.data);
  useEffect(() => {
    if (isFocused) {
      setarray(param2)
      setarraypost(param2)
      getProducts()
    }
  }, [isFocused]);

  async function getProducts() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    //console.log(Data.Userid);
    let body = {
      user_id: Data.Userid,
      //product_id: 0
    }
    axios.post(`http://ayurwarecrm.com/demo/ajax/products?userid=${Data.Userid}`,
      qs.stringify(body)).then(async (response) => {
        setloader(false)
        await setstate1(response.data)
        setstate1(response.data.filter((items) => items.pmCategory === 'New Medicines'))
        setstate2(response.data)
        let state3 = response.data
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }
  const onPressHandler = (id, pmCategory) => {
    //setstate1(state2)
    setactive(pmCategory);
    setstate1(state2.filter((items) => items.pmCategory === pmCategory))
  }
  async function getOffer(item) {
    const token = await AsyncStorage.getItem('userToken');
    setloader(true)
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    console.log(param.sc, item.pmProductId)
    axios.get(`${API_URL}/${GET_OFFER}?CustomerCode=${param.sc}&ItemCode=${item.pmProductCode}`,
      headers).then(async (response) => {
        setloader(false)
        console.log(response.data.Data);
        setoffer(response.data.Data)
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }


  const openModal = (item) => {
    setQuantity('')
    setModalVisible(true);
    getOffer(item)
    setitem(item)
  }
  const Alerts = () => {
    Alert.alert(
      "Plaese add Some items ", " ",
      [{
        text: "Ok",
        cancelable: true,
        style: "cancel",
      },],
    );
  }
  const Additem = () => {
    let items = {
      id: item.pmProductId,
      title: param.name,
      name: item.pmProductName,
      nos: item.Nos,
      Price: item.insideKeralaPrice,
      Qty: Quantity,
      amount: item.insideKeralaPrice * Quantity,
      itemcode: item.pmProductCode
    }
    let postitem = {
      ItemCode: item.pmProductCode,
      Qty: Quantity
    }
    //console.log(postitem)
    setarray([...array.filter(Item => Item.id !== items.id), items])
    setarraypost([...arraypost.filter(Item => Item.ItemCode !== items.ItemCode), postitem])
    //console.log('arraypost', arraypost)
    saveData();
    setModalVisible(false)
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(array));
      await AsyncStorage.setItem('post', JSON.stringify(arraypost));
      //showAlert ();
    } catch (error) {
      alert('Failed to save the data to the storage')
    }

  }
  const searchFilterFunction = (text) => {
    if (text) {
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
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = (value) => {
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
  };
  const txtHandler = (enteredName) => {
    setQuantity(enteredName);
  };


  function RenderHeader() {
    return (
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
    )
  }

  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Select Products'}
        onpress={() => navigation.navigate('CreateOrder', { param: param, param2: array, pid: pid, param3: arraypost })}
      />
      {state1 && state2 !== '' ?
        <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
          <View>
            <Text style={styles.text}>{'Categories'}</Text>
            <View >
              <FlatList
                style={{ backgroundColor: 'white', height: SIZES.height70 }}
                data={state2.filter((v, i, a) => a.findIndex(v2 => (v2.pmCategory === v.pmCategory)) === i)}
                horizontal={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
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
                    <TouchableOpacity onPress={() => openModal(item)}>
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

                        <TouchableOpacity style={styles.logo}
                          onPress={() => openModal(item)}>
                          <Icon
                            name={"plus"}
                            color={COLORS.primary}
                            size={SIZES.icon}
                            config={icoMoonConfigSet}
                          //onPress
                          //style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.line} />
                  </View>
                )
              }}
            />
          </View>
          <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            backdropOpacity={3}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={[styles.modalStyle, { marginTop: Height / 3, height: Height / 3 }]}>
              <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, height: '100%' }}
                enableOnAndroid={Platform.OS === 'android'}
                enableAutomaticScroll={false}>
                <View style={{ margin: 20 }}>
                  <Text style={styles.heading}>{item.pmProductName}</Text>
                  <View style={styles.line} />
                  <Text style={styles.text4}>Price :{item.insideKeralaPrice} </Text>
                  <CustomInput
                    type='text'
                    label='Quantity'
                    labelBG='white'
                    placeholderText='Enter Quantity'
                    style={{ marginTop: 10 }}
                    keyboardType={'numeric'}
                    onChangeText={txtHandler}
                    value={Quantity}
                    iconname={'pencil2'}
                  />
                  {offer.length > 0 &&
                    <View >
                      <Text style={styles.text}>Scheme : {offer[0].Qty} + {offer[0].OfferQty}</Text>
                    </View>}
                  <View style={styles.buttonrow}>

                    <CustomButton
                      //style ={{alignSelf:'flex-end'}}
                      width1={SIZES.windowwidth / 3}
                      title={'Ok'}
                      height1={'30%'}
                      onPress={() => Quantity == 0 ? Alerts() : (Additem(), setoffer([]))}
                    />
                    <CustomButton
                      //style ={{alignSelf:'flex-end'}}
                      width1={SIZES.windowwidth / 3}
                      title={'close'}
                      height1={'30%'}
                      onPress={() => (setModalVisible(false), setoffer([]))}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </Modal>
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
export default SelectProducts;

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
  text4: {
    color: COLORS.heading_black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
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
    marginBottom: SIZES.radius30,
    marginTop: 10,
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
  modalStyle: {
    //height:Height/3,
    width: '90%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    elevation: 60,
    shadowColor: 'black',
    borderRadius: 10,
    //justifyContent:'center',
    //alignItems:'center'

  },
  heading: {
    //fontFamily: "poppins",
    fontFamily: Fonts.font_800,
    fontSize: SIZES.large,
    //fontStyle : 'normal',
    //textAlign:'center',
    //marginTop:heightPercentageToDP(.5),
    //fontSize: Theme.FONT_BIG,  
    //fontSize : Theme.FONT_TWNETY,
    color: COLORS.primary_black,
    marginBottom: 10
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});