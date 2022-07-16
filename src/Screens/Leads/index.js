import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomPlusbutton } from '../../Components/CustomPlusbutton';
import LinearGradient from 'react-native-linear-gradient';
//import {Cust}

const Leads = ({navigation}) => {
  
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
                    heading ={'Leads'}
                    onpress={()=> navigation.goBack()}
                    />
                <View style={{flex:1 ,justifyContent:'center'}}>
             {/*<View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60,justifyContent:'center'}}>
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
                                   size  ={15}
                                   config={icoMoonConfigSet}
                                   style ={{marginTop:5}}
                                />
                                <View style={{marginLeft:10,width:'60%'}}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text2}>{item.address}</Text>
                                    <Text style={styles.text3}>{item.place}</Text>
                                </View>
                                <View style={{marginLeft:30 ,width:'30%'}}>
                                    <Text style={styles.text2}>{item.visited ?  'Not Visited':'Visited' }</Text>
                                    <Text style={styles.text3}>{item.date}</Text>
                                </View>
                           </View>
                           <View style={styles.line}/>
                           </TouchableOpacity>
                        )
                    }} 
                />*/}
            <Text style={styles.text2}>{'No Leads to show , click PLUS icon to create a new one'}</Text>
            <TouchableOpacity style={{position: 'absolute', left: 0, right: 20, bottom: 0}}>
              <CustomPlusbutton
                onPress={()=>navigation.navigate('CreateCall')}
                style={styles.plusbutton}
              />
            </TouchableOpacity>
            </View>
        </View>
   
  )
}
export default Leads;

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
      fontSize:SIZES.medium,
      fontFamily:Fonts.font_500,
      marginBottom:3,
  },
  text2:{
    color:COLORS.heading_black,
    fontSize:SIZES.small,
    fontFamily:Fonts.font_400,
    //marginBottom:3,
    alignSelf:'center',
    textAlignVertical:'center',
    width:'60%',
    textAlign:'center'
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
  //overflow:'hidden',
  //alignSelf:'flex-end',
  backgroundColor:'green',
  //marginTop:80,
  //justifyContent:'center',
  borderColor:'white',
  borderWidth:.5,
  //elevation: 2,
  //shadowColor: 'black',
  justifyContent:'center',
  //marginTop:-SIZES.profile
  },
  plus:{
    color:'white',
    alignSelf:'center',
    //textAlignVertical:'center',
    fontSize:35,
  },
 
 
  
});