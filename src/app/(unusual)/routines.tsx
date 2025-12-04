import { Marquee } from '@animatereactnative/marquee';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, View } from 'react-native';
import { Toast } from 'toastify-react-native';

import { Button } from '@/src/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/app/components/ui/card';
import { Text } from '@/src/app/components/ui/text';
import Logo from '../../assets/logo.svg';
import { Routine, Set, SetExercise } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';
import { useSet } from '../services/set-service';
import { RoutineForm } from '../components/routine-form';
import { SetForm } from '../components/set-form';
import Bin from '../../assets/bin.svg';
import { isWeb } from '../utils/platform-flags';

const Routines = () => {
  const { routineId } = useLocalSearchParams<{ routineId?: string }>();
  const { getRoutine } = useRoutine();
  const { getAllSetsInRoutine, deleteSet } = useSet();

  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [routineSets, setRoutineSets] = useState<Set[]>([]);

  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [selectedSet, setSelectedSet] = useState<Set | null>(null);

  useEffect(() => {
    const loadRoutineAndSets = async () => {
      if (!routineId) return;

      try {
        const routine = await getRoutine(routineId);
        setSelectedRoutine(routine);

        const sets = await getAllSetsInRoutine(routineId);
        setRoutineSets(sets);
      } catch (error) {
        Toast.error('Error loading routine or sets.');
        console.error(error);
      }
    };

    loadRoutineAndSets();
  }, [routineId]);

  const refreshSets = async () => {
    if (!routineId) return;
    const sets = await getAllSetsInRoutine(routineId);
    setRoutineSets(sets);
  };

  // --------- Set Actions ----------
  const handleEditSet = (set: Set) => {
    setSelectedSet(set);
    setIsSetModalOpen(true);
  };

  const handleAddSet = () => {
    const newSet: Set = {
      routine: selectedRoutine,
      setNumber: routineSets.length + 1,
      workTime: '',
      restTime: '',
      targetRPE: 0,
      targetRIR: 0,
      targetPRM: 0,
      setExercises: [],
    };

    setSelectedSet(newSet);
    setIsSetModalOpen(true);
  };

  const handleSaveSet = async () => {
    await refreshSets();
    setIsSetModalOpen(false);
    setSelectedSet(null);
  };

  const handleDeleteSet = async (setId: string | undefined) => {
    try {
      await deleteSet(routineId, setId);
      setRoutineSets((prev) => prev.filter((s) => s.id !== setId));
      Toast.success('Success! Set was deleted.');
    } catch (err) {
      console.error('Failed to delete set:', err);
      Toast.error('Error! Invalid credentials or server error.');
    }
  };

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="ml-4 mt-2 border-l border-border pl-3">
      <Text className="text-base font-semibold text-white">
        {item.exercise?.name || 'Unnamed Exercise'}
      </Text>
      <Text className="text-sm text-gray-400">
        {item.exercise?.muscleGroup || 'Unknown muscle group'}
      </Text>
      <Text className="text-xs italic text-gray-500">
        Reps: {item.minReps}–{item.maxReps} | Weight: {item.minWeight}–{item.maxWeight} kg
      </Text>
    </View>
  );

  const renderSet = ({ item }: { item: Set }) => (
    <View className="mt-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Set {item.setNumber}</Text>

        {/* Delete button */}
        <Button variant="ghost" className="p-1" onPress={() => handleDeleteSet(item.id)}>
          <Bin className="fill-red-600" />
        </Button>
      </View>

      <Text className="text-sm text-gray-400">
        Work: {item.workTime}s | Rest: {item.restTime}s
      </Text>

      <Text className="text-xs text-gray-500">
        Target RPE: {item.targetRPE} | RIR: {item.targetRIR} | PRM: {item.targetPRM}
      </Text>

      <FlatList
        data={item.setExercises}
        keyExtractor={(exercise, index) => exercise.id ?? index.toString()}
        renderItem={renderExercise}
        scrollEnabled={false}
      />

      <Button className="ml-[10%] mt-3 w-4/5" onPress={() => handleEditSet(item)}>
        <Text>Edit Set</Text>
      </Button>
    </View>
  );

  return (
    <View className="flex-1 bg-black py-6">
      <ScrollView>
        {isWeb && (
          <View className="absolute inset-0 justify-center">
            <Marquee spacing={2} speed={1}>
              <Logo className="opacity-10% h-[60vh] w-[150vw] fill-gray-900" />
            </Marquee>
          </View>
        )}
        <View
          className={
            isWeb
              ? 'mx-3 min-w-[288px] rounded-2xl shadow-[rgba(0,100,255,0.5)_-5px_-4px_10px_1px] sm:mx-[20%] sm:w-3/5'
              : 'mx-3 min-w-[288px] rounded-2xl sm:mx-[20%] sm:w-3/5'
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl text-blue-500 sm:text-left">
                {routineId ? 'Edit Routine' : 'New Routine'}
              </CardTitle>
              <CardDescription className="text-center text-gray-300 sm:text-left">
                {routineId
                  ? 'Update the information of this routine.'
                  : 'Enter the information to create a new routine.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="gap-[2%] mb-[4rem]">
              <RoutineForm isEditing={!!routineId} selectedRoutine={selectedRoutine ?? undefined} />

              {routineId && (
                <View className="min-w-[49%]">
                  {routineSets.length > 0 && (
                    <View className="mt-6">
                      <Text className="mb-2 text-lg font-bold text-white">Routine Sets</Text>
                      <FlatList
                        data={routineSets}
                        keyExtractor={(item) => item.id ?? `${item.setNumber}`}
                        renderItem={renderSet}
                        scrollEnabled={false}
                      />
                    </View>
                  )}

                  <Button className="ml-[10%] mt-4 w-4/5" onPress={handleAddSet}>
                    <Text>Add a new set</Text>
                  </Button>
                </View>
              )}
            </CardContent>
          </Card>
        </View>
      </ScrollView>
      <Modal visible={isSetModalOpen} transparent animationType="fade">
        {selectedSet && (
          <SetForm
            set={selectedSet}
            routineId={routineId}
            onClose={() => setIsSetModalOpen(false)}
            onSave={handleSaveSet}
          />
        )}
      </Modal>
    </View>
  );
};

export default Routines;
