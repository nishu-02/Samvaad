import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Layout } from '@ui-kitten/components';

const AddContact = () => {
  return (
    <Layout style={{ flex: 1, padding: 20 }}>
      <SafeAreaView>
        <Input placeholder="First Name" style={{ marginBottom: 10 }} />
        <Input placeholder="Last Name" style={{ marginBottom: 10 }} />
        <Input placeholder="Phone" keyboardType="phone-pad" style={{ marginBottom: 10 }} />
        <Input placeholder="Address" style={{ marginBottom: 10 }} />
        <Input placeholder="City" style={{ marginBottom: 10 }} />
      </SafeAreaView>
    </Layout>
  );
};

export default AddContact;
