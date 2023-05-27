import {useState} from "react";
import Notification from "../components/Notification.tsx";
import {Question} from '@phosphor-icons/react';

function CadastrarColaborador() {
    const [showNotification, setNotification] = useState(false);

    function notificationPopUp() {
        setNotification(true);
    }

    function hideNotification() {
        setNotification(false);
    }

    // no action do form é onde você vai enviar os dados
    return (
        <div className="text-white-300 mx-5 my-4">
            <h1 className="text-3xl md:text-4xl mb-4">Cadastrar colaborador</h1>
            <p className="pb-4 md:text-2xl font-extralight">Para realizar o cadastro de um colaborador, preencha as
                informações abaixo.</p>
            <form className="" action="">
                <label className="md:text-xl" form="nome-colaborador">Nome completo: </label>
                <br/>
                <input name="nome-colaborador" id="nome-colaborador" size={30}
                       className="my-2 text-black-500 text-lg rounded"/>
                <br/>
                <label className="md:text-xl" form="email-colaborador">E-mail: </label>
                <br/>
                <input type="email" name="email-colaborador" id="email-colaborador" size={30}
                       className="my-2 text-black-500 text-lg rounded"/>
                <br/>
                <label className="md:text-xl" form="senha-colaborador">Senha: </label>
                <br/>
                <input type="password" name="senha-colaborador" id="senha-colaborador" size={30}
                       className="my-2 text-black-500 text-lg rounded"/>
                <br/>
                <label className="md:text-xl" form="confirmarsenha-colaborador">Confirmar senha: </label>
                <br/>
                <input type="password" name="confirmarsenha-colaborador" id="confirmarsenha-colaborador" size={30}
                       className="my-2 text-black-500 text-lg rounded"/>
                <label form="selectList">Escolha um cargo:</label>
                <br/>
                <select className="my-2 py-2 text-black-500 text-lg rounded" name="selectList" id="selectList">
                    <option value="garcom">Garçom</option>
                    <option value="chefe-de-cozinha">Chefe de cozinha</option>
                    <option value="caixa">Caixa</option>
                    <option value="gerente">Gerente</option>
                </select>
            </form>
            <div className="flex items-center content-center justify-center pt-4">
                <button onClick={notificationPopUp}
                        className="hover:bg-black-400 hover:text-white-300 md:text-2xl bg-white-300 md:my-4 px-4 py-4 rounded-3xl text-black-500 font-bold">Cadastrar
                </button>
            </div>
            {showNotification && (
                <Notification
                    buttonText="Cadastrar"
                    closePopUp={hideNotification}
                    title="Deseja cadastrar colaborador?"
                    icon={<i className="flex text-center justify-center text-white-300"><Question size={54}/></i>}
                    description="Ao cadastrar, ele irá receber o cargo associado podendo ser modificado."
                    buttonAction={hideNotification}
                />
            )}
        </div>
    )
}

export default CadastrarColaborador
