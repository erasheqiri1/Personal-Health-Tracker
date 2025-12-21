import React from 'react';
import { TouchableOpacity } from 'react-native';

function AnimatedButton({ onPress, disabled, children, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}

export default AnimatedButton;