import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentImportExportComponent } from './student-import-export.component';

describe('StudentImportExportComponent', () => {
  let component: StudentImportExportComponent;
  let fixture: ComponentFixture<StudentImportExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentImportExportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
