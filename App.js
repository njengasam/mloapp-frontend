import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View, StyleSheet, StatusBar, TextInput, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { color, Value } from 'react-native-reanimated';


export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inputValue, onChangeText] = useState('');
  const [initialImage, changeImage] = useState('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
  const [errorMessage, setErrorMsg] = useState('');
  const [showErrorMsg, toggleErrorMsg] = useState(false);

  const Item = ({ item }) => (
    <View style={styles.prediction}>
      <View >
        <Text style={styles.predictionText}>{item.name}</Text>
      </View> 
      <View style={styles.progress}>
        <ProgressCircle
          percent={item.value}
          radius={35}
          borderWidth={6}
          color="tomato"
          shadowColor="#f5f5ff"
          bgColor="#fff"
        >
        <Text style={{ fontSize: 18, paddingLeft:8 }}>{item.value + "%"} </Text>
        </ProgressCircle>
      </View>
    </View>
  )

  function onchangeInput(text) {
    if (text !== '') {
      changeImage(text);
    }else{
      changeImage('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    }
    onChangeText(text);
  }

  function pressed () {
    setLoading(true);
    toggleErrorMsg(false);

    fetch('https://mloserver-new.herokuapp.com/predictions', {
        method: "POST",
        body: JSON.stringify({imageUrl:inputValue}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then((response) => {
        if (response.status !== 200) {
          setLoading(false);
          setErrorMsg('Unable to get predictions! Make sure you input a valid image url');
          toggleErrorMsg(true);
        }
        return response.json()
      })
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputContainer}
        onChangeText={text => onchangeInput(text)}
        value={inputValue}
        placeholder="paste your food image url.."
        autoFocus={true}
      />
      <Button 
          title="Analyse"
          color="red"
          onPress={pressed}
          style={styles.button}
      />
      {/* <View style={styles.customButton}>
        <Text>Analyse</Text>
      </View> */}
      <View style={styles.imageContainer}>
      <Image 
        fadeDuration={1000}
        resizeMode={"contain"}
        source={{
          width:270,
          height:170,
          uri: initialImage
        }} />
      </View>
      
      {showErrorMsg && (
        <View>
           <Text style={{color:'tomato', textAlign:'center'}}>{errorMessage}</Text>
        </View>
        )
      }

      {isLoading ? (
        <View>
          <ActivityIndicator size="large" color="tomato" />
          <Text style={{textAlign:'center'}}>Getting predictions...</Text>
        </View>
        ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={Item}
        />
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f5f5f5",
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20
  },
  button:{
    
  },
  customButton:{
    backgroundColor:"white",
    height: 40,
    justifyContent:"center",
    alignItems: 'center',
    borderRadius:5,
    color:"white"
  },
  textInputContainer:{
    backgroundColor:"#ffffff",
    height:40,
    marginVertical:20,
    borderRadius:30,
    paddingLeft:30,
    paddingRight:30
  },

  imageContainer:{
    padding: 10,
    justifyContent:"center",
    alignItems:"center",
    marginVertical: 20,
    borderRadius:10,
    backgroundColor:"#ffffff",
    height: 200
  },
  prediction: {
    flexDirection:"row",
    justifyContent:"space-between",
    padding: 10,
    marginVertical: 6,
    borderRadius: 15,
    backgroundColor:"#ffffff"
  },
  predictionText:{
    fontSize: 23
  },
  progress:{
    
  },
  title: {
    fontSize: 32,
  },
});