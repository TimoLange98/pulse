import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../types/Project';
import { Collaborator } from '../types/Collaborator';
import { EnvService } from './env.service';
import { BasicResponse } from '../types/BasicResponse';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient, private envService: EnvService, private toastService: ToastService) {}

  getProjects(userId: string) {
    return this.http.get<Project[]>(`${this.envService.backendUrl}project/projects/${userId}`);
  }

  createProject(title: string, description: string) {
    this.http.post<string>(`${this.envService.backendUrl}project/create`, { title, description }).subscribe({
      next: projectName => {
        this.toastService.notify({ level: 'success', title: 'Success', message: `Project ${projectName} created successfully` });
      },
      error: () => {
        this.toastService.notify({ level: 'error', title: 'An error occured', message: `Project could not be created` });
      }
    });
  }

  getCollaboratorInformation(userIds: string[]): Observable<Collaborator[]> {
    const mockCollaboratorInformation: Collaborator[] = [
      {
        id: 'tl',
        lastSeen: new Date(),
        name: 'Timo',
        profilePictureSmallPath: 'assets/profile-placeholder.png'
      },
      {
        id: 'tl-2',
        lastSeen: new Date(),
        name: 'Timo',
        profilePictureSmallPath: 'assets/profile-placeholder.png'
      },
      {
        id: 'tl-3',
        lastSeen: new Date(),
        name: 'Timo',
        profilePictureSmallPath: 'assets/profile-placeholder.png'
      }
    ];

    return of(mockCollaboratorInformation);
  }
}
