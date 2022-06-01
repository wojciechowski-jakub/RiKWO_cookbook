import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent implements OnInit {
  @Input() values: FilterValues;

  intolerances = [
    {
      name: 'Dairy',
      isChecked: false,
    },
    {
      name: 'Peanut',
      isChecked: false,
    },
    {
      name: 'Gluten',
      isChecked: false,
    },
    {
      name: 'Soy',
      isChecked: false,
    },
    {
      name: 'Seafood',
      isChecked: false,
    },
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    const previousIntolerances = this.values?.intolerances.split(',');

    if (previousIntolerances) {
      this.intolerances = this.intolerances.map((intolerance) => {
        if (previousIntolerances.includes(intolerance.name.toLowerCase()))
          intolerance.isChecked = true;
        return intolerance;
      });
    }
  }

  confirm(caloriesRange: any) {
    const { lower: minCalories, upper: maxCalories } = caloriesRange;
    const intolerances = this.intolerances
      .filter((intolerance) => intolerance.isChecked)
      .map((intolerance) => intolerance.name.toLowerCase())
      .join(',');

    const filterValues = { minCalories, maxCalories, intolerances };
    this.modalController.dismiss(filterValues);
  }
}

export interface FilterValues {
  minCalories: number;
  maxCalories: number;
  intolerances: string;
}
