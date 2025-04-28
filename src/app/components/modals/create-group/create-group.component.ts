import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({

  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule,NgIf]
})
export class CreateGroupComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Output() groupCreated = new EventEmitter<FormData>();
  @ViewChild('avatarInput') avatarInput!: ElementRef;

  showCreateForm = true;
  groupForm: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;
  isSubmitting = false;
  maxFileSize = 2 * 1024 * 1024; // 2MB
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  groupData: any;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<CreateGroupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      grade: [''],
      description: ['', [Validators.maxLength(200)]],
      subscriptionAmount: [0, [Validators.min(0), Validators.max(1000)]],
      tags: [''],
      avatar: [null, []]
    });
    
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type
      if (!this.allowedFileTypes.includes(file.type)) {
        this.groupForm.get('avatar')?.setErrors({ fileType: true });
        this.clearAvatarSelection();
        return;
      }

      // Validate file size
      if (file.size > this.maxFileSize) {
        this.groupForm.get('avatar')?.setErrors({ fileSize: true });
        this.clearAvatarSelection();
        return;
      }

      // Clear any previous errors
      this.groupForm.get('avatar')?.setErrors(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Update form control
      this.groupForm.patchValue({
        avatar: file
      });
      this.groupForm.get('avatar')?.updateValueAndValidity();
    }
  }

  clearAvatarSelection(): void {
    this.avatarPreview = null;
    this.groupForm.patchValue({ avatar: null });
    if (this.avatarInput) {
      this.avatarInput.nativeElement.value = '';
    }
  }

  onSubmit(): void {
    if (this.groupForm.invalid) {
      this.markFormGroupTouched(this.groupForm);
      return;
    }

    this.isSubmitting = true;
    
    // Prepare form data for submission (especially important if uploading files)
    const formData = new FormData();
    formData.append('name', this.groupForm.value.name);
    formData.append('grade', this.groupForm.value.grade);
    formData.append('description', this.groupForm.value.description);
    formData.append('subscriptionAmount', this.groupForm.value.subscriptionAmount.toString());
    formData.append('tags', this.groupForm.value.tags);
    
    if (this.groupForm.value.avatar) {
      formData.append('avatar', this.groupForm.value.avatar);
    }

    this.groupCreated.emit(formData);
    
    // Reset form after successful submission handled by parent
    // Parent should call resetForm() after successful API call
  }

  
  closeModal() {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.groupForm.reset({
      name: '',
      grade: '',
      description: '',
      subscriptionAmount: 0,
      tags: '',
      avatar: null
    });
    this.avatarPreview = null;
    this.isSubmitting = false;
    this.clearAvatarSelection();
    this.groupForm.markAsUntouched();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}