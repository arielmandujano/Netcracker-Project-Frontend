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
  logged$!: BehaviorSubject<boolean>;

  constructor(
    private tokenService: TokenService
  ) { 
  }

  ngOnInit(): void {
    this.tokenService.cast.subscribe(data => {
      this.userLogged = data as boolean;
    })
  }

  onLogout(){
    this.tokenService.logout();
    this.tokenService.setLogged(false);
    window.location.reload();
  }

}
