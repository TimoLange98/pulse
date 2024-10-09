import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './profile-thumbnail.component.html',
  styleUrl: './profile-thumbnail.component.scss'
})
export class ProfileThumbnailComponent {
  @Input() src = '';
  @Input() alt = 'profile thumbnail';
  @Input() width!: number;
  @Input() height!: number;
}
