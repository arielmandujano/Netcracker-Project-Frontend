import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModelsFilters } from '../dataModels/models-filters.model';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-model-filters',
  templateUrl: './model-filters.component.html',
  styleUrls: ['./model-filters.component.css']
})
export class ModelFiltersComponent implements OnInit {

  @Output() modelsFilters = new EventEmitter<ModelsFilters>();

  model!: string;
  brand!: string;
  year!: number;
  color!: string;
  type!: string;
  orderBy!: string;
  order!: string;

  filtersForm!: FormGroup;

  brands: string[] = [];

  constructor(
    private modelsService: ModelsService
  ) { }

  ngOnInit(): void {
    this.createGroup();
    this.getBrands();
  }

  getBrands() {
    this.modelsService.getBrands().subscribe(brandList => {
      this.brands = brandList;
    })
  }

  createGroup() {
    this.filtersForm = new FormGroup({
      model: new FormControl(this.model),
      brand: new FormControl(this.brand),
      year: new FormControl(this.year),
      color: new FormControl(this.color),
      type: new FormControl(this.type),
      orderBy: new FormControl(this.orderBy),
      order: new FormControl(this.order)
    });
  }

  getMoldelsFiltered(filters: ModelsFilters) {
    this.modelsFilters.emit(filters);
  }

}
