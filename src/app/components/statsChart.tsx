import React from 'react';
import { Platform, View, Text } from 'react-native';

// Web: Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Móvil: Victory
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory';

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
  if (!data || data.length === 0)
    return <Text className="text-white text-center mt-4">No hay datos de estadísticas</Text>;

  // 🧭 Web version (Recharts)
  if (Platform.OS === 'web') {
    return (
      <View style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="label" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="calories" stroke="#82ca9d" name="Calorías" />
            <Line type="monotone" dataKey="prm" stroke="#8884d8" name="PRM" />
            <Line type="monotone" dataKey="rpe" stroke="#f99d1c" name="RPE" />
          </LineChart>
        </ResponsiveContainer>
      </View>
    );
  }

  // 📱 Native version (Victory)
  return (
    <View style={{ padding: 10 }}>
      <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
        <VictoryAxis
          tickFormat={(t) => t}
          style={{ tickLabels: { fill: 'white', fontSize: 10 } }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { fill: 'white', fontSize: 10 } }} />
        <VictoryLine
          data={data}
          x="label"
          y="calories"
          style={{ data: { stroke: '#82ca9d', strokeWidth: 3 } }}
          labels={({ datum }) => `${datum.calories} cal`}
          labelComponent={<VictoryTooltip />}
        />
        <VictoryLine
          data={data}
          x="label"
          y="prm"
          style={{ data: { stroke: '#8884d8', strokeWidth: 2 } }}
        />
        <VictoryLine
          data={data}
          x="label"
          y="rpe"
          style={{ data: { stroke: '#f99d1c', strokeWidth: 2 } }}
        />
      </VictoryChart>
    </View>
  );
};
