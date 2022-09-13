import React ,{useState}from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import { Icon, icoMoonConfigSet} from '../../Styles/icons';
import { COLORS ,Fonts ,SIZES } from '../../Styles/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CustomHeaderTwo} from '../../Components/CustomHeaderTwo'
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
            <TouchableOpacity onPress={() => navigation.navigate('ArdhavilamKC')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Ardhavilwam Kashaya Choornam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Vyoshamrutham')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Vyoshamrutham</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('NisothamadiK')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Nisothamadi Kashayam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SapthachadadiK')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Sapthachadadi Kashayam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AadareesahacharadiK')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Aadareesahacharadi Kashayam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Amalakarishtam')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Amalakarishtam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('BruhathNK')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Bruhath Nayopayam Kashayam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PanchagandhadiC')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Panchagandhadi Choornam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ThakrarishtaC')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Thakrarishta Choornam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ChithrakagranthikadiK')}>
                <View style={styles.card}>
                  <Text style={styles.text2}>Chithrakagranthikadi Kashayam</Text>
                  <Icon
                    name={"navigate_next"}
                    color={'#319A2E'}
                    size={SIZES.radius30}
                    config={icoMoonConfigSet}
                  />
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
              

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