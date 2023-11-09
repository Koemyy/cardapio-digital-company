import {ArrowCircleLeft} from "@phosphor-icons/react";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";
import {useEffect, useState} from 'react';
import {AtualizarStatusPagamentoPedidos, buscarPedidosParaPagamento} from '../service/PedidosService.tsx';
import CardCompras from "../components/cardCompras.tsx";

interface Pedido {
    ped_id: number
    cli_id: number
    pro_id: number
    ped_status: string
    ped_quantidade: number
    pro_nome: string
    mes_id: number
}

function SolicitacaoCompra() {
    const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);

    useEffect(() => {
        async function fetchPedidosProntos() {
            await buscarPedidosParaPagamento("F").then((data: Pedido[]) => {
                const grouped: { [key: number]: Pedido[] } = data.reduce(
                    (result, item) => {
                        const mesid = item.mes_id;
                        if (!result[mesid]) {
                            result[mesid] = [];
                        }
                        result[mesid].push(item);

                        return result;
                    },
                    {} as { [key: number]: Pedido[] }
                );
                setPedidosProntos(Object.values(grouped));
            });
        }

        fetchPedidosProntos();

        const interval = setInterval(fetchPedidosProntos, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateStatus = async (status: string, ped_id: number) => {
        await AtualizarStatusPagamentoPedidos(status, ped_id);
    };

    if (!pedidosProntos || pedidosProntos.length === 0) {
        return (
            <div>
                <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
                <div className="text-white-300 text-xl flex justify-center align-middle items-center">
                    Nenhuma solicitação de pagamento encontrada.
                </div>
            </div>
        );
    }
    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
            <div className="text-2xl font-bold text-white-300">Solicitações para pagamento</div>
            {pedidosProntos.map((pedido: any, index: number) => (
                <CardCompras
                    idMesa={pedido[0].mes_id}
                    pedidos={pedido}
                    index={index}
                    isFinalizado={false}
                    exibirButton={true}
                    exibirCheckbox={false}
                    updateStatus={updateStatus}
                />
            ))}
        </div>
    );
}

export default SolicitacaoCompra;