import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, AlertService} from '../_services';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../_models';
import { RoleIdentifiers } from '../_services/role.service';
import { AuditService } from '../_services/audit.service';
import * as moment from 'moment-timezone';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    audits: any;
    user: User
     //@ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    //Create dtTrigger as an object.
    dtTrigger: Subject<any> = new Subject();
    readonly roleIdentifiers = RoleIdentifiers;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private auditService: AuditService,
        private spinnerService: NgxSpinnerService
    ) {
        this.user= JSON.parse( localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.spinnerService.show();
        this.loadAllAudits();
        this.dtOptions = {
            pagingType: 'full_numbers',
            lengthMenu: [5, 10, 20],
            pageLength: 10,
            dom: 'Bfrtip',
            "buttons": [
                { "extend": 'print', "text": 'Print', "className": 'fa fa-print btn btn-info btn-md' },
                { "extend": 'csv', "text": 'CSV', "className": 'fa fa-print btn btn-info btn-md' },
            ],
        };
    }

    private loadAllAudits() {
        this.auditService.getAudits()
            .pipe(first())
            .subscribe((data) => {
                this.audits = data;
                this.dtTrigger.next();
                this.spinnerService.hide();
            });
    }
}
