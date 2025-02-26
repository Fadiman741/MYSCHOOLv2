import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() postSubmitted = new EventEmitter<string>();
  isOpen = false;
  isEditing = false;
  postContent: string = '';

  // Method to open the modal for creating or editing a post
  openModal(isEditing = false, content: string = '') {
    this.isOpen = true;
    this.isEditing = isEditing;
    this.postContent = content;
  }

  // Method to close the modal
  closeModal() {
    this.isOpen = false;
    this.postContent = ''; // Reset the content on close
  }

  // Method to handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      this.postSubmitted.emit(form.value.description);
      this.closeModal(); // Close modal after submission
    }
  }

}
