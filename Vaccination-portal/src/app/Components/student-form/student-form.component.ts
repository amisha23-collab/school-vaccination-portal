import { Component, Inject, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../Models/student.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    id:null as any,
    studentId: '',
    name: '',
    className: '',
    vaccinatedStatus: 'Not Vaccinated'
  };
  isEditMode = false;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isEditMode = data.isEditMode;
    if (this.isEditMode) {
      this.student = data.student;
    }
  }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.isEditMode = true;
      this.loadStudent(Number(studentId));
    }
  }

  loadStudent(id: number): void {
    this.studentService.getStudentById(id).subscribe(
      (data) => (this.student = data),
      (error) => (this.errorMessage = 'Failed to load student details.')
    );
  }

  saveStudent(): void {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(
        () => this.dialogRef.close('refresh'),
        (error) => (this.errorMessage = 'Failed to update student details.')
      );
    } else {
      this.studentService.addStudent(this.student).subscribe(
        () => {
          console.log('Submitting student:', this.student);

          this.dialogRef.close('refresh')},
        (error) => (this.errorMessage = 'Failed to add student.')
      );
    }
  }
 cancel(): void {
    this.dialogRef.close();
  }
  // cancel(): void {
  //   this.router.navigate(['/students']);
  // }
}
