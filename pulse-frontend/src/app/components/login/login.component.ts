declare var google: any;

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { GoogleCredentialResponse } from '../../types/GoogleCredentialResponse';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  createUserForm!: FormGroup;

  images: string[] = ['assets/artwork/1.jpg', 'assets/artwork/2.jpg', 'assets/artwork/3.jpg'];
  currentArtworkPath!: string;
  currentArtworkIndex: number = 0;
  intervalTime: number = 5000;

  isPasswordVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.subs.sink = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      isLoggedIn && this.router.navigate(['/home']);
    });

    this.currentArtworkPath = this.images[this.currentArtworkIndex];
    this.startImageSlider();
    this.createCreateUserForm();
    await this.initializeGoogleAuth();
  }

  private createCreateUserForm() {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6)]
    });
  }

  private async initializeGoogleAuth() {
    await this.loadGoogleScript();

    google.accounts.id.initialize({
      client_id: '584826808833-10umigc6381rr9gmhrhhf74fobueqc8v.apps.googleusercontent.com',
      callback: (res: GoogleCredentialResponse) => this.handleCredentialReponse(res)
    });

    google.accounts.id.renderButton(document.getElementById('google-login-btn'), {
      size: 'large'
    });
  }

  handleCreateUser() {
    if (this.createUserForm.valid) {
      console.log(this.createUserForm.value);
    }
  }

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-script';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = err => reject(err);
      document.body.appendChild(script);
    });
  }

  handleCredentialReponse(res: GoogleCredentialResponse) {
    this.authService.verifyGoogleCredential(res.credential);
  }

  toggleShowPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  startImageSlider() {
    setInterval(() => {
      this.currentArtworkIndex = (this.currentArtworkIndex + 1) % this.images.length;
      this.currentArtworkPath = this.images[this.currentArtworkIndex];
    }, this.intervalTime);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
