

export async function criarCliente(cli_nome : string): Promise<string> {
    const url = 'https://cardapio-digital-api.onrender.com/cliente';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cli_nome
        })
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
  
      const { cli_token } = await response.json();
      return cli_token;

    } catch (error) {
      console.error(error);
      throw error;
    }
}