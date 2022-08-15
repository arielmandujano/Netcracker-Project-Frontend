import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private tokenService: TokenService
  ) { 
  }

  ngOnInit(): void {
    this.tokenService.cast.subscribe(data => {
      this.userLogged = data as boolean;
    });
    this.tokenService.casAdmin.subscribe( data => {
      this.isAdmin = data as boolean;
    });
  }

  onLogout(){
    this.tokenService.setLogged(false);
    this.tokenService.logout();
  }

}
