import { Button } from '@/src/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/app/components/ui/card';
import { Text } from '@/src/app/components/ui/text';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View, Modal } from 'react-native';
import { Routine, Set, SetExercise } from '../interfaces/types';
import { useRoutine } from '../services/routine-service';
import { useSet } from '../services/set-service';
import { RoutineForm } from '../components/routine-form';
import { SetForm } from '../components/set-form';
import Bin from '../../assets/bin.svg';

const Routines = () => {
  const { routineId } = useLocalSearchParams<{ routineId?: string }>();
  const { getRoutine } = useRoutine();
  const { getAllSetsInRoutine, updateSet, addSet, deleteSet } = useSet();

  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [routineSets, setRoutineSets] = useState<Set[]>([]);

  // Modal state
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
        console.error('Error loading routine or sets:', error);
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
    } catch (err) {
      console.error('Failed to delete set:', err);
    }
  };

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="ml-4 mt-2 border-l border-border pl-3">
      <Text className="text-white text-base font-semibold">
        {item.exercise?.name || 'Unnamed Exercise'}
      </Text>
      <Text className="text-gray-400 text-sm">
        {item.exercise?.muscleGroup || 'Unknown muscle group'}
      </Text>
      <Text className="text-gray-500 text-xs italic">
        Reps: {item.minReps}–{item.maxReps} | Weight: {item.minWeight}–{item.maxWeight} kg
      </Text>
    </View>
  );

  const renderSet = ({ item }: { item: Set }) => (
    <View className="bg-neutral-900 rounded-xl p-4 mt-4 border border-neutral-800">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-lg font-bold">Set {item.setNumber}</Text>

        {/* Delete button */}
        <Button variant="ghost" className="p-1" onPress={() => handleDeleteSet(item.id)}>
          <Bin className="fill-red-600" />
        </Button>
      </View>

      <Text className="text-gray-400 text-sm">
        Work: {item.workTime}s | Rest: {item.restTime}s
      </Text>

      <Text className="text-gray-500 text-xs">
        Target RPE: {item.targetRPE} | RIR: {item.targetRIR} | PRM: {item.targetPRM}
      </Text>

      <FlatList
        data={item.setExercises}
        keyExtractor={(exercise, index) => exercise.id ?? index.toString()}
        renderItem={renderExercise}
      />

      <Button className="mt-3" onPress={() => handleEditSet(item)}>
        <Text>Edit Set</Text>
      </Button>
    </View>
  );

  return (
    <ScrollView className="flex-1 py-6 bg-black">
      <Card className="shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left text-white">
            {routineId ? 'Edit Routine' : 'New Routine'}
          </CardTitle>
          <CardDescription className="text-center sm:text-left text-gray-300">
            {routineId
              ? 'Update the information of this routine.'
              : 'Enter the information to create a new routine.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-[2%] flex-row">
          <RoutineForm isEditing={!!routineId} selectedRoutine={selectedRoutine ?? undefined} />

          {routineId && (
            <View className="min-w-[49%]">
              {routineSets.length > 0 && (
                <View className="mt-6">
                  <Text className="text-white text-lg font-bold mb-2">Routine Sets</Text>
                  <FlatList
                    data={routineSets}
                    keyExtractor={(item) => item.id ?? `${item.setNumber}`}
                    renderItem={renderSet}
                  />
                </View>
              )}

              <Button className="w-full mt-4" onPress={handleAddSet}>
                <Text>Add a new set</Text>
              </Button>
            </View>
          )}
        </CardContent>
      </Card>
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
    </ScrollView>
  );
};

export default Routines;
