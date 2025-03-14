import React, { useState, memo } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 🔹 List of locations (add as many as you want)
  const locations = [
    "Two Saints (OHE)", 
    "Venu Nightclub", 
    "Bijou", 
    "Clerys", 
  ];

  const handleSelect = (name: string) => {
    setSelectedLocation(prev => (prev === name ? null : name)); // Toggle selection
  };

  // 🔹 Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Sort locations: selected location always on top
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (a === selectedLocation) return -1;
    if (b === selectedLocation) return 1;
    return 0;
  });

  return (
    <ScrollView>
      {/* 🔹 Search Bar */}
      <TextInput 
        style={styles.searchBar}
        placeholder="Search for a location..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={setSearchQuery} // Updates searchQuery state
      />
      <View>
        {sortedLocations.length > 0 ? (
          sortedLocations.map((name) => (
            <Location key={name} name={name} selectedLocation={selectedLocation} onSelect={handleSelect} />
          ))
        ) : (
          <Text style={styles.noResultsText}>No locations found</Text>
        )}
      </View>
    </ScrollView>
  );
}

// ✅ Type definition for props
type LocationProps = {
  name: string;
  selectedLocation: string | null;
  onSelect: (name: string) => void;
};

// ✅ Memoized Location Component to prevent unnecessary re-renders
const Location = memo(({ name, selectedLocation, onSelect }: LocationProps) => {
  const isSelected = selectedLocation === name;

  return (
    <ImageBackground 
      source={require('../../assets/images/partyBackground.jpeg')}
      style={styles.container}
      imageStyle={{ borderRadius: 10, opacity: 0.5 }}
    >
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>{name}</Text>
      </View>

      <Text>Number of people Going: {isSelected ? 1 : 0}</Text>
      
      <View style={styles.buttonRow}>
        <View style={styles.buttonRed}>
          <Button title="Location Info" color="black" />
        </View>
        <View style={isSelected ? styles.buttonGreen : styles.buttonRed}>
          <Button
            onPress={() => onSelect(name)}
            title={isSelected ? 'I AM GOING!' : 'Click to Go'}
            color="black"
          />
        </View>
      </View>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    color: 'black',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 20,
  },
  container: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
  },
  titleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
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