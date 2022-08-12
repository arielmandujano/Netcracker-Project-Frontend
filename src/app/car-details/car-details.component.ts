import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../dataModels/car.model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  @Input() car!: Car | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
