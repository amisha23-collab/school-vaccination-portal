import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VaccinationDrive } from '../../Models/vaccine-drive.model';
import { VaccinationDriveService } from '../../Services/vaccination-drive.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditVaccineDriveComponent } from '../edit-vaccine-drive/edit-vaccine-drive.component';
import { AddVaccineDriveComponent } from '../add-vaccine-drive/add-vaccine-drive.component';

@Component({
  selector: 'app-list-of-vaccine-drives',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-of-vaccine-drives.component.html',
  styleUrls: ['./list-of-vaccine-drives.component.css']
})
export class ListOfVaccineDrivesComponent implements OnInit {
  vaccinationDrives: VaccinationDrive[] = [];
  loading = false;
  errorMessage = '';

  constructor(private vaccinationDriveService: VaccinationDriveService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getVaccinationDrives();
  }

  getVaccinationDrives() {
    this.loading = true;
    this.vaccinationDriveService.getAllVaccinationDrives().subscribe(
      (drives) => {
        // Ensure applicableClasses is always treated as an array
        this.vaccinationDrives = drives.map(drive => ({
          ...drive,
          applicableClasses: Array.isArray(drive.applicableClasses) ? drive.applicableClasses : [drive.applicableClasses]
        }));
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'No vaccination drives found';
        console.error('Error fetching drives:', error);
      }
    );
  }

 editDrive(id: number) {
  const dialogRef = this.dialog.open(EditVaccineDriveComponent, {
    width: '800px', 
    height: '650px',
    data: { id: id }  // Ensure this is set correctly
  });

  dialogRef.afterClosed().subscribe(result => {
    // Refresh the drive list if needed
    this.getVaccinationDrives();
  });
}

addVaccineDrive() {
    const dialogRef = this.dialog.open(AddVaccineDriveComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getVaccinationDrives(); // Refresh list after adding new drive
    });
  }

  formatApplicableClasses(classes: string | string[]): string {
    // Ensure the value is an array before joining
    return Array.isArray(classes) ? classes.join(', ') : classes;
  }
  back() {
    this.router.navigate(['/dashboard']);
  }
}
