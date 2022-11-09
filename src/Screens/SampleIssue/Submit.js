import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {COLORS, Fonts, SIZES} from '../../Styles/theme';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo';
import {CustomButton} from '../../Components/CustomButton';
import {CustomInput} from '../../Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import {LoaderTwo} from '../../Components/Loader';
import React, {useState} from 'react';

const Submit = ({navigation, route}) => {
  const {param, item} = route.params;
  console.log('param', param, 'item', item);
  const [qty, setqty] = useState();
  console.log('Customer ID', param);
  console.log('Item', item);
  const PostSave = async () => {
    const userData = await AsyncStorage.getItem('User_Data');
    let Data = JSON.parse(userData);
    const uid=Data.Userid
    const pid=item.product_id
    let posts = {
      user_id: uid,
      product_id: pid,
      quantity: qty,
      customer_id: param,
    }
    console.log('posts',posts)
    axios.post(`https://ayurwarecrm.com/demo/ajax/issue_sample`, qs.stringify(posts)).then(async(response)=> {
        if (response.status == 200) {
          Alert.alert("Saved Successfully ", ' ', 
          [
            {
              text: "Ok",
              cancelable: true,
              onPress: () => navigation.navigate('Home'),
              style: 'cancel',
            },
          ]
          );
        } else {
          Alert.alert("Failed Save, Try Again");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <CustomHeaderTwo
        heading={'Issue Sample'}
        onpress={() => navigation.goBack()}
      />
      <View style={{paddingHorizontal: '5%'}}>
        <View style={{margin: 10}}>
          <Text style={styles.heading}>Issue sample</Text>
          <View style={styles.line} />
        </View>
        <Text style={styles.text3}>Available Stock:{item.stock}</Text>
        <CustomInput
          type='text'
          keyboardType="numeric"
          label="Quantity"
          labelBG="white"
          width="100%"
          value={setqty}
          onChangeText={(text)=>setqty(text)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
            alignSelf: 'center',
          }}>
          <CustomButton
            style={{alignSelf: 'center'}}
            width1={'150%'}
            title={'Close'}
            height1={'28%'}
            onpress={() => navigation.goBack()}
          />
          <CustomButton
            style={{alignSelf: 'center'}}
            width1={'120%'}
            title={'Submit'}
            height1={'28%'}
            onPress={() => PostSave()}
          />
        </View>
      </View>
    </View>
  );
};

export default Submit;

const styles = StyleSheet.create({
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
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#b2b8b4',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
