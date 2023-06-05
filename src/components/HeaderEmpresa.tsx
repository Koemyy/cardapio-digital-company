import { Link } from 'react-router-dom';
import {ReactElement} from "react";

interface redirect {
    to: string,
    icon: ReactElement
}
function HeaderEmpresa({to, icon}: redirect) {
    return (
        <div>
            <div className="flex pl-2">
                <Link to={to}><span className="text-orange-500 pl-4 pt-4 pr-10 font-bold justify-center items-center">{icon}</span>
                </Link>
                <h1 className="text-orange-500 pl-4 text-4xl pt-5 font-bold justify-center items-center">Rockland Bar</h1>
            </div>
            <p className="text-white-300 ml-[3em] text-xl justify-center items-center font-bold">Bem-vindo!</p>
        </div>
    );
}

export default HeaderEmpresa;
