import * as React from 'react';
import { Alert, View } from 'react-native';
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
import { useStats } from '../services/stats-service';
import { WorkoutSession } from '../interfaces/types';
import { Toast } from 'toastify-react-native';
import { router } from 'expo-router';

interface StatsFormProps {
  selectedStats?: any;
  workout: WorkoutSession;
  duration: string;
  onReload?: () => void;
}

export function StatsForm({ selectedStats, workout, onReload, duration }: StatsFormProps) {
  const { createStats, updateStats } = useStats();
  const [form, setForm] = React.useState({
    calories: selectedStats?.calories?.toString() || '',
    actualRPE: selectedStats?.actualRPE?.toString() || '',
    actualRIR: selectedStats?.actualRIR?.toString() || '',
    actualPRM: selectedStats?.actualPRM?.toString() || '',
  });

  const [loading, setLoading] = React.useState(false);

  const setField =
    <K extends keyof typeof form>(key: K) =>
    (value: (typeof form)[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit() {
    if (!form.calories || !form.actualRPE) {
      Alert.alert('Error', 'Calories and RPE are required');
      return;
    }

    const payload = {
      workout: workout,
      calories: Number(form.calories),
      actualRPE: Number(form.actualRPE),
      actualRIR: Number(form.actualRIR),
      actualPRM: Number(form.actualPRM),
      duration: duration,
      completedAt: workout.finishedAt,
    };

    setLoading(true);

    try {
      if (!selectedStats) {
        await createStats(payload);
      } else {
        await updateStats(selectedStats.id, payload);
      }
      Toast.success('Success! Stats was saved.');
      onReload?.();
      router.replace('/login'); 
    } catch (error: any) {
      console.error('Error saving stats:', error);
      Toast.error('Error! Failed to save the stats.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-center text-7xl text-blue-500 sm:text-left">
            {selectedStats ? 'Edit Statistics' : 'New Statistics'}
          </CardTitle>
          <CardDescription className="text-center text-gray-300 sm:text-left">
            Add session performance measurements
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          {/* READ-ONLY FIELDS */}
          <View className="gap-1.5">
            <Label className="text-white">Duration</Label>
            <Text className="text-white">{duration}</Text>
          </View>

          <View className="gap-1.5">
            <Label className="text-white">Completed At</Label>
            <Text className="text-white">{new Date(workout.finishedAt).toLocaleString()}</Text>
          </View>

          {/* CALORIES */}
          <View className="gap-1.5">
            <Label htmlFor="calories" className="text-white">
              Calories Burned
            </Label>
            <Input
              id="calories"
              placeholder="200"
              keyboardType="numeric"
              value={form.calories}
              onChangeText={setField('calories')}
            />
          </View>

          {/* RPE */}
          <View className="gap-1.5">
            <Label htmlFor="actualRPE" className="text-white">
              RPE (1–10)
            </Label>
            <Input
              id="actualRPE"
              placeholder="8"
              keyboardType="numeric"
              maxLength={2}
              value={form.actualRPE}
              onChangeText={setField('actualRPE')}
            />
          </View>

          {/* RIR */}
          <View className="gap-1.5">
            <Label htmlFor="actualRIR" className="text-white">
              RIR
            </Label>
            <Input
              id="actualRIR"
              placeholder="2"
              keyboardType="numeric"
              value={form.actualRIR}
              onChangeText={setField('actualRIR')}
            />
          </View>

          {/* PRM */}
          <View className="gap-1.5">
            <Label htmlFor="actualPRM" className="text-white">
              PRM
            </Label>
            <Input
              id="actualPRM"
              placeholder="120"
              keyboardType="numeric"
              value={form.actualPRM}
              onChangeText={setField('actualPRM')}
            />
          </View>

          <Button className="w-full mt-4" onPress={onSubmit}>
            <Text>{loading ? 'Saving...' : selectedStats ? 'Update Stats' : 'Save Stats'}</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
