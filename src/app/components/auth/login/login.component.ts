import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { FlashMessageComponent } from "../../flash-message/flash-message.component";
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports: [FormsModule]
})
export class LoginComponent implements OnInit {

  user = { email: '', password: '' };

  constructor(private apiservice:ApiService, private router:Router, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }


  onSignInSubmit():void {
    if (this.user.email && this.user.password) {
      this.apiservice.login(this.user).subscribe(
        (response) => {
          console.log('login successful:', response);
          localStorage.setItem('loggedInUser',this.user.email)
          localStorage.setItem('token',response.token)

          // localStorage.setItem('loggedInUser',user.email)
          localStorage.setItem('token', response.token)
          localStorage.setItem('loggedInUser',response.Email)
          localStorage.setItem('loggedInUserId',response.Occupation)
          this.apiservice.currentUser = response
          this.apiservice.showFlashMessage('Login successful', 'success');
          this.dialogRef.close();

          this.router.navigate(["/"])
          // this.router.navigate(["/"]).then(()=>{
          //   // window.location.reload();
          // })
        },
        (error) => {
          console.error('login failed:', error);
        }
        
      );
      }
    }

}
