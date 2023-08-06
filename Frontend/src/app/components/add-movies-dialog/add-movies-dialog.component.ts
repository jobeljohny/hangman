import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-movies-dialog',
  template: `
    <div class="main-container">
      <h3 class="d-flex justify-content-center">Summary</h3>
      <p>
        Movies counted :
        {{ data.totalMovies }}
      </p>
      <p>Rem. duplicates : {{ data.duplicates }}</p>
      <p>New list size : {{ data.size | number : '1.2-2' }} kb</p>

      <div class="option-panel">
        <button (click)="dialogRef.close(true)" class="btn btn-primary">
          Update
        </button>
        <button (click)="dialogRef.close(false)" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .main-container {
        padding-top: 14px;
        background: white;
        h3 {
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        p {
          font-size: 1.1rem;
          margin-left: 16px;
        }
      }
      .option-panel {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        button {
          margin: 8px;
        }
      }
    `,
  ],
})
export class AddMoviesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddMoviesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
