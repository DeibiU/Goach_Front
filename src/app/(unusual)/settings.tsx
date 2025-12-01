import { Link, router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../services/auth-service';
import { PHButton } from '../components/PHButton';

const profile = () => {
  const { userRole } = useAuth();
  return (
    <View className="flex-1 gap-10 justify-center bg-black px-10">
      <Text className="sm:text-7xl text-4xl font-bold text-blue-500 pl-[20%]">Settings</Text>
      <View className="items-center">
        <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 w-[80%] py-0 max-w-[1500px] gap-0 rounded-none">
          <PHButton
            label="Account"
            phEvent="click_settings_account"
            className="px-10 py-4"
            textClassName="sm:text-2xl text-lg text-white"
            onPress={() => router.push('account')}
          />
          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          <PHButton
            label="Link a Trainer"
            phEvent="click_settings_link_trainer"
            className="px-10 py-4"
            textClassName="sm:text-2xl text-lg text-white"
            onPress={() => router.push('userLink')}
          />
          <View className="flex-row items-center">
            <Separator className="flex-1" />
          </View>
          <PHButton
            label="Own a Gym"
            phEvent="click_settings_own_gym"
            className="px-10 py-4"
            textClassName="sm:text-2xl text-lg text-white"
            onPress={() => router.push('gyms')}
          />
          {userRole === 'TRAINER' && (
            <>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
              <PHButton
                label="Manage Exercises"
                phEvent="click_settings_manage_exercises"
                className="px-10 py-4"
                textClassName="sm:text-2xl text-lg text-white"
                onPress={() => router.push('exercises')}
              />
            </>
          )}
        </Card>
      </View>
    </View>
  );
};

export default profile;
