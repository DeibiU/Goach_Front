import { Exercise, Gym } from '../interfaces/types';
import { Button } from '@/src/app/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { ExerciseForm } from '../components/exercise-form';
import { ExerciseInfo } from '../components/exercise-info';
import { useAuth } from '../services/auth-service';
import { Separator } from '../components/ui/separator';
import { useExercise } from '../services/exercise-service';

const Exercises = () => {
  const { user } = useAuth();
  const { getAllExercises } = useExercise();
  const [allExercises, setAllExercises] = useState<Array<Exercise>>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const loadExercises = async () => {
    if (!user?.id) return;
    const exercises: Array<Exercise> = await getAllExercises();
    setAllExercises(exercises);
  };

  useEffect(() => {
    loadExercises();
  }, [user]);

  return (
    <>
      <FlatList
        data={allExercises}
        keyExtractor={(item) => item.id}
        className="flex-1 bg-black px-5"
        scrollEnabled={true}
        ListHeaderComponent={
          <>
            <View className="flex-row gap-4">
              <Text className="pt-3 text-7xl font-bold text-blue-500">Add a New Exercise</Text>
            </View>

            <View className="2xl:mx-4">
              <ExerciseForm onReload={loadExercises} />
            </View>

            <View className="flex-row gap-4 mt-6">
              <Text className="pt-3 text-7xl font-bold text-blue-500">Registered Exercises</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View>
            <Pressable
              className="items-center p-2 hover:bg-blue-500"
              onPress={() => {
                setSelectedExercise(item);
                setModalVisible(true);
              }}
            >
              <Text className="color-white text-xl">{item.name}</Text>
            </Pressable>

            <View className="flex-row items-center">
              <Separator className="flex-1" />
            </View>
          </View>
        )}
        ListFooterComponent={<View className="h-10" />}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent={true}
      >
        {selectedExercise && (
          <ExerciseInfo
            exercise={selectedExercise}
            onUpdated={loadExercises}
            onDeleted={() => {
              setModalVisible(false);
              loadExercises();
            }}
          />
        )}
      </Modal>
    </>
  );
};
export default Exercises;
