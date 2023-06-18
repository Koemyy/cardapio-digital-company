import { useCallback, useEffect, useState } from 'react';
import { ArrowCircleLeft } from '@phosphor-icons/react';
import HeaderEmpresa from '../components/HeaderEmpresa.tsx';
import CardPedidos from '../components/cardPedidos.tsx';
import PedidosGarcom from "./pedidosGarcom.tsx";
import { AtualizarStatusPedidos, buscarPedidos } from '../service/PedidosService.tsx';

interface Pedido {
    ped_id : number
    cli_id:  number
    pro_id: number
    ped_status : string
    ped_quantidade : number
    pro_nome: string
    mes_id : number
}




function Pedidos() {

    const [pedidos, setPedidos] = useState<Pedido[][]>([]);
    

    const handleCardPronto = useCallback((pedidos: Pedido[]) => {
        pedidos.forEach(async (ped) => {
          await AtualizarStatusPedidos("P", ped.ped_id);
        });
    
        console.log("chamou");
      }, []);

    useEffect(()=>{
        async function fetchPedidos() {
            await buscarPedidos("A").then((data: Pedido[])=>{
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
    }
    ,[])


    

    return (
        <div>
            <HeaderEmpresa icon={<ArrowCircleLeft size={42} />} to="/home" />
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
                            />
                        ))}
                    </div>
                    <div className="w-1/2 right-0">
                        <PedidosGarcom />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pedidos;
