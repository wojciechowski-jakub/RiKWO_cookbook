import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/data/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;

  @HostBinding('style.background-image') background: string;

  constructor() {}

  ngOnInit() {
    this.background = `
      linear-gradient(hsla(0, 0%, 15%, 0.5), hsla(0, 0%, 15%, 0.5)),
      url('${this.category.photo}')
    `;
  }
}
