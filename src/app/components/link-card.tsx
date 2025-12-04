import * as React from 'react';
import { View } from 'react-native';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/app/components/ui/card';
import { Text } from '@/src/app/components/ui/text';
import { useAuth } from '../services/auth-service';
import { isWeb } from '../utils/platform-flags';

export function LinkCard() {
  const { user } = useAuth();

  return (
    <View className={isWeb ? "rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]" : "rounded-2xl"}>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-center sm:text-4xl text-2xl sm:text-left">Your data</CardTitle>
        </CardHeader>
        <CardContent className="flex-row">
          <View className="gap-1.5"></View>
          <View className="gap-1.5">
            <Text className="text-2xl">{user?.name}</Text>
            <Text className="sm:text-2xl text-xs text-wrap">{user?.id}</Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
