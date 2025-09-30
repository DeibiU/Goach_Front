import React from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../../interfaces/IUser';

const profile = () => {
	const user = React.useState<IUser>();
	return (
		<View className="flex-1 justify-center bg-black pl-10 pt-20 ">
			<Text className="text-7xl font-bold text-blue-500">RAAAAAAH LET'S SWEAT STEEL </Text>
		</View>
	);
};

export default profile;
