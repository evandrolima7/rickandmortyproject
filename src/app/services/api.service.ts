import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // URL base da API Rick & Morty
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  // Obtém a lista de personagens paginada
  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}character/?page=${page}`);
  }

  // Obtém a lista de personagens filtrada por termo de pesquisa e paginada
  getFilteredCharacters(searchTerm: string, page: number): Observable<any> {
    const apiUrl = `${this.apiUrl}character/?name=${searchTerm}&page=${page}`;

    return this.http.get(apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtém os detalhes de um personagem por ID
  getCharacterDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}character/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manipula erros da API
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);

    // Pode adicionar lógica adicional de tratamento de erro aqui

    return throwError('Erro na chamada à API');
  }

  // Obtém detalhes de um episódio por URL
  getEpisodeDetailsByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }
}