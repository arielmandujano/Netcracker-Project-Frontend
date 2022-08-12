import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../dataModels/model.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() model!: Model;

  constructor() { }

  ngOnInit(): void {
  }

}
