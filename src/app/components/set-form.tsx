import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/src/app/components/ui/card';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { Set, SetExercise } from '../interfaces/types';

interface SetEditorProps {
  set: Set;
  onClose: () => void;
  onSave: (updatedSet: Set) => void;
}

export function SetForm({ set, onClose, onSave }: SetEditorProps) {
  const [localSet, setLocalSet] = useState<Set>(set);

  const handleChange = (key: keyof Set, value: string | number) => {
    setLocalSet((prev) => ({ ...prev, [key]: value }));
  };

  const handleExerciseChange = (id: string, field: keyof SetExercise, value: string | number) => {
    setLocalSet((prev) => ({
      ...prev,
      setExercises: prev.setExercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      ),
    }));
  };

  const saveAndClose = () => {
    onSave(localSet);
  };

  return (
    <View className="flex-1 justify-center items-center bg-black/70 px-4">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-700 p-4">
        <CardHeader>
          <CardTitle className="text-white text-lg">Edit Set {localSet.setNumber}</CardTitle>
        </CardHeader>

        <ScrollView className="max-h-[70vh]">
          <CardContent className="gap-4">
            <Label>Set Number</Label>
            <Input
              keyboardType="numeric"
              value={localSet.setNumber.toString()}
              onChangeText={(v) => handleChange('setNumber', Number(v))}
            />

            <Label>Work Time (s)</Label>
            <Input
              keyboardType="numeric"
              value={localSet.workTime?.toString() || ''}
              onChangeText={(v) => handleChange('workTime', Number(v))}
            />

            <Label>Rest Time (s)</Label>
            <Input
              keyboardType="numeric"
              value={localSet.restTime?.toString() || ''}
              onChangeText={(v) => handleChange('restTime', Number(v))}
            />

            <Label>Target RPE</Label>
            <Input
              keyboardType="numeric"
              value={localSet.targetRPE?.toString() || ''}
              onChangeText={(v) => handleChange('targetRPE', Number(v))}
            />

            <Label>Target RIR</Label>
            <Input
              keyboardType="numeric"
              value={localSet.targetRIR?.toString() || ''}
              onChangeText={(v) => handleChange('targetRIR', Number(v))}
            />

            <Label>Target PRM</Label>
            <Input
              keyboardType="numeric"
              value={localSet.targetPRM?.toString() || ''}
              onChangeText={(v) => handleChange('targetPRM', parseFloat(v))}
            />

            {/* Exercises */}
            <Text className="text-white text-lg font-semibold mt-4">Exercises</Text>
            {localSet.setExercises.map((ex) => (
              <View key={ex.id} className="border border-neutral-700 p-2 rounded-lg mt-2">
                <Text className="text-gray-200 mb-1">{ex.exercise?.[0]?.name}</Text>
                <Label>Min Reps</Label>
                <Input
                  keyboardType="numeric"
                  value={ex.minReps?.toString() || ''}
                  onChangeText={(v) => handleExerciseChange(ex.id, 'minReps', Number(v))}
                />
                <Label>Max Reps</Label>
                <Input
                  keyboardType="numeric"
                  value={ex.maxReps?.toString() || ''}
                  onChangeText={(v) => handleExerciseChange(ex.id, 'maxReps', Number(v))}
                />
              </View>
            ))}
          </CardContent>
        </ScrollView>

        <View className="flex-row justify-between mt-4">
          <Button onPress={onClose} className="bg-neutral-700">
            <Text>Cancel</Text>
          </Button>
          <Button onPress={saveAndClose} className="bg-white">
            <Text className="text-black">Save</Text>
          </Button>
        </View>
      </Card>
    </View>
  );
}
