import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator, StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment';
import { SAVE_ORDER, API_URL } from '../../Apis/FirstApi';
import { LoaderOne, LoaderThree } from '../../Components/Loader';
import axios from 'axios';

const CreateOrder = ({ navigation, route }) => {

  const isFocused = useIsFocused();
  const { param, param2, pid, param3 } = route.params;
  const [date, setCurrentDate] = useState('');
  const [time, setCurrentTime] = useState('');
  const [state, setstate] = useState(param2)
  const [id, setid] = useState('1')
  const [draft, setdraft] = useState([])
  const [idtwo, setidtwo] = useState('1')
  const [save, setsave] = useState([])
  const [post, setpost] = useState()
  const [loader, setloader] = useState(false)

  useEffect(() => {
    if (isFocused) {
      //setstate({...state,param2})
      setstate(param2)
      readData();
      readDatasave();
      setpost(param3)
      console.log(post)
      //console.log('statedata' + state)
    }
    let secTimer = setInterval(() => {
      var date = moment().utcOffset('+05:30').format('hh.mm A');
      setCurrentDate(date);
      var Time = moment().format('DD-MM-YYYY');
      setCurrentTime(Time);
    }, 1000)
    //console.log('state');
    //console.log(state);
    return () => clearInterval(secTimer);
  }, [isFocused]);

  const [isSelected, setSelection] = useState(false);
  const readData = async () => {
    try {
      const myArray = await AsyncStorage.getItem('temp');
      if (myArray !== null) {
        // We have data!!
        //console.log('read data ', JSON.parse(myArray));
        setdraft(JSON.parse(myArray));
        //console.log(pid);
        if (pid !== 0) {
          setid(pid)
        }
        else {
          setid(draft.length + 1)
        }
      }
    } catch (error) {
      alert('Failed to fetch the input from storage');
    }
  };
  const readDatasave = async () => {
    try {
      const myArray = await AsyncStorage.getItem('save');
      const postarray = await AsyncStorage.getItem('post');
      console.log('postarray ', JSON.parse(postarray));
      console.log('read data ', JSON.parse(myArray));
      if (myArray !== null) {
        // We have data!!
        //console.log('read data ', JSON.parse(myArray));
        setsave(JSON.parse(myArray));
        if (pid !== 0) {
          setidtwo(pid)
        }
        else {
          setid(save.length + 1)
        }
      }
      if (postarray !== null) {
        // We have data!!
        //console.log('read data ', JSON.parse(myArray));
        //setpost(JSON.parse(postarray));

        if (pid !== 0) {
          setidtwo(pid)
        }
        else {
          setid(save.length + 1)
        }
      }
    } catch (error) {
      alert('Failed to fetch the input from storage');
    }
  };
  const removeitem = (item) => {
    setstate([...state.filter(Item => Item.id !== item.id)])
  }
  const temp = async () => {
    let Draft = {
      CustomerDetails: param,
      CustomerData: state,
      items: state.length,
      amount: result,
      date: date,
      time: time,
      id: id
    }
    //console.log('Drats temp', Draft)
    let Drafts = ([...draft.filter(Item => Item.id !== id), Draft])
    //console.log(state)

    try {
      await AsyncStorage.setItem('temp', JSON.stringify(Drafts));
      Alert.alert(
        "Do you Want to Draft Data ?", " ",
        [{
          text: "Cancel",
          cancelable: true,
          style: "cancel",
        },
        {
          text: "Yes",
          cancelable: true,
          onPress: () => navigation.navigate('Orders'),
          style: "cancel",
        },],
      );
    } catch (error) {
      alert('Failed to save the data to the storage')
    }
  }
  const Draft = () => {
    if (state.length > 0) {
      temp();
    }
    else {
      Alert.alert(
        "Plaese add Some items ", " ",
        [{
          text: "Ok",
          cancelable: true,
          style: "cancel",
        },],
      );
    }
  }
  const PostSave = async () => {
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData)
    let posts = {
      CustomerCode: param.sc,
      FSOCode: Data.UserCode,
      SalesOrderTrans: post
    }
    console.log(posts.SalesOrderTrans)
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.post(`${API_URL}/${SAVE_ORDER}`, posts,
      headers).then(async (response) => {
        if (response.status == 200) {
          setloader(false);
          Alert.alert(
            "Saved Successfully ", '',
            [
              {
                text: "Yes",
                cancelable: true,
                onPress: () => navigation.navigate('Home'),
                style: "cancel",
              }],
          );
        }
        else {
          setloader(false);
          Alert.alert(
            "Failed Saving Order, Try Again")
        }
      }
      ).catch((err) => {
        console.log(err)
      });

  }
  const Save = async () => {
    if (state.length > 0) {
      let Draft = {
        CustomerDetails: param,
        CustomerData: state,
        items: state.length,
        amount: result,
        date: date,
        time: time,
        id: idtwo
      }
      // let posts = {
      //   CustomerCode: "C00006",
      //   FSOCode: "E0641",
      //   SalesOrderTrans: post
      // }
      //console.log(posts)
      let Drafts = ([...save.filter(Item => Item.id !== idtwo), Draft])
      //console.log('pid', pid);
      if (pid !== 0) {
        let Drafts = ([...draft.filter(Item => Item.id !== pid)])
        //console.log('filter', Drafts);
        try {
          await AsyncStorage.setItem('temp', JSON.stringify(Drafts));
        }
        catch (error) {
          alert('Failed to save the data ')
        }
      }
      //console.log('Drats temp',Drafts)
      try {
        await AsyncStorage.setItem('save', JSON.stringify(Drafts));
        // setloader(true);
        // const token = await AsyncStorage.getItem('userToken');
        // let headers = {
        //   headers: {
        //     Authorization: 'Bearer ' + token,
        //   }
        // };
        // axios.post(`${API_URL}/${SAVE_ORDER}`, posts,
        //   headers).then(async (response) => {
        //     if (response.status == 200) {
        //       setloader(false);
        //       Alert.alert(
        //         "Saved Successfully", response.data)
        //       navigation.navigate('Orders')
        //       // {
        //       //   text: "ok",
        //       //   cancelable: true,
        //       //   onPress: () => navigation.navigate('Orders'),
        //       //   style: "cancel",
        //       // })

        //     }
        //     else {
        //       setloader(false);
        //       Alert.alert(
        //         "Failed Saving Order, Try Again")
        //     }
        //await setstate(response.data.Data)
        //alert(response)
        //console.log('state' + JSON.stringify(response));

        // }
        // ).catch((err) => {
        //   console.log(err)
        // });
        Alert.alert(
          "Do you Want to Save Data ?", " ",
          [{
            text: "Cancel",
            cancelable: true,
            style: "cancel",
          },
          {
            text: "Yes",
            cancelable: true,
            onPress: () => PostSave(),
            style: "cancel",
          },],
        );
      } catch (error) {
        alert('Failed to save the data to the storage')
      }
    }
    else {
      Alert.alert(
        "Plaese add Some items ", " ",
        [{
          text: "Ok",
          cancelable: true,
          style: "cancel",
        },],
      );

    }
  }

  const result = param2.reduce((total, currentValue) => total = total + currentValue.amount, 0);
  function ListOfItems() {
    return (
      <View style={{ width: SIZES.windowwidth / 1.2, alignSelf: 'center' }}>
        <FlatList style={{ backgroundColor: 'transparent' }}
          data={state}
          horizontal={false}
          scrollEnabled={true}
          //ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.card}>
                  <View style={{ width: '80%' }}>
                    <Text style={styles.textitem}>{item.name}</Text>
                    <Text style={styles.textitem2}>{item.nos}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.text5}>Price :{item.Price}</Text>
                      <Text style={styles.text5}>Quantity :{item.Qty}</Text>
                      <Text style={styles.text5}>Amount :{item.amount}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.logo}
                    onPress={() => removeitem(item)}>
                    <Icon
                      name={"cross"}
                      color={'red'}
                      size={SIZES.ten}
                      config={icoMoonConfigSet}
                    //onPress
                    //style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />

      </View>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      {/*<KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >*/}
      <CustomHeaderTwo
        heading={'Create Order'}
        onpress={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
        <Text style={styles.text}>{param.n}</Text>
        <Text style={styles.text3}>{param.c}</Text>
        <View style={styles.line} />
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'No.of Items'}</Text>
          <Text style={styles.text4}>{state.length === 0 ? '0.00' : state.length}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'Net Amount'}</Text>
          <Text style={styles.text4}>{state.length === 0 ? '0.00' : result}</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.text1}>{'Items'}</Text>
        <View style={styles.itemcontainer}>
          {state.length === 0 ?
            <Text style={styles.text2}>{'No Items to show , Click Add Items'}</Text>
            : <ListOfItems />}
        </View>
        <LoaderThree loader={loader} />
        <View style={styles.buttonrow}>
          <CustomButtonTwo
            title={'  Send'}
            width1={SIZES.windowwidth/1.19}
            onPress={() => Save()}
          />
          {/* <CustomButtonTwo
            title={'Draft'}
            width1={SIZES.image210}
            onPress={() => Draft()}
          /> */}
        </View>
        <CustomButton
          title={'Add Items'}
          onPress={() => navigation.navigate('SelectProducts', { param: param, pid: pid, param2: state })}
        //width1={150}
        />
      </View>
      {/*</KeyboardAwareScrollView>*/}
    </View>

  )
}
export default CreateOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: COLORS.primary_light,
    width: SIZES.windowwidth / 1.2,
    alignSelf: 'center',
    height: SIZES.windowwidth / 4.5,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .6
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
    marginBottom: 3,
    alignSelf: 'center'
  },
  text1: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
    marginVertical: 15,
    //alignSelf:'center'
  },
  textitem: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
    //marginVertical:15,
    //alignSelf:'center'
  },
  textitem2: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_500,
    //marginVertical:15,
    //alignSelf:'center'
  },
  text2: {
    color: '#b2b8b4',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    marginTop: '50%',
    //marginBottom:3,
    alignSelf: 'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center',
    marginVertical: 5,
  },
  text5: {
    color: 'grey',
    fontSize: SIZES.small,
    fontFamily: Fonts.font_400,
    alignSelf: 'center',
    marginVertical: 5,
  },
  text4: {
    color: COLORS.black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    alignSelf: 'center',
    marginVertical: 5,
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
  checkboxrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-evenly',
    height: 45,
    width: '100%',
    elevation: 6,
    borderRadius: 5,
    //borderColor:'grey',
    //borderWidth:1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  buttonrow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal:50
  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  line: {
    height: .5,
    width: '100%',
    backgroundColor: '#b2b8b4',
    marginVertical: 5
  },
  itemcontainer: {
    //flex:1,
    width: '100%',
    height: '50%',
    borderRadius: 7,
    backgroundColor: COLORS.background,
    //justifyContent:'center'
    //borderWidth:.5,
    //borderColor:'#b2b8b4'
  },
  logo: {
    height: SIZES.extralarge,
    width: SIZES.extralarge,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  }
});