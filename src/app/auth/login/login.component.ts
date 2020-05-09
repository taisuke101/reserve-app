import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    errors: any = []
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }
    
    login(loginForm) {
        this.authService.login(loginForm.value).subscribe(
            (token) => {
                //ログイン後、商品一覧ページに移動
                this.router.navigate(['/product'])
            },
            (err: HttpErrorResponse) => {
                console.log(err)
                this.errors = err.error.errors
            }
        )
    }
}