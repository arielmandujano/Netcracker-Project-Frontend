import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdReservations } from '../dataModels/idReservations.models';
import { LoginUser } from '../dataModels/login-user.model';
import { Reservation } from '../dataModels/reservation.model';
import { AuthService } from '../services/auth.service';
import { ReservationsService } from '../services/reservations.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  userLogged!: LoginUser;
  username!: string | null;
  password!: string;
  role!: string | null;
  errorMessage!: string;

  reservationForm!: FormGroup;

  loginForm!: FormGroup;

  reservation!: Reservation | null;

  reservationId!: number;



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private reservationService:  ReservationsService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.role = this.tokenService.getAuthorities();
      this.username = this.tokenService.getUsername();
    }
    this.createGroup();
    this.createReservationGroup();
  }

  createGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

  createReservationGroup() {
    this.reservationForm = new FormGroup({
      id: new FormControl(this.reservationId, Validators.required)
    })
  }

  async onLogin(form: LoginUser) {
    this.userLogged = form.username != "" ? form : this.userLogged;
    this.username = form.username != "" ? form.username : this.username;
    this.password = form.password != "" ? form.password : this.password;
    await this.login();
  }

  getReservation(form: IdReservations) {
    this.reservationService.getReservationDetails(form.id , this.tokenService.getUsername()).subscribe(reservation => {
      this.reservation = reservation;
    },
    error => {
      this.reservation = null;
      alert("Sorry there is no any registered reservation with the specified ID number.");
    });
  }

  login = async () => {
    this.authService.login(this.userLogged).subscribe(data => {
      console.log(data.authorities[0].authority);
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities[0].authority);
      this.role = data.authorities[0].authority;
      this.tokenService.setLogged(true);
      if(this.role == 'Admin') {
        this.tokenService.setAdmin(true);
      } else {
        this.tokenService.setAdmin(false);
      }
    },
    error => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errorMessage = error.error;
      console.log(this.errorMessage);
      alert("Error en los campos.");
      this.tokenService.setLogged(false);
      this.tokenService.setAdmin(false);
    });
  }
}
