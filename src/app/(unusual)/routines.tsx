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
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Routine, Set, SetExercise } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import { useSet } from '../services/set-service';

interface RoutineModalProps {
  onClose: () => void;
  selectedRoutine: Routine | any;
}

const Routines = ({ onClose }: RoutineModalProps) => {
  const { routineId } = useLocalSearchParams();
  const { createRoutine, updateRoutine, getRoutine } = useRoutine();
  const [selectedRoutine, setSelectedRoutine] = useState<Routine>();
  const { getAllSetsInRoutine } = useSet();
  const { user } = useAuth();
  const [routineSets, setRoutineSets] = useState<Array<Set>>([]);
  const [form, setForm] = useState<Routine>({
    name: '',
    trainer:  null,
    description: '',
    level:  '',
    category: '',
    totalTime:  '',
    totalRpe:  0,
    totalRIR:  0,
    totalPRM: 0,
  });

  const handleChange = (key: keyof Routine, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if(routineId){
      useEffect(() => {
    const loadRoutine = async () => {
      const routine: Routine = await getRoutine(routineId);
      setSelectedRoutine(routine);
      setForm(routine);
    };

    loadRoutine();

    const loadSet = async () => {
        const sets: Array<Set> = await getAllSetsInRoutine(routineId);
        setRoutineSets(sets);
      };

      loadSet();
  }, []);

  }

  async function onRoutineSubmit() {
    const auxRoutine = { ...form };

    if (!auxRoutine.trainer) return;

    try {
      if (!selectedRoutine) {
        const response = await createRoutine(auxRoutine);
        console.log('Routine created successfully:', response);
        onClose();
      } else {
        const response = await updateRoutine(auxRoutine.trainer?.id, auxRoutine);
        console.log('Routine updated successfully:', response);
      }
    } catch (err) {
      console.error('Routine submit failed:', err);
    }
  }

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="ml-4 mt-2 border-l border-border pl-3">
      <Text className="text-white text-base font-semibold">
        {item.exercise?.[0]?.name || 'Unnamed Exercise'}
      </Text>
      <Text className="text-gray-400 text-sm">
        {item.exercise?.[0]?.muscle_group || 'Unknown muscle group'}
      </Text>
      <Text className="text-gray-500 text-xs italic">
        Reps: {item.minReps}–{item.maxReps} | Weight: {item.minWeight}–{item.maxWeight} kg
      </Text>
    </View>
  );

  const renderSet = ({ item }: { item: Set }) => (
    <View className="bg-neutral-900 rounded-xl p-4 mt-4 border border-neutral-800">
      <Text className="text-white text-lg font-bold">Set {item.setNumber}</Text>
      <Text className="text-gray-400 text-sm">
        Work: {item.workTime}s | Rest: {item.restTime}s
      </Text>
      <Text className="text-gray-500 text-xs">
        Target RPE: {item.targetRPE} | RIR: {item.targetRIR} | PRM: {item.targetPRM}
      </Text>

      {/* Exercises */}
      <FlatList
        data={item.setExercises}
        keyExtractor={(exercise) => exercise.id}
        renderItem={renderExercise}
      />
    </View>
  );

  return (
    <ScrollView className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left text-white">New Routine</CardTitle>
          <CardDescription className="text-center sm:text-left text-gray-300">
            Enter the information necessary to save your routine
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Form Inputs */}
            {[
              { id: 'name', label: 'Name', placeholder: 'Enter a name for your routine' },
              { id: 'description', label: 'Description', placeholder: 'Describe your routine' },
              { id: 'level', label: 'Level', placeholder: 'Beginner, Intermediate, Advanced...' },
              {
                id: 'category',
                label: 'Category',
                placeholder: 'E.g. Strength, Endurance, Mobility...',
              },
              { id: 'totalTime', label: 'Total Time (min)', placeholder: 'Enter total time' },
            ].map((field) => (
              <View key={field.id} className="gap-1.5">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={(form as any)[field.id]}
                  onChangeText={(text) => handleChange((form as any)[field.id], text)}
                />
              </View>
            ))}
            {[
              { id: 'totalRpe', label: 'Total RPE' },
              { id: 'totalRIR', label: 'Total RIR' },
              { id: 'totalPRM', label: 'Total PRM' },
            ].map((field) => (
              <View key={field.id} className="gap-1.5">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  keyboardType="numeric"
                  value={(form as any)[field.id]}
                  onChangeText={(text) => setForm({ ...form, [field.id]: Number(text) || 0 })}
                />
              </View>
            ))}

            <Button className="w-full mt-4" onPress={onRoutineSubmit}>
              <Text>{!selectedRoutine ? 'Save Routine' : 'Update Routine'}</Text>
            </Button>
            {routineSets && routineSets.length > 0 && (
              <View className="mt-6">
                <Text className="text-white text-lg font-bold mb-2">Routine Sets</Text>
                <FlatList
                  data={routineSets}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSet}
                />
              </View>
            )}

            <Button className="w-full mt-4">
              <Text>Add a new set</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

export default Routines;
