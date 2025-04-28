import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-mediaviwer',
  imports: [MatIcon,NgIf],
  templateUrl: './mediaviwer.component.html',
  styleUrl: './mediaviwer.component.css'
})
export class MediaviwerComponent {

  constructor(
    private dialogRef: MatDialogRef<MediaviwerComponent>, // Corrected this to MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: { mediaUrl: string, type: string }
  ) {}

  close(): void {
    this.dialogRef.close(); // Close the dialog
  }

  getVideoType(url: string): string {
    if (url.endsWith('.mp4')) return 'video/mp4';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    return 'video/mp4';
  }

}
