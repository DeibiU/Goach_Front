import * as React from 'react';
import { Text, View, Alert } from 'react-native';

import { Card } from '@/src/app/components/ui/card';
import { Button } from '@/src/app/components/ui/button';
import TraineeIcon from '../../assets/trainee-icon.svg';

import { TTRelation, User } from '../interfaces/types';
import { Separator } from './ui/separator';
import { useUser } from '../services/user-service';
import { useGym } from '../services/gym-service';
import { Toast } from 'toastify-react-native';

type Props = {
  ttRelation?: TTRelation;
  user?: User;
  gymId?: string;
  onDeleted?: () => void;
};

export function TraineeInfo({ ttRelation, onDeleted, user, gymId }: Props) {
  const { deleteTTRelation } = useUser();
  const { deleteTraineeRelation, deleteTrainerRelation } = useGym();

  const trainee = ttRelation?.trainee ?? user;
  const traineeStatus = ttRelation?.traineeStatus ?? true;
  const paymentStatus = ttRelation?.paymentStatus ?? true;

  const usrStatus = traineeStatus ? 'Currently active' : 'Currently inactive';
  const mbrStatus = paymentStatus ? 'Up-to-Date' : 'Pending';

  const handleDeleteAssociation = async () => {
    try {
      if (!ttRelation) {
        if (user?.role === 'TRAINER') {
          await deleteTrainerRelation(gymId!, user.id!);
        } else {
          await deleteTraineeRelation(gymId!, user?.id!);
        }
        Toast.success('Success! Associate was removed.');
      } else {
        await deleteTTRelation(ttRelation.trainer!.id!, ttRelation.trainee!.id!);
        Toast.success('Success! Trainee was removed.');
      }

      onDeleted?.();
    } catch (err) {
      console.error(err);
      Toast.error('Error! Could not remove trainee.');
    }
  };

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <View className="rounded-2xl ">
        <Card className="items-center justify-center border-border/0 ">
          <View className="flex-row">
            <View className="w-[20%] min-w-[100px] max-h-[200px]">
              <TraineeIcon height="100%" width="100%" className="stroke-blue-500 stroke-[30]" />
            </View>
            <View className="pl-2">
              <Text className="text-2xl text-white">{trainee?.name}</Text>
              <Text className="text-2xl text-white">{usrStatus}</Text>
            </View>
          </View>

          <View className="flex-row items-center w-[60%]">
            <Separator className="flex-1" />
          </View>

          <Text className="text-lg text-white">{trainee?.email}</Text>

          <View className="flex-row items-center w-[80%]">
            <Separator className="flex-1" />
          </View>

          <Text className="text-xl text-white">Height: {trainee?.height} m.</Text>
          <Text className="text-xl text-white">Weight: {trainee?.weight} kgs.</Text>

          <View className="flex-row items-center w-[80%]">
            <Separator className="flex-1" />
          </View>

          <Text className="text-xl text-white">Status: {mbrStatus}</Text>
          {ttRelation?.paymentDate && (
            <Text className="text-xl text-white">
              {new Date(ttRelation.paymentDate).toLocaleDateString()}
            </Text>
          )}
          {ttRelation?.paymentPrice != null && (
            <Text className="text-xl text-white">{`$${ttRelation.paymentPrice}`}</Text>
          )}

          <View className="mt-4 w-full px-4">
            <Button
              variant="destructive"
              className="bg-red-600 w-full text-red-300"
              onPress={handleDeleteAssociation}
            >
              Remove Trainee
            </Button>
          </View>
        </Card>
      </View>
    </View>
  );
}
