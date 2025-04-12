import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

const MyFAB = ({ visible = true, style, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        icon="pencil"
        label="Add"
        onPress={() => navigation.navigate('AddContact')}
        visible={visible}
        animateFrom="right"
        iconMode="static"
        style={[styles.fabStyle, style]}
      />
    </SafeAreaView>
  );
};

export default MyFAB;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabStyle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
