import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today!: Date;
  tomorrow!: Date;
  logged!: boolean;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

}
