import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import { useThemeStore } from '../global/themeStore';

const Settings = () => {
  const { theme, toggleTheme } = useThemeStore(); 

  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.heading}>
        Settings
      </Text>
      <Button onPress={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    marginBottom: 20,
  },
});
