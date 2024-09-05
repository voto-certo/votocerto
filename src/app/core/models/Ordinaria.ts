export interface Eleicao {
    id: number;
    siglaUF: string | null;
    localidadeSgUe: string | null;
    ano: number;
    codigo: string | null;
    nomeEleicao: string | null;
    tipoEleicao: string | null;
    turno: string | null;
    tipoAbrangencia: string | null;
    dataEleicao: string | null;
    codSituacaoEleicao: string | null;
    descricaoSituacaoEleicao: string | null;
    descricaoEleicao: string;
}