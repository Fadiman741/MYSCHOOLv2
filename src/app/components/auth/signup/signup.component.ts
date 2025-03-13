import { Component, OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone:true,
  imports: [FormsModule,RouterLink]
})
export class SignupComponent implements OnInit {

  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    member: '',
    password: ''
  };

  @ViewChild('signupForm') signupForm!: any;
  constructor(private apiservice:ApiService , private router:Router,public dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit() {
  }
  onRegisterSubmit(form: NgForm): void {
    if (form.valid) {
      const user = {
        username: this.user.username,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
        occupation: this.user.member,
        password: this.user.password
      };
  
      this.apiservice.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
  
          // Auto-login after registration
          const credentials = {
            email: user.email,
            password: user.password
          };
  
          this.apiservice.login(credentials).subscribe(
            (loginResponse) => {
              console.log('Login successful:', loginResponse);
  
              // Store the token and user information
              if (loginResponse.token) {
                localStorage.setItem('token', loginResponse.token); // Store the token
                localStorage.setItem('user', JSON.stringify(loginResponse.user)); // Store user info
              }
  
              // Navigate to the home page or dashboard
              this.router.navigate(['/']);
              this.dialogRef.close();
              window.location.reload()
              form.resetForm();
            },
            (loginError) => {
              console.error('Auto-login failed:', loginError);
            }
          );
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
  // onRegisterSubmit(form: NgForm):void {
  //   if (form.valid) {
  //     const user = {
  //       username: this.user.username,
  //       first_name: this.user.firstName,
  //       last_name: this.user.lastName,
  //       email: this.user.email,
  //       occupation: this.user.member,
  //       password: this.user.password
  //     };

  //     this.apiservice.register(user).subscribe(
  //       (response) => {
  //         console.log('Registration successful:', response);
  //         this.router.navigate(["/"]);
  //         this.dialogRef.close();
  //         form.resetForm();
  //       },
  //       (error) => {
  //         console.error('Registration failed:', error);
  //       }
  //     );
  //   }
  // }
}
