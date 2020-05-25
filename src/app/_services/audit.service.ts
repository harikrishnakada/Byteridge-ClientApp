import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private apiService: ApiService) { }

    getAudits() {
        return this.apiService.get(`${environment.apiUrl}/audit`);
    }
}
