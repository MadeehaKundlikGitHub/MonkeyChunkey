import * as React from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,Image,Alert} from 'react-native';
import { Header } from 'react-native-elements';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton';

//console.log(db["the"].chunks);

export default class App extends React.Component {

constructor(){
  super();
  this.state={
    text:'',
    chunks:[],
    phonicSounds:[],
  };
}

  render() {
    return (
      <View style={styles.container}>
      <Header
      backgroundColor={'#9c8210'}
      centerComponent={{
        text:'Monkey Chunky',
        style:{color:'#fff',fontSize:20},
         }}
      />

      <Image style ={styles.imageIcon}
      source={{
        uri:'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
          }}
        />

      <TextInput
      style={styles.inputBox}
      onChangeText={text =>
      {
        this.setState ({text: text});
      }}
      value = {this.state.text}
      />
<TouchableOpacity
style = {styles.goButton}
onPress={() =>{
  var word = this.state.text.toLowerCase().trim();
  
//console.log(db[this.state.text]);
db[word]?(

  this.setState({chunks:db[word].chunks}),
  this.setState({phonicSounds:db[word].phones})
):
Alert.alert("The word does not exist in our database");  

}}>
<Text style = {styles.buttonText}> GO </Text>
</TouchableOpacity>
<View style= {{flexDirection: "row", alignSelf: "center"}}>
{this.state.chunks.map((item, index) =>{
  return (
/*
    <TouchableOpacity 
    style ={styles.chunkButton}>
    <Text style={styles.displayText}> {item} </Text>
    </TouchableOpacity>
*/
  
    <PhonicSoundButton
    wordChunk = {this.state.chunks[index]}
    soundChunk = {this.state.phonicSounds[index]}
    buttonIndex={index}
    />
    
    
  );
})}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox:{
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height:40,
    textAlign:'center',
    borderWidth:4,
    outline:'none',
    borderRadius: 20,
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  /*
  displayText: {
    textAlign: 'center',
    fontSize: 30
  },
  */

  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },

  /*
  chunkButton:{
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'red'
  }
  */
});
