// Google Gemini API client for AI question generation

// Configuration
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || 'your-gemini-api-key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Helper function to make API requests
const makeGeminiRequest = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API request failed:', error);
    throw error;
  }
};

// Question generation functions
export const geminiHelpers = {
  // Generate multiple choice questions from text content
  generateMultipleChoiceQuestions: async (textContent, options = {}) => {
    const {
      count = 10,
      difficulty = 'medium',
      topics = [],
      language = 'English'
    } = options;

    const topicsText = topics.length > 0 ? `Focus on these topics: ${topics.join(', ')}.` : '';
    
    const prompt = `
Generate ${count} multiple choice questions based on the following text content.

Difficulty level: ${difficulty}
Language: ${language}
${topicsText}

Text content:
${textContent}

Please format the response as a JSON array with the following structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Explanation of why this is the correct answer",
    "topic": "Main topic this question covers",
    "difficulty": "easy|medium|hard"
  }
]

Rules:
- Make questions clear and unambiguous
- Ensure only one option is clearly correct
- Include plausible distractors
- Provide detailed explanations
- Cover different aspects of the content
- Vary question types (factual, conceptual, application)
- Return only valid JSON, no additional text
`;

    try {
      const response = await makeGeminiRequest(prompt);
      
      // Clean up the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const questions = JSON.parse(jsonMatch[0]);
      
      // Validate the structure
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }
      
      // Validate each question
      questions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || 
            typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Invalid question structure at index ${index}`);
        }
      });
      
      return { questions, error: null };
    } catch (error) {
      console.error('Failed to generate questions:', error);
      return { questions: null, error: error.message };
    }
  },

  // Generate true/false questions
  generateTrueFalseQuestions: async (textContent, options = {}) => {
    const {
      count = 5,
      difficulty = 'medium',
      language = 'English'
    } = options;

    const prompt = `
Generate ${count} true/false questions based on the following text content.

Difficulty level: ${difficulty}
Language: ${language}

Text content:
${textContent}

Please format the response as a JSON array:
[
  {
    "question": "Statement to evaluate",
    "answer": true,
    "explanation": "Explanation of why this is true/false",
    "topic": "Main topic",
    "difficulty": "easy|medium|hard"
  }
]

Rules:
- Create clear, unambiguous statements
- Mix true and false answers
- Avoid trick questions
- Provide detailed explanations
- Return only valid JSON
`;

    try {
      const response = await makeGeminiRequest(prompt);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const questions = JSON.parse(jsonMatch[0]);
      return { questions, error: null };
    } catch (error) {
      return { questions: null, error: error.message };
    }
  },

  // Generate fill-in-the-blank questions
  generateFillInTheBlankQuestions: async (textContent, options = {}) => {
    const {
      count = 5,
      difficulty = 'medium',
      language = 'English'
    } = options;

    const prompt = `
Generate ${count} fill-in-the-blank questions based on the following text content.

Difficulty level: ${difficulty}
Language: ${language}

Text content:
${textContent}

Please format the response as a JSON array:
[
  {
    "question": "The _____ is responsible for cellular respiration.",
    "answer": "mitochondria",
    "alternatives": ["mitochondrion", "mitochondria"],
    "explanation": "Explanation of the answer",
    "topic": "Main topic",
    "difficulty": "easy|medium|hard"
  }
]

Rules:
- Use _____ to indicate blanks
- Include alternative acceptable answers
- Focus on key terms and concepts
- Provide context in the question
- Return only valid JSON
`;

    try {
      const response = await makeGeminiRequest(prompt);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const questions = JSON.parse(jsonMatch[0]);
      return { questions, error: null };
    } catch (error) {
      return { questions: null, error: error.message };
    }
  },

  // Extract key topics from text content
  extractTopics: async (textContent, maxTopics = 10) => {
    const prompt = `
Analyze the following text and extract the main topics/subjects covered.

Text content:
${textContent}

Please return a JSON array of the top ${maxTopics} topics:
[
  {
    "topic": "Topic name",
    "description": "Brief description of what this topic covers",
    "importance": "high|medium|low"
  }
]

Rules:
- Focus on educational/academic topics
- Order by importance/frequency
- Keep topic names concise
- Return only valid JSON
`;

    try {
      const response = await makeGeminiRequest(prompt);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }
      
      const topics = JSON.parse(jsonMatch[0]);
      return { topics, error: null };
    } catch (error) {
      return { topics: null, error: error.message };
    }
  },

  // Summarize text content
  summarizeContent: async (textContent, maxLength = 500) => {
    const prompt = `
Summarize the following text content in approximately ${maxLength} characters.
Focus on the key concepts, main ideas, and important details.

Text content:
${textContent}

Provide a clear, concise summary that captures the essential information.
`;

    try {
      const summary = await makeGeminiRequest(prompt);
      return { summary: summary.trim(), error: null };
    } catch (error) {
      return { summary: null, error: error.message };
    }
  },

  // Generate study recommendations
  generateStudyRecommendations: async (textContent, userPerformance = {}) => {
    const {
      weakTopics = [],
      strongTopics = [],
      overallScore = 0
    } = userPerformance;

    const prompt = `
Based on the following text content and user performance, generate personalized study recommendations.

Text content:
${textContent}

User Performance:
- Overall Score: ${overallScore}%
- Weak Topics: ${weakTopics.join(', ') || 'None identified'}
- Strong Topics: ${strongTopics.join(', ') || 'None identified'}

Please provide:
1. Specific areas to focus on
2. Study strategies
3. Additional resources or topics to explore
4. Practice recommendations

Format as a clear, actionable list.
`;

    try {
      const recommendations = await makeGeminiRequest(prompt);
      return { recommendations: recommendations.trim(), error: null };
    } catch (error) {
      return { recommendations: null, error: error.message };
    }
  }
};

export default geminiHelpers;