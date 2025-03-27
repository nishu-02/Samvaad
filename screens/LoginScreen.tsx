import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //with the firebase
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Enter your username:</Text>
      
      <TextInput
        placeholder="Enter your username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        style={styles.input}
      />

      <Text style={styles.label}>Enter your password</Text>
      <TextInput
      placeholder='Do you remember it...'
      onChangeText={(text) => setPassword(text)}
      value={password}
      style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>
        let's begin samvaad
        </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButton: {
    height:100,
    width:100,
    backgroundColor:'teal',
    borderRadius:23,
    borderWidth:1,
    borderColor:'black',
    justifyContent:'center',
    alignContent:'center',
  }
});

export default LoginScreen;
