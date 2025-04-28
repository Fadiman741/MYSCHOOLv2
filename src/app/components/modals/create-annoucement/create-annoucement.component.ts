import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule ,NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuillConfig, QuillModule } from "ngx-quill";
import * as Quill from "quill";
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-create-annoucement',
  templateUrl: './create-annoucement.component.html',
  styleUrls: ['./create-annoucement.component.css'],
  imports: [FormsModule,MatSelectModule,NgFor,NgIf,QuillModule, ReactiveFormsModule],
  standalone:true,
})
export class CreateAnnoucementComponent{

  modules = {
    formula: true,
    syntax: true,
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

  announcementForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]) // Add required validator
  });

  selectedFile: File | null = null;
  uploadProgress: number | null = null;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CreateAnnoucementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }


  onSubmit(): void {
    if (this.announcementForm.invalid) {
      // Mark all fields as touched to show validation messages
      this.announcementForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    formData.append('title', this.announcementForm.get('title')?.value || '');
    formData.append('description', this.announcementForm.get('description')?.value || '');
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    this.apiService.create_announcement(formData).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error creating announcement:', error);
        // Handle error appropriately
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
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