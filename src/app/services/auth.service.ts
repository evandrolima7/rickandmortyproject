import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Flag para verificar se o usuário está autenticado
  public isAuthenticated: boolean = false;

  // Nome de usuário logado
  private loggedInUsername: string | null = null;

  // Assunto para emitir atualizações do perfil do usuário
  private userProfileSubject = new BehaviorSubject<any>(null);

  // Observable para os componentes se inscreverem nas atualizações do perfil
  userProfile$ = this.userProfileSubject.asObservable();

  constructor() {
    // Inicializa o estado de autenticação com base nos dados armazenados localmente
    this.isAuthenticated = localStorage.getItem('authenticated') === 'true';
    this.loggedInUsername = localStorage.getItem('username');
  }

  // Função para autenticar o usuário
  authenticate(username: string, password: string, remember: boolean): boolean {
    // Lógica para validar se o usuário é válido
    const isUserValid = this.isValidUser(username, password);

    if (isUserValid) {
      // Define o usuário como autenticado
      this.isAuthenticated = true;
      this.loggedInUsername = username;

      // Notifica os componentes sobre a atualização do perfil do usuário
      this.userProfileSubject.next(this.getUserProfile());

      // Salva o estado de autenticação e o nome de usuário se "lembrar" estiver ativado
      if (remember) {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('username', username);
      } else {
        // Se "lembrar" não estiver ativado, limpa as informações salvas
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
      }
    }

    return this.isAuthenticated;
  }

  // Função para validar se o usuário é válido (lógica de validação simulada)
  isValidUser(username: string, password: string): boolean {
    // Implemente a lógica real de validação do usuário aqui
    return !!username && !!password;
  }

  // Função para obter o perfil do usuário (simulada)
  getUserProfile(): any {
    return { name: this.loggedInUsername, email: `${this.loggedInUsername}@example.com`, registrationDate: new Date() };
  }

  // Função para obter o nome de usuário (Observable para permitir inscrições)
  getUsername(): Observable<string | null> {
    return of(this.isAuthenticated ? this.loggedInUsername : null);
  }

  // Função para fazer logout
  logout(): void {
    // Define o estado de autenticação como falso e notifica os componentes sobre a alteração do perfil
    this.isAuthenticated = false;
    this.userProfileSubject.next(null);

    // Limpa as informações salvas ao fazer logout
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
  }
}