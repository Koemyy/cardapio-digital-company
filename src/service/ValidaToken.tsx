import axios from 'axios';

const API_URL = 'http://localhost:3000/colaborador/testar/';

async function validaToken(token: string): Promise<boolean> {
  try {
    const response = await axios.post(API_URL, { token });
    return response.data.valid;
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return false;
  }
}

export default validaToken;
