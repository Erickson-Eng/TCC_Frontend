import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gym } from 'src/app/shared/model/Gym';
import { GymTableResponse } from 'src/app/shared/model/GymTableResponse';
import { Locale } from 'src/app/shared/model/Locale';
import { Sport } from 'src/app/shared/model/Sport';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/shared/model/Image';


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

  uploadFile(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<Image>(`${this.env.apiUrl}/image`, formData);
  }

  getGymImage(imageid: number | undefined): Observable<string> {
    const url = `${this.env.apiUrl}/image/get-by-id/${imageid}`;

    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      map((response: ArrayBuffer) => {
        const uint8Array = new Uint8Array(response);
        const base64String = this.arrayBufferToBase64(uint8Array);
        return 'data:image/*;base64,' + base64String;
      })
    );
  }

  private arrayBufferToBase64(arrayBuffer: Uint8Array): string {
    let binary = '';
    const length = arrayBuffer.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(arrayBuffer[i]);
    }
    return btoa(binary);
  }


}
