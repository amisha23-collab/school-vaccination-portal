
// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Models/student.model';
import { VaccinationRecord } from '../Models/vaccination-record.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/admin/student';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.baseUrl}/${id}`);
  }

  exportStudents(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export`, { responseType: 'blob' });
  }

  importStudents(file: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/import`, file);
  }

  searchByName(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search/name`, { params: { name } });
  }

  searchByClass(className: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search/class`, { params: { className } });
  }

  searchByStudentId(studentId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/search/studentId`, { params: { studentId } });
  }

  getStudentsByStatus(status: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/status/${status}`);
  }

    // Get vaccination records for a student
  getVaccinationRecords(studentId: string): Observable<VaccinationRecord[]> {
    return this.http.get<VaccinationRecord[]>(`${this.baseUrl}/${studentId}/vaccination-records`);
  }

// src/app/Services/student.service.ts
markVaccinated(studentId: string, vaccineName: string, driveId: string): Observable<any> {
  const params = new HttpParams()
    .set('vaccineName', vaccineName)
    .set('driveId', driveId);

  // Use studentId in the URL
  return this.http.post(`${this.baseUrl}/${studentId}/vaccinate`, null, { params, responseType: 'text' });
}




}




// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//   private baseUrl = 'http://localhost:8080/admin/student';

//   constructor(private http: HttpClient) {}

//   // Get all students
//   getAll(): Observable<any> {
//     return this.http.get(`${this.baseUrl}`);
//   }

//   // Get student by ID
//   getById(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${id}`);
//   }

//   // Create a new student
//   createStudent(student: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}`, student);
//   }

//   // Update student details
//   updateStudent(id: number, student: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/${id}`, student);
//   }

//   // Delete student
//   delete(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/${id}`);
//   }

//   // Import students from CSV
//   importCSV(file: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('file', file);
//     return this.http.post(`${this.baseUrl}/import`, formData);
//   }

//   // Search students by name
//   searchByName(name: string): Observable<any> {
//     return this.http.get<any[]>(`${this.baseUrl}/search/name?name=${name}`);
//   }

//   searchByClass(className: string): Observable<any> {
//     return this.http.get<any[]>(`${this.baseUrl}/search/class?className=${className}`);
//   }

//   searchByStudentId(studentId: string): Observable<any> {
//     return this.http.get<any[]>(`${this.baseUrl}/search/studentId?studentId=${studentId}`);
//   }

//   searchByVaccinationStatus(status: string): Observable<any> {
//     return this.http.get<any[]>(`${this.baseUrl}/status/${status}`);
//   }

//   // Search students by vaccination status
//   getStudentsByVaccinationStatus(status: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/status/${status}`);
//   }

//   // Mark student as vaccinated
//   markVaccinated(studentId: number, vaccineName: string, driveId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/${studentId}/vaccinate?vaccineName=${vaccineName}&driveId=${driveId}`, null);
//   }

//   // Get vaccination records for a student
//   getVaccinationRecords(studentId: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${studentId}/vaccination-records`);
//   }

//   // Update a vaccination record
//   updateVaccinationRecord(recordId: number, record: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/vaccination-records/${recordId}`, record);
//   }
// }
