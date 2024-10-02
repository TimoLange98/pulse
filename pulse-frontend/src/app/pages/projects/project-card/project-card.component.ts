import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {SubSink} from 'subsink'
import { Project } from '../../../types/Project';
import { Collaborator } from '../../../types/Collaborator';
import { ProjectService } from '../../../services/projects.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent implements OnChanges, OnDestroy {
  @Input() project!: Project;

  subs = new SubSink();
  collaborators: Collaborator[] = [];

  constructor(private projectsService: ProjectService, private toastService: ToastService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.subs.sink = this.projectsService.getCollaboratorInformation(this.project.associatedUserIds).subscribe({
        next: i => {this.collaborators = i},
        error: () => {
          this.toastService.notify({
            level: 'error',
            title: 'Something went wrong!',
            message: 'Failed to load user information'
          })
        }
      })
    }
  }

  getCollaboratorInformation() {

  }

  getProgressInPercentage() {
    return ((this.project.tasksCompleted + this.project.tasksOpen) / 100) * this.project.tasksCompleted;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
