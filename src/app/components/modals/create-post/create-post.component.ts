import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  imports: [FormsModule],
  standalone:true,
})
export class CreatePostComponent implements OnInit {
  public view: any = {
    
  }
  postData = {
    content: '',
    taggedFriends: '',
    feeling: '',
    file: null
  };

  constructor(public dialogRef: MatDialogRef<CreatePostComponent>, private apiservice: ApiService) { }

  
  ngOnInit() {
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
  onClose(): void {
    this.dialogRef.close();
  }
  onforumSubmit(form:any ) {
    if (form.valid) {
      const post = {
        content: form.value.description,
      };
      this.apiservice.create_posts(post).subscribe(
        (response) => {
          console.log('Post posted successful:', response);
          // Handle successful, e.g., show a success message to the user
          this.view.posts = []
          this.view.getPosts()
          form.resetForm();
        },
        (error) => {
          console.error('Post failed:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    }
  }
  selectedImage: File | null = null;
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postData.file = file;
    }}
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   this.selectedImage = file;
  // }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.error('Form is invalid!');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.postData.content);
    formData.append('feeling', this.postData.feeling);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    const taggedFriends = this.postData.taggedFriends
      .split(',')
      .map((friend) => friend.trim())
      .filter((friend) => friend);
    
    formData.append('taggedFriends', JSON.stringify(taggedFriends));

    this.apiservice.createPost(this.view.gradeId, this.view.subjectId, formData)
      .subscribe({
        next: (response) => console.log('✅ Post created successfully:', response),
        error: (error) => console.error('❌ Error creating post:', error),
      });

    form.resetForm();
    this.selectedImage = null;
  }
}
