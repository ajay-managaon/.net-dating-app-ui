import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})

export class MembersService {
  baseUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + "users");
  }

  getMember(username : string){
    return this.http.get<Member>(this.baseUrl + "user/" + username);
  }

  updateMember(member : Member){
    return this.http.put(this.baseUrl + "user/updateuser", member);
  }

  setMainPhoto(photoId : number){
    return this.http.put(this.baseUrl + "user/set-main-photo/" + photoId , {});
  }

  deletePhoto(photoId : number){
    return this.http.delete(this.baseUrl + "delete-photo/" + photoId);
  }
}
