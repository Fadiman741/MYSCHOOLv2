import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-edit-property-modal',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './edit-property-modal.component.html',
  styleUrl: './edit-property-modal.component.css'
})
export class EditPropertyModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditPropertyModalComponent>
  ) {}

  save() {
    // Send updated data back to the parent component
    this.dialogRef.close(this.data);
  }
  closeModal(): void {
    this.dialogRef.close();
  }

}
