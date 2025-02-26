import { Component, OnInit } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { ApiService } from '../../services/api.service';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [FormsModule],
  standalone:true,
})
export class EditProfileComponent implements OnInit {

  breadCrumbItems: Array<{}> = [];
  currentUser: any;
  user = {
    first_name: '',
    last_name: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    subjects: '',
    years_experience: 0,
    role: '',
    school: '',
    languages: '',
    facebook: '',
    twitter: '',
    linkedin: ''
  };

  constructor(private apiservice:ApiService ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Edit Profile', active: true }];
  }
  fetchUserData() {
    this.apiservice.getCurrentUser().subscribe(
      response => {
        this.currentUser = response;
        console.log(this.currentUser)
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  updateCurrentUser() {
  

      this.apiservice.UpdateCurrentUser(this.user).subscribe(
      response => {
        console.log('User updated successfully!', response);
        // Handle success, such as showing a success message or redirecting
      },
      error => {
        console.error('Error updating user:', error);
        // Handle error, such as displaying an error message
      }
    );
      
    
  }
}
