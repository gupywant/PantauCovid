/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*import React, { Component } from 'react';
import { StatusBar,StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Left, Right, Button, Icon, Title, Header, Card, CardItem, Body, Text, View } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;*/
import React, { Component } from 'react';
import ScreenOne from './src/Home';
import { StatusBar, StyleSheet, View, Image, Text, BackHandler, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

//const { width, height } = Dimensions.get("screen");


const ProfileBackground = require("./assets/profile-screen-bg.png");

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      splash : true,
      data: {},
      connectedNow: true
    }
    setTimeout(() => {
      if(this.state.connectedNow){
        this.setState({splash: false})
      }else{
        Alert.alert(
          "Perhatian",
          "Pastikan anda memiliki koneksi internet",
          [
            { text: "OK", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
      }
    }, 2500);
  }
  componentDidMount(){
    NetInfo.fetch().then(state => {
      this.setState({
        connectedNow: state.isConnected
      })
    })
    
  }

  render(){
    return (
      <>
        {this.state.splash ? <SplashUI/> : <HomeUI/> }
      </>
    )
  }
}
const HomeUI = () => (
<>
  <StatusBar backgroundColor="#66b2b2" />
  <ScreenOne />
</>
)

const SplashUI = () => (
<View style={styles.container}>
  <StatusBar backgroundColor="white" />
  <Image
    source={require('./assets/icon.png')}
  />
  <Text style={{color: "#009494"}}> Pantau Covid </Text>
  <Text style={{color: "#009494"}}> Develope with love by Gupy Wantoro </Text>
</View>
)
const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor : '#fff'
  },
  logo: {
    width: 150,
    height: 150,
  }
});