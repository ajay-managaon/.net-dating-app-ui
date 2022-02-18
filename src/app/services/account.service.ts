import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://datingappwebsite.azurewebsites.net/api/';

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model : any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response : User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
  }

  register(model : any){
    return this.http.post<User>(this.baseUrl + 'account/register' , model).pipe(
      map((response : User) =>{
        if(response){
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
        return response;
      })
    )
  }
}
