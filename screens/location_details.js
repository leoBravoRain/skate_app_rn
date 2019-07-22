import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  // Button,
  // Linking,
  // ImageBackground,
  // FlatList,
  // ScrollView,
  ProgressBarAndroid
} from 'react-native';

import { 
  // Badge,
  Button,
  Icon
} from 'react-native-elements';

import { WebView } from "react-native-webview";

// Index for video
var index = 0;

// Home screen
export default class Location_Details extends Component {


  // Options for header bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Trucos",

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

  constructor(props) {

    super(props);

    // const videos_list = [

    //   {link: 'https://youtu.be/6eE6EZHsPS4', votes: 554, comment: 'Nollie sobre el Toro!', skater: 'Ryan Decenzo'},
    //   {link: 'https://www.youtube.com/embed/999HqWOoQbU?start=245', votes: 320, comment: 'Intento fallido de flip 360° sobre el Toro. Para la próxima sale!', skater: 'Peter Villalba'}

    // ]

    this.state = {

      // video: videos_list[index],
      // index: index,
      // get_videos: false,
      get_videos: false,
      videos_list: [],
      video: null,
      index: 0,

    };

    // This binding is necessary to make `this` work in the callback
    this.next_video = this.next_video.bind(this);
    this.add_video = this.add_video.bind(this);
    this.back_video = this.back_video.bind(this);

  }


  // Component will mount
  componentDidMount(){

    // Fetch data from server
    // fetch('https://touristapi.pythonanywhere.com/videos_location/' + this.props.navigation.state.params.marker.id + '/')
    // fetch('http://127.0.0.1:8000/videos_location/1/')
    const url_API = 'https://skateappapi.pythonanywhere.com/videos_location/' + this.props.navigation.state.params.marker.id;

    console.log(url_API);

    fetch(url_API)
          .then((response) => response.json())
          .then((responseJson) => {

            // Alert.alert('jiji');

            // if(responseJson > 0){}
            const videos_list = responseJson;
            // const videos_list = this.generate_fake_data();

            // console.log(videos_list);

            // Get fake data

            // console.log(videos_list);

            // Alert.alert(String(videos_list[0].link));

            this.setState({

              // Get list of json objects
              // Reverse for get the last video uploaded 
              // videos_list: videos_list.reverse(),
              videos_list: videos_list,
              // get_markers: true,
              video: videos_list[0],
              // videos_list_length : videos_list.lenght
              get_videos: true,

            });

            // Alert.alert('get videos variable: ' + String(this.state.get_videos));

          })
          .catch((error) => {
            Alert.alert('Error');
            console.error(String(error));
            Alert.alert('get videos variable: ' + String(this.state.get_videos));
          }); 

  }


  //manage click
  next_video(){

    // Update index
    new_index = this.state.index + 1;


    // if video_index is less than max lenght
    if((new_index + 1) > this.state.videos_list.length){

      // restart index
      new_index = 0;

    }

    // Update info
    this.setState({ 

      index: new_index,
      video: this.state.videos_list[new_index]

    })

  }

  // back video
  back_video(){

    // Update index
    new_index = this.state.index - 1;

    // if video_index is less than 0
    if((new_index ) < 0 ){

      // restart index
      new_index = this.state.videos_list.length - 1;

    }

    // Update info
    this.setState({ 

      index: new_index,
      video: this.state.videos_list[new_index]

    })

  }

  // add video
  add_video(){

    this.props.navigation.push("Add_Video", {location: this.props.navigation.state.params.marker});  

  };

  // react to video
  vote_by_video(){

    // Update to real API
    const url_API = 'https://skateappapi.pythonanywhere.com/vote_by_video/' + this.state.video.id + '/';

    // Update data
    fetch(url_API)
          .then((response) => response.json())
          .then((responseJson) => {

            // Get video from API
            const video = responseJson[0];

            // Update video
            this.setState({

              video: video,
 
            });

          })
          .catch((error) => {
            Alert.alert('Ups, tuvimos un error, intentalo mas tarde');
            console.error(String(error));
            // Alert.alert('get videos variable: ' + String(this.state.get_videos));
          }); 
   
  }


  // Render method
  render() {

    // Get videos
    var get_videos = this.state.get_videos;

    // Render the title
    // If it gets the videos
    if(get_videos){

      // If there is not videos
      if(this.state.videos_list.length > 0){

        // Define the title
        if(this.state.index == 0){

          // Title
          var title = (

            <View> 

              <Text style = {{padding: 0, maxWidth: '90%', color: 'black', fontWeight: 'bold', fontSize: 55, textAlign: 'center'}}>

                Mejor Truco

              </Text>

              <Text style = {{padding: 0, maxWidth: '90%', color: 'black', fontWeight: 'normal', fontSize: 20, textAlign: 'center'}}>

                {this.state.video.skater}

              </Text>

              <Text style = {{maxWidth: '90%', color: 'black', fontWeight: 'bold', fontSize: 12, textAlign: 'center'}}>

                Posición: {this.state.index + 1}

              </Text>

            </View>

            );

        }

        // If not the best trick
        else{

          var title = (

            <View>

              <Text style = {{padding: 10, maxWidth: '90%', color: 'black', fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>

                Posición: {this.state.index + 1}

              </Text>

              <Text style = {{padding: 0, maxWidth: '90%', color: 'black', fontWeight: 'normal', fontSize: 20, textAlign: 'center'}}>

                {this.state.video.skater}

              </Text>

            </View>

            );

        }

        // Define the body
        var body = (

          <View style = {styles.container}>

            <WebView

              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: this.state.video.link }}
              style={styles.video}

            />

            <Text style = {{padding: 0, maxWidth: '90%', color: 'black', fontWeight: 'bold', fontSize: 15, textAlign: 'center'}}>

              Votos: {this.state.video.votes}

            </Text>

            <Text>

              {this.state.video.comment}

            </Text>

            <Icon
              name="heart"
              size={35}
              color="red"
              type = "font-awesome"
              // iconStyle = {{margin: 0, }}

              iconStyle={{ margin: 10 }}
              onPress={() => this.vote_by_video()}
            />

            <Button

              title="Proximo video"

              onPress = {this.next_video}

              buttonStyle={styles.buttonStyle}

              icon={
                <Icon
                  name="arrow-right"
                  size={20}
                  color="white"
                  type = "font-awesome"
                  iconStyle = {{margin: 20}}
                />
              }

              iconRight
            
            />

            <Button

              title="Video Anterior"

              onPress = {this.back_video}

              buttonStyle={styles.buttonStyle}

              icon={
                <Icon
                  name="arrow-left"
                  size={20}
                  color="white"
                  type = "font-awesome"
                  iconStyle = {{margin: 20}}
                />
              }
    
            />

            <Button

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
             
            />

          </View>

        );

      }

      // If there is not videos
      else{

        var title = (

          <Text style = {{ margin: 50, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> 

            No hay videos aún, ¡sube el tuyo!

          </Text>

          );


        var body = (

          <View style = {styles.container}>

            <Button

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
             
            />

          </View>

          );

      }

    }

    // If not get videos yet
    else{

      var title = <Text> Loading videos </Text>
      var body = <Text> Loading videos </Text>

    }

    // Render method
    return (

      <View style={styles.container}>

        {this.state.get_videos

          ?

          <View style = {styles.container}>

            {title}
            {body}

          </View>
          :

          <ProgressBarAndroid />
        }

      </View>

    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  video: {
    marginTop: 20,
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