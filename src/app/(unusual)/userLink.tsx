import React from 'react';
import { View, Text } from 'react-native';

import { LinkCard } from '../components/link-card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { User, UserSpec } from '../interfaces/types';
import { Link } from 'expo-router';
import { Button } from '../components/ui/button';
import { PHButton } from '../components/PHButton';

const UserLink = () => {
  const [form, setForm] = React.useState<UserSpec>({
    password: '',
    privateCode: '',
    name: '',
    role: '',
    email: '',
    active: true,
    height: '',
    weight: '',
  });

  const [user, setUser] = React.useState<User | null>(null);

  const setField =
    <K extends keyof UserSpec>(key: K) =>
    (value: UserSpec[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async () => {
    console.log('Submitting form:', form);
  };

  return (
    <View className="flex-1 justify-center bg-black px-10 pt-20 gap-9">
      <Text className="sm:text-7xl text-4xl font-bold text-blue-500">Is your coach on Goach?</Text>

      <LinkCard />

      <View className="items-left">
        <Text className="items-left sm:text-4xl text-2xl font-semibold text-white">
          Linking data
        </Text>
      </View>

      <View className="flex-row">
        <View className="gap-8 p-10">
          <Input
            id="tEmail"
            placeholder="Enter an Email here."
            keyboardType="default"
            autoCapitalize="none"
            value={form.email}
            onChangeText={setField('email')}
            returnKeyType="next"
          />

          {/* SUBMIT BUTTON (CON TRACKING) */}
          <PHButton
            label="Link Now!"
            phEvent="click_userlink_submit"
            className="w-full items-center py-3 bg-blue-600 rounded-xl"
            onPress={onSubmit}
          >
            <Text className="text-white text-lg">Link Now!</Text>
          </PHButton>
        </View>
      </View>
    </View>
  );
};

export default UserLink;
