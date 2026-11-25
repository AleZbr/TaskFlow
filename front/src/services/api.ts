
const API_URL = "http://localhost:5098";

export async function requisicao<T>(
    rota: string,
    opcoes?: RequestInit
): Promise<T> {

    const resposta = await fetch(`${API_URL}${rota}`, opcoes);

    const texto = await resposta.text();

    let dados: any = texto;

    try {
        dados = texto ? JSON.parse(texto) : null;
    } catch {
        // A API também pode retornar mensagens em texto.
    }

    if (!resposta.ok) {
        throw new Error(
            typeof dados === "string"
                ? dados
                : dados?.title || `Erro HTTP ${resposta.status}`
        );
    }

    return dados as T;
}

export async function listar<T>(rota: string): Promise<T[]> {

    const resposta = await fetch(`${API_URL}${rota}`);

    if (resposta.status === 404) {
        return [];
    }

    if (!resposta.ok) {
        throw new Error(`Erro HTTP ${resposta.status}`);
    }

    return await resposta.json() as T[];
}
