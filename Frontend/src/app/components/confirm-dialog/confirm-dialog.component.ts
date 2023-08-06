import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/Classes/confirm-dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="d-container">
      <h1 mat-dialog-title>
        {{ title }}
      </h1>

      <div mat-dialog-content>
        <p class="lead">{{ message }}</p>
      </div>

      <div class="action-panel" mat-dialog-actions>
        <button class="btn btn-primary" (click)="dialogRef.close(false)">
          No
        </button>
        <button class="btn btn-secondary" (click)="dialogRef.close(true)">
          Yes
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .d-container {
        background: white;
        p {
          color: black;
        }
        .action-panel {
          display: flex;
          justify-content: flex-end;
          button {
            margin: 0px 8px;
            width: 60px;
          }
        }
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialog
  ) {
    this.title = data.title;
    this.message = data.message;
  }
}
