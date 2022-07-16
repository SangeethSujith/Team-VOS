import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomInput } from '../../Components/CustomInput';
import { CustomButton } from '../../Components/CustomButton';
import { CustomButtonTwo } from '../../Components/CustomButtonTwo';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import {Cust}

const CallDetails = ({navigation ,route}) => {
  const { param}              = route.params; 
  const [state, setstate] = useState('')
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  return (
    <View style={styles.container}>
       <KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >
            <CustomHeaderTwo
                heading ={''}
                onpress={()=> navigation.goBack()}
            />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
                <Text style={styles.text}>{param.name}</Text>
                <Text style={styles.text2}>{param.address}</Text>
                <Text style={styles.text3}>{param.place}</Text>
                <View style={styles.checkboxrow}>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected}
                       onValueChange={setSelection}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>Mark as Visited</Text>
                  </View>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected2}
                       onValueChange={setSelection2}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>Not Available</Text>
                  </View>
                </View>
                <CustomInput
                    type = 'text' 
                    label= 'Prescribing Products'
                    labelBG='white'
                    placeholderText='Enter Prescribing Products'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Amount Of Order Booked'
                    labelBG='white'
                    placeholderText='Enter Amount Of Order Booked '
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Complaints'
                    labelBG='white'
                    placeholderText='Enter Complaints'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Information Conveyed'
                    labelBG='white'
                    placeholderText='Enter Information Conveyed'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Collection'
                    labelBG='white'
                    placeholderText='Enter Collection'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Distance (K M)'
                    labelBG='white'
                    placeholderText='Distance from previous customer (K M)'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Remarks'
                    labelBG='white'
                    placeholderText='Enter Remarks'
                    //iconname='location'

                  />
                  <View style={styles.buttonrow}>
                  <CustomButton
                     title={'Submit'}
                     width1={SIZES.image210}
                  />
                  <CustomButtonTwo
                     title={'Sample Issue'}
                     width1={SIZES.image210}
                     onPress={()=>navigation.navigate('SampleIssue')}
                  />
                  </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
   
  )
}
export default CallDetails;

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
    margin:10
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text:{
      color:COLORS.black,
      fontSize:SIZES.verylarge,
      fontFamily:Fonts.font_500,
      marginBottom:3,
      alignSelf:'center'
  },
  text2:{
    color:COLORS.heading_black,
    fontSize:SIZES.large,
    fontFamily:Fonts.font_400,
    marginBottom:3,
    alignSelf:'center'
},
text3:{
    color:'grey',
    fontSize:SIZES.medium,
    fontFamily:Fonts.font_400,
    alignSelf:'center'
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
  checkboxrow:{
      flexDirection:'row',
      alignItems:'center',
      marginVertical:SIZES.ten,
      justifyContent:'space-evenly',
      height:SIZES.button,
      width:'100%',
      elevation: 6,
      borderRadius:5,
      //borderColor:'grey',
      //borderWidth:1,
      backgroundColor:COLORS.white,
      shadowColor: COLORS.black,
  
  },
  row:{
      flexDirection:'row',
      alignItems:'center'
  },
  checkbox: {
    alignSelf: "center",
  },
  buttonrow:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});