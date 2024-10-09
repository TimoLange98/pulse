import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from '../types/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subj = new Subject<Toast>();

  getObservable(): Observable<Toast> {
    return this.subj.asObservable();
  }

  notify(content: Toast): void {
    this.subj.next(content);
  }
}
