import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,

    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage, ScrollView
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Voice from 'react-native-voice';
const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class FullDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
            practice:[],
            firstService:'',
            secondService:'',
            timing :'',
            timings :'',

            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]

        };
        Voice.onSpeechStart = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
        Voice.onSpeechResults = this.onSpeechResults.bind(this);
        Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart(e) {
        this.setState({
            started: '√',
        });

    };
    setModalVisible=(visible,get)=> {
        this.setState({text:get})
        this.setState({modalVisible: visible});
    }
    onSpeechEnd (e){
        alert('stop')
    }
    onSpeechRecognized(e) {
        this.setState({
            recognized: '√',
        });


    };
    onSpeechResults(e) {
        this.setState({
            results: e.value,
        });
        alert(JSON.stringify(this.state.results))

    }
    async _startRecognition(e) {



        this.setState({
            recognized: '',
            started: '',
            results: [],
        });
        try {
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
        }
    }

    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,
            title: 'BOOKING APPOINTMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = 'http://139.59.76.223/picasoid/api/' + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    _renderItems = ({item,index}) => {


        return (
            <View>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_name}</Text>
                <Text style={{fontSize:15, color:'#grey'}}>{item.hospital_address}</Text>
            </View>


        )
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


    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
        const url =   GLOBAL.BASE_URL +  'full_dr_detail'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "id":GLOBAL.appointmentArray.id,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                     this.setState({results:responseJson.doctor_detail})
                     this.setState({practice:responseJson.doctor_detail.practices_at})
                    this.setState({firstService:responseJson.doctor_detail.services[0]})
                    this.setState({secondService:responseJson.doctor_detail.services[1]})

                    for (var i = 0 ; i< responseJson.doctor_detail.normal_timing.length;i++){
                        if (responseJson.doctor_detail.normal_timing[i].flag == 1){
                            var a  =  ` ${responseJson.doctor_detail.normal_timing[i].start1} - ${responseJson.doctor_detail.normal_timing[i].end1}`;
                            var b  =  ` ${responseJson.doctor_detail.normal_timing[i].start2} - ${responseJson.doctor_detail.normal_timing[i].end2}`;
                           this.setState({timings:b})
                        }
                    }


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
        //   this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    login = () => {
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = (item) => {


        this.setState({selected:true})
    }
    selectedFirst = (item,speciality) => {
        GLOBAL.speciality = speciality
        GLOBAL.appointmentArray = item
        this.props.navigation.navigate('DoctorDetail')

    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
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
            <ScrollView style={styles.container} >
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row', margin:10,}}>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dplus.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black'}}>Experience</Text>
                            <Text style={{fontSize:15, color:'grey'}}>{GLOBAL.appointmentArray.experience} yrs</Text>
                        </View>
                        <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3,marginLeft:window.width/6 }} source={require('./loc.png')}/>
                        <View style={{flexDirection:'column', marginLeft:30}}>
                            <Text style={{fontSize:15, color:'black'}}>Distance</Text>
                            <Text style={{fontSize:15, color:'grey'}}>{GLOBAL.appointmentArray.distance}  Km</Text>
                        </View>

                    </View>
                </View>
                <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dre.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>
                        <Text style={{fontSize:15, color:'black'}}>Review</Text>
                        <Text style={{fontSize:15, color:'grey'}}>{GLOBAL.appointmentArray.total_review}  </Text>
                    </View>


                </View>

                <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dhouse.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>

                        <Text style={{fontSize:15, color:'grey'}}>{this.state.results.lat_long_address}</Text>

                        <Image style={{width:280, height:150, resizeMode:'cover', margin:5}} source ={require('./dloc.png')}/>
                    </View>
                </View>

                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtime.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>
                        <Text style={{fontSize:15, color:'#8BC60D'}}>AVAILABLE TODAY</Text>
                        <Text style={{fontSize:15, color:'grey'}}>{this.state.timing}</Text>
                        <Text style={{fontSize:13, color:'blue'}}>{this.state.timings}</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>
                        <Text style={{fontSize:15, color:'#010101'}}>SERVICES</Text>

                        <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-{this.state.firstService}</Text>
                        <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-{this.state.secondService}</Text>

                        <Text style={{fontSize:13, color:'red',marginTop:5}}>ALL SERVICES</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', margin:10,}}>
                    <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
                    <View style={{flexDirection:'column', marginLeft:30}}>
                        <Text style={{fontSize:15, color:'#010101'}}>ALSO PRACTICES AT</Text>
                        <FlatList style= {{flexGrow:0,margin:8}}
                                  data={this.state.practice}
                                  numColumns={1}
                                  keyExtractor = { (item, index) => index.toString() }
                                  renderItem={this._renderItems}
                        />

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',

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
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
