import { Component, Input } from '@angular/core';
import { ProjectColumn } from '../../../types/ProjectColumn';

@Component({
  selector: 'app-project-column',
  standalone: true,
  imports: [],
  templateUrl: './project-column.component.html',
  styleUrl: './project-column.component.scss'
})
export class ProjectColumnComponent {
  @Input() column!: ProjectColumn;

  constructor() {}
}
