import Notification from "../components/Notification.tsx";
import {useState} from "react";
import {ArrowCircleLeft, Question} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

function Qrcode() {
    const [sendMessage, setSendMessage] = useState(false);
    const navigate = useNavigate();

    function sendMessageTrue() {
        setSendMessage(true);
    }

    function sendMessageFalse() {
        setSendMessage(false);
    }

    function handleClick() {
        return navigate("/qrcode-gerado")
    }

    return (
        <div><HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home"/>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="text-white-300 pt-5 text-center">
                    <h1 className="text-3xl mt-5 md:text-5xl">Selecione</h1>
                    <p className="pt-5 md:text-2xl">Selecione uma das mesas disponiveis abaixo para gerar um Qr-Code</p>
                </div>
                <div className="pt-3">
                    <select className="my-2 mt-4 py-2 text-black-500 text-lg rounded" name="selectMesa" id="selectMesa">
                        <option value="mesa01">Mesa 01</option>
                        <option value="mesa02">Mesa 02</option>
                        <option value="mesa03">Mesa 03</option>
                        <option value="mesa04">Mesa 04</option>
                    </select>
                </div>
                <button onClick={sendMessageTrue} className="mt-8 bg-black-400 rounded-full text-lg px-5 py-1">
                    <label className="text-white-300 text-center">Gerar</label>
                </button>
                {sendMessage && (
                    <Notification
                        closePopUp={sendMessageFalse}
                        title="Gerar QR Code"
                        icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                        description="Gerar QR Code para a Mesa 01?"
                        buttonText="Gerar"
                        buttonAction={handleClick}
                    />
                )}
            </div>
        </div>
    );
}

export default Qrcode;
