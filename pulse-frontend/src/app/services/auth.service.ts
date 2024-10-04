import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  tryLogIn(username: string, password: string) {
    // TODO: Login logic
    this.isLoggedIn = true;
  }

  logOut() {
    // TODO: Logout logic

    this.isLoggedIn = false;
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }
}
