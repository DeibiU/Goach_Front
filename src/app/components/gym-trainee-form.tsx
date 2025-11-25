import * as React from 'react';
import { Alert, View } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { Gym, GURelation, User } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';
import { PlatformDatePicker } from './date-time-picker';

interface GymTraineeFormProps {
  selectedGym: Gym | undefined;
}

export function GymTraineeForm({ selectedGym }: GymTraineeFormProps) {
  const { user } = useAuth();
  const { createTraineeRelation } = useGym();

  const [form, setForm] = React.useState<GURelation>({
    gym: selectedGym,
    trainee: undefined,
    associateStatus: '',
    membershipStatus: '',
    membershipPrice: 0,
    membershipDate: new Date(),
  });

  const [traineeEmail, setTraineeEmail] = React.useState('');

  const setField =
    <K extends keyof GURelation>(key: K) =>
    (value: GURelation[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!traineeEmail.trim()) {
      Alert.alert('Missing Info', 'Please enter the trainee email');
      return;
    }

    try {
      const body = {
        ...form,
        trainee: { email: traineeEmail } as User,
        membershipStatus: form.membershipStatus?.toUpperCase(),
        associateStatus: form.associateStatus?.toUpperCase(),
      };

      console.log(body);

      await createTraineeRelation(selectedGym?.id, body);
      Alert.alert('Success', 'Trainee linked to gym successfully!');
    } catch (err) {
      console.error('Error linking trainee:', err);

      Alert.alert('Error', 'Failed to link trainee');
    }
  };

  return (
    <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left text-purple-500">
          Add a Trainee
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-6">
        <View className="gap-1.5">
          <Label>Email</Label>
          <Input
            placeholder="trainee@email.com"
            keyboardType="email-address"
            value={traineeEmail}
            onChangeText={setTraineeEmail}
          />
        </View>

        <View className="gap-1.5">
          <Label>Association Status</Label>
          <Input
            placeholder="Active / Pending"
            value={form.associateStatus}
            onChangeText={setField('associateStatus')}
          />
        </View>

        <View className="gap-1.5">
          <Label>Membership Status</Label>
          <Input
            placeholder="Pending / Utd"
            value={form.membershipStatus}
            onChangeText={setField('membershipStatus')}
          />
        </View>

        <View className="gap-1.5">
          <Label>Membership Price</Label>
          <Input
            placeholder="200"
            keyboardType="numeric"
            value={form.membershipPrice?.toString()}
            onChangeText={(val) => setField('membershipPrice')(Number(val))}
          />
        </View>

        <PlatformDatePicker
          label="Membership Due Date"
          value={form.membershipDate}
          onChange={(date: Date) => setField('membershipDate')(date)}
        />

        <Button className="w-full mt-4" onPress={handleSubmit}>
          <Text className="font-semibold">Add Trainee</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
