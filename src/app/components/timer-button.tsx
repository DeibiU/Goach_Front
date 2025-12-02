import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/src/app/components/ui/button';

interface TimerButtonProps {
  durationString: string; // "HH:MM:SS.0000000"
}

const TimerButton: React.FC<TimerButtonProps> = ({ durationString }) => {
  const safeDuration = durationString ?? '00:00:00.0000000';
  const [hours, minutes, seconds] = safeDuration.split('.')[0].split(':').map(Number);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Timer state
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return totalSeconds; // Reset
        }
        return prev - 1;
      });
    }, 1000) as unknown as number;

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const startCountdown = () => {
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const formatTime = () => {
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="mt-2">
      {!isRunning ? (
        <Button className="bg-red-600 w-[25%]" onPress={startCountdown}>
          <Text className="text-white font-semibold">Time it!</Text>
        </Button>
      ) : (
        <Text className="text-lg font-bold text-white mt-2">⏱ {formatTime()}</Text>
      )}
    </View>
  );
};

export { TimerButton };
