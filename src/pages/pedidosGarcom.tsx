
import {ArrowCircleLeft} from "@phosphor-icons/react";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";
import {useEffect, useState} from 'react';
import {buscarPedidos, AtualizarStatusPedidos} from '../service/PedidosService.tsx';
import CardPedidosGarcom from "../components/cardPedidosGarcom.tsx";

interface Pedido {
    ped_id: number
    cli_id: number
    pro_id: number
    ped_status: string
    ped_quantidade: number
    pro_nome: string
    mes_id: number
}

function PedidosGarcom() {
    const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);

    useEffect(() => {
        async function fetchPedidosProntos() {
            await buscarPedidos("P").then((data: Pedido[]) => {
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

    //Tentativa de atualizar status do pedido e remover o card

    const removeCard = (index: number) => {
        const updatedPedidosProntos = [...pedidosProntos];
        updatedPedidosProntos.splice(index, 1);
        setPedidosProntos(updatedPedidosProntos);
    };

    const updateStatus = async (index: number, updatedPedidos: string) => {
        await AtualizarStatusPedidos(updatedPedidos, index);
        removeCard(index);
    };

    if (!pedidosProntos || pedidosProntos.length === 0) {
        return (
            <div className="text-white-300 text-xl flex justify-center align-middle items-center">
                Nenhum pedido finalizado encontrado.
            </div>
        );
    }
    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
            <div className="text-3xl font-bold text-white-300">Finalizados</div>
            {pedidosProntos.map((pedido: any, index: number) => (
                <CardPedidosGarcom
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

export default PedidosGarcom;
