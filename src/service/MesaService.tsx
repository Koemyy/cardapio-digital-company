export async function listarMesas() {
    const url = "http://localhost:3000/actions/listarMesas";
  
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