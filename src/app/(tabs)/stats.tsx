import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { StatsChart } from '../components/stats-chart';
import { Stats, useStats } from '../services/stats-service';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import StatsIcon from '../../assets/stats.svg';

/**
 *
 */
export default function StatsScreen() {
  const { getAllStats } = useStats();
  const [stats, setStats] = useState<Stats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#00ff00" />;

  const chartData = stats.map((s, index) => ({
    label: `#${index + 1}`,
    calories: s.calories || 0,
    rpe: s.actualRPE || 0,
    rir: s.actualRIR || 0,
    prm: s.actualPRM || 0,
  }));

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        className="flex-1 p-16"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20
        }}
      >
        <Text className="pt-5 text-4xl font-bold text-blue-500 sm:text-7xl">Statistics</Text>
        <StatsChart data={chartData} />
      </ScrollView>
      <View className="mb-[10px] h-auto w-full flex-row items-end justify-around py-[10px]">
        <View className="max-h-[55px] w-[7%] max-w-[55px]">
          <Link href="/../profile">
            <Home className="fill-white" fill="#3b82f6" />
            <Text className="sm:text-md text-xs text-white">Profile</Text>
          </Link>
        </View>
        <View className="max-h-[55px] w-[7%] max-w-[55px]">
          <Link href="/../asignations">
            <List className="fill-white" fill="#ffffff" />
            <Text className="sm:text-md text-xs text-white">Asigs.</Text>
          </Link>
        </View>
        <View className="max-h-[55px] w-[7%] max-w-[55px]">
          <Link href="/../stats">
            <StatsIcon className="fill-blue-500" fill="#ffffff" />
            <Text className="sm:text-md text-xs text-blue-500">Stats</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
