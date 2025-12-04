import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import { Input } from '@/src/app/components/ui/input';
import { Label } from '@/src/app/components/ui/label';
import { Text } from '@/src/app/components/ui/text';
import { Routine } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';
import { useAuth } from '../services/auth-service';
import React from 'react';

interface RoutineModalProps {
  onClose?: () => void;
  isEditing: boolean;
  selectedRoutine?: Routine | null;
}

export function RoutineForm({ onClose, isEditing, selectedRoutine }: RoutineModalProps) {
  const { user } = useAuth();
  const { createRoutine, updateRoutine } = useRoutine();
  const emptyRoutine: Routine = {
    id: '',
    name: '',
    description: '',
    level: '',
    category: '',
    totalTime: '',
    totalRpe: 0,
    totalRIR: 0,
    totalPRM: 0,
    trainer: user,
  };

  const [form, setForm] = useState<Routine>(selectedRoutine ?? emptyRoutine);
  useEffect(() => {
    setForm(selectedRoutine ?? emptyRoutine);
  }, [selectedRoutine]);

  const handleChange = (key: keyof Routine, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function onRoutineSubmit() {
    const auxRoutine = { ...form };
    if (!auxRoutine.trainer) {
      console.warn('Trainer is missing, cannot submit');
      return;
    }

    try {
      if (!isEditing) {
        await createRoutine(auxRoutine);
        console.log('✅ Routine created');
      } else {
        await updateRoutine(auxRoutine.trainer?.id, auxRoutine);
        console.log('✅ Routine updated');
      }

      if (onClose) onClose();
    } catch (err) {
      console.error('Routine submit failed:', err);
    }
  }

  return (
    <ScrollView className="gap-6 min-w-[49%]">
      {[
        { id: 'name', label: 'Name', placeholder: 'Enter a name for your routine' },
        { id: 'description', label: 'Description', placeholder: 'Describe your routine' },
        { id: 'level', label: 'Level', placeholder: 'Beginner, Intermediate, Advanced...' },
        { id: 'category', label: 'Category', placeholder: 'E.g. Strength, Endurance...' },
        { id: 'totalTime', label: 'Total Time (min)', placeholder: 'Enter total time' },
      ].map((field) => (
        <View key={field.id} className="gap-1.5">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            placeholder={field.placeholder}
            value={(form as any)[field.id] ?? ''}
            onChangeText={(text) => handleChange(field.id as keyof Routine, text)}
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
            value={String((form as any)[field.id] ?? 0)}
            onChangeText={(text) => handleChange(field.id as keyof Routine, Number(text) || 0)}
          />
        </View>
      ))}

      <Button className="w-[80%] ml-[10%] mt-4" onPress={onRoutineSubmit}>
        <Text>{!isEditing ? 'Save Routine' : 'Update Routine'}</Text>
      </Button>
    </ScrollView>
  );
}
