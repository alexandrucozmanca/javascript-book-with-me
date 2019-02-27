import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  expiration = 0;
  username = '';
}

@Injectable()
export class AuthService {

  private decodedToken;


  constructor (
    private httpClient: HttpClient,
  ) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private saveToken(token: string) {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.httpClient.post('/api/v1/users/register', userData);
  }

  public login(loginData: any): Observable<any> {
    return this.httpClient.post('/api/v1/users/auth', loginData).pipe(map(
      user => {
        if (user) {
          this.saveToken(user.toString());
        }
        return user;
      }
    ));
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthentificated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

  public getUserName(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
