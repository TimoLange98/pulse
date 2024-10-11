import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { EnvService } from './env.service';
import { ToastService } from './toast.service';
import { AuthenticationResponse } from '../types/AuthenticationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subs = new SubSink();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private envService: EnvService, private toastService: ToastService, private router: Router) {
    this.subs.sink = this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  tryRegularLogIn(username: string, password: string) {
    // TODO: Login logic
    this.isLoggedInSubject.next(true);
  }

  verifyGoogleCredential(credential: string) {
    this.subs.sink = this.http.post<any>(`${this.envService.backendUrl}auth/google/verify`, { credential }).subscribe({
      next: response => {
        console.log(response)
      },
      error: () => {
        this.toastService.notify({
          level: 'error',
          title: 'Authentication failed!',
          message: '<message>'
        })
      }
    });
  }

  logOut() {
    // TODO: Logout logic

    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  storeSessionToken() {}

  ngOnDestroy(): void {
    this.isLoggedInSubject.next(false);
    this.subs.unsubscribe();
  }
}
