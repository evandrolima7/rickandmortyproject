import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Fonte de dados para a barra de busca
  private searchQuerySource = new Subject<string>();

  // Observable para os componentes se inscreverem nas atualizações da barra de busca
  searchQuery$ = this.searchQuerySource.asObservable();

  // Armazena o termo de pesquisa atual
  private currentSearchQuery: string = '';

  // Atualiza o termo de pesquisa e notifica os componentes
  updateSearchQuery(query: string): void {
    this.currentSearchQuery = query;
    this.searchQuerySource.next(query);
  }

  // Obtém o termo de pesquisa atual
  getCurrentSearchQuery(): string {
    return this.currentSearchQuery;
  }

  // Filtra os personagens com base no termo de pesquisa (lógica simulada)
  filterCharacters(characters: any[], searchQuery: string): any[] {
    // Lógica de filtro (substitua pela lógica real)
    return characters.filter(
      character =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}