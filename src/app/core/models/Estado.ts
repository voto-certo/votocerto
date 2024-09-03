export interface Estado {
   sigla: string,
   nome: string,
   regiao: string
}

export interface EstadosResponse {
    ues: Estado[]
}