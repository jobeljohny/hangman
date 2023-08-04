import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss'],
})
export class AdminToolsComponent {
  file!: File;
  constructor(private toast: ToastrService, private api: AdminApiService) {}
  resetStats() {
    this.api.resetStatistics().subscribe({
      next: (res) => {
        this.toast.success('reset successfull');
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
    if (files) {
      let file = files[0];
      this.file = file;
      let fileReader: FileReader = new FileReader();
      fileReader.onloadend = function (x) {
        this.processMovies(fileReader.result);
      };
      fileReader.readAsText(file);
    }
    console.log(this.file);
  }

  processMovies(content:string){

  }
}
