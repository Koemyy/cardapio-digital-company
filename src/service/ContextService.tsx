import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface Cliente {
    cli_id:number
    mesa_id: number
    cli_token : string
}

interface QRCodeContextData {
    cliente: Cliente;
    setValue: (cli_id: number , mesa_id: number, cli_token : string) => void;
    getCliente: () => Cliente;
}

export const QRCodeContextData = createContext<QRCodeContextData>({
    cliente: {cli_id: 0, mesa_id: 0, cli_token: ''},
    setValue: () => {
    },
    getCliente: () => {
        return {cli_id: 0, mesa_id: 0, cli_token: ''} ;
    },
});


export const QRCodeProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    const [cliente, setCliente] = useState<Cliente>({cli_id: 0, mesa_id: 0, cli_token: ''});
    const setValue = (cli_id: number ,mesa_id: number, cli_token: string ) =>{
        setCliente({cli_id, mesa_id, cli_token})
    }

    const getCliente = ()=>{
        return cliente;
    }
    
    //buscar value no cookie
    useEffect(() => {
        const ValueCookie = Cookies.get('value');
        if (ValueCookie) {
            setCliente(JSON.parse(ValueCookie));
        }
    }, []);

    
    //salva value no cookie
    useEffect(() => {
        const json = JSON.stringify(cliente)
        Cookies.set('value', json, {expires: 1});
    }, [cliente]);

    return (
        <QRCodeContextData.Provider value={{cliente , setValue, getCliente }}>
            {children}
        </QRCodeContextData.Provider>
    );
}