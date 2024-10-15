import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldType } from '../../../types/FormFieldType';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.scss'
})
export class CreateProjectModalComponent implements OnInit {
  createProjectForm!: FormGroup;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createProjectForm = this.formBuilder.group<{ title: FormFieldType<string>; description: FormFieldType<string> }>({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  handleCreateProject() {
    const { title, description }: { title: string; description: string } = this.createProjectForm.value;
    this.projectService.createProject(title, description);
  }

  handleCloseModal() {
    this.closeModalEvent.emit();
  }
}
