import React, { useState } from "react";
import { View, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from "react-native";
import { Text, TextInput, ActivityIndicator } from "react-native-paper";
import { registerUser } from "../firebase/authService";
import { useSelector } from "react-redux";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { theme, isDarkMode } = useSelector((state) => state.theme);
  const colors = theme.colors;

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);
    try {
      await registerUser(email, password, username);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.primary }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text 
          variant="headlineMedium" 
          style={[styles.title, { color: colors.text }]}
        >
          Create an Account
        </Text>
        
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }]}
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          outlineColor={isDarkMode ? '#444444' : '#cccccc'}
          activeOutlineColor={colors.button}
          textColor={colors.text}
        />
        
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }]}
          label="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          outlineColor={isDarkMode ? '#444444' : '#cccccc'}
          activeOutlineColor={colors.button}
          textColor={colors.text}
        />
        
        <TextInput
          style={[styles.input, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }]}
          label="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          outlineColor={isDarkMode ? '#444444' : '#cccccc'}
          activeOutlineColor={colors.button}
          textColor={colors.text}
          right={
            <TextInput.Icon 
              icon={showPassword ? "eye-off" : "eye"} 
              onPress={() => setShowPassword(!showPassword)} 
              color={isDarkMode ? '#999999' : '#777777'}
            />
          }
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.button }]} 
          onPress={handleSignup} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.linkText, { color: colors.button }]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignUpScreen;