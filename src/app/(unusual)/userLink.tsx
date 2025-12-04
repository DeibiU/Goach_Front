import React from 'react';
import { View, Text, Alert } from 'react-native';

import { LinkCard } from '../components/link-card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { User, UserSpec } from '../interfaces/types';
import { Link } from 'expo-router';
import { Button } from '../components/ui/button';
import { useUser } from '../services/user-service';
import { useAuth } from '../services/auth-service';

const UserLink = () => {
  const { sendLinkRequest } = useUser();
  const { user } = useAuth();
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

  const setField =
    <K extends keyof UserSpec>(key: K) =>
    (value: UserSpec[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async () => {
    console.log(user);

    try {
      if (!form.email) {
        console.log('Missing email', "Please enter the trainee's email.");

        return;
      }

      if (!user?.id) {
        console.log('Error: No trainer logged in');

        return;
      }

      const trainerId = user?.id;

      if (!trainerId) {
        Alert.alert('Error', 'Trainer ID not available.');
        return;
      }

      const payload: UserSpec = {
        ...form,
        role: 'TRAINEE',
      };

      console.log('Sending link request:', payload);

      const res = await sendLinkRequest(trainerId, payload);

      console.log('Link request sent:', res);

      Alert.alert(
        'Request Sent',
        'Your link request was delivered. Ask your trainee to check Goach.',
      );
    } catch (err: any) {
      console.log('Error sending link request:', err?.response?.data || err);
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong.');
    }
  };

  console.log('User from context in UserLink:', user);

  return (
    <View className="flex-1 justify-center bg-black px-10 pt-20 gap-9">
      <Text className="sm:text-7xl text-4xl font-bold text-blue-500">Is your client on Goach?</Text>
      <LinkCard />

      <View className="items-left">
        <Text className="items-left sm:text-4xl text-2xl font-semibold text-white">
          Linking data
        </Text>
      </View>

        <View className="gap-8 p-10 max-w-[20rem]">
          <Input
            id="tEmail"
            placeholder="Enter an Email here."
            keyboardType="default"
            autoCapitalize="none"
            value={form.email}
            onChangeText={setField('email')}
            returnKeyType="next"
          />
          <Button className="w-full" onPress={onSubmit}>
            <Text>Link Now!</Text>
          </Button>
        </View>
    </View>
  );
};

export default UserLink;
