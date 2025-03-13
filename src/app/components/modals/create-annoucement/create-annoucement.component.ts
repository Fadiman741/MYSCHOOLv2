import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule ,NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-create-annoucement',
  templateUrl: './create-annoucement.component.html',
  styleUrls: ['./create-annoucement.component.css'],
  imports: [FormsModule,MatSelectModule,NgFor,NgIf,QuillModule, ReactiveFormsModule],
  standalone:true,
})
export class CreateAnnoucementComponent{

  announcement: { title: string; description: string; image: File | null; video: File | null } = {
    title: '',
    description: '',
    image: null,
    video: null,
  };

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
    ],
    handlers: {
      image: () => this.uploadImage()
    }
  };

  searchQuery: string = '';
  tagged = { taggedFriends: [] };
  tagInput: string = '';

  post = {
    title : '',
    content: '',
    tags: [] as string[],
    image: null,
    video: null,
    taggedFriends: [],
    feeling: '',
    imagePreview: '',
    videoPreview: '',
  };

  friends = [
    { id: 1, name: 'John Doe', profilePicture: 'https://i.pravatar.cc/100?u=1' },
    { id: 2, name: 'Jane Smith', profilePicture: 'https://i.pravatar.cc/100?u=2' },
    { id: 3, name: 'Alice Johnson', profilePicture: 'https://i.pravatar.cc/100?u=3' },
    { id: 4, name: 'Bob Brown', profilePicture: 'https://i.pravatar.cc/100?u=4' },
    { id: 5, name: 'Charlie Davis', profilePicture: 'https://i.pravatar.cc/100?u=5' },
  ];
  http: any;

  constructor(
    public dialogRef: MatDialogRef<CreateAnnoucementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private apiService: ApiService
  ) {}

  // onSubmit(): void {
  //   if (this.post.content) {
  //     this.dialogRef.close(this.post);
  //   }
  // }
  

  onVideoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.video = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.post.videoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  filteredFriends = [...this.friends];
  // Function to filter friends based on search query
  onFriendsFilterChange(event: any) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filterFriends();
  }
  filterFriends() {
    const query = this.searchQuery.toLowerCase();
    this.filteredFriends = this.friends.filter(friend =>
      friend.name.toLowerCase().includes(query)
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  addTag() {
    if (this.tagInput.trim() && !this.post.tags.includes(this.tagInput.trim())) {
      this.post.tags.push(this.tagInput.trim()); // ✅ No more TypeScript error
      this.tagInput = ''; // Clear input field
    }
  }

  removeTag(index: number) {
    this.post.tags.splice(index, 1);
  }
  // onAnnoucementSubmit(form: NgForm) {
  //   if (form.valid) {
  //     const formData = new FormData();
  //     formData.append('title', this.announcement.title);
  //     formData.append('description', this.announcement.description);
  //     if (this.announcement.image) {
  //       formData.append('image', this.announcement.image);
  //     }
  //     if (this.announcement.video) {
  //       formData.append('video', this.announcement.video);
  //     }

  //     this.apiService.create_announcement(formData).subscribe(
  //       (response) => {
  //         console.log('Announcement posted successfully:', response);
  //         form.resetForm();
  //         this.announcement = { title: '', description: '', image: null, video: null };
  //         this.dialogRef.close();
  //       },
  //       (error) => {
  //         console.error('Announcement posting failed:', error);
  //       }
  //     );
  //   }
  // }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file && type === 'image') {
      this.announcement.image = file;
    }
  }
  // onFileSelected(event: any, type: string) {
  //   const file = event.target.files[0];
  //   if (type === 'image') {
  //     this.post.image = file;
  //   } else if (type === 'video') {
  //     this.post.video = file;
  //   }
  // }
  onSubmit(postForm: NgForm) {
    if (postForm.valid) {
      const formData = new FormData();
      formData.append('title', this.announcement.title);
      formData.append('description', this.announcement.description);
      
      if (this.announcement.image) {
        formData.append('image', this.announcement.image);
      }
  
      this.apiService.create_announcement(formData).subscribe(
        (response) => {
          console.log('Announcement posted successfully:', response);
          postForm.resetForm(); // Reset the form
          this.announcement = { title: '', description: '', image: null, video: null };
          this.dialogRef.close();
        },
        (error) => {
          console.error('Announcement posting failed:', error);
        }
      );
    }
  }
  quillEditor: any;
  uploadImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        this.apiService.uploadImage(file).subscribe(response => {
          const range = this.quillEditor.getSelection();
          this.quillEditor.insertEmbed(range.index, 'image', response.image_url);
        });
      }
    };
  }
  
}
interface UploadResponse {
  image_url: string;
}