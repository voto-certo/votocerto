//Interfaces para detalhe de um candidato
export interface CandidatoDetalheRequest {
    codigo_cidade: string,
    id_candidato: string,
    ano_eleicao: string,
    id_eleicao: string
}

export interface Cargo {
    codigo: number;
    sigla: string | null;
    nome: string;
    codSuperior: number;
    titular: boolean;
    contagem: number;
}

export interface Bem {
    ordem: number;
    descricao: string;
    descricaoDeTipoDeBem: string;
    valor: number;
    dataUltimaAtualizacao: string;
}

export interface Vice {
    DT_ULTIMA_ATUALIZACAO: string;
    nomeColigacao: string;
    composicaoColigacao: string;
    stRegistro: boolean;
    situacaoCandidato: string;
    codigoSituacaoCandidatoSuperior: number | null;
    urlFoto: string;
    urlFotoPublicavel: boolean;
    generoPublicavel: boolean;
    orientacaoSexualPublicavel: boolean;
    sq_CANDIDATO: number;
    sg_UE: string;
    sq_ELEICAO: number;
    dt_ULTIMA_ATUALIZACAO: number;
    candidatoApto: boolean;
    sq_CANDIDATO_SUPERIOR: number;
    nr_CANDIDATO: string;
    nm_URNA: string;
    nm_CANDIDATO: string;
    ds_CARGO: string;
    nm_PARTIDO: string;
    sg_PARTIDO: string;
}

export interface Partido {
    numero: number;
    sigla: string;
    nome: string;
    sqPrestadorConta: any;
}

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

export interface Arquivo {
    idArquivo: number;
    nome: string;
    url: string;
    tipo: string;
    codTipo: string;
    fullFilePath: any;
    fileInputStream: any;
    fileByteArray: any;
}

export interface EleicaoAnterior {
    nrAno: number;
    id: string;
    nomeUrna: string;
    nomeCandidato: string;
    idEleicao: string;
    sgUe: string;
    local: string;
    cargo: string;
    partido: string;
    situacaoTotalizacao: string;
    txLink: string;
}

export interface InfoComplementar {
    generoPublicavel: boolean;
    orientacaoSexualPublicavel: boolean;
    identidadeGenero: string;
    orientacaoSexual: string;
    dsTipoEtniaIndigena: string;
    quilombola: string;
    nmEncarregadoDados: string | null;
    txCanalComunicacao: string | null;
    tpEncarregadoDados: string | null;
}

export interface Candidato {
    id: number;
    nomeUrna: string;
    numero: number;
    idCandidatoSuperior: number;
    nomeCompleto: string;
    descricaoSexo: string;
    dataDeNascimento: string;
    tituloEleitor: string;
    cpf: string | null;
    descricaoEstadoCivil: string;
    descricaoCorRaca: string;
    descricaoSituacao: string;
    nacionalidade: string;
    grauInstrucao: string;
    ocupacao: string;
    gastoCampanha1T: number | null;
    gastoCampanha2T: number | null;
    sgUfNascimento: string;
    nomeMunicipioNascimento: string;
    localCandidatura: string;
    ufCandidatura: string;
    ufSuperiorCandidatura: string;
    codigoSituacaoCandidatoSuperior: number;
    dataUltimaAtualizacao: string;
    fotoUrl: string;
    fotoUrlPublicavel: boolean;
    fotoDataUltimaAtualizacao: string | null;
    descricaoTotalizacao: string;
    nomeColigacao: string;
    composicaoColigacao: string;
    descricaoTipoDrap: string;
    numeroProcessoDrap: string;
    numeroProcessoDrapEncrypt: string;
    numeroProcesso: string;
    numeroProcessoEncrypt: string;
    numeroProcessoPrestContas: string | null;
    numeroProcessoPrestContasEncrypt: string | null;
    numeroProtocolo: string | null;
    cargo: Cargo;
    bens: Bem[];
    totalDeBens: number;
    vices: Vice[];
    partido: Partido;
    eleicao: Eleicao;
    emails: string | null;
    sites: string[];
    arquivos: Arquivo[];
    eleicoesAnteriores: EleicaoAnterior[];
    substituto: string | null;
    motivos: string | null;
    motivoSituacao: string | null;
    codigoSituacaoCandidato: number;
    descricaoSituacaoCandidato: string;
    isCandidatoInapto: boolean;
    codigoSituacaoPartido: string;
    descricaoSituacaoPartido: string;
    isCandFechado: boolean;
    infoComplementar: InfoComplementar;
    cdSituacaoCassacao: number;
    cdSituacaoDiploma: number;
    legenda: string | null;
    cnpjcampanha: string;
    ds_MOTIVO_OUTROS: string | null;
    st_MOTIVO_AUSENCIA_REQUISITO: boolean;
    st_MOTIVO_IND_PARTIDO: boolean;
    gastoCampanha: number;
    st_SUBSTITUIDO: boolean;
    st_MOTIVO_FICHA_LIMPA: boolean;
    st_MOTIVO_ABUSO_PODER: boolean;
    st_MOTIVO_COMPRA_VOTO: boolean;
    st_MOTIVO_CONDUTA_VEDADA: boolean;
    st_MOTIVO_GASTO_ILICITO: boolean;
    descricaoNaturalidade: string;
    st_DIVULGA: boolean;
    st_DIVULGA_BENS: boolean;
    st_REELEICAO: boolean;
    st_DIVULGA_ARQUIVOS: boolean;
    candidatoApto: boolean;
}



/*=============*/
//Interfaces para lista de candidatos
export interface CandidatosRequest{
    codigo_cidade: string,
    codigo_cargo: string,
    ano_eleicao: string,
    id_eleicao: string
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
