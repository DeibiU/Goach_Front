import * as React from 'react';
import { Alert, View } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { Gym, GTRelation, User } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';
import { PlatformDatePicker } from './date-time-picker';
import { Toast } from 'toastify-react-native';

interface GymTrainerFormProps {
  selectedGym: Gym | undefined;
}

export function GymTrainerForm({ selectedGym }: GymTrainerFormProps) {
  const { user } = useAuth();
  const { createTrainerRelation } = useGym();

  const [form, setForm] = React.useState<GTRelation>({
    gym: selectedGym,
    trainer: undefined,
    associateStatus: '',
    gymPaymentDate: new Date(),
    gymPaymentStatus: '',
    gymPaymentPrice: 0,
  });

  const [trainerEmail, setTrainerEmail] = React.useState('');

  const setField =
    <K extends keyof GTRelation>(key: K) =>
    (value: GTRelation[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!trainerEmail.trim()) {
      Toast.warn('Missing Info! Please enter the trainer email');
      return;
    }

    try {
      const body = {
        ...form,
        trainer: { email: trainerEmail } as User,
        gymPaymentStatus: form.gymPaymentStatus?.toUpperCase(),
        associateStatus: form.associateStatus?.toUpperCase(),
      };

      await createTrainerRelation(selectedGym?.id, body);
      Toast.success('Success! The trainer got linked.');
    } catch (err) {
      console.error('Error linking trainer:', err);
      Toast.error('Error! Failed to link the trainer.');
    }
  };

  return (
    <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left text-blue-500">
          Add a Trainer
        </CardTitle>
      </CardHeader>

      <CardContent className="gap-6">
        <View className="gap-1.5">
          <Label>Email</Label>
          <Input
            placeholder="trainer@email.com"
            keyboardType="email-address"
            value={trainerEmail}
            onChangeText={setTrainerEmail}
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
          <Label>Payment Status</Label>
          <Input
            placeholder="Paid / Pending"
            value={form.gymPaymentStatus}
            onChangeText={setField('gymPaymentStatus')}
          />
        </View>

        <View className="gap-1.5">
          <Label>Payment Price</Label>
          <Input
            placeholder="100"
            keyboardType="numeric"
            value={form.gymPaymentPrice?.toString()}
            onChangeText={(val) => setField('gymPaymentPrice')(Number(val))}
          />
        </View>

        <PlatformDatePicker
          label="Payment Date"
          value={form.gymPaymentDate}
          onChange={(date: Date) => setField('gymPaymentDate')(date)}
        />

        <Button className="w-full mt-4" onPress={handleSubmit}>
          <Text className="font-semibold">Add Trainer</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
