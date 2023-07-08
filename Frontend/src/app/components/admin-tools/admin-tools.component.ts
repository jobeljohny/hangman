import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.scss'],
})
export class AdminToolsComponent {
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
}
