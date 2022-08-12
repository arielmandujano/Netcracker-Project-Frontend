import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../dataModels/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private urlCreateReservation = 'http://localhost:8080/reservations/insertNewReserve';
  private urlGetReservation = 'http://localhost:8080/reservations/getReservationByIdAndUsername';

  constructor(
    private http: HttpClient
  ) { }

  createReservation(reservation: Reservation): Observable<any> {
    let params = '?carId='+reservation.carId?.carId+'&userId='+reservation.userId.userId+'&reservationDate='+reservation.reservationDate+'&start='+reservation.startDate+'&end='+reservation.endDate+'&formatOfPayment='+reservation.formatOfPayment+'&returned='+reservation.returned;
    return this.http.post<any>(this.urlCreateReservation.concat(params),'');
  }

  getReservationDetails(id: number, username: string | null) : Observable<Reservation> {
    return this.http.get<Reservation>(this.urlGetReservation.concat('?id='+id+'&username='+username));
  }
}
