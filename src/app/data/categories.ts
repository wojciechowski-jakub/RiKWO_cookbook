import { Category } from './category.model';

export const CATEGORIES: Category[] = [
  new Category('Main course', 'type', '/assets/images/main-course.jpg'),
  new Category('Breakfast', 'type', '/assets/images/breakfast.jpg'),
  new Category('Dessert', 'type', '/assets/images/dessert.jpg'),
  new Category('Salad', 'type', '/assets/images/salad.jpg'),
  new Category('Vegetarian', 'diet', '/assets/images/vegetarian.jpg'),
  new Category('Ketogenic', 'diet', 'assets/images/keto.jpg'),
];
