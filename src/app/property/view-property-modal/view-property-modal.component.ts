import { NgIf,CommonModule, NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-view-property-modal',
  imports: [ MatIconModule],
  templateUrl: './view-property-modal.component.html',
  styleUrl: './view-property-modal.component.css'
})
export class ViewPropertyModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ViewPropertyModalComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
