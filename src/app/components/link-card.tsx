import * as React from 'react';
import { View } from 'react-native';

import { Card, CardContent, CardHeader, CardTitle } from '@/src/app/components/ui/card';
import { Text } from '@/src/app/components/ui/text';
import { useAuth } from '../services/auth-service';

export function LinkCard() {
  const { user } = useAuth();

  return (
    <View>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-4xl sm:text-left">Your data</CardTitle>
        </CardHeader>
        <CardContent className="flex-row">
          <View className="gap-1.5"></View>
          <View className="gap-1.5">
            <Text className="text-2xl">{user?.name}Duker</Text>
            <Text className="text-2xl">{user?.id}ADyhDFHGjmghn</Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
