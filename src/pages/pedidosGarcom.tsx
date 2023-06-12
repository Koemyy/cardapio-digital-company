import CardPedidos from '../components/cardPedidos.tsx';
import { ArrowCircleLeft } from "@phosphor-icons/react";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";

function PedidosGarcom({ pedidosFinalizados, exibirHeader }: any) {
    if (!pedidosFinalizados || pedidosFinalizados.length === 0) {
        return <div className="text-white-300 text-xl flex justify-center align-middle items-center">Nenhum pedido finalizado encontrado.</div>;
    }

    return (
        <div>
            {exibirHeader && <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />}
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
    );
}

export default PedidosGarcom;
