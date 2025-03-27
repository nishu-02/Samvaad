import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../global/themeSlice";
import { Switch, Text, Button, Divider } from "react-native-paper";

const Settings = () => {
  const themeState = useSelector((state) => state.theme);

  // Ensure theme object exists
  if (!themeState || !themeState.theme) {
    return <Text>chal raha h kya</Text>;  // Debugging purpose
  }

  const { colors, dark } = themeState.theme; // Redux theme colors
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text variant="headlineMedium" style={[styles.header, { color: colors.text }]}>
        Settings
      </Text>

      <Divider style={styles.divider} />

      {/* Theme Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={{ color: colors.text, fontSize: 16 }}>Dark Mode</Text>
        <Switch
          value={dark}
          onValueChange={() => dispatch(toggleTheme())}
          color={colors.primary}
        />
      </View>

      {/* Fix Button Visibility */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => console.log("Change Password Pressed")}
          style={[styles.button, { backgroundColor: colors.primary }]}
          labelStyle={{ color: "white", fontWeight: "bold" }}
        >
          Change Password
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  divider: { marginVertical: 10, height: 1 },
  toggleContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  buttonContainer: { marginTop: 20 },
  button: { paddingVertical: 10, borderRadius: 5 },
});
