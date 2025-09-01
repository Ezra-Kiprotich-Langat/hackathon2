// Export all lib utilities from a single entry point

export { default as supabase } from './supabase';
export { default as gemini } from './gemini';
export { default as utils } from './utils';

// Re-export specific utilities for convenience
export {
  fileUtils,
  validationUtils,
  formatUtils,
  quizUtils,
  storageUtils,
  errorUtils
} from './utils';

// Export individual functions from supabase for direct access
export {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  getCurrentSession,
  resetPassword,
  uploadFile,
  getPublicUrl,
  downloadFile,
  deleteFile,
  insertData,
  selectData,
  updateData,
  deleteData
} from './supabase';

// Export individual functions from gemini for direct access
export {
  generateMultipleChoiceQuestions,
  generateTrueFalseQuestions,
  generateFillInTheBlankQuestions,
  extractTopics,
  summarizeContent,
  generateStudyRecommendations
} from './gemini';