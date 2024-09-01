export interface CandidatosRequest{
    codigo_cidade: string,
    codigo_cargo: string
}

// Interface para o objeto "partido"
export interface Partido {
    numero: number;
    sigla: string;
    nome: string | null;
    sqPrestadorConta: string | null;
}

// Interface para o objeto que representa um candidato
export interface CandidatoResumo {
    id: number;
    ufCandidatura: string;
    nomeCompleto: string;
    numero: number;
    partido: Partido;
}

// Interface para a resposta da API que é uma lista de candidatos
export interface CandidatosResponse {
    candidatos: CandidatoResumo[];
}