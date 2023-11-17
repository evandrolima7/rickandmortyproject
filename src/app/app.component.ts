import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Flag para determinar se deve ocultar a barra de pesquisa com base na rota atual
  hideSearch: boolean = false;

  constructor(public router: Router) {}

  ngOnInit() {
    // Inscreva-se nos eventos de navegação e filtre para obter apenas eventos NavigationEnd
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Atualize o valor de hideSearch com base na rota atual
      this.hideSearch = event.url !== '/profile';
    });
  }
}