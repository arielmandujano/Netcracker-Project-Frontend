import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../dataModels/jwt-dto.model';
import { LoginUser } from '../dataModels/login-user.model';
import { NewUser } from '../dataModels/new-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = 'http://localhost:8080/auth';

  constructor(
    private http : HttpClient
  ) { }

  public newUser(newUser : NewUser) : Observable<any> {
    return this.http.post<any>(this.authURL + '/newUser',newUser);
  }

  public login(loginUser : LoginUser) : Observable<JwtDto> {
    return this.http.post<any>(this.authURL + '/login' , loginUser);
  }
}
