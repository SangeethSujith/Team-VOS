import React ,{useState ,useEffect}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList ,TextInput ,Image ,Modal ,Dimensions ,Alert} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import { CustomButton } from '../../Components/CustomButton';
import {CustomInput} from '../../Components/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
//import {Cust}

const SelectProducts = ({navigation ,route}) => {
  const { param , pid ,param2}              = route.params; 
  const [modalVisible, setModalVisible]     = useState(false);
  const Height = Dimensions.get('window').height;
  const [state, setstate] = useState({
    data: [{ id:1  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
           { id:2  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
           { id:3  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
           { id:4  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
           { id:5  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
           { id:6  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
           { id:7  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
           { id:8  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
           { id:9  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
           { id:10  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
           { id:11  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' ,Price : '10'},
           { id:12  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
    ],
    data1: [
    { id:1  , name : 'Medical Oils' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047' ,Price : '10'},
    { id:2  , name : 'Lahyam' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
    { id:3  , name : 'Tablets' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047' ,Price : '10'},
    { id:4  , name : 'Medical Oils' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
    { id:5  , name : 'Lahyam' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
    { id:6  , name : 'Tablets' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
    { id:7  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
    { id:8  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047',Price : '10' },
    { id:9  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
    { id:10  , name : 'Anuthailam' ,  place :'Calicut' , Nos : '100 ml' ,Code :'PROD0047',Price : '10'},
    { id:11  , name : 'Arukaladi Oil' , place :'Calicut' ,Nos : '200 ml' ,Code :'PROD0047' ,Price : '10'},
    { id:12  , name : 'Asanavilwadi' ,  place :'Calicut' , Nos : '30 ml' ,Code :'PROD0047',Price : '10'},
]
  })
  const [Data, setData]         = useState(state.data)
  const [array , setarray]      = useState([ ])
  const [Category, setCategory] = useState(state.data1)
  const [item,setitem]          = useState('')
  const [Quantity,setQuantity]  = useState('')
  const [query, setQuery]       = useState('');
  const [search, setSearch]     = useState('');
  const [active,setactive]      = useState('1');
  const isFocused               = useIsFocused();
  const [filteredDataSource, setFilteredDataSource] = useState(state.data);
  const [masterDataSource, setMasterDataSource]     = useState(state.data);
  useEffect(() => {
    if(isFocused) {
       setarray(param2) 
       console.log('array',array);
  }}, [isFocused ]);


  const onPressHandler = (id) => {
      setactive(id); 
  }

  const openModal = (item) => {
      setQuantity('0')
      setModalVisible(true);
      setitem(item)
  }
  const Additem = () => {
      let items ={id    :item.id,
                  title :param.name,
                  name  :item.name , 
                  nos   :item.Nos ,
                  Price :item.Price ,
                  Qty   :Quantity ,
                  amount:item.Price*Quantity}
      setarray([...array.filter(Item => Item.id !== items.id),items])
      saveData();
      setModalVisible(false)
  }
  
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(array));
      //showAlert ();
    } catch (error) {
      alert('Failed to save the data to the storage')
    }
    
  }
  const searchFilterFunction = (text) => {
    if (text) {
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
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  
  
const txtHandler =(enteredName) => {
      setQuantity(enteredName);
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
        autoCorrect   = {false}
        onChangeText  = {(text) => searchFilterFunction(text)}
        value         = {search}
        returnKeyType = {"next"}
        autoFocus     = {true}
        status        ='info'
        placeholder   ='Search Products'
        style={{
          fontFamily:Fonts.font_400,
          fontSize  :SIZES.medium,
          width     :'100%'
        }}
        textStyle={{ color: '#000',fontFamily:Fonts.font_400 }}
      />
    </View>
    )
  }

  return (
    <View style={styles.container}>
            <CustomHeaderTwo
                    heading ={'Select Products'}
                    onpress={()=> navigation.navigate('CreateOrder',{param:param ,param2:array ,pid : pid})}
            />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
                <Text style={styles.text}>{'Categories'}</Text>
                <View >
                <FlatList 
                    style={{backgroundColor:'white' ,height:SIZES.height70}}
                    data={Category}
                    horizontal={true}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[styles.logosecond,
                                                     {backgroundColor: active== item.id?
                                                     COLORS.primary : COLORS.background}]}
                                              onPress={() =>onPressHandler(item.id)}>
                                    <Text style={[styles.text2,
                                                {color:active== item.id? 
                                                COLORS.white:COLORS.primary_black}]}>{item.name}
                                    </Text>  
                              
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
                                
                                <TouchableOpacity style={styles.logo}
                                                  onPress={()=>openModal(item)}>
                                  <Icon
                                      name  ={"plus"}
                                      color ={COLORS.primary}
                                      size  ={SIZES.icon}
                                      config={icoMoonConfigSet}
                                      //onPress
                                      //style ={{opacity:.4 ,marginHorizontal:SIZES.ten}}
                                  />
                                </TouchableOpacity>
                           </View>
                           <View style={styles.line}/>
                           </View>
                        )
                    }} 
            />
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                backdropOpacity={3}
                onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={[styles.modalStyle,{marginTop:Height/3 ,height:Height/3}]}>
                <KeyboardAwareScrollView 
                   contentContainerStyle={{ flexGrow: 1,height:'100%' }} 
                   enableOnAndroid={Platform.OS === 'android'} 
                   enableAutomaticScroll={false}>
                <View style={{margin:20}}>
                <Text style={styles.heading}>{item.name}</Text>
                <View style={styles.line}/>
                <Text style={styles.text4}>{item.Nos}</Text>
                <Text style={styles.text4}>{'Price : 270.00'}</Text>
                <CustomInput
                    type = 'text' 
                    label= 'Quantity'
                    labelBG='white'
                    placeholderText='Enter Quantity'
                    style={{marginTop:10}}
                    keyboardType={'numeric'}
                    onChangeText={txtHandler}
                    value={Quantity}
                  />
                <View style={styles.buttonrow}>
                
                <CustomButton
                  //style ={{alignSelf:'flex-end'}}
                  width1={SIZES.windowwidth/3}
                  title={'Ok'}
                  height1={'30%'}
                  onPress={()=>Additem()}
               />
                <CustomButton
                  //style ={{alignSelf:'flex-end'}}
                  width1={SIZES.windowwidth/3}
                  title={'close'}
                  height1={'30%'}
                  onPress={()=>setModalVisible(false)}
               />
               </View>
               </View>
               </KeyboardAwareScrollView>
               </View>
            </Modal>
        </View>
   
  )
}
export default SelectProducts;

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
text4:{
    color:COLORS.heading_black,
    fontSize:SIZES.medium,
    fontFamily:Fonts.font_400,
    marginBottom:3,
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
modalStyle:{
    //height:Height/3,
    width:'90%',
    backgroundColor:COLORS.white,
    alignSelf:'center',
    elevation: 60,
    shadowColor: 'black',
    borderRadius:10,
    //justifyContent:'center',
    //alignItems:'center'
    
  },
  heading: {
    //fontFamily: "poppins",
    fontFamily : Fonts.font_800,
    fontSize:SIZES.large,
    //fontStyle : 'normal',
    //textAlign:'center',
    //marginTop:heightPercentageToDP(.5),
    //fontSize: Theme.FONT_BIG,  
    //fontSize : Theme.FONT_TWNETY,
    color:COLORS.primary_black,
    marginBottom:10
  } ,
  buttonrow:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
  
});