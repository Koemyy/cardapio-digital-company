import {useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Notification from "../components/Notification.tsx";
import {XCircle} from '@phosphor-icons/react';

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
    const [showNotification, setNotification] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const {name, value} = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function notificationPopUp() {
        setNotification(true);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await axios.post<LoginResponse>(
                'https://cardapio-digital-api.onrender.com/colaborador/autenticar/',
                loginData // Enviar os dados de login no corpo da requisição
            );

            console.log(response.data.webToken);

            const {webToken} = response.data; // Extrair o token da resposta da API

            // Salvar o token como um cookie com 1 dia de validade
            Cookies.set('token', webToken, {expires: 1});

            navigate('/home'); // Redirecionar para a página "Compras"


        } catch (error) {
            setError(
                // @ts-ignore
                <>
                    {showNotification && (
                        <Notification
                            buttonText="Voltar"
                            closePopUp={() => setError('')}
                            title="Ocorreu um erro"
                            icon={<i className="flex text-center justify-center text-red-400"><XCircle size={54} /></i>}
                            description="Ocorreu um erro ao realizar login, tente novamente."
                            buttonAction={() => setError('')}
                        />
                    )}
                </>
            );
        }
    };

    return (
        <div className="text-white-300 mx-5 my-4">
            <h1  className="text-3xl mb-4">Login</h1>
            <p className="pb-4 font-extralight">Preencha as informações para logar no sistema.</p>
            {error}
            <form className="text-black-500" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="col_email" className="block mb-2">Email:</label>
                    <input
                        placeholder="E-mail"
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
                        placeholder="Senha"
                        type="password"
                        id="col_senha"
                        name="col_senha"
                        value={loginData.col_senha}
                        onChange={handleInputChange}
                        className="border border-gray-400 px-4 py-2 rounded w-full"
                    />
                </div>
                <button type="submit" onClick={notificationPopUp} className="text-black-500 bg-white-300 font-medium rounded-full md:px-5 mt-2 py-2 px-5 md:mt-3 md:text-2xl">Login
                </button>
            </form>
        </div>
    )
}

export default Login;
