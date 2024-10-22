import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  username: string = '';
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCharacters();
    this.setupSearchSubscription();
    this.loadUsername();
    this.animateScroll(); // Adicione aqui para inicializar animação ao carregar
  }

  loadCharacters(): void {
    if (!this.loading) {
      this.loading = true;

      const loadCharactersObservable = this.searchTerm
        ? this.apiService.getFilteredCharacters(this.searchTerm, this.currentPage)
        : this.apiService.getCharacters(this.currentPage);

      loadCharactersObservable.subscribe(
        (data: any) => {
          const newCharacters = this.searchTerm && this.currentPage === 1
            ? this.searchService.filterCharacters(data.results, this.searchTerm)
            : data.results;

          this.characters = this.characters.concat(newCharacters);
          this.loading = false;
          this.animateScroll(); // Chama a função de animação após carregar personagens
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

  animateScroll(): void {
    const sections = document.querySelectorAll('.js-scroll');

    if (sections.length) {
      const windowMetade = window.innerHeight * 0.6;

      const animaScroll = () => {
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top - windowMetade;
          const isSectionVisible = sectionTop < 0;

          if (isSectionVisible) {
            section.classList.add('ativo');
          } else if (section.classList.contains('ativo')) {
            section.classList.remove('ativo');
          }
        });
      };

      animaScroll(); // Verifica a visibilidade no carregamento inicial
      window.addEventListener('scroll', animaScroll);
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