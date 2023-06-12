import { ArrowCircleLeft } from '@phosphor-icons/react';
import HeaderEmpresa from '../components/HeaderEmpresa.tsx';
import CardPedidos from '../components/cardPedidos.tsx';

function PedidosFinalizados({ pedidosFinalizados }: any) {
    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
            <div className="mx-5 my-4">
                <div className="flex">
                    <div className="w-1/2 right-0">
                        <div className="text-3xl font-bold text-white-300">Finalizados</div>
                        <div className="opacity-25">
                            {pedidosFinalizados.map((pedido: any, index: number) => (
                                <CardPedidos
                                    key={index}
                                    mesa={pedido.mesa}
                                    idPedido={pedido.idPedido}
                                    pedidos={pedido.pedidos}
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

export default PedidosFinalizados;
