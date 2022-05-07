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
        },
        {
          text: 'Time',
          data: 'time',
        },
        {
          text: 'Calories',
          data: 'calories',
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    const { data: sortOption } = await actionSheet.onDidDismiss();
    return sortOption;
  }
}
