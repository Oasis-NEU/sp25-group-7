import { View, Text, ScrollView, Image, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, {useState} from 'react';

export default function HomeScreen() {

  type LocationInfo = {
    name: string;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20,
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: 'chartreuse',
      borderWidth: 2,
      borderColor: 'black',
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      minWidth: '48%',
      textAlign: 'center',
    },
    button2: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: 'crimson',
      borderWidth: 2,
      borderColor: 'black',
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      minWidth: '48%',
      textAlign: 'center',
    },
  });
  

  const Location = (info: LocationInfo) => {
    const [attending, setAttending] = useState(false);
    const [count, setCount] = useState(0);
    return (
      <View style={styles.container}>
        <Text>
          {info.name} : {attending ? 'I AM GOING!' : 'Not Going'}, Number of people Going: {count}
        </Text>
        <View style={styles.button2}>
        <Button
        title = "Location Info"
        color = "#0000000"
        />
        </View>
        <View style={attending ? styles.button : styles.button2}>
        <Button
          onPress={() => {
            setAttending(!attending);
            if (!attending) {
              setCount(count + 1);
            } else {
              setCount(count - 1);
            }
          }}
          title = {attending ? 'Click to Unattend' : 'Click to Attend'}
          color = "#000000"
        />
        </View>
      </View>
    );
  };

  return (
    //Starts a scroll version of a view
    <ScrollView>
      <TextInput //Text box
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue = "Find a Location" // Start value 
      />
      <View>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <Location name = "Location 1"/>
        <Location name = "Location 2"/>
      </View>
    </ScrollView>
  );
}