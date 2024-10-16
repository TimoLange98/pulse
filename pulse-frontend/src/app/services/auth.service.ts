import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { EnvService } from './env.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subs = new SubSink();

  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // TODO: Hold the user name somewhere

  constructor(private http: HttpClient, private envService: EnvService, private toastService: ToastService, private router: Router) {}

  tryRegularLogIn(username: string, password: string) {
    // TODO: Login logic
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/home']);
  }

  verifyGoogleCredential(credential: string) {
    this.subs.sink = this.http.post<any>(`${this.envService.backendUrl}auth/google/verify`, { credential }).subscribe({
      next: response => {
        response.success && this.isLoggedInSubject.next(true);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.toastService.notify({
          level: 'error',
          title: 'Authentication failed',
          message: '<message>'
        });
      }
    });
  }

  logOut() {
    // TODO: Logout logic

    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
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
