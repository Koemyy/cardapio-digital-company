import {ArrowCircleLeft} from '@phosphor-icons/react';
function HeaderEmpresa () {
    return (
        <div className="flex">
            <i className="text-orange-500 pl-4 pt-4 font-bold justify-center items-center">{<ArrowCircleLeft size={42}/>}</i>
            <h1 className="text-orange-500 pl-4 text-4xl pt-5 font-bold justify-center items-center">Rockland Bar</h1>
        </div>
    )
}

export default HeaderEmpresa;
