

interface Cliente {
  cli_id: number
  mesa_id: number
  cli_token : string
}

export async function criarCliente(mesId : number): Promise<Cliente> {
    const url = "https://cardapio-digital-api.onrender.com/cliente";
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mes_id : mesId
        })
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const { cli_id, mesa_id, cli_token } = await response.json();
      return { cli_id, mesa_id, cli_token };

    } catch (error) {
      console.error(error);
      throw error;
    }
}