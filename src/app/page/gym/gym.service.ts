import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gym } from 'src/app/shared/model/Gym';
import { GymTableResponse } from 'src/app/shared/model/GymTableResponse';
import { Locale } from 'src/app/shared/model/Locale';
import { Sport } from 'src/app/shared/model/Sport';
import { environment } from 'src/environments/environment';

interface SportsData {
  sportList: Sport[];
}

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private env = environment;

  constructor(private http: HttpClient) {}

  createLocale(locale: Locale): Observable<Locale> {
    return this.http.post<Locale>(`${this.env.apiUrl}/locale`, locale);
  }

  createGym(gym: Gym): Observable<Gym> {
    return this.http.post<Gym>(`${this.env.apiUrl}/gym`, gym);
  }

  getSports(): Observable<SportsData> {
    return this.http.get<SportsData>(`${this.env.apiUrl}/sport`);
  }

  getAllGym(): Observable<GymTableResponse> {
    return this.http.get<GymTableResponse>(`${this.env.apiUrl}/gym/get-all`);
  }

  getGymById(id: number): Observable<Gym> {
    return this.http.get<Gym>(`${this.env.apiUrl}/gym/get-by-id/${id}`);
  }
}
