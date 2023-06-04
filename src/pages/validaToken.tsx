import axios from 'axios';

const API_URL = 'https://api.example.com/validate-token';

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await axios.post(API_URL, { token });
    return response.data.valid;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return false;
  }
}

export default validateToken;
