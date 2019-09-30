import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View  ,ScrollView,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions,SafeAreaView} from 'react-native';
import Button from 'react-native-button'
const GLOBAL = require('./Global');


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {};
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height



export default class Login extends Component<Props> {
    static navigationOptions = {
        title: 'Login',
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
        this.props.navigation.navigate('Register')
    }
    buttonClickListener = () =>{
        this.props.navigation.navigate('Forgot')
    }
    login = () => {
        if (this.state.phone == ''){
            alert('Please Enter Username')
        } else if (this.state.password == '') {
            alert('Please Enter Password')
        } else {
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'Signin'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: '',
                    deviceType: Platform.OS,
                    deviceToken: '',
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory: '',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    // alert(JSON.stringify(responseJson))

                    this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.user_detail})
                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('Home')
                    } else {
                        alert('Invalid Credentials!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        // this.props.navigation.navigate('BasicDetail')
    }

    resPress = () =>{
        if (this.state.phone == ''){
            alert('Please enter mobile number.')
        }    else if (this.state.password == ''){
            alert('Please enter password.')
        } else {
            this.showLoading()
            const url = "http://139.59.76.223/larder/webservice/login"

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: this.state.phone,
                    password: this.state.password,
                    deviceID: '',
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.deviceToken,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({phone: ""})
                    this.setState({password: ""})
                    this.hideLoading()


                    if (responseJson[0].result == "success"){
                        AsyncStorage.setItem('mobile', responseJson[0].mobile);
                        AsyncStorage.setItem('userID', responseJson[0].userID);
                        AsyncStorage.setItem('username', responseJson[0].name);
                        AsyncStorage.setItem('email', responseJson[0].email);
                        GLOBAL.userID = responseJson[0].userID;
                        GLOBAL.username = responseJson[0].name;
                        GLOBAL.mobile = responseJson[0].mobile;
                        GLOBAL.email = responseJson[0].email;

                    } else {
                        alert('Please enter valid credentials')
                    }


                })
                .catch((error) => {
                    console.error(error);
                    this.setState({phone: ""})
                    this.setState({password: ""})
                    this.hideLoading()
                    alert('Unable to process this time Please try again after some time.')
                });
        }
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
                <Image style={{width : 250 ,height : 100 ,marginTop :100 , marginLeft:windowW/2 - 125,resizeMode :'contain'}}
                       source={require('./logo.png')}/>

                <View style={{margin: 20,marginTop: 24}}>
                    <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'white' ,fontSize :14 ,fontWeight :'bold'}}>
                        MOBILE
                    </Text>
                    <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 60 ,height : 40 ,color :'white' ,fontSize : 16 }}
                               placeholder="Enter Mobile No"
                               placeholderTextColor="white"
                               keyboardType = "number-pad"
                               onChangeText={(text) => this.setState({phone:text})}
                    >
                    </TextInput>

                    <Text style = {{margin : 10 ,width : windowW - 20 ,height : 20,color :'white' ,fontSize :14 ,fontWeight :'bold'}}>
                        PASSWORD
                    </Text>
                    <TextInput style = {{borderBottomWidth:1,borderBottomColor :'rgba(255,255,255,0.2)',marginLeft : 10,marginTop:2, width : windowW - 60 ,height : 40 ,color :'white' ,fontSize : 16 }}
                               placeholder="Enter Your Password"
                               placeholderTextColor="white"
                               secureTextEntry={true}
                               onChangeText={(text) => this.setState({password:text})}
                    >


                    </TextInput>



                </View>
                <TouchableOpacity

                    onPress={() => this.login()}
                >
                    <Image style={{width : 50 ,height : 40 ,marginTop :10 , marginLeft:windowW - 70,resizeMode :'contain'}}
                           source={require('./next.png')}/>
                </TouchableOpacity>
                <Button
                    containerStyle={{position:'absolute',left:20,marginTop :410,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
                    disabledContainerStyle={{backgroundColor: 'grey'}}
                    style={{fontSize: 14, color: 'white',fontWeight:'bold'}}
                    onPress={this.buttonClickListener}>
                    Forgot Password?
                </Button>

                <Button
                    containerStyle={{marginBottom:80,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
                    disabledContainerStyle={{backgroundColor: 'grey'}}
                    style={{fontSize: 14, color: 'white',fontWeight:'bold'}}
                    onPress={this.buttonClickListeners}>
                    Create an Account
                </Button>

            </KeyboardAwareScrollView>
            </SafeAreaView>

        );
    }
}
