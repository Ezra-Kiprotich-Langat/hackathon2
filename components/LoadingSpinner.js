import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingSpinner({ 
  size = 'large', 
  color = '#3B82F6', 
  text = '', 
  overlay = false,
  className = '' 
}) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return size;
    }
  };

  const content = (
    <View className={`items-center justify-center ${className}`}>
      <ActivityIndicator size={getSize()} color={color} />
      {text && (
        <Text className="text-gray-600 mt-3 text-center font-medium">
          {text}
        </Text>
      )}
    </View>
  );

  if (overlay) {
    return (
      <View className="absolute inset-0 bg-white bg-opacity-80 items-center justify-center z-50">
        {content}
      </View>
    );
  }

  return content;
}

// Usage Examples:
// <LoadingSpinner />
// <LoadingSpinner size="small" />
// <LoadingSpinner text="Loading questions..." />
// <LoadingSpinner overlay={true} text="Processing document..." />
// <LoadingSpinner color="#10B981" text="Uploading file..." />