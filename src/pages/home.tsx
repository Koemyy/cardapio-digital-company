import {Barcode, CookingPot, IdentificationCard, ListBullets, SignOut, Suitcase, UserPlus} from "@phosphor-icons/react";
import IconFuncionalidade from "../components/IconFuncionalidade.tsx";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

function Home() {
    return (
        <div>
            <HeaderEmpresa icon={<SignOut size={42}/>} to="/"/>
            <div className="text-white-300 mx-5 my-4 pt-5">
                <div className="pb-10">
                    <input
                        placeholder="  Pesquisar"
                        type="search"
                        className="px-2 text-black-500 rounded-2xl w-[22em] bg-white-300 py-3"
                    />
                </div>
                <div className="flex justify-evenly text-center align-middle items-center">
                    <div className="w-72 h-56 space-x-1 flex text-center flex-wrap">
                        <IconFuncionalidade
                            redirect="/cadastrar-colaborador"
                            icon={<UserPlus className="text-black-500 ml-1" size={56}/>}
                            alternativeText="Cadastrar colaborador"
                        />
                        <IconFuncionalidade
                            redirect="/cadastrar-cargos"
                            icon={<IdentificationCard className="text-black-500 ml-1" size={56}/>}
                            alternativeText="Cadastrar cargo"
                        />
                        <IconFuncionalidade
                            redirect="/cargos"
                            icon={<Suitcase className="text-black-500 ml-1" size={56}/>}
                            alternativeText="Cargos"
                        />
                        <IconFuncionalidade
                            redirect="/qrcode"
                            icon={<Barcode className="text-black-500 ml-1" size={56}/>}
                            alternativeText="QRCode"
                        />
                        <IconFuncionalidade
                            redirect="/pedidos-cozinha"
                            icon={<CookingPot className="text-black-500 ml-1" size={56}/>}
                            alternativeText="Pedidos"
                        />
                        <IconFuncionalidade
                            redirect="/pedidos-garcom"
                            icon={<ListBullets className="text-black-500 ml-1" size={56}/>}
                            alternativeText="Pedidos"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
