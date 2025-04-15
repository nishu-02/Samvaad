import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button, Avatar, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const AddContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  
  // Using global theme state from Redux
  const { theme } = useSelector((state) => state.theme);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity 
        style={styles.imageContainer} 
        onPress={() => console.log("Upload Image")}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.surface }]}>
            <Icon name="image-plus" size={24} color={theme.colors.primary} />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputsWrapper}>
        <View style={styles.inputRow}>
          <Icon name="account" size={24} color={theme.colors.text} style={styles.inputIcon} />
          <TextInput
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor="transparent"
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.text}
          />
        </View>

        <View style={styles.inputRow}>
          <Icon name="account" size={24} color="transparent" style={styles.inputIcon} />
          <TextInput
            label="Last name"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor="transparent"
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.text}
          />
        </View>

        <View style={styles.inputRow}>
          <Icon name="phone" size={24} color={theme.colors.text} style={styles.inputIcon} />
          <TextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor="transparent"
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.text}
          />
        </View>

        <View style={styles.inputRow}>
          <Icon name="map-marker" size={24} color={theme.colors.text} style={styles.inputIcon} />
          <TextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor="transparent"
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.text}
          />
        </View>

        <View style={styles.inputRow}>
          <Icon name="city" size={24} color="transparent" style={styles.inputIcon} />
          <TextInput
            label="City"
            value={city}
            onChangeText={setCity}
            mode="outlined"
            style={[styles.input, { backgroundColor: theme.colors.surface }]}
            outlineColor="transparent"
            activeOutlineColor={theme.colors.primary}
            textColor={theme.colors.text}
          />
        </View>
      </View>

      <Button 
        mode="contained" 
        onPress={() => console.log("Contact Saved")} 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={{ color: theme.colors.onPrimary }}
      >
        Save Contact
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingVertical: 40,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  inputsWrapper: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
    width: 24,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 8,
  }
});

export default AddContact;