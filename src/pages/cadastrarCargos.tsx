import {useState} from "react";
import Notification from "../components/Notification.tsx";
import {cadastrarCargo} from "../service/CargoService.tsx";
import {ArrowCircleLeft, Question} from '@phosphor-icons/react';
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

function CadastrarCargos() {
    const [showNotification, setNotification] = useState(false);
    const [cargo, setCargo] = useState<string>();

    async function notificationPopUp() {

        if (await cadastrarCargo(cargo !== undefined ? cargo : ''))
            setNotification(true);
    }

    function hideNotification() {
        setNotification(false);
    }


    const handleChange = (event: any) => {
        const {value} = event.target;
        setCargo(value);
    };

    return (
        <div><HeaderEmpresa icon={<ArrowCircleLeft size={40} />} to="/home"/>
            <div className="text-white-300 mx-5 my-4">
                <h1 className="text-3xl mb-4">Cadastrar cargos</h1>
                <p className="pb-4 font-extralight">Para conceder uma permissão clique no checkbox ao lado da opção
                    desejada.</p>
                <form action="">
                    <label form="nome-cargo">Nome do cargo: </label>
                    <input name="nome-cargo" id="nome-cargo" className="mb-2 text-black-500 text-lg rounded"
                           value={cargo}
                           onChange={handleChange}/>
                </form>
                <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-1 p-0"></div>
                <div className="py-4">
                    <div className="pb-4">
                        <input className="right-0 fixed w-5 h-4 mr-5" type="checkbox"/>
                        <p className="font-bold">Privilégio</p>
                    </div>
                    <div className="pb-4">
                        <input className="fixed right-0 w-5 h-4 mr-5" type="checkbox"/>
                        <p className="font-bold">Privilégio</p>
                    </div>
                    <div>
                        <input className="fixed right-0 w-5 h-4 mr-5" type="checkbox"/>
                        <p className="font-bold">Privilégio</p>
                    </div>
                    <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-4 p-0"></div>
                </div>
                <div className="flex items-center content-center justify-center pt-4">
                    <button onClick={notificationPopUp}
                            className="hover:bg-black-400 hover:text-white-300 bg-white-300 px-4 py-4 rounded-3xl text-black-500 font-bold">Cadastrar
                    </button>
                </div>
                {showNotification && (
                    <Notification
                        buttonText="Cadastrar"
                        closePopUp={hideNotification}
                        title="Deseja cadastrar o cargo?"
                        icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                        description="Ao criar o cargo ele será exibido na página de cargos."
                        buttonAction={hideNotification}
                    />
                )}
            </div>
        </div>
    )
}

export default CadastrarCargos
