import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdReservations } from '../dataModels/idReservations.models';
import { Reservation } from '../dataModels/reservation.model';
import { ReservationsService } from '../services/reservations.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent implements OnInit {

  reservationForm!: FormGroup;

  reservation!: Reservation | null;

  reservationId!: number;

  constructor(
    private reservationService:  ReservationsService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.createReservationGroup();
  }

  createReservationGroup() {
    this.reservationForm = new FormGroup({
      id: new FormControl(this.reservationId, Validators.required)
    })
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

}
