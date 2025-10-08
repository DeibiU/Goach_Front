import React from 'react';
import { Text, View } from 'react-native';

import { BiometricsForm } from '../components/biometrics-form';
import { SignUpForm } from '../components/sign-up-form';

const account = () => {
    return (
        <View className="flex-1 gap-7 justify-center bg-black px-10">
            <Text className="text-7xl font-bold text-blue-500">Register 2.0 coming soon</Text>
            <SignUpForm></SignUpForm>
            <Text className="text-7xl font-bold text-blue-500">Biometrics</Text>
            <BiometricsForm></BiometricsForm>
        </View>
    );
};

export default account;
