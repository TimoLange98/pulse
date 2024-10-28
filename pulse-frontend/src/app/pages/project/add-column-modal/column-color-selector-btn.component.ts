import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-color-selector-btn-component',
  standalone: true,
  template: `
    <button
      [ngStyle]="{ 'background-color': getColor }"
      (click)="handleClick()"
      (mouseover)="isHovered = true"
      (mouseout)="isHovered = false">
      <span [ngStyle]="{ 'border-color': color, 'background-color': getCircleBackgroundColor }">
        @if(selectedColor === color) {
        <svg [ngStyle]="{ color: color }">
          <use xlink:href="assets/icons/check.svg#check-svg"></use>
        </svg>
        }
      </span>
    </button>
  `,
  styles: `
    button {
      height: 35px;
      width: 35px;
      border-radius: 8px;
      border: none;
      display: grid;
      place-items: center;

      &:hover {
        cursor: pointer;
      }
    }
    
    span {
      display: flex;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      border: 2px solid;
      justify-content: center;
      align-items: center;
    }

    svg {
      width: 70%;
      height: 70%;
    }
  `,
  imports: [NgStyle]
})
export class ColumnColorSelectorBtnComponent {
  private _isHovered: boolean = false;
  @Input() color!: string;
  @Input() selectedColor: string | null = null;
  @Input() handleClick!: () => void;

  get isSelected(): boolean {
    return this.color === this.selectedColor;
  }

  get getColor(): string {
    if (this.isSelected) return this.color;
    return this.color + (this._isHovered ? '55' : '33');
  }

  getCircleBorderColor(): string {
    return this.isSelected ? '#000000' : this.color;
  }

  get getCircleBackgroundColor(): string {
    return this.isSelected ? '#000000' : this.getColor;
  }

  set isHovered(value: boolean) {
    this._isHovered = value;
  }
}
