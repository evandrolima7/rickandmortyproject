import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';

// Configuração das rotas da aplicação
const routes: Routes = [
  { path: 'list', component: ListComponent },  // Rota para a lista de personagens
  { path: 'profile', component: ProfileComponent },  // Rota para o perfil do usuário
  { path: 'menu', component: MenuComponent },  // Rota para o menu principal
  { path: 'login', component: LoginComponent },  // Rota para a página de login
  { path: 'details/:id', component: DetailsComponent },  // Rota para os detalhes do personagem
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redireciona para a página de login por padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}