import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet,Image} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import {CustomInput} from '../../Components/CustomInput';
import { CustomHeader } from '../../Components/CustomHeader';
import { DrawerActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
          onpress  ={() => navigation.dispatch(DrawerActions.openDrawer())}
          iconname = {'refresh'}/>
        <Text style={styles.hello}>Hello !</Text>
        <Text style={styles.something}>Arun Mehta</Text>
        
        <View style={[styles.card, styles.elevation]}>
                {/*<Icon
                    name={"cart"}
                    color={'grey'}
                    size={25}
                    config={icoMoonConfigSet}
                  /> */}
                <View style={styles.yellowbox}>
                    <View style={styles.row2}>
                        <Text style={styles.text2}>Target : 1567353</Text>
                        <Text style={styles.text2}>Achieved :7462</Text>
                    </View>
                </View>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.box}
                                    onPress={()=>navigation.navigate('TodayCalls')}>
                      <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon1.png')}>
                      </Image>
                      <Text style={styles.text}>Todays call</Text>
                  </TouchableOpacity>
                      <View style={styles.vertical}/>
                  <TouchableOpacity style={styles.box}
                                    onPress={()=>navigation.navigate('Orders')}>
                      <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon2.png')}>
                      </Image>
                      <Text style={styles.text}>New Order</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate('Customers')}>
                    <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon3.png')}>
                      </Image>
                        <Text style={styles.text}>Customers</Text>
                    </TouchableOpacity>
                    <View style={styles.vertical}/>
                    <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Leads')}>
                        <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon4.png')}>
                        </Image>
                        <Text style={styles.text}>Leads</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.box}>
                    <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon5.png')}>
                      </Image>
                        <Text style={styles.text}>Outstanding</Text>
                    </TouchableOpacity>
                        <View style={styles.vertical}/>
                    <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Target')}>
                    <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon6.png')}>
                      </Image>
                        <Text style={styles.text}>Tasks</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row2}>
                    <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Invoices')}>
                    <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon8.png')}>
                      </Image>
                        <Text style={styles.text}>Invoices</Text>
                    </TouchableOpacity>
                        <View style={styles.vertical}/>
                    <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Tasks')}>
                      <Image
                          style={{width: '30%', height: '30%', resizeMode: 'contain',alignSelf:'center'}}
                          source={require('../../Assets/Images/homeicon7.png')}>
                      </Image>
                        <Text style={styles.text}>Target</Text>
                    </TouchableOpacity>
                </View>
                {/*<CustomInput
                    type = 'text' 
                    label= 'Username'
                    labelBG='white'

                  />*/}
      
        </View>
        {/*<CustomPlusbutton 
            onPress={()=>navigation.navigate('CreateCall')}
            style={styles.plusbutton}
        />
        <TouchableOpacity onPress={()=>navigation.navigate('CreateCall')}>
        <LinearGradient colors={[ '#50C878','#009E60', COLORS.primary]}  style={styles.plusbutton}>
                <Text style={styles.plus}>
                  +
                </Text>
        </LinearGradient>
                </TouchableOpacity>*/}
    </View>
  )
}
export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    //justifyContent:'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '90%',
    marginVertical: SIZES.ten,
    alignSelf:'center',
    height:'75%',
    //marginTop:40,
    justifyContent:'center'
    
  },
  elevation: {
    elevation: 20,
    shadowColor: 'black',
  },
  plusbutton:{
    height:SIZES.plusbutton,
    width:SIZES.plusbutton,
    borderRadius:SIZES.radius30,
    overflow:'hidden',
    alignSelf:'center',
    backgroundColor:'green',
    marginTop:-SIZES.zindex40,
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
  text:{
    color:'grey',
    //textAlignVertical:'center',
    //padding:10 ,
    marginTop:5,
    fontFamily:Fonts.font_500,
    textAlign:'center',
    fontSize:SIZES.medium
    //borderColor:'grey',
    //borderWidth:1
},
text2:{
  color:'grey',
  //textAlignVertical:'center',
  //padding:10 ,
  //marginTop:5,
  marginHorizontal:5,
  fontFamily:Fonts.font_400,
  fontSize:SIZES.small,
  textAlign:'center'
  //borderColor:'grey',
  //borderWidth:1
},
hello:{
  color:COLORS.primary_black,
  fontSize:SIZES.extralarge,
  fontFamily:Fonts.font_400,
  width:'90%',
  alignSelf:'center',
  //paddingHorizontal: 25,
  paddingTop:20
},
something:{
  color:COLORS.primary_black,
  fontSize:SIZES.large,
  fontFamily:Fonts.font_400,
  width:'90%',
  alignSelf:'center',
  opacity:.7
},
box:{
  alignContent:'center',
  height:SIZES.image120,
  width:SIZES.image110,
  justifyContent:'center',
  alignSelf:'center',
},
row:{
  flexDirection:'row',
  justifyContent:'space-around',
  //alignContent :'center',
  borderColor:'transparent',
  borderBottomColor:'#dbd7d7',
  borderWidth:SIZES.borderhalf,
},
row2:{
  flexDirection:'row',
  justifyContent:'space-around',
  borderColor:'transparent',
  //borderBottomColor:'grey',
  //borderWidth:.5,
},
vertical:{
  height:'100%',
  width:2,
  backgroundColor:'#dbd7d7',
  marginTop:10
},
yellowbox:{
  width:'95%',
  //height:'auto',
  padding:10,
  alignSelf:'center',
  marginBottom:-SIZES.eight,
  backgroundColor:'#FDF7D3',
  borderRadius:20
}
});