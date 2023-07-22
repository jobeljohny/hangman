import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-options-dialog',
  templateUrl: './header-options-dialog.component.html',
  styleUrls: ['./header-options-dialog.component.scss'],
})
export class HeaderOptionsDialogComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<HeaderOptionsDialogComponent>
  ) {}
  get Role() {
    return this.auth.getRole();
  }

  optionClicked(route: string) {
    this.router.navigateByUrl(route);
    this.dialogRef.close();
  }
}
