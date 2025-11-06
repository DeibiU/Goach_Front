import * as React from 'react';
import { Alert, TextInput, View } from 'react-native';

import { Button } from '@/src/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { Gym, User } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';

interface GymFormProps {
  selectedGym: Gym | undefined;
  userInSession: User | undefined;
}

export function GymForm({ selectedGym, userInSession }: GymFormProps) {
  const { user } = useAuth();
  const { createGym, updateGym } = useGym();

  const [form, setForm] = React.useState<Gym>({
    id: selectedGym?.id || '',
    name: selectedGym?.name || '',
    owner: selectedGym?.owner || userInSession,
    totalPopulation: selectedGym?.totalPopulation || 0,
  });

  const [password, setPassword] = React.useState('');
  const passwordInputRef = React.useRef<TextInput>(null);

  const [loading, setLoading] = React.useState(false);

  async function onGymSubmit() {
    if (!user) {
      Alert.alert('Error', 'Please login');
      return;
    }
    
    const auxGym = {
      ...form,
      owner: {id: user?.id} as User
    };

    setLoading(true);

    if (!selectedGym) {
      try {
        const GymResponse = await createGym(auxGym);
      } catch (error: any) {
        console.error('Error creating a new Gym', error);
        Alert.alert('New Gym Failed', 'Invalid credentials or server error');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const GymResponse = await updateGym(auxGym, selectedGym?.id);
      } catch (error: any) {
        console.error('Error creating a new Gym', error);
        Alert.alert('New Gym Failed', 'Invalid credentials or server error');
      } finally {
        setLoading(false);
      }
    }
  }

  const setField =
    <K extends keyof Gym>(key: K) =>
    (value: Gym[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <View>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">And so goes the gym!</CardTitle>
          <CardDescription className="text-center sm:text-left">
            For now it's just the name.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-1.5">
            <Label htmlFor="name">Gym's Name</Label>
            <Input
              id="name"
              placeholder="Axio's Gym"
              keyboardType="default"
              value={form.name}
              onChangeText={setField('name')}
              returnKeyType="next"
              submitBehavior="submit"
            />
          </View>
          <Button className="w-full" onPress={onGymSubmit}>
            <Text>{loading ? 'Logging In..' : 'Continue'}</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
