import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useExercise } from "../services/exercise-service";
import { Exercise } from "../interfaces/types";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

export const ExercisePicker: React.FC<Props> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const { getAllExercises } = useExercise();

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filtered, setFiltered] = useState<Exercise[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (visible) loadExercises();
  }, [visible]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = await getAllExercises();
      setExercises(data);
      setFiltered(data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    setFiltered(
      exercises.filter((ex) =>
        ex.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-neutral-900 p-5 rounded-t-2xl max-h-[80%]">
          <Text className="text-white text-xl font-bold mb-3">Select Exercise</Text>

          {/* Search Input */}
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="Search exercises..."
            placeholderTextColor="#8A8A8A"
            className="bg-neutral-800 text-white px-4 py-2 rounded-xl mb-4"
          />

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="p-3 border-b border-neutral-800"
                >
                  <Text className="text-white text-lg">{item.name}</Text>
                  <Text className="text-gray-400 text-sm">{item.muscleGroup}</Text>
                </Pressable>
              )}
            />
          )}

          <Pressable onPress={onClose} className="mt-4 py-3 rounded-xl bg-neutral-800">
            <Text className="text-center text-gray-300">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ExercisePicker;
