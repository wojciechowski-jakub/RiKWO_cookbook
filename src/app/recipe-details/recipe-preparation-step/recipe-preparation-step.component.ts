import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-preparation-step',
  templateUrl: './recipe-preparation-step.component.html',
  styleUrls: ['./recipe-preparation-step.component.scss'],
})
export class RecipePreparationStepComponent implements OnInit {
  @Input() step: string;
  @Input() stepNumber: number;

  constructor() {}

  ngOnInit() {}
}
