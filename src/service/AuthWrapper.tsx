import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import validaToken from './ValidaToken';

interface AuthWrapperProps {
  children: React.ReactNode;
}

function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  const tokenCookie = Cookies.get('token');
  const [isTokenValid, setTokenValid] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkTokenValidity() {
      let token = '';

      if (tokenCookie) {
        token = tokenCookie.replace('Bearer ', '');
      }

      if (token) {
        const isValid = await validaToken(token);
        setTokenValid(isValid);

        if (!isValid) {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }

      setLoading(false);
    }

    checkTokenValidity();
  }, [tokenCookie, navigate]);

  if (isLoading) {
    return <p>Verificando a validade do token...</p>;
  }

  return <>{isTokenValid && children}</>;
}

export default AuthWrapper;