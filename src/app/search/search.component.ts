import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  // Função chamada ao realizar uma pesquisa
  search(): void {
    // Atualiza o termo de pesquisa no SearchService
    this.searchService.updateSearchQuery(this.searchTerm);
  }
}