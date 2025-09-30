import React from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../../interfaces/IUser';

const userLink = () => {
	const user = React.useState<IUser>();
	return (
		<View className="flex-1 justify-center bg-black pl-10 pt-20 ">
			<Text className="text-7xl font-bold text-blue-500">Bepis has a trainer! </Text>
		</View>
	);
};

export default userLink;
