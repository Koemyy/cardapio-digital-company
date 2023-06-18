import {useEffect, useState} from "react";
import Notification from "../components/Notification.tsx";
import {listarCargo} from "../service/CargoService.tsx";
import {cadastrarColaborador} from "../service/ColaboradorService.tsx";
import {ArrowCircleLeft, CheckCircle, Question} from '@phosphor-icons/react';
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

interface Cargo {
    fun_id: number
    fun_nome: string;
    fun_status: string
}

interface Colaborador {
    col_nome: string
    col_email: string
    col_senha: string
    fun_id: number
    col_confirma_senha: string
}

function CadastrarColaborador() {
    const [showNotification, setNotification] = useState(false);
    const [listaCargos, setCargos] = useState<Cargo[]>([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [colaborador, setColaborador] = useState<Colaborador>({
        col_nome: "",
        col_email: "",
        col_senha: "",
        fun_id: 0,
        col_confirma_senha: ""
    });


    //atualiza useState do colaborador conforme é preenchido
    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setColaborador((prevFormulario) => ({
            ...prevFormulario,
            [name]: value,
        }));
    };

    //lista os cargos no dropdown
    useEffect(() => {
        async function fetchCargos() {
            const data = await listarCargo();
            setCargos(data);
        }

        fetchCargos();
    }, []);

    function limparFormulario() {
        setColaborador({
            col_nome: "",
            col_email: "",
            col_senha: "",
            fun_id: 0,
            col_confirma_senha: ""
        });
    }

    //cadastra funcionario
    async function notificationPopUp() {
        if (colaborador.col_senha === colaborador.col_confirma_senha) {
            if (await cadastrarColaborador(colaborador) === true) {
                setShowSuccessMessage(true);
                limparFormulario();
            }
        }
    }

    function hideNotification() {
        setNotification(false);
    }

    // no action do form é onde você vai enviar os dados
    return (
        <div><HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home"/>
            <div className="text-white-300 mx-5 my-4">
                <h1 className="text-3xl md:text-4xl mb-4">Cadastrar colaborador</h1>
                <p className="pb-4 md:text-2xl font-extralight">Para realizar o cadastro de um colaborador, preencha as
                    informações abaixo.</p>
                <form className="" action="">
                    <label className="md:text-xl" form="nome-colaborador"> Nome completo: </label>
                    <br/>
                    <input name="col_nome" id="nome-colaborador" size={30}
                           className="my-2 text-black-500 text-lg rounded" value={colaborador.col_nome}
                           onChange={handleChange}/>
                    <br/>
                    <label className="md:text-xl" form="email-colaborador">E-mail: </label>
                    <br/>
                    <input type="email" name="col_email" id="email-colaborador" size={30}
                           className="my-2 text-black-500 text-lg rounded" value={colaborador.col_email}
                           onChange={handleChange}/>
                    <br/>
                    <label className="md:text-xl" form="senha-colaborador">Senha: </label>
                    <br/>
                    <input type="password" name="col_senha" id="senha-colaborador" size={30}
                           className="my-2 text-black-500 text-lg rounded" value={colaborador.col_senha}
                           onChange={handleChange}/>
                    <br/>
                    <label className="md:text-xl" form="confirmarsenha-colaborador">Confirmar senha: </label>
                    <br/>
                    <input type="password" name="col_confirma_senha" id="confirmarsenha-colaborador" size={30}
                           className="my-2 text-black-500 text-lg rounded" value={colaborador.col_confirma_senha}
                           onChange={handleChange}/>
                    <label form="selectList">Escolha um cargo:</label>
                    <br/>
                    <select className="my-2 py-2 text-black-500 text-lg rounded" name="fun_id" id="selectList"
                            value={colaborador.fun_id} onChange={handleChange}>
                        <>
                            <option>Selecione</option>
                            {
                                listaCargos.length !== 0 ?
                                    listaCargos.map(({fun_id, fun_nome, fun_status}) => (
                                        <>
                                            {fun_status.trim() === "S" ?
                                                (
                                                    <option key={fun_id} value={fun_id}>{fun_nome}</option>
                                                ) : null
                                            }
                                        </>
                                    )) : null
                            }
                        </>

                    </select>
                </form>
                <div className="flex items-center content-center justify-center pt-4">
                    <button onClick={notificationPopUp}
                            className="hover:bg-black-400 hover:text-white-300 md:text-2xl bg-white-300 md:my-4 px-4 py-4 rounded-3xl text-black-500 font-bold">Cadastrar
                    </button>
                </div>
                {showSuccessMessage && (
                    <Notification
                        buttonText="OK"
                        closePopUp={() => setShowSuccessMessage(false)}
                        title="Colaborador cadastrado com sucesso"
                        icon={<i className="flex text-center justify-center text-green-400"><CheckCircle size={54}/></i>}
                        description="O colaborador foi cadastrado com sucesso."
                        buttonAction={() => setShowSuccessMessage(false)}
                    />
                )}
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
        </div>
    )
}

export default CadastrarColaborador
