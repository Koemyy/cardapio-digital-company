interface pedidos {
    mesa: string;
    idPedido: string;
    pedidos: listaPedidos[];
    index: any,
    moveCard: any
    isFinalizado: boolean
}

interface listaPedidos {
    quantidade: string;
    nome: string;
}

function CardPedidos({mesa, idPedido, pedidos, index, moveCard, isFinalizado}: pedidos) {
    return (
        <div className="max-w-sm my-4 text-black-500 rounded overflow-hidden shadow-lg bg-orange-700">
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">{mesa}</h3>
                    <p className="text-2xl font-bold">{idPedido}</p>
                </div>
                <div className="my-4">
                    {pedidos.map((pedido, index) => (
                        <div className="flex items-center mb-2" key={index}>
                            <p className="bg-white-300 rounded px-1 py-1">{pedido.quantidade}</p>
                            <p className="ml-2 font-bold text-gray-800">{pedido.nome}</p>
                            <input type="checkbox" className="ml-auto form-checkbox h-4 w-4 text-indigo-600"/>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-black-500 hover:bg-blue-700 text-white-300 font-bold py-2 px-4 rounded"
                        onClick={() => moveCard(index)}
                        disabled={isFinalizado}
                    >
                        Pronto
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardPedidos;
