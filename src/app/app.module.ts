// Módulo principal do Angular para recursos específicos do navegador
import { NgModule } from '@angular/core';
// Módulo Angular para renderização específica do navegador
import { BrowserModule } from '@angular/platform-browser';
// Módulo para manipulação de solicitações HTTP
import { HttpClientModule } from '@angular/common/http';
// Módulo para animações
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Módulos personalizados das funcionalidades
import { ListModule } from './list/list.module';
import { DetailsModule } from './details/details.module';
import { SearchModule } from './search/search.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { MenuModule } from './menu/menu.module';

// Componente raiz da aplicação
import { AppComponent } from './app.component';

// Serviços utilizados em toda a aplicação
import { ApiService } from './services/api.service';
import { SearchService } from './services/search.service';
import { AuthService } from './services/auth.service';

// Módulo de roteamento para configuração da navegação
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  // Componentes, diretivas e pipes que pertencem a este módulo
  declarations: [
    AppComponent,
  ],
  // Outros módulos cujos componentes, diretivas ou pipes exportados são necessários pelos componentes declarados neste módulo
  imports: [
    BrowserModule, // Importa o BrowserModule para recursos específicos do navegador
    HttpClientModule, // Importa o HttpClientModule para manipulação de solicitações HTTP
    ListModule,
    DetailsModule,
    SearchModule,
    LoginModule,
    ProfileModule,
    MenuModule,
    AppRoutingModule, // Importa o módulo de roteamento para configuração da navegação
    BrowserAnimationsModule, // Importa o módulo de animações para transições mais suaves
  ],
  // Provedores de serviços que este módulo contribui para a coleção global de serviços
  providers: [
    ApiService,
    SearchService,
    AuthService,
  ],
  // A visualização principal da aplicação, chamada de componente raiz, que hospeda todas as outras visualizações da aplicação
  bootstrap: [AppComponent],
})
export class AppModule {}