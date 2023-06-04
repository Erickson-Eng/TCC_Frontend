import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Community } from 'src/app/shared/model/Community';
import { Image } from 'src/app/shared/model/Image';
import { environment } from 'src/environments/environment';

interface CommunityTableResponse {
  community: Community[];
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private readonly API = environment.apiUrl;
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

  getImageForCommunity(communityId: number | undefined): Observable<string> {
    const url = `${this.API}/image/get-by-id/${communityId}`;

    return this.http.get(url, { responseType: 'arraybuffer' }).pipe(
      map((response: ArrayBuffer) => {
        const uint8Array = new Uint8Array(response);
        const imageString = String.fromCharCode.apply(
          null,
          Array.from(uint8Array)
        );
        return 'data:image/*;base64,' + btoa(imageString);
      })
    );
  }

  getCommunityById(id: number): Observable<Community> {
    return this.http.get<Community>(`${this.API}/community/get-by-id/${id}`);
  }

  applyOnCommunity(communityId: number, athleteId: number): Observable<any> {
    let membershipRequest = {
      athleteId: athleteId,
      communityId: communityId,
    };
    return this.http.post<any>(`${this.API}/membership`, membershipRequest);
  }

  getAllApplication(communityId?: number, status?: string, athleteId?:number): Observable<any> {
    let params = new HttpParams();
    if(communityId){
      params = params.set('communityId', communityId);
    }
    if(status){
      params = params.set('applicationState', status);;
    }
    if(athleteId){
      params = params.set('athleteId', athleteId);
    }
    return this.http.get<any>(`${this.API}/membership/filter`, {
      params: params,
    });
  }

  getAllMembers(communityId: number): Observable<any>{
    let params = new HttpParams().set('communityId', communityId);
    return this.http.get<any>(`${this.API}/membership/get-members-for-community`, {
      params: params,
    });
  }
}
