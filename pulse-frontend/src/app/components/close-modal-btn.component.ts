import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-modal-btn',
  standalone: true,
  template: `
    <button (click)="handleClick ? handleClick() : undefined">
      <svg>
        <use xlink:href="assets/icons/close.svg#close-svg"></use>
      </svg>
    </button>
  `,
  styles: `
    button {
      background-color: transparent;
      height: 35px;
      width: 35px;
      display: grid;
      place-items: center;
      border-radius: 8px;
      border: none;
      padding: 0;
      color: #7d7d7d;

      &:hover {
        cursor: pointer;
        background-color: #f1f1f1;
      }

      & svg {
        height: 25px;
        width: 25px;
      }
    }
  `
})
export class CloseModalBtnComponent {
  @Input() handleClick: (() => void) | undefined = undefined;
}
