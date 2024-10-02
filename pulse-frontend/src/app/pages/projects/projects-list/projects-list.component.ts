import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';
import { Project } from '../../../types/Project';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe(
      p => {
        this.projects = p;
      },
      err => {
        // TODO: Toast system
      }
    );
  }
}
