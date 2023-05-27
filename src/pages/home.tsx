import {Barcode, IdentificationCard, Suitcase, UserPlus} from "@phosphor-icons/react";
import IconFuncionalidade from "../components/IconFuncionalidade.tsx";

function Home() {
    return (
        <div className="text-white-300 mx-5 my-4 pt-5">
            <div className="pb-10">
                <input placeholder="  Pesquisar" type={"search"}
                       className="text-black-500 rounded-2xl w-[22em] bg-white-300 py-3"></input>
            </div>
            <div className="flex justify-between align-middle items-center">
                <IconFuncionalidade redirect="/cadastrar-colaborador"
                                    icon={<UserPlus className="text-black-500 ml-1" size={56}/>}
                                    alternativeText="Cadastrar colaborador"/>
                <IconFuncionalidade redirect="/cadastrar-cargos"
                                    icon={<IdentificationCard className="text-black-500 ml-1" size={56}/>}
                                    alternativeText="Cadastrar cargo"/>
                <IconFuncionalidade redirect="/cargos"
                                    icon={<Suitcase className="text-black-500 ml-1" size={56}/>}
                                    alternativeText="Cargos"/>
                <IconFuncionalidade redirect="/qrcode"
                                    icon={<Barcode className="text-black-500 ml-1" size={56}/>}
                                    alternativeText="QRCode"/>
            </div>
        </div>
    )
}

export default Home;

