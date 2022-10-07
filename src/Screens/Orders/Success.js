// import React, { useEffect, useState } from 'react';
// import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CustomFilter } from '../../Components/CustomFilter';
// import { useIsFocused } from "@react-navigation/native";
// import { SIZES, COLORS, Fonts } from '../../Styles/theme';
// import { API_URL, GET_ORDERS } from '../../Apis/FirstApi';
// import { LoaderOne, LoaderTwo } from '../../Components/Loader';
// import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { CustomFilter } from '../../Components/CustomFilter';
import axios from 'axios';
import { SIZES, COLORS, Fonts } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, GET_ORDERS } from '../../Apis/FirstApi';
import { LoaderOne, LoaderTwo, LoaderThree } from '../../Components/Loader';
import moment from 'moment'

const Success = ({ navigation, route }) => {
  //   const isFocused = useIsFocused();
  //   const [data, setdata] = useState('')
  //   useEffect(() => {
  //     if(isFocused) {
  //     //setstate(param2)
  //     readData();
  //     console.log('useEffect')}
  //   }, [isFocused]);
  //   const readData = async () => {
  //     try {
  //       const myArray = await AsyncStorage.getItem("save");
  //       if (myArray !== null) {
  //         // We have data!
  //         console.log(JSON.parse(myArray));
  //         setdata(JSON.parse(myArray))
  //         console.log(data.CustomerData)
  //         console.log('save');
  //       }
  //     } catch (error) {
  //       //setdata('')
  //       alert(error)
  //       //setdata('')
  //       //alert('Failed to fetch the input from storage');
  //     }
  //   };
  //   if (data.length === 0 ){
  //   return (
  //     <View style={styles.containerone}>
  //        <Image
  //           style={styles.tinyLogo}
  //           source={require('../../Assets/Images/noorder.jpg')}
  //       />
  //       <Text style={{alignSelf:'center'}}>No Confirmed orders </Text>
  //     </View>
  //   )}
  //   else{
  //     return(
  //       <View style={styles.container}>
  //          <CustomFilter/>
  //       <FlatList style={{backgroundColor:'transparent'}}
  //                   data={data}
  //                   horizontal={false}
  //                   scrollEnabled={true}
  //                   //ListHeaderComponent={renderHeader}
  //                   showsVerticalScrollIndicator={false}
  //                   numColumns={1}
  //                   keyExtractor={(item) => {
  //                       return item.id;
  //                   }}
  //                   renderItem={({ item }) => {
  //                       return (
  //                       <View style ={{marginVertical:5,marginHorizontal:15}}>
  //                               <TouchableOpacity style={styles.card} 
  //                                                 onPress ={()=>navigation.navigate('OrderDetails',{
  //                                                               param:  item.CustomerDetails ,
  //                                                               param2: item.CustomerData})}>
  //                                 <View style={{margin :10}}>
  //                                   <Text style={styles.text}>{item.CustomerDetails.name}</Text>
  //                                   <Text style={styles.textitem}>Order No : VMOS00S{item.id}</Text>
  //                                   <View style={styles.raw}>
  //                                       <Text style={styles.text5}>No.of Items :{item.items}</Text>
  //                                       <Text style={styles.text5}>Amount :{item.amount}</Text>
  //                                   </View>
  //                                   <View style={styles.raw}>
  //                                       <Text style={styles.text5}>Date :{item.time}</Text>
  //                                       <Text style={styles.text5}>Time :{item.date}</Text>
  //                                   </View>
  //                               </View>
  //                               </TouchableOpacity>
  //                           </View>
  //                  )
  //                   }} 
  //                 />

  //     </View>
  //     )
  //   }
  // }
  // export default Success;
  // const styles = StyleSheet.create({
  //   tinyLogo:{
  //     width:SIZES.image120,
  //     height:SIZES.image120,
  //     //marginTop:200,
  //     alignSelf:'center',
  //     opacity:.7
  //   },
  // containerone:{
  //   flex: 1,
  //   backgroundColor:'white',
  //   alignItems:'center',
  //   justifyContent:'center'
  // },
  // container:{
  //   flex: 1,
  //   backgroundColor:'white',
  // },
  // card:{
  //   width:'100%' ,
  //   height:'auto',
  //   backgroundColor:COLORS.primary_light,
  //   alignSelf:'center',
  //   borderColor:COLORS.primary,
  //   borderWidth:.5,
  //   borderRadius:7
  //   //shadowColor:COLORS.primary,
  //   //elevation:20
  // },
  // text:{
  //   color:COLORS.black,
  //   fontSize:SIZES.large,
  //   fontFamily:Fonts.font_600,
  //   marginBottom:3,
  //   //alignSelf:'center'
  // },
  // text1:{
  // color:COLORS.black,
  // fontSize:SIZES.large,
  // fontFamily:Fonts.font_500,
  // marginVertical:15,
  // //alignSelf:'center'
  // },
  // textitem:{
  // color:COLORS.primary_black,
  // fontSize:SIZES.medium,
  // fontFamily:Fonts.font_500,
  // //marginVertical:15,
  // //alignSelf:'center'
  // },
  // text2:{
  // color:'#b2b8b4',
  // fontSize:SIZES.medium,
  // fontFamily:Fonts.font_400,
  // //marginTop:'50%',
  // //marginBottom:3,
  // alignSelf:'center'
  // },
  // text3:{
  // color:'grey',
  // fontSize:SIZES.medium,
  // fontFamily:Fonts.font_400,
  // alignSelf:'center',
  // marginVertical:5,
  // },
  // text5:{
  // color:'grey',
  // fontSize:SIZES.small,
  // fontFamily:Fonts.font_400,
  // alignSelf:'center',
  // marginVertical:5,
  // },
  // raw:{
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   backgroundColor:'transparent',
  //   //width:'80%',
  //   //alignSelf:'center'
  // }
  // })

  const [loader, setloader] = useState(false);
  const [state, setstate] = useState('');
  const [data, setdata] = useState('')
  const [value1, setvalue1] = useState(moment().format('DD-MM-YYYY'));
  const [value2, setvalue2] = useState(moment().subtract(10, 'days').format('DD-MM-YYYY'));
  const [date2, setDate2] = useState(new Date(Date.now()))
  const [date1, setDate1] = useState(new Date(new Date().setDate(date2.getDate() - 30)))
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShow2, setIsPickerShow2] = useState(false);
  const [PickerVisible, setPickerVisible] = useState(false);
  const [number,setnumber]=useState(1);
  // function onDateSelected1(event, value) {
  //   setvalue1(value);
  //   setDatePicker(false);
  // };
  const onDateSelected1 = (event, value) => {
    setDate1(value);
    setvalue2(moment(date1).format('DD-MM-YYYY'))
    setIsPickerShow(false)
  };
  function onDateSelected2(event, value) {
    setDate2(value);
    setvalue1(moment(date2).format('DD-MM-YYYY'))
    setIsPickerShow2(false)
  };
  function datefilter() {
    setstate('')
    getOrder()
    //console.log("30 days before" + date)
    setPickerVisible(false)
    //setData
  }
  useEffect(() => {
    getOrder();
  }, []);
  function addnumber(){
    setnumber=number+1;
  }
  async function getOrder() {
    setloader(true);
    const token = await AsyncStorage.getItem('userToken');
    const current = new Date();
    const prior = new Date().setDate(current.getDate() - 30);
    console.log(current.toISOString().split('T')[0]);
    let headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    };
    axios.get(`${API_URL}/${GET_ORDERS}?Offset=0&Limit=0&FromDate=${value2}&ToDate=${value1}`,
      headers).then(async (response) => {

        await setstate(response.data.Data)

        console.log(state);
        setloader(false);
        return {
          response: response.data
        };
      }).catch((err) => {
        console.log(err)
      });
  }


  // if (state.length === 0) {
  //     return (
  //         <View style={{ flex: 1 }} >
  //             <CustomHeaderTwo
  //                 heading={'Orders'}
  //                 onpress={() => navigation.goBack()}
  //             />
  //             <View style={styles.containerone}>
  //                 <Image
  //                     style={styles.tinyLogo}
  //                     source={require('../../Assets/Images/noorder.jpg')}
  //                 />
  //                 <Text style={{ alignSelf: 'center' }}>No Confirmed orders </Text>
  //             </View>
  //         </View>
  //     )
  // }
  // else {
  return (
    <View style={styles.container}>

      <CustomFilter
        value1={date1}
        value2={date2}
        onPressdate1={() => setIsPickerShow(true)}
        condition1={isPickerShow}
        text1={moment(date1).format("YYYY-MM-DD")}
        onChangevalue1={onDateSelected1}
        onPressdate2={() => setIsPickerShow2(true)}
        condition2={isPickerShow2}
        text2={moment(date2).format("YYYY-MM-DD")}
        onChangevalue2={onDateSelected2}
        onPress={() => datefilter()}
        PickerVisible={PickerVisible}
        PickerVisibletrue={() => setPickerVisible(true)}
        PickerVisiblefalse={() => setPickerVisible(false)}
      />
      {state !== '' && state.length > 0 ?
        <View>
          <FlatList style={{ backgroundColor: 'transparent', marginBottom: 50 }}
            data={state}
            horizontal={false}
            scrollEnabled={true}
            //inverted={true}
            //contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
            //ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.ID;
            }}
            renderItem={({ item,index }) => {
              return (
                <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
                  <TouchableOpacity style={styles.card}
                    onPress={() => navigation.navigate('Detail', {
                      param: item.ID
                    })}>
                    <View style={{ margin: 10 }}>
                      <View style={{flexDirection:'row'}}><Text style={styles.text}>{index+1}. </Text>
                      {/* setstate{setnumber(number+1)} */}
                      <Text style={styles.text}>{item.CustomerName}</Text>
                      </View>
                      <Text style={styles.textitem}>Order No : {item.SONo}</Text>
                      <View style={styles.raw}>
                        <Text style={styles.text5}>No.of Items :{item.NoOfItems}</Text>
                        <Text style={styles.text5}>Amount :{item.NetAmount}</Text>
                      </View>
                      <View style={styles.raw}>
                        <Text style={styles.text5}>Date :{item.SODate}</Text>
                        <Text style={styles.text5}>{item.Status}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        </View>
        :
        <View>
          <LoaderTwo loader={loader} />
          {/* <Text>Loading...............</Text> */}
        </View>}
      {state.length == 0 && loader == false &&
        <View style={{ marginTop: '60%', alignSelf: 'center' }}>
          <Text>No Orders</Text>
        </View>
      }
    </View>
  )
  // }
}
export default Success;
const styles = StyleSheet.create({
  tinyLogo: {
    width: SIZES.image120,
    height: SIZES.image120,
    //marginTop:200,
    alignSelf: 'center',
    opacity: .7
  },
  containerone: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.primary_light,
    alignSelf: 'center',
    borderColor: COLORS.primary,
    borderWidth: .5,
    borderRadius: 7
    //shadowColor:COLORS.primary,
    //elevation:20
  },
  text: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_600,
    marginBottom: 3,
    //alignSelf:'center'
  },
  text1: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_500,
    marginVertical: 15,
    //alignSelf:'center'
  },
  textitem: {
    color: COLORS.primary_black,
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_500,
    //marginVertical:15,
    //alignSelf:'center'
  },
  text2: {
    color: '#b2b8b4',
    fontSize: SIZES.medium,
    fontFamily: Fonts.font_400,
    //marginTop:'50%',
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
  raw: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    //width:'80%',
    //alignSelf:'center'
  }
})