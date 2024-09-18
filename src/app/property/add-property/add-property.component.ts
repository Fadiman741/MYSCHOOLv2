import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  standalone:true,
  imports: [ReactiveFormsModule],
})
export class AddPropertyComponent {
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      property_type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      tagline: ['', Validators.required],
      province: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      rooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      garage: ['', [Validators.required, Validators.min(0)]],
      status: ['true', Validators.required],
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      console.log('Form Data:', this.propertyForm.value);
      // Process the form data, e.g., send to an API
    } else {
      console.log('Form is invalid');
    }
  }
}
