import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {Icon, icoMoonConfigSet} from '../../Styles/icons';
import {COLORS, Fonts, SIZES} from '../../Styles/theme';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo';
import {CustomButton} from '../../Components/CustomButton';
import {CustomInput} from '../../Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import {LoaderTwo} from '../../Components/Loader';
//import Modal from 'react-native-modal';
//import {Cust}

const SampleIssue = ({navigation, route}) => {
  const {param} = route.params;
  const [state, setstate] = useState('');
  const [state1,setstate1]=useState('');
  const [loader, setloader] = useState(false);
  const [open, setOpen] = useState(false);
  const [qty,setqty]=useState('');
  const Height = Dimensions.get('window').height;
  useEffect(() => {
    getsamples();
  }, []);
  const openModal=(item)=>{
    setstate1(item);
    setOpen(true)
    console.log(param.i);
  }
   async function getsamples() {
    setloader(true);
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData);
    console.log(Data.Userid)
    let body = {
      user_id: Data.Userid,
    };
    axios
      .post(
        `https://ayurwarecrm.com/teamvos-new/ajax/get_sample_stock`,
        qs.stringify(body),
      )
      .then(async response => {
        setloader(false);
        await setstate(response.data.data);
        console.log(response.data.data);
        return {
          response: response.data,
        };
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Sample Issue'}
        onpress={() => navigation.goBack()}
      />
      {state !== '' ? (
        <View style={{marginHorizontal: 25, marginTop: 20, marginBottom: 60}}>
          <FlatList
            style={{backgroundColor: 'white'}}
            data={state}
            horizontal={false}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={item => {
              return item.product_id;
            }}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={styles.card}>
                    <Icon
                      name={'database'}
                      color={'#319A2E'}
                      size={SIZES.radius15}
                      config={icoMoonConfigSet}
                      style={{marginTop: 5}}
                    />
                    <View style={{width: '59%'}}>
                      <Text style={styles.text}>{item.product_name}</Text>
                      <Text style={styles.text2}>{item.product_code}</Text>
                      <Text style={styles.text3}>
                        Available Stock : {item.stock}
                      </Text>
                    </View>
                    <View style={{marginLeft: 20}}>
                      <CustomButton
                        width1={80}
                        height1={30}
                        title={'Issue'}
                        // onPress={() => openModal(item)}
                        onPress={()=>navigation.navigate('Submit',{
                          param:param,
                          item:item
                        })}
                      />
                    </View>
                  </View>
                  <View style={styles.line} />
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <LoaderTwo loader={loader} />
          <Text>Loading ....</Text>
        </View>
      )}
      {state.length == 0 && loader == false && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.text2}>{'Check Connection'}</Text>
        </View>
      )}
    </View>
  );
};
export default SampleIssue;

const styles = StyleSheet.create({
  modalStyle: {
    height: '25%',
    width: '80%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    elevation: 60,
    shadowColor: 'black',
    borderRadius: 10,
    // justifyContent:'center',
  },
  heading: {
    //fontFamily: "poppins",
    fontFamily: Fonts.font_400,
    fontSize: SIZES.large,
    //fontStyle : 'normal',
    //textAlign:'center',
    //marginTop:heightPercentageToDP(.5),
    //fontSize: Theme.FONT_BIG,
    //fontSize : Theme.FONT_TWNETY,
    color: COLORS.primary_black,
    marginBottom: 10,
  },
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
    margin: 10,
    justifyContent: 'space-around',
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
    borderWidth: 0.5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    marginTop: -80,
  },
  plus: {
    color: 'white',
    alignSelf: 'center',
    //textAlignVertical:'center',
    fontSize: 35,
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#b2b8b4',
  },
});
