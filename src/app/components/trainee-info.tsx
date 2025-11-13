import * as React from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/src/app/components/ui/card';
import TraineeIcon from '../../assets/trainee-icon.svg';

import { TTRelation } from '../interfaces/types';
import { Separator } from './ui/separator';

type Props = {
  ttRelation: TTRelation | any;
};

export function TraineeInfo({ ttRelation }: Props) {
  const usrStatus = React.useState(
    ttRelation.traineeStatus ? 'Currently active' : 'Currently inactive',
  );
  const mbrStatus = React.useState(ttRelation.paymentStatus ? 'Up-to-Date' : 'Pending');

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="items-center justify-center border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <View className="flex-row">
          <View className="w-[20%] min-w-[100px] max-h-[200px]">
            <TraineeIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
          </View>
          <View className="pl-2">
            <Text className="text-2xl text-white">{ttRelation.trainee?.name}</Text>
            <Text className="text-2xl text-white">{usrStatus[0]}</Text>
          </View>
        </View>
        <View className="flex-row items-center w-[60%]">
          <Separator className="flex-1" />
        </View>
        <Text className="text-lg text-white">{ttRelation.trainee?.email}</Text>
        <View className="flex-row items-center w-[80%]">
          <Separator className="flex-1" />
        </View>
        <Text className="text-xl text-white">Height: {ttRelation.trainee?.height} m.</Text>
        <Text className="text-xl text-white">Weight: {ttRelation.trainee?.weight} kgs.</Text>
        <View className="flex-row items-center w-[80%]">
          <Separator className="flex-1" />
        </View>
        <Text className="text-xl text-white">Status: {mbrStatus[0]}</Text>
        <Text className="text-xl text-white">{ttRelation?.paymentDate}</Text>
        <Text className="text-xl text-white">{ttRelation?.paymentPrice}</Text>
      </Card>
    </View>
  );
}
