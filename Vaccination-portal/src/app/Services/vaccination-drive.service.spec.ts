import { TestBed } from '@angular/core/testing';

import { VaccinationDriveService } from './vaccination-drive.service';

describe('VaccinationDriveService', () => {
  let service: VaccinationDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinationDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
