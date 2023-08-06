import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { AddMoviesDialogComponent } from '../add-movies-dialog/add-movies-dialog.component';
import { ConfirmDialog } from 'src/app/Classes/confirm-dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss'],
})
export class AdminToolsComponent {
  file!: File;
  constructor(
    private toast: ToastrService,
    private api: AdminApiService,
    private dialog: MatDialog
  ) {}
  resetStats() {
    const dialogData = new ConfirmDialog(
      'Reset Statisitics',
      'Do you confirm this action?'
    );
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) this.updateStatisitcs();
    });
  }
  updateStatisitcs() {
    this.api.resetStatistics().subscribe({
      next: (res) => {
        this.toast.success('reset success');
      },
      error: (err) => {
        console.error(err);
        this.toast.error('something went wrong');
      },
    });
  }
  removeUser(user: string) {
    this.api.removeUser(user).subscribe({
      next: (res) => {
        this.toast.success('User removed succesfully');
      },
      error: (err) => {
        console.error(err);
        this.toast.error('something went wrong');
      },
    });
  }

  handleFileInput(e: Event | null) {
    let files = (e?.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      let file = files[0];
      this.file = file;
      let fileReader: FileReader = new FileReader();
      fileReader.onloadend = () => {
        this.processMovies(fileReader.result as string);
      };
      fileReader.readAsText(file);
    }
  }

  processMovies(content: string) {
    const lines = content
      .split('\n')
      .map((line) => line.replace('\r', ''))
      .map((line) => line.trim())
      .filter((line) => line !== '');
    let moviesList = Array.from(new Set(lines));
    const jsonArray = JSON.stringify(moviesList);
    const jsonSize = new TextEncoder().encode(jsonArray).length / 1024;

    let totalMovies = moviesList.length;
    let removedDuplicates = lines.length - moviesList.length;
    let dialogRef = this.dialog.open(AddMoviesDialogComponent, {
      width: '250px',
      data: {
        totalMovies: totalMovies,
        duplicates: removedDuplicates,
        size: jsonSize,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.updateMovies({ movies: moviesList }).subscribe({
          next: (res) => {
            this.toast.success('Update success');
          },
          error: (err) => {
            console.error(err);
            this.toast.error('something went wrong');
          },
        });
      }
    });
  }
}
