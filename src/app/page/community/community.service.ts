import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/shared/model/Community';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private readonly API = 'http://localhost:8888/api/v1/image';
  constructor(private http: HttpClient) {}

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.API, formData);
  }

  createCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(this.API, community);
  }
}
