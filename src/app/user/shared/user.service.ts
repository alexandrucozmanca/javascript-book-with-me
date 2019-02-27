import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUser(userId: string): Observable<any> {
    return this.httpClient.get('/api/v1/users/' + userId);
  }
}
