import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EstadosResponse } from '../../models/Estado';
import { environment } from '../../../../environments/environment';
import { MunicipioRequest, MunicipioResponse } from '../../models/Municipio';
import { Candidato, CandidatoDetalheRequest, CandidatosRequest, CandidatosResponse } from '../../models/Candidato';
import { Cargo, TipoAbrangencia } from '../../models/Cargo';
import { Eleicao } from '../../models/Ordinaria';

@Injectable({
  providedIn: 'root'
})
export class TseService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEstadosEleitorais(id_eleicao: number): Observable<EstadosResponse> {
    return this.fetchWithCache<EstadosResponse>(
      `estados-${id_eleicao}`,
      () => this.http.get<EstadosResponse>(`${this.baseUrl}/eleicao/eleicao-atual?idEleicao=${id_eleicao}`)
    );
  }

  getMunicipiosDoEstado(municipioRequest: MunicipioRequest): Observable<MunicipioResponse> {
    return this.fetchWithCache<MunicipioResponse>(
      `municipios-${municipioRequest.sigla}-${municipioRequest.id_eleicao}`,
      () => this.http.get<MunicipioResponse>(`${this.baseUrl}/eleicao/buscar/${municipioRequest.sigla}/${municipioRequest.id_eleicao}/municipios`)
    );
  }

  getCandidatos(candidatosRequest: CandidatosRequest): Observable<CandidatosResponse> {
    const cacheKey = `candidatos-${candidatosRequest.ano_eleicao}-${candidatosRequest.codigo_cidade}-${candidatosRequest.id_eleicao}-${candidatosRequest.codigo_cargo}`;
    return this.fetchWithCache<CandidatosResponse>(
      cacheKey,
      () => this.http.get<CandidatosResponse>(`${this.baseUrl}/candidatura/listar/${candidatosRequest.ano_eleicao}/${candidatosRequest.codigo_cidade}/${candidatosRequest.id_eleicao}/${candidatosRequest.codigo_cargo}/candidatos`)
    );
  }

  getCandidatoDetalhe(candidatoRequest: CandidatoDetalheRequest): Observable<Candidato> {
    const cacheKey = `candidato-${candidatoRequest.ano_eleicao}-${candidatoRequest.codigo_cidade}-${candidatoRequest.id_eleicao}-${candidatoRequest.id_candidato}`;
    return this.fetchWithCache<Candidato>(
      cacheKey,
      () => this.http.get<Candidato>(`${this.baseUrl}/candidatura/buscar/${candidatoRequest.ano_eleicao}/${candidatoRequest.codigo_cidade}/${candidatoRequest.id_eleicao}/candidato/${candidatoRequest.id_candidato}`)
    );
  }

  getCargos(): Cargo[] {
    return [
      {
        nome: "Presidente",
        valor: "1",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Vice-presidente",
        valor: "2",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Governador",
        valor: "3",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Vice-governador",
        valor: "4",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Senador",
        valor: "5",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Deputado Federal",
        valor: "6",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Deputado Estadual",
        valor: "7",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "1º Suplente",
        valor: "9",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "2º Suplente",
        valor: "10",
        abrangencia: TipoAbrangencia.Federal
      },
      {
        nome: "Prefeito",
        valor: "11",
        abrangencia: TipoAbrangencia.Municipal
      },
      {
        nome: "Vice-Prefeito",
        valor: "12",
        abrangencia: TipoAbrangencia.Municipal
      },
      {
        nome: "Vereador",
        valor: "13",
        abrangencia: TipoAbrangencia.Municipal
      }
    ]
  }


  getEleicoes(): Observable<Eleicao[]> {
    const cacheKey = 'eleicoes-ordinarias';
    return this.fetchWithCache<Eleicao[]>(
      cacheKey,
      () => this.http.get<Eleicao[]>(`${this.baseUrl}/ata/ordinarias`)
    );
  }

  private fetchWithCache<T>(cacheKey: string, httpCall: () => Observable<T>): Observable<T> {
    if (typeof window !== 'undefined') {
      // Somente executa o código de cache se estiver no navegador
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        return of(JSON.parse(cachedData));
      } else {
        return httpCall().pipe(
          tap(data => localStorage.setItem(cacheKey, JSON.stringify(data))),
          catchError(error => {
            console.error(`Erro ao buscar dados: ${error}`);
            throw error;
          })
        );
      }
    } else {
      // Retorna um Observable vazio ou erro se não estiver no navegador
      return httpCall().pipe(
        catchError(error => {
          console.error(`Erro ao buscar dados: ${error}`);
          throw error;
        })
      );
    }
  }
}
