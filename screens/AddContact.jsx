import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddContact = () => {
  const theme = useTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.colors.primary}]}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => console.log("Upload Image")}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Avatar.Icon size={80} icon="image" style={styles.imagePlaceholder} />
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          mode="outlined"
          left={<TextInput.Icon icon="phone" />}
          style={styles.input}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          mode="outlined"
          left={<TextInput.Icon icon="map-marker" />}
          style={styles.input}
        />
        <TextInput
          label="City"
          value={city}
          onChangeText={setCity}
          mode="outlined"
          left={<TextInput.Icon icon="city" />}
          style={styles.input}
        />
      </View>

      <Button mode="contained" onPress={() => console.log("Contact Saved")} style={styles.button}>
        Save Contact
      </Button>
    </SafeAreaView>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    justifyContent:'center',
    alignItems: "center",
    marginBottom: 30,
    height:200,
  },
  imagePlaceholder: {
    backgroundColor: "#1E1E1E",
    width:350,
    height:160
  },
  profileImage: {
    borderRadius: 20,
  },
  inputContainer: {
    marginTop:19,
    marginBottom: 30,
    borderRadius:14,
  },
  input: {
    
    marginBottom: 30,
    borderRadius:34,
  },
  button: {
    marginTop: 10,
  },
});
