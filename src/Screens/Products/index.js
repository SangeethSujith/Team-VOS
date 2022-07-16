import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList ,TextInput ,Image} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
//import {Cust}

const Products = ({navigation}) => {
  
  const [state, setstate] = useState({
    data: [{ id:1  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
           { id:2  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
           { id:3  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
           { id:4  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
           { id:5  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
           { id:6  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
           { id:7  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
           { id:8  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
           { id:9  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
           { id:10  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
           { id:11  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
           { id:12  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
    ],
    data1: [
    { id:1  , name : 'Medical Oils' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
    { id:2  , name : 'Lahyam' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
    { id:3  , name : 'Tablets' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
    { id:4  , name : 'Medical Oils' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
    { id:5  , name : 'Lahyam' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
    { id:6  , name : 'Tablets' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
    { id:7  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
    { id:8  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
    { id:9  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
    { id:10  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047'},
    { id:11  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' },
    { id:12  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047'},
]
  })
  const [Data, setData] = useState(state.data)
  const [Category, setCategory] = useState(state.data1)
  const [query, setQuery]     = useState('');
  const [search, setSearch] = useState('');
  const [active,setactive]    = useState('1');
  const [filteredDataSource, setFilteredDataSource] = useState(state.data);
  const [masterDataSource, setMasterDataSource] = useState(state.data);

  const onPressHandler = (id) => {
    setactive(id); 
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  
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
         style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
      />                         
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        returnKeyType = {"next"}
        autoFocus = {true}
        status='info'
        placeholder='Search Products'
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
            <CustomHeaderTwo
                    heading ={'Products'}
                    onpress={()=> navigation.goBack()}
            />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
                <Text style={styles.text}>{'Categories'}</Text>
                <View >
                <FlatList style={{backgroundColor:'white' ,height:SIZES.height70}}
                    data={Category}
                    horizontal={true}
                    scrollEnabled={true}
                    //ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    //numColumns={1}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[styles.logosecond,{backgroundColor: active== item.id?COLORS.primary : COLORS.background}]}
                                              onPress={() =>onPressHandler(item.id)}>
                                    <Text style={[styles.text2,{color:active== item.id? COLORS.white:COLORS.primary_black}]}>{item.name}</Text>  
                              
                            </TouchableOpacity>
                        )
                    }} 
                />
                </View>
                    {/*<View style={styles.logosecond}>
                        <Text style={styles.text2}>{'All Categories'}</Text>  
                    </View>*/}
               
                <RenderHeader/>
                <FlatList style={{backgroundColor:'white',marginBottom:180}}
                    data={filteredDataSource}
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
                           <View>
                           <View style={styles.card}>
                                <View style={styles.logofirst}>
                                  <Image
                                     style={styles.tinyLogo}
                                     source={require('../../Assets/Images/medicine.png')}
                                 />
                                </View>
                                <View style={{width:SIZES.windowwidth /2.3}}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text2}>{item.Code}</Text>
                                    <Text style={styles.text}>{item.Nos}</Text>
                                    <Text style={styles.text3}>{'Medicated Oils/ Classical'}</Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>{'MRP : '}</Text>
                                    <Text style={styles.text2}>{'200.00'}</Text>
                                </View>
                                {/*<View style={styles.logo}>
                                  <Icon
                                      name  ={"plus"}
                                      color ={COLORS.primary}
                                      size  ={SIZES.icon}
                                      config={icoMoonConfigSet}
                                      //onPress
                                      //style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
                                  />
                                </View>*/}
                           </View>
                           <View style={styles.line}/>
                           </View>
                        )
                    }} 
            />
            </View>
        </View>
   
  )
}
export default Products;

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
    margin:10,
    alignItems:'center',
    //marginBottom:60
  },
  elevation: {
    //elevation: 20,
    //shadowColor: 'black',
  },
  logo:{
    width:SIZES.radius30,
    height:SIZES.radius30,
    justifyContent:'center',
    elevation: 10,
    shadowColor: COLORS.primary, 
    borderRadius:SIZES.eight, 
    //borderColor:COLORS.primary,
    //borderWidth:1,
    alignItems:'center',
    backgroundColor:COLORS.white,
    //marginRight:10
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
    height:SIZES.image50,
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
},
logofirst:{
    opacity:.4 ,
    width:SIZES.height70,
    height:SIZES.height70,
    borderWidth:.5,
    backgroundColor:COLORS.primary_light,
    borderColor:COLORS.primary ,
    borderRadius:7,
    justifyContent:'center'
},
logosecond:{
    //opacity:.4 ,
    width:SIZES.image170,
    height:SIZES.zindex40,
    borderWidth:1,
    backgroundColor:COLORS.background,
    borderColor:COLORS.primary ,
    borderRadius:7 ,
    marginBottom:SIZES.radius30,
    marginTop:10,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center',
    //elevation:10,
    //shadowColor:COLORS.primary
},
tinyLogo:{
  width:50,
  height:50,
  alignSelf:'center',
},
 
  
});