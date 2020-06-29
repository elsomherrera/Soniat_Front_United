
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUsuario } from '../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/jwt-model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8081/api/v1/auth/';

  constructor(private httpClient: HttpClient) { }

  public login(login: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + 'login', login);
  }

 
}