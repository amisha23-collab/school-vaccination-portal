import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardService } from '../../Services/dashboard.service';
import { AuthService } from '../../Services/auth.service';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatSidenavModule, MatListModule,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  username: string | null = '';
  hasUpcomingDrives: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.dashboardData = {}; // Initialize dashboardData as an empty object
    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        this.dashboardData = res;
        if (isNaN(this.dashboardData.vaccinationPercentage)) {
          this.dashboardData.vaccinationPercentage = 0;
        }
        this.hasUpcomingDrives = this.dashboardData.upcomingDrives && this.dashboardData.upcomingDrives.length > 0;
      },
      error: (err) => {
        console.error('Error fetching dashboard data', err);
        alert('Unauthorized or session expired');
        this.logout();
      }
    });
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }



}
