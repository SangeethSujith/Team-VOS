import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList ,TextInput,StatusBar} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
//import {Cust}

const SelectCustomers = ({navigation}) => {
  
  const [state, setstate] = useState({
    data: [{ id:1  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:2  , name : 'Athreya' ,               place :'Calicut' , },
           { id:3  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:4  , name : 'Dr. Preetha' ,           place :'Calicut' , },
           { id:5  , name : 'Dr.Anu Tony' ,           place :'Calicut' , },
           { id:6  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:7  , name : 'Athreya' ,               place :'Calicut' , },
           { id:8  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:9  , name : 'Dr. Preetha' ,           place :'Calicut' , },
           { id:10  , name : 'Dr.Anu Tony' ,           place :'Calicut' , },
           { id:11  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:12  , name : 'Athreya' ,               place :'Calicut' , },
           { id:13  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:14  , name : 'Dr. Preetha' ,           place :'Calicut' , },
           { id:15  , name : 'Dr.Anu Tony' ,           place :'Calicut' , },
           { id:16  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:17  , name : 'Athreya' ,               place :'Calicut' , },
           { id:18  , name : 'Elaj ayrvedic clinic' ,  place :'Calicut' , },
           { id:20  , name : 'Dr. Preetha' ,           place :'Calicut' , },
           { id:19  , name : 'Dr.Anu Tony' ,           place :'Calicut' , }
    ]
  })
  const [Data, setData] = useState(state.data)
  const [query, setQuery]     = useState('');
  
  const handleSearch = (value) => {
    const filteredData = Data.filter(item =>{
    const formattedQuery = item.name.toUpperCase(); 
    const textData = value.toUpperCase();
    return formattedQuery.indexOf(textData) > -1;
  })
  setData(filteredData);
  setQuery(value)
  if(!value ||value === '') {
  setData(state.data);
  }
};

  function RenderHeader  ()  {
      return(
    <View
      style={styles.searchheader}>
      <Icon
         name  ={"search"}
         color ={COLORS.primary}
         size  ={SIZES.icon}
         config={icoMoonConfigSet}
         style ={{opacity:.4 ,marginHorizontal:10}}
      />                         
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(value) => handleSearch(value)}
        //value={value}
        status='info'
        placeholder='Search Customers'
        style={{
          fontFamily:Fonts.font_400,
          fontSize:SIZES.medium,
          width:'100%'
        }}
        textStyle={{ color: '#000',fontFamily:Fonts.font_400 }}
      />
    </View>
    )
  }

  return (
    <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white}/>
            <CustomHeaderTwo
                    heading ={'Select Customers'}
                    onpress={()=> navigation.goBack()}
                    />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
            <RenderHeader/>
            <FlatList style={{backgroundColor:'white'}}
                    data={Data}
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
                           <TouchableOpacity onPress={()=>navigation.navigate('CreateOrder',{param:item ,param2:[ ] , pid : 0 })}>
                           <View style={styles.card}>
                                <Icon
                                   name  ={"user-1"}
                                   color ={COLORS.primary}
                                   size  ={SIZES.radius30}
                                   config={icoMoonConfigSet}
                                   style ={{opacity:.4}}
                                />
                                <View style={{marginLeft:10,width:'90%'}}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text3}>{item.place}</Text>
                                </View>
                           </View>
                           <View style={styles.line}/>
                           </TouchableOpacity>
                        )
                    }} 
            />
            </View>
        </View>
   
  )
}
export default SelectCustomers;

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
    margin:10,
    alignItems:'center'
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
  line:{
    height:.5,
    width:'100%',
    backgroundColor:'#E8E8E8'
},
searchheader:{
    backgroundColor: '#fff',
    height:SIZES.Shadowheight,
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    backgroundColor:COLORS.white,
    //borderColor:COLORS.primary,
    //borderWidth:.5,
    borderRadius:SIZES.radius30,
    elevation: 10,
    shadowColor: 'black',
    marginBottom:20
}
 
  
});