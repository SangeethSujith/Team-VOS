import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,Dimensions ,StatusBar} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import {CustomInput} from '../../Components/CustomInput';
import {CustomButton } from '../../Components/CustomButton';
import { CustomHeaderThree } from '../../Components/CustomHeaderThree';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Completed from './Confirmed'

const Target = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={styles.container}>
            <StatusBar backgroundColor={'#50C878'} barStyle='light-content'/>
            <LinearGradient colors={[ '#50C878','#009E60', COLORS.primary]}  style={{width:'100%',height:'10%'}}>
            <CustomHeaderThree
                heading ={'Tasks'}
                onpress={()=> navigation.goBack()}
             />  
            </LinearGradient>
            <Tab.Navigator
                initialRouteName="Pending"
                tabBarOptions={{
                    activeTintColor: COLORS.primary,
                    scrollEnabled: false,
                    tabBarLabel:{color: COLORS.primary},
                    tabStyle: { width: Dimensions.get('window').width /2 },
                    labelStyle: { fontSize: SIZES.small, fontFamily: Fonts.font_600 },
                    style: { backgroundColor: 'white' ,},
                }}
            >
                <Tab.Screen
                    name="Pending"
                    component={Pending}
                    options={{ tabBarLabel: "Pending" }}
                />
                <Tab.Screen
                    name="Completed"
                    component={Completed}
                    options={{ tabBarLabel: "Completed" }}
                />
                
            </Tab.Navigator>
    </View>
   
  )
}
export default Target;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    //justifyContent:'flex-end',
    backgroundColor:'white'
  },
 
  text:{
      color:COLORS.heading_black,
      fontSize:SIZES.verylarge,
      fontFamily:Fonts.font_700,
      marginVertical:15,
  },
  plusbutton:{
    height:SIZES.plusbutton,
    width:SIZES.plusbutton,
    borderRadius:SIZES.radius30,
    overflow:'hidden',
    alignSelf:'flex-end',
    backgroundColor:'green',
    marginTop:80,
    //justifyContent:'center',
    borderColor:'white',
    borderWidth:.5,
    elevation: 20,
    shadowColor: 'black',
    justifyContent:'center'
  },
  plus:{
    color:'white',
    alignSelf:'center',
    //textAlignVertical:'center',
    fontSize:35,
  },
 
  
});