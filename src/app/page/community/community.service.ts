import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/shared/model/Community';
import { Image } from 'src/app/shared/model/Image';


interface CommunityTableResponse {
  community: Community[];
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private readonly API = 'http://localhost:8888/api/v1';
  constructor(private http: HttpClient) {}

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.API, formData);
  }

  createCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(`${this.API}/community`, community);
  }


  getAllCommunities(): Observable<Community[]> {
    const url = `${this.API}/community/get-all`;

    return this.http.get<Community[]>(url);
  }


  uploadFile(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<Image>(`${this.API}/image`, formData);
  }

  getImageForCommunity(communityId: number): Observable<string> {
    const url = `${this.API}/image/get-by-id/${communityId}`;

    return this.http.get(url, { responseType: 'arraybuffer' })
      .pipe(
        map((response: ArrayBuffer) => {
          const uint8Array = new Uint8Array(response);
          const imageString = String.fromCharCode.apply(null, Array.from(uint8Array));
          return 'data:image/*;base64,' + btoa(imageString);
        })
      );
  }
}
