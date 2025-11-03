import * as React from 'react';
import { View } from 'react-native';

import { Button } from '@/src/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { UserSpec } from '../interfaces/types';

export function BiometricsForm() {

    const [form, setForm] = React.useState<UserSpec>({
      name: '',
      email: '',
      password: '',
      role: '',
      active: true,
      height: '0',
      weight: '0',
    });

    const setField =
    <K extends keyof UserSpec>(key: K) =>
    (value: UserSpec[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));


  return (
    <View>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Let's get it right then!</CardTitle>
          <CardDescription className="text-center sm:text-left">
            You can add your biometric information here.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-1.5">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                placeholder="0"
                keyboardType="decimal-pad"
                value={form.height}
                onChangeText={setField('height')}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                placeholder="0"
                keyboardType="decimal-pad"
                value={form.weight}
                onChangeText={setField('weight')}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            {/* <Button className="w-full" onPress={onSubmit}>
              <Text>{loading ? 'Logging In..' : 'Continue'}</Text>
            </Button> */}
        </CardContent>
      </Card>
    </View>
  );
}
