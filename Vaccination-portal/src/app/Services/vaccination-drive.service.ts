import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { VaccinationDrive } from '../Models/vaccine-drive.model';

@Injectable({
  providedIn: 'root'
})
export class VaccinationDriveService {
  private apiUrl = 'http://localhost:8080/admin'; // Adjust URL as needed

  constructor(private http: HttpClient) {}

  // Create a new vaccination drive
  createVaccinationDrive(drive: VaccinationDrive): Observable<VaccinationDrive> {
    return this.http.post<VaccinationDrive>(this.apiUrl, drive).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing vaccination drive
  updateVaccinationDrive(id: number, drive: VaccinationDrive): Observable<VaccinationDrive> {
    return this.http.put<VaccinationDrive>(`${this.apiUrl}/${id}`, drive).pipe(
      catchError(this.handleError)
    );
  }

 getAllVaccinationDrives(page: number = 0, size: number = 10): Observable<VaccinationDrive[]> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`).pipe(
      map(response => response.data.content),  // Extract the actual drive list
      catchError(this.handleError)
    );
}

// VaccinationDriveService.ts
getVaccinationDriveById(id: number): Observable<VaccinationDrive> {
  return this.http.get<VaccinationDrive>(`${this.apiUrl}/${id}`).pipe(
    catchError(this.handleError)
  );
}



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
