import axios from 'axios'

// This would be your AI service API endpoint
const AI_API_URL = 'https://your-ai-service-api.com'

export const checkPlagiarism = async (text) => {
  try {
    const response = await axios.post(`${AI_API_URL}/check-plagiarism`, { text })
    return response.data
  } catch (error) {
    console.error('Error checking plagiarism:', error)
    throw error
  }
}

export const validateCitations = async (text, citationStyle = 'APA') => {
  try {
    const response = await axios.post(`${AI_API_URL}/validate-citations`, { 
      text, 
      citationStyle 
    })
    return response.data
  } catch (error) {
    console.error('Error validating citations:', error)
    throw error
  }
}

export const getResearchSuggestions = async (topic) => {
  try {
    const response = await axios.post(`${AI_API_URL}/research-suggestions`, { topic })
    return response.data
  } catch (error) {
    console.error('Error getting research suggestions:', error)
    throw error
  }
}

export const predictCitations = async (abstract) => {
  try {
    const response = await axios.post(`${AI_API_URL}/predict-citations`, { abstract })
    return response.data
  } catch (error) {
    console.error('Error predicting citations:', error)
    throw error
  }
}