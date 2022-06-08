import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from '../data/categories';
import { Category } from '../data/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }
}
