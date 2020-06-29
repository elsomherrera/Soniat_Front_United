import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../configuration/config.service';


import { BASE_URL } from '../config/config';
// const baseUrl = 'https://soniatback.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:8080/api/v1';

let headers: any;

@Injectable()
export class ApiService {

  private urlEndPoint: string = BASE_URL;

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public extractToken() {
    const parametros = {
      username : 'admin',
      password : 'password'
    };
    headers = {
      'Authorization': 'Basic ' + btoa('admin:password'),
      'Content-type': 'application/json'
    };
    return this.http.post(BASE_URL + '/bot/login', parametros, {headers, responseType: 'text'});
  }
  getAnswer(mensaje: String, token: String) {
    headers = {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Methods': 'GET,POST'
    };
    return this.http.get(BASE_URL + '/bot/botQuestion?question=' + mensaje, {headers, responseType: 'text'},
    );
  }
  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body || { };
  // }
  // private handleError(error: Response | any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
    // window.alert(errorMessage);
    // return Observable.throw(errorMessage);
  }
// }
