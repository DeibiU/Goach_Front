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
import * as React from 'react';
import { View } from 'react-native';
import { Routine } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';

interface RoutineModalProps {
  onClose: () => void;
  selectedRoutine: Routine;
}

export function RoutineForm({ onClose, selectedRoutine }: RoutineModalProps) {
  const { createRoutine, updateRoutine } = useRoutine();
  const { user } = useAuth();
  const [form, setForm] = React.useState<Routine>({
    name: selectedRoutine.name || '',
    trainer: selectedRoutine.trainer || user,
    description: selectedRoutine.description || '',
    level: selectedRoutine.level || '',
    category: selectedRoutine.category || '',
    totalTime: selectedRoutine.totalTime || '',
    totalRpe: selectedRoutine.totalRpe || 0,
    totalRIR: selectedRoutine.totalRIR || 0,
    totalPRM: selectedRoutine.totalPRM || 0,
  });

  async function onRoutineSubmit() {
    const auxRoutine = {
      ...form,
    };

    if (auxRoutine.trainer == null) {
      return;
    }

    if (!selectedRoutine) {
      try {
        const response = await createRoutine(auxRoutine);
        console.log('Routine created successfully:', response);
        onClose();
      } catch (err) {
        console.error('Routine creation failed:', err);
      }
    } else {
      try {
        const response = await updateRoutine(auxRoutine.trainer?.id, auxRoutine);
        console.log('Routine changed successfully:', response);
      } catch (err) {
        console.error('Routine change failed:', err);
      }
    }
  }

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">New Routine</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the information necessary to save your routine
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Name */}
            <View className="gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter a name for your routine"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Describe your routine"
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
                multiline
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                placeholder="Beginner, Intermediate, Advanced..."
                value={form.level}
                onChangeText={(text) => setForm({ ...form, level: text })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="E.g. Strength, Endurance, Mobility..."
                value={form.category}
                onChangeText={(text) => setForm({ ...form, category: text })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="totalTime">Total Time (min)</Label>
              <Input
                id="totalTime"
                keyboardType="numeric"
                placeholder="Enter total time"
                value={form.totalTime}
                onChangeText={(text) => setForm({ ...form, totalTime: text })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="totalRpe">Total RPE</Label>
              <Input
                id="totalRpe"
                keyboardType="numeric"
                value={form.totalRpe.toString()}
                onChangeText={(text) => setForm({ ...form, totalRpe: Number(text) || 0 })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="totalRIR">Total RIR</Label>
              <Input
                id="totalRIR"
                keyboardType="numeric"
                value={form.totalRIR.toString()}
                onChangeText={(text) => setForm({ ...form, totalRIR: Number(text) || 0 })}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="totalPRM">Total PRM</Label>
              <Input
                id="totalPRM"
                keyboardType="numeric"
                value={form.totalPRM.toString()}
                onChangeText={(text) => setForm({ ...form, totalPRM: Number(text) || 0 })}
              />
            </View>

            <Button className="w-full mt-4" onPress={onRoutineSubmit}>
              {!selectedRoutine ? <Text>Save Routine</Text> : <Text>Update Routine</Text>}
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
