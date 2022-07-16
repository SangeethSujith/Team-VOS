import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
//import {Cust}

const TodayCalls = ({navigation}) => {
  
  const [state, setstate] = useState({
    data: [{ id:1  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:2  , name : 'Kalpetta ayrvedic clinic' , date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true},
           { id:3  , name : 'Kannur ayrvedic clinic' ,   date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:4  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:5  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:6  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:7  , name : 'Kalpetta ayrvedic clinic' , date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true},
           { id:8  , name : 'Kannur ayrvedic clinic' ,   date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:9  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:10 , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:11 , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:12 , name : 'Kalpetta ayrvedic clinic' , date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true},
           { id:13 , name : 'Kannur ayrvedic clinic' ,   date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:14 , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:15 , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true }]
  })
  return (
    <View style={styles.container}>
            <CustomHeaderTwo
                    heading ={'Calls'}
                    onpress={()=> navigation.goBack()}
                    />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
            <FlatList style={{backgroundColor:'white'}}
                    data={state.data}
                    horizontal={false}
                    scrollEnabled={true}
                    //ListFooterComponent={}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                           <TouchableOpacity onPress={()=>navigation.navigate('CallDetails',{param:item})}>
                           <View style={styles.card}>
                                <Icon
                                   name  ={"phone"}
                                   color ={'#319A2E'}
                                   size  ={SIZES.radius15}
                                   config={icoMoonConfigSet}
                                   style ={{marginTop:5}}
                                />
                                <View style={{width:SIZES.windowwidth /2}}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text2}>{item.address}</Text>
                                    <Text style={styles.text3}>{item.place}</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={styles.text2}>{item.visited ?  'Not Visited':'Visited' }</Text>
                                    <Text style={styles.text3}>{item.date}</Text>
                                </View>
                           </View>
                           <View style={styles.line}/>
                           </TouchableOpacity>
                        )
                    }} 
            />
            {/*<CustomPlusbutton
                onPress={()=>navigation.navigate('CreateCall')}
                style={styles.plusbutton}
                  />*/}
            </View>
        </View>
   
  )
}
export default TodayCalls;

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
    justifyContent:'space-around',
    margin:10
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  text:{
      color:COLORS.black,
      fontSize:SIZES.medium,
      fontFamily:Fonts.font_500,
      marginBottom:3,
  },
  text2:{
    color:COLORS.heading_black,
    fontSize:SIZES.small,
    fontFamily:Fonts.font_400,
    marginBottom:3,
},
text3:{
    color:'grey',
    fontSize:SIZES.vsmall,
    fontFamily:Fonts.font_400,
    //marginVertical:15,
},
plusbutton:{
  height:SIZES.plusbutton,
  width:SIZES.plusbutton,
  borderRadius:SIZES.radius30,
  overflow:'hidden',
  alignSelf:'flex-end',
  backgroundColor:'green',
  //marginTop:80,
  //justifyContent:'center',
  borderColor:'white',
  borderWidth:.5,
  elevation: 20,
  shadowColor: 'black',
  justifyContent:'center',
  marginTop:-SIZES.profile
  },
  plus:{
    color:'white',
    alignSelf:'center',
    //textAlignVertical:'center',
    fontSize:35,
  },
 
 
  
});