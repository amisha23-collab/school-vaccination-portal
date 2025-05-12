import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { MatDialogContent } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-import-export',
  imports: [CommonModule],
  templateUrl: './student-import-export.component.html',
  styleUrl: './student-import-export.component.css'
})
export class StudentImportExportComponent {
   importMessage = '';
  exportMessage = '';
  importError = '';
  exportError = '';
  selectedFile: File | null = null;  // Store the selected file

  constructor(private studentService: StudentService, private router:Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.importMessage = '';
    this.importError = '';
  }

  importStudents(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.studentService.importStudents(formData).subscribe({
        next: (messages) => {
          this.importMessage = 'Successfully imported students.';
          
          this.importError = '';
          this.selectedFile = null;
        },
        error: (error) => {
          this.importError = error.error || 'Failed to import students. Please check the file format.';
          this.importMessage = '';
        }
      });
    }
  }
}