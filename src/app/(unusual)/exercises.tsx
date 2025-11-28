import { Button } from '@/src/app/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, Text, View } from 'react-native';
import { ExerciseForm } from '../components/exercise-form';
import { ExerciseInfo } from '../components/exercise-info';
import { Separator } from '../components/ui/separator';
import { Exercise } from '../interfaces/types';
import { useAuth } from '../services/auth-service';
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
    <ScrollView className="flex-1 sm:px-[20%] bg-black">
      <Text className="pt-3 sm:text-7xl sm:px-0 px-4 text-4xl font-bold text-blue-500">Registered Exercises</Text>
      <View className="items-center gap-10 pt-10">
        <Button
          className="bg-purple-600 w-[30%] py-3 rounded-2xl"
          onPress={() => {
            setFormVisible(true);
          }}
        >
          <Text className="text-white">New Exercise</Text>
        </Button>
        <FlatList
          data={allExercises}
          className="w-[40%]"
          renderItem={({ item }) => (
            <View>
              <View className="items-center p-2 hover:bg-blue-500">
                <Text
                  className="color-white text-xl"
                  onPress={() => {
                    setSelectedExercise(item);
                    setModalVisible(true);
                  }}
                >
                  {item.name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Separator className="flex-1" />
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        visible={formVisible}
        onRequestClose={() => setFormVisible(false)}
        animationType="fade"
        transparent={true}
      >
        <ExerciseForm onReload={loadExercises} />
      </Modal>

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
    </ScrollView>
  );
};

export default Exercises;
