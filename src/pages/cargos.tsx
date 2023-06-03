import {useState} from "react";
import Notification from "../components/Notification.tsx";
import {Pencil, Question, Plus} from '@phosphor-icons/react';
function Cargos() {
    const [showNotification, setNotification] = useState(false);

    function notificationPopUp() {
        setNotification(true);
    }

    function hideNotification() {
        setNotification(false);
    }

    return (
        <div className="text-white-300 mx-5 my-4">
            <h1 className="text-3xl mb-4">Cargos</h1>
            <p className="pb-4 font-extralight">Lista de todos os cargos cadastrados no sistema.</p>
            <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-1 p-0"></div>
            <div className="py-4">
                <div className="pb-4">
                    <i onClick={notificationPopUp} className="hover:cursor-pointer right-0 fixed w-5 h-4 mr-5">{<Pencil size={18}/>}</i>
                    <p className="font-bold">Garçom.</p>
                </div>
                <div className="pb-4">
                    <i onClick={notificationPopUp} className="hover:cursor-pointer fixed right-0 w-5 h-4 mr-5">{<Pencil size={18}/>}</i>
                    <p className="font-bold">Chefe de cozinha.</p>
                </div>
                <div className="pb-4">
                    <i onClick={notificationPopUp} className="hover:cursor-pointer fixed right-0 w-5 h-4 mr-5">{<Pencil size={18}/>}</i>
                    <p className="font-bold">Caixa.</p>
                </div>
                <div>
                    <i onClick={notificationPopUp} className="hover:cursor-pointer fixed right-0 w-5 h-4 mr-5">{<Pencil size={18}/>}</i>
                    <p className="font-bold">Gerente.</p>
                </div>
                <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-1 mt-4 p-0"></div>
            </div>
            <div className="flex">
                <i className="text-green-500">{<Plus size={18}/>}</i>
                <p onClick={notificationPopUp} className="hover:bg-black-400 text-white-300 px-4 font-bold">Adicionar cargo</p>
            </div>
            {showNotification && (
                <Notification
                    buttonText="Editar"
                    closePopUp={hideNotification}
                    title="Editar cargo"
                    icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                    description="As alterações desse cargo afetarão todos funcionários que recebem ele."
                    buttonAction={hideNotification}
                />
            )}
        </div>
    )
}

export default Cargos
