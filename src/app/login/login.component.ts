import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberUser: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.authService.authenticate(this.username, this.password, this.rememberUser)) {
      // Redireciona para a rota /menu após o login bem-sucedido
      this.router.navigate(['/menu'], { state: { username: this.username } });
    } else {
      this.errorMessage = 'Usuário ou senha incorretos.';
    }
  }
}