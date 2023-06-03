export async function cadastrarCargo(fun_nome: string) : Promise<boolean> {

    const url = 'http://localhost:3000/actions/cadastrarFuncao';

    let retorno: boolean =false;

    if(fun_nome !== ''){
        try{
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fun_nome
                })
            }).then((result)=>{
                if(result.ok)
                    retorno = true;
            })
            return retorno;

        }catch{
            return retorno;
        }
    }else{
        return retorno;
    }
    

}


export async function listarCargo() {
    const url = "http://localhost:3000/actions/listarFuncoes";
  
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      const dadosJson = await response.json();
      return dadosJson;

    } catch (error) {
        throw new Error("Erro ao buscar dados");
    }
  }
  
  
  