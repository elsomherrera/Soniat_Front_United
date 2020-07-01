import { APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SoniatComponent} from './components/soniat/soniat.component';
import {MessageComponent} from './components/message/message.component';
import {ApiService} from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';
import { FormsModule } from '@angular/forms';
import { ConfigService } from './configuration/config.service';
import { environment } from '../environments/environment';
import { InfiniteScrollModule} from 'ngx-infinite-scroll';
import { LoginComponent } from './components/login/login.component';
import { interceptorProvider } from './components/interceptors/interceptor.service';
import { ClientesComponent } from './components/clientes/clientes.component';
  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SoniatComponent,
    MessageComponent,
    ClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
   
   
  ],
  providers: [
    ConfigService,
    {
      provide   : APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps      : [ConfigService],
      multi     : true
    },
    ApiService,interceptorProvider],
   
    bootstrap: [AppComponent]
  })
export class AppModule { }

export function ConfigLoader(configService: ConfigService) {
//Note: this factory need to return a function (that return a promise)

  return () => configService.load(environment.baseUrl); 
}