import { View } from 'react-native';

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'medium',
  shadow = true,
  className = '',
  ...props 
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-white border border-gray-200';
      case 'primary':
        return 'bg-blue-50 border border-blue-200';
      case 'success':
        return 'bg-green-50 border border-green-200';
      case 'warning':
        return 'bg-yellow-50 border border-yellow-200';
      case 'danger':
        return 'bg-red-50 border border-red-200';
      case 'info':
        return 'bg-blue-50 border border-blue-200';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-3';
      case 'medium':
        return 'p-4';
      case 'large':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const getShadowStyles = () => {
    return shadow ? 'shadow-sm' : '';
  };

  return (
    <View 
      className={`rounded-lg ${getVariantStyles()} ${getPaddingStyles()} ${getShadowStyles()} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}

// Usage Examples:
// <Card><Text>Default card</Text></Card>
// <Card variant="primary" padding="large"><Text>Primary card with large padding</Text></Card>
// <Card variant="success" shadow={false}><Text>Success card without shadow</Text></Card>
// <Card variant="transparent" padding="none"><Text>Transparent card</Text></Card>