import { Component } from '@angular/core';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectsListComponent, CreateProjectModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  isCreateProjectModalOpen: boolean = false;

  constructor(private projectService: ProjectService) {}

  handleCreateNewProject() {
    this.projectService.createProject('689b8b48-fd3d-4a82-9999-9c1ee2f690a7');
  }
}
