import { Component } from '@angular/core';
import { ProjectsListComponent } from "./projects-list/projects-list.component"; 
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsListComponent, CreateProjectModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  isCreateProjectModalOpen: boolean = false;

  showCreateProjectModal() {
    this.isCreateProjectModalOpen = true;
  }

  closeCreateProjectModal() {
    this.isCreateProjectModalOpen = false;
  }
}
