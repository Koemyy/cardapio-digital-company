import {useCallback, useEffect, useState} from 'react';
import {ArrowCircleLeft} from '@phosphor-icons/react';
import HeaderEmpresa from '../components/HeaderEmpresa.tsx';
import CardPedidos from '../components/cardPedidos.tsx';
import {AtualizarStatusPedidos, buscarPedidos} from '../service/PedidosService.tsx';

interface Pedido {
    ped_id: number
    cli_id: number
    pro_id: number
    ped_status: string
    ped_quantidade: number
    pro_nome: string
    mes_id: number
}

function Pedidos() {
    const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);
    const [pedidos, setPedidos] = useState<Pedido[][]>([]);


    const handleCardPronto = useCallback((pedidos: Pedido[]) => {
        pedidos.forEach(async (ped) => {
            await AtualizarStatusPedidos("P", ped.ped_id);
        });
    }, []);

    useEffect(() => {
            async function fetchPedidos() {
                await buscarPedidos("A").then((data: Pedido[]) => {
                    const grouped: { [key: number]: Pedido[] } = data.reduce((result, item) => {
                            const mesid = item.mes_id;
                            if (!result[mesid]) {
                                result[mesid] = [];
                            }
                            result[mesid].push(item);

                            return result;
                        },
                        {} as { [key: number]: Pedido[] }
                    );
                    setPedidos(Object.values(grouped));
                });
            }

            fetchPedidos();

            const interval = setInterval(fetchPedidos, 1000);
            return () => {
                clearInterval(interval);
            };
        }, [])

    useEffect(() => {
        async function fetchPedidosProntos() {
            await buscarPedidos("P").then((data: Pedido[]) => {
                const grouped: { [key: number]: Pedido[] } = data.reduce((result, item) => {
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
    }, [])


    if ((!pedidosProntos || pedidosProntos.length === 0) && (!pedidos || pedidos.length === 0)) {
        return (
            <div>
                <HeaderEmpresa icon={<ArrowCircleLeft size={42}/>} to="/home"/>
                <div className="text-white-300 text-xl flex justify-center align-middle items-center">
                    Nenhum pedido finalizado encontrado.
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42}/>} to="/home"/>
            <div className="mx-5 my-4">
                <div className="flex">
                    <div className="w-1/2">
                        <h1 className="text-3xl font-bold text-white-300">Ativos</h1>
                        {pedidos.map((ped, index) => (
                            <CardPedidos
                                idMesa={ped[0].mes_id}
                                pedidos={ped}
                                moveCard={handleCardPronto}
                                index={index}
                                isFinalizado={false}
                                buttonLabel="Pronto"
                                exibirButton={true}
                                exibirCheckbox={true}
                            />
                        ))}
                    </div>
                    <div className="w-1/2 right-0">
                        <div className="opacity-25">
                            <div className="text-3xl font-bold text-white-300">Finalizados</div>
                            {pedidosProntos.map((pedido: any, index: number) => (
                                <CardPedidos
                                    idMesa={pedido[0].mes_id}
                                    pedidos={pedido}
                                    index={index}
                                    buttonLabel={null}
                                    isFinalizado={false}
                                    exibirButton={true}
                                    exibirCheckbox={false}
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
