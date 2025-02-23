import { View, Text, ScrollView, Image, TextInput } from "react-native";

export default function HomeScreen() {
  return (
    //Starts a scroll version of a view
    <ScrollView>
      <Text>Some text</Text>
      <View 
        style={{ 
          flex: 1, 
          justifyContent: "center", 
          alignItems: "center" 
        }}>
        <Text style={{ fontSize: 20 }}> Home Screen</Text>
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
        defaultValue="You can type in me" // Start value 
      />
    </ScrollView>
  );
}