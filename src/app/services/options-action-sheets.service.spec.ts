import { TestBed } from '@angular/core/testing';

import { OptionsActionSheetsService } from './options-action-sheets.service';

describe('OptionsActionSheetsService', () => {
  let service: OptionsActionSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionsActionSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
