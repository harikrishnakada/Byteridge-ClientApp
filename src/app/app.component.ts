import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from './_services';
import { User } from './_models';

import './_content/app.less';
import { Role } from './_models/role';
import { first } from 'rxjs/operators';
import { RoleIdentifiers } from './_services/role.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    readonly roleIdentifiers = RoleIdentifiers;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout().pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
            });
        
    }

}