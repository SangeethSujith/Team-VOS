

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },
    card: {
      backgroundColor: COLORS.primary_light,
      width: SIZES.windowwidth/1.2,
      alignSelf:'center',
      height:SIZES.windowwidth/4.5,
      flexDirection:'row',
      margin:5,
      justifyContent:'center',
      alignItems:'center',
      opacity:.6
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
    text1:{
      color:COLORS.black,
      fontSize:SIZES.large,
      fontFamily:Fonts.font_500,
      marginVertical:15,
      //alignSelf:'center'
  },
  textitem:{
    color:COLORS.black,
    fontSize:SIZES.large,
    fontFamily:Fonts.font_500,
    //marginVertical:15,
    //alignSelf:'center'
  },
  textitem2:{
    color:COLORS.black,
    fontSize:SIZES.medium,
    fontFamily:Fonts.font_500,
    //marginVertical:15,
    //alignSelf:'center'
  },
    text2:{
      color:'#b2b8b4',
      fontSize:SIZES.medium,
      fontFamily:Fonts.font_400,
      marginTop:'50%',
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
  text4:{
      color:COLORS.black,
      fontSize:SIZES.medium,
      fontFamily:Fonts.font_400,
      alignSelf:'center',
      marginVertical:5,
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
        marginVertical:10,
        justifyContent:'space-evenly',
        height:45,
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
      justifyContent:'space-between',
      marginTop:5
    },
    textrow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    line:{
      height:.5,
      width:'100%',
      backgroundColor:'#b2b8b4',
      marginVertical:5
  },
  itemcontainer:{
      //flex:1,
      width:'100%',
      height:'50%',
      borderRadius:7,
      backgroundColor:COLORS.background,
      //justifyContent:'center'
      //borderWidth:.5,
      //borderColor:'#b2b8b4'
  },
  logo:{
    height:SIZES.extralarge,
    width:SIZES.extralarge,
    borderWidth:1,
    borderColor:'red',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10
  }
  });