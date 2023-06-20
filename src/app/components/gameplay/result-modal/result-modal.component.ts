import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import party from 'party-js';
import { Result } from 'src/app/enums/config';
import { ThemeService } from 'src/app/services/theme.service';

declare var bootstrap: any;
@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
})
export class ResultModalComponent {
  round: number = -1;
  score: number = -1;

  @Output() resultEvent = new EventEmitter();
  Status: Boolean = true;
  movie: string = '';
  constructor(
    private theme: ThemeService,
    public dialogRef: MatDialogRef<ResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.round = data.round;
    this.score = data.score;
    this.movie = data.movie;
    this.Status = data.isWin;
    if (this.Status)
      setTimeout(
        () =>
          party.confetti(document.getElementById('myModal')!, {
            count: party.variation.range(20, 100),
          }),
        500
      );
  }

  get isDarkMode() {
    return this.theme.isDarkMode;
  }

  showModal(currentStatus: Boolean, movieName: string) {
    console.log('show modal');
    this.Status = currentStatus;
    this.movie = movieName;
    console.log(currentStatus);
    if (this.Status)
      setTimeout(
        () =>
          party.confetti(document.getElementById('myModal')!, {
            count: party.variation.range(20, 100),
          }),
        500
      );
  }
  onClick() {
    console.log(this.Status);
    this.dialogRef.close();
    if (this.Status) {
      this.resultEvent.emit(Result.PASSED);
    } else {
      this.resultEvent.emit(Result.FAILED);
    }
  }
}
