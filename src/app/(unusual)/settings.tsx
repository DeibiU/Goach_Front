import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { User } from '../interfaces/types';

const profile = () => {
  const user = React.useState<User>();
  return (
    <View className="flex-1 gap-10 justify-center bg-black px-10">
      <Text className="text-7xl font-bold text-blue-500">Settings</Text>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 py-0 gap-0 rounded-none">
        <Link href="account" className="text-2xl text-white hover:bg-blue-500 px-10 py-4">
          Account
        </Link>{' '}
        <View className="flex-row items-center">
          <Separator className="flex-1" />
        </View>
        <Link href="payments" className="text-2xl text-white hover:bg-blue-500 px-10 py-4">
          Payments
        </Link>{' '}
        <View className="flex-row items-center">
          <Separator className="flex-1" />
        </View>
        <Link href="userLink" className="text-2xl text-white hover:bg-blue-500 px-10 py-4">
          Link a Trainer
        </Link>{' '}
        <View className="flex-row items-center">
          <Separator className="flex-1" />
        </View>
        <Link href="gyms" className="text-2xl text-white hover:bg-blue-500 px-10 py-4">
          Own a Gym
        </Link>{' '}
      </Card>
    </View>
  );
};

export default profile;
