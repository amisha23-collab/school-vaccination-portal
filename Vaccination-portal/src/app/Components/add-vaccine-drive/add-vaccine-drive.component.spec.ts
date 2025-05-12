import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaccineDriveComponent } from './add-vaccine-drive.component';

describe('AddVaccineDriveComponent', () => {
  let component: AddVaccineDriveComponent;
  let fixture: ComponentFixture<AddVaccineDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVaccineDriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVaccineDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
