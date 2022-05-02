import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import party from 'party-js';
import { Result } from 'src/app/enums/config';

declare var bootstrap: any;
@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
})
export class ResultModalComponent implements AfterViewInit {
  @ViewChild('Modal') Modal: any; //note ElementRef;
  @Input() round: number = -1;
  @Input() score: number = -1;
 
  @Output() resultEvent = new EventEmitter();
  myModal: any;
  Status:Boolean=true;
  movie: string = '';
  constructor() {}
  ngAfterViewInit() {
    this.myModal = new bootstrap.Modal(this.Modal.nativeElement, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  showModal(currentStatus:Boolean,movieName:string) {
    console.log('show modal');
    this.Status=currentStatus;
    this.movie=movieName;
    console.log(currentStatus)
    this.myModal.show();
    if(this.Status)
    setTimeout(
      () =>
        party.confetti(document.getElementById('myModal')!, {
          count: party.variation.range(20, 100),
        }),
      500
    );
  }
  onClick() {
    console.log(this.Status)
    this.myModal.hide();
    if (this.Status) {
      this.resultEvent.emit(Result.PASSED)
    } else {
      this.resultEvent.emit(Result.FAILED)
    }
   
  }
}
