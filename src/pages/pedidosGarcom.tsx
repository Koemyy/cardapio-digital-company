import CardPedidos from '../components/cardPedidos.tsx';
import { ArrowCircleLeft } from "@phosphor-icons/react";
import HeaderEmpresa from "../components/HeaderEmpresa.tsx";
import { useEffect, useState } from 'react';
import { buscarPedidos } from '../service/PedidosService.tsx';



interface Pedido {
    ped_id : number
    cli_id:  number
    pro_id: number
    ped_status : string
    ped_quantidade : number
    pro_nome: string
    mes_id : number
}

function PedidosGarcom({exibirHeader}:any) {

    const [pedidosProntos, setPedidosProntos] = useState<Pedido[][]>([]);

    useEffect(()=>{
        async function fetchPedidosProntos() {
            await buscarPedidos("P").then((data: Pedido[])=>{
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
   },[])

    if (!pedidosProntos || pedidosProntos.length === 0) {
        return <div className="text-white-300 text-xl flex justify-center align-middle items-center">Nenhum pedido finalizado encontrado.</div>;
    }

    return (
        <div>
            {exibirHeader && <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />}
            <div className="text-3xl font-bold text-white-300">Finalizados</div>
            <div className="opacity-25">
                {pedidosProntos.map((pedido: any, index: number) => (
                    <CardPedidos
                    idMesa={pedido[0].mes_id}
                    key={index}
                    pedidos={pedido}
                    index={index}
                    isFinalizado={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default PedidosGarcom;
