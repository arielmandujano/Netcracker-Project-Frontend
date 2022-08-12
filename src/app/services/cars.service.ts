import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvialableCars } from '../dataModels/avialable-cars.model';
import { Car } from '../dataModels/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private urlGetAvialableCars = 'http://localhost:8080/cars/getAvailableCars';

  constructor(
    private http: HttpClient
  ) { }

  getAvialableCars(filters: AvialableCars) : Observable<Car[]>{
    console.log(filters)
    var params: string = '?';
    params = params.concat('startDate='+filters.startDate+'&endDate='+filters.endDate);
    if(filters.model !== null && filters.model !== '') {
      params = params.concat('&model='+filters.model);
    }
    if(filters.brand !== null && filters.brand !== '') {
      params = params.concat('&brand='+filters.brand);
    }
    if(filters.year !== null) {
      params = params.concat('&year='+filters.year);
    }
    return this.http.get<Car[]>(this.urlGetAvialableCars.concat(params));
  }
}
