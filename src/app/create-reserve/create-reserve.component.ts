import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AvialableCars } from '../dataModels/avialable-cars.model';
import { Car } from '../dataModels/car.model';
import { Reservation } from '../dataModels/reservation.model';
import { User } from '../dataModels/user.model';
import { CarsService } from '../services/cars.service';
import { ReservationsService } from '../services/reservations.service';
import { TokenService } from '../services/token.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.css']
})
export class CreateReserveComponent implements OnInit {

  cars: Car[] = [];
  selectedCar!: Car | undefined;
  totalAmount: number = 0.0;

  startDate!: string;
  endDate!: string; 
  model!: string;
  brand!: string;
  year!: number;

  today !: Date;
  tomorrow !: Date;
  todayString : string = "";
  tomorrowString : string = "";
  minDate!: string;

  selectedCarId!: number;

  parametersForm!: FormGroup;
  carForm!: FormGroup;

  user!: User;

  constructor(
    private carsService : CarsService,
    private tokenService : TokenService,
    private usersService : UsersService,
    private reservationService: ReservationsService
  ) { }

  ngOnInit(): void {
    this.today = new Date();
    this.tomorrow = new Date(this.today);
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.todayString = this.today.getFullYear() + '-' + this.format2DigitNumber(this.today.getMonth() + 1) + '-' + this.format2DigitNumber(this.today.getDate());
    this.tomorrowString = this.tomorrow.getFullYear() + '-' + this.format2DigitNumber(this.tomorrow.getMonth() + 1) + '-' + this.format2DigitNumber(this.tomorrow.getDate());
    this.startDate = this.todayString;
    this.endDate = this.tomorrowString;
    this.createGroupParameters();
    this.createGroupCar();
    this.getUser();
  }

  createGroupParameters() {
    this.parametersForm = new FormGroup({
      startDate : new FormControl(this.startDate, Validators.required),
      endDate : new FormControl(this.endDate, Validators.required),
      model : new FormControl(this.model),
      brand : new FormControl(this.brand),
      year: new FormControl(this.year)
    });
  }

  lookAvialableCars(form: AvialableCars) {
    this.carsService.getAvialableCars(form).subscribe(cars => {
      this.cars = cars;
    })
  }

  createGroupCar() {
    this.carForm = new FormGroup({
      selectedCarId : new FormControl(this.selectedCarId)
    });
  }

  setCarById(e: Event) {
    console.log(this.selectedCarId);
    this.selectedCar = this.cars.find( car => {
      return car.carId == this.selectedCarId;
    });
    this.totalAmount = typeof(this.selectedCar) !== 'undefined' ? this.selectedCar?.pricePerDay * this.calculateDaysBetween(this.startDate, this.endDate) : 0.00;
  }

  format2DigitNumber(num: number) : string {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  }

  formatDate(date: string) {
    if(typeof(date) === 'string') {
      let arr = date.split('-');
      let newArr = [arr[1],arr[2],arr[0]]
      return newArr.join('/');
    }
    return '';
  }

  calculateDaysBetween(start: string, end: string) : number {
    var startDate = new Date(this.formatDate(start));
    var endDate = new Date(this.formatDate(end));
    let diff = endDate.getTime() - startDate.getTime();
    return Math.ceil(diff/(1000 * 3600 * 24));
  }

  updateMinDate(e: Event) {
    let newMinDate = new Date(this.formatDate(this.startDate));
    newMinDate.setDate(newMinDate.getDate() + 1 );
    this.tomorrowString = newMinDate.getFullYear() + '-' + this.format2DigitNumber(newMinDate.getMonth() + 1) + '-' + this.format2DigitNumber(newMinDate.getDate());
  }

  submitReservation(e: Event) {
    let reserve : Reservation = {
      'reservationId' : null,
      'carId' : this.selectedCar,
      'userId' : this.user,
      'reservationDate' : this.today.toISOString().slice(0,10),
      'startDate' : this.startDate,
      'endDate' : this.endDate,
      'formatOfPayment' : 'Credit card',
      'totalAmount' : null, 
      'returned' : false
    }
    this.reservationService.createReservation(reserve).subscribe( response => {
      console.log(response);
      alert("Reserve created with code: " + response);
      window.location.reload();
    })
  }

  getUser(){
    this.usersService.getUserByUsername(this.tokenService.getUsername()).subscribe(user => {
      this.user = user;
    });
  }

}
