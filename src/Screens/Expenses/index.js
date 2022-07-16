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

const Expenses = ({navigation }) => {
  //const { param}              = route.params; 
  //const [state, setstate] = useState('')
  const [isSelected, setSelection] = useState(true);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);
  const [isSelected4, setSelection4] = useState(true);
  const [isSelected5, setSelection5] = useState(false);
  const [isSelected6, setSelection6] = useState(false);
  return (
    <View style={styles.container}>
       <KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >
            <CustomHeaderTwo
                heading ={'Expenses'}
                onpress={()=> navigation.goBack()}
            />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
                <Text style={styles.text2}>{'Expense Type'}</Text>
                <View style={styles.checkboxrow}>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected}
                       onValueChange={setSelection}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>Route</Text>
                  </View>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected2}
                       onValueChange={setSelection2}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>Meeting</Text>
                  </View>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected3}
                       onValueChange={setSelection3}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>Task</Text>
                  </View>
                </View>
                <CustomInput
                    type = 'calender' 
                    label= 'Date'
                    labelBG='white'
                    placeholderText='22/04/2022'
                    //icon={true}
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'dropdown'
                    label= 'Select Route'
                    labelBG='white'
                    label1='Route1'
                    label2='Route2'
                    //placeholderText='22/04/2022'
                    //icon={true}
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Town Visited'
                    labelBG='white'
                    placeholderText='Enter Amount Of Order Booked '
                    //iconname='location'

                  />
                  <Text style={styles.text2}>{'DA'}</Text>
                   <View style={styles.checkboxrow}>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected4}
                       onValueChange={setSelection4}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>OS</Text>
                  </View>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected5}
                       onValueChange={setSelection5}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>HQ</Text>
                  </View>
                  <View style={styles.row}>
                    <CheckBox
                       value={isSelected6}
                       onValueChange={setSelection6}
                       style={styles.checkbox}
                    />
                    <Text style={styles.text3}>EX-HQ</Text>
                  </View>
                </View>
                  <CustomInput
                    type = 'text' 
                    label= 'Da'
                    labelBG='white'
                    placeholderText='250.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'dropdown'
                    label= 'Select Travel Type'
                    labelBG='white'
                    placeholderText='Bus'
                    label1='Bus'
                    label2='Bike'
                    //icon={true}
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Kilometer'
                    labelBG='white'
                    placeholderText='0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Bike Expenses'
                    labelBG='white'
                    placeholderText='0.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Additional KM'
                    labelBG='white'
                    placeholderText='0.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Lodge(max 1000)'
                    labelBG='white'
                    placeholderText='0.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Courier'
                    labelBG='white'
                    placeholderText='0.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Sundries'
                    labelBG='white'
                    placeholderText='0.0'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Remarks'
                    labelBG='white'
                    placeholderText='Enter Remarks'
                    //iconname='location'

                  />
                  <CustomInput
                    type = 'text' 
                    label= 'Total'
                    labelBG='white'
                    placeholderText='250'
                    //iconname='location'

                  />
                  <CustomButton
                     title={'Submit'}
                  />
            </View>
          </KeyboardAwareScrollView>
        </View>
   
  )
}
export default Expenses;

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
    //alignSelf:'center'
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