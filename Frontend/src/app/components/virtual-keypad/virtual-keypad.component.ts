import { Component } from '@angular/core';

@Component({
  selector: 'app-virtual-keypad',
  templateUrl: './virtual-keypad.component.html',
  styleUrls: ['./virtual-keypad.component.scss'],
})
export class VirtualKeypadComponent {
  nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  chars1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  chars2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  chars3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
}
