import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaccineDriveComponent } from './edit-vaccine-drive.component';

describe('EditVaccineDriveComponent', () => {
  let component: EditVaccineDriveComponent;
  let fixture: ComponentFixture<EditVaccineDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVaccineDriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVaccineDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
