import { Component } from '@angular/core';
import { ProjectsListComponent } from "./projects-list/projects-list.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsListComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  
}
