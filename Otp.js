import React, {Component} from 'react';
import { StyleSheet,Text,TextInput,AsyncStorage, View,Image,Modal ,Alert,FlatList,Dimensions ,TouchableHighlight,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';

type Props = {};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
const GLOBAL = require('./Global');

var codes = '';
export default class Otp extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        modalVisible: false,
        visible:false,
        visibles:false,
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }



    myCallbackFunctions = (res) => {
        this.hideLoading()

        alert(JSON.stringify(res))

        if (res.status == 200){
            if ( GLOBAL.which == "1"){
                this.setState({visibles :true})
            } else if ( GLOBAL.which == "2") {
                alert(GLOBAL.which)
                AsyncStorage.setItem('verify', "true");


                this.props.navigation.navigate('TabNavigators')
            }
            else if ( GLOBAL.which == "3") {
                this.setState({visible:true})

            }
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    componentDidMount(){
        alert(GLOBAL.otps)
    }

    valide = () =>{

        alert(GLOBAL.myname)

        if (codes == ''){
            alert('Please Enter OTP')
        }    else if(GLOBAL.otps==codes){

            const url = GLOBAL.BASE_URL +  'Signup'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    name: GLOBAL.myname,
                    mobile: GLOBAL.mymobile,
                    email: GLOBAL.myemail,
                    password: GLOBAL.mypassword,
                    deviceID: '',
                    deviceType: '',
                    deviceToken: '',
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory:'',
                    has_notch: '',
                    auth:'normal',
                    manufacture: '',
                    ip_address: '',
                    is_refer_verify:GLOBAL.is_refer_verify,
                    apply_to :GLOBAL.apply_to,
                    referral_code_other :GLOBAL.referral_code_other



                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    alert(JSON.stringify(responseJson))
                    if (responseJson.status == true) {



                        this.setState({ results: responseJson.user_detail })


                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('Home')


                    }
                    this.hideLoading()
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }
        else {
            alert('Entered OTP is Invalid.')
        }
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    _onFulfill =(code) => {
        codes = code
        console.log('Pressed!');




        // this.props.navigation.navigate('Otp')

    }
    render() {
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView style = {{height:window.height}}>

                        <Text style = {{marginLeft: '5%',width:'70%',color:'white',fontSize: 36,marginTop: '20%',fontFamily:'Poppins-Medium'}}>
                         Verify your number

                        </Text>

                        <Text style = {{marginLeft: '5%',width:'90%',color:'white',fontSize: 18,marginTop: '4%',fontFamily:'Poppins-Light'}}>
                         Otp has been sent to your mobile number

                        </Text>

                        <CodeInput
                            ref="codeInputRef1"
                            keyboardType="numeric"

                            className={'border-b'}
                            space={38}
                            codeLength ={4}
                            size={50}

                            activeColor = '#77869E'
                            inactiveColor =  '#77869E'
                            onFulfill={(code) => this._onFulfill(code)}
                        />






                        <Button
                            containerStyle={{ marginLeft:20,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent',marginTop:30}}

                            style={{fontSize: 18, color: 'white',fontFamily:'Poppins-Medium',width:140}}
                            onPress={this.buttonClickListenerss}>
                           RESEND CODE?
                        </Button>

                        <TouchableOpacity onPress={() => this.valide()
                        }>

                        <Image style = {{width :60 ,height: 60,marginLeft:'77%',marginTop:-50,resizeMode: 'contain'}}
                               source={require('./next.png')}/>

                        </TouchableOpacity>

                    </KeyboardAwareScrollView>











                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#0e2240'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})