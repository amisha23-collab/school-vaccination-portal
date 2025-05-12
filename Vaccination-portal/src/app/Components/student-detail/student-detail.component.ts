import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VaccinationRecord } from '../../Models/vaccination-record.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../Models/student.model';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-student-detail',
  imports: [CommonModule],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined;
  vaccinationRecords: VaccinationRecord[] = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) {}

  // src/app/components/student-detail/student-detail.component.ts
ngOnInit(): void {
  const studentIdParam = this.route.snapshot.paramMap.get('id');

  if (studentIdParam) {
    const studentId = Number(studentIdParam);

    this.studentService.getStudentById(studentId).subscribe(
      (data) => {
        this.student = data;

        // Fetch vaccination records if student is successfully loaded
        if (this.student && this.student.studentId) {
          this.studentService.getVaccinationRecords(this.student.studentId).subscribe(
            (records) => (this.vaccinationRecords = records),
            (error) => console.error('Error fetching vaccination records', error)
          );
        }
      },
      (error) => console.error('Error fetching student details', error)
    );
  }
}

back(){
  this.router.navigate(['/students']);
}
}