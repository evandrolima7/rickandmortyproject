import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Assina as atualizações do perfil do usuário
    this.authService.userProfile$.subscribe(userProfile => {
      this.userProfile = userProfile;
    });
  }

  // Função chamada ao clicar no botão de logout
  onLogoutClick(): void {
    // Chama a função de logout do AuthService
    this.authService.logout();
  }
}