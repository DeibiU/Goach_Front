import React, { FC, useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, TextInput, View } from 'react-native';
import { Toast } from 'toastify-react-native';

import { Button } from '@/src/app/components/ui/button';
import Bin from '../../assets/bin.svg';
import Pencil from '../../assets/pencil.svg';
import { Set, SetExercise } from '../interfaces/types';
import { useSet } from '../services/set-service';
import ExercisePicker from './exercise-picker';
import { isWeb } from '../utils/platform-flags';

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
      Toast.success('Success! Set was saved.');
      onSave();
    } catch (err) {
      console.error('Failed to save set:', err);
      Toast.error('Error! Failed saving the set.');
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

      Toast.success('Success! Exercise was saved.');
      const updated = await getSetById(setData.id!);
      setSetData(updated);
      setExerciseEditor(null);
    } catch (err) {
      console.error('Error saving exercise:', err);
      Toast.error('Error! Failed saving the exercise to the set.');
    }
  };

  const handleDeleteExercise = async (id: string) => {
    try {
      await deleteSetExercise(initialSet.id!, id);
      Toast.success('Success! Exercise was deleted.');
      const updated = await getSetById(setData.id!);
      setSetData(updated);
    } catch (err) {
      console.error('Error deleting exercise:', err);
      Toast.error("Error! Couldn't delete the exercise.");
    }
  };

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="mt-3 rounded-lg border border-neutral-700 bg-neutral-900 p-3">
      <Text className="font-semibold text-white">{item.exercise?.name}</Text>
      <Text className="text-sm text-gray-400">{item.exercise?.muscleGroup}</Text>
      <Text className="text-xs italic text-gray-500">
        {item.duration ? `Duration: ${item.duration}` : `Reps: ${item.minReps}–${item.maxReps}`}
      </Text>
      {item.minWeight !== undefined && (
        <Text className="text-xs italic text-gray-500">
          Weight: {item.minWeight}–{item.maxWeight} kg
        </Text>
      )}
      <Text className="text-xs italic text-gray-500">
        RPE: {item.targetRPE} | RIR: {item.targetRIR} | %RM: {item.targetPRM}
      </Text>
      <View className="mt-2 flex-row justify-end">
        <Button variant="ghost" className="mr-2" onPress={() => setExerciseEditor(item)}>
          <Pencil className="fill-white" />
        </Button>
        <Button variant="ghost" onPress={() => handleDeleteExercise(item.id!)}>
          <Bin className="fill-red-600" />
        </Button>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView
        className="flex-1 bg-black/40"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          className={
            isWeb
              ? 'w-[90%] max-w-[1080px] gap-2 rounded-2xl bg-neutral-950 p-6 shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px]'
              : 'w-[90%] max-w-[1080px] gap-2 rounded-2xl bg-neutral-950 p-6'
          }
        >
          <Text className="mb-4 text-2xl font-bold text-blue-500">
            {setData.id ? 'Edit Set' : 'New Set'}
          </Text>

          <Text className="text-white">Work Time (sec)</Text>
          <TextInput
            value={setData.workTime}
            onChangeText={(v) => setSetData({ ...setData, workTime: v })}
            className="mb-2 rounded bg-neutral-800 p-2 text-white"
          />

          <Text className="text-white">Rest Time (sec)</Text>
          <TextInput
            value={setData.restTime}
            onChangeText={(v) => setSetData({ ...setData, restTime: v })}
            className="mb-2 rounded bg-neutral-800 p-2 text-white"
          />

          <Text className="mb-1 mt-4 text-lg text-white">Exercises in this Set</Text>
          <FlatList
            data={setData.setExercises}
            keyExtractor={(e, i) => e.id ?? i.toString()}
            renderItem={renderExercise}
            nestedScrollEnabled={true}
          />

          <Button className="" onPress={() => setPickerOpen(true)}>
            <Text>Add Exercise</Text>
          </Button>

          <View className="mt-7 flex-row justify-between">
            <Button variant="secondary" onPress={onClose}>
              <Text className="text-white">Cancel</Text>
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
            <View className="flex-1 items-center justify-center bg-black/40 ">
              <View className="w-[90%] rounded-2xl bg-neutral-950 p-6 ">
                <Text className="mb-4 text-2xl font-bold text-blue-500">
                  {exerciseEditor.id ? 'Edit Exercise' : 'New Exercise'}
                </Text>

                {/* Reps / Duration */}
                <View className="gap mb-3 flex-row items-start">
                  <Button
                    variant={!useDuration ? 'default' : 'secondary'}
                    onPress={() => setUseDuration(false)}
                  >
                    {useDuration && <Text className="text-white">Reps</Text>}
                    {!useDuration && <Text>Reps</Text>}
                  </Button>
                  <Button
                    variant={useDuration ? 'default' : 'secondary'}
                    onPress={() => setUseDuration(true)}
                  >
                    {useDuration && <Text>Duration</Text>}
                    {!useDuration && <Text className="text-white">Duration</Text>}
                  </Button>
                </View>

                {useDuration ? (
                  <>
                    <Text className="text-white">Duration (e.g. 00:30)</Text>
                    <TextInput
                      value={exerciseEditor.duration ?? ''}
                      onChangeText={(v) => setExerciseEditor({ ...exerciseEditor, duration: v })}
                      className="mb-3 rounded bg-neutral-800 p-2 text-white"
                    />
                  </>
                ) : (
                  <>
                    <Text className="pb-1 text-white">Min Reps</Text>
                    <TextInput
                      keyboardType="numeric"
                      value={exerciseEditor.minReps?.toString() ?? ''}
                      onChangeText={(v) =>
                        setExerciseEditor({ ...exerciseEditor, minReps: Number(v) })
                      }
                      className="mb-3 rounded bg-neutral-800 p-2 text-white"
                    />
                    <Text className="pb-1 text-white">Max Reps</Text>
                    <TextInput
                      keyboardType="numeric"
                      value={exerciseEditor.maxReps?.toString() ?? ''}
                      onChangeText={(v) =>
                        setExerciseEditor({ ...exerciseEditor, maxReps: Number(v) })
                      }
                      className="mb-3 rounded bg-neutral-800 p-2 text-white"
                    />
                  </>
                )}

                {showWeight && (
                  <>
                    <Text className="pb-1 text-white">Min Weight (kg)</Text>
                    <TextInput
                      keyboardType="numeric"
                      value={exerciseEditor.minWeight?.toString() ?? ''}
                      onChangeText={(v) =>
                        setExerciseEditor({ ...exerciseEditor, minWeight: Number(v) })
                      }
                      className="mb-3 rounded bg-neutral-800 p-2 text-white"
                    />
                    <Text className="pb-1 text-white">Max Weight (kg)</Text>
                    <TextInput
                      keyboardType="numeric"
                      value={exerciseEditor.maxWeight?.toString() ?? ''}
                      onChangeText={(v) =>
                        setExerciseEditor({ ...exerciseEditor, maxWeight: Number(v) })
                      }
                      className="mb-3 rounded bg-neutral-800 p-2 text-white"
                    />
                  </>
                )}
                <Button
                  variant="default"
                  className="mb-3"
                  onPress={() => setShowWeight(!showWeight)}
                >
                  <Text>{showWeight ? 'Hide Weight' : 'Add Weight'}</Text>
                </Button>

                <Text className="mt-2 pb-1 text-white">Target RPE</Text>
                <TextInput
                  keyboardType="numeric"
                  value={exerciseEditor.targetRPE?.toString() ?? ''}
                  onChangeText={(v) =>
                    setExerciseEditor({ ...exerciseEditor, targetRPE: Number(v) })
                  }
                  className="mb-3 rounded bg-neutral-800 p-2 text-white"
                />

                <Text className="pb-1 text-white">Target RIR</Text>
                <TextInput
                  keyboardType="numeric"
                  value={exerciseEditor.targetRIR?.toString() ?? ''}
                  onChangeText={(v) =>
                    setExerciseEditor({ ...exerciseEditor, targetRIR: Number(v) })
                  }
                  className="mb-3 rounded bg-neutral-800 p-2 text-white"
                />

                <Text className="pb-1 text-white">Target %RM</Text>
                <TextInput
                  keyboardType="numeric"
                  value={exerciseEditor.targetPRM?.toString() ?? ''}
                  onChangeText={(v) =>
                    setExerciseEditor({ ...exerciseEditor, targetPRM: Number(v) })
                  }
                  className="mb-3 rounded bg-neutral-800 p-2 text-white"
                />

                {/* Buttons */}
                <View className="mt-6 flex-row justify-between">
                  <Button variant="secondary" onPress={() => setExerciseEditor(null)}>
                    <Text className="text-white">Cancel</Text>
                  </Button>
                  <Button onPress={handleSaveExercise}>
                    <Text>Save Exercise</Text>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </>
  );
};
