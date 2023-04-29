import {ArrowCircleLeft} from '@phosphor-icons/react';

interface NotifyContent {
    icon: string | any,
    closePopUp: any,
    buttonText: string,
    description: string,
    title: string,
    buttonAction?: string | any,
}

function Notification({closePopUp, icon, buttonText, description, title, buttonAction}: NotifyContent) {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full">
            <div
                className="absolute text-white-300 left-[20%] right-[20%] md:bottom-[50%] bottom-[42%] top-[27%] text-center border-2 rounded-2xl bg-black-400">
                <div className="pt-2 px-2" onMouseDown={closePopUp}><ArrowCircleLeft size={40}/></div>
                <p className="md:text-2xl md:font-bold px-2 mb-4">{icon}</p>
                <p className="md:text-2xl font-bold px-2">{title}</p>
                <p className="md:text-2xl pt-4 md:font-bold px-2">{description}</p>
                <button onClick={buttonAction}
                        className="text-white-300 bg-black-500 rounded-full md:px-5 mt-2 py-2 px-5 md:mt-3 md:text-2xl">{buttonText}</button>
            </div>
        </div>
    );
}

export default Notification;
