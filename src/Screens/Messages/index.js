import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { CustomHeaderTwo } from '../../Components/CustomHeaderTwo';
import LinearGradient from 'react-native-linear-gradient';
//import {Cust}

const Messages = ({navigation}) => {
  
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
                    heading ={'Messages'}
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
                        <View>
                           <View style={styles.card}>
                                <Icon
                                   name  ={"user-1"}
                                   color ={COLORS.primary}
                                   size  ={50}
                                   config={icoMoonConfigSet}
                                   style ={{opacity:.5}}
                                />
                                <View style={{marginLeft:10,width:'80%'}}>
                                    <Text style={styles.text}>{'Q3 Targets'}</Text>
                                    <Text style={styles.text3}>{'12-12-2022 10:12:21'}</Text>
                                    <Text style={styles.text2}>{'Created By : name'}</Text>
                                    <View style={styles.message}>
                                    <Text style={styles.messagetext}>
                                    {'Start using @api.video/react-native-player in your project by running ... React Native video player to play vod and lives from api.video'}
                                    </Text>
                                    </View>
                                </View>
                           </View>
                        </View>
                        )
                    }} 
            />
            </View>
        </View>
   
  )
}
export default Messages;

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
      fontFamily:Fonts.font_800,
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
messagetext:{
    color:COLORS.black,
    fontSize:SIZES.medium,
    fontFamily:Fonts.font_400,
    margin:10,
    textAlign:'left'
    //marginVertical:15,
},
message:{
    width :'100%',
    height:'auto',
    marginVertical:10,
    justifyContent:'center',
    backgroundColor:COLORS.background,
    //opacity:.5
    //alignSelf:'center'
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
 
 
  
});