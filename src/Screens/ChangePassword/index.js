import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,Image} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES  } from '../../Styles/theme';
import {CustomInput} from '../../Components/CustomInput';
import {CustomButton } from '../../Components/CustomButton';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo';

const ChangePassword = ({navigation}) => {
  return (
    <View style={styles.container}>
        <CustomHeaderTwo
            heading ={'Change Password'}
            onpress={()=> navigation.goBack()}
        />
        {/*</View>
        <Text style={styles.appname}>Change Password</Text>*/}
        <View style={[styles.card, styles.elevation]}>
            <View style={{margin:5}}>
                <CustomInput
                    type = 'text' 
                    label= 'Old Password'
                    labelBG='white'
                    iconname='user-lock'
                    placeholderText='Enter Old Password'
                    secureTextEntry={true}
                    icon={true}

                  />
                <CustomInput
                    type = 'text' 
                    label= 'New Password'
                    labelBG='white'
                    iconname='user-lock'
                    placeholderText='Enter New Password'
                    secureTextEntry={true}
                    icon={true}

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Confirm Password'
                    labelBG='white'
                    iconname='user-lock'
                    placeholderText='Enter Confirm Password'
                    secureTextEntry={true}
                    icon={true}

                  />
                <CustomButton
                    title ={'Change'}
                    onPress={()=>navigation.navigate('Home')}
                />
                
            </View>
        </View>
    </View>
  )
}
export default ChangePassword;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    //justifyContent:'flex-end',
    //backgroundColor:'#bbfccc'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    marginTop:30,
    //borderTopLeftRadius:50,
    //borderTopRightRadius:50,
    //paddingBottom: 70,
    paddingHorizontal: 15,
    width: '100%',
    //marginVertical: 10,
    alignSelf:'center',
    //height:'50%',
    //marginTop:40,
    //justifyContent:'flex-end',
    //borderColor:'transparent',
    
    
  },
  elevation: {
    //justifyContent:'flex-end'
    //elevation: 20,
    //shadowColor: 'black',
  },
  text:{
      color:'grey',
      fontSize:12,
      fontFamily:Fonts.font_500,
      marginVertical:5,
      alignSelf:'flex-end'
  },
  circle:{
    width:100,
    height:100,
    borderRadius:50,
    alignSelf:'center',
    marginBottom:70,
    backgroundColor:'white',
    elevation: 20,
    shadowColor: 'green',
    justifyContent:'center'

  },
  appname:{
    fontFamily:Fonts.font_800,
    fontSize:SIZES.extralarge,
    color:'#08a352',
    alignSelf:'center',
    marginTop:10
  },
  tinyLogo:{
    width:150,
    height:150,
    alignSelf:'center'
  },
  nameLogo:{
    alignSelf:'center'
  }
});