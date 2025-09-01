import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function UploadScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);

  const supportedFormats = [
    { name: 'PDF', icon: '📄', description: 'Portable Document Format' },
    { name: 'DOCX', icon: '📝', description: 'Microsoft Word Document' },
    { name: 'TXT', icon: '📃', description: 'Plain Text File' },
    { name: 'JPG/PNG', icon: '🖼️', description: 'Image Files' }
  ];

  const handleFilePicker = async () => {
    try {
      // TODO: Implement Expo DocumentPicker
      console.log('Opening file picker...');
      
      // Simulate file selection for now
      const mockFile = {
        name: 'sample-document.pdf',
        size: 1024000, // 1MB
        type: 'application/pdf',
        uri: 'file://mock-path/sample-document.pdf'
      };
      
      setSelectedFile(mockFile);
      Alert.alert('File Selected', `Selected: ${mockFile.name}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to select file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    setUploading(true);
    setExtracting(false);

    try {
      // TODO: Implement file upload to Supabase Storage
      console.log('Uploading file:', selectedFile);
      
      // Simulate upload process
      setTimeout(() => {
        setUploading(false);
        setExtracting(true);
        
        // Simulate text extraction
        setTimeout(() => {
          setExtracting(false);
          Alert.alert(
            'Success!', 
            'File uploaded and text extracted successfully!',
            [
              { 
                text: 'Generate Questions', 
                onPress: () => router.push('/questions')
              }
            ]
          );
        }, 2000);
      }, 1500);
    } catch (error) {
      setUploading(false);
      setExtracting(false);
      Alert.alert('Error', 'Upload failed. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Upload Document</Text>
          <Text className="text-gray-600 text-center">
            Upload your study material to generate practice questions
          </Text>
        </View>

        {/* Supported Formats */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Supported Formats</Text>
          <View className="space-y-3">
            {supportedFormats.map((format, index) => (
              <View key={index} className="flex-row items-center bg-gray-50 p-4 rounded-lg">
                <Text className="text-2xl mr-4">{format.icon}</Text>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">{format.name}</Text>
                  <Text className="text-gray-600 text-sm">{format.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* File Selection */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Select File</Text>
          
          {!selectedFile ? (
            <TouchableOpacity 
              className="border-2 border-dashed border-blue-300 rounded-lg p-8 items-center"
              onPress={handleFilePicker}
            >
              <Text className="text-4xl mb-4">📁</Text>
              <Text className="text-blue-500 font-semibold text-lg mb-2">
                Tap to Select File
              </Text>
              <Text className="text-gray-500 text-center">
                Choose a PDF, DOCX, TXT, or image file\n(Max size: 10MB)
              </Text>
            </TouchableOpacity>
          ) : (
            <View className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">📄</Text>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800" numberOfLines={1}>
                      {selectedFile.name}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {formatFileSize(selectedFile.size)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity 
                  onPress={() => setSelectedFile(null)}
                  className="ml-2"
                >
                  <Text className="text-red-500 font-semibold">Remove</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                className="bg-gray-100 py-2 px-4 rounded border border-gray-300"
                onPress={handleFilePicker}
              >
                <Text className="text-gray-700 text-center font-medium">
                  Choose Different File
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Upload Button */}
        <TouchableOpacity 
          className={`py-4 px-6 rounded-lg mb-6 ${
            uploading || extracting ? 'bg-gray-400' : 'bg-blue-500'
          }`}
          onPress={handleUpload}
          disabled={uploading || extracting || !selectedFile}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {uploading ? 'Uploading...' : extracting ? 'Extracting Text...' : 'Upload & Process'}
          </Text>
        </TouchableOpacity>

        {/* Processing Status */}
        {(uploading || extracting) && (
          <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <Text className="text-yellow-800 font-medium text-center">
              {uploading && '📤 Uploading file to server...'}
              {extracting && '🔍 Extracting text from document...'}
            </Text>
            <Text className="text-yellow-600 text-sm text-center mt-1">
              This may take a few moments
            </Text>
          </View>
        )}

        {/* Info Section */}
        <View className="bg-blue-50 rounded-lg p-4">
          <Text className="text-blue-800 font-medium mb-2">💡 How it works:</Text>
          <Text className="text-blue-700 text-sm leading-5">
            1. Upload your study document\n
            2. Our AI extracts and analyzes the text\n
            3. Generate personalized practice questions\n
            4. Test your knowledge and get instant feedback
          </Text>
        </View>

        {/* Demo Note */}
        <View className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-gray-700 text-sm text-center">
            🚧 Demo Mode: File upload will be implemented with Expo DocumentPicker and Supabase Storage
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}