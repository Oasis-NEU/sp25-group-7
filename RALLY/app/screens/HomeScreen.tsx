import { View, Text, ScrollView, Image, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from "react-native";
import React, {useState} from 'react';

export default function HomeScreen() {

  type LocationInfo = {
    name: string;
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',  // Center content
      padding: 10,
      marginVertical: 10,  // Space between containers
    },
    buttonRow: {
      flexDirection: 'row',  // Place buttons side by side
      justifyContent: 'space-evenly', 
      width: '100%',  // Ensure they spread out
      marginTop: 10,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: '100%',
      height: '100%',
      position: 'absolute', // Make sure it covers the full area
    },
    titleBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for visibility
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderTopLeftRadius: 10, // Rounded corners to match container
      borderBottomRightRadius: 10,
    },
    titleText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    buttonGreen: {
      paddingHorizontal: 8,
      paddingVertical: 4,
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
    buttonRed: {
      paddingHorizontal: 4,
      paddingVertical: 4,
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
      <ImageBackground 
        source={require('../../assets/images/partyBackground.jpeg')} // Change this to your image URL
        style={styles.container}
        imageStyle={{ borderRadius: 10, opacity: 0.5 }} // Optional: Rounds corners of the image
      >
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>{info.name}</Text>
        </View>
    
        <Text>{attending ? 'I AM GOING!' : 'Not Going'}, Number of people Going: {count}</Text>
        
        <View style={styles.buttonRow}>
          <View style={styles.buttonRed}>
            <Button
              title="Location Info"
              color="black"
            />
          </View>
          <View style={attending ? styles.buttonGreen : styles.buttonRed}>
            <Button
              onPress={() => {
                setAttending(!attending);
                setCount(attending ? count - 1 : count + 1);
              }}
              title={attending ? 'Unattend' : 'Attend'}
              color="black"
            />
          </View>
        </View>
      </ImageBackground>
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
        <View style={{flex: 1}} />
        <Location name = "Location 1"/>
        <Location name = "Location 2"/>
      </View>
    </ScrollView>
  );
}