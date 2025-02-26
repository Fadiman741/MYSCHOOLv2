

import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-edit-annoucement',
  templateUrl: './edit-annoucement.component.html',
  styleUrls: ['./edit-annoucement.component.css'],
  imports: [FormsModule,QuillModule],
  standalone:true,
})
export class EditAnnoucementComponent {
  announcement: any;
  modules = {
    formula: true,
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Added more header levels
      ['bold', 'italic', 'underline', 'strike'], // Added 'strike' for strikethrough
      [{ color: [] }, { background: [] }], // Added text color and background color
      [{ font: [] }], // Added font family selection
      [{ align: [] }], // Added text alignment options
      ['blockquote', 'code-block'], // Added blockquote
      [{ list: 'ordered' }, { list: 'bullet' }], // Added ordered and unordered lists
      [{ script: 'sub' }, { script: 'super' }], // Added subscript and superscript
      ['link', 'image', 'video'], // Added video support
      ['clean'] // Added clean formatting option
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<EditAnnoucementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private apiservice: ApiService
  ) {
    this.announcement = { ...data.announcement }; // Clone the passed data
  }

  onSubmit(postForm: NgForm) {
    if (postForm.valid) {
      const updatedAnnouncement = {
        title: this.announcement.title, // Use the updated title from the form
        description: this.announcement.description, // Updated description
      };

      // Call the API to update the announcement
      this.apiservice.updateAnnouncement(this.announcement.id, updatedAnnouncement).subscribe(
        (response) => {
          console.log('Announcement updated successfully:', response);
          postForm.resetForm(); // Reset the form after submission
          this.dialogRef.close(response); // Close the dialog with updated data
        },
        (error) => {
          console.error('Announcement update failed:', error);
        }
      );
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}

