import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VaccinationDriveService } from '../../Services/vaccination-drive.service';
import { Router } from '@angular/router';
import { VaccinationDrive } from '../../Models/vaccine-drive.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-vaccine-drive',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-vaccine-drive.component.html',
  styleUrl: './add-vaccine-drive.component.css'
})

export class AddVaccineDriveComponent implements OnInit {
  vaccinationDriveForm: any;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private vaccinationDriveService: VaccinationDriveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vaccinationDriveForm = {
      vaccineName: '',
      date: '',
      availableDoses: 0,
      applicableClasses: []
    };
  }

  onSubmit() {
    if (!this.vaccinationDriveForm.vaccineName || !this.vaccinationDriveForm.date || 
        this.vaccinationDriveForm.availableDoses <= 0 || 
        !this.vaccinationDriveForm.applicableClasses) {
      this.errorMessage = 'Please fill in all required fields with valid data.';
      return;
    }

    const drive: VaccinationDrive = {
      ...this.vaccinationDriveForm,
      applicableClasses: this.vaccinationDriveForm.applicableClasses.split(',').map((cls: string) => cls.trim())
    };

    this.vaccinationDriveService.createVaccinationDrive(drive).subscribe(
      (response) => {
        this.successMessage = 'Vaccination Drive Created Successfully!';
        setTimeout(() => this.router.navigate(['/vaccine-drives']), 2000);
      },
      (error) => {
        this.errorMessage = `Failed to create vaccination drive: ${error}`;
      }
    );
}

}
