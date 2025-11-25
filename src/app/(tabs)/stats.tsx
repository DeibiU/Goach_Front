import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useStats, Stats } from '../services/stats-service';
import { StatsChart } from '../components/statsChart';

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
    rpe: s.actualRpe || 0,
    rir: s.actualRir || 0,
    prm: s.actualPrm || 0,
  }));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
      <Text className="text-white text-3xl font-bold mb-4">Estadísticas</Text>
      <StatsChart data={chartData} />
    </ScrollView>
  );
}
