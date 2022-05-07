import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(public loadingController: LoadingController) {}

  displayLoader() {
    this.loadingController
      .create({
        message: 'Loading...',
        backdropDismiss: true,
        cssClass: 'loader',
      })
      .then((response) => {
        response.present();
      });
  }

  dismissLoader() {
    this.loadingController.dismiss().then((response) => {});
  }
}
