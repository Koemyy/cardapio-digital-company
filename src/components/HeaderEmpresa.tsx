import {ArrowCircleLeft} from '@phosphor-icons/react';
import {Link} from "react-router-dom";

function HeaderEmpresa() {
    return (
        <div>
            <div className="flex">
                <Link to="/">
                    <i className="text-orange-500 pl-4 pt-4 font-bold justify-center items-center"><ArrowCircleLeft
                        size={42}/></i>
                </Link>
                <h1 className="text-orange-500 pl-4 text-4xl pt-5 font-bold justify-center items-center">Rockland
                    Bar</h1>
            </div>
            <p className="text-white-300 ml-[3em] text-xl justify-center items-center font-bold">Bem-vindo!</p>
        </div>
    )
}

export default HeaderEmpresa;
