import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

import useAuthStore from "../global/useAuthstore";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useAuthStore((state) => state.loginUser);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Welcome!</Text>
      </View>
      <Text style={styles.label}>Enter your Email:</Text>

      <TextInput
        placeholder="Enter your Email"
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={styles.input}
      />

      <Text style={styles.label}>Enter your password</Text>
      <TextInput
        placeholder="Do you remember it..."
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button
        icon="login"
        mode="contained"
        onPress={handleLogin}
        theme={{ colors: { primary: "thistle" } }}
        style={{ marginTop: 16 }}
      >
        Let's begin samvaad
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ color: "blue" }}>Create an account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "beige",
  },
  label: {
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
    height: 50,
  },
  loginButton: {
    height: 100,
    width: 100,
    backgroundColor: "teal",
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignContent: "center",
  },
  heading: {
    height: 100,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    marginBottom: 70,
  },
  headingText: {
    fontSize: 38,
    fontWeight: "condensedBold",
    alignSelf: "center",
  },
});

export default LoginScreen;
