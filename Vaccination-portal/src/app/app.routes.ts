import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthComponent } from './Components/auth/auth.component';
import { loginGuard } from './Guards/login.guard';
import { authGuard } from './Guards/auth.guard';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { ListOfVaccineDrivesComponent } from './Components/list-of-vaccine-drives/list-of-vaccine-drives.component';

export const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, canActivate: [loginGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] ,},
    { path: 'students', component: StudentListComponent },
    { path: 'vaccine-drives', component: ListOfVaccineDrivesComponent },
  

];
