import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Project } from "../types/Project";
import { Collaborator } from "../types/Collaborator";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    const mockProjects: Project[] = [
      {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 'admin-tl',
        title: 'My first Project',
        description: 'This is my first project. It is a really interesting one. Actually its this very project you are looking at right now. Im holding my project inside of the project that I curretly build.',
        associatedUserIds: ['tl', 'tl', 'tl'],
        deadline: new Date(new Date().setDate(29)),
        progress: 10,
        tasksOpen: 90,
        tasksCompleted: 10
      },
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: 'admin-tl',
        title: 'My second Project',
        description: 'This is my second project. It is a really interesting one. Actually its this very project you are looking at right now. Im holding my project inside of the project that I curretly build.',
        associatedUserIds: ['tl', 'tl'],
        deadline: new Date(new Date().setDate(29)),
        progress: 50,
        tasksOpen: 10,
        tasksCompleted: 10
      }
    ]

    return of(mockProjects);
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
      },
    ]

    return of(mockCollaboratorInformation);
  }
}