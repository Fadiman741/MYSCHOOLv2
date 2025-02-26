import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  imports: [FormsModule],
  standalone:true,
})
export class EditPostComponent implements OnInit {

  public view:any = {
    
  }
 post: any;

  constructor( public dialogRef: MatDialogRef<EditPostComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private apiservice: ApiService  ) {
    this.post = { ...data.post }; // Clone the passed data
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.apiservice.getCurrentUser().subscribe(
        response => {
          this.view.currentUser = response;
          console.log(this.view.currentUser)
        },
        error => {
          console.error('Error:', error);
        }
    );
  }

  onSubmit(): void {
    this.dialogRef.close(this.post); // Send the updated announcement back to the parent
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
