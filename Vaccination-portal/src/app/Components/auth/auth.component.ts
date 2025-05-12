import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  user = { username: '', email: '', password: '', role: '' };
  //for swtching toggle to signup to signin
  isSignUp = false;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (this.user.role !== 'Admin') {
      alert('Only Admins are allowed to register.');
      return;
    }
    this.authService.signup(this.user).subscribe({
      next: (response) => {
        console.log('Signup success', response);
        alert('User registered successfully');
         // Toggle to login form
      this.toggle(false); 
      },
      error: (error) => {
        console.error('Signup failed', error);
        alert('Signup failed');
      }
    });
  }

  login() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login success', response);
        alert('Login Successful');
       // localStorage.setItem('username', this.user.username); // Save login data to localStorage
        this.router.navigate(['/dashboard']); // Replace with your actual route
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    });
  }

  toggle(signUp: boolean) {
    this.isSignUp = signUp;
  }

}
