import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../services/auth-service';

const profile = () => {
  const { userRole } = useAuth();
  return (
    <View className="flex-1 justify-center gap-10 bg-black px-10">
      <Text className="pl-[20%] text-4xl font-bold text-blue-500 sm:text-7xl">Settings</Text>
      <View className="items-center">
        <Card className="w-4/5 max-w-[1500px] gap-0 rounded-none border-border/0 py-0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
          <Link
            href="account"
            className="px-10 py-4 text-lg text-white hover:bg-blue-500 sm:text-2xl"
          >
            Account
          </Link>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          {userRole === 'TRAINER' && (
            <Link
              href="userLink"
              className="px-10 py-4 text-lg text-white hover:bg-blue-500 sm:text-2xl"
            >
              Link a Trainee
            </Link>
          )}
          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          <Link href="gyms" className="px-10 py-4 text-lg text-white hover:bg-blue-500 sm:text-2xl">
            Own a Gym
          </Link>

          {userRole === 'TRAINER' && (
            <>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
              <Link
                href="exercises"
                className="px-10 py-4 text-lg text-white hover:bg-blue-500 sm:text-2xl"
              >
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
