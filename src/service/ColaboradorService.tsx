
interface Colaborador {
    col_nome: string
    col_email:string
    col_senha:string
    fun_id:number
    col_confirma_senha:string
}

export async function cadastrarColaborador( colaborador: Colaborador) : Promise<Boolean>{

    const url = 'http://localhost:3000/colaborador';

    let retorno: boolean = false;
    try{
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                col_nome: colaborador.col_nome,
                col_email : colaborador.col_email,
                col_senha: colaborador.col_senha,
                fun_id: colaborador.fun_id
            })
        }).then((result)=>{
            if(result.ok){ 
                retorno = true;
            }
        })
        return retorno
    }
    catch{
        return retorno;
    }

    

}
