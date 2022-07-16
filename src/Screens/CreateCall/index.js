
import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import {CustomInput} from '../../Components/CustomInput';
import {CustomButton } from '../../Components/CustomButton';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
//import {Cust}

const CreateCall = ({navigation}) => {
  return (
<SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
  <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1, }} 
      enableOnAndroid={Platform.OS === 'android'} 
      enableAutomaticScroll={true}>
    <View style={styles.container}>
            <CustomHeaderTwo
                    heading ={' '}
                    onpress={()=> navigation.goBack()}
                    />
            <View style={{marginHorizontal:25,marginTop:20}}>
               <Text style={styles.text}>Create New Lead</Text>
               <CustomInput
                    type = 'text' 
                    label= 'Name'
                    labelBG='white'
                    placeholderText='Enter Name'
                    iconname='user-1'

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Phone Number'
                    labelBG='white'
                    placeholderText='Enter Phone Number'
                    iconname='phone'
                    keyboardType='numeric'

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Address'
                    labelBG='white'
                    placeholderText='Enter Address'
                    iconname='location'

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Details'
                    labelBG='white'
                    placeholderText='Enter Details'
                    iconname='pen'

                  />
                <CustomInput
                    type = 'text' 
                    label= 'Information Conveyed'
                    labelBG='white'
                    placeholderText='Enter Information'
                    iconname='pen'

                  />
                 <CustomInput
                    type = 'text' 
                    label= 'E-mail'
                    labelBG='white'
                    placeholderText='Enter Email'
                    iconname='email'

                  />
                
                <CustomButton
                    title ={'Submit'}
                    onPress={()=>navigation.navigate('Home')}
                />
            </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default CreateCall;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    //justifyContent:'flex-end',
    backgroundColor:'white'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    paddingBottom: 70,
    paddingHorizontal: 15,
    width: '100%',
    //marginVertical: 10,
    alignSelf:'center',
    height:'50%',
    //marginTop:40,
    justifyContent:'flex-end',
    borderColor:'transparent',
    
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text:{
      color:COLORS.heading_black,
      fontSize:SIZES.verylarge,
      fontFamily:Fonts.font_700,
      marginVertical:15,
  },
 
  
});