import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../dataModels/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlGetUserByUsername = 'http://localhost:8080/users/getUserByUsername';

  constructor(
    private http : HttpClient
  ) { }

  getUserByUsername(username: string | null): Observable<User> {
    return this.http.get<User>(this.urlGetUserByUsername.concat('?username='+username));
  }
}
