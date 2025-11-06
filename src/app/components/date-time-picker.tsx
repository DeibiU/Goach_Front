import React, { useState } from 'react';
import { Platform, View, Button, Text } from 'react-native';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface PlatformDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export const PlatformDatePicker = ({ value, onChange, label }: PlatformDatePickerProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <View className="w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label || 'Select date'}
            value={value ? dayjs(value) : null}
            onChange={(newValue) => {
              if (newValue) onChange(newValue.toDate());
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </View>
    );
  }

  return (
    <View className="w-full">
      <Button title={label || 'Select date'} onPress={() => setPickerVisible(true)} />
      <Text className="text-white mt-2">
        {value ? value.toLocaleDateString() : 'No date selected'}
      </Text>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="date"
        date={value || new Date()}
        onConfirm={(date) => {
          onChange(date);
          setPickerVisible(false);
        }}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};
