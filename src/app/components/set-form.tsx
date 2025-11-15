import React, { FC, useState } from 'react';
import { View, Text, TextInput, Modal, FlatList } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import Bin from '../../assets/bin.svg';
import { Set, SetExercise } from '../interfaces/types';
import { useSet } from '../services/set-service';
import ExercisePicker from './exercise-picker';

interface Props {
  set: Set;
  routineId: string | undefined;
  onClose: () => void;
  onSave: () => void;
}

export const SetForm: FC<Props> = ({ set: initialSet, routineId, onClose, onSave }) => {
  const [setData, setSetData] = useState<Set>(initialSet);

  const [exerciseEditor, setExerciseEditor] = useState<SetExercise | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const { getSetById, addSet, updateSet, addSetExercise, updateSetExercise, deleteSetExercise } =
    useSet();

  // ----------------------------------
  // Save Set
  // ----------------------------------
  const handleSaveSet = async () => {
    try {
      if (setData.id) {
        await updateSet(setData.id, setData);
      } else {
        await addSet(routineId, setData);
      }
      onSave();
    } catch (err) {
      console.error('Failed to save set:', err);
    }
  };

  // ----------------------------------
  // Save Exercise
  // ----------------------------------
  const handleSaveExercise = async () => {
    if (!exerciseEditor) return;

    try {
      if (exerciseEditor.id) {
        await updateSetExercise(initialSet.id, exerciseEditor.id, exerciseEditor);
      } else {
        await addSetExercise(setData.id!, exerciseEditor);
      }

      const updated = await getSetById(setData.id!);
      setSetData(updated);
      setExerciseEditor(null);
    } catch (err) {
      console.error('Error saving exercise:', err);
    }
  };

  // ----------------------------------
  // Delete Exercise
  // ----------------------------------
  const handleDeleteExercise = async (id: string) => {
    try {
      await deleteSetExercise(initialSet.id, id);
      const updated = await getSetById(setData.id!);
      setSetData(updated);
    } catch (err) {
      console.error('Error deleting exercise:', err);
    }
  };

  // ----------------------------------
  // Render each existing SetExercise
  // ----------------------------------
  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 mt-3">
      <Text className="text-white font-semibold">{item.exercise?.name}</Text>
      <Text className="text-gray-400 text-sm">{item.exercise?.muscleGroup}</Text>
      <Text className="text-gray-500 text-xs italic">
        Reps: {item.minReps}–{item.maxReps}
      </Text>

      <View className="flex-row justify-end mt-2">
        <Button variant="ghost" className="mr-2" onPress={() => setExerciseEditor(item)}>
          <Text>Edit</Text>
        </Button>

        <Button variant="ghost" onPress={() => handleDeleteExercise(item.id!)}>
          <Bin className="fill-red-600" />
        </Button>
      </View>
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center bg-black/40">
      <View className="bg-neutral-950 p-6 rounded-2xl w-[90%]">
        <Text className="text-white text-xl font-bold mb-4">
          {setData.id ? 'Edit Set' : 'New Set'}
        </Text>

        <Text className="text-white">Work Time (sec)</Text>
        <TextInput
          value={setData.workTime}
          onChangeText={(v) => setSetData({ ...setData, workTime: v })}
          className="bg-neutral-800 text-white p-2 rounded mb-3"
        />

        <Text className="text-white">Rest Time (sec)</Text>
        <TextInput
          value={setData.restTime}
          onChangeText={(v) => setSetData({ ...setData, restTime: v })}
          className="bg-neutral-800 text-white p-2 rounded mb-3"
        />

        <Text className="text-white text-lg mt-4 mb-1">Exercises in this Set</Text>

        <FlatList
          data={setData.setExercises}
          keyExtractor={(e, i) => e.id ?? i.toString()}
          renderItem={renderExercise}
        />

        {/* ---------------- Add Exercise → Picker ---------------- */}
        <Button className="mt-3" onPress={() => setPickerOpen(true)}>
          <Text>Add Exercise</Text>
        </Button>

        <View className="flex-row justify-between mt-6">
          <Button variant="secondary" onPress={onClose}>
            <Text>Cancel</Text>
          </Button>

          <Button onPress={handleSaveSet}>
            <Text>Save Set</Text>
          </Button>
        </View>
      </View>

      {/* ----------------------------------
          EXERCISE PICKER MODAL
      ---------------------------------- */}
      <ExercisePicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(exercise) => {
          setPickerOpen(false);
          setExerciseEditor({
            id: '',
            exercise,
            minReps: 0,
            maxReps: 0,
            orderIndex: 0,
            set: null as any, 
            targetRPE: 0,
            targetRIR: 0,
            targetPRM: 0,
          });
        }}
      />

      {/* ----------------------------------
          EXERCISE EDITOR MODAL
      ---------------------------------- */}
      <Modal visible={!!exerciseEditor} transparent animationType="fade">
        {exerciseEditor && (
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-neutral-950 p-6 rounded-2xl w-[90%]">
              <Text className="text-white text-xl font-bold mb-4">
                {exerciseEditor.id ? 'Edit Exercise' : 'New Exercise'}
              </Text>

              <Text className="text-white">Min Reps</Text>
              <TextInput
                keyboardType="numeric"
                value={exerciseEditor.minReps?.toString() ?? ''}
                onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, minReps: Number(v) })}
                className="bg-neutral-800 text-white p-2 rounded mb-3"
              />

              <Text className="text-white">Max Reps</Text>
              <TextInput
                keyboardType="numeric"
                value={exerciseEditor.maxReps?.toString() ?? ''}
                onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, maxReps: Number(v) })}
                className="bg-neutral-800 text-white p-2 rounded mb-3"
              />

              <View className="flex-row justify-between mt-6">
                <Button variant="secondary" onPress={() => setExerciseEditor(null)}>
                  <Text>Cancel</Text>
                </Button>

                <Button onPress={handleSaveExercise}>
                  <Text>Save Exercise</Text>
                </Button>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};
