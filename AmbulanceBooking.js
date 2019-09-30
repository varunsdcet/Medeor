import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,FlatList,Dimensions ,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
let textRef = React.createRef();
let menuRef = null;
import Geolocation from '@react-native-community/geolocation';
type Props = {};


var length = 0;
var commonHtml = "";

export default class AmbulanceBooking extends Component {



    state = {
        text: '',
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',
        username: '',
        password: '',
        status :'',
        ipAdd : '',
        loading:'',
        marker :[],
        moviesList :[
            {
                title :'English',
                selected :'',
            },

            {
                title :'Hindi',
                selected :'',
            },

        ],
        results: [],
        selected:[],
        name :'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'AMBULANCE BOOKING',
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
                    {item.selected != '' &&(

                        <Image style = {{width :30 ,height :30,alignSelf:'flex-end',marginRight:4,marginBottom: 6}}
                               source={require('./check.png')}/>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }
    myCallbackFunctions = (res) => {
        alert(JSON.stringify(res))
        this.hideLoading()
        if (res.status == 200){
            this.setState({marker:res.role})
            length = 500

            commonHtml = `${stringsoflanguages.thereare} ${length} + ${stringsoflanguages.closed}`;
            this.setState({name:commonHtml})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    myCallbackFunction = (info) => {
        let r = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        //  this.mapView.root.animateToRegion(r,1);



        this.mapView.root.animateToCoordinate(r, 1);

        this.setState({currentLongitude:info.coords.longitude})
        this.setState({currentLatitude:info.coords.latitude})
        // this.setMenuRef.animateCamera(info.coords.latitude,info.coords.longitude)
        alert(this.state.currentLatitude)


        var url = GLOBAL.BASE_URL + 'getNearLabour';
        var self=this;



        axios.post(url, {
            lat: this.state.currentLatitude.toString(),
            lng: this.state.currentLongitude.toString(),

        })
            .then(function (response) {


                self.myCallbackFunctions(response.data)


                //    self.myCallbackFunction.bind()

                //   this.myCallbackFunction()


            })
            .catch(function (error) {
                alert(error)
                //  self.myCallbackFunction()

            });


        // GLOBAL.long = info.coords.longitude
        // GLOBAL.lat = info.coords.latitude
        // alert(JSON.stringify(info))
    }
    _handlePress =() => {
        this.props.navigation.navigate('Register')
    }
    componentDidMount(){
        length = 500


        var self=this;
        // Geolocation.getCurrentPosition(info =>
        //
        //
        //
        //
        //
        // );
        // this.callLocation(that);
    }
    _handlePress() {
        console.log('Pressed!');
    }

    callLocation(that){
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    setMenuRef = ref => menuRef = ref;
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='white' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View>


                <MapView pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}

                         clusterColor = '#77869E'
                         clusterTextColor = 'white'
                         clusterBorderColor = '#77869E'
                         clusterBorderWidth = {4}
                         showsUserLocation = {true}
                         showsMyLocationButton = {true}
                         zoomEnabled = {false}
                         ref = {(ref)=>this.mapView=ref}
                         region = {{
                             latitude: 28.737324,
                             longitude: 77.090981,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}


                         style={{ width: 400, height: 800 }}
                >

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')
                    }>
                    <View style = {{position:'absolute',top :22 ,borderRadius:13,marginLeft:10,width:window.width - 20,height:40,backgroundColor:'white'}}>
 <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: 'Poppins-Regular',alignSelf:'center'}}>
     Where you need ambulance?

 </Text>

                    </View>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')
                    }>
                    <View style = {{position:'absolute',top :70 ,borderRadius:13,marginLeft:10,width:window.width - 20,height:40,backgroundColor:'white'}}>
                        <Text style = {{textAlign: 'center',color:'#5A5A5A',fontFamily: 'Poppins-Regular',marginTop:10,alignSelf:'center'}}>
                            Where would you like to go?

                        </Text>

                    </View>
                    </TouchableOpacity>

                    <Marker coordinate={{ latitude: 28.737324, longitude: 77.090981 }}
                            image={require('./males.png')}
                    />
                </MapView>








</View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
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