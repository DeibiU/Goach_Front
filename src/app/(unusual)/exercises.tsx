import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Modal, Pressable, FlatList } from 'react-native';
import { Button } from '@/src/app/components/ui/button';
import GymIcon from '../../assets/gym-icon.svg';
import { GymForm } from '../components/gym-form';
import { useAuth } from '../services/auth-service';
import { useGym } from '../services/gym-service';
import { Exercise, Gym } from '../interfaces/types';
import { GymTrainerForm } from '../components/gym-trainer-form';
import { GymTraineeForm } from '../components/gym-trainee-form';
import { ExerciseForm } from '../components/exercise-form';
import { useExercise } from '../services/exercise-service';
import { Separator } from '../components/ui/separator';
import { ExerciseInfo } from '../components/exercise-info';

const Exercises = () => {
  const { user } = useAuth();
  const { getAllExercises } = useExercise();
  const [allExercises, setAllExercises] = useState<Array<Exercise>>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [modalVisible, setModalVisible] = useState(false);

  const loadExercises = async () => {
    if (!user?.id) return;
    const exercises: Array<Exercise> = await getAllExercises();
    setAllExercises(exercises);
  };

  useEffect(() => {
    loadExercises();
  }, [user]);

    return (
    <ScrollView className="flex-1 justify-center px-[20rem] bg-black gap-7">
      <View className="flex-row gap-4">
        <Text className="pt-3 text-7xl font-bold text-blue-500">Add a New Exercise</Text>
      </View>

      <View className="2xl:mx-[15rem]">
        <ExerciseForm onReload={loadExercises} /> 
      </View>

      <View className="flex-row gap-4">
        <Text className="pt-3 text-7xl font-bold text-blue-500">Registered Exercises</Text>
      </View>
      <FlatList
        data={allExercises}
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
