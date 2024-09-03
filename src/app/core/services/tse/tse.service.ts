import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EstadosResponse } from '../../models/Estado';
import { environment } from '../../../../environments/environment';
import { MunicipioResponse } from '../../models/Municipio';
import { Candidato, CandidatoDetalheRequest, CandidatosRequest, CandidatosResponse } from '../../models/Candidato';
import { Cargo } from '../../models/Cargo';

@Injectable({
  providedIn: 'root'
})
export class TseService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getEstadosEleitorais(): Observable<EstadosResponse> {
    return this.fetchWithCache<EstadosResponse>(
      'estados',
      () => this.http.get<EstadosResponse>(`${this.baseUrl}${environment.endpoints.eleicao}/eleicao-atual?idEleicao=${environment.endpoints.idEleicao}`)
    );
  }

  getMunicipiosDoEstado(sigla: string): Observable<MunicipioResponse> {
    return this.fetchWithCache<MunicipioResponse>(
      `municipios-${sigla}`,
      () => this.http.get<MunicipioResponse>(`${this.baseUrl}/eleicao/buscar/${sigla}/${environment.endpoints.idEleicao}/municipios`)
    );
  }

  getCandidatos(candidatosRequest: CandidatosRequest): Observable<CandidatosResponse> {
    const cacheKey = `candidatos-${candidatosRequest.codigo_cidade}-${candidatosRequest.codigo_cargo}`;
    return this.fetchWithCache<CandidatosResponse>(
      cacheKey,
      () => this.http.get<CandidatosResponse>(`${this.baseUrl}/candidatura/listar/2024/${candidatosRequest.codigo_cidade}/${environment.endpoints.idEleicao}/${candidatosRequest.codigo_cargo}/candidatos`)
    );
  }

  getCandidatoDetalhe(candidatoRequest: CandidatoDetalheRequest): Observable<Candidato> {
    const cacheKey = `candidato-${candidatoRequest.codigo_cidade}-${candidatoRequest.id_candidato}`;
    return this.fetchWithCache<Candidato>(
      cacheKey,
      () => this.http.get<Candidato>(`${this.baseUrl}/candidatura/buscar/2024/${candidatoRequest.codigo_cidade}/${environment.endpoints.idEleicao}/candidato/${candidatoRequest.id_candidato}`)
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
