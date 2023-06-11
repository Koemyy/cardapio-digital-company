import Notification from "../components/Notification.tsx";
import { useEffect, useState, useContext} from "react";
import {ArrowCircleLeft, Question} from "@phosphor-icons/react";
import {useNavigate} from "react-router-dom";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";
import { listarMesas } from "../service/MesaService.tsx";
import { QRCodeContextData } from "../service/ContextService.tsx";
import { criarCliente } from "../service/ClienteService.tsx";

interface mesa{
    mes_id : number,
    mes_status:string
}

interface Cliente {
    mesa_id: number
    cli_token : string
}


function Qrcode() {
    const [sendMessage, setSendMessage] = useState(false);
    const navigate = useNavigate();
    const [mesas, setMesas] = useState<mesa[]>([]);
    const [cliente, setCliente] = useState<Cliente>({mesa_id: 1, cli_token: ""});
    const {setValue} = useContext(QRCodeContextData)


     useEffect(() => {
         async function fetchMesas() {
             const data = await listarMesas();
             setMesas(data);
         }
         fetchMesas();
     }, []);

    function sendMessageTrue() {
        setSendMessage(true);
    }

    function sendMessageFalse() {
        setSendMessage(false);
    }

    async function handleClick() {
        const cli_token_promisse : Promise<string> = criarCliente(cliente.mesa_id.toString());
        const cli_token: string = await cli_token_promisse;

        setCliente((prevFormulario) => (
            {...prevFormulario, cli_token: cli_token}
        ));
    }

    useEffect(() => {
        if (cliente.cli_token) {
          setValue(cliente.mesa_id, cliente.cli_token);
          navigate("/qrcode-gerado");
        }
      }, [cliente.cli_token]);

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setCliente((prevFormulario) => (
            {...prevFormulario,[name]: value}
        ));
    };

    return (
        <div><HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home"/>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="text-white-300 pt-5 text-center">
                    <h1 className="text-3xl mt-5 md:text-5xl">Selecione</h1>
                    <p className="pt-5 md:text-2xl">Selecione uma das mesas disponiveis abaixo para gerar um Qr-Code</p>
                </div>
                <div className="pt-3">
                    <select className="my-2 mt-4 py-2 text-black-500 text-lg rounded" name="mesa_id" id="selectMesa"
                    onChange={handleChange} value={cliente.mesa_id}>
                        
                        {
                            mesas.map((mesa)=>
                                <option key={mesa.mes_id} value={mesa.mes_id}>Mesa {mesa.mes_id}</option>
                            )
                        }
                        
                        
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
                        description={"Gerar QR Code para a Mesa " + cliente.mesa_id + "?"}
                        buttonText="Gerar"
                        buttonAction={handleClick}
                    />
                )}
            </div>
        </div>
    );
}

export default Qrcode;
