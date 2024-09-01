import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadosResponse } from '../models/Estado';
import { environment } from '../../../environments/environment';
import { MunicipioResponse } from '../models/Municipio';
import { CandidatosRequest, CandidatosResponse } from '../models/Candidato';

@Injectable({
  providedIn: 'root'
})
export class TseService {

  private baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getEstadosEleitorais(): Observable<EstadosResponse> {
    return this.http.get<EstadosResponse>(`${this.baseUrl}${environment.endpoints.eleicao}/eleicao-atual?idEleicao=${environment.endpoints.idEleicao}`);
  }

  getMunicipiosDoEstado(sigla: string): Observable<MunicipioResponse> {
    return this.http.get<MunicipioResponse>(`${this.baseUrl}/eleicao/buscar/${sigla}/${environment.endpoints.idEleicao}/municipios`);
  }

  getCandidatos(candidatosRequest: CandidatosRequest): Observable<CandidatosResponse> {
    return this.http.get<CandidatosResponse>(`${this.baseUrl}/candidatura/listar/2024/${candidatosRequest.codigo_cidade}/${environment.endpoints.idEleicao}/${candidatosRequest.codigo_cargo}/candidatos`);
  }

}
