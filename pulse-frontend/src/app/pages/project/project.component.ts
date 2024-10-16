import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../types/Project';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { ProjectColumnComponent } from "./project-column/project-column.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ProjectColumnComponent, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {
  @ViewChild('titleInput') titleInput!: ElementRef;
  project!: Project;
  isEditTitle: boolean = false;

  private subs = new SubSink();

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private toastService: ToastService) {
    this.handleTitleInputKeydown = this.handleTitleInputKeydown.bind(this);
  }

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe(params => {
      this.fetchProjectData(params['id']);
    });
  }

  fetchProjectData(id: string) {
    this.subs.sink = this.projectService.getProject(id).subscribe({
      next: p => (this.project = p),
      error: () => {
        this.toastService.notify({
          level: 'error',
          title: 'Something went wrong!',
          message: `Error while fetching project with ID: ${id}`
        });
      }
    });
  }

  handleTitleInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.projectService.updateProject(this.project.id, 'title', this.project.title).subscribe({
        next: () => {
          this.setIsEditTitle(false);
        },
        error: () => {
          this.toastService.notify({
            level: 'error',
            title: 'Something went wrong',
            message: 'Unable to update the project title'
          });
        }
      });
    }
  }

  setIsEditTitle(isEditTitle: boolean) {
    this.isEditTitle = isEditTitle;

    if (isEditTitle) {
      setTimeout(() => {
        this.titleInput.nativeElement.focus();
        this.titleInput.nativeElement.select();
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
