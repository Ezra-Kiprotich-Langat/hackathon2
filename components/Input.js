import { View, Text, TextInput } from 'react-native';
import { useState } from 'react';

export default function Input({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  error, 
  helperText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  className = '',
  inputClassName = '',
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyles = () => {
    let baseStyles = 'border rounded-lg px-4 py-3 text-base text-gray-800';
    
    if (!editable) {
      baseStyles += ' bg-gray-100 text-gray-500';
    } else if (error) {
      baseStyles += ' border-red-500 bg-red-50';
    } else if (isFocused) {
      baseStyles += ' border-blue-500 bg-white';
    } else {
      baseStyles += ' border-gray-300 bg-white';
    }

    if (multiline) {
      baseStyles += ' text-top';
    }

    return baseStyles;
  };

  const getLabelStyles = () => {
    let baseStyles = 'text-sm font-medium mb-2';
    
    if (error) {
      baseStyles += ' text-red-600';
    } else {
      baseStyles += ' text-gray-700';
    }

    return baseStyles;
  };

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className={getLabelStyles()}>
          {label}
        </Text>
      )}
      
      <TextInput
        className={`${getInputStyles()} ${inputClassName}`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      
      {error && (
        <Text className="text-red-600 text-sm mt-1">
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text className="text-gray-500 text-sm mt-1">
          {helperText}
        </Text>
      )}
    </View>
  );
}

// Usage Examples:
// <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} />
// <Input label="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
// <Input label="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
// <Input label="Description" multiline={true} numberOfLines={4} value={description} onChangeText={setDescription} />
// <Input label="Email" value={email} onChangeText={setEmail} error="Please enter a valid email" />