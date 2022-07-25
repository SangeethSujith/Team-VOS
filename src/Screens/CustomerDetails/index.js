import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import {Cust}

const CustomerDetails = ({ navigation, route }) => {
  const { param } = route.params;
  const [state, setstate] = useState('')
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      {/*<KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >*/}
      <CustomHeaderTwo
        heading={'Customer Details'}
        onpress={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 25, marginTop: 20, marginBottom: 60 }}>
        <Text style={styles.text}>{param.name}</Text>
        <Text style={styles.text3}>{param.place}</Text>
        <Text style={styles.text1}>{'Outstanding'}</Text>
        <View style={styles.line} />
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'0-30 Days'}</Text>
          <Text style={styles.text4}>{'0.00'}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'31-60 Days'}</Text>
          <Text style={styles.text4}>{'0.00'}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'61-90 Days'}</Text>
          <Text style={styles.text4}>{'3564.00'}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'91-180 Days'}</Text>
          <Text style={styles.text4}>{'56747.00'}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'181-360 Days'}</Text>
          <Text style={styles.text4}>{'577.00'}</Text>
        </View>
        <View style={styles.textrow}>
          <Text style={styles.text3}>{'Above 365 Days'}</Text>
          <Text style={styles.text4}>{'0.00'}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.buttonrow}>
          <CustomButtonTwo
            title={'Order Details'}
            width1={SIZES.image210}
            onPress={() => navigation.navigate('InvoiceOrder')}
          />
          <CustomButtonTwo
            title={'Invoices'}
            width1={SIZES.image210}
            onPress={() => navigation.navigate('Invoices')}
          />
        </View>
        <CustomButtonTwo
          title={'View Subledger'}
        //width1 ={SIZES.image210} 
        //onPress={()=>navigation.navigate('DispatchDetails')}
        />
        {/*<View style={styles.buttonrow}>
                 <CustomButtonTwo
                     title  ={'Dispatch Details'}
                     width1 ={SIZES.image210} 
                     onPress={()=>navigation.navigate('DispatchDetails')}
                  />
                  <CustomButtonTwo
                     title  ={'Collection'}
                     width1 ={SIZES.image210}
                     onPress={()=>navigation.navigate('SampleIssue')}
                  />
                  </View>*/}
      </View>
      {/*</KeyboardAwareScrollView>*/}
    </View>

  )
}
export default CustomerDetails;

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
    fontSize: SIZES.verylarge,
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
  text2: {
    color: COLORS.heading_black,
    fontSize: SIZES.large,
    fontFamily: Fonts.font_400,
    marginBottom: 3,
    alignSelf: 'center'
  },
  text3: {
    color: 'grey',
    fontSize: SIZES.medium,
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
    justifyContent: 'space-between',
    marginTop: 5
  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  line: {
    height: .5,
    width: '100%',
    backgroundColor: '#b2b8b4'
  },
});