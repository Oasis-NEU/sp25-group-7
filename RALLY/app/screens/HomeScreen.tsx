import React, { useState, memo, useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 🔹 Reference for ScrollView to enable auto-scrolling
  const scrollViewRef = useRef<ScrollView>(null);

  // 🔹 List of locations with their own images
  const locations = [
    { name: "Two Saints", price: "$$$$", age: "21+", image: require('../../assets/images/TwoSaints.jpeg') },
    { name: "Venu Nightclub", price: "$$", age: "21+", image: require('../../assets/images/Venu.jpeg') },
    { name: "Clerys", price: "$$", age: "21+", image: require('../../assets/images/Clerys.jpeg') },
    { name: "Bijou", price: "$", age: "18+", image: require('../../assets/images/Bijou.webp') },
  ];

  const handleSelect = (name: string) => {
    setSelectedLocation(prev => (prev === name ? null : name)); // Toggle selection

    // 🔹 Scroll to top when a new location is selected
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // 🔹 Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Sort locations: selected location always on top
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (a.name === selectedLocation) return -1;
    if (b.name === selectedLocation) return 1;
    return 0;
  });

  return (
    <ScrollView ref={scrollViewRef}>
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
          sortedLocations.map(({ name, price, age, image }) => (
            <Location 
              key={name} 
              name={name} 
              price={price} 
              age={age} 
              image={image} 
              selectedLocation={selectedLocation} 
              onSelect={handleSelect} 
            />
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
  price: string;
  age: string;
  image: any;
  selectedLocation: string | null;
  onSelect: (name: string) => void;
};

// ✅ Memoized Location Component to prevent unnecessary re-renders
const Location = memo(({ name, price, age, image, selectedLocation, onSelect }: LocationProps) => {
  const isSelected = selectedLocation === name;

  return (
    <ImageBackground 
      source={image}  // 🔹 Unique image for each location
      style={styles.container}
      imageStyle={{ borderRadius: 10, opacity: 0.5 }}
    >
      {/* 🔹 Title & Age Tag (Aligned in a Row) */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>{name}</Text>
        </View>
        <View style={styles.ageTag}>
          <Text style={styles.ageText}>{age}</Text>
        </View>
      </View>

      {/* 🔹 Price Tag (Top Right) */}
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>{price}</Text>
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
  // 🔹 Title & Age container
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row', // Aligns title and age horizontally
    alignItems: 'center', // Centers them vertically
  },
  titleBar: {
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
  ageTag: {
    backgroundColor: 'yellow',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 8,
  },
  ageText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  priceTag: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: 'lawngreen',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  priceText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
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