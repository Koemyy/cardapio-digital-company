interface Pedido {
    ped_id : number
    cli_id:  number
    pro_id: number
    ped_status : string
    ped_quantidade : number
    pro_nome: string
    mes_id : number
}


export async function buscarPedidos(status : string): Promise<Pedido[]>{

    const url = 'https://cardapio-digital-api.onrender.com/actions/buscarPedidos';
   
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status : status
        })
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err) => err.message)

    return response;
}

export async function buscarPedidosParaPagamento(status : string): Promise<Pedido[]>{

    const url = 'https://cardapio-digital-api.onrender.com/actions/buscarPedidosParaPagamento';
   
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status : status
        })
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err) => err.message)

    return response;
}


export async function AtualizarStatusPedidos(ped_status : string, ped_id : number): Promise<Pedido[]>{

    const url = 'https://cardapio-digital-api.onrender.com/actions/atualizarPedido';
   
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ped_status : ped_status,
            ped_id: ped_id
        })
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err) => err.message)

    return response;
}

export async function AtualizarStatusPagamentoPedidos(ped_status : string, ped_id : number): Promise<Pedido[]>{

    const url = 'https://cardapio-digital-api.onrender.com/actions/atualizarStatusPagementoPedido';
   
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ped_status : ped_status,
            ped_id: ped_id
        })
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err) => err.message)

    return response;
}