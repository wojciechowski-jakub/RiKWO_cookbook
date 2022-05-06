import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyRecipesService } from '../services/my-recipes.service';

@Component({
  selector: 'app-add-recipe-tab',
  templateUrl: './add-recipe-tab.page.html',
  styleUrls: ['./add-recipe-tab.page.scss'],
})
export class AddRecipeTabPage implements OnInit {
  recipeForm = this.fb.group({
    photo: ['', Validators.required],
    title: ['', Validators.required],
    ingredients: this.fb.array([this.createIngredientFormGroup()]),
    preparationSteps: this.fb.array([this.fb.control('', Validators.required)]),
  });

  imageUrl: any = '';

  constructor(
    private fb: FormBuilder,
    private myRecipesService: MyRecipesService
  ) {}

  ngOnInit() {}

  private createIngredientFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      unit: ['', Validators.required],
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  get preparationSteps() {
    return this.recipeForm.get('preparationSteps') as FormArray;
  }

  addPreparationStep() {
    this.preparationSteps.push(this.fb.control(''));
  }

  loadPicture() {
    const image$ = from(
      Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      })
    );

    image$.subscribe((image) => {
      this.imageUrl = `data:image/jpeg;base64,${image.base64String}`;
      this.recipeForm.get('photo').setValue(this.imageUrl);
    });
  }

  onSubmit() {
    const id = `${environment.storageIndexPrefix}${new Date().getTime()}`;
    this.myRecipesService.bookmark({ id, ...this.recipeForm.value });
  }
}
