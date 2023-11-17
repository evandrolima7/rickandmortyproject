// Importa módulos necessários do Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // Variável para armazenar os detalhes do personagem
  characterDetails: any;
  
  // Lista de episódios relacionados ao personagem
  episodes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Obtém o ID do personagem da rota
    const characterId = this.route.snapshot.paramMap.get('id');

    // Carrega os detalhes do personagem
    if (characterId) {
      this.loadCharacterDetails(characterId);
    }

    // Configura a assinatura para mudanças na barra de pesquisa
    this.setupSearchSubscription();
  }

  // Função para carregar os detalhes do personagem
  loadCharacterDetails(id: string): void {
    // Chama o serviço da API para obter os detalhes do personagem
    this.apiService.getCharacterDetails(id).subscribe((data: any) => {
      // Armazena os detalhes do personagem
      this.characterDetails = data;

      // Obter detalhes dos episódios relacionados ao personagem
      this.loadEpisodeDetails(data.episode);
    });
  }

  // Função para carregar detalhes dos episódios
  loadEpisodeDetails(episodeUrls: string[]): void {
    // Itera sobre os URLs dos episódios
    episodeUrls.forEach(episodeUrl => {
      // Chama o serviço da API para obter os detalhes do episódio
      this.apiService.getEpisodeDetailsByUrl(episodeUrl).subscribe((episodeData: any) => {
        // Adiciona os detalhes do episódio à lista
        this.episodes.push({
          title: episodeData.name,
          episode: episodeData.episode
        });
      });
    });
  }

  // Função chamada ao clicar no botão de voltar
  onBackClick(): void {
    // Navega de volta para a lista de personagens
    this.router.navigate(['/list']);

    // Limpa o termo de pesquisa na barra de busca
    this.searchService.updateSearchQuery('');
  }

  // Configura a assinatura para mudanças na barra de pesquisa
  setupSearchSubscription(): void {
    this.searchService.searchQuery$.subscribe(() => {
      // Recarrega os detalhes do personagem com base no ID atual
      this.loadCharacterDetails(this.route.snapshot.paramMap.get('id')!);
    });
  }
}