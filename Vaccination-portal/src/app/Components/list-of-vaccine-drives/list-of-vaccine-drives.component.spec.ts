import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfVaccineDrivesComponent } from './list-of-vaccine-drives.component';

describe('ListOfVaccineDrivesComponent', () => {
  let component: ListOfVaccineDrivesComponent;
  let fixture: ComponentFixture<ListOfVaccineDrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfVaccineDrivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfVaccineDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
