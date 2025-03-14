import React, { useState, memo, useRef } from 'react';
import { View, Text, ScrollView, ImageBackground, TextInput, Button, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import for ℹ️ info icon

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [attendingCounts, setAttendingCounts] = useState<Record<string, number>>({});

  // 🔹 Reference for ScrollView to enable auto-scrolling
  const scrollViewRef = useRef<ScrollView>(null);

  // 🔹 List of locations with their own images & website links
  const locations = [
    { name: "Two Saints", price: "$$$$", age: "21+", image: require('../../assets/images/TwoSaints.jpeg'), url: "https://www.twosaintsboston.com/" },
    { name: "Venu Nightclub", price: "$$", age: "21+", image: require('../../assets/images/Venu.jpeg'), url: "https://www.venuboston.com/" },
    { name: "Clerys", price: "$$", age: "21+", image: require('../../assets/images/Clerys.jpeg'), url: "https://www.clerysboston.com/" },
    { name: "Bijou", price: "$", age: "18+", image: require('../../assets/images/Bijou.webp'), url: "https://www.bijouboston.com/" },
  ];

  const handleToggleAttend = (name: string) => {
    setAttendingCounts(prevCounts => ({
      ...prevCounts,
      [name]: selectedLocation === name ? Math.max(0, prevCounts[name] - 1) : (prevCounts[name] || 0) + 1, // Increase or decrease count properly
    }));

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
          sortedLocations.map(({ name, price, age, image, url }) => (
            <Location 
              key={name} 
              name={name} 
              price={price} 
              age={age} 
              image={image} 
              url={url} 
              attendingCount={attendingCounts[name] || 0} 
              selectedLocation={selectedLocation} 
              onToggleAttend={handleToggleAttend} 
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
  url: string;
  attendingCount: number;
  selectedLocation: string | null;
  onToggleAttend: (name: string) => void;
};

// ✅ Memoized Location Component to prevent unnecessary re-renders
const Location = memo(({ name, price, age, image, url, attendingCount, selectedLocation, onToggleAttend }: LocationProps) => {
  const isSelected = selectedLocation === name;

  // Function to open the bar's website
  const openWebsite = () => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <ImageBackground 
      source={image}  
      style={styles.container}
      imageStyle={{ borderRadius: 10, opacity: 0.5 }}
    >
      {/* 🔹 Title & Age Tag (Aligned in a Row) */}
      <View style={styles.titleContainer}>
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>{name}</Text>
          <TouchableOpacity onPress={openWebsite} style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.ageTag}>
          <Text>{age}</Text>
        </View>
      </View>

      {/* 🔹 Price Tag (Top Right) */}
      <View style={styles.priceTag}>
        <Text>{price}</Text>
      </View>

      {/* 🔹 Number of People Going (Centered) */}
      <View style={styles.peopleGoingContainer}>
        <Text>Number of People Going: {attendingCount}</Text>
      </View>

      {/* 🔹 Click to Go Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => onToggleAttend(name)}
          style={isSelected ? styles.buttonGreen : styles.buttonRed}
        >
          <Text style={styles.buttonText}>{isSelected ? 'I AM GOING!' : 'Click to Go'}</Text>
        </TouchableOpacity>
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
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 6,
  },
  infoButton: {
    paddingHorizontal: 5,
  },
  ageTag: {
    backgroundColor: 'yellow',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: 8,
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
  peopleGoingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  buttonGreen: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'chartreuse',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonRed: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'crimson',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});