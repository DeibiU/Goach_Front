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
import { Exercise } from '../interfaces/types';
import { useExercise } from '../services/exercise-service';

interface ExerciseFormProps {
  selectedExercise?: Exercise;
}

export function ExerciseForm({ selectedExercise }: ExerciseFormProps) {
  const { createExercise, updateExercise } = useExercise();

  const [form, setForm] = React.useState<Exercise>({
    id: selectedExercise?.id || '',
    name: selectedExercise?.name || '',
    muscle_group: selectedExercise?.muscle_group || '',
    description: selectedExercise?.description || '',
  });

  const [loading, setLoading] = React.useState(false);

  const setField =
    <K extends keyof Exercise>(key: K) =>
    (value: Exercise[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit() {
    if (!form.name || !form.muscle_group) {
      Alert.alert('Error', 'Please fill out all required fields');
      return;
    }

    setLoading(true);

    try {
      if (!selectedExercise) {
        await createExercise(form);
        Alert.alert('Success', 'Exercise created successfully!');
      } else {
        await updateExercise(selectedExercise.id, form);
        Alert.alert('Updated', 'Exercise updated successfully!');
      }
    } catch (error: any) {
      console.error('Error saving exercise:', error);
      Alert.alert('Error', 'Failed to save exercise');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 bg-black/50">
        <CardHeader>
          <CardTitle className="text-center text-xl text-white sm:text-left">
            {selectedExercise ? 'Edit Exercise' : 'New Exercise'}
          </CardTitle>
          <CardDescription className="text-center text-gray-300 sm:text-left">
            Define the details of your exercise
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-1.5">
            <Label htmlFor="name" className="text-white">
              Exercise Name
            </Label>
            <Input
              id="name"
              placeholder="Bench Press"
              keyboardType="default"
              value={form.name}
              onChangeText={setField('name')}
            />
          </View>

          <View className="gap-1.5">
            <Label htmlFor="muscle_group" className="text-white">
              Muscle Group
            </Label>
            <Input
              id="muscle_group"
              placeholder="Chest"
              keyboardType="default"
              value={form.muscle_group}
              onChangeText={setField('muscle_group')}
            />
          </View>

          <View className="gap-1.5">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Input
              id="description"
              placeholder="A compound exercise focusing on pectorals."
              keyboardType="default"
              value={form.description}
              onChangeText={setField('description')}
            />
          </View>

          <Button className="w-full mt-4" onPress={onSubmit}>
            <Text>
              {loading ? 'Saving...' : selectedExercise ? 'Update Exercise' : 'Create Exercise'}
            </Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
