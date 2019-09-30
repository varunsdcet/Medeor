
import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,
    Dimensions,



} from 'react-native';





import Button from 'react-native-button';



class  HealthPackege extends React.Component{
    constructor() {
        super();

        this.state = {
            FlatListItems: [
                {"key": "#1",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#2",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#3",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#4",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },
                {"key": "#5",
                    "name": "Healthy Indian Days Special Package",
                    "testno": "includes",
                    "testDescription": "FBS,C.Hgm,KFT,Lipid,LFT,TFT-Total,Urine-R/M,Vit-B12,Vit-D3",
                    "recomendation": "Recomended for:",
                    "limit": "Age group:",
                },

            ]}
    }



    renderItem=({item}) => {
        return(

            <View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,margin: 10, height: 225,borderRadius :6,width : Dimensions.get('window').width-20, shadowColor: '#D3D3D3',
                shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5}}>
                <View style={{flexDirection: 'row', marginTop:6}}>
                    <Text style={{color:'black', fontSize:15,marginLeft:5,fontFamily:'Poppins-Medium',alignItems:'flex-start'}}>{item.name}</Text>
                    <Button style={{fontSize:12,color:'white',fontFamily:'Poppins-Regular',alignSelf:'center',}}
                            containerStyle={{height:20,width:60,borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'#FF2D00',overflow:'hidden',position:'absolute', right:0}}>
                        save 71%
                    </Button>
                </View>

                <View style={{flexDirection:'column', marginTop:5}}>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <Text style={{color:'#808080', fontSize:13,fontFamily:'Poppins-Regular',marginLeft:5}}>{item.testno}</Text>
                        <Text style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',marginLeft:3}}>76 Tests</Text>
                    </View>
                    <Text style={{color:'#808080',fontFamily:'Poppins-Regular',fontSize:15,marginTop:3,marginLeft:5}}>{item.testDescription}</Text>
                </View>


                <View style={{flexDirection:'row',marginTop:8}}>
                    <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:5}}
                            containerStyle={{height:25,width:183,backgroundColor:'white',overflow:'hidden',marginLeft:5,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>{item.recomendation}</Text>
                        Male,Female
                    </Button>

                    <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:40}}
                            containerStyle={{height:25,width:122,backgroundColor:'white',overflow:'hidden',marginLeft:9,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>{item.limit}</Text>
                        5-99yrs.
                    </Button>

                </View>


                <View style={{flexDirection:'row',marginTop:22,alignItems:'center'}}>

                    <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹6670/-</Text>

                    <Text style={{fontSize:18,color:'black',marginLeft:10,fontFamily:'Poppins-Medium'}}>₹1999/-</Text>

                    <Button style={{fontSize:17,color:'white',fontFamily:'Poppins-Medium'}}
                            containerStyle={{height:50,width:100,backgroundColor:'#0592CC',overflow:'hidden',borderTopLeftRadius:4,borderBottomLeftRadius:4,justifyContent:'center',marginLeft:54}}
                            onPress={() =>this.props.navigation.navigate('OptionScreen')}>
                        Details
                    </Button>

                    <Image source={require('./cartlogo.png')}
                           style={{ height:50,width:55,borderWidth:1,borderColor:'#0592CC',borderTopRightRadius:4,borderBottomRightRadius:4,marginLeft:4}}/>
                </View>



            </View>

        );
    }

    _keyExtractor=(item, index)=>item.key;

    static navigationOptions = {
        title: 'LAB TEST',
        headerTitleStyle: {
            flex:1,
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: -25
        },
    };


    render(){
        return(
            <View style={{justifyContent: 'center',flex:1,backgroundColor:'#F5F5F5'}}>
                <FlatList
                    data={this.state.FlatListItems}

                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
}

export default HealthPackege;

