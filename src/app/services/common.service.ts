import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, Observable, switchMap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user:BehaviorSubject<User> = new BehaviorSubject(null)
  constructor(private http:HttpClient) { }

  setUser(user:User){
    this.user.next(user);
  }

  getUser():Observable<User>{
    return this.user.asObservable();
  }

  //fetService
  search(value:Observable<string>):Observable<any>{
    return value
    .pipe(
      switchMap(val=>this.searchAPI(val))
      );
  }

  searchAPI(value:string):Observable<any>{
    return this.http.get('https://api.genderize.io?name='+value)
  }
 
  
}
