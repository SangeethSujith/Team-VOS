import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet ,FlatList} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo'
import VideoPlayer from 'react-native-video-player';
import { SourceCode } from 'eslint';

const TrainingVideo = ({navigation ,route}) => {
  
  const [state, setstate] = useState('')
  return (
    <View style={styles.container}>
       <KeyboardAwareScrollView behavior={"position"} 
                                contentContainerStyle={{ flexGrow: 1, }} 
                                enableOnAndroid={Platform.OS === 'android'} 
                                enableAutomaticScroll={true} >
            <CustomHeaderTwo
                heading ={'Training Videos'}
                onpress={()=> navigation.goBack()}
            />
            <View style={{marginHorizontal:25,marginTop:20 ,marginBottom:60}}>
            {/*<Video source={{uri: 'https://www.youtube.com/watch?v=ugGPZTWTljM'}}   // Can be a URL or a local file.
                   style={styles.backgroundVideo} />*/}
              <VideoPlayer
                  Video={{uri :'https://www.youtube.com/watch?v=WSJHAsnot54'}}
                  autoplay={false}
                  defaultMuted={true}
                  videoWidth={1500}
                  videoHeight={1000}
                  thumbnail={require('../../Assets/Images/webinar.png')}
              />


            </View>
          </KeyboardAwareScrollView>
        </View>
   
  )
}
export default TrainingVideo;

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
 
});