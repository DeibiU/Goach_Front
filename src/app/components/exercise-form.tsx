import * as React from 'react';
import { Alert, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
import { Exercise, MuscleGroupEnum } from '../interfaces/types'; // ✅ import your enum
import { useExercise } from '../services/exercise-service';
import { Toast } from 'toastify-react-native';
import { isWeb } from '../utils/platform-flags';

interface ExerciseFormProps {
  selectedExercise?: Exercise;
  onReload?: () => void;
}

export function ExerciseForm({ selectedExercise, onReload }: ExerciseFormProps) {
  const { createExercise, updateExercise } = useExercise();

  const [form, setForm] = React.useState<Exercise>({
    id: selectedExercise?.id || '',
    name: selectedExercise?.name || '',
    muscleGroup: selectedExercise?.muscleGroup || '',
    description: selectedExercise?.description || '',
  });

  const [loading, setLoading] = React.useState(false);

  const setField =
    <K extends keyof Exercise>(key: K) =>
    (value: Exercise[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit() {
    if (!form.name || !form.muscleGroup) {
      Toast.warn('Please fill out all required fields!');
      return;
    }

    setLoading(true);

    try {
      if (!selectedExercise) {
        await createExercise(form);
      } else {
        await updateExercise(selectedExercise.id, form);
      }
      Toast.success('Success! Exercise was saved.');
      onReload?.();
    } catch (error: any) {
      console.error('Error saving exercise:', error);
      Toast.error('Error! Failed to save exercise.');
    }
  }

  return (
    <View className="bg-black/70 items-center py-[15%]">
      <View className={isWeb ? "w-[60%] rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]" : "w-[60%] rounded-2xl"}>
      <Card className="border-border/0sm:border-border bg-black">
        <CardHeader>
          <CardTitle className="text-center text-xl text-white sm:text-left">
            {selectedExercise ? 'Edit Exercise' : 'New Exercise'}
          </CardTitle>
          <CardDescription className="text-center text-gray-300 sm:text-left">
            Define the details of your exercise
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          {/* Exercise Name */}
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

          {/* Muscle Group Picker */}
          <View className="gap-1.5">
            <Label htmlFor="muscle_group" className="text-white">
              Muscle Group
            </Label>
            <View className="border border-gray-500 rounded-lg overflow-hidden">
              <Picker
                selectedValue={form.muscleGroup}
                dropdownIconColor="white"
                style={{
                  color: 'white',
                  backgroundColor: '#000',
                }}
                itemStyle={{
                  backgroundColor: '#000',
                  color: 'white',
                  fontSize: 16,
                }}
                mode="dropdown"
                onValueChange={(value) => setField('muscleGroup')(value as Exercise['muscleGroup'])}
              >
                <Picker.Item label="Select a muscle group" value="" color="#aaa" />
                {Object.values(MuscleGroupEnum).map((group) => (
                  <Picker.Item
                    key={group}
                    label={group.replaceAll('_', ' ')}
                    value={group}
                    color="#fff"
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Description */}
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
      </Card></View>
    </View>
  );
}
