import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
})
export class ResultModalComponent implements OnInit {
  @ViewChild('Modal') Modal: ElementRef | undefined;
  @Input() win:Boolean=true;
  @Input() round:number=-1;
  @Input() movie:string='';

  constructor() {}

  ngOnInit(): void {}
  showModal() {
    console.log('show modal');
    let myModal = new bootstrap.Modal(this.Modal?.nativeElement);
    myModal.show();
  }
}
