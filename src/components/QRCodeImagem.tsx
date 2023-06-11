import QRCode from 'react-qr-code';
import {Link} from "react-router-dom";
import {ArrowCircleLeft} from "@phosphor-icons/react";
import { useContext } from 'react';
import { QRCodeContextData } from '../service/ContextService';

function QRCodeImagem() {
const {getCliente} = useContext(QRCodeContextData)
const cliente = getCliente();
const url = `https://cardapio-digital-client-git-sprint2-autenticacao-josimarbazilio.vercel.app/inicio?id=${cliente.mesa_id}&token=${cliente.cli_token}`;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full">
            <div
                className="text-black-500 justify-center items-center w-full h-full text-center border-2 rounded-2xl bg-grey-300 border-b-black-500">
                <Link to="/qrcode"><ArrowCircleLeft className="text-black-500 ml-4 mt-4 font-bold" size={42}/>
                </Link>
                <div className="md:py-24 py-20 text-black-500 md:text-3xl">
                    <p>Aponte a câmera do seu celular para o</p>
                    <p>QR-Code abaixo!</p>
                </div>
                <button>
                    <QRCode style={{height: 'auto', maxWidth: '100%', width: '100%'}}
                            size={256}
                            value={url}
                    />
                </button>
                <div className="py-10 md:text-xl">
                    <p className="text-black-500">QR-Code referente a</p>
                    <p className="text-green-500 font-bold">Mesa {cliente.mesa_id}</p>
                </div>
            </div>
        </div>
    );
}

export default QRCodeImagem;
