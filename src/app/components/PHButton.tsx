import React from 'react';
import { Pressable, Text, PressableProps } from 'react-native';
import { usePostHog } from 'posthog-react-native';

interface PHButtonProps extends PressableProps {
  label: string;
  phEvent?: string;
  onPress?: () => void;
  textClassName?: string;
  variant?: 'default' | 'link' | 'ghost';
}

export const PHButton: React.FC<PHButtonProps> = ({
  label,
  phEvent,
  onPress,
  textClassName,
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const ph = usePostHog();

  const handlePress = () => {
    const eventName = phEvent ?? `click_${label.replace(/\s+/g, '_').toLowerCase()}`;
    ph.capture(eventName);

    onPress?.();

    console.log('PRESIONASTE EL BOTONS SIU');
  };

  // estilos base condicionales para variantes
  const variantClasses =
    variant === 'ghost' ? 'bg-transparent' : variant === 'link' ? 'bg-transparent p-0' : '';

  return (
    <Pressable onPress={handlePress} className={`${variantClasses} ${className ?? ''}`} {...props}>
      {children ? children : <Text className={textClassName}>{label}</Text>}
    </Pressable>
  );
};
