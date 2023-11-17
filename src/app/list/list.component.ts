import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importe o AuthService

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  username: string = ''; // Adicione a propriedade para armazenar o nome do usuário
  characters: any[] = [];
  currentPage = 1;
  searchSubscription: Subscription | undefined;
  showSearchBar = true;
  searchTerm: string = '';
  loading = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private searchService: SearchService,
    private authService: AuthService // Injete o AuthService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.setupSearchSubscription();
    this.loadUsername(); // Carregue o nome do usuário ao inicializar o componente
  }

  loadCharacters(): void {
    if (!this.loading) {
      this.loading = true;

      const loadCharactersObservable = this.searchTerm
        ? this.apiService.getFilteredCharacters(this.searchTerm, this.currentPage)
        : this.apiService.getCharacters(this.currentPage);

      loadCharactersObservable.subscribe(
        (data: any) => {
          if (this.searchTerm && this.currentPage === 1) {
            this.characters = this.searchService.filterCharacters(data.results, this.searchTerm);
          } else {
            this.characters = this.characters.concat(data.results);
          }

          this.loading = false;
        },
        (error: any) => {
          console.error('API Error:', error);
          this.loading = false;
        }
      );

      if (!this.searchTerm) {
        this.currentPage++;
      }
    }
  }

  setupSearchSubscription(): void {
    this.searchSubscription = this.searchService.searchQuery$.subscribe(() => {
      this.applySearchFilter();
    });
  }

  loadUsername(): void {
    this.authService.getUsername().subscribe((username) => {
      this.username = username || '';
    });
  }

  applySearchFilter(): void {
    this.searchTerm = this.searchService.getCurrentSearchQuery() || '';
    this.currentPage = 1;
    this.loadCharacters();
  }

  onCharacterClick(id: number): void {
    this.searchService.updateSearchQuery(this.searchTerm);
    this.router.navigate(['/details', id.toString()]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight - 100;

    if (pos > max && !this.loading) {
      this.loadCharacters();
    }
  }
}