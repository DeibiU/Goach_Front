import { Button } from '@/src/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/app/components/ui/card';
import { Text } from '@/src/app/components/ui/text';
import * as React from 'react';
import { View, Alert } from 'react-native';
import { TTRelation } from '../interfaces/types';
import { useUser } from '../services/user-service';
import { useAuth } from '../services/auth-service';
import { Toast } from 'toastify-react-native';

interface LinkRequestModalProps {
  visible: boolean;
  onClose: () => void;
  relation: TTRelation;
}

export function LinkRequestModal({ visible, onClose, relation }: LinkRequestModalProps) {
  const { respondLinkRequest } = useUser();
  const { user } = useAuth();

  if (!visible) return null;

  const handleResponse = async (accept: boolean) => {
    if (!relation.trainer || !relation.trainee) {
      Toast.warn('Invalid relation data');
      return;
    }

    try {
      const res = await respondLinkRequest(accept, relation.trainer.id, relation);

      if (accept) {
        Toast.success('Success! You are now linked with your trainer.');
      } else {
        Toast.info('Request Rejected! You rejected the trainer link request.');
      }

      onClose();
      console.log('Response:', res);
    } catch (err) {
      console.error('Error responding to link request:', err);
      Toast.error('Error! Something went wrong while responding to the request.');
    }
  };

  return (
    <View className="sm:flex-1 items-center justify-center px-4 sm:py-4 sm:p-6 mt-safe bg-black bg-opacity-[45%]">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5 w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Link Request</CardTitle>
          <CardDescription className="text-center">
            {relation.trainer?.name ?? 'Someone'} wants to link up with you to help you train!
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-4">
            <Button className="w-full" onPress={() => handleResponse(true)}>
              <Text>Let's LinkUp 💪</Text>
            </Button>
            <Button className="w-full bg-red-500" onPress={() => handleResponse(false)}>
              <Text>Reject ❌</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
