import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class OptionsActionSheetsService {
  constructor(private actionSheetController: ActionSheetController) {}

  async showSortOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort by',
      cssClass: 'sort-buttons',
      buttons: [
        {
          text: 'Popularity',
          data: 'popularity',
          icon: 'trending-up',
          cssClass: 'sort-button',
        },
        {
          text: 'Time',
          data: 'time',
          icon: 'time',
          cssClass: 'sort-button',
        },
        {
          text: 'Calories',
          data: 'calories',
          icon: 'fast-food',
          cssClass: 'sort-button',
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'cancel-button',
        },
      ],
    });
    await actionSheet.present();

    const { data: sortOption } = await actionSheet.onDidDismiss();
    return sortOption;
  }
}
