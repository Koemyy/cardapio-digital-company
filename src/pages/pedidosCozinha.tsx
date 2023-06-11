import { useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import HeaderEmpresa from '../components/HeaderEmpresa.tsx';
import CardPedidos from '../components/cardPedidos.tsx';

function Pedidos() {
    const listaDePedidos = [
        { quantidade: '2', nome: 'Item 01' },
        { quantidade: '1', nome: 'Item 02' },
        { quantidade: '3', nome: 'Item 03' },
    ];

    const [cardsAtivos, setCardsAtivos] = useState([
        { mesa: 'Mesa 01', idPedido: 'Ped 001', pedidos: listaDePedidos },
        { mesa: 'Mesa 02', idPedido: 'Ped 002', pedidos: listaDePedidos },
        { mesa: 'Mesa 03', idPedido: 'Ped 003', pedidos: listaDePedidos },
    ]);
    const [cardsFinalizados, setCardsFinalizados] = useState([]);


    // @ts-ignore
    const handleCardPronto = (index) => {
        const card = cardsAtivos[index];
        setCardsAtivos((prevCards) => prevCards.filter((_, i) => i !== index));
        // @ts-ignore
        setCardsFinalizados((prevCards) => [...prevCards, card]);
    };

    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
            <div className="mx-5 my-4">
                <div className="flex">
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold text-white-300">Ativos</h1>
                        {cardsAtivos.map((card, index) => (
                            <CardPedidos
                                key={index}
                                mesa={card.mesa}
                                idPedido={card.idPedido}
                                pedidos={card.pedidos}
                                index={index}
                                moveCard={handleCardPronto}
                                isFinalizado={false}
                            />
                        ))}
                    </div>
                    <div className="w-1/2 right-0">
                        <div className="text-3xl font-bold text-white-300">Finalizados</div>
                        <div className="opacity-25">
                            {cardsFinalizados.map(({idPedido, mesa, pedidos}, index) => (
                                <CardPedidos
                                    key={index}
                                    mesa={mesa}
                                    idPedido={idPedido}
                                    pedidos={pedidos}
                                    index={index}
                                    moveCard={handleCardPronto}
                                    isFinalizado={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pedidos;
