import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private apiService: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.apiService.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        var user=JSON.parse( localStorage.getItem('currentUser'));
        return this.apiService.put<any>(`${environment.apiUrl}/audit/${user.auditId}`, JSON.stringify({}))
        .pipe(map(user => {
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
        }));
    }
}