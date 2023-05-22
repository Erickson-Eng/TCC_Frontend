import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from 'src/app/shared/model/Athlete';
import { Manager } from 'src/app/shared/model/Manager';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private env = environment;

  constructor(private http: HttpClient) {}

  getManagerProfile(email: string): Observable<Manager> {
    let params = new HttpParams().set('email', email);
    return this.http.get<Manager>(`${this.env.apiUrl}/manager`, {
      params: params,
    });
  }

  getAthleteInfo(username: string): Observable<Athlete> {
    return this.http.get<Athlete>(
      `${this.env.apiUrl}/athlete/get-by-username/${username}`
    );
  }
}
