import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../dataModels/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlGetAllRoles: string = 'http://localhost:8080/roles/getAllRoles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlGetAllRoles);
  }
}
