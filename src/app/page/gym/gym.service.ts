import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gym } from 'src/app/shared/model/Gym';
import { Locale } from 'src/app/shared/model/Locale';

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private readonly API = 'http://localhost:8888/api/v1';

  constructor(private http: HttpClient) {}

  createLocale(locale: Locale): Observable<Locale> {
    return this.http.post<Locale>(`${this.API}/locale`, locale);
  }

  createGym(gym: Gym): Observable<Gym> {
    return this.http.post<Gym>(`${this.API}/gym`, gym);
  }
}
