import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Environment } from '../types/Environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private env!: Environment;

  constructor(private http: HttpClient) { }

  async loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('assets/env.json')).then(res => {
      this.env = res as Environment;
    });
  }

  get backendUrl() {
    return this.env.backendUrl;
  }
}
