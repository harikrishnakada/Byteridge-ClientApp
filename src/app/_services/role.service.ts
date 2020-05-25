import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Role } from '../_models/role';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleService {
    constructor(private apiService: ApiService) { }

    getRoles() {
        return this.apiService.get<Role[]>(`${environment.apiUrl}/role`);
    }

    addRole(body){
        return this.apiService.post<Role>(`${environment.apiUrl}/role`, body);
    }
}

export const RoleIdentifiers= {
    Auditor: "INTERNAL_AUDITOR",
    User: "USER",
}