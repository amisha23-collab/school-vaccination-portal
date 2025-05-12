import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../Services/student.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vaccination',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccinationRecords: any[] = [];
  studentId: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isVaccinated: boolean = false;
  studentVaccinatedStatus: string = '';

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<VaccinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vaccinationForm = this.fb.group({
      vaccineName: ['', Validators.required],
      driveId: ['', Validators.required]
    });
    this.studentId = data.studentId;
  }

  ngOnInit(): void {
    this.fetchVaccinationRecords();
  }

  // Check if the student is already vaccinated
  isStudentVaccinated(): boolean {
    return this.vaccinationRecords.length > 0;
  }

  // Fetch Vaccination Records
  fetchVaccinationRecords(): void {
    this.studentService.getVaccinationRecords(this.studentId).subscribe(
      (records) => {
        this.vaccinationRecords = records;
        this.checkVaccinationStatus();
      },
      (error) => {
        this.errorMessage = error.error.message || 'Error fetching vaccination records.';
      }
    );
  }

  // Check if the student is vaccinated
  checkVaccinationStatus(): void {
    if (this.vaccinationRecords.length > 0) {
      this.studentVaccinatedStatus = 'Done';  // Already vaccinated
      this.isVaccinated = true;  // Disable form submission
    } else {
      this.studentVaccinatedStatus = 'Pending';  // Not vaccinated
      this.isVaccinated = false;
    }
  }

  // Mark Student as Vaccinated
  onVaccinate(): void {
    this.successMessage = '';  // Clear any old success message
    if (this.vaccinationForm.valid) {
      const { vaccineName, driveId } = this.vaccinationForm.value;
      
      this.studentService.markVaccinated(this.studentId, vaccineName, driveId).subscribe(
        (response) => {
          this.successMessage = typeof response === 'string' ? response : 'Student vaccinated successfully!';
          this.errorMessage = '';
          this.isVaccinated = true;  // Set to true after successful vaccination
          this.fetchVaccinationRecords(); // Refresh the records
          this.vaccinationForm.reset();
          setTimeout(() => {
            this.dialogRef.close('refresh');  // Close after a short delay to let the message be seen
          }, 1500); // 1.5 seconds delay
        },
          (error) => {
  console.error('Vaccination Error:', error);  // Log the actual error
  this.errorMessage = error?.error?.message || error.message || 'Error marking student as vaccinated.';
  this.successMessage = '';
}

        
      );
    }
  }
}
