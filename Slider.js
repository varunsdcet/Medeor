import React, { Component } from 'react';
import { StyleSheet, View, Image, Text ,SafeAreaView} from 'react-native';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';

export default class Slider extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null
    };
    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                {
                    title: 'WELCOME TO MEDEOR',
                    caption: 'Access thousands of trusted doctors instantly. Never wait to feel better ever again.',
                    url: require('./one.png'),
                }, {
                    title: 'ASK A HEALTH QUERY FOR FREE',
                    caption: 'Caption 2',
                    url: require('./two.png'),
                }, {
                    title: 'BOOK APPOINTMENTS',
                    caption: 'Caption 3',
                    url: require('./three.png'),
                },
                {
                    title: 'GET TRUSTED HEALTH TIPS',
                    caption: 'Caption 3',
                    url: require('./four.png'),
                },
            ],
        };
    }
    buttonClickListener = () =>{
        this.props.navigation.navigate('Landing')
    }
    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === (this.state.dataSource.length -1) ? 0 : this.state.position + 1
                });
            }, 10000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <SafeAreaView>


            <View style={{width: '100%', height: '100%'}}>

                <Swiper style={styles.wrapper} activeDotColor={'#e73c50'}>
                    <View style={styles.slide1}>
                        <Image style={{flex:1,width:'100%', height:'100%', position:'absolute', }}
                               source={require('./one.png')}/>
                        <Text style={styles.title}>WELCOME TO MEDEOR</Text>
                        <Text style={styles.caption}>Access thousands of trusted doctors instantly. Never wait to feel better ever again.</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={{flex:1,width:'100%', height:'100%', position:'absolute', }}
                               source={require('./two.png')}/>
                        <Text style={styles.title}>ASK A HEALTH QUERY FOR FREE</Text>
                        <Text style={styles.caption}>Get informational answers from doctors for free within 24 hours.</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={{flex:1,width:'100%', height:'100%', position:'absolute', }}
                               source={require('./three.png')}/>
                        <Text style={styles.title}>BOOK APPOINTMENTS</Text>
                        <Text style={styles.caption}>Book an appointment with a doctor to consult or to visit at the clinic.</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={{flex:1,width:'100%', height:'100%', position:'absolute', }}
                               source={require('./four.png')}/>
                        <Text style={styles.title}>GET TRUSTED HEALTH TIPS</Text>
                        <Text style={styles.caption}>Receive trusted health tips from top doctors for you and your loved ones.</Text>
                    </View>
                </Swiper>
                <Image style={{width:150, height:100, resizeMode:'contain', position:'absolute', top:10, left:10}}
                       source={require('./logo.png')}
                />


                <Button
                    containerStyle={{position:'absolute',right:20,marginTop :30,padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'transparent'}}
                    disabledContainerStyle={{backgroundColor: 'grey'}}
                    style={{fontSize: 14, color: 'white',fontWeight:'bold'}}
                    onPress={this.buttonClickListener}>
                    SKIP
                </Button>
            </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    title: {
        width:300,
        alignSelf:'flex-start',
        marginTop:300,
        textAlign:'left',
        color: '#fff',
        marginLeft:10,
        fontSize: 30,
        fontFamily:'Poppins-SemiBold',
    },
    caption: {
        width:300,
        alignSelf:'flex-start',
        textAlign:'left',
        color: '#fff',
        marginTop:20,
        marginLeft:10,
        fontSize: 20,
        fontFamily:'Poppins-Light',
    }
})
