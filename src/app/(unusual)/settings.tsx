import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../services/auth-service';

const profile = () => {
  const { userRole } = useAuth();
  return (
    <View className="flex-1 gap-10 justify-center bg-black px-10">
      <Text className="sm:text-7xl text-4xl font-bold text-blue-500 pl-[20%]">Settings</Text>
      <View className="items-center">
        <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 w-[80%] py-0 max-w-[1500px] gap-0 rounded-none">
          <Link href="account" className="sm:text-2xl text-lg text-white hover:bg-blue-500 px-10 py-4">
            Account
          </Link>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          <Link href="userLink" className="sm:text-2xl text-lg text-white hover:bg-blue-500 px-10 py-4">
            Link a Trainer
          </Link>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          <Link href="gyms" className="sm:text-2xl text-lg text-white hover:bg-blue-500 px-10 py-4">
            Own a Gym
          </Link>

          {userRole === 'TRAINER' && (
            <>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
              <Link href="exercises" className="sm:text-2xl text-lg text-white hover:bg-blue-500 px-10 py-4">
                Manage Exercises
              </Link>
            </>
          )}
        </Card>
      </View>
    </View>
  );
};

export default profile;
