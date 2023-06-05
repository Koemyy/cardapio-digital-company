import {useEffect, useState} from "react";
import Notification from "../components/Notification.tsx";
import {Pencil, Question, Plus, ArrowCircleLeft} from '@phosphor-icons/react';
import { listarCargo } from "../service/CargoService.tsx";
import {useNavigate} from "react-router-dom";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

interface Cargo {
    fun_id : number
    fun_nome: string;
    fun_status: string
}

function Cargos() {
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [showNotificationAdd, setNotificationAdd] = useState(false);
    const [showNotificationModify, setNotificationModify] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCargos() {
            const data = await listarCargo();
            setCargos(data);
        }
        fetchCargos();
    }, []);

    function notificationPopUpAdd() {
        setNotificationAdd(true);
    }

    function hideNotificationAdd() {
        setNotificationAdd(false);
    }

    function notificationPopUpModify() {
        setNotificationModify(true);
    }

    function hideNotificationModify() {
        setNotificationModify(false);
    }
    function handleClick () {
        return navigate("/cadastrar-cargos")
    }

    return (
        <div><HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home"/>
        <div className="text-white-300 mx-5 my-4">
            <h1 className="text-3xl mb-4">Cargos</h1>
            <p className="pb-4 font-extralight">Lista de todos os cargos cadastrados no sistema.</p>
            <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-1 p-0"></div>
            <div className="py-4">
                {

                    cargos.length !== 0 ?
                        cargos.map((cargo)=>(
                            <>
                                {cargo.fun_status.trim() === "S" ?
                                    (
                                        <div className="pb-4" key={cargo.fun_id}>
                                            <i onClick={notificationPopUpModify} className="hover:cursor-pointer right-0 fixed w-5 h-4 mr-5">{<Pencil size={18}/>}</i>
                                            <p className="font-bold" >{cargo.fun_nome}</p>
                                        </div>
                                    ): null
                                }
                            </>

                        ))
                        :
                        (
                            <div className="pb-4">
                                <p className="font-bold">Sem cargos</p>
                            </div>)


                }

                <div className="block h-[1px] border-0 border-t border-solid border-grey-300 mt-4 p-0"></div>
            </div>
            <div onClick={notificationPopUpAdd} className="flex">
                <i className="text-green-500">{<Plus size={18}/>}</i>
                <p className="hover:bg-black-400 text-white-300 px-4 font-bold">Adicionar cargo</p>
            </div>
            {showNotificationAdd && (
                <Notification
                    buttonText="Adicionar"
                    closePopUp={hideNotificationAdd}
                    title="Adicionar cargo"
                    icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                    description="O cargo adicionado será exibido na página de cargos."
                    buttonAction={handleClick}
                />
            )}
            {showNotificationModify && (
                <Notification
                    buttonText="Editar"
                    closePopUp={hideNotificationModify}
                    title="Editar cargo"
                    icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                    description="As alterações desse cargo afetarão todos funcionários que recebem ele."
                    buttonAction={hideNotificationModify}
                />
            )}
        </div>
        </div>
    )
}

export default Cargos
