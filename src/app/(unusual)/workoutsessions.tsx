import { Button } from '@/src/app/components/ui/button';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { StatsForm } from '../components/stats-form';
import { TimerButton } from '../components/timer-button';
import { useAuth } from '../services/auth-service';
import { useRoutine } from '../services/routine-service';
import { useWorkoutSession } from '../services/session-service';
import { useSet } from '../services/set-service';

const Workoutsessions = () => {
  const { routineId } = useLocalSearchParams();
  const { getRoutine } = useRoutine();
  const { getAllSetsInRoutine } = useSet();
  const { createSession } = useWorkoutSession();
  const { user } = useAuth();

  const [routine, setRoutine] = useState<any>(null);
  const [sets, setSets] = useState<any[]>([]);
  const [createdWorkoutSession, setCreatedWorkoutSession] = useState<any>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const [startedAt] = useState(new Date().toISOString());

  // Chronometer logic
  useEffect(() => {
    if (isPaused || isFinished) {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000) as unknown as number;

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isPaused, isFinished]);

  const formatTime = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const r = await getRoutine(routineId);
    setRoutine(r);

    const s = await getAllSetsInRoutine(routineId);
    setSets(s);
  };

  // ------------ FINISH SESSION ------------
  const finishSession = async () => {
    try {
      setIsPaused(true);
      setIsFinished(true);

      if (!user?.id) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }

      const endedAt = new Date().toISOString();

      const payload = {
        trainee: user,
        routine: routine,
        gym: routine?.gym?.id ?? null,
        startedAt: startedAt,
        finishedAt: endedAt,
      };

      const session = await createSession(payload);
      setCreatedWorkoutSession(session);

      Alert.alert('Session Saved', 'Workout session has been recorded!');
      setShowStatsModal(true);
    } catch (err) {
      Alert.alert('Error', 'Could not create workout session.');
      console.log(err);
    }
  };

  const onReloadStats = () => {
    setShowStatsModal(false);
  };

  return (
    <View className="flex-1 bg-neutral-950 justify-center sm:px-[10%] md:px[20%]">
      {/* Header */}
      <View className="px-5 py-4">
        <Text className="text-blue-500 text-2xl font-bold">{routine?.name}</Text>
        <Text className="text-gray-400 text-base">Workout Session</Text>
        {/* Chronometer */}
        <View className="mt-4 bg-neutral-800 py-3 rounded-xl items-center shadow-[rgba(255,0,0,0.5)_0px_-2px_10px_1px]">
          <Text className="text-white text-4xl font-bold">{formatTime()}</Text>
        </View>
        {/* Sets & Exercises */}
        <ScrollView className="px-5">
          {' '}
          {sets.map((set) => (
            <View
              key={set.id}
              className="bg-neutral-900 p-4 rounded-b-2xl mb-4 shadow-[rgba(255,255,0,0.5)_0px_-4px_10px_1px]"
            >
              {' '}
              <Text className="text-white text-xl font-bold">Set {set.setNumber}</Text>{' '}
              {/* Set metadata */}{' '}
              <Text className="text-gray-400 text-sm mt-1">
                {' '}
                Work: {set.workTime || '-'} | Rest: {set.restTime || '-'}{' '}
              </Text>{' '}
              {/* Set targets */}{' '}
              <Text className="text-gray-500 text-xs">
                {' '}
                RPE {set.targetRPE} • RIR {set.targetRIR} • PRM {set.targetPRM}{' '}
              </Text>{' '}
              <View className="mt-3 border-b border-neutral-800" /> {/* ---- Set Exercises ---- */}{' '}
              {set.setExercises?.map((sx: any) => (
                <View key={sx.id} className="mt-3 bg-neutral-800 p-3 rounded-xl">
                  {' '}
                  <Text className="text-white text-lg">{sx.exercise.name}</Text>{' '}
                  <Text className="text-gray-400 text-sm">{sx.exercise.muscleGroup}</Text>{' '}
                  <Text className="text-gray-500 text-xs mt-1 italic">
                    {' '}
                    Reps: {sx.minReps}–{sx.maxReps}{' '}
                  </Text>{' '}
                  <Text className="text-gray-500 text-xs italic">
                    {' '}
                    RPE {sx.targetRPE} • RIR {sx.targetRIR} • PRM {sx.targetPRM}{' '}
                  </Text>{' '}
                  {sx.duration && sx.duration > '00:00:00.0000000' && (
                    <TimerButton durationString={sx.duration} />
                  )}
                </View>
              ))}{' '}
            </View>
          ))}{' '}
        </ScrollView>
        {/* Finish / Resume / Restart */}
        <View className="flex-row justify-between mt-4">
          {!isPaused && !isFinished && (
            <Button
              className="bg-red-600 flex-1 mr-2 border-black border-solid border- shadow-[rgba(0,255,0,0.5)_0px_0px_10px_1px]"
              onPress={finishSession}
            >
              <Text className="text-white font-semibold">Finish Session</Text>
            </Button>
          )}

          {isFinished && (
            <View className="bg-green-600 flex-1 mr-2 rounded-xl items-center justify-center py-2">
              <Text className="text-white font-semibold">Session Saved</Text>
            </View>
          )}

          {isPaused && !isFinished && (
            <Button className="bg-green-600 flex-1 mr-2" onPress={() => setIsPaused(false)}>
              <Text className="text-white font-semibold">Resume</Text>
            </Button>
          )}

          {isPaused && !isFinished && (
            <Button
              className="bg-neutral-700 flex-1"
              onPress={() => {
                setTime(0);
                setIsPaused(false);
              }}
            >
              <Text className="text-white font-semibold">Restart</Text>
            </Button>
          )}
        </View>
      </View>

      {/* ---- STATS MODAL ---- */}
      <Modal visible={showStatsModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/60 justify-center px-4">
          <View className="bg-neutral-900 p-4 rounded-xl">
            {createdWorkoutSession && (
              <StatsForm
                workout={createdWorkoutSession}
                duration={formatTime()}
                onReload={onReloadStats}
              />
            )}
            <Pressable onPress={() => setShowStatsModal(false)} className="mt-4">
              <Text className="text-center text-gray-300 underline">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Workoutsessions;
