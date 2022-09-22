import React, { useState, useEffect } from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList , Modal} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import {LoaderTwo } from '../../Components/Loader';
//import Modal from 'react-native-modal';
//import {Cust}

const SampleIssue = ({navigation,route}) => {
           const { param } = route.params; 
           const [state, setstate] = useState('');
           const [loader, setloader] = useState(false) 
  useEffect(() => {
    getsamples()
  }, []);
           async function getsamples() {
            setloader(true);
            const userData = await AsyncStorage.getItem('User_Data');
            let Data = JSON.parse(userData)
            let body = {
              user_id: Data.Userid,
            }
            axios.post(`https://ayurwarecrm.com/demo/ajax/get_sample_stock`,
              qs.stringify(body)).then(async (response) => {
                setloader(false)
                await setstate(response.data.data)
                console.log(response.data.data);
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
                    heading ={'Sample Issue'}
                    onpress={()=> navigation.goBack()}
                    />
                    {state !== '' ?
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
            <FlatList style={{backgroundColor:'white'}}
                    data={state}
                    horizontal={false}
                    scrollEnabled={true}
                    //ListFooterComponent={}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => {
                        return item.product_id;
                    }}
                    renderItem={({ item }) => {
                        return (
                           <View>
                           <View style={styles.card}>
                                <Icon
                                   name  ={"database"}
                                   color ={'#319A2E'}
                                   size  ={SIZES.radius15}
                                   config={icoMoonConfigSet}
                                   style ={{marginTop:5}}
                                />
                                <View style={{width:'59%'}}>
                                    <Text style={styles.text}>{item.product_name}</Text>
                                    <Text style={styles.text2}>{item.product_code}</Text>
                                    <Text style={styles.text3}>Available Stock : {item.stock}</Text>
                                </View>
                                <View style={{marginLeft:20}}>
                                    <CustomButton
                                       width1={80}
                                       height1={30}
                                       title={'Issue'}
                                    />
                                </View>
                           </View>
                           <View style={styles.line}/>
                           </View>
                        )
                    }} 
            />
            </View>
            :
          <View>
          <LoaderTwo loader={loader}/>
          <Text>Loading ....</Text>
          </View>
          } 
          {state.length == 0 && loader == false &&
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text2}>{'Check Connection'}</Text>
        </View>
      }
        </View>
   
  )
}
export default SampleIssue;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    alignSelf:'center',
    height:'auto',
    flexDirection:'row',
    margin:10,
    justifyContent:'space-around'
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text:{
      color:COLORS.black,
      fontSize:SIZES.medium,
      fontFamily:Fonts.font_500,
      marginBottom:3,
  },
  text2:{
    color:COLORS.heading_black,
    fontSize:SIZES.small,
    fontFamily:Fonts.font_400,
    marginBottom:3,
},
text3:{
    color:'grey',
    fontSize:SIZES.vsmall,
    fontFamily:Fonts.font_400,
    //marginVertical:15,
},
plusbutton:{
    height:60,
    width:60,
    borderRadius:30,
    overflow:'hidden',
    alignSelf:'flex-end',
    backgroundColor:'green',
    marginTop:80,
    //justifyContent:'center',
    borderColor:'white',
    borderWidth:.5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent:'center',
    marginTop:-80
  },
  plus:{
    color:'white',
    alignSelf:'center',
    //textAlignVertical:'center',
    fontSize:35,
  },
  line:{
      height:.5,
      width:'100%',
      backgroundColor:'#b2b8b4'
  },
  modalStyle:{
    height:100,
    width:100
  }
 
 
  
});