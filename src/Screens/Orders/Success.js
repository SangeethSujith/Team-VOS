import React ,{useEffect,useState} from 'react';
import { Text, View ,StyleSheet,FlatList ,Image ,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomFilter } from '../../Components/CustomFilter';
import { useIsFocused } from "@react-navigation/native";
import { SIZES ,COLORS,Fonts } from '../../Styles/theme';


const Success = ({navigation,route}) => {
  const isFocused = useIsFocused();
  const [data, setdata] = useState('')
  useEffect(() => {
    if(isFocused) {
    //setstate(param2)
    readData();
    console.log('useEffect')}
  }, [isFocused]);
  const readData = async () => {
    try {
      const myArray = await AsyncStorage.getItem("save");
      if (myArray !== null) {
        // We have data!
        console.log(JSON.parse(myArray));
        setdata(JSON.parse(myArray))
        console.log(data.CustomerData)
        console.log('save');
      }
    } catch (error) {
      //setdata('')
      alert(error)
      //setdata('')
      //alert('Failed to fetch the input from storage');
    }
  };
  if (data.length === 0 ){
  return (
    <View style={styles.containerone}>
       <Image
          style={styles.tinyLogo}
          source={require('../../Assets/Images/noorder.jpg')}
      />
      <Text style={{alignSelf:'center'}}>No Confirmed orders </Text>
    </View>
  )}
  else{
    return(
      <View style={styles.container}>
         <CustomFilter/>
      <FlatList style={{backgroundColor:'transparent'}}
                  data={data}
                  horizontal={false}
                  scrollEnabled={true}
                  //ListHeaderComponent={renderHeader}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  keyExtractor={(item) => {
                      return item.id;
                  }}
                  renderItem={({ item }) => {
                      return (
                      <View style ={{marginVertical:5,marginHorizontal:15}}>
                              <TouchableOpacity style={styles.card} 
                                                onPress ={()=>navigation.navigate('OrderDetails',{
                                                              param:  item.CustomerDetails ,
                                                              param2: item.CustomerData})}>
                                <View style={{margin :10}}>
                                  <Text style={styles.text}>{item.CustomerDetails.name}</Text>
                                  <Text style={styles.textitem}>Order No : VMOS00S{item.id}</Text>
                                  <View style={styles.raw}>
                                      <Text style={styles.text5}>No.of Items :{item.items}</Text>
                                      <Text style={styles.text5}>Amount :{item.amount}</Text>
                                  </View>
                                  <View style={styles.raw}>
                                      <Text style={styles.text5}>Date :{item.time}</Text>
                                      <Text style={styles.text5}>Time :{item.date}</Text>
                                  </View>
                              </View>
                              </TouchableOpacity>
                          </View>
                 )
                  }} 
                />

    </View>
    )
  }
}
export default Success;
const styles = StyleSheet.create({
  tinyLogo:{
    width:SIZES.image120,
    height:SIZES.image120,
    //marginTop:200,
    alignSelf:'center',
    opacity:.7
  },
containerone:{
  flex: 1,
  backgroundColor:'white',
  alignItems:'center',
  justifyContent:'center'
},
container:{
  flex: 1,
  backgroundColor:'white',
},
card:{
  width:'100%' ,
  height:'auto',
  backgroundColor:COLORS.primary_light,
  alignSelf:'center',
  borderColor:COLORS.primary,
  borderWidth:.5,
  borderRadius:7
  //shadowColor:COLORS.primary,
  //elevation:20
},
text:{
  color:COLORS.black,
  fontSize:SIZES.large,
  fontFamily:Fonts.font_600,
  marginBottom:3,
  //alignSelf:'center'
},
text1:{
color:COLORS.black,
fontSize:SIZES.large,
fontFamily:Fonts.font_500,
marginVertical:15,
//alignSelf:'center'
},
textitem:{
color:COLORS.primary_black,
fontSize:SIZES.medium,
fontFamily:Fonts.font_500,
//marginVertical:15,
//alignSelf:'center'
},
text2:{
color:'#b2b8b4',
fontSize:SIZES.medium,
fontFamily:Fonts.font_400,
//marginTop:'50%',
//marginBottom:3,
alignSelf:'center'
},
text3:{
color:'grey',
fontSize:SIZES.medium,
fontFamily:Fonts.font_400,
alignSelf:'center',
marginVertical:5,
},
text5:{
color:'grey',
fontSize:SIZES.small,
fontFamily:Fonts.font_400,
alignSelf:'center',
marginVertical:5,
},
raw:{
  flexDirection:'row',
  justifyContent:'space-between',
  backgroundColor:'transparent',
  //width:'80%',
  //alignSelf:'center'
}
})