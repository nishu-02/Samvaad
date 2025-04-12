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
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Login</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666"
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#666"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Login
        </Button>

        <TouchableOpacity 
          onPress={() => navigation.navigate("SignUp")}
          style={styles.createAccountContainer}
        >
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 80,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "500",
    color: "white",
    marginBottom: 40,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    paddingHorizontal: 15,
    color: "#999",
    backgroundColor: "#121212",
  },
  loginButton: {
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#1976D2",
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "500"
  },
  createAccountContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  createAccountText: {
    color: "#1976D2",
    fontSize: 14
  }
});

export default LoginScreen;