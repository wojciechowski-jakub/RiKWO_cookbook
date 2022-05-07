import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
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
    private myRecipesService: MyRecipesService,
    private toastController: ToastController,
    private router: Router
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

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  get preparationSteps() {
    return this.recipeForm.get('preparationSteps') as FormArray;
  }

  addPreparationStep() {
    this.preparationSteps.push(this.fb.control(''));
  }

  deletePreparationStep(index: number) {
    this.preparationSteps.removeAt(index);
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
    this.showToast();
    this.recipeForm.reset();
    this.imageUrl = '';
    this.router.navigate(['cookbook/recipe-details', id]);
  }

  private showToast() {
    from(
      this.toastController.create({
        message: 'Your recipe have been created!',
        duration: 3000,
        position: 'bottom',
        cssClass: 'toast',
      })
    ).subscribe((toast) => toast.present());
  }
}
