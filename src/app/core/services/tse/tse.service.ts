import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EstadosResponse } from '../../models/Estado';
import { environment } from '../../../../environments/environment';
import { MunicipioRequest, MunicipioResponse } from '../../models/Municipio';
import { Candidato, CandidatoDetalheRequest, CandidatosRequest, CandidatosResponse } from '../../models/Candidato';
import { Cargo } from '../../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class TseService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEstadosEleitorais(id_eleicao: string): Observable<EstadosResponse> {
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
    console.log('Candidato detlahe request: ', candidatoRequest);
    const cacheKey = `candidato-${candidatoRequest.ano_eleicao}-${candidatoRequest.codigo_cidade}-${candidatoRequest.id_eleicao}-${candidatoRequest.id_candidato}`;
    return this.fetchWithCache<Candidato>(
      cacheKey,
      () => this.http.get<Candidato>(`${this.baseUrl}/candidatura/buscar/${candidatoRequest.ano_eleicao}/${candidatoRequest.codigo_cidade}/${candidatoRequest.id_eleicao}/candidato/${candidatoRequest.id_candidato}`)
    );
  }

  getCargos(): Cargo[] {
    return [
      {
        nome: "Prefeito",
        valor: "11",
      },
      {
        nome: "Vice-Prefeito",
        valor: "12",
      },
      {
        nome: "Vereador",
        valor: "13",
      }
    ];
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
