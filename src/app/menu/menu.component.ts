import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Importe o Router

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}  // Injete o Router

  ngOnInit(): void {
    // Assina as atualizações do nome de usuário
    this.authService.getUsername().subscribe((username) => {
      this.username = username;
    });
  }

  // Função chamada ao clicar no botão de logout
  logout(): void {
    // Chama a função de logout do AuthService
    this.authService.logout();
    // Redireciona para a rota /login após o logout
    this.router.navigate(['/login']);
  }
}