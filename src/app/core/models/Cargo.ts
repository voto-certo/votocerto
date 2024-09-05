export interface Cargo{
    nome: string,
    valor: string,
    abrangencia: TipoAbrangencia,
}

export enum TipoAbrangencia {
    Municipal = 'M',
    Federal = 'F'
}
