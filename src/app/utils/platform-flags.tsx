import {Platform} from 'react-native';

export const isWeb: boolean = Platform.OS === "web";
export const isAndroid: boolean = Platform.OS === "android";