import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card } from '@/src/app/components/ui/card';
import { Separator } from './ui/separator';
import { Exercise, MuscleGroupEnum } from '../interfaces/types';
import { useExercise } from '../services/exercise-service';
import { Picker } from '@react-native-picker/picker';

type Props = {
  exercise: Exercise | any;
  onUpdated?: () => void;
  onDeleted?: () => void;
};

export function ExerciseInfo({ exercise, onUpdated, onDeleted }: Props) {
  const { updateExercise, deleteExercise } = useExercise();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Exercise>(exercise);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof Exercise, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateExercise(form.id, form);
      setIsEditing(false);
      onUpdated?.();
    } catch (error) {
      console.error('Error updating exercise:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteExercise(exercise.id);
      onDeleted?.();
    } catch (error) {
      console.error('Error deleting exercise:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="items-center justify-center border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 p-4 w-full sm:w-[500px]">
        {isEditing ? (
          <>
            <TextInput
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Exercise name"
              placeholderTextColor="#ccc"
              className="w-full text-lg text-white border border-gray-500 rounded-lg p-2 mb-2"
            />
            <View className="border border-white-500 rounded-lg mb-2 overflow-hidden">
              <Picker
                selectedValue={form.muscleGroup}
                dropdownIconColor={'white'}
                style={{ color: 'white', backgroundColor: '#000' }}
                itemStyle={{ color: 'white', backgroundColor: '#000' }}
                onValueChange={(value) => handleChange('muscleGroup', value)}
              >
                <Picker.Item label="Select a muscle group" value={''} />
                {Object.values(MuscleGroupEnum).map((group) => (
                  <Picker.Item key={group} label={group.replaceAll('_', ' ')} value={group} />
                ))}
              </Picker>
            </View>
            <TextInput
              value={form.description}
              onChangeText={(text) => handleChange('description', text)}
              placeholder="Description"
              placeholderTextColor="#ccc"
              multiline
              className="w-full text-white border border-gray-500 rounded-lg p-2 mb-4 h-24"
            />

            <View className="flex-row justify-around w-full">
              <TouchableOpacity
                onPress={handleSave}
                disabled={loading}
                className="bg-green-600 px-4 py-2 rounded-lg w-[45%] items-center"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-semibold">Save</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="bg-gray-500 px-4 py-2 rounded-lg w-[45%] items-center"
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View className="flex-row items-center justify-between w-full mb-2">
              <View className="pl-2 flex-1">
                <Text className="text-2xl text-white font-semibold">{exercise.name}</Text>
                <Text className="text-xl text-gray-300">
                  {exercise.muscleGroup.replaceAll('_', ' ')}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-blue-400 text-base font-semibold">Edit</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center w-full">
              <Separator className="flex-1" />
            </View>

            <Text className="text-lg text-white mt-2">{exercise.description}</Text>

            <TouchableOpacity
              onPress={handleDelete}
              disabled={loading}
              className="mt-4 bg-red-600 px-4 py-2 rounded-lg items-center w-[50%]"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold">Delete</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Card>
    </View>
  );
}
