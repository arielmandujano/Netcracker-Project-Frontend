import { Component, OnInit } from '@angular/core';
import { Model } from '../dataModels/model.model';
import { ModelsFilters } from '../dataModels/models-filters.model';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  models : Model[] = [];

  filterParameters!: ModelsFilters;

  constructor(
    private modelsService: ModelsService
  ) { }

  ngOnInit(): void {
    this.getAllModels();
  }


  setFilters(filterParameters: ModelsFilters) {
    this.filterParameters = filterParameters;
    this.getModelsFiltered();
  }

  getAllModels() {
    this.modelsService.getAllModels().subscribe(allModels => {
      this.models = allModels;
    })
  }

  getModelsFiltered() {
    this.modelsService.getModelsFiltered(this.filterParameters).subscribe(modelsFiltered => {
      switch(this.filterParameters.orderBy) {
        case 'MODEL':
          if(this.filterParameters.order == 'ASC') {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.modelName > b.modelName ? 1 : -1));
          } else {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.modelName < b.modelName ? 1 : -1));
          }
          break;
        case 'YEAR' :
          if(this.filterParameters.order == 'ASC') {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.modelYear > b.modelYear ? 1 : -1));
          } else {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.modelYear < b.modelYear ? 1 : -1));
          }
          break;
        case "BRAND" :
          if(this.filterParameters.order == 'ASC') {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.brand > b.brand ? 1 : -1));
          } else {
            this.models = modelsFiltered.sort((a: Model, b: Model) => (a.brand < b.brand ? 1 : -1));
          }
          break;
        default :
          this.models = modelsFiltered;
      }
      
    })
  }

}
