import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import { CustomHeaderTwo } from '../../../Components/CustomHeaderTwo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, icoMoonConfigSet} from '../../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../../Styles/theme';
import { SourceCode } from 'eslint';
import WebView from 'react-native-webview';

const NisothamadiK = ({navigation}) => {
  return (
    <View style={styles.container}>
         <CustomHeaderTwo
                heading ={'Nisothamadi Kashayam'}
                onpress={()=> navigation.goBack()}
            />
            <View style={{flex:1}}>
            <WebView 
          source={{ uri: 'https://vos-training-videos.s3.ap-south-1.amazonaws.com/Nisothamadi_Kashayam.m4v' }} 
        />
        </View>
    </View>
  )
}

export default NisothamadiK

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white',
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    card: {
      backgroundColor: 'white',
      width: '100%',
      alignSelf: 'center',
      height: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10
    },
    text2: {
      color: COLORS.backgroundColor,
      fontSize: SIZES.large,
      fontFamily: Fonts.font_500,
    },
    line: {
      height: .5,
      width: '100%',
      backgroundColor: '#b2b8b4'
    },
   
  });