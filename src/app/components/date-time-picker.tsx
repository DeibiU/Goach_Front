import React, { useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createTheme } from '@mui/material/styles';

interface PlatformDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export const PlatformDatePicker = ({ value, onChange, label }: PlatformDatePickerProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false);

  // 🧠 En web: import dinámico para evitar errores en Expo Go
  if (Platform.OS === 'web') {
    const { LocalizationProvider } = require('@mui/x-date-pickers/LocalizationProvider');
    const { AdapterDayjs } = require('@mui/x-date-pickers/AdapterDayjs');
    const { DatePicker } = require('@mui/x-date-pickers/DatePicker');

    return (
      <View style={{ width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label || 'Select date'}
            value={value ? dayjs(value) : null}
            onChange={(newValue: any) => {
              if (newValue) onChange(newValue.toDate());
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </View>
    );
  }

  // 🧩 En móvil: usa DateTimePickerModal
  return (
    <View style={{ width: '100%' }}>
      <Button title={label || 'Select date'} onPress={() => setPickerVisible(true)} />
      <Text style={{ color: 'white', marginTop: 8 }}>
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
