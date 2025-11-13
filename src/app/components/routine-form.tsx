import { useState, useEffect } from 'react';
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
import { Modal, Pressable, View, FlatList } from 'react-native';
import { Routine, Set, SetExercise } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import { useSet } from '../services/set-service';
import { SetForm } from './set-form';

interface RoutineModalProps {
  onClose: () => void;
  selectedRoutine: Routine | any;
}

export function RoutineForm({ onClose, selectedRoutine }: RoutineModalProps) {
  const { createRoutine, updateRoutine } = useRoutine();
  const { getAllSetsInRoutine } = useSet();
  const { user } = useAuth();
  const [routineSets, setRoutineSets] = useState<Array<Set>>([]);
  const [form, setForm] = useState<Routine>(selectedRoutine);
  const [selectedSet, setSelectedSet] = useState<Set | null>(null);
  const [showSetModal, setShowSetModal] = useState(false);

  useEffect(() => {
    if (selectedRoutine) {
      const loadSets = async () => {
        const sets = await getAllSetsInRoutine(selectedRoutine.id);
        setRoutineSets(sets);
      };
      loadSets();
    }
  }, [selectedRoutine]);

  const openSetModal = (set: Set) => {
    setSelectedSet(set);
    setShowSetModal(true);
  };

  const closeSetModal = () => {
    setSelectedSet(null);
    setShowSetModal(false);
  };

  const handleSetSave = (updatedSet: Set) => {
    setRoutineSets((prev) =>
      prev.map((s) => (s.id === updatedSet.id ? updatedSet : s))
    );
    closeSetModal();
  };

  const renderExercise = ({ item }: { item: SetExercise }) => (
    <View className="ml-4 mt-2 border-l border-border pl-3">
      <Text className="text-white text-base font-semibold">
        {item.exercise?.[0]?.name || 'Unnamed Exercise'}
      </Text>
      <Text className="text-gray-400 text-sm">
        {item.exercise?.[0]?.muscleGroup || 'Unknown muscle group'}
      </Text>
    </View>
  );

  const renderSet = ({ item }: { item: Set }) => (
    <Pressable onPress={() => openSetModal(item)}>
      <View className="bg-neutral-900 rounded-xl p-4 mt-4 border border-neutral-800">
        <Text className="text-white text-lg font-bold">Set {item.setNumber}</Text>
        <Text className="text-gray-400 text-sm">
          Work: {item.workTime}s | Rest: {item.restTime}s
        </Text>
        <FlatList
          data={item.setExercises}
          keyExtractor={(exercise) => exercise.id}
          renderItem={renderExercise}
        />
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 items-center justify-center px-4 py-6 bg-black bg-opacity-[45%]">
      <Card className="border-border/0 shadow-none w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl text-white">New Routine</CardTitle>
          <CardDescription className="text-gray-300 text-center">
            Edit your routine and its sets
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
              placeholder="Routine name"
            />

            <Button className="w-full mt-4" onPress={() => console.log('Save routine')}>
              <Text>{!selectedRoutine ? 'Save Routine' : 'Update Routine'}</Text>
            </Button>

            {routineSets.length > 0 && (
              <View className="mt-6">
                <Text className="text-white text-lg font-bold mb-2">Routine Sets</Text>
                <FlatList
                  data={routineSets}
                  keyExtractor={(item) => item.id}
                  renderItem={renderSet}
                />
              </View>
            )}
          </View>
        </CardContent>
      </Card>

      {/* Set Modal */}
      {selectedSet && (
        <Modal visible={showSetModal} animationType="slide" transparent>
          <SetForm
            set={selectedSet}
            onClose={closeSetModal}
            onSave={handleSetSave}
          />
        </Modal>
      )}
    </View>
  );
}
