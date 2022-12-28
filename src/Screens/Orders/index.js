import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Icon, icoMoonConfigSet } from '../../Styles/icons';
import { COLORS, Fonts, SIZES } from '../../Styles/theme';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomHeaderThree } from '../../Components/CustomHeaderThree';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Success from './Success';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const isFocused = useIsFocused();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#50C878'} />
      <LinearGradient colors={['#50C878', '#009E60', COLORS.primary]} style={{ width: '100%', height: '10%' }}>
        <CustomHeaderThree
          heading={'Orders'}
          onpress={() => navigation.goBack()}
        />
      </LinearGradient>
      <Tab.Navigator
        initialRouteName="Pending"
        tabBarOptions={{
          activeTintColor: COLORS.primary,
          scrollEnabled: false,
          tabBarLabel: { color: COLORS.primary },
          tabStyle: { width: Dimensions.get('window').width },
          labelStyle: { fontSize: SIZES.small, fontFamily: Fonts.font_600 },
          style: { backgroundColor: 'white', },
        }}
      >
        <Tab.Screen
          name="Confirmed"
          component={Success}
          options={{ tabBarLabel: "Confirmed Orders" }}
        />
        {/* <Tab.Screen
          name="Draft"
          component={Pending}
          options={{ tabBarLabel: "Draft" }}
        /> */}

      </Tab.Navigator>

      <View style={{ marginHorizontal: 25, marginBottom: 25, justifyContent: 'flex-end' }}>
        <CustomPlusbutton
          onPress={() => navigation.navigate('SelectCustomers')}
          style={styles.plusbutton}
        />
      </View>
    </View>

  )
}
export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent:'flex-end',
    backgroundColor: 'white'
  },

  text: {
    color: COLORS.heading_black,
    fontSize: SIZES.verylarge,
    fontFamily: Fonts.font_700,
    marginVertical: 15,
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
    justifyContent: 'center'
  },
  plus: {
    color: 'white',
    alignSelf: 'center',
    //textAlignVertical:'center',
    fontSize: 35,
  },


});