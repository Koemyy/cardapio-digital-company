import {Link} from "react-router-dom";

interface iconProps {
    redirect: string,
    icon: any,
    alternativeText: string,
}

function iconFuncionalidade({redirect, icon, alternativeText}: iconProps) {
    return (
        <div className="inline-block">
            <div className="bg-white-300 rounded-xl ml-1 py-1 w-16">
                <Link to={redirect}>
                    <i className="text-black-500">{icon}</i>
                </Link>
            </div>
            <p className="mt-2 text-white-300 w-16">{alternativeText}</p>
        </div>
    );
}

export default iconFuncionalidade;
