import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    return this.http
      .get<{ token: string }>(`${environment.apiUrl}/token`)
      .pipe(map((response) => response.token));
  }
}
