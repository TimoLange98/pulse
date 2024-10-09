import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/projects.service';
import { Project } from '../../../types/Project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ToastService } from '../../../services/toast.service';
import { catchError, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [ProjectCardComponent, AsyncPipe],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent implements OnInit {
  projects$!: Observable<Project[]>;

  constructor(private projectsService: ProjectService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.projects$ = this.projects$ = this.projectsService.getProjects().pipe(
      catchError(() => {
        this.toastService.notify({
          level: 'error',
          title: 'Something went wrong!',
          message: 'Failed to load projects'
        })
        return of([])
      })
    )
  }
}
