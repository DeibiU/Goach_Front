// import { Link } from 'expo-router';
// import React from 'react';
// import { Text, View } from 'react-native';

// const register = () => {
// 	return (
// 		<View className="flex-1 items-center justify-center bg-black ">
// 			<Text className="p.05 text-4xl font-bold text-blue-500">Register, yeah yeah Sign In!!</Text>
// 			<div className="text-nowrap">
// 				<Text className="text-white ">
// 					If you're already registered, maybe it was the{' '}
// 					<Link
// 						href="/login"
// 						className="text-green-400"
// 						style={{ textDecorationLine: 'underline' }}
// 					>
// 						Login
// 					</Link>
// 					{' '}you were looking for.
// 				</Text>
// 			</div>
// 		</View>
// 	);
// };

// export default register;
import { ScrollView, View } from 'react-native';

import { SignUpForm } from '@/src/app/components/sign-up-form';
import Logo from '../assets/logo.svg';

/**
 *
 */
export default function SignUpScreen() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 relative items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe bg-black"
      keyboardDismissMode="interactive"
    >
      <Logo
        height="20%"
        width="100%"
        className="opacity-10% absolute inset-0 -rotate-45 fill-gray-400"
      />

      <View className="w-full max-w-sm">
        <SignUpForm />
      </View>
    </ScrollView>
  );
}
