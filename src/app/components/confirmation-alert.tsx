import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/app/components/ui/alert-dialog';
import { Text } from '@/src/app/components/ui/text';
import React from 'react';

interface ConfirmationAlertProps {
  title: string;
  message: string;
  confirmation: boolean;
}

export function ConfirmationAlert({ title, message, confirmation }: ConfirmationAlertProps) {
  const handleClose = (result: boolean) => {
    confirmation = result;
  };

  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onPress={() => handleClose(false)}>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={() => handleClose(true)}>
            <Text>Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
