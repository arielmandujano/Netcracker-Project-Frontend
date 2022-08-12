import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const TOKEN_KEY = 'AuthToken'!;
const USERNAME_KEY = 'AuthUsername'!;
const AUTHORITIES_KEY = 'AuthAuthorities'!;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private isLogged: boolean = false;
  private __isLoggedIn = new BehaviorSubject<boolean>(false);
  
  cast = this.__isLoggedIn.asObservable();

  constructor() { }

  setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  getUsername(): string | null{
    return sessionStorage.getItem(USERNAME_KEY);
  }

  setAuthorities(authority: string) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authority);
  }

  getAuthorities(): string | null{
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }

  getLogged(){
    return this.__isLoggedIn.asObservable();
  }

  setLogged(logged: boolean) {
    this.__isLoggedIn.next(logged);
  }

  public logout() {
    window.sessionStorage.clear();
  }
  
}
