import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private apiService: ApiService) { }

    getAll() {
        return this.apiService.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.apiService.post(`${environment.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.apiService.delete(`${environment.apiUrl}/users/${id}`);
    }
}