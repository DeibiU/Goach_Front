import React, { FC, useState, useEffect } from 'react';
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

  // UI toggle states
  const [useDuration, setUseDuration] = useState(false);
  const [showWeight, setShowWeight] = useState(false);

  const { getSetById, addSet, updateSet, addSetExercise, updateSetExercise, deleteSetExercise } =
    useSet();

  useEffect(() => {
    if (exerciseEditor) {
      setUseDuration(!!exerciseEditor.duration);
      setShowWeight(
        exerciseEditor.minWeight !== undefined || exerciseEditor.maxWeight !== undefined,
      );
    }
  }, [exerciseEditor]);

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

  const handleSaveExercise = async () => {
    if (!exerciseEditor) return;

    const dataToSave = {
      ...exerciseEditor,
      targetRPE: exerciseEditor.targetRPE ?? undefined,
      targetRIR: exerciseEditor.targetRIR ?? undefined,
      targetPRM: exerciseEditor.targetPRM ?? undefined,
    };

    if (useDuration) {
      dataToSave.minReps = undefined;
      dataToSave.maxReps = undefined;
    } else {
      dataToSave.duration = undefined;
    }
    if (!showWeight) {
      dataToSave.minWeight = undefined;
      dataToSave.maxWeight = undefined;
    }

    try {
      if (exerciseEditor.id) {
        await updateSetExercise(initialSet.id!, exerciseEditor.id, dataToSave);
      } else {
        await addSetExercise(setData.id!, dataToSave);
      }

      const updated = await getSetById(setData.id!);
      setSetData(updated);
      setExerciseEditor(null);
    } catch (err) {
      console.error('Error saving exercise:', err);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    try {
      await deleteSetExercise(initialSet.id!, id);
      const updated = await getSetById(setData.id!);
      setSetData(updated);
    } catch (err) {
      console.error('Error deleting exercise:', err);
    }
  };

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 mt-3">
      <Text className="text-white font-semibold">{item.exercise?.name}</Text>
      <Text className="text-gray-400 text-sm">{item.exercise?.muscleGroup}</Text>
      <Text className="text-gray-500 text-xs italic">
        {item.duration ? `Duration: ${item.duration}` : `Reps: ${item.minReps}–${item.maxReps}`}
      </Text>
      {item.minWeight !== undefined && (
        <Text className="text-gray-500 text-xs italic">
          Weight: {item.minWeight}–{item.maxWeight} kg
        </Text>
      )}
      <Text className="text-gray-500 text-xs italic">
        RPE: {item.targetRPE} | RIR: {item.targetRIR} | %RM: {item.targetPRM}
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

      <ExercisePicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(exercise) => {
          setPickerOpen(false);
          setExerciseEditor({
            id: '',
            exercise,
            orderIndex: 0,
            set: null as any,
            targetRPE: 0,
            targetRIR: 0,
            targetPRM: 0,
          });
        }}
      />

      <Modal visible={!!exerciseEditor} transparent animationType="fade">
        {exerciseEditor && (
          <View className="flex-1 justify-center items-center bg-black/40">
            <View className="bg-neutral-950 p-6 rounded-2xl w-[90%]">
              <Text className="text-white text-xl font-bold mb-4">
                {exerciseEditor.id ? 'Edit Exercise' : 'New Exercise'}
              </Text>

              {/* Reps / Duration */}
              <View className="flex-row gap items-start mb-3">
                <Button
                  variant={!useDuration ? 'default' : 'secondary'}
                  onPress={() => setUseDuration(false)}
                >
                  <Text>Reps</Text>
                </Button>
                <Button
                  variant={useDuration ? 'default' : 'secondary'}
                  onPress={() => setUseDuration(true)}
                >
                  <Text>Duration</Text>
                </Button>
              </View>

              {useDuration ? (
                <>
                  <Text className="text-white">Duration (e.g. 00:30)</Text>
                  <TextInput
                    value={exerciseEditor.duration ?? ''}
                    onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, duration: v })}
                    className="bg-neutral-800 text-white p-2 rounded mb-3"
                  />
                </>
              ) : (
                <>
                  <Text className="text-white">Min Reps</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={exerciseEditor.minReps?.toString() ?? ''}
                    onChangeText={(v) =>
                      setExerciseEditor({ ...exerciseEditor, minReps: Number(v) })
                    }
                    className="bg-neutral-800 text-white p-2 rounded mb-3"
                  />
                  <Text className="text-white">Max Reps</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={exerciseEditor.maxReps?.toString() ?? ''}
                    onChangeText={(v) =>
                      setExerciseEditor({ ...exerciseEditor, maxReps: Number(v) })
                    }
                    className="bg-neutral-800 text-white p-2 rounded mb-3"
                  />
                </>
              )}

              {showWeight && (
                <>
                  <Text className="text-white">Min Weight (kg)</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={exerciseEditor.minWeight?.toString() ?? ''}
                    onChangeText={(v) =>
                      setExerciseEditor({ ...exerciseEditor, minWeight: Number(v) })
                    }
                    className="bg-neutral-800 text-white p-2 rounded mb-3"
                  />
                  <Text className="text-white">Max Weight (kg)</Text>
                  <TextInput
                    keyboardType="numeric"
                    value={exerciseEditor.maxWeight?.toString() ?? ''}
                    onChangeText={(v) =>
                      setExerciseEditor({ ...exerciseEditor, maxWeight: Number(v) })
                    }
                    className="bg-neutral-800 text-white p-2 rounded mb-3"
                  />
                </>
              )}
              <Button variant="default" className="mb-3" onPress={() => setShowWeight(!showWeight)}>
                <Text>{showWeight ? 'Hide Weight' : 'Add Weight'}</Text>
              </Button>

              <Text className="text-white mt-2">Target RPE</Text>
              <TextInput
                keyboardType="numeric"
                value={exerciseEditor.targetRPE?.toString() ?? ''}
                onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, targetRPE: Number(v) })}
                className="bg-neutral-800 text-white p-2 rounded mb-3"
              />

              <Text className="text-white">Target RIR</Text>
              <TextInput
                keyboardType="numeric"
                value={exerciseEditor.targetRIR?.toString() ?? ''}
                onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, targetRIR: Number(v) })}
                className="bg-neutral-800 text-white p-2 rounded mb-3"
              />

              <Text className="text-white">Target %RM</Text>
              <TextInput
                keyboardType="numeric"
                value={exerciseEditor.targetPRM?.toString() ?? ''}
                onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, targetPRM: Number(v) })}
                className="bg-neutral-800 text-white p-2 rounded mb-3"
              />

              {/* Buttons */}
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
