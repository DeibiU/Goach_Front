import React from 'react';
import { Image, Pressable, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageButtonProps {
  imageSource: ImageSourcePropType; // Can be require('./path/to/image.png') or { uri: 'http://...' }
  onPress: () => void;
  imageStyle?: object; // Optional styling for the Image component
  buttonStyle?: object; // Optional styling for the Pressable component
}

const ImageButton: React.FC<ImageButtonProps> = ({
  imageSource,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={imageSource}/>
    </Pressable>
  );
};

export default ImageButton;