import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions,SafeAreaView} from 'react-native';
import Button from 'react-native-button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Landing extends Component<Props> {
  static navigationOptions = {
  title: 'Login',
  swipeEnabled: false,
  gesturesEnabled: false,
  header: null
};
state = {
    phone: '',
    password:'',
    loading:false,
  };
    showLoading() {
         this.setState({loading: true})
      }

      hideLoading() {
         this.setState({loading: false})
      }
  buttonClickListeners = () =>{
   this.props.navigation.navigate('Signup')
  }




  render() {
        let { phone,password } = this.state;
        if(this.state.loading){
     return(
       <View style={{flex: 1,  backgroundColor: 'black'}}>
       <ActivityIndicator style = {{ position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            opacity: 0.5,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
          }}

      size="large" color="#90BA45" />
       </View>
     )
   }
    return (
        <SafeAreaView>
      <KeyboardAwareScrollView style = {{backgroundColor:'#0e2240',width : windowW ,height :windowH}}>
      <Image style={{width : 250 ,height : 100 ,marginTop :150 , marginLeft:windowW/2 - 125,resizeMode :'contain'}}
 source={require('./logo.png')}/>


 <View style={{margin: 20,marginTop: 24,alignself:'center'}}>

 <Text style = {{alignself :'center',textAlign :'center',fontSize :22,marginTop :20  ,height :40,color :'white',fontFamily:'Poppins-SemiBold'}}>

 Choose User type
 </Text>



 <Button
     containerStyle={{ height:50 ,margin:10, backgroundColor: 'white', padding:15,bottom:0 ,


    borderRadius:10,
    borderWidth: 1,
    }}
     disabledContainerStyle={{backgroundColor: 'white'}}
     style={{fontSize: 15, textAlign:'center',color: '#0e2240',fontFamily:'Poppins-Medium'}}

     onPress={() => this.props.navigation.navigate('Register')}

     >
    FIRST TIME USER
   </Button>

   <Button
   containerStyle={{ height:50 ,margin:10, backgroundColor: 'white', padding:15,bottom:0 ,fontFamily:'Poppins-Medium',


  borderRadius:10,
  borderWidth: 1,
  }}
       disabledContainerStyle={{backgroundColor: 'white'}}
       style={{fontSize: 15, textAlign:'center',color: '#0e2240'}}

        onPress={() => this.props.navigation.navigate('Login')}

       >
      EXISTING USER
     </Button>

      </View>

      </KeyboardAwareScrollView>
        </SafeAreaView>

    );
  }
}
