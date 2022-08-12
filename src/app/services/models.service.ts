import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../dataModels/model.model';
import { ModelsFilters } from '../dataModels/models-filters.model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  private urlGetAllModels: string = 'http://localhost:8080/models/getAllModels';
  private urlGetBrands: string = 'http://localhost:8080/models/getBrands';
  private urlGetModelsFiltered: string = 'http://localhost:8080/models/getModelsFiltered';

  constructor(private http: HttpClient) { }

  getBrands(): Observable<string[]> {
    return this.http.get<string[]>(this.urlGetBrands);
  }

  getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.urlGetAllModels);
  }

  getModelsFiltered(filters: ModelsFilters): Observable<Model[]> {
    console.log(filters);
    var params: string = '?';
    if(filters.model !== null && filters.model != '') {
      console.log(filters.model);
      params = params.concat('model='+filters.model+'&');
    }
    if(filters.brand !== null && filters.brand !== '') {
      console.log(filters.brand);
      params = params.concat('brand='+filters.brand+'&');
    }
    if(filters.year !== null) {
      console.log(filters.year);
      params = params.concat('year='+filters.year+'&');
    }
    if(filters.type !== null && filters.type != '') {
      console.log(filters.type);
      params = params.concat('type='+filters.type+'&');
    }
    if(filters.color !== null && filters.color != '') {
      console.log(filters.color);
      params = params.concat('type='+filters.color);
    }
    console.log(params);
    return this.http.get<Model[]>(this.urlGetModelsFiltered.concat(params));
  }
}
