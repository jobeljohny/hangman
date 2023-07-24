import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyboard-toggle',
  template: `
    <div class="keyboard-toggle" (click)="toggleKeyboard()">
      <img src="../../../assets/keyboard.svg" alt="" />
    </div>
  `,
  styles: [
    `
      @import '../../Styles/palette.scss';
      .keyboard-toggle {
        position: absolute;
        border: 2px solid $theme-foreground;
        width: 55px;
        height: 55px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 16px;
        left: 16px;
        img {
          width: 30px;
          filter: $svg-filter;
          margin-bottom: 3px;
        }
        &:hover {
          cursor: pointer;
          filter: invert(0.9);
        }
      }
    `,
    `
      @media only screen and (max-width: 576px) {
        .keyboard-toggle {
          display: none;
        }
      }
    `,
  ],
})
export class KeyboardToggleComponent {
  @Output() toggle = new EventEmitter<boolean>();
  private readonly localStorageKey = 'keyboardToggleState';
  private isKeyboardVisible: boolean = false;

  constructor() {
    this.loadToggleState();
  }

  toggleKeyboard() {
    this.isKeyboardVisible = !this.isKeyboardVisible;
    this.saveToggleState();
    this.toggle.emit(this.isKeyboardVisible);
  }

  private loadToggleState() {
    const state = localStorage.getItem(this.localStorageKey);
    this.isKeyboardVisible = state === 'true';
    if (state === null) {
      this.isKeyboardVisible = false;
    }
  }

  private saveToggleState() {
    localStorage.setItem(
      this.localStorageKey,
      this.isKeyboardVisible.toString()
    );
  }
  getState() {
    return this.isKeyboardVisible;
  }
}
