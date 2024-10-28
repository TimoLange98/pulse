import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CloseModalBtnComponent } from '../../../components/close-modal-btn.component';
import { ColumnColorSelectorBtnComponent } from './column-color-selector-btn.component';

// TODO: Make modal grow as the description text area grows

@Component({
  selector: 'app-add-column-modal',
  standalone: true,
  imports: [CloseModalBtnComponent, ColumnColorSelectorBtnComponent],
  templateUrl: './add-column-modal.component.html',
  styleUrl: './add-column-modal.component.scss'
})
export class AddColumnModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  selectedColor: string | null = null;

  columnColors: string[] = ['#1eeb62', '#1ee4eb', '#1e66eb', '#da1eeb', '#eb581e', '#eb1e1e'];

  handleSelectColor = (color: string) => () => {
    this.selectedColor = color === this.selectedColor ? null : color;
  };

  handleClose = () => {
    this.closeModalEvent.emit();
  };
}
