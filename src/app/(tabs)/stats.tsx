import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { StatsChart } from '../components/statsChart';
import { Stats, useStats } from '../services/stats-service';
import Home from '../../assets/home.svg';
import List from '../../assets/list.svg';
import StatsIcon from '../../assets/stats.svg';
import { Link } from 'expo-router';

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

  // Transformar datos para el gráfico
  const chartData = stats.map((s, index) => ({
    label: `#${index + 1}`,
    calories: s.calories || 0,
    rpe: s.actualRPE || 0,
    rir: s.actualRIR || 0,
    prm: s.actualPRM || 0,
  }));

  return (
    <View className='flex-1 bg-black'>
    <ScrollView className='flex-1 p-16'>
      <Text className="text-white text-3xl font-bold mb-4">Estadísticas</Text>
      <StatsChart data={chartData} />
    </ScrollView>
    <View className="w-[100%] items-end h-auto py-[10px] mb-[10px] flex-row justify-around">
              <View className="w-[7%] max-w-[55px] max-h-[55px]">
                <Link href="/../profile">
                  <Home className="fill-white" fill="#3b82f6" />
                  <Text className="text-white text-xs sm:text-md">Profile</Text>
                </Link>
              </View>
              <View className="w-[7%] max-w-[55px] max-h-[55px]">
                <Link href="/../asignations">
                  <List className="fill-white" fill="#ffffff" />
                  <Text className="text-white text-xs sm:text-md">Asigs.</Text>
                </Link>
              </View>
              <View className="w-[7%] max-w-[55px] max-h-[55px]">
                <Link href="/../stats">
                  <StatsIcon className="fill-blue-500" fill="#ffffff" />
                  <Text className="text-blue-500 text-xs sm:text-md">Stats</Text>
                </Link>
              </View>
            </View>
            </View>
  );
}
