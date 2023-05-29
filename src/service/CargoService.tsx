export async function cadastrarCargo(fun_nome: string) {

    const url = 'http://localhost:3000/actions/cadastrarFuncao';

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fun_nome
        })
    }).catch((err) => err.message)

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
  
  
  