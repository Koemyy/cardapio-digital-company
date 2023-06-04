import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LoginData {
  col_email: string;
  col_senha: string;
}

interface LoginResponse {
    webToken: string;
  }

function Login(): JSX.Element {
  const [loginData, setLoginData] = useState<LoginData>({
    col_email: '',
    col_senha: '',
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post<LoginResponse>(
        'http://localhost:3000/colaborador/autenticar/',
        loginData // Enviar os dados de login no corpo da requisição
      );

      console.log(response.data.webToken);

      const { webToken } = response.data; // Extrair o token da resposta da API

      // Salvar o token como um cookie com 1 dia de validade
      Cookies.set('token', webToken, { expires: 1 });

      navigate('/home'); // Redirecionar para a página "Compras"

    } catch (error) {
      setError('Ocorreu um erro ao fazer login. Verifique suas credenciais.');
        /*
      setLoginData({
        col_email: '',
        col_senha: '',
      });*/
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3 bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="col_email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="col_email"
              name="col_email"
              value={loginData.col_email}
              onChange={handleInputChange}
              className="border border-gray-400 px-4 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="col_senha" className="block mb-2">Senha:</label>
            <input
              type="password"
              id="col_senha"
              name="col_senha"
              value={loginData.col_senha}
              onChange={handleInputChange}
              className="border border-gray-400 px-4 py-2 rounded w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
