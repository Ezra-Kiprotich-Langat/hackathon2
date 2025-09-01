// Utility functions for common operations

// File handling utilities
export const fileUtils = {
  // Validate file type
  isValidFileType: (fileName, allowedTypes = ['pdf', 'docx', 'txt', 'jpg', 'jpeg', 'png']) => {
    if (!fileName) return false;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    return allowedTypes.includes(extension);
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Get file extension
  getFileExtension: (fileName) => {
    if (!fileName) return '';
    return fileName.split('.').pop()?.toLowerCase() || '';
  },

  // Get file name without extension
  getFileNameWithoutExtension: (fileName) => {
    if (!fileName) return '';
    return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  },

  // Generate unique file name
  generateUniqueFileName: (originalName) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = fileUtils.getFileExtension(originalName);
    const nameWithoutExt = fileUtils.getFileNameWithoutExtension(originalName);
    
    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
  },

  // Check if file size is within limit
  isFileSizeValid: (sizeInBytes, maxSizeInMB = 10) => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return sizeInBytes <= maxSizeInBytes;
  }
};

// Validation utilities
export const validationUtils = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password validation
  isValidPassword: (password, minLength = 8) => {
    if (!password || password.length < minLength) return false;
    
    // Check for at least one uppercase, one lowercase, and one number
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    return hasUppercase && hasLowercase && hasNumber;
  },

  // Check if passwords match
  doPasswordsMatch: (password, confirmPassword) => {
    return password === confirmPassword;
  },

  // Validate required fields
  validateRequiredFields: (fields) => {
    const errors = {};
    
    Object.entries(fields).forEach(([key, value]) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Sanitize input text
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .trim()
      .replace(/[<>"'&]/g, '') // Remove potentially harmful characters
      .substring(0, 1000); // Limit length
  }
};

// Formatting utilities
export const formatUtils = {
  // Format time duration
  formatDuration: (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  },

  // Format date
  formatDate: (date, options = {}) => {
    const {
      includeTime = false,
      format = 'short' // 'short', 'long', 'numeric'
    } = options;
    
    const dateObj = new Date(date);
    
    if (includeTime) {
      return dateObj.toLocaleString();
    }
    
    switch (format) {
      case 'long':
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'numeric':
        return dateObj.toLocaleDateString('en-US');
      default:
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
    }
  },

  // Format percentage
  formatPercentage: (value, decimals = 0) => {
    return `${value.toFixed(decimals)}%`;
  },

  // Capitalize first letter
  capitalize: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Truncate text
  truncateText: (text, maxLength = 100, suffix = '...') => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  }
};

// Quiz utilities
export const quizUtils = {
  // Calculate quiz score
  calculateScore: (answers, questions) => {
    if (!answers || !questions || questions.length === 0) {
      return { score: 0, correct: 0, total: 0, percentage: 0 };
    }
    
    let correct = 0;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    
    return {
      score: percentage,
      correct,
      total: questions.length,
      percentage
    };
  },

  // Get performance level based on score
  getPerformanceLevel: (score) => {
    if (score >= 90) return { level: 'Excellent', color: 'green', icon: '🏆' };
    if (score >= 80) return { level: 'Very Good', color: 'blue', icon: '🎉' };
    if (score >= 70) return { level: 'Good', color: 'yellow', icon: '👍' };
    if (score >= 60) return { level: 'Fair', color: 'orange', icon: '📚' };
    return { level: 'Needs Improvement', color: 'red', icon: '💪' };
  },

  // Shuffle array (for randomizing questions/options)
  shuffleArray: (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Generate quiz statistics
  generateQuizStats: (answers, questions, timeSpent) => {
    const scoreData = quizUtils.calculateScore(answers, questions);
    const avgTimePerQuestion = timeSpent / questions.length;
    
    // Analyze topic performance
    const topicStats = {};
    questions.forEach((question, index) => {
      const topic = question.topic || 'General';
      if (!topicStats[topic]) {
        topicStats[topic] = { correct: 0, total: 0 };
      }
      topicStats[topic].total++;
      if (answers[index] === question.correctAnswer) {
        topicStats[topic].correct++;
      }
    });
    
    // Convert to array with percentages
    const topicPerformance = Object.entries(topicStats).map(([topic, stats]) => ({
      topic,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));
    
    return {
      ...scoreData,
      timeSpent,
      avgTimePerQuestion: Math.round(avgTimePerQuestion),
      topicPerformance,
      performanceLevel: quizUtils.getPerformanceLevel(scoreData.percentage)
    };
  }
};

// Storage utilities
export const storageUtils = {
  // Generate storage path for user files
  generateUserFilePath: (userId, fileName) => {
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `users/${userId}/documents/${Date.now()}_${sanitizedFileName}`;
  },

  // Generate storage path for quiz results
  generateQuizResultPath: (userId, quizId) => {
    return `users/${userId}/results/${quizId}.json`;
  }
};

// Error handling utilities
export const errorUtils = {
  // Get user-friendly error message
  getUserFriendlyError: (error) => {
    if (typeof error === 'string') return error;
    
    const errorMessage = error?.message || 'An unexpected error occurred';
    
    // Map common errors to user-friendly messages
    const errorMap = {
      'Network request failed': 'Please check your internet connection and try again.',
      'Invalid email or password': 'The email or password you entered is incorrect.',
      'User already registered': 'An account with this email already exists.',
      'File too large': 'The selected file is too large. Please choose a smaller file.',
      'Invalid file type': 'This file type is not supported. Please select a PDF, DOCX, TXT, or image file.',
      'Session expired': 'Your session has expired. Please sign in again.'
    };
    
    return errorMap[errorMessage] || errorMessage;
  },

  // Log error for debugging
  logError: (error, context = '') => {
    console.error(`[${context}] Error:`, error);
    
    // In production, you might want to send this to a logging service
    // like Sentry, LogRocket, etc.
  }
};

// Export all utilities as default
export default {
  fileUtils,
  validationUtils,
  formatUtils,
  quizUtils,
  storageUtils,
  errorUtils
};