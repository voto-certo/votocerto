export interface Municipio {
    nome: string,
    codigo: string
}

export interface MunicipioResponse {
    municipios: Municipio[],
    sigla: string;
}

export interface MunicipioRequest {
    sigla: string;
    id_eleicao: string;
}