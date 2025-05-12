import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { Student } from '../../Models/student.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { StudentImportExportComponent } from '../student-import-export/student-import-export.component';
import { StudentFormComponent } from '../student-form/student-form.component';
import { VaccinationComponent } from '../vaccination/vaccination.component';

@Component({
  selector: 'app-student-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  searchName = '';
  searchClass = '';
  searchStudentId = '';
  searchStatus = '';
  exportMessage = '';
  exportError='';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog  // Inject MatDialog here
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
        (data) => (this.students = data),
      (error) => console.error('Error loading students', error)
    );
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => this.loadStudents(),
        (error) => alert('Failed to delete student')
      );
    }
  }

  searchByName(): void {
    if (this.searchName.trim()) {
      this.studentService.searchByName(this.searchName).subscribe((data) => (this.students = data));
    } else {
      this.loadStudents();
    }
  }

  searchByClass(): void {
    if (this.searchClass.trim()) {
      this.studentService.searchByClass(this.searchClass).subscribe((data) => (this.students = data));
    } else {
      this.loadStudents();
    }
  }

  searchByStudentId(): void {
    if (this.searchStudentId.trim()) {
      this.studentService.searchByStudentId(this.searchStudentId).subscribe((data) => (this.students = data));
    } else {
      this.loadStudents();
    }
  }

  filterByStatus(): void {
    if (this.searchStatus) {
      this.studentService.getStudentsByStatus(this.searchStatus).subscribe((data) => (this.students = data));
    } else {
      this.loadStudents();
    }
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  // Open the import-export dialog
  openImportDialog(): void {
    const dialogRef = this.dialog.open(StudentImportExportComponent, {
      width: '500px',
      height:'300px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {  // Specify 'any' type for result if unsure about its structure
      console.log('Dialog closed');
    });
  }

   exportStudents(): void {
    this.studentService.exportStudents().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.csv';
        a.click();
        this.exportMessage = 'Students exported successfully.';
      },
      (error) => (this.exportError = 'Failed to export students.')
    );
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '800px',
      height:'600px',
      data: { isEditMode: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadStudents();
      }
    });
  }

   editStudent(student: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '800px',
      height:'600px',
      data: { isEditMode: true, student }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadStudents();
      }
    });
  }

  // Open Vaccination Dialog
  openVaccinationDialog(studentId: string): void {
    const dialogRef = this.dialog.open(VaccinationComponent, {
      width: '900px',
      height: '700px',
      data: { studentId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadStudents(); // Refresh student list after vaccination
      }
    });
  }
}
