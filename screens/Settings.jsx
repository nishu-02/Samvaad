import React from "react";
import { SafeAreaView, View } from "react-native";
import { Toggle, Text, Button } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../global/themeSlice";

const Settings = () => {
  const { colors, dark } = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text category="h5" style={{ color: colors.text }}>Settings</Text>

      <Toggle checked={dark} onChange={() => dispatch(toggleTheme())} style={{ marginVertical: 10 }}>
        {(evaProps) => <Text {...evaProps} style={{ color: colors.text }}>
          {dark ? "Dark Mode" : "Light Mode"}
        </Text>}
      </Toggle>

      <Button style={{ backgroundColor: colors.primary, borderColor: colors.primary }}>
        Change Password
      </Button>
    </SafeAreaView>
  );
};

export default Settings;