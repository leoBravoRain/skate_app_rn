import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  // Image,
  ImageBackground,
  // PermissionsAndroid,
  // NetInfo,
  // Button,
  Picker,
  ProgressBarAndroid
} from 'react-native';

import { Button } from 'react-native-elements';
import { NavigationActions, withNavigation } from 'react-navigation';


class HelloWorldApp extends Component {

  // hide nav bar
  static navigationOptions = {

    header: null,

  }

  //Constructor
  constructor(props) {

    super(props);

    // initial state
    this.state = {

      places: [],

      // initial place
      place: null,

      place_name: null,

      // Var for indicate if it gets places
      get_places: false,
      // get_places: true,

    };
  
  }

  // Component did mount
  componentDidMount(){

    // get places from API
        // const url_server = "http://192.168.1.12:8000/place/";
        const url_server = 'https://skateappapi.pythonanywhere.com/place'
        fetch(url_server)
              .then((response) => response.json())
              .then((responseJson) => {

                // list of plcaes in JSON
                var places_from_server = responseJson;

                // Alert.alert(places_from_server[0].name);

                // console.log(places_from_server);

                // console.log(places_from_server[0].id);


                // Update places 
                this.setState({

                  places: places_from_server,

                  // initial place
                  place: places_from_server[0].id,
                  place_name: places_from_server[0].name,
                  get_places: true,

                });


              })
              .catch((error) => {
                console.error(error);
                Alert.alert('Error !');
              });

  }

  // // Manage danger map
  // dangers_map(){

  //   // Navitage to next page
  //   this.props.navigation.push("Map"); 

  // }

  // manage click on button 
  manage_click(){


    // Navitage to next page
    this.props.navigation.push("Map", {place: this.state.place});  

  }

  // Render method
  render() {

    // Get places names
    const list_places_names = this.state.places.map((item) =>{

      return(item.name);

    });

    return (

      <View style = {styles.container_flex}>

        <ImageBackground 
          // source={{uri: 'https://previews.123rf.com/images/stocking/stocking1209/stocking120900044/15271577-portrait-of-an-happy-worker-in-a-factory.jpg'}}
          source = {{uri: "https://images.unsplash.com/photo-1531948371443-d5afa127f918?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}}
          style={styles.image_background}
          resizeMode='cover' 
          >
          
            <View style = {styles.container_flex}>

              <Text style = {{padding: 10, maxWidth: '90%', color: 'white', fontWeight: 'bold', fontSize: 55, textAlign: 'center'}}>

                ¿Que ciudad quieres explorar?

              </Text>

              {

                this.state.get_places

                ? 

                <View>
              
                  <Picker
                    // style = {styles.buttonStyle}
                    selectedValue={this.state.place}
                    style={{height: 50, width: 100, color: 'white', backgroundColor: 'rgba(255,100,100,0.1)'  }}
                    // itemStyle={{ backgroundColor: 'red', }}
                    itemTextStyle={{ fontSize: 180, color: 'white' }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({place: itemValue, place_name: list_places_names[itemIndex],})
                  }>

                    {
                      this.state.places.map((item) =>{

                        return(

                          <Picker.Item  label={item.name} value={item.id} key={item.name}/>

                        );

                      })

                    }

                  </Picker>

                  <Button

                    raised

                    title = {"Explorar " + this.state.place_name}

                    onPress = {()=> this.manage_click()}

                    buttonStyle={styles.buttonStyle}

                  />

                </View>

              :

              <ProgressBarAndroid/>
            }

            </View>

        </ImageBackground>

      </View>

    );

  }

}

const styles = StyleSheet.create({

  image_background: {

    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'

  },

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
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
    // margin: 2,
    // borderColor: "red",

  }

})

export default withNavigation(HelloWorldApp);