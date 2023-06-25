import {useState} from "react";

interface pedidos {
    idMesa: number
    pedidos: Pedido[];
    index?: any,
    moveCard?: any
    isFinalizado: boolean,
    buttonLabel?: string | null
    exibirButton?: boolean;
    exibirCheckbox?: boolean;

}

interface Pedido {
    ped_id: number
    cli_id: number
    pro_id: number
    ped_status: string
    ped_quantidade: number
    pro_nome: string
}

function CardPedidos({idMesa, pedidos, moveCard, isFinalizado, buttonLabel, exibirButton, exibirCheckbox}: pedidos) {
    const [checkboxState, setCheckboxState] = useState(Array(pedidos.length).fill(false));

    const handleCheckboxChange = ({checkboxIndex}: any) => {
        const updatedCheckboxState = checkboxState.map((checked, index) => {
            return index === checkboxIndex ? !checked : checked;
        });
        setCheckboxState(updatedCheckboxState);
    };

    const handleCardPronto = () => {
        moveCard(pedidos)
        setCheckboxState(Array(pedidos.length).fill(false));
    };

    return (
        <div className="max-w-sm my-4 text-black-500 rounded overflow-hidden shadow-lg bg-orange-700">
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">Mesa {idMesa}</h3>
                </div>
                <div className="my-4">
                    {pedidos.map((pedido, checkboxIndex) => (

                        <div className="flex items-center mb-2" key={checkboxIndex}>
                            <p className="bg-white-300 rounded px-1 py-1">{pedido.ped_quantidade}</p>
                            <p className="ml-2 font-bold text-gray-800">{pedido.pro_nome}</p>
                            {exibirCheckbox && ( // Verifica se exibirCheckbox é true antes de renderizar o checkbox
                                <input
                                    type="checkbox"
                                    className="ml-auto form-checkbox h-4 w-4 text-indigo-600"
                                    checked={checkboxState[checkboxIndex]}
                                    onChange={() => handleCheckboxChange({ checkboxIndex: checkboxIndex })}
                                    disabled={isFinalizado}
                                />
                            )}
                        </div>

                    ))}
                </div>
                <div className="flex justify-center">
                    {exibirButton && (
                        <button
                            className="bg-black-500 w-20 hover:bg-blue-700 text-white-300 font-bold rounded"
                            onClick={handleCardPronto}
                            disabled={isFinalizado}
                        >
                            {buttonLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardPedidos;
