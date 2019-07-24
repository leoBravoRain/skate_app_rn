import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
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

// testing
// import InstagramEmbed from 'react-native-embed-instagram'  
// import InstagramEmbed from 'react-native-instagram-embed';


// Index for video
var index = 0;

// Home screen
export default class Location_Details extends Component {


  // Options for header bar
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.marker.name,

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

        const link = '<iframe width="320" height="440" src="' + this.state.video.link + '" frameborder="0"></iframe>';

        // Define the body
        var body = (

          <View style = {styles.container}>

            <WebView

              javaScriptEnabled={true}
              // domStorageEnabled={true}
              // source = {{html: link}}
              source={{ uri: this.state.video.link }}
              // source = {{uri: 'https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/?hl=es-la'}}
              // source = {{html: 'https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/?hl=es-la', baseUrl: 'https://instagram.com'}}
              // source={{ html: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/?hl=es-la" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/?hl=es-la" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> Ver esta publicación en Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/?hl=es-la" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Una publicación compartida de Leo Bravo (@leobravorain)</a> el <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2018-06-07T03:26:13+00:00">6 Jun, 2018 a las 8:26 PDT</time></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>', baseUrl: 'https://instagram.com' }}
              // source = {{html: 'https://www.instagram.com/p/Bp232pYF8NRdBOVhzdv7WEnySOaCktZpqwbKQc0/', baseUrl: 'https://instagram.com'}}
              // source = {{html: this.state.video.link, baseUrl: 'https://instagram.com'}}
              // style={styles.video}
              // style = {{width: 300, maxHeight: 500, content: 1000}}
              mediaPlaybackRequiresUserAction={true}
              style={{ height:700, width:320,alignSelf:"center",alignContent:"center"}}
              // onNavigationStateChange={this.navChanged}
              // startInLoadingState={true}
              // renderLoading={
              //   ()=> {
              //     return (<ActivityIndicator /> )
              //   }
              // }
              // scalesPageToFit={true} 
              // bounces={false}
              scrollEnabled={false}
              // mediaPlaybackRequiresUserAction = {false}
              // allowsInlineMediaPlayback = {true}

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
    // alignItems: 'center',
    justifyContent:'center',
    // textAlign: 'center',
    // marginTop: 20,
    // maxHeight: 220,
    maxHeight: 1000,
    width: 1000,
    // width: 320,
    // flex: 1
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