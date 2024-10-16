import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../types/Project';
import { Collaborator } from '../types/Collaborator';
import { EnvService } from './env.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient, private envService: EnvService, private toastService: ToastService, private router: Router) {}

  getProjects(userId: string) {
    return this.http.get<Project[]>(`${this.envService.backendUrl}project/projects/${userId}`);
  }

  getProject(id: string) {
    return this.http.get<Project>(`${this.envService.backendUrl}project/${id}`);
  }

  createProject(userId: string) {
    this.http.post<{id: string}>(`${this.envService.backendUrl}project/create`, { userId }).subscribe({
      next: result => {
        this.router.navigate([`project/${result.id}`])
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
