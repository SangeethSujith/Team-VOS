import React,{useEffect} from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,Image} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES  } from '../../Styles/theme';
import {CustomInput} from '../../Components/CustomInput';
import {CustomButton } from '../../Components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

const SignIn = ({navigation}) => {
  
  const getdeviceId = () => {
    var uniqueId = DeviceInfo.getUniqueId();
    console.log(uniqueId);
  };
  getdeviceId();
  return (
<SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
  <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1, }} 
      enableOnAndroid={Platform.OS === 'android'} 
      enableAutomaticScroll={true}>
    <View style={styles.container}>
        {/*<View style={styles.circle}>*/}
            <Image
                style={styles.tinyLogo}
                source={require('../../Assets/Images/index.jpg')}
            />
            
        {/*</View>*/}
        <Text style={styles.appname}>Team VOS</Text>
        <View style={[styles.card, styles.elevation]}>
            <View style={{margin:5}}>
               <CustomInput
                    type = 'text' 
                    label= 'User Name'
                    labelBG='white'
                    placeholderText='Enter User Name'
                    iconname='user-1'

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Password'
                    labelBG='white'
                    iconname='user-lock'
                    placeholderText='Enter Password'
                    icon={true}

                  />
                <CustomButton
                    title ={'Sign In'}
                    onPress={()=>navigation.navigate('Home')}
                />
                <Text style={styles.text}>
                    Forgot your Password??
                </Text>
            </View>
        </View>
    </View>
  </KeyboardAwareScrollView>
</SafeAreaView>
  )
}
export default SignIn;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'flex-end',
    //backgroundColor:'#bbfccc'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    width: '100%',
    //marginVertical: 10,
    alignSelf:'center',
    //height:'50%',
    marginTop:40,
    justifyContent:'flex-end',
    borderColor:'transparent',
    
  },
  elevation: {
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
    alignSelf:'center',
    marginTop:10,
  },
  nameLogo:{
    alignSelf:'center'
  }
});