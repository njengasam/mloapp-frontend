import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Image, SafeAreaView, Button } from 'react-native';


export default function App() {
 const handlePress = () =>{
    console.log("txt clicked");
 }
  return (
    <View style={styles.container}>
    <SafeAreaView>
      <Text>Fay</Text>
      <TouchableHighlight onPress={() => console.log("tapped")}>
        <Image 
        blurRadius={1}
        fadeDuration={1000}
        source={{
          width:200,
          height:300,
          uri: "https://picsum.photos/200"
        }} />
      </TouchableHighlight>
      <Button
       color="orange" 
       title="Click me"
       onPress={() => Alert.alert("My title", "Button clicked", [
         {text:"Yes", onPress: () => console.log("Yes")},
         {text:"No", onPress: () => console.log("No")},
       ])
       } 
       />
    </SafeAreaView>
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { 
  Dimensions,
  StyleSheet,
  SafeAreaView, 
  Platform,
  View,
  Button,
  Text
} from 'react-native';


export default function App() {

  const [count, setCount] = useState(0);

  function pressed () {
    setCount(prevCount => prevCount + 1 );
  }

  console.log(count);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          backgroundColor: "dodgerblue",
          width: '70%',
          height:70,
        }}
      ></View>
      <Button 
        title="Add count"
        color="tomato"
        onPress={pressed}
      />
      <Text>{count}</Text>
    </SafeAreaView>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;




//================================================================

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View, StyleSheet, StatusBar, Platform } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const Item = ({item}) => (
  <View style={styles.prediction}>
  <View >
    <Text style={styles.predictionText}>{item.title}</Text>
  </View> 
  <View style={styles.progress}>
  <ProgressCircle
          percent={90}
          radius={35}
          borderWidth={6}
          color="tomato"
          shadowColor="#999"
          bgColor="#fff"
  >
    <Text style={{ fontSize: 10 }}>{item.releaseYear}</Text>
  </ProgressCircle>
  </View>
  </View>
);

// function Item({item}) {
//   <View style={styles.prediction}>
//   <View >
//     <Text style={styles.predictionText}>{item.title}</Text>
//   </View> 
//   <View style={styles.progress}>
//   <ProgressCircle
//           percent={90}
//           radius={35}
//           borderWidth={6}
//           color="tomato"
//           shadowColor="#999"
//           bgColor="#fff"
//   >
//     <Text style={{ fontSize: 10 }}>{item.releaseYear}</Text>
//   </ProgressCircle>
//   </View>
//   </View>
// }

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <Item title={item.title} releaseYear={item.releaseYear}/>
  );

  function pressed() {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  
  

  return (
    <View style={styles.container}>
    <Button 
        title="Add count"
        color="tomato"
        onPress={pressed}
    />

    
    <ActivityIndicator size="large" color="#00ff00" />
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
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
  prediction: {
    flexDirection:"column",
    justifyContent:"space-between",
    padding: 10,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor:"#ffffff"
  },
  predictionText:{
    fontSize: 20
  },
  progress:{
    
  },
  title: {
    fontSize: 32,
  },
});

// uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
