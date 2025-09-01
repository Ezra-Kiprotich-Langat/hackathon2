import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return disabled || loading 
          ? 'bg-gray-400' 
          : 'bg-blue-500 active:bg-blue-600';
      case 'secondary':
        return disabled || loading 
          ? 'bg-gray-200 border-gray-300' 
          : 'bg-white border-gray-300 border active:bg-gray-50';
      case 'success':
        return disabled || loading 
          ? 'bg-gray-400' 
          : 'bg-green-500 active:bg-green-600';
      case 'danger':
        return disabled || loading 
          ? 'bg-gray-400' 
          : 'bg-red-500 active:bg-red-600';
      case 'outline':
        return disabled || loading 
          ? 'border-gray-300 border' 
          : 'border-blue-500 border active:bg-blue-50';
      default:
        return 'bg-blue-500';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-4';
      case 'medium':
        return 'py-3 px-6';
      case 'large':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'text-center font-semibold';
    
    // Size styles
    const sizeStyles = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    }[size] || 'text-base';

    // Color styles
    let colorStyles = '';
    if (disabled || loading) {
      colorStyles = variant === 'secondary' || variant === 'outline' 
        ? 'text-gray-400' 
        : 'text-white';
    } else {
      switch (variant) {
        case 'primary':
        case 'success':
        case 'danger':
          colorStyles = 'text-white';
          break;
        case 'secondary':
          colorStyles = 'text-gray-700';
          break;
        case 'outline':
          colorStyles = 'text-blue-500';
          break;
        default:
          colorStyles = 'text-white';
      }
    }

    return `${baseStyles} ${sizeStyles} ${colorStyles}`;
  };

  return (
    <TouchableOpacity
      className={`rounded-lg ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'secondary' || variant === 'outline' ? '#6B7280' : '#FFFFFF'} 
        />
      ) : (
        <Text className={getTextStyles()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// Usage Examples:
// <Button title="Primary Button" onPress={() => {}} />
// <Button title="Secondary" variant="secondary" onPress={() => {}} />
// <Button title="Loading..." loading={true} onPress={() => {}} />
// <Button title="Disabled" disabled={true} onPress={() => {}} />
// <Button title="Large Success" variant="success" size="large" onPress={() => {}} />