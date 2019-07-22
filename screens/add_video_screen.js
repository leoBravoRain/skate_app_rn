import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  // Icon,
  // Image,
  // ImageBackground,
  // PermissionsAndroid,
  // NetInfo,
  // Button,
  // Picker,
  // ProgressBarAndroid
} from 'react-native';

import { Button, Icon, Input } from 'react-native-elements';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { NavigationActions, withNavigation } from 'react-navigation';
// import NetInfo from "@react-native-community/netinfo";

// import GPSState from 'react-native-gps-state';


// // Permissions
// async function requestLocationPermission() {

//   try {

//     // const granted = await PermissionsAndroid.request(
//     const granted = await PermissionsAndroid.requestMultiple(

//       [

//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         // {
//         //   'title': 'Permiso para localización',
//         //   'message': 'Para entregarte el mejor servicio, necesitas darnos el permiso para acceder a tu posición actual'
//         // },

//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         // {
//         //   'title': 'Cool Photo App Camera Permission',
//         //   'message': 'Cool Photo App needs access to your camera '
//         // }

//       ]

//     )

//   } catch (err) {
//     console.warn(err)
//   }
// }

// ask for permissions
// requestLocationPermission();

class Add_Video extends Component {

  // Options for header bar
    static navigationOptions = ({ navigation }) => {
      return {
        title: "Agregar video",

        headerRight: (
          <Icon
            // raised

            name='map'
            // underlayColor={'#2089dc'} 
            // style = {{backgroundColor: 'red'}}
            // reverseColor = '#3f5fe0'
            type='font-awesome'  
            onPress={() => navigation.navigate('Map')}
            color='white'
            // iconStyle = {'marginRight': 0}
            iconStyle={{ margin: 15 }}
            // style: { marginRight: 0 } 
          />
        ),
        headerLeft: (
          <Icon
            // raised 
            name='home'
            // type='font-awesome'  
            onPress={() => navigation.navigate('Home')}
            color='white'
            iconStyle={{ margin: 15 }}
          />
        ),

        headerStyle: {
          backgroundColor: "gray",
          // fontWeight: 20,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    };

  //Constructor
  constructor(props) {

    super(props);

    // const location = this.props.navigation.state.params.location;

    // Alert.alert(String(this.props.navigation.state.params.location.id));

    // initial state
    this.state = {

      // Link of video 
      link: null,
      skater: null,
      comment: null,

    };

    this.add_video = this.add_video.bind(this);
  
  }

  // manage click on button 
  add_video(){

    // Alert.alert(String(this.state.location.id));

    // // Update to real API
    const url_API = 'http://192.168.1.12:8000/videos_location/'+ this.props.navigation.state.params.location.id + '/';

    // // Crete form for post
    const form = new FormData();

    // // Add state
    form.append('location', this.props.navigation.state.params.location.id);
    form.append('skater', this.state.skater);

    // Get link
    const link = this.state.link ;

    // Add comment
    if(this.state.comment != null){

      form.append('comment', this.state.comment);

    }

    // Flag variable
    var send = false;

    if(link != null){

      // Validate link
      if((link.includes('https://youtu.be/') || link.includes('https://www.youtube.com/'))){

        send = true;

        form.append('link', link);

      }

      // If link is not from Youtube
      else{

        // user message
        Alert.alert(
            // 'Conección a internet',
            'Video de Youtube',
            // 'Para poder usar nuestra app, debes estar conectado a internet',
            'Por el momento, solo podemos subir videos que esten subidos a Youtube :(',
            [
              // {text: 'Me conectaré'},
              {text: 'Subiré mi video a Youtube'},
            ],
            { cancelable: false }
          )

      }

    }

    // If link is null
    else{

      Alert.alert('Debes agregar el link al video');

    }

    // If send data
    if(send){

      // Send data to API
      fetch(url_API, {

          method: 'POST',

          body: form

        }).then((response) =>

          {
            Alert.alert('¡Tu video ha sido agregado exitosamente!', 'Aparecerá como uno de los últimos videos del lugar');

            // Go back to location details
            this.props.navigation.push("Location_Details", {marker: this.props.navigation.state.params.location});

          })

        .catch((error) => {
          Alert.alert('Ups, tuvimos un error, intentalo mas tarde');
          console.error(String(error));
          // Alert.alert('get videos variable: ' + String(this.state.get_videos));
        }); 

    }

  }

  // Render method
  render() {

    return (

      <View style = {styles.container}>

        <Text style = {{padding: 0, maxWidth: '90%', color: 'black', fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>

          Por el momento, solo podemos subir videos de Youtube.

          Para eso, solo debes copiar el link de tu video de Youtube y pegarlo en el siguiente recuadro.

        </Text>

        <Input
          onChangeText={(text) => this.setState({link: text})}
          placeholder='Link de video (DEBE ser de Youtube)'
          leftIcon={{ type: 'font-awesome', name: 'youtube' }}
        />

        <Input
          maxLength={1000}
          onChangeText={(text) => this.setState({skater: text})}
          placeholder='Nombre del skater'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
        />

        <Input
          maxLength={1000}
          onChangeText={(text) => this.setState({comment: text})}
          placeholder='Agrega algun comentario'
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
        />

        <Button

          // raised

          // title="Subir mi propio video"
          title = 'Subir mi video'

          onPress = {this.add_video}

          buttonStyle={styles.buttonStyle}

          icon={
            <Icon
              name="camera"
              size={20}
              color="white"
              type = "font-awesome"
              iconStyle = {{margin: 10}}
            />
          }

          iconRight
          // buttonStyle = {{

          //   backgroundColor: "#3f5fe0",
          //   width: 300,
          //   height: 45,
          //   borderColor: "transparent",
          //   borderWidth: 0,
          //   margin: 30,
          //   borderRadius: 100

          // }}
        />

      </View>

    );

  }

}
const styles = StyleSheet.create({
  //  container_flex : {

  //   flex:1 ,
  //   justifyContent: 'center', 
  //   alignItems: 'center'
  // },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  video: {
    marginTop: 50,
    maxHeight: 220,
    width: 320,
    flex: 1
  },
  buttonStyle: {
    backgroundColor: "gray",
    width: 300,
    height: 45,
    elevation: 10,
    // fontSize: 20,
    // borderColor: "transparent",
    // borderWidth: 0,
    borderRadius: 100,
    margin: 3,
    // borderColor: "red",

  },

});


export default withNavigation(Add_Video);