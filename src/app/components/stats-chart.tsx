import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

// ---------------------------
// WEB: Recharts
// ---------------------------
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ---------------------------
// MOBILE: React Native Chart Kit
// ---------------------------
import { LineChart as MobileLineChart } from 'react-native-chart-kit';

import { isWeb } from '../utils/platform-flags';

interface StatPoint {
  label: string;
  calories: number;
  rpe: number;
  rir: number;
  prm: number;
}

interface StatsChartProps {
  data: StatPoint[];
}

export const StatsChart = ({ data }: StatsChartProps) => {
  if (!data || data.length === 0) {
    return <Text className="mt-4 text-center text-white">No hay datos de estadísticas</Text>;
  }

  // ---------------------------
  // WEB VERSION
  // ---------------------------
  if (isWeb) {
    return (
      <View style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />

            <Line type="monotone" dataKey="calories" stroke="#82ca9d" dot={false} name="Calorías" />
            <Line type="monotone" dataKey="prm" stroke="#8884d8" dot={false} name="PRM" />
            <Line type="monotone" dataKey="rpe" stroke="#f99d1c" dot={false} name="RPE" />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  }

  // ---------------------------
  // MOBILE VERSION
  // ---------------------------
  const screenWidth = Dimensions.get('window').width;

  const labels = data.map((d) => d.label);
  const calories = data.map((d) => d.calories);
  const prm = data.map((d) => d.prm);
  const rpe = data.map((d) => d.rpe);

  const chartWidth = Math.max(screenWidth, labels.length * 60);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="w-[125%]"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View className="flex-1 items-center">
        <MobileLineChart
          data={{
            labels,
            datasets: [
              { data: calories, strokeWidth: 3, color: () => '#82ca9d' },
              { data: prm, strokeWidth: 2, color: () => '#8884d8' },
              { data: rpe, strokeWidth: 2, color: () => '#f99d1c' },
            ],
            legend: ['Calorías', 'PRM', 'RPE'],
          }}
          width={chartWidth}
          height={550}
          withDots={false}
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#111',
            backgroundGradientTo: '#111',
            decimalPlaces: 0,
            color: (o = 1) => `rgba(255,255,255,${o})`,
            labelColor: () => '#fff',
            propsForBackgroundLines: { stroke: '#333' },
          }}
          style={{
            borderRadius: 20,
          }}
        />
      </View>
    </ScrollView>
  );
};
