import React ,{useState} from 'react';
import { Text, View,Image,StyleSheet ,FlatList,Alert } from 'react-native';
import { SIZES ,COLORS,Fonts } from '../../Styles/theme';
import {CustomButtonTwo} from '../../Components/CustomButtonTwo';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { CustomButtonThree } from '../../Components/CustomButtonThree';
import { CustomFilter } from '../../Components/CustomFilter';

const Pending = () => {
  const [state, setstate] = useState({
    data: [{ id:1  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:2  , name : 'Kalpetta ayrvedic clinic' , date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true},
           { id:3  , name : 'Kannur ayrvedic clinic' ,   date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:4  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:5  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:6  , name : 'Elaj ayrvedic clinic' ,     date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true },
           { id:7  , name : 'Kalpetta ayrvedic clinic' , date : '12/20/2022',address : 'Hospital_Cr' ,place :'Calicut' ,visited :true},
]})
const showAlert = () =>
  Alert.alert(
    "Do you want to mark as completed ?",
    " ",
    [
      {
        text: "Cancel",
        cancelable: true,
        style: "cancel",
      },
      {
        text: "Ok",
        cancelable: true,
        //onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ],
  );
  return (
    <View style={styles.container}>
       <FlatList style={{backgroundColor:'white' }}
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
                           <View>
                           <View style={styles.card}>
                                <Icon
                                   name  ={"user-1"}
                                   color ={COLORS.primary}
                                   size  ={35}
                                   config={icoMoonConfigSet}
                                   style ={{opacity:.4 ,marginLeft:20}}
                                />
                                <View style={{marginLeft:10,width:'75%'}}>
                                    <Text style={styles.text3}>{item.place}</Text>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <View style={styles.textrow}>
                                        <View style={styles.innerrow}>
                                           <Text style={styles.text2}>{'Assigned By'}</Text>
                                           <Text style={styles.text2}>{': '}</Text>
                                        </View>
                                        <Text style={styles.text2}>{'Snathosh'}</Text>
                                    </View>
                                    <View style={styles.textrow}>
                                        <View style={styles.innerrow}>
                                           <Text style={styles.text2}>{'Assigned On'}</Text>
                                           <Text style={styles.text2}>{': '}</Text>
                                        </View>
                                        <Text style={styles.text2}>{'21/05/2022'}</Text>
                                    </View>
                                    <View style={styles.textrow}>
                                        <View style={styles.innerrow}>
                                           <Text style={styles.text2}>{'Due Date'}</Text>
                                           <Text style={styles.text2}>{': '}</Text>
                                        </View>
                                        <Text style={styles.text2}>{'20/12/2022'}</Text>
                                    </View>
                                    {/*<View style={styles.textrow}>
                                        <View style={styles.innerrow}>
                                           <Text style={styles.text2}>{'Done Date'}</Text>
                                           <Text style={styles.text2}>{': '}</Text>
                                        </View>
                                        <Text style={styles.text2}>{'27/12/2022'}</Text>
                                    </View>*/}
                                
                               
                                <CustomButtonThree
                                   title  ={'Mark as completed'}
                                   //width1 ={'auto'}
                                   style  ={{alignSelf:'center'}}
                                   height1={SIZES.radius25}
                                   onPress={showAlert}
                                />
                                </View>
                                </View>
                                <View style={styles.line}/>
                           </View>
                        )
                    }} 
            /> 
    
    </View>
  )
}
export default Pending;
const styles = StyleSheet.create({
  tinyLogo:{
    width:SIZES.image120,
    height:SIZES.image120,
    alignSelf:'center',
    opacity:.7
  },
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
    //justifyContent:'space-between'
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
    color:'grey',
    fontSize:SIZES.vsmall,
    fontFamily:Fonts.font_400,
    marginVertical:3,
},
text3:{
    color:COLORS.heading_black,
    fontSize:SIZES.small,
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
  textrow:{
    flexDirection:'row', 
    alignItems:'center',
    //width:300
  },
  innerrow:{
    width:'55%',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  line:{
    height:.5,
    width:'100%',
    backgroundColor:'#b2b8b4'
},
 
})