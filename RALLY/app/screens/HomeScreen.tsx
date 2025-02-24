import { View, Text, ScrollView, Image, TextInput, Button } from "react-native";
import React, {useState} from 'react';

export default function HomeScreen() {

  type LocationInfo = {
    name: string;
  }

  const Location = (info: LocationInfo) => {
    const [attending, setAttending] = useState(false);
    return (
      <View>
        <Text>
          {info.name} : {attending ? 'I AM GOING!' : 'Not Going'}
        </Text>
        <Button
          onPress={() => {
            setAttending(!attending);
          }}
          title={attending ? 'Click to Unattend' : 'Click to Attend'}
        />
      </View>
    );
  };

  return (
    //Starts a scroll version of a view
    <ScrollView>
      <View 
        style={{ 
          flex: 1, 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
        <Text style={{ fontSize: 20 }}>Home Screen</Text>
        <Location name = "Location 1"/>
        <Location name = "Location 2"/>
        <Text>Example image</Text>
        <Image //Example of how to make an image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        /> 
      </View>
      <TextInput //Text box
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Type Box" // Start value 
      />
    </ScrollView>
  );
}